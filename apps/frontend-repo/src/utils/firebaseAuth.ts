import { FirebaseError } from "firebase/app";
import { createRemoteJWKSet, jwtVerify } from "jose";

const FIREBASE_JWKS_URL = process.env.NEXT_PUBLIC_FIREBASE_JWKS_URL ?? "";
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
// Get Firebase JWK set (Google's public keys)
const JWKS = createRemoteJWKSet(new URL(FIREBASE_JWKS_URL));

export async function verifyFirebaseToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    });

    return payload; // Token is valid, return user data
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}


const getFirebaseErrorMessage = (error: FirebaseError) => {
  const errorMessages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Invalid email format.",
    "auth/weak-password": "Password is too weak. Use a stronger password.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/internal-error": "An unexpected error occurred. Please try again later.",
  };

  return errorMessages[error.code] || "Authentication failed. Please try again.";
};

export const handleError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    return { error: { message: getFirebaseErrorMessage(error) } };
  }
  return { error: { message: "An unexpected error occurred." } };
};
