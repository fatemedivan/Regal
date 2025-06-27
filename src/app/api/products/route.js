// app/api/products/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { verifyToken } from '../../../../utils/auth';

export async function GET(request) {
  try {
    const { userId } = await verifyToken(request); // Verify token to get userId for liked status

    const { searchParams } = new URL(request.url);

    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sort = searchParams.get('sort'); // 'cheapest', 'most_expensive', 'oldest', 'newest'
    let orderBy = {};

    switch (sort) {
      case 'cheapest':
        orderBy = { price: 'asc' };
        break;
      case 'most_expensive':
        orderBy = { price: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'newest':
      default: // Default to newest if no valid sort is provided
        orderBy = { createdAt: 'desc' };
        break;
    }

    // Filtering
    const filter = {};
    const minPrice = parseFloat(searchParams.get('minPrice'));
    const maxPrice = parseFloat(searchParams.get('maxPrice'));
    const color = searchParams.get('color');
    const size = searchParams.get('size');
    const categoryId = searchParams.get('categoryId'); // <-- Changed from 'type' to 'categoryId'
    const isDiscounted = searchParams.get('isDiscounted'); // 'true' or 'false'

    if (minPrice && maxPrice) {
      filter.price = { gte: minPrice, lte: maxPrice };
    } else if (minPrice) {
      filter.price = { gte: minPrice };
    } else if (maxPrice) {
      filter.price = { lte: maxPrice };
    }

    if (color) filter.color = color;
    if (size) filter.size = size;
    if (categoryId) filter.categoryId = categoryId; // <-- Using categoryId for filtering
    if (isDiscounted === 'true') filter.isDiscounted = true;
    if (isDiscounted === 'false') filter.isDiscounted = false;


    // Fetch products
    const [products, totalProducts] = await prisma.$transaction([
      prisma.product.findMany({
        where: filter,
        skip: skip,
        take: limit,
        orderBy: orderBy,
        include: {
          category: {
            select: { name: true } // Include category name
          }
        }
      }),
      prisma.product.count({ where: filter }),
    ]);

    // Check if each product is liked by the current user
    const productIds = products.map(p => p.id);
    const likedProductsByUser = await prisma.likedProduct.findMany({
      where: {
        userId: userId,
        productId: { in: productIds }
      },
      select: { productId: true }
    });

    const likedProductIds = new Set(likedProductsByUser.map(lp => lp.productId));

    const productsWithLikedStatus = products.map(product => ({
      ...product,
      isLiked: likedProductIds.has(product.id)
    }));


    return NextResponse.json({
      products: productsWithLikedStatus,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts: totalProducts,
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error.message);
    if (error.message.includes('Authentication required') || error.message.includes('Invalid or expired token')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
    return NextResponse.json({ message: 'Internal server error fetching products.' }, { status: 500 });
  }
}