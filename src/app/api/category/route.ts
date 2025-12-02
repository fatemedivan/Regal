import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CategoryWithSub } from "./types";

export async function GET(request: NextRequest) {
  try {
    const categories: CategoryWithSub[] = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        subcategories: {
          select: {
            id: true,
            name: true,
            parentId: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error fetching categories." },
      { status: 500 }
    );
  }
}
