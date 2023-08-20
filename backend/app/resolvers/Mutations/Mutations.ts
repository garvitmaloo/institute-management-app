import { studentMutations } from "./students";
import { teachersMutation } from "./teachers";
import { batchMutations } from "./batches";
import { loginMutation } from "./login";

export const Mutation = {
  ...studentMutations,
  ...teachersMutation,
  ...batchMutations,
  ...loginMutation
};
