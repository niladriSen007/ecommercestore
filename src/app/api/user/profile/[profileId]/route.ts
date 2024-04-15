import { connection } from "@/database/connection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { profileId: any } }
) => {
  await connection();

  try {
    const { profileId } = params;
    profileId.toString();

    if (!profileId) {
      return NextResponse.json({ error: "userId is required", status: 400 });
    }

    const user = await User.findById(profileId);

    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    return NextResponse.json({ user, status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
