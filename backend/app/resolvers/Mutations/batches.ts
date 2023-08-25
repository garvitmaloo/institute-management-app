import { Batch, Student } from "@prisma/client";
import { Context } from "../..";

type Error = {
  message: string;
  statusCode?: number;
};

interface BatchArgs {
  batchName: string;
  students: Student[];
  batchIncharge?: string;
  createdBy?: number;
  subject: string;
}

interface BatchDetailsPayload {
  errors: Error[] | null;
  batchDetails: Batch | null;
}

export const batchMutations = {
  batchCreate: async (
    _: unknown,
    args: BatchArgs,
    { prisma }: Context
  ): Promise<BatchDetailsPayload> => {
    let newBatch: Batch;

    if (args.batchIncharge) {
      newBatch = await prisma.batch.create({
        data: {
          batchName: args.batchName,
          students: {
            connect: args.students.map((studentId) => ({
              studentId: Number(studentId)
            }))
          },
          batch_incharge: {
            connect: {
              teacherId: Number(args.batchIncharge)
            }
          },
          createdBy: args?.createdBy,
          subject: args.subject
        }
      });
    } else {
      newBatch = await prisma.batch.create({
        data: {
          batchName: args.batchName,
          students: {
            connect: args.students.map((studentId) => ({
              studentId: Number(studentId)
            }))
          },
          createdBy: args?.createdBy,
          subject: args.subject
        }
      });
    }

    if (!newBatch) {
      return {
        errors: [{ message: "Could not create a new batch." }],
        batchDetails: null
      };
    }

    return {
      errors: null,
      batchDetails: newBatch
    };
  },

  batchUpdate: async (
    _: unknown,
    args: BatchArgs & { batchId: string },
    { prisma, userInfo }: Context
  ): Promise<BatchDetailsPayload> => {
    const batchRecord = await prisma.batch.findUnique({
      where: {
        batchId: Number(args.batchId)
      }
    });

    if (!batchRecord) {
      return {
        errors: [
          {
            message: "No batch was found with the provided data.",
            statusCode: 404
          }
        ],
        batchDetails: null
      };
    }

    if (batchRecord.createdBy !== userInfo?.adminId) {
      return {
        errors: [
          {
            message: "You are not authorized to make changes to this resource.",
            statusCode: 403
          }
        ],
        batchDetails: null
      };
    }

    let batchUpdate: Batch;

    if (args.batchIncharge) {
      batchUpdate = await prisma.batch.update({
        data: {
          batchName: args.batchName,
          students: {
            connect: args.students.map((studentId) => ({
              studentId: Number(studentId)
            }))
          },
          batch_incharge: {
            connect: {
              teacherId: Number(args.batchIncharge)
            }
          }
        },
        where: {
          batchId: Number(args.batchId)
        }
      });
    } else {
      batchUpdate = await prisma.batch.update({
        data: {
          batchName: args.batchName,
          students: {
            connect: args.students.map((studentId) => ({
              studentId: Number(studentId)
            }))
          }
        },
        where: {
          batchId: Number(args.batchId)
        }
      });
    }

    if (!batchUpdate) {
      return {
        errors: [{ message: "Could not update batch details" }],
        batchDetails: null
      };
    }

    return {
      errors: null,
      batchDetails: batchUpdate
    };
  },

  batchDelete: async (
    _: unknown,
    { batchId }: { batchId: string },
    { prisma, userInfo }: Context
  ): Promise<BatchDetailsPayload> => {
    const batchRecord = await prisma.batch.findUnique({
      where: {
        batchId: Number(batchId)
      }
    });

    if (!batchRecord) {
      return {
        errors: [
          {
            message: "Could not find any batch with the provided data.",
            statusCode: 404
          }
        ],
        batchDetails: null
      };
    }

    if (batchRecord.createdBy !== userInfo?.adminId) {
      return {
        errors: [
          {
            message: "You are not authorized to make changes to this resource.",
            statusCode: 403
          }
        ],
        batchDetails: null
      };
    }

    await prisma.batch.delete({
      where: {
        batchId: Number(batchId)
      }
    });

    return {
      errors: null,
      batchDetails: batchRecord
    };
  }
};
