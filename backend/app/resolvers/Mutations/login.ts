import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { Context } from "../..";

interface LoginArgs {
  email: string;
  password: string;
}

interface LoginDetailsPayload {
  errors: { message: string; statusCode?: number }[] | null;
  token: string | null;
}

const JWT_SIGNATURE = process.env.JWT_SIGNATURE as jwt.Secret;

export const loginMutation = {
  login: async (
    _: unknown,
    { email, password }: LoginArgs,
    { prisma }: Context
  ): Promise<LoginDetailsPayload> => {
    const adminRecord = await prisma.admin.findUnique({
      where: {
        email
      }
    });

    if (!adminRecord) {
      return {
        errors: [
          {
            message: "No user found with the provided details",
            statusCode: 404
          }
        ],
        token: null
      };
    }

    const passwordDoesMatch = await compare(password, adminRecord.password);

    if (!passwordDoesMatch) {
      return {
        errors: [{ message: "Password does not match.", statusCode: 403 }],
        token: null
      };
    }

    const token = jwt.sign(
      { adminId: adminRecord.adminId, adminName: adminRecord.adminName },
      JWT_SIGNATURE,
      { expiresIn: 3600 }
    );

    return {
      errors: null,
      token
    };
  }
};
