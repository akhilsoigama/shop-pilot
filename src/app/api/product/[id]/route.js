import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Product from "@/model/Product";

export async function GET(req, { params }) {
    await dbConnect();
    const { id } =await params;

    const product = await Product.findById(id);
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
}
