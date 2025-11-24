const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding process for products with multiple colors, sizes, and images...");

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

  const colorsData = [
    { name: "بنفش", hexCode: "#800080" },
    { name: "زرشکی", hexCode: "#8B0000" },
    { name: "سبز تیره", hexCode: "#006400" },
    { name: "نقره‌ای", hexCode: "#C0C0C0" },
    { name: "مشکی", hexCode: "#000000" },
    { name: "سفید", hexCode: "#FFFFFF" },
    { name: "قرمز", hexCode: "#FF0000" },
    { name: "آبی", hexCode: "#0000FF" },
    { name: "بژ", hexCode: "#F5F5DC" },
    { name: "طوسی", hexCode: "#808080" },
    { name: "آبی روشن", hexCode: "#ADD8E6" },
  ];

  const createdColors = {};
  for (const color of colorsData) {
    const newColor = await prisma.color.upsert({
      where: { name: color.name },
      update: { hexCode: color.hexCode },
      create: color,
    });
    createdColors[newColor.hexCode] = newColor;
    console.log(`Color created or found: ${newColor.name} (Hex: ${newColor.hexCode}, ID: ${newColor.id})`);
  }
  console.log("Color seeding complete.");

  const sizesData = ["S", "M", "L", "XL", "XXL"];
  const createdSizes = {};
  for (const sizeName of sizesData) {
    const newSize = await prisma.size.upsert({
      where: { name: sizeName },
      update: {},
      create: { name: sizeName },
    });
    createdSizes[newSize.name] = newSize;
    console.log(`Size created or found: ${newSize.name} (ID: ${newSize.id})`);
  }
  console.log("Size seeding complete.");

  const productsData = [
    {
      name: "لباس مجلسی دکلته الی",
      description: "دامن مجلسی کلوش با پارچه ساتن براق، انتخابی ایده‌آل برای ست کردن با شومیزهای مجلسی. فروش محدود!",
      price: 750000,
      discountedPrice: 600000,
      isDiscounted: true,
      categoryName: "پیراهن شب",
      colors: ["#800080", "#000000"],
      sizes: ["S", "M", "L"],
      images: ["/img/product-off-1.png", "/img/category-page-desktop-3.png", "/img/category-page-2.png"],
    },
    {
      name: "پیراهن شب گیپور",
      description: "پیراهن شب بلند تمام گیپور با آستر، بسیار شیک و مجلل. آف ویژه آخر فصل!",
      price: 2200000,
      discountedPrice: 1100000,
      isDiscounted: true,
      categoryName: "پیراهن شب",
      colors: ["#8B0000", "#006400"],
      sizes: ["S", "XL"],
      images: ["/img/product-off-2.png", "/img/category-page-4.png", "/img/category-page-1.png"],
    },
    {
      name: "لباس مجلسی میدی",
      description: "مانتو مجلسی مخمل با یقه فانتزی، مناسب فصول سرد و مجالس رسمی. تخفیف استثنایی!",
      price: 1500000,
      discountedPrice: 1200000,
      isDiscounted: true,
      categoryName: "پیراهن شب",
      colors: ["#006400", "#FF0000"],
      sizes: ["L", "XL"],
      images: ["/img/product-off-3.png", "/img/category-page-5.png", "/img/category-page-6.png"],
    },
    {
      name: "پیراهن مجلسی توری",
      description: "دامن مجلسی کوتاه از جنس تور لمه با آستر، مناسب مهمانی‌های غیررسمی. حراج ویژه!",
      price: 600000,
      discountedPrice: 400000,
      isDiscounted: true,
      categoryName: "پیراهن شب",
      colors: ["#C0C0C0", "#000000"],
      sizes: ["M"],
      images: ["/img/product-off-4.png", "/img/category-page-7.png", "/img/category-page-8.png"],
    },

    {
      name: "شلوار جین زنانه فاق بلند",
      description: "شلوار جین فاق بلند با برش جذب، مناسب برای استایل روزمره و ترکیب با کراپ تاپ.",
      price: 890000,
      discountedPrice: null,
      isDiscounted: false,
      categoryName: "شلوار جین",
      colors: ["#0000FF", "#000000"], 
      sizes: ["S", "M", "L"],
      images: ["/img/category-page-desktop-5.png", "/img/category-page-desktop-2.png"],
    },
    {
      name: "کت مجلسی اورسایز زنانه",
      description: "کت مجلسی اورسایز با استایل مدرن، ایده‌آل برای مهمانی‌ها و قرارهای خاص.",
      price: 1700000,
      discountedPrice: 1500000,
      isDiscounted: true,
      categoryName: "کت تک",
      colors: ["#808080", "#F5F5DC"],
      sizes: ["XL"],
      images: ["/img/category-page-desktop-7.png", "/img/category-page-desktop-6.png"],
    },
    {
      name: "شومیز حریر آستین پفی",
      description: "شومیز حریر با آستین‌های پفی و طرح ساده، مناسب برای مجالس و ترکیب با دامن مجلسی.",
      price: 720000,
      discountedPrice: null,
      isDiscounted: false,
      categoryName: "شومیز رسمی",
      colors: ["#F5F5DC", "#8B0000"],
      sizes: ["S", "M", "L"],
      images: ["/img/category-page-desktop-3.png", "/img/category-page-desktop-1.png"],
    },
    {
      name: "دامن بلند پلیسه زنانه",
      description: "دامن بلند پلیسه از جنس ساتن، انتخابی شیک و راحت برای میهمانی‌ها و استفاده روزمره.",
      price: 950000,
      discountedPrice: 800000,
      isDiscounted: true,
      categoryName: "دامن بلند",
      colors: ["#000000", "#800080"],
      sizes: ["M", "L"],
      images: ["/img/category-page-desktop-2.png", "/img/category-page-desktop-8.png"],
    },
    {
      name: "کراپ تاپ نخی اسپرت",
      description: "کراپ تاپ نخی با طراحی اسپرت، مناسب برای فعالیت‌های ورزشی و استایل کژوال.",
      price: 320000,
      discountedPrice: null,
      isDiscounted: false,
      categoryName: "تاپ کراپ",
      colors: ["#FF0000", "#006400"],
      sizes: ["S", "M"],
      images: ["/img/category-page-desktop-4.png", "/img/category-page-desktop-5.png"],
    },
    {
      name: "پالتو بلند پشمی زنانه",
      description: "پالتو پشمی بلند و گرم، با طراحی کلاسیک و شیک، ایده‌آل برای فصول سرد.",
      price: 2800000,
      discountedPrice: 2400000,
      isDiscounted: true,
      categoryName: "پالتو بلند",
      colors: ["#000000", "#808080"],
      sizes: ["M", "L", "XL"],
      images: ["/img/category-page-desktop-1.png", "/img/category-page-desktop-9.png"],
    },
    {
      name: "سرهمی مجلسی مخمل",
      description: "سرهمی مجلسی از جنس مخمل با جزئیات دانتل، انتخابی منحصر به فرد برای شب‌های خاص.",
      price: 2100000,
      discountedPrice: 1800000,
      isDiscounted: true,
      categoryName: "سرهمی مجلسی",
      colors: ["#8B0000", "#000000"],
      sizes: ["S", "M"],
      images: ["/img/category-page-desktop-3.png", "/img/category-page-desktop-2.png"],
    },
    {
      name: "بلوز بافت ظریف زنانه",
      description: "بلوز بافت ظریف و سبک، مناسب برای استفاده روزمره و ترکیب با کت و دامن.",
      price: 480000,
      discountedPrice: null,
      isDiscounted: false,
      categoryName: "بلوز",
      colors: ["#800080", "#ADD8E6"],
      sizes: ["S", "M", "L"],
      images: ["/img/category-page-desktop-5.png", "/img/category-page-desktop-4.png"],
    },
    {
      name: "دامن میدی چرم مصنوعی",
      description: "دامن میدی از چرم مصنوعی با طراحی شیک و مدرن، مناسب برای استایل‌های جسورانه.",
      price: 1100000,
      discountedPrice: null,
      isDiscounted: false,
      categoryName: "دامن میدی",
      colors: ["#000000", "#800080"],
      sizes: ["S", "M"],
      images: ["/img/category-page-desktop-7.png", "/img/category-page-desktop-6.png"],
    }
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
          categoryId: category.id,
        },
        create: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discountedPrice: productData.discountedPrice,
          isDiscounted: productData.isDiscounted,
          categoryId: category.id,
        },
      });
      console.log(`Product created or updated: ${product.name} (ID: ${product.id})`);

      await prisma.productColor.deleteMany({
        where: { productId: product.id },
      });
      for (const colorHexCode of productData.colors) {
        const color = createdColors[colorHexCode];
        if (color) {
          await prisma.productColor.create({
            data: {
              productId: product.id,
              colorId: color.id,
            },
          });
          console.log(`  -> Linked color ${color.name} (${color.hexCode}) to ${product.name}`);
        } else {
          console.warn(`  -> Color with hex code "${colorHexCode}" not found for product "${productData.name}". Skipping linking.`);
        }
      }

      await prisma.productSize.deleteMany({
        where: { productId: product.id },
      });
      for (const sizeName of productData.sizes) {
        const size = createdSizes[sizeName];
        if (size) {
          await prisma.productSize.create({
            data: {
              productId: product.id,
              sizeId: size.id,
            },
          });
          console.log(`  -> Linked size ${size.name} to ${product.name}`);
        } else {
          console.warn(`  -> Size "${sizeName}" not found for product "${productData.name}". Skipping linking.`);
        }
      }

      await prisma.ProductImage.deleteMany({
        where: { productId: product.id },
      });
      for (const imageUrl of productData.images) {
        await prisma.ProductImage.create({
          data: {
            productId: product.id,
            imageUrl: imageUrl,
          },
        });
        console.log(`  -> Linked image "${imageUrl}" to ${product.name}`);
      }

    } else {
      console.warn(
        `Category "${productData.categoryName}" not found for product "${productData.name}". Skipping product.`
      );
    }
  }

  console.log("Products with multiple colors, sizes, and images seeding complete!");
}

main()
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });