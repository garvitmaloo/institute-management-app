import { studentMutations } from "./students";
import { teachersMutation } from "./teachers";

export const Mutation = {
  ...studentMutations,
  ...teachersMutation
};
