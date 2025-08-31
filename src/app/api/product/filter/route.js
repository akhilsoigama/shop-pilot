import { dbConnect } from "@/lib/db";
import Product from "@/model/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);

    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const inStock = searchParams.get("inStock");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");

    // 👇 only apply conditions if params exist
    const filter = {};
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (subCategory) filter.subCategory = { $regex: subCategory, $options: "i" };
    if (inStock !== null) filter.inStock = inStock === "true";
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    let sort = { createdAt: -1 };
    if (sortBy === "priceAsc") sort = { price: 1 };
    if (sortBy === "priceDesc") sort = { price: -1 };
    if (sortBy === "newest") sort = { createdAt: -1 };
    if (sortBy === "oldest") sort = { createdAt: 1 };

    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
