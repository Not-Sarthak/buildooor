// app/api/recommendations/route.ts
import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Get users that haven't been swiped by the current user
    const recommendations = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: userId } },
          {
            NOT: {
              swipesReceived: {
                some: {
                  swiperId: userId,
                },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        bio: true,
        skills: true,
        builderScore: true,
        avatarUrl: true,
      },
      take: 10,
      orderBy: {
        builderScore: "desc",
      },
    });

    return NextResponse.json(recommendations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
