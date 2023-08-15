# Scenario

1. App will be managed by the owners of the institute. There will be 2 owners.
2. Students, teachers and batches are the three main entities of the app.
3. Only owners can perform CRUD operations on these entities once logged in. (Authentication)
4. Any entity created by one owner cannot be modified by the other owner. (Authorization)
5. While creating a new batch, a teacher will be assigned to it.
6. While enrolling new students, batch must be specified. Multiple batches can be assigned.
7. Owners can see all batches, students enrolled in those batches and teacher responsible for the batch.
8. There has to be a category based search feature. Owners can search for specific batches, students or teachers.
9. Basic searching, sorting and filtering operations.
10. (For a future version) A brand new entity - tests
    1. Owners can announce a test for one or more batches on a particular date and assign a teacher as an invigilator.
    2. They can modify the created tests as well like date of test or teacher assigned or batches. (Same owner who created).

# Tech Stack

1. Frontend
   - React-typescript
   - React query
   - React table
   - Tailwind CSS
   - Material UI
   - React router
   - React hook form
   - Redux toolkit
   - Apollo client
2. Backend
   - GraphQL
   - PostgreSQL database
   - Prisma ORM
   - Multer
   - JWT
   - Security
   - Performance and optimizations
3. Tools
   - ESLint and prettier
   - Husky
   - Docker
   - API testing with postman

# Data Models

1. Batches
   - batch_id - ID
   - batch_name - String
   - teacher_assigned - Teacher
   - batch_schedule - Object(Schedule - weekday as key and batch start time as value)
   - students - Student[ ]
2. Teachers
   - Teacher_id - ID
   - Teacher_name - String
   - Teacher_DOB - Date
   - Teacher_salary - Number
   - Subject - String
   - Batch_incharge - Batch
   - Image - String
   - Working hours - Number
3. Student
   - Student_id - ID
   - Student_name - String
   - Student_DOB - Date
   - Class - String
   - Batches - Batch[ ]
   - Image - String
   - School Name - String
