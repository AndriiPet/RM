# Users API Documentation

## POST /users
Створити нового користувача.
### Тіло запиту
```json
{
  "ipn": "321312",
  "displayName": "534213",
  "role": 1,
  "manager": 18,
  "email": null,
  "phoneNumber": null,
  "isManager": null,
  "password": null,
  "lastLatitude": null,
  "lastLongitude": null,
  "profilePhoto": null
}
```
## GET /users
Отримати список всіх користувачів.
Повертає: Масив об'єктів користувачів з їх деталями, включаючи пов'язані робочі регіони.
### Тіло запиту
```json
[
  {
    "id": 18,
    "ipn": "1337",
    "displayName": "dasdas",
    "email": null,
    "phoneNumber": null,
    "isManager": true,
    "isRegistered": true,
    "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
    "lastLatitude": null,
    "lastLongitude": null,
    "profilePhoto": null,
    "created_at": "2024-06-17T05:03:35.059Z",
    "updated_at": "2024-07-05T07:46:12.936Z",
    "role": {
      "id": 1,
      "name": "Менеджер",
      "created_at": "2024-05-27T10:01:42.908Z",
      "updated_at": "2024-05-27T10:01:42.908Z"
    },
    "manager": {
      "id": 19,
      "ipn": "string",
      "displayName": "string",
      "email": "gmailcom",
      "phoneNumber": "string",
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$tk5pQLmWG00I8TJZmbOUZeHttcvixxQDTsMH4bHKmB2nZD7bkCRW6",
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-18T11:20:38.141Z",
      "updated_at": "2024-06-19T04:35:48.902Z"
    },
    "workRegions": [
      {
        "id": 1,
        "name": "Гірник",
        "latitude": "321312",
        "longitude": "3213123",
        "created_at": "2024-05-27T10:02:18.601Z",
        "updated_at": "2024-05-27T10:02:18.601Z"
      },
      {
        "id": 3,
        "name": "ЧорноЖопинськ",
        "latitude": null,
        "longitude": null,
        "created_at": "2024-06-06T04:29:05.715Z",
        "updated_at": "2024-06-06T04:29:05.715Z"
      }
    ]
  },
  {
    "id": 17,
    "ipn": "228",
    "displayName": "oleg",
    "email": null,
    "phoneNumber": null,
    "isManager": false,
    "isRegistered": true,
    "password": null,
    "lastLatitude": "18",
    "lastLongitude": "18",
    "profilePhoto": null,
    "created_at": "2024-06-17T03:14:09.294Z",
    "updated_at": "2024-07-01T04:57:40.413Z",
    "role": {
      "id": 1,
      "name": "Менеджер",
      "created_at": "2024-05-27T10:01:42.908Z",
      "updated_at": "2024-05-27T10:01:42.908Z"
    },
    "manager": {
      "id": 18,
      "ipn": "1337",
      "displayName": "dasdas",
      "email": null,
      "phoneNumber": null,
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-17T05:03:35.059Z",
      "updated_at": "2024-07-05T07:46:12.936Z"
    },
    "workRegions": [
      {
        "id": 1,
        "name": "Гірник",
        "latitude": "321312",
        "longitude": "3213123",
        "created_at": "2024-05-27T10:02:18.601Z",
        "updated_at": "2024-05-27T10:02:18.601Z"
      }
    ]
  }
]
```
## GET /users/allWithPagination
Отримати список користувачів з пагінацією.
- Query параметри:
  - page: номер сторінки
  - limit: кількість записів на сторінці
Повертає: Масив об'єктів користувачів з пагінацією.
### Тіло запиту
```json
[
  {
    "id": 18,
    "ipn": "1337",
    "displayName": "dasdas",
    "email": null,
    "phoneNumber": null,
    "isManager": true,
    "isRegistered": true,
    "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
    "lastLatitude": "1488",
    "lastLongitude": "1488",
    "profilePhoto": null,
    "created_at": "2024-06-17T05:03:35.059Z",
    "updated_at": "2024-07-09T05:05:11.705Z",
    "role": {
      "id": 1,
      "name": "Менеджер",
      "created_at": "2024-05-27T10:01:42.908Z",
      "updated_at": "2024-05-27T10:01:42.908Z"
    },
    "manager": {
      "id": 19,
      "ipn": "string",
      "displayName": "string",
      "email": "gmailcom",
      "phoneNumber": "string",
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$tk5pQLmWG00I8TJZmbOUZeHttcvixxQDTsMH4bHKmB2nZD7bkCRW6",
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-18T11:20:38.141Z",
      "updated_at": "2024-06-19T04:35:48.902Z"
    },
    "workRegions": [
      {
        "id": 3,
        "name": "ЧорноЖопинськ",
        "latitude": null,
        "longitude": null,
        "created_at": "2024-06-06T04:29:05.715Z",
        "updated_at": "2024-06-06T04:29:05.715Z"
      },
      {
        "id": 1,
        "name": "Гірник",
        "latitude": "321312",
        "longitude": "3213123",
        "created_at": "2024-05-27T10:02:18.601Z",
        "updated_at": "2024-05-27T10:02:18.601Z"
      }
    ]
  }
]
```
## GET /users/:id
Отримати інформацію про конкретного користувача за його ID.
Повертає: Об'єкт користувача з детальною інформацією, включаючи роль, менеджера та робочі регіони.
### Тіло запиту
```json
{
  "id": 18,
  "ipn": "1337",
  "displayName": "dasdas",
  "email": null,
  "phoneNumber": null,
  "isManager": true,
  "isRegistered": true,
  "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
  "lastLatitude": "1488",
  "lastLongitude": "1488",
  "profilePhoto": null,
  "created_at": "2024-06-17T05:03:35.059Z",
  "updated_at": "2024-07-09T05:05:11.705Z",
  "role": {
    "id": 1,
    "name": "Менеджер",
    "created_at": "2024-05-27T10:01:42.908Z",
    "updated_at": "2024-05-27T10:01:42.908Z"
  },
  "manager": {
    "id": 19,
    "ipn": "string",
    "displayName": "string",
    "email": "gmailcom",
    "phoneNumber": "string",
    "isManager": true,
    "isRegistered": true,
    "password": "$2b$10$tk5pQLmWG00I8TJZmbOUZeHttcvixxQDTsMH4bHKmB2nZD7bkCRW6",
    "lastLatitude": null,
    "lastLongitude": null,
    "profilePhoto": null,
    "created_at": "2024-06-18T11:20:38.141Z",
    "updated_at": "2024-06-19T04:35:48.902Z"
  },
  "workRegions": [
    {
      "id": 3,
      "name": "ЧорноЖопинськ",
      "latitude": null,
      "longitude": null,
      "created_at": "2024-06-06T04:29:05.715Z",
      "updated_at": "2024-06-06T04:29:05.715Z"
    },
    {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    }
  ]
}
```
## GET /users/user/managers
Отримати список всіх менеджерів.
Повертає: Масив об'єктів користувачів-менеджерів та їх кількість.
### Тіло запиту
```json
[
  [
    {
      "id": 21,
      "ipn": "dsasda",
      "displayName": "Менеджер",
      "email": "anal",
      "phoneNumber": "anal",
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$m1Qe1LFsTLoUrBlJplVHO.3j0v.qXLVtRQ1T.wqXcJWWczJ2iez6a",
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-21T07:43:02.019Z",
      "updated_at": "2024-07-04T10:29:56.657Z"
    },
    {
      "id": 19,
      "ipn": "string",
      "displayName": "string",
      "email": "gmailcom",
      "phoneNumber": "string",
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$tk5pQLmWG00I8TJZmbOUZeHttcvixxQDTsMH4bHKmB2nZD7bkCRW6",
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-18T11:20:38.141Z",
      "updated_at": "2024-06-19T04:35:48.902Z"
    },
    {
      "id": 18,
      "ipn": "1337",
      "displayName": "dasdas",
      "email": null,
      "phoneNumber": null,
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
      "lastLatitude": "1488",
      "lastLongitude": "1488",
      "profilePhoto": null,
      "created_at": "2024-06-17T05:03:35.059Z",
      "updated_at": "2024-07-09T05:05:11.705Z"
    }
  ],
  3
]
```
## GET /users/name/:name
Знайти користувача за ім'ям.
Повертає: Об'єкт користувача з детальною інформацією.
### Тіло запиту
```json
{
  "id": 21,
  "ipn": "dsasda",
  "displayName": "Менеджер",
  "email": "anal",
  "phoneNumber": "anal",
  "isManager": true,
  "isRegistered": true,
  "password": "$2b$10$m1Qe1LFsTLoUrBlJplVHO.3j0v.qXLVtRQ1T.wqXcJWWczJ2iez6a",
  "lastLatitude": null,
  "lastLongitude": null,
  "profilePhoto": null,
  "created_at": "2024-06-21T07:43:02.019Z",
  "updated_at": "2024-07-04T10:29:56.657Z",
  "role": {
    "id": 1,
    "name": "Менеджер",
    "created_at": "2024-05-27T10:01:42.908Z",
    "updated_at": "2024-05-27T10:01:42.908Z"
  },
  "manager": null,
  "workRegions": []
}
```
## GET /users/:id/profile-photo
Отримати фото профілю користувача.
Повертає: Файл зображення профілю користувача.
### Тіло запиту
```json
jpg,png photo
}
```
## GET /users/:userId/visits
Отримати статистику відвідувань для конкретного користувача.
Повертає: Об'єкт з кількістю завершених та незавершених відвідувань.
### Тіло запиту
```json
{
  "completed": 4,
  "uncompleted": 2
}
```
## GET /users/visited-per-month/:userId
Отримати статистику відвідувань по місяцях для підлеглих користувача.
- Query параметри:
  - startDate: дата початку періоду
  - endDate: дата кінця періоду
