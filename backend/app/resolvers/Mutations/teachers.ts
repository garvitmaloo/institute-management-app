import { Teacher } from "@prisma/client";

import { Context } from "../..";

type Error = {
  message: string;
  statusCode?: number;
};

interface TeacherArgs {
  teacherName: string;
  teacherDOB: string;
  teacherSalary: number;
  workingHours: number;
  subject: string;
  batchAssigned?: number;
}

interface TeacherDetailsPayload {
  errors: Error[] | null;
  teacherDetails: Teacher | null;
}

export const teachersMutation = {
  teacherCreate: async (
    _: unknown,
    args: TeacherArgs,
    { prisma }: Context
  ): Promise<TeacherDetailsPayload> => {
    let newTeacher: Teacher;

    if (args.batchAssigned) {
      newTeacher = await prisma.teacher.create({
        data: {
          teacherName: args.teacherName,
          teacherDOB: args.teacherDOB,
          subject: args.subject,
          teacherSalary: args.teacherSalary,
          workingHours: args.workingHours,
          image: "Some dummy URL",
          batch_assigned: {
            connect: {
              batchId: args.batchAssigned
            }
          }
        }
      });
    } else {
      newTeacher = await prisma.teacher.create({
        data: {
          teacherName: args.teacherName,
          teacherDOB: args.teacherDOB,
          subject: args.subject,
          teacherSalary: args.teacherSalary,
          workingHours: args.workingHours,
          image: "Some dummy URL"
        }
      });
    }

    if (!newTeacher) {
      return {
        errors: [{ message: "Failed to create new teacher." }],
        teacherDetails: null
      };
    }

    return {
      errors: null,
      teacherDetails: newTeacher
    };
  },

  teacherUpdate: async (
    _: unknown,
    args: TeacherArgs & { teacherId: string },
    { prisma }: Context
  ): Promise<TeacherDetailsPayload> => {
    const teacherRecord = await prisma.teacher.findUnique({
      where: {
        teacherId: Number(args.teacherId)
      }
    });

    if (!teacherRecord) {
      return {
        errors: [
          {
            message: "No teacher has been found with the provided data.",
            statusCode: 404
          }
        ],
        teacherDetails: null
      };
    }

    let teacherUpdate: Teacher;

    if (args.batchAssigned) {
      teacherUpdate = await prisma.teacher.update({
        data: {
          teacherName: args.teacherName,
          teacherDOB: args.teacherDOB,
          subject: args.subject,
          teacherSalary: args.teacherSalary,
          workingHours: args.workingHours,
          image: "Some dummy URL",
          batch_assigned: {
            connect: {
              batchId: args.batchAssigned
            }
          }
        },
        where: {
          teacherId: Number(args.teacherId)
        }
      });
    } else {
      teacherUpdate = await prisma.teacher.update({
        data: {
          teacherName: args.teacherName,
          teacherDOB: args.teacherDOB,
          subject: args.subject,
          teacherSalary: args.teacherSalary,
          workingHours: args.workingHours,
          image: "Some dummy URL"
        },
        where: {
          teacherId: Number(args.teacherId)
        }
      });
    }

    if (!teacherUpdate) {
      return {
        errors: [{ message: "Failed to update the recors" }],
        teacherDetails: null
      };
    }

    return {
      errors: null,
      teacherDetails: teacherUpdate
    };
  },

  teacherDelete: async (
    _: unknown,
    { teacherId }: { teacherId: string },
    { prisma }: Context
  ): Promise<TeacherDetailsPayload> => {
    const teacherRecord = await prisma.teacher.findUnique({
      where: {
        teacherId: Number(teacherId)
      }
    });

    if (!teacherRecord) {
      return {
        errors: [
          {
            message: "No teacher has been found with the provided details.",
            statusCode: 404
          }
        ],
        teacherDetails: null
      };
    }

    await prisma.teacher.delete({
      where: {
        teacherId: Number(teacherId)
      }
    });

    return {
      errors: null,
      teacherDetails: teacherRecord
    };
  }
};
