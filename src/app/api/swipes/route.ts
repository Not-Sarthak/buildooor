import { prisma } from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/** Swipe
 * isLike true for swipe right
 * false for swipe left
 */
export async function POST(request: NextRequest) {
  try {
    const { swiperId, swipedId, isLike } = await request.json();

    // Validate IDs are provided
    if (!swiperId || !swipedId) {
      return NextResponse.json(
        { error: "Both swiperId and swipedId are required" },
        { status: 400 }
      );
    }

    // Process swipe and potential match in a transaction
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
          });
          return { swipe, match };
        }
      }

      return { swipe, match: null };
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return NextResponse.json(
        { error: "You have already swiped on this user" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process swipe" },
      { status: 500 }
    );
  }
}
