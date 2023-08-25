import { Teacher } from "@prisma/client";

import { Context } from "..";

export const Batch = {
  batchIncharge: async (
    { batchId }: { batchId: number },
    _: unknown,
    { prisma }: Context
  ): Promise<Teacher | null> => {
    const batchTeacher = await prisma.teacher.findUnique({
      where: {
        batchInchargeId: batchId
      },
      include: {
        batch_assigned: true
      }
    });
    return batchTeacher;
  }
};
