import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma"; 
import { verifyToken } from "../../../../../utils/auth"; 

export async function GET(request) {
  try {
    
    const { userId } = await verifyToken(request);

   
    const likedProducts = await prisma.likedProduct.findMany({
      where: { userId: userId },
      include: {
        product: {
        
          select: {
            id: true,
            name: true, 
            description: true,
            price: true,
            discountedPrice: true,
            isDiscounted: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
            
            images: true,
          },
        },
      },
    });

   
    const productsData = likedProducts.map((likedItem) => {
      const product = likedItem.product;

     
      const imageUrl = product.images.length > 0
        ? product.images[0].imageUrl
        : null;

      let offPercent = 0;
      if (
        product.isDiscounted &&
        product.discountedPrice !== null &&
        product.price > 0
      ) {
        offPercent =
          ((product.price - product.discountedPrice) / product.price) * 100;
        offPercent = Math.round(offPercent);
      }

      return {
        ...product, 
        imageUrl: imageUrl, 
        offPercent: offPercent,
      };
    });

   
    return NextResponse.json(productsData, { status: 200 });
  } catch (error) {
    console.error("خطا در دریافت محصولات لایک شده:", error.message);
   
    if (
      error.message.includes("Authentication required") ||
      error.message.includes("Invalid or expired token")
    ) {
      return NextResponse.json(
        { message: "برای مشاهده محصولات لایک شده، احراز هویت لازم است." },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { message: "خطای داخلی سرور رخ داد." },
      { status: 500 }
    );
  }
}