Повертає: Об'єкт з кількістю відвідувань по місяцях.
### Тіло запиту
```json
{
  "2024-06": 7,
  "2024-07": 1,
  "2024-08": 1
}
```
## GET /users/visited-previous-month/:userId
Отримати статистику відвідувань за попередній місяць для підлеглих користувача.
- Query параметри:
  - date: дата, відносно якої розраховується попередній місяць
Повертає: Об'єкт зі статистикою відвідувань за поточний та попередній місяці.
### Тіло запиту
```json
{
  "completedCurrentMonth": 0,
  "uncompletedCurrentMonth": 1,
  "completedPreviousMonth": 1,
  "uncompletedPreviousMonth": 0
}
```
## GET /users/user/subordinatesInRegion
Отримати список підлеглих у конкретному регіоні.
- Query параметри:
  - region: ID регіону
  - managerId: ID менеджера
Повертає: Об'єкт з інформацією про регіон та масивом підлеглих користувачів.
### Тіло запиту
```json
{
  "id": 3,
  "name": "ЧорноЖопинськ",
  "longitude": null,
  "latitude": null,
  "users": [
    {
      "id": 18,
      "ipn": "1337",
      "displayName": "dasdas",
      "email": null,
      "phoneNumber": null,
      "isManager": true,
      "isRegistered": true,
      "password": "$2b$10$cPqKKjLlbBhBvyYDeDcO4ejt1TyUETtcAI2sCN4hevGneeuNbKEFe",
      "lastLatitude": "1488",
      "lastLongitude": "1488",
      "profilePhoto": null,
      "created_at": "2024-06-17T05:03:35.059Z",
      "updated_at": "2024-07-09T05:05:11.705Z",
      "role": {
        "id": 1,
        "name": "Менеджер",
        "created_at": "2024-05-27T10:01:42.908Z",
        "updated_at": "2024-05-27T10:01:42.908Z"
      }
    },
    {
      "id": 20,
      "ipn": "1312",
      "displayName": "312321",
      "email": null,
      "phoneNumber": null,
      "isManager": false,
      "isRegistered": true,
      "password": null,
      "lastLatitude": null,
      "lastLongitude": null,
      "profilePhoto": null,
      "created_at": "2024-06-20T04:03:19.860Z",
      "updated_at": "2024-06-20T04:03:19.860Z",
      "role": {
        "id": 1,
        "name": "Менеджер",
        "created_at": "2024-05-27T10:01:42.908Z",
        "updated_at": "2024-05-27T10:01:42.908Z"
      }
    }
  ]
}
```
## GET /users/getSubordinatesByRegion/:userId
Отримати список підлеглих згрупованих за регіонами для конкретного користувача.
Повертає: Масив об'єктів з інформацією про регіони та підлеглих користувачів.
### Тіло запиту
```json
[
  {
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "longitude": "3213123",
      "latitude": "321312"
    },
    "users": [
      {
        "id": 17,
        "ipn": "228",
        "displayName": "oleg",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "password": null,
        "lastLatitude": "18",
        "lastLongitude": "18",
        "profilePhoto": null,
        "created_at": "2024-06-17T03:14:09.294Z",
        "updated_at": "2024-07-01T04:57:40.413Z"
      }
    ]
  },
  {
    "workRegion": {
      "id": 3,
      "name": "ЧорноЖопинськ",
      "longitude": null,
      "latitude": null
    },
    "users": [
      {
        "id": 20,
        "ipn": "1312",
        "displayName": "312321",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "password": null,
        "lastLatitude": null,
        "lastLongitude": null,
        "profilePhoto": null,
        "created_at": "2024-06-20T04:03:19.860Z",
        "updated_at": "2024-06-20T04:03:19.860Z"
      }
    ]
  }
]
```
## GET /users/getVisitSubordinatesByManager/:userId
Отримати статистику відвідувань підлеглих конкретного менеджера.
Повертає: Об'єкт з кількістю завершених та незавершених відвідувань всіх підлеглих.
### Тіло запиту
```json
{
  "completed": 6,
  "uncompleted": 4
}
```
## GET /users/getAllSubordinates/:managerId
Отримати список всіх підлеглих для конкретного менеджера.
Повертає: Масив об'єктів користувачів-підлеглих.
### Тіло запиту
```json
[
  {
    "id": 20,
    "ipn": "1312",
    "displayName": "312321",
    "email": null,
    "phoneNumber": null,
    "isManager": false,
    "isRegistered": true,
    "password": null,
    "lastLatitude": null,
    "lastLongitude": null,
    "profilePhoto": null,
    "created_at": "2024-06-20T04:03:19.860Z",
    "updated_at": "2024-06-20T04:03:19.860Z"
  },
  {
    "id": 17,
    "ipn": "228",
    "displayName": "oleg",
    "email": null,
    "phoneNumber": null,
    "isManager": false,
    "isRegistered": true,
    "password": null,
    "lastLatitude": "18",
    "lastLongitude": "18",
    "profilePhoto": null,
    "created_at": "2024-06-17T03:14:09.294Z",
    "updated_at": "2024-07-01T04:57:40.413Z"
  },
  {
    "id": 23,
    "ipn": "321312",
    "displayName": "534213",
    "email": null,
    "phoneNumber": null,
    "isManager": null,
    "isRegistered": false,
    "password": null,
    "lastLatitude": null,
    "lastLongitude": null,
    "profilePhoto": null,
    "created_at": "2024-07-09T04:54:01.082Z",
    "updated_at": "2024-07-09T04:54:01.082Z"
  }
]
```
## GET /users/user/getUsersWithoutRegion
Отримати список користувачів, які не призначені до жодного регіону.
Повертає: Масив об'єктів користувачів без призначеного регіону.
### Тіло запиту
```json
[
  {
    "id": 23,
    "ipn": "321312",
    "displayName": "534213",
    "email": null,
    "phoneNumber": null,
    "isManager": null,
    "isRegistered": false,
    "password": null,
    "lastLatitude": null,
    "lastLongitude": null,
    "profilePhoto": null,
    "created_at": "2024-07-09T04:54:01.082Z",
    "updated_at": "2024-07-09T04:54:01.082Z",
    "workRegions": []
  }
]
```
## POST /users
Створити нового користувача.
Повертає: Створений об'єкт користувача.
### Тіло запиту
```json
{
  "ipn": "3213",
  "displayName": "321312",
  "role": 1,
  "email": null,
  "phoneNumber": null,
  "isManager": null,
  "password": null,
  "lastLatitude": null,
  "lastLongitude": null,
  "profilePhoto": null,
  "id": 24,
  "isRegistered": false,
  "created_at": "2024-07-10T03:46:16.725Z",
  "updated_at": "2024-07-10T03:46:16.725Z"
}
```
## PATCH /users/:id
Оновити інформацію про користувача.
Повертає: Оновлений об'єкт користувача.
### Тіло запиту
```json
{
  "id": 24,
  "ipn": "allah",
  "displayName": "321312",
  "email": null,
  "phoneNumber": null,
  "isManager": true,
  "isRegistered": false,
  "password": null,
  "lastLatitude": null,
  "lastLongitude": null,
  "profilePhoto": null,
  "created_at": "2024-07-10T03:46:16.725Z",
  "updated_at": "2024-07-10T03:47:08.503Z",
  "role": {
    "id": 1,
    "name": "Менеджер",
    "created_at": "2024-05-27T10:01:42.908Z",
    "updated_at": "2024-05-27T10:01:42.908Z"
  },
  "manager": null
}
```
## PATCH /users/ipn/:ipn
Оновити інформацію про користувача за IPN (індивідуальний податковий номер).
Повертає: Оновлений об'єкт користувача.
### Тіло запиту
```json
{
  "id": 24,
  "ipn": "allah",
  "displayName": "321312",
  "email": "string",
  "phoneNumber": "string",
  "isManager": true,
  "isRegistered": true,
  "password": "$2b$10$F6F6sseG8yxvS3qQI1iwTOGcJIb7mc4SeRFogQ8BUB9RfdUOKS8Sa",
  "lastLatitude": null,
  "lastLongitude": null,
  "profilePhoto": null,
  "created_at": "2024-07-10T03:46:16.725Z",
  "updated_at": "2024-07-10T03:48:06.004Z"
}
```
## PATCH /users/:id/profile-photo
Оновити фото профілю користувача.
Повертає: Оновлений об'єкт користувача з новим шляхом до фото профілю.
## DELETE /users/:id
Видалити користувача.
Повертає: Немає вмісту у відповіді (204 No Content) у разі успішного видалення.

