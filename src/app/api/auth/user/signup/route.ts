import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connection } from "@/database/connection";

export const POST = async (req: NextRequest) => {

    await connection();

  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields", success: false },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await new User({
      username,
      email,
      password: hashedPass,
    });

    await user.save();

    return NextResponse.json({ user, success: true ,status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
};


