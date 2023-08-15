export const typedef = `
    type Student {
        studentName: String!
        batchName: String!
        class: Int!
    }

    type Query {
        students: [Student]
    }
`;