# Customer API Documentation

## POST /customer
Створити нового клієнта.
### Тіло запиту
```json
{
  "name": "string321",
  "phoneNumber": "string",
  "id": 6,
  "created_at": "2024-07-10T03:51:36.457Z",
  "updated_at": "2024-07-10T03:51:36.457Z"
}
```
### Можливі помилки
    - 409 Conflict: Клієнт з таким ім'ям вже існує
    - 500 Internal Server Error: Помилка збереження
    
  ## POST /customer
Створити нового клієнта.

## GET /customer
Отримати список всіх клієнтів.
### Тіло запиту
```json
[
  {
    "id": 4,
    "name": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-19T03:26:18.801Z",
    "updated_at": "2024-06-19T03:26:18.801Z"
  },
  {
    "id": 2,
    "name": "353",
    "phoneNumber": "5353",
    "created_at": "2024-05-28T08:28:26.505Z",
    "updated_at": "2024-06-19T03:35:28.720Z"
  },
  {
    "id": 6,
    "name": "string321",
    "phoneNumber": "string",
    "created_at": "2024-07-10T03:51:36.457Z",
    "updated_at": "2024-07-10T03:51:36.457Z"
  }
]
```
### Можливі помилки
    - 404 Conflict: Клієнт не знайдений
      
## GET /customer/allWithPagination
Отримати список клієнтів з пагінацією.
### Параментри запиту
    - page (query parameter, required): Номер сторінки
    - limit (query parameter, required): Кількість записів на сторінці
### Тіло запиту
```json
[
  {
    "id": 4,
    "name": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-19T03:26:18.801Z",
    "updated_at": "2024-06-19T03:26:18.801Z"
  },
  {
    "id": 2,
    "name": "353",
    "phoneNumber": "5353",
    "created_at": "2024-05-28T08:28:26.505Z",
    "updated_at": "2024-06-19T03:35:28.720Z"
  }
]
```
### Можливі помилки
    - 404 Conflict: Клієнт не знайдений
    
## GET /customer/:id
Отримати інформацію про конкретного клієнта за його ID.
### Параментри запиту
    - id (path parameter, required): ID клієнта
### Тіло запиту
```json
{
  "id": 4,
  "name": "string",
  "phoneNumber": "string",
  "created_at": "2024-06-19T03:26:18.801Z",
  "updated_at": "2024-06-19T03:26:18.801Z"
}
```
### Можливі помилки
    - 404 Not Found: Клієнт не знайдений
    
## PATCH /customer/:id
Оновити інформацію про клієнта.
### Параментри запиту
    - id (path parameter, required): ID клієнта
