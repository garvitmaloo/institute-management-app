import { studentMutations } from "./students";
import { teachersMutation } from "./teachers";
import { batchMutations } from "./batches";

export const Mutation = {
  ...studentMutations,
  ...teachersMutation,
  ...batchMutations
};
