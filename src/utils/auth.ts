import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function verifyToken(request: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not defined in environment variables. Please check your .env file."
    );
  }

  const authorizationHeader = request.headers.get("Authorization");

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error(
      "Authentication required. No valid token provided in Authorization header (e.g., Bearer <token>)."
    );
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
    return { userId: decodedToken.userId };
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid or expired token. Please log in again.");
    }
    console.error("Unexpected token verification error:", error);
    throw new Error("Internal server error during token verification.");
  }
}