### Тіло запиту
```json
{
  "id": 4,
  "name": "string",
  "phoneNumber": "string",
  "created_at": "2024-06-19T03:26:18.801Z",
  "updated_at": "2024-07-10T04:05:39.030Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильний формат даних
    - 404 Not Found: Клієнт не знайдений
    - 500 Internal Server Error: Помилка оновлення клієнта
    
## DELETE  /customer/:id
Видалити клієнта.
### Параментри запиту
    - id (path parameter, required): ID клієнта
### Тіло запиту
Не повертає вмісту у разі успішного видалення.
### Можливі помилки
    - 404 Not Found: Клієнт не знайдений
    
    
# TradingPoints API Documentation

## POST /tradingPoint
Створити нову торгову точку.
### Параментри запиту
``` json
{
  "user": 20,
  "customer": 4,
  "workRegion": 1,
  "name": "4343",
  "address": "string",
  "latitude": "string",
  "longitude": "string",
  "phoneNumber": "string"
}
```
### Тіло запиту
``` json
{
  "user": 20,
  "customer": 4,
  "workRegion": 1,
  "name": "4343",
  "address": "string",
  "latitude": "string",
  "longitude": "string",
  "phoneNumber": "string",
  "id": 24,
  "created_at": "2024-07-10T04:11:41.967Z",
  "updated_at": "2024-07-10T04:11:41.967Z"
}
```
### Можливі помилки
    - 400 Conflict: Trading Point already exist
    - 500 InternalServerError : Saving error
    
## GET /tradingPoint
Отримати список всіх торгових точок.
### Параментри запиту
    - userID (query parameter, required): ID користувача
### Тіло запиту
```json
[
  {
    "id": 18,
    "name": "string",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-18T05:39:12.572Z",
    "updated_at": "2024-06-18T05:39:12.572Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": false
  },
  {
    "id": 20,
    "name": "анал",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-21T05:39:16.759Z",
    "updated_at": "2024-06-21T05:39:16.759Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": false
  },
  {
    "id": 21,
    "name": "Гірник",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-21T05:39:22.569Z",
    "updated_at": "2024-06-21T05:39:22.569Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": false
  },
  {
    "id": 24,
    "name": "4343",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-07-10T04:11:41.967Z",
    "updated_at": "2024-07-10T04:11:41.967Z",
    "customer": {
      "id": 4,
      "name": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-19T03:26:18.801Z",
      "updated_at": "2024-07-10T04:05:39.030Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": false
  }
]
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені   
 
## GET /tradingPoint/allWithPagination
Отримати список торгових точок з пагінацією.
### Параментри запиту
    - userID (query parameter, required): ID користувача
    - page (query parameter, required): Номер сторінки
    - limit (query parameter, required): Кількість записів на сторінці
### Тіло запиту
```json
{
  "data": [
    {
      "id": 20,
      "name": "анал",
      "address": "string",
      "longitude": "string",
      "latitude": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-21T05:39:16.759Z",
      "updated_at": "2024-06-21T05:39:16.759Z",
      "customer": {
        "id": 2,
        "name": "353",
        "phoneNumber": "5353",
        "created_at": "2024-05-28T08:28:26.505Z",
        "updated_at": "2024-06-19T03:35:28.720Z"
      },
      "workRegion": {
        "id": 1,
        "name": "Гірник",
        "latitude": "321312",
        "longitude": "3213123",
        "created_at": "2024-05-27T10:02:18.601Z",
        "updated_at": "2024-05-27T10:02:18.601Z"
      },
      "canDelete": false
    },
    {
      "id": 18,
      "name": "string",
      "address": "string",
      "longitude": "string",
      "latitude": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-18T05:39:12.572Z",
      "updated_at": "2024-06-18T05:39:12.572Z",
      "customer": {
        "id": 2,
        "name": "353",
        "phoneNumber": "5353",
        "created_at": "2024-05-28T08:28:26.505Z",
        "updated_at": "2024-06-19T03:35:28.720Z"
      },
      "workRegion": {
        "id": 1,
        "name": "Гірник",
        "latitude": "321312",
        "longitude": "3213123",
        "created_at": "2024-05-27T10:02:18.601Z",
        "updated_at": "2024-05-27T10:02:18.601Z"
      },
      "canDelete": false
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 2
}
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені      
    
## GET /tradingPoint/id
Отримати інформацію про конкретну торгову точку за її ID.
### Параментри запиту
    - userID (query parameter, required): ID користувача
    - id (query parameter, required): ID торгової точки
### Тіло запиту
```json
{
  "id": 20,
  "name": "анал",
  "address": "string",
  "longitude": "string",
  "latitude": "string",
  "phoneNumber": "string",
  "created_at": "2024-06-21T05:39:16.759Z",
  "updated_at": "2024-06-21T05:39:16.759Z",
  "workRegion": {
    "id": 1,
    "name": "Гірник",
    "latitude": "321312",
    "longitude": "3213123",
    "created_at": "2024-05-27T10:02:18.601Z",
    "updated_at": "2024-05-27T10:02:18.601Z"
  },
  "customer": {
    "id": 2,
    "name": "353",
    "phoneNumber": "5353",
    "created_at": "2024-05-28T08:28:26.505Z",
    "updated_at": "2024-06-19T03:35:28.720Z"
  },
  "canDelete": false
}
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені         
    
## GET /tradingPoint/name
Знайти торгову точку за назвою.
### Параментри запиту
    - userID (query parameter, required): ID користувача
    - name (query parameter, required): Назва торгової точки
### Тіло запиту
```json
{
  "id": 20,
  "name": "анал",
  "address": "string",
  "longitude": "string",
  "latitude": "string",
  "phoneNumber": "string",
  "created_at": "2024-06-21T05:39:16.759Z",
  "updated_at": "2024-06-21T05:39:16.759Z",
  "customer": {
    "id": 2,
    "name": "353",
    "phoneNumber": "5353",
    "created_at": "2024-05-28T08:28:26.505Z",
    "updated_at": "2024-06-19T03:35:28.720Z"
  },
  "workRegion": {
    "id": 1,
    "name": "Гірник",
    "latitude": "321312",
    "longitude": "3213123",
    "created_at": "2024-05-27T10:02:18.601Z",
    "updated_at": "2024-05-27T10:02:18.601Z"
  },
  "canDelete": false
}
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені            
    
## GET /tradingPoint/tradingPoint
Отримати торгові точки конкретного користувача.
### Параментри запиту
    - userID (query parameter, required): ID користувача
### Тіло запиту
```json
[
  {
    "id": 24,
    "name": "4343",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-07-10T04:11:41.967Z",
    "updated_at": "2024-07-10T04:11:41.967Z",
    "customer": {
      "id": 4,
      "name": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-19T03:26:18.801Z",
      "updated_at": "2024-07-10T04:05:39.030Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": true
  }
]
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені            
       
## GET /tradingPoint/tradingPoint
Отримати торгові точки конкретного користувача.
### Параментри запиту
    - userID (query parameter, required): ID користувача
### Тіло запиту
```json
[
  {
    "id": 24,
    "name": "4343",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-07-10T04:11:41.967Z",
    "updated_at": "2024-07-10T04:11:41.967Z",
    "customer": {
      "id": 4,
      "name": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-19T03:26:18.801Z",
      "updated_at": "2024-07-10T04:05:39.030Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "canDelete": true
  }
]
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені             
    
## GET /tradingPoint/tradingPoint/workRegion
Отримати торгові точки в конкретному робочому регіоні.
### Параментри запиту
    - userID (query parameter, required): ID користувача
    - workRegionId (query parameter, required): ID робочого регіону
### Тіло запиту
```json
[
  {
    "id": 24,
    "name": "4343",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-07-10T04:11:41.967Z",
    "updated_at": "2024-07-10T04:11:41.967Z",
    "customer": {
      "id": 4,
      "name": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-19T03:26:18.801Z",
      "updated_at": "2024-07-10T04:05:39.030Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "visits": [],
    "canDelete": false
  },
  {
    "id": 21,
    "name": "Гірник",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-21T05:39:22.569Z",
    "updated_at": "2024-06-21T05:39:22.569Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "visits": [],
    "canDelete": false
  },
  {
    "id": 20,
    "name": "анал",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-21T05:39:16.759Z",
    "updated_at": "2024-06-21T05:39:16.759Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "visits": [],
    "canDelete": false
  },
  {
    "id": 18,
    "name": "string",
    "address": "string",
    "longitude": "string",
    "latitude": "string",
    "phoneNumber": "string",
    "created_at": "2024-06-18T05:39:12.572Z",
    "updated_at": "2024-06-18T05:39:12.572Z",
    "customer": {
      "id": 2,
      "name": "353",
      "phoneNumber": "5353",
      "created_at": "2024-05-28T08:28:26.505Z",
      "updated_at": "2024-06-19T03:35:28.720Z"
    },
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "visits": [
      {
        "id": 30,
        "isVisited": true,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-06-21T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:43.661Z",
        "updated_at": "2024-06-25T10:01:43.661Z"
      },
      {
        "id": 29,
        "isVisited": true,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-06-21T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:43.661Z",
        "updated_at": "2024-06-25T10:01:43.661Z"
      },
      {
        "id": 28,
        "isVisited": false,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-06-21T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:43.661Z",
        "updated_at": "2024-06-25T10:01:43.661Z"
      },
      {
        "id": 26,
        "isVisited": true,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-07-21T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:31.618Z",
        "updated_at": "2024-06-25T10:01:31.618Z"
      },
      {
        "id": 22,
        "isVisited": true,
        "isPriority": false,
        "timeStart": "2024-06-03T07:00:00.000Z",
        "timeEnd": "2024-06-03T07:30:00.000Z",
        "visitDate": "2024-06-19T07:24:02.128Z",
        "latitude": "string",
        "longitude": "string",
        "comment": "string",
        "created_at": "2024-06-19T04:24:14.098Z",
        "updated_at": "2024-06-24T05:43:48.866Z"
      },
      {
        "id": 21,
        "isVisited": true,
        "isPriority": true,
        "timeStart": "2024-06-21T09:09:14.558Z",
        "timeEnd": "2024-06-21T09:09:14.558Z",
        "visitDate": "2024-06-21T09:09:14.558Z",
        "latitude": "string",
        "longitude": "string",
        "comment": "string",
        "created_at": "2024-06-19T04:24:09.963Z",
        "updated_at": "2024-06-21T06:09:28.826Z"
      },
      {
        "id": 24,
        "isVisited": false,
        "isPriority": false,
        "timeStart": "2024-06-21T09:03:02.327Z",
        "timeEnd": "2024-06-21T09:03:02.327Z",
        "visitDate": "2024-06-21T09:03:02.327Z",
        "latitude": "string",
        "longitude": "string",
        "comment": "string",
        "created_at": "2024-06-21T06:03:06.494Z",
        "updated_at": "2024-06-21T06:03:06.494Z"
      },
      {
        "id": 36,
        "isVisited": false,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": null,
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-07-09T09:01:59.325Z",
        "updated_at": "2024-07-09T09:01:59.325Z"
      },
      {
        "id": 27,
        "isVisited": false,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-08-12T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:31.618Z",
        "updated_at": "2024-06-25T10:01:31.618Z"
      },
      {
        "id": 25,
        "isVisited": true,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": "2024-06-30T09:09:14.558Z",
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-06-25T10:01:31.618Z",
        "updated_at": "2024-06-25T10:01:31.618Z"
      },
      {
        "id": 31,
        "isVisited": false,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": null,
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-07-04T11:06:41.701Z",
        "updated_at": "2024-07-04T11:06:41.701Z"
      }
    ],
    "canDelete": false
  }
]
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені               
    
## PATCH /tradingPoint/:id
Оновити інформацію про торгову точку.
### Параментри запиту
   - id (path parameter, required): ID торгової точки
### Тіло запиту
```json
{
  "id": 20,
  "name": "анал",
  "address": "string",
  "longitude": "string",
  "latitude": "string",
  "phoneNumber": "string",
  "created_at": "2024-06-21T05:39:16.759Z",
  "updated_at": "2024-07-10T06:24:48.698Z"
}
```
### Можливі помилки
    - 400 Bad Request: Не надано даних для оновлення
    - 404 Not Found: Торгова точка не знайдена
    - 500 Internal Server Error: Помилка оновлення торгової точки                
    
## DELETE /tradingPoint
Видалити торгову точку.
### Параментри запиту
    - id (query parameter, required): ID торгової точки
     - userID (query parameter, required): ID користувача
### Тіло запиту
```json
Не повертає вмісту у разі успішного видалення
```
### Можливі помилки
    - 404 Not Found: Торгові точки не знайдені                
    
# Visits API Documentation   
   
## POST /visit
Створити новий візит.
### Параментри запиту
```json
{
  "trip": number,
  "tradingPoint": number
}
```
### Тіло запиту
```json
{
  "trip": 9,
  "tradingPoint": 18,
  "visitDate": "2024-07-10T11:17:14.261Z",
  "timeStart": "2024-07-10T11:17:14.261Z",
  "timeEnd": "2024-07-10T11:17:14.261Z",
  "latitude": "string",
  "longitude": "string",
  "comment": "string",
  "isPriority": false,
  "isVisited": false,
  "id": 37,
  "created_at": "2024-07-10T08:17:36.338Z",
  "updated_at": "2024-07-10T08:17:36.338Z"
}
```
### Можливі помилки
    - 409 Conflict: Візит до цієї торгової точки вже існує
    - 500 Internal Server Error: Торгова точка не знайдена або помилка збереження                
    
## GET /visit
Отримати список всіх візитів
### Параментри запиту
### Тіло запиту
```json
[
  {
    "id": 31,
    "isVisited": false,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": null,
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-07-04T11:06:41.701Z",
    "updated_at": "2024-07-04T11:06:41.701Z"
  },
  {
    "id": 25,
    "isVisited": true,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-06-30T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:31.618Z",
    "updated_at": "2024-06-25T10:01:31.618Z"
  },
  {
    "id": 27,
    "isVisited": false,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-08-12T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:31.618Z",
    "updated_at": "2024-06-25T10:01:31.618Z"
  },
  {
    "id": 36,
    "isVisited": false,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": null,
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-07-09T09:01:59.325Z",
    "updated_at": "2024-07-09T09:01:59.325Z"
  },
  {
    "id": 37,
    "isVisited": false,
    "isPriority": false,
    "timeStart": "2024-07-10T11:17:14.261Z",
    "timeEnd": "2024-07-10T11:17:14.261Z",
    "visitDate": "2024-07-10T11:17:14.261Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-07-10T08:17:36.338Z",
    "updated_at": "2024-07-10T08:17:36.338Z"
  },
  {
    "id": 24,
    "isVisited": false,
    "isPriority": false,
    "timeStart": "2024-06-21T09:03:02.327Z",
    "timeEnd": "2024-06-21T09:03:02.327Z",
    "visitDate": "2024-06-21T09:03:02.327Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-21T06:03:06.494Z",
    "updated_at": "2024-06-21T06:03:06.494Z"
  },
  {
    "id": 21,
    "isVisited": true,
    "isPriority": true,
    "timeStart": "2024-06-21T09:09:14.558Z",
    "timeEnd": "2024-06-21T09:09:14.558Z",
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:09.963Z",
    "updated_at": "2024-06-21T06:09:28.826Z"
  },
  {
    "id": 22,
    "isVisited": true,
    "isPriority": false,
    "timeStart": "2024-06-03T07:00:00.000Z",
    "timeEnd": "2024-06-03T07:30:00.000Z",
    "visitDate": "2024-06-19T07:24:02.128Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:14.098Z",
    "updated_at": "2024-06-24T05:43:48.866Z"
  },
  {
    "id": 26,
    "isVisited": true,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-07-21T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:31.618Z",
    "updated_at": "2024-06-25T10:01:31.618Z"
  },
  {
    "id": 28,
    "isVisited": false,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:43.661Z",
    "updated_at": "2024-06-25T10:01:43.661Z"
  },
  {
    "id": 29,
    "isVisited": true,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:43.661Z",
    "updated_at": "2024-06-25T10:01:43.661Z"
  },
  {
    "id": 30,
    "isVisited": true,
    "isPriority": true,
    "timeStart": null,
    "timeEnd": null,
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": null,
    "longitude": null,
    "comment": "string",
    "created_at": "2024-06-25T10:01:43.661Z",
    "updated_at": "2024-06-25T10:01:43.661Z"
  }
]
```
### Можливі помилки
    - 404 Not Found: Візити не знайдені               
    
## GET /visit/id/:id
Отримати інформацію про конкретний візит за його ID.
### Параментри запиту
    - id (path parameter, required): ID візиту
### Тіло запиту
```json
{
  "id": 31,
  "isVisited": false,
  "isPriority": true,
  "timeStart": null,
  "timeEnd": null,
  "visitDate": null,
  "latitude": null,
  "longitude": null,
  "comment": "string",
  "created_at": "2024-07-04T11:06:41.701Z",
  "updated_at": "2024-07-04T11:06:41.701Z"
}
```
### Можливі помилки
    - 404 Not Found: Візити не знайдені               
        
## GET /visit/tripid/:tripId
Отримати візити для конкретної поїздки.
### Параментри запиту
    - tripId (path parameter, required): ID поїздки
### Тіло запиту
```json
[
  {
    "id": 22,
    "isVisited": true,
    "isPriority": false,
    "timeStart": "2024-06-03T07:00:00.000Z",
    "timeEnd": "2024-06-03T07:30:00.000Z",
    "visitDate": "2024-06-19T07:24:02.128Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:14.098Z",
    "updated_at": "2024-06-24T05:43:48.866Z",
    "tradingPoint": {
      "id": 18,
      "name": "string",
      "address": "string",
      "longitude": "string",
      "latitude": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-18T05:39:12.572Z",
      "updated_at": "2024-06-18T05:39:12.572Z"
    }
  },
  {
    "id": 21,
    "isVisited": true,
    "isPriority": true,
    "timeStart": "2024-06-21T09:09:14.558Z",
    "timeEnd": "2024-06-21T09:09:14.558Z",
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:09.963Z",
    "updated_at": "2024-06-21T06:09:28.826Z",
    "tradingPoint": {
      "id": 18,
      "name": "string",
      "address": "string",
      "longitude": "string",
      "latitude": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-18T05:39:12.572Z",
      "updated_at": "2024-06-18T05:39:12.572Z"
    }
  },
  {
    "id": 24,
    "isVisited": false,
    "isPriority": false,
    "timeStart": "2024-06-21T09:03:02.327Z",
    "timeEnd": "2024-06-21T09:03:02.327Z",
    "visitDate": "2024-06-21T09:03:02.327Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-21T06:03:06.494Z",
    "updated_at": "2024-06-21T06:03:06.494Z",
    "tradingPoint": {
      "id": 18,
      "name": "string",
      "address": "string",
      "longitude": "string",
      "latitude": "string",
      "phoneNumber": "string",
      "created_at": "2024-06-18T05:39:12.572Z",
      "updated_at": "2024-06-18T05:39:12.572Z"
    }
  }
]
```
### Можливі помилки
    - 404 Not Found: Візити не знайдені                   
    
## GET /visit/byUserAndDate
Отримати візити за користувачем та датою.
### Параментри запиту
    - userId (query parameter, optional): ID користувача
    - date (query parameter, optional): Дата
### Тіло запиту
```json
[
  {
    "id": 24,
    "isVisited": false,
    "isPriority": false,
    "timeStart": "2024-06-21T09:03:02.327Z",
    "timeEnd": "2024-06-21T09:03:02.327Z",
    "visitDate": "2024-06-21T09:03:02.327Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-21T06:03:06.494Z",
    "updated_at": "2024-06-21T06:03:06.494Z",
    "trip": {
      "id": 8,
      "startDate": "2024-06-16T21:00:00.000Z",
      "created_at": "2024-06-17T07:55:10.760Z",
      "updated_at": "2024-06-17T07:55:10.760Z",
      "user": {
        "id": 17,
        "ipn": "228",
        "displayName": "oleg",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "password": null,
        "lastLatitude": "18",
        "lastLongitude": "18",
        "profilePhoto": null,
        "created_at": "2024-06-17T03:14:09.294Z",
        "updated_at": "2024-07-01T04:57:40.413Z"
      }
    }
  },
  {
    "id": 21,
    "isVisited": true,
    "isPriority": true,
    "timeStart": "2024-06-21T09:09:14.558Z",
    "timeEnd": "2024-06-21T09:09:14.558Z",
    "visitDate": "2024-06-21T09:09:14.558Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:09.963Z",
    "updated_at": "2024-06-21T06:09:28.826Z",
    "trip": {
      "id": 8,
      "startDate": "2024-06-16T21:00:00.000Z",
      "created_at": "2024-06-17T07:55:10.760Z",
      "updated_at": "2024-06-17T07:55:10.760Z",
      "user": {
        "id": 17,
        "ipn": "228",
        "displayName": "oleg",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "password": null,
        "lastLatitude": "18",
        "lastLongitude": "18",
        "profilePhoto": null,
        "created_at": "2024-06-17T03:14:09.294Z",
        "updated_at": "2024-07-01T04:57:40.413Z"
      }
    }
  },
  {
    "id": 22,
    "isVisited": true,
    "isPriority": false,
    "timeStart": "2024-06-03T07:00:00.000Z",
    "timeEnd": "2024-06-03T07:30:00.000Z",
    "visitDate": "2024-06-19T07:24:02.128Z",
    "latitude": "string",
    "longitude": "string",
    "comment": "string",
    "created_at": "2024-06-19T04:24:14.098Z",
    "updated_at": "2024-06-24T05:43:48.866Z",
    "trip": {
      "id": 8,
      "startDate": "2024-06-16T21:00:00.000Z",
      "created_at": "2024-06-17T07:55:10.760Z",
      "updated_at": "2024-06-17T07:55:10.760Z",
      "user": {
        "id": 17,
        "ipn": "228",
        "displayName": "oleg",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "password": null,
        "lastLatitude": "18",
        "lastLongitude": "18",
        "profilePhoto": null,
        "created_at": "2024-06-17T03:14:09.294Z",
        "updated_at": "2024-07-01T04:57:40.413Z"
      }
    }
  }
]
```
### Можливі помилки
    - 404 Not Found: Візити не знайдені                   
    
## PATCH /visit/id/:id
Оновити інформацію про візит.
### Параментри запиту
    - id (path parameter, required): ID візиту
    
``` json
{
  "isVisited": boolean,
  "isPriority": boolean
}
```
### Тіло запиту
```json
{
  "id": 31,
  "isVisited": false,
  "isPriority": true,
  "timeStart": null,
  "timeEnd": null,
  "visitDate": null,
  "latitude": null,
  "longitude": null,
  "comment": "НАХУЙ",
  "created_at": "2024-07-04T11:06:41.701Z",
  "updated_at": "2024-07-10T08:24:56.355Z"
}
```
### Можливі помилки
    - 400 Bad Request: Не надано даних для оновлення
    - 404 Not Found: Візит не знайдений
    - 500 Internal Server Error: Помилка оновлення візиту              
    
## PATCH /visit/:id/update-with-photos
Додати фотографії до візиту.
### Параментри запиту
    - id (path parameter, required): ID візиту
    - Масив фотографій
### Тіло запиту
### Можливі помилки
    - 400 Bad Request: Не надано даних для оновлення
    - 404 Not Found: Візит не знайдений
    - 500 Internal Server Error: Помилка оновлення візиту                
    
## DELETE  /visit/:visitId/:userId
Видалити візит.
### Параментри запиту
    - visitId (path parameter, required): ID візиту
    - userId (path parameter, required): ID користувача
### Тіло запиту
Не повертає вмісту у разі успішного видалення
### Можливі помилки
    - 403 Forbidden: У користувача немає прав на видалення візиту
    - 404 Not Found: Візит не знайдений
    - 500 Internal Server Error: Помилка оновлення візиту                   
    
# Trips API Documentation   
   
## POST /trip
Створити нову поїздку з візитами.
### Параментри запиту
```json
{
  "createTripDto": {
    "user": number,
    "workRegion": number,
    "startDate": "2024-07-10T00:00:00.000Z"
  },
  "createVisitTripDto": [
    {
      "tradingPoint": number,
      "isPriority": boolean
    }
  ]
}
```
### Тіло запиту
```json
{
  "startDate": "2024-07-10T11:40:39.653Z",
  "user": 17,
  "workRegion": 1,
  "id": 14,
  "created_at": "2024-07-10T08:40:47.372Z",
  "updated_at": "2024-07-10T08:40:47.372Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильні дані запиту
    - 404 Not Found: Користувач або робочий регіон не знайдені
    - 409 Conflict: Поїздка вже існує для цього користувача і дати                
    
## GET /trip
Створити нову поїздку з візитами.
### Параментри запиту
```json

```
### Тіло запиту
```json
[
  {
    "id": 9,
    "startDate": "2024-06-20T10:54:23.278Z",
    "created_at": "2024-06-20T07:54:54.687Z",
    "updated_at": "2024-06-20T07:54:54.687Z"
  },
  {
    "id": 11,
    "startDate": "2024-06-25T13:00:50.126Z",
    "created_at": "2024-06-25T10:01:43.661Z",
    "updated_at": "2024-06-25T10:01:43.661Z"
  },
  {
    "id": 12,
    "startDate": "2024-07-04T14:06:23.621Z",
    "created_at": "2024-07-04T11:06:41.701Z",
    "updated_at": "2024-07-04T11:06:41.701Z"
  },
  {
    "id": 13,
    "startDate": "2024-07-09T00:00:00.000Z",
    "created_at": "2024-07-09T09:01:59.325Z",
    "updated_at": "2024-07-09T09:01:59.325Z"
  },
  {
    "id": 10,
    "startDate": "2024-06-24T21:00:00.000Z",
    "created_at": "2024-06-25T10:01:31.618Z",
    "updated_at": "2024-06-25T10:01:31.618Z"
  },
  {
    "id": 8,
    "startDate": "2024-06-16T21:00:00.000Z",
    "created_at": "2024-06-17T07:55:10.760Z",
    "updated_at": "2024-06-17T07:55:10.760Z"
  }
]
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені
    
## GET /trip/id/:id
Отримати інформацію про конкретну поїздку за її ID.
### Параментри запиту
    - id (path parameter, required): ID поїздки
### Тіло запиту
```json
{
  "id": 12,
  "startDate": "2024-07-04T14:06:23.621Z",
  "created_at": "2024-07-04T11:06:41.701Z",
  "updated_at": "2024-07-04T11:06:41.701Z",
  "visits": [
    {
      "id": 31,
      "isVisited": false,
      "isPriority": true,
      "timeStart": null,
      "timeEnd": null,
      "visitDate": null,
      "latitude": null,
      "longitude": null,
      "comment": "НАХУЙ",
      "created_at": "2024-07-04T11:06:41.701Z",
      "updated_at": "2024-07-10T08:24:56.355Z"
    }
  ]
}
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені   
    
## GET /trip/byUserDateAndRegion
Отримати поїздку за користувачем, датою та робочим регіоном.
### Параментри запиту
    - userId (query parameter, optional): ID користувача
    - date (query parameter, optional): Дата поїздки
    - workRegion (query parameter, optional): ID робочого регіону
### Тіло запиту
```json
{
  "id": 14,
  "startDate": "2024-07-10T11:40:39.653Z",
  "created_at": "2024-07-10T08:40:47.372Z",
  "updated_at": "2024-07-10T08:40:47.372Z",
  "visits": [
    {
      "id": 38,
      "isVisited": false,
      "isPriority": true,
      "timeStart": null,
      "timeEnd": null,
      "visitDate": null,
      "latitude": null,
      "longitude": null,
      "comment": "string",
      "created_at": "2024-07-10T08:40:47.372Z",
      "updated_at": "2024-07-10T08:40:47.372Z",
      "tradingPoint": {
        "id": 18,
        "name": "string",
        "address": "string",
        "longitude": "string",
        "latitude": "string",
        "phoneNumber": "string",
        "created_at": "2024-06-18T05:39:12.572Z",
        "updated_at": "2024-06-18T05:39:12.572Z"
      }
    }
  ]
}
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені   
       
## GET /trip/getTripForManager
Отримати поїздки для менеджера
### Параментри запиту
    - managerId (query parameter, optional): ID менеджера
    - userId (query parameter, optional): ID користувача
    - date (query parameter, optional): Дата поїздки
     -workRegion (query parameter, optional): ID робочого регіону
### Тіло запиту
```json
[
  {
    "id": 14,
    "startDate": "2024-07-10T11:40:39.653Z",
    "created_at": "2024-07-10T08:40:47.372Z",
    "updated_at": "2024-07-10T08:40:47.372Z",
    "visits": [
      {
        "id": 38,
        "isVisited": false,
        "isPriority": true,
        "timeStart": null,
        "timeEnd": null,
        "visitDate": null,
        "latitude": null,
        "longitude": null,
        "comment": "string",
        "created_at": "2024-07-10T08:40:47.372Z",
        "updated_at": "2024-07-10T08:40:47.372Z",
        "tradingPoint": {
          "id": 18,
          "name": "string",
          "address": "string",
          "longitude": "string",
          "latitude": "string",
          "phoneNumber": "string",
          "created_at": "2024-06-18T05:39:12.572Z",
          "updated_at": "2024-06-18T05:39:12.572Z"
        }
      }
    ],
    "workRegion": {
      "id": 1,
      "name": "Гірник",
      "latitude": "321312",
      "longitude": "3213123",
      "created_at": "2024-05-27T10:02:18.601Z",
      "updated_at": "2024-05-27T10:02:18.601Z"
    },
    "user": {
      "id": 17,
      "ipn": "228",
      "displayName": "oleg",
      "email": null,
      "phoneNumber": null,
      "isManager": false,
      "isRegistered": true,
      "password": null,
      "lastLatitude": "18",
      "lastLongitude": "18",
      "profilePhoto": null,
      "created_at": "2024-06-17T03:14:09.294Z",
      "updated_at": "2024-07-01T04:57:40.413Z"
    }
  }
]
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені    
    
## GET /trip/getCurrentTripForUser
Отримати поточну поїздку для користувача
### Параментри запиту
    - userId (query parameter, optional): ID користувача
    - date (query parameter, optional): Дата поїздки
### Тіло запиту
```json
{
  "id": 14,
  "startDate": "2024-07-10T11:40:39.653Z",
  "created_at": "2024-07-10T08:40:47.372Z",
  "updated_at": "2024-07-10T08:40:47.372Z",
  "visits": [
    {
      "id": 38,
      "isVisited": false,
      "isPriority": true,
      "timeStart": null,
      "timeEnd": null,
      "visitDate": null,
      "latitude": null,
      "longitude": null,
      "comment": "string",
      "created_at": "2024-07-10T08:40:47.372Z",
      "updated_at": "2024-07-10T08:40:47.372Z",
      "tradingPoint": {
        "id": 18,
        "name": "string",
        "address": "string",
        "longitude": "string",
        "latitude": "string",
        "phoneNumber": "string",
        "created_at": "2024-06-18T05:39:12.572Z",
        "updated_at": "2024-06-18T05:39:12.572Z"
      }
    }
  ]
}
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені      
    
# WorkRegions API Documentation      
    
## POST /workRegion
Створити новий робочий регіон.
### Параментри запиту
``` json
{
  "name": "string",
  "longitude": "string",
  "latitude": "string"
}
```
### Тіло запиту
```json
{
  "name": "string",
  "latitude": "string",
  "longitude": "string",
  "id": 8,
  "created_at": "2024-07-10T08:55:59.657Z",
  "updated_at": "2024-07-10T08:55:59.657Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильні дані запиту
    - 409 Conflict: Регіон з такою назвою вже існує      
    
## GET /workRegion
Отримати список всіх робочих регіонів.
### Параментри запиту
### Тіло запиту
```json
[
  {
    "id": 3,
    "name": "ЧорноЖопинськ",
    "latitude": null,
    "longitude": null,
    "created_at": "2024-06-06T04:29:05.715Z",
    "updated_at": "2024-06-06T04:29:05.715Z"
  },
  {
    "id": 1,
    "name": "Гірник",
    "latitude": "321312",
    "longitude": "3213123",
    "created_at": "2024-05-27T10:02:18.601Z",
    "updated_at": "2024-05-27T10:02:18.601Z"
  },
  {
    "id": 7,
    "name": "аллах",
    "latitude": "23132",
    "longitude": "321312",
    "created_at": "2024-07-04T10:44:01.657Z",
    "updated_at": "2024-07-04T10:44:01.657Z"
  },
  {
    "id": 8,
    "name": "string",
    "latitude": "string",
    "longitude": "string",
    "created_at": "2024-07-10T08:55:59.657Z",
    "updated_at": "2024-07-10T08:55:59.657Z"
  }
]
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені          
    
## GET /workRegion/withUserorUser
Отримати список всіх робочих регіонів з прив'язаними користувачами.
### Параментри запиту
### Тіло запиту
```json
[
  {
    "id": 1,
    "name": "Гірник",
    "latitude": "321312",
    "longitude": "3213123",
    "created_at": "2024-05-27T10:02:18.601Z",
    "updated_at": "2024-05-27T10:02:18.601Z",
    "users": [
      {
        "id": 18,
        "ipn": "1337",
        "displayName": "dasdas",
        "email": null,
        "phoneNumber": null,
        "isManager": true,
        "isRegistered": true,
        "lastLatitude": "1488",
        "lastLongitude": "1488",
        "profilePhoto": null,
        "created_at": "2024-06-17T05:03:35.059Z",
        "updated_at": "2024-07-09T05:05:11.705Z"
      },
      {
        "id": 17,
        "ipn": "228",
        "displayName": "oleg",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "lastLatitude": "18",
        "lastLongitude": "18",
        "profilePhoto": null,
        "created_at": "2024-06-17T03:14:09.294Z",
        "updated_at": "2024-07-01T04:57:40.413Z"
      }
    ]
  },
  {
    "id": 3,
    "name": "ЧорноЖопинськ",
    "latitude": null,
    "longitude": null,
    "created_at": "2024-06-06T04:29:05.715Z",
    "updated_at": "2024-06-06T04:29:05.715Z",
    "users": [
      {
        "id": 18,
        "ipn": "1337",
        "displayName": "dasdas",
        "email": null,
        "phoneNumber": null,
        "isManager": true,
        "isRegistered": true,
        "lastLatitude": "1488",
        "lastLongitude": "1488",
        "profilePhoto": null,
        "created_at": "2024-06-17T05:03:35.059Z",
        "updated_at": "2024-07-09T05:05:11.705Z"
      },
      {
        "id": 19,
        "ipn": "string",
        "displayName": "string",
        "email": "gmailcom",
        "phoneNumber": "string",
        "isManager": true,
        "isRegistered": true,
        "lastLatitude": null,
        "lastLongitude": null,
        "profilePhoto": null,
        "created_at": "2024-06-18T11:20:38.141Z",
        "updated_at": "2024-06-19T04:35:48.902Z"
      },
      {
        "id": 20,
        "ipn": "1312",
        "displayName": "312321",
        "email": null,
        "phoneNumber": null,
        "isManager": false,
        "isRegistered": true,
        "lastLatitude": null,
        "lastLongitude": null,
        "profilePhoto": null,
        "created_at": "2024-06-20T04:03:19.860Z",
        "updated_at": "2024-06-20T04:03:19.860Z"
      }
    ]
  },
  {
    "id": 8,
    "name": "string",
    "latitude": "string",
    "longitude": "string",
    "created_at": "2024-07-10T08:55:59.657Z",
    "updated_at": "2024-07-10T08:55:59.657Z",
    "users": []
  },
  {
    "id": 7,
    "name": "аллах",
    "latitude": "23132",
    "longitude": "321312",
    "created_at": "2024-07-04T10:44:01.657Z",
    "updated_at": "2024-07-04T10:44:01.657Z",
    "users": []
  }
]
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені         
    
## GET /workRegion/:id
Отримати інформацію про конкретний робочий регіон за його ID.
### Параментри запиту
    - id (path parameter, required): ID робочого регіону
### Тіло запиту
```json
{
  "id": 8,
  "name": "string",
  "latitude": "string",
  "longitude": "string",
  "created_at": "2024-07-10T08:55:59.657Z",
  "updated_at": "2024-07-10T08:55:59.657Z",
  "users": []
}
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені          
    
## PATCH /workRegion/:id
Оновити інформацію про робочий регіон.
### Параментри запиту
    - id (path parameter, required): ID робочого регіону
    {
  "name": "string",
  "latitude": "string",
  "longitude": "string"
}
### Тіло запиту
```json
{
  "id": 8,
  "name": "протекторат Порошенка",
  "latitude": "string",
  "longitude": "string",
  "created_at": "2024-07-10T08:55:59.657Z",
  "updated_at": "2024-07-10T09:01:46.268Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильні дані запиту
    - 404 Not Found: Регіон не знайдений
    - 500 Internal Server Error: Помилка оновлення регіону              
    
## DELETE /workRegion/:id
Видалити робочий регіон.
### Параментри запиту
    - id (path parameter, required): ID робочого регіону
### Тіло запиту
```json
Не повертає вмісту у разі успішного видалення.
```
### Можливі помилки
    - 404 Not Found: Регіон не знайдений
  
# Roles API Documentation    
    
## POST /roles
Створити нову роль
### Параментри запиту
   ```json
   {
  "name": "string"
}
```
### Тіло запиту
```json
{
  "name": "string",
  "id": 6,
  "created_at": "2024-07-10T09:10:44.233Z",
  "updated_at": "2024-07-10T09:10:44.233Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильні дані запиту
    - 409 Conflict: Регіон з такою назвою вже існує    
    
## GET /roles
Отримати усі ролі
### Параментри запиту
### Тіло запиту
```json
[
  {
    "id": 1,
    "name": "Менеджер",
    "created_at": "2024-05-27T10:01:42.908Z",
    "updated_at": "2024-05-27T10:01:42.908Z"
  },
  {
    "id": 2,
    "name": "Аллах",
    "created_at": "2024-07-05T04:46:54.885Z",
    "updated_at": "2024-07-05T04:46:54.885Z"
  },
  {
    "id": 6,
    "name": "string",
    "created_at": "2024-07-10T09:10:44.233Z",
    "updated_at": "2024-07-10T09:10:44.233Z"
  }
]
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені            
    
## GET /roles/{id}
Отримати роль по id
### Параментри запиту
    - id (path parameter, required): ID ролі
### Тіло запиту
```json
{
  "id": 2,
  "name": "Аллах",
  "created_at": "2024-07-05T04:46:54.885Z",
  "updated_at": "2024-07-05T04:46:54.885Z"
}
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені        
    
## PATCH /roles/{id}
Оновити роль по id
### Параментри запиту
    - id (query parameter, optional): ID hjks
```json
{
  "name": "string"
}
```
### Тіло запиту
```json
{
  "id": 6,
  "name": "string",
  "created_at": "2024-07-10T09:10:44.233Z",
  "updated_at": "2024-07-10T09:35:37.822Z"
}
```
### Можливі помилки
    - 400 Bad Request: Неправильні дані запиту
    - 404 Not Found: Роль не знайдений
    - 500 Internal Server Error: Помилка оновлення регіону             
    
## DELETE /roles/{id}
Видалити роль
### Параментри запиту
    - id (query parameter, optional): ID ролі
### Тіло запиту
```json
Не повертає вмісту у разі успішного видалення.
```
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені          
    
# Photo API Documentation       
    
## POST /photos/:id
Завантажити нову фотографію для конкретного візиту.
### Параметри запиту
    - id (query parameter, optional): ID візиту
    - Multipart form data з полем 'file', яке містить фотографію.
### Тіло запиту
Повертає інформацію про завантажену фотографію
### Можливі помилки
    - 400 Bad Request: Файл не надано
    - 404 Not Found: Візит не знайдено
    - 500 Internal Server Error: Помилка збереження фотографії
    - 
    
## GET /photos/:id/photo
Отримати конкретну фотографію за її ID.
### Параментри запиту
    - id (path parameter, required): ID фотографії
### Тіло запиту
Повертає файл фотографії
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені            
    
## GET /photos/:visitId
Отримати всі фотографії для конкретного візиту
### Параментри запиту
    - visitId (path parameter, required): ID візиту
### Тіло запиту
[
  {
    "fileName": "ab2552d418c1642be6aa62c6b17342ba.jpg",
    "base64Image": "base64code"
  }
]
### Можливі помилки
    - 404 Not Found: Користувач або робочий регіон не знайдені            












    
    
    
    