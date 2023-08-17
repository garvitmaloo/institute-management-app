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
        teachers: [Teacher]!
        batches: [Batch]!
        studentDetails(studentId: Int!): StudentDetailsPayload!
        teacherDetails(teacherId: Int!): Teacher!
        batchDetails(batchId: Int!): Batch!
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
        studentData: Student
    }
`;
