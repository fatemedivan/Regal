// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding process for products with multiple colors and sizes...");

  // --- Seed Categories and Subcategories ---
  const mainCategories = [
    "لباس مجلسی", "شلوار", "سرهمی", "کت مجلسی", "دامن", "شومیز", "کراپ", "پالتو",
  ];
  const createdCategories = {};

  for (const categoryName of mainCategories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    createdCategories[categoryName] = category;
    console.log(`Main Category created or found: ${category.name} (ID: ${category.id})`);
  }

  const subcategoriesToAdd = [
    { parentName: "لباس مجلسی", name: "پیراهن شب" },
    { parentName: "لباس مجلسی", name: "مانتو مجلسی" },
    { parentName: "لباس مجلسی", name: "دامن مجلسی" },
    { parentName: "شلوار", name: "شلوار جین" },
    { parentName: "شلوار", name: "شلوار پارچه‌ای" },
    { parentName: "شلوار", name: "لگینگ" },
    { parentName: "سرهمی", name: "سرهمی روزمره" },
    { parentName: "سرهمی", name: "سرهمی مجلسی" },
    { parentName: "جامپسوت", name: "جامپسوت رسمی" },
    { parentName: "کت مجلسی", name: "کت تک" },
    { parentName: "کت مجلسی", name: "کت و شلوار" },
    { parentName: "کت مجلسی", name: "ژیله" },
    { parentName: "دامن", name: "دامن کوتاه" },
    { parentName: "دامن", name: "دامن بلند" },
    { parentName: "دامن", name: "دامن میدی" },
    { parentName: "شومیز", name: "شومیز رسمی" },
    { parentName: "شومیز", name: "شومیز کژوال" },
    { parentName: "شومیز", name: "بلوز" },
    { parentName: "کراپ", name: "تاپ کراپ" },
    { parentName: "کراپ", name: "هودی کراپ" },
    { parentName: "کراپ", name: "تی‌شرت کراپ" },
    { parentName: "پالتو", name: "پالتو بلند" },
    { parentName: "پالتو", name: "پالتو کوتاه" },
    { parentName: "پالتو", name: "کاپشن" },
  ];

  for (const subcategoryInfo of subcategoriesToAdd) {
    const parentCategory = createdCategories[subcategoryInfo.parentName];
    if (parentCategory) {
      const subcategory = await prisma.category.upsert({
        where: { name: subcategoryInfo.name },
        update: { parentId: parentCategory.id },
        create: {
          name: subcategoryInfo.name,
          parentId: parentCategory.id,
        },
      });
      createdCategories[subcategoryInfo.name] = subcategory;
      console.log(`Subcategory created or found: ${subcategory.name} (Parent: ${subcategoryInfo.parentName}, ID: ${subcategory.id})`);
    } else {
      console.warn(`Parent category "${subcategoryInfo.parentName}" not found for subcategory "${subcategoryInfo.name}".`);
    }
  }
  console.log("Category and subcategory seeding complete.");

  // --- Seed Colors ---
  const colorsData = [
    { name: "بنفش", hexCode: "#800080" },
    { name: "زرشکی", hexCode: "#8B0000" },
    { name: "سبز تیره", hexCode: "#006400" },
    { name: "نقره‌ای", hexCode: "#C0C0C0" },
    { name: "مشکی", hexCode: "#000000" },
    { name: "سفید", hexCode: "#FFFFFF" },
    { name: "قرمز", hexCode: "#FF0000" },
    { name: "آبی", hexCode: "#0000FF" },
  ];

  const createdColors = {};
  for (const color of colorsData) {
    const newColor = await prisma.color.upsert({
      where: { name: color.name },
      update: { hexCode: color.hexCode },
      create: color,
    });
    createdColors[newColor.hexCode] = newColor; // Store by hexCode for easy lookup
    console.log(`Color created or found: ${newColor.name} (Hex: ${newColor.hexCode}, ID: ${newColor.id})`);
  }
  console.log("Color seeding complete.");

  // --- Seed Sizes ---
  const sizesData = ["S", "M", "L", "XL", "XXL", "Free Size"];
  const createdSizes = {};
  for (const sizeName of sizesData) {
    const newSize = await prisma.size.upsert({
      where: { name: sizeName },
      update: {},
      create: { name: sizeName },
    });
    createdSizes[newSize.name] = newSize; // Store by name for easy lookup
    console.log(`Size created or found: ${newSize.name} (ID: ${newSize.id})`);
  }
  console.log("Size seeding complete.");

  // --- Seed Products and Link Colors/Sizes ---
  const productsData = [
    {
      name: "لباس مجلسی دکلته الی",
      description:
        "دامن مجلسی کلوش با پارچه ساتن براق، انتخابی ایده‌آل برای ست کردن با شومیزهای مجلسی. فروش محدود!",
      price: 750000,
      discountedPrice: 600000,
      isDiscounted: true,
      imageUrl: "/img/product-off-1.png",
      categoryName: "پیراهن شب",
      colors: ["#800080", "#000000"], // آرایه‌ای از کدهای هگز
      sizes: ["S", "M", "L"], // آرایه‌ای از نام سایزها
    },
    {
      name: "پیراهن شب گیپور",
      description:
        "پیراهن شب بلند تمام گیپور با آستر، بسیار شیک و مجلل. آف ویژه آخر فصل!",
      price: 2200000,
      discountedPrice: 1100000,
      isDiscounted: true,
      imageUrl: "/img/product-off-2.png",
      categoryName: "پیراهن شب",
      colors: ["#8B0000", "#FFFFFF"],
      sizes: ["S", "XL"],
    },
    {
      name: "لباس مجلسی میدی",
      description:
        "مانتو مجلسی مخمل با یقه فانتزی، مناسب فصول سرد و مجالس رسمی. تخفیف استثنایی!",
      price: 1500000,
      discountedPrice: 1200000,
      isDiscounted: true,
      imageUrl: "/img/product-off-3.png",
      categoryName: "پیراهن شب",
      colors: ["#006400", "#FF0000"],
      sizes: ["L", "XL"],
    },
    {
      name: "پیراهن مجلسی توری",
      description:
        "دامن مجلسی کوتاه از جنس تور لمه با آستر، مناسب مهمانی‌های غیررسمی. حراج ویژه!",
      price: 600000,
      discountedPrice: 400000,
      isDiscounted: true,
      imageUrl: "/img/product-off-4.png",
      categoryName: "پیراهن شب",
      colors: ["#C0C0C0", "#000000"],
      sizes: ["M", "Free Size"],
    },
  ];

  for (const productData of productsData) {
    const category = createdCategories[productData.categoryName];
    if (category) {
      const product = await prisma.product.upsert({
        where: { name: productData.name },
        update: {
          description: productData.description,
          price: productData.price,
          discountedPrice: productData.discountedPrice || null,
          isDiscounted: productData.isDiscounted || false,
          imageUrl: productData.imageUrl || null,
          categoryId: category.id,
        },
        create: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discountedPrice: productData.discountedPrice,
          isDiscounted: productData.isDiscounted,
          imageUrl: productData.imageUrl,
          categoryId: category.id,
        },
      });
      console.log(`Product created or updated: ${product.name} (ID: ${product.id})`);

      // ✅ حذف روابط قدیمی رنگ‌ها برای این محصول
      await prisma.productColor.deleteMany({
        where: { productId: product.id },
      });
      // ✅ لینک کردن رنگ‌ها
      for (const colorHexCode of productData.colors) {
        const color = createdColors[colorHexCode];
        if (color) {
          await prisma.productColor.create({
            data: {
              productId: product.id,
              colorId: color.id,
            },
          });
          console.log(`  -> Linked color ${color.name} (${color.hexCode}) to ${product.name}`);
        } else {
          console.warn(`  -> Color with hex code "${colorHexCode}" not found for product "${productData.name}". Skipping linking.`);
        }
      }

      // ✅ حذف روابط قدیمی سایزها برای این محصول
      await prisma.productSize.deleteMany({
        where: { productId: product.id },
      });
      // ✅ لینک کردن سایزها
      for (const sizeName of productData.sizes) {
        const size = createdSizes[sizeName];
        if (size) {
          await prisma.productSize.create({
            data: {
              productId: product.id,
              sizeId: size.id,
            },
          });
          console.log(`  -> Linked size ${size.name} to ${product.name}`);
        } else {
          console.warn(`  -> Size "${sizeName}" not found for product "${productData.name}". Skipping linking.`);
        }
      }

    } else {
      console.warn(
        `Category "${productData.categoryName}" not found for product "${productData.name}". Skipping product.`
      );
    }
  }

  console.log("Products with multiple colors and sizes seeding complete!");
}

main()
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });