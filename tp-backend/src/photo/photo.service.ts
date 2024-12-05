import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entity/photo.entity';
import { ErrorCode } from '../utils/error';
import { Mutex } from 'async-mutex';
import * as fs from 'fs';
import * as path from 'path';
import * as ftp from 'basic-ftp';
import * as archiver from 'archiver';
import { Response } from 'express';
import { Visit } from '../visit/entity/visit.entity';
import { promisify } from 'util';
import { pipeline } from 'stream';
import * as unzipper from 'unzipper';
const pipelineAsync = promisify(pipeline);

@Injectable()
export class PhotoService {
  private ftpMutex = new Mutex();


  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly dataSource: DataSource,
  ) {}

  
  private async downloadFileFromFTP(remotePath: string, localPath: string): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: 'storage.dcxv.com',
        user: 's569',
        password: 'o5Yq26X1RhHdp7OiU227',
        secure: false,
      });

      console.log(`Downloading from FTP: ${remotePath} to ${localPath}`);

      const localDir = path.dirname(localPath);
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }

      await client.downloadTo(localPath, remotePath);

      if (!fs.existsSync(localPath)) {
        console.error(`File not found after download: ${localPath}`);
        throw new NotFoundException({
          message: `Photo not found'`,
          code: ErrorCode.PHOTO_NOT_FOUND,
        });
      }
    } catch (error) {
      console.error('FTP download error:', error);
      throw new NotFoundException({
        message: `Photo not found'`,
        code: ErrorCode.PHOTO_NOT_FOUND,
      });
    } finally {
      client.close();
    }
  }

  private async uploadFileToFTP(localPath: string, remotePath: string): Promise<void> {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: 'storage.dcxv.com',
        user: 's569',
        password: 'o5Yq26X1RhHdp7OiU227',
        secure: false,
      });

      await client.uploadFrom(localPath, remotePath);
    } catch (error) {
      console.error('FTP upload error:', error);
      throw new InternalServerErrorException({
        message: `Error updating'`,
        code: ErrorCode.PHOTO_UPDATE_FAILED,
      });
    } finally {
      client.close();
    }
  }

  private async queuedDownloadFileFromFTP(remotePath: string, localPath: string): Promise<void> {
    const release = await this.ftpMutex.acquire();
    try {
      await this.downloadFileFromFTP(remotePath, localPath);
    } finally {
      release();
    }
  }

  async create(visitId: number, file: Express.Multer.File) {
    const visitObject = await this.visitRepository.findOneBy({ id: visitId });
    if (!visitObject) {
      throw new NotFoundException({
        message: `Visit with id ${visitId} not found`,
        code: 'VISIT_NOT_FOUND',
      });
    }
    const remotePath = `/.next/files/photoTorg/${file.filename}`;
    await this.uploadFileToFTP(file.path, remotePath);

    const photo = new Photo();
    photo.filePath = remotePath;
    photo.visit = visitObject.id;

    try {
      const savedPhoto = await this.photoRepository.save(photo);
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting local file: ${err}`);
        }
      });
      return savedPhoto;
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Error saving'`,
        code: ErrorCode.PHOTO_SAVING_FAILED,
      });
    }
  }

  async createOne(visitId: number, file: Express.Multer.File, transactionManager: EntityManager) {
    const visitObject = await transactionManager.findOne(Visit, { where: { id: visitId } });

    if (!visitObject) {
      throw new NotFoundException({
        message: 'Visit not found',
        code: 'VISIT_NOT_FOUND',
      });
    }

    const remotePath = `/.next/files/photoTorg/${file.filename}`;
    await this.uploadFileToFTP(file.path, remotePath);

    const photo = new Photo();
    photo.filePath = remotePath;
    photo.visit = visitObject.id;

    try {
      const savedPhoto = await transactionManager.save(Photo, photo);
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(`Error deleting local file: ${err}`);
        }
      });
      return savedPhoto;
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Error saving'`,
        code: ErrorCode.PHOTO_SAVING_FAILED,
      });
    }
  }

  async findPhoto(id: number, res: Response) {
    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo || !photo.filePath) {
      throw new NotFoundException({
        message: `Photo not found'`,
        code: ErrorCode.PHOTO_NOT_FOUND,
      });
    }
    const filePath = path.resolve(photo.filePath);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      throw new NotFoundException({
        message: `Photo not found'`,
        code: ErrorCode.PHOTO_NOT_FOUND,
      });
    }
  }

  async findPhotos(visitId: number): Promise<any> {
    return await this.dataSource.transaction(async (transactionManager) => {
      const photos = await transactionManager
        .getRepository(Photo)
        .createQueryBuilder('photo')
        .where('photo.visit_id = :visitId', { visitId })
        .getMany();

      if (!photos || photos.length === 0) {
        throw new NotFoundException({
          message: `Photo not found'`,
          code: ErrorCode.PHOTO_NOT_FOUND,
        });
      }

      const photoData = [];
      const archivePhoto = photos.find((photo) => photo.filePath.endsWith('.zip'));

      if (archivePhoto) {
        const archivePath = path.resolve('downloads', archivePhoto.filePath);

        if (!fs.existsSync(archivePath)) {
          console.log(`Archive not found locally, downloading from FTP: ${archivePhoto.filePath}`);
          await this.queuedDownloadFileFromFTP(archivePhoto.filePath, archivePath);
        }

        const extractionPath = path.resolve('downloads', 'photos');
        if (!fs.existsSync(extractionPath)) {
          fs.mkdirSync(extractionPath, { recursive: true });
        }

        const directory = await unzipper.Open.file(archivePath);
        for (const file of directory.files) {
          if (!file.path.endsWith('/')) {
            const filePath = path.join(extractionPath, file.path);
            const writeStream = fs.createWriteStream(filePath);
            file.stream().pipe(writeStream);

            await new Promise((resolve, reject) => {
              writeStream.on('finish', resolve);
              writeStream.on('error', reject);
            });

            const fileBuffer = fs.readFileSync(filePath);
            const base64Image = fileBuffer.toString('base64');
            photoData.push({ fileName: file.path, base64Image });

            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.error(`Error deleting extracted file: ${err}`);
            }
          }
        }

        try {
          fs.unlinkSync(archivePath);
        } catch (err) {
          console.error(`Error deleting archive file: ${err}`);
        }
      } else {
        for (const photo of photos) {
          const filePath = path.resolve('downloads', photo.filePath);
          if (fs.existsSync(filePath)) {
            const fileBuffer = fs.readFileSync(filePath);
            const base64Image = fileBuffer.toString('base64');
            photoData.push({ id: photo.id, base64Image });

            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.error(`Error deleting local file: ${err}`);
            }
          } else {
            console.log(`File not found locally, downloading from FTP: ${photo.filePath}`);
            await this.queuedDownloadFileFromFTP(photo.filePath, filePath);
            if (fs.existsSync(filePath)) {
              const fileBuffer = fs.readFileSync(filePath);
              const base64Image = fileBuffer.toString('base64');
              photoData.push({ id: photo.id, base64Image });

              try {
                fs.unlinkSync(filePath);
              } catch (err) {
                console.error(`Error deleting local file: ${err}`);
              }
            } else {
              throw new NotFoundException({
                message: `Photo not found'`,
                code: ErrorCode.PHOTO_NOT_FOUND,
              });
            }
          }
        }
      }

      console.log(`Returning ${photoData.length} photos for visitId ${visitId}`);
      return photoData;
    });
  }

  async archiveAndUploadPhotos(
    visitId: number,
    files: Express.Multer.File[],
    transactionManager: EntityManager,
  ): Promise<string> {
    const visitObject = await transactionManager.findOne(Visit, { where: { id: visitId } });

    if (!visitObject) {
      throw new NotFoundException({
        message: 'Visit not found',
        code: 'VISIT_NOT_FOUND',
      });
    }

    if (files.length === 0) {
      return null;
    }

    const archiveName = `visit_${visitId}_${Date.now()}.zip`;
    const archivePath = path.join('./uploads', archiveName);

    return new Promise<string>((resolve, reject) => {
      const output = fs.createWriteStream(archivePath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', async () => {
        try {
          const remotePath = `/.next/files/photoTorg/${archiveName}`;
          await this.uploadFileToFTP(archivePath, remotePath);

          const photo = new Photo();
          photo.filePath = remotePath;
          photo.visit = visitObject.id;

          const savedPhoto = await transactionManager.save(Photo, photo);
          fs.unlink(archivePath, (err) => {
            if (err) {
              console.error(`Error deleting local archive: ${err}`);
            }
          });

          files.forEach((file) => {
            fs.unlink(file.path, (err) => {
              if (err) {
                console.error(`Error deleting local file: ${err}`);
              }
            });
          });

          resolve(remotePath);
        } catch (err) {
          reject(
            new InternalServerErrorException({
              message: `Error saving'`,
              code: ErrorCode.PHOTO_SAVING_FAILED,
            }),
          );
        }
      });

      output.on('error', (err) => {
        reject(
          new InternalServerErrorException({
            message: `Error saving'`,
            code: ErrorCode.PHOTO_SAVING_FAILED,
          }),
        );
      });

      archive.pipe(output);
      files.forEach((file) => {
        archive.append(fs.createReadStream(file.path), { name: file.filename });
      });
      archive.finalize();
    });
  }
}
