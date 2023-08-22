import jwt from "jsonwebtoken";

const JWT_SIGNATURE = process.env.JWT_SIGNATURE as jwt.Secret;

export const getUserInfoFromToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SIGNATURE) as {
      adminId: number;
      adminName: string;
    };
  } catch (e) {
    return null;
  }
};
