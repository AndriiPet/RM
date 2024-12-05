import { IsDateString } from 'class-validator';

export class GetVisitsDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
