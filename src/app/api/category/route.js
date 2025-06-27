import { NextResponse } from "next/server";
import { prisma } from '../../../../lib/prisma';

export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      take: 8, // فقط 8 دسته بندی اول را بگیر
      orderBy: {
        name: "asc", // بر اساس حروف الفبا مرتب کن
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error.message);

    return NextResponse.json(
      { message: "Internal server error fetching categories." },
      { status: 500 }
    );
  }
}

// برای اضافه کردن دسته بندی ها به صورت دستی (فقط برای توسعه)
// export async function POST(request) {
//   try {
//     await verifyToken(request); // Verify token for admin users if needed
//     const { name } = await request.json();
//     const newCategory = await prisma.category.create({
//       data: { name },
//     });
//     return NextResponse.json(newCategory, { status: 201 });
//   } catch (error) {
//     console.error('Error creating category:', error.message);
//     return NextResponse.json({ message: 'Error creating category.' }, { status: 500 });
//   }
// }
