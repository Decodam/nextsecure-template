import { auth } from "@/auth/core";
import { db } from "@/db/core"; // Ensure this points to your Drizzle ORM setup
import { users, accounts } from "@/db/schema"; // Import your schema
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const userData = await db
      .select()
      .from(users)
      .where(sql`${users.email} = ${req.auth.user.email}`)
      .execute(); // Execute the query to get results

    // Check if userData has any results and take the first one
    const singleUserData = userData.length > 0 ? userData[0] : null;

    if (!singleUserData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch accounts associated with the user
    const userAccounts = await db
      .select()
      .from(accounts)
      .where(sql`${accounts.userId} = ${singleUserData.id}`)
      .execute(); // Get all accounts for the user

    const filteredUserData = {
      ...singleUserData,
      accounts: userAccounts.map((account) => ({
        provider: account.provider,
        type: account.type,
      })),
    };

    return NextResponse.json({ data: filteredUserData }, { status: 200 });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { name, image } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Name or image is required" }, { status: 400 });
    }

    // Update the user's name and/or image in the database
    const updatedUser = await db
      .update(users)
      .set({
        ...(name && { name }), // Update name if provided
        ...(image && { image }), // Update image if provided
      })
      .where(sql`${users.email} = ${req.auth.user.email}`)
      .returning(); // Get the updated user data back

    return NextResponse.json({ message: "Your account has been updated successfully", data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
});
