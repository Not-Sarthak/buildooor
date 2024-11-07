import { prisma } from "../../../utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      take: limit,
      skip: skip,
      select: {
        id: true,
        talentId: true,
        name: true,
        bio: true,
        skills: true,
        builderScore: true,
        avatarUrl: true,
      },
      orderBy: {
        builderScore: "desc",
      },
    });

    const total = await prisma.user.count();

    return NextResponse.json({
      users,
      metadata: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        talentId: data.talentId,
        name: data.name,
        bio: data.bio,
        skills: data.skills,
        builderScore: data.builderScore,
        avatarUrl: data.avatarUrl,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
