import { getAuth } from "@clerk/nextjs/server";
import fetchClerkUser from "@/utils/FetchClerkUser";
import { User } from "@/model/User";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async()=>{
  await dbConnect();
  const user = await User.findOne();
      if (!user) {
          return NextResponse.json({ error: "user not found" }, { status: 404 });
      }
  
      return NextResponse.json(user);
}

export const POST = async (req) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await dbConnect();

    const clerkUser = await fetchClerkUser(userId);

    await User.updateOne(
      { clerkId: userId },
      {
        $setOnInsert: {
          email:
            clerkUser.email_addresses?.[0]?.email_address ||
            "noemail@example.com",
          fullName: `${clerkUser.first_name || ""} ${clerkUser.last_name || ""
            }`.trim(),
        },
      },
      { upsert: true }
    );

    return new Response(JSON.stringify({ message: "User saved to DB" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Save user error:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
