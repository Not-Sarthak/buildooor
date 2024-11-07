import { prisma } from "../../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/** Swipe History */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const swipes = await prisma.swipe.findMany({
      where: {
        swiperId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(swipes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch swipe history" },
      { status: 500 }
    );
  }
}
