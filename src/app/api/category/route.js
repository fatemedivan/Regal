// app/api/category/route.js

import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma'; // ⚠️ مطمئن شو این مسیر درسته

export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null 
      },
      include: {
        subcategories: { 
          select: {
            id: true,
            name: true,
            parentId: true 
          },
          orderBy: {
            name: "asc" 
          }
        }
      },
      orderBy: {
        name: "asc",
      },
      
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories (with subcategories):", error);
    return NextResponse.json(
      { message: "Internal server error fetching categories." },
      { status: 500 }
    );
  }
}