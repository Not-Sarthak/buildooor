import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { swiperId, swipedId, isLike } = await request.json();

    // Create the swipe in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const swipe = await tx.swipe.create({
        data: {
          swiperId,
          swipedId,
          isLike,
        },
      });

      // If it's a right swipe, check for a match
      if (isLike) {
        const mutualSwipe = await tx.swipe.findFirst({
          where: {
            swiperId: swipedId,
            swipedId: swiperId,
            isLike: true,
          },
        });

        // If mutual swipe exists, create a match
        if (mutualSwipe) {
          const match = await tx.match.create({
            data: {
              user1Id: swiperId,
              user2Id: swipedId,
            },
            include: {
              user1: {
                select: {
                  name: true,
                  avatarUrl: true,
                },
              },
              user2: {
                select: {
                  name: true,
                  avatarUrl: true,
                },
              },
            },
          });
          return { swipe, match };
        }
      }
      return { swipe };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process swipe" },
      { status: 500 }
    );
  }
}
