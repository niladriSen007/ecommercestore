import { connection } from "@/database/connection";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await connection();

  try {
    const userToken = req.cookies.get("token")?.value;

    if (!userToken) {
      return NextResponse.json({
        error: "Please login to add products to wishlist",
        status: 400,
      });
    }

    const { userId, productId } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }

    const isWishlisted = user.wishlist.includes(productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return NextResponse.json({
      message: `${
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      }`,
      status: 200,
      success:true
    });

    return NextResponse.json({ user, status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
