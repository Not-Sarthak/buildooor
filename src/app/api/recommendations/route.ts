import { prisma } from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/* Get a list of recommendations
 * Ruturns IDs swiped by the user
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    // Get IDs of users that haven't been swiped by the current user
    const swipedIds = await prisma.swipe.findMany({
      where: {
        swiperId: userId,
      },
      select: {
        swipedId: true,
      },
    });

    const swipedUserIds = swipedIds.map((swipe: any) => swipe.swipedId);

    // TODO: Return the IDs that haven't been swiped yet
    // The actual user data will be fetched from Talent Protocol on the frontend
    return NextResponse.json({
      swipedUserIds,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
