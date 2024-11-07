import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

/* Messages for a match */
export async function GET(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const messages = await prisma.message.findMany({
      where: {
        matchId: params.matchId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

/* Send message to a match */
export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const { senderId, content } = await request.json();

    // Verify the match exists and sender is part of it
    const match = await prisma.match.findFirst({
      where: {
        id: params.matchId,
        OR: [{ user1Id: senderId }, { user2Id: senderId }],
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: "Match not found or user not authorized" },
        { status: 404 }
      );
    }

    const message = await prisma.message.create({
      data: {
        matchId: params.matchId,
        senderId,
        content,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
