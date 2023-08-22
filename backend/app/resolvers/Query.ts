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

const unauthorizedError: Error = {
  message: "You are not authorised for this resource.",
  statusCode: 403
};

export const Query = {
  students: async (
    _: unknown,
    __: unknown,
    { prisma, userInfo }: Context
  ): Promise<StudentsDataPayload> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        studentsData: null
      };
    }

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
    { prisma, userInfo }: Context
  ): Promise<StudentDetails> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        studentDetails: null
      };
    }

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
    { prisma, userInfo }: Context
  ): Promise<TeachersData> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        teachersData: null
      };
    }

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
    { prisma, userInfo }: Context
  ): Promise<TeacherDetails> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        teacherDetails: null
      };
    }

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
    { prisma, userInfo }: Context
  ): Promise<BatchesData> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        batchesData: null
      };
    }

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
    { prisma, userInfo }: Context
  ): Promise<BatchDetails> => {
    if (!userInfo) {
      return {
        errors: [unauthorizedError],
        batchDetails: null
      };
    }

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
