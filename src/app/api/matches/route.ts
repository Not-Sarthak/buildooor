import { prisma } from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/* Get a list of matches */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(matches);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}
