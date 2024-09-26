"use server"

import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

// Define the type for the return message
interface Response {
  success: boolean;
  message: string;
}

export async function logout(redirectTo?: string): Promise<Response | void> {
  try {
    await signOut({ redirect: false });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "Error: " + error.message,
      };
    }

    return {
      success: false,
      message: "Unknown error occurred during logout",
    };
  }

  
  redirect(redirectTo || "/login");
}
