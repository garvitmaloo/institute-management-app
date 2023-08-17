import { Batch, Student, Teacher } from "@prisma/client";

import { Context } from "../index";

type Error = {
  message: string;
  statusCode?: number;
};

interface StudentsDataPayload {
  errors: Error[] | null;
  studentsData: Student[] | null;
}

interface StudentDetails {
  errors: Error[] | null;
  studentDetails: Student | null;
}

interface TeachersData {
  errors: Error[] | null;
  teachersData: Teacher[] | null;
}

interface TeacherDetails {
  errors: Error[] | null;
  teacherDetails: Teacher | null;
}

interface BatchesData {
  errors: Error[] | null;
  batchesData: Batch[] | null;
}

interface BatchDetails {
  errors: Error[] | null;
  batchDetails: Batch | null;
}

const notFoundError: Error = {
  message: "Could not find the requested resource",
  statusCode: 404
};

export const Query = {
  students: async (
    _: unknown,
    __: unknown,
    { prisma }: Context
  ): Promise<StudentsDataPayload> => {
    const allStudents = await prisma.student.findMany();

    if (!allStudents) {
      return {
        errors: [notFoundError],
        studentsData: null
      };
    }

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

    if (!studentDetails) {
      return {
        errors: [
          {
            message: "Could not find any student with the provided details",
            statusCode: 404
          }
        ],
        studentDetails: null
      };
    }

    return {
      errors: null,
      studentDetails: studentDetails
    };
  },

  teachers: async (
    _: unknown,
    __: unknown,
    { prisma }: Context
  ): Promise<TeachersData> => {
    const allTeachers = await prisma.teacher.findMany();

    if (!allTeachers) {
      return {
        errors: [notFoundError],
        teachersData: null
      };
    }

    return {
      errors: null,
      teachersData: allTeachers
    };
  },

  teacherDetails: async (
    _: unknown,
    { teacherId }: { teacherId: number },
    { prisma }: Context
  ): Promise<TeacherDetails> => {
    const teacherDetails = await prisma.teacher.findUnique({
      where: {
        teacherId
      }
    });

    if (!teacherDetails) {
      return {
        errors: [
          {
            message: "Could not find any teacher for the provided details",
            statusCode: 404
          }
        ],
        teacherDetails: null
      };
    }

    return { errors: null, teacherDetails: teacherDetails };
  },

  batches: async (
    _: unknown,
    __: unknown,
    { prisma }: Context
  ): Promise<BatchesData> => {
    const allBatches = await prisma.batch.findMany();

    if (!allBatches) {
      return {
        errors: [notFoundError],
        batchesData: null
      };
    }

    return {
      errors: null,
      batchesData: allBatches
    };
  },

  batchDetails: async (
    _: unknown,
    { batchId }: { batchId: number },
    { prisma }: Context
  ): Promise<BatchDetails> => {
    const batchDetails = await prisma.batch.findUnique({
      where: {
        batchId
      }
    });

    if (!batchDetails) {
      return {
        errors: [
          {
            message: "Could not find any batch with the provided details",
            statusCode: 404
          }
        ],
        batchDetails: null
      };
    }

    return {
      errors: null,
      batchDetails
    };
  }
};
