import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../utils/auth';

export async function GET(request, { params }) {
  try {
    const { userId } = await verifyToken(request); // Verify token to get userId for liked status
    const { id } = params; // Get product ID from URL params

    const product = await prisma.product.findUnique({
      where: { id: id },
      include: {
        category: {
          select: { name: true }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found.' }, { status: 404 });
    }

    // Check if the product is liked by the current user
    const likedProduct = await prisma.likedProduct.findUnique({
      where: {
        userId_productId: { // Unique constraint for userId and productId
          userId: userId,
          productId: id
        }
      }
    });

    const productWithLikedStatus = {
      ...product,
      isLiked: !!likedProduct // true if likedProduct exists, false otherwise
    };

    return NextResponse.json(productWithLikedStatus, { status: 200 });

  } catch (error) {
    console.error('Error fetching single product:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error fetching product.' }, { status: 500 });
  }
}