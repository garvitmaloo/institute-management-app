export const typedef = `
    type Student {
        studentId: String!
        studentName: String!
        studentDOB: String!
        batches: [Batch!]!
        class: Int!
        schoolName: String
    }

    type Batch {
        batchId: String!
        batchName: String!
        batchIncharge: Teacher!
        students: [Student!]!
    }

    type Teacher {
        teacherId: String!
        teacherName: String!
        teacherDOB: String!
        teacherSalary: Int!
        subject: String!
        workingHours: Int!
        batchAssigned: Batch!
    }

    type Query {
        students: StudentPayload!
        teachers: TeachersPayload!
        batches: BatchesPayload!
        studentDetails(studentId: Int!): StudentDetailsPayload!
        teacherDetails(teacherId: Int!): TeacherDetailsPayload!
        batchDetails(batchId: Int!): BatchDetailsPayload!
    }

    type Mutation {
        studentCreate(studentName: String!, studentDOB: String!, batches: [Int!]!, class: String!, schoolName: String!): StudentDetailsPayload!
        studentUpdate(studentId: String!, studentName: String!, studentDOB: String!, batches: [Int!]!, class: String!, schoolName: String!): StudentDetailsPayload!
        studentDelete(studentId: String!): StudentDetailsPayload!

        teacherCreate(teacherName: String!, teacherDOB: String!, teacherSalary: Int!, subject: String!, workingHours: Int!, batchAssigned: Int): TeacherDetailsPayload!
        teacherUpdate(teacherId: String!, teacherName: String!, teacherDOB: String!, teacherSalary: Int!, subject: String!, workingHours: Int!, batchAssigned: Int): TeacherDetailsPayload!
        teacherDelete(teacherId: String!): TeacherDetailsPayload!

        batchCreate(batchName: String!, batchIncharge: String, students: [Int!]!): BatchDetailsPayload!
        batchUpdate(batchId: String!, batchName: String, batchIncharge: String, students: [Int!]!): BatchDetailsPayload!
        batchDelete(batchId: String!): BatchDetailsPayload!

        login(email: String!, password: String!): AuthPayload
    }

    type Error {
        message: String!
        statusCode: Int
    }

    type StudentPayload {
        errors: [Error]
        studentsData: [Student!]!
    }

    type StudentDetailsPayload {
        errors: [Error]
        studentDetails: Student
    }

    type TeachersPayload {
        errors: [Error]
        teachersData: [Teacher!]!
    }

    type TeacherDetailsPayload {
        errors: [Error]
        teacherDetails: Teacher
    }

    type BatchesPayload {
        errors: [Error]
        batchesData: [Batch!]!
    }

    type BatchDetailsPayload {
        errors: [Error]
        batchDetails: Batch
    }

    type AuthPayload {
        errors: [Error]
        token: String
    }
`;
