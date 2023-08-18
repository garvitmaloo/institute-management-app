import { Student } from "@prisma/client";

import { Context } from "../../index";

interface StudentCreateArgs {
  studentName: string;
  studentDOB: string;
  batches: number[];
  class: string;
  schoolName: string;
}

interface StudentDetailsPayload {
  errors: { message: string; statusCode?: number }[] | null;
  studentDetails: Student | null;
}

export const studentMutations = {
  studentCreate: async (
    _: unknown,
    args: StudentCreateArgs,
    { prisma }: Context
  ): Promise<StudentDetailsPayload> => {
    const newStudent = await prisma.student.create({
      data: {
        studentName: args.studentName,
        studentDOB: args.studentDOB,
        schoolName: args.schoolName,
        class: args.class,
        image: "Some dummy URL",
        batches_enrolled: {
          connect: args.batches.map((batchId) => ({ batchId }))
        }
      },
      include: {
        batches_enrolled: true
      }
    });

    if (!newStudent) {
      return {
        errors: [
          { message: "Failed to create a new student record", statusCode: 500 }
        ],
        studentDetails: null
      };
    }

    return {
      errors: null,
      studentDetails: newStudent
    };
  },

  studentUpdate: async (
    _: unknown,
    { studentId, ...studentDetails }: StudentCreateArgs & { studentId: string },
    { prisma }: Context
  ): Promise<StudentDetailsPayload> => {
    const studentRecord = await prisma.student.findUnique({
      where: { studentId: Number(studentId) }
    });

    if (!studentRecord) {
      return {
        errors: [
          {
            message: "Could not find any student with provided details.",
            statusCode: 404
          }
        ],
        studentDetails: null
      };
    }

    const studentUpdated = await prisma.student.update({
      data: {
        studentName: studentDetails.studentName,
        studentDOB: studentDetails.studentDOB,
        batches_enrolled: {
          connect: studentDetails.batches.map((batchId) => ({ batchId }))
        },
        class: studentDetails.class,
        image: "Some dummy URL",
        schoolName: studentDetails.schoolName
      },
      where: {
        studentId: Number(studentId)
      }
    });

    return {
      errors: null,
      studentDetails: studentUpdated
    };
  },

  studentDelete: async (
    _: unknown,
    { studentId }: { studentId: string },
    { prisma }: Context
  ): Promise<StudentDetailsPayload> => {
    const studentRecord = await prisma.student.findUnique({
      where: {
        studentId: Number(studentId)
      }
    });

    if (!studentRecord) {
      return {
        errors: [
          {
            message: "No student exists with the provided details.",
            statusCode: 404
          }
        ],
        studentDetails: null
      };
    }

    await prisma.student.delete({
      where: {
        studentId: Number(studentId)
      }
    });

    return {
      errors: null,
      studentDetails: studentRecord
    };
  }
};
