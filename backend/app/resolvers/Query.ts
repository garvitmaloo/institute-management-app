import { Student } from "@prisma/client";

import { Context } from "../index";

interface StudentsDataPayload {
  errors: { message: string; statusCode?: number }[] | null;
  studentsData: Student[] | null;
}

interface StudentDetails {
  errors: { message: string; statusCode?: number }[] | null;
  studentData: Student | null;
}

export const Query = {
  students: async (
    _: unknown,
    __: unknown,
    { prisma }: Context
  ): Promise<StudentsDataPayload> => {
    const allStudents = await prisma.student.findMany();

    return {
      errors: null,
      studentsData: allStudents
    };
  },

  studentDetails: async (
    _: unknown,
    { studentId }: { studentId: number },
    { prisma }: Context
  ): Promise<StudentDetails> => {
    const studentDetails = await prisma.student.findUnique({
      where: {
        studentId
      }
    });

    return {
      errors: null,
      studentData: studentDetails
    };
  }
};
