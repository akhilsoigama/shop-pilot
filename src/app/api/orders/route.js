import { NextResponse } from "next/server";
import { Orders } from "../../models/orderSchemas";
import { connectDB } from "@/lib/db";
import { getCache, setCache } from "@/lib/cache";

const CACHE_KEY = "orders";
const CACHE_TTL = 60;

const errorResponse = (message, status = 500) => {
  return NextResponse.json({ success: false, message }, { status });
};

export async function GET() {
  try {
    await connectDB();

    const cached = await getCache(CACHE_KEY);
    if (cached) {
      return NextResponse.json({ success: true, orders: cached });
    }

    const orders = await Orders.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    await setCache(CACHE_KEY, orders, CACHE_TTL);

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return errorResponse("Failed to fetch orders");
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    
    if (!payload.items || payload.items.length === 0) {
      return errorResponse("Order must contain items", 400);
    }

    const order = new Orders({
      ...payload,
      status: "pending",
      createdAt: new Date(),
    });

    const result = await order.save();

    await setCache(CACHE_KEY, null, 0);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: result,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return errorResponse(error.message.includes("validation") 
      ? error.message 
      : "Internal Server Error");
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return errorResponse("Order ID required", 400);
    }

    const result = await Orders.findByIdAndDelete(id);

    if (!result) {
      return errorResponse("Order not found", 404);
    }

    await setCache(CACHE_KEY, null, 0);

    return NextResponse.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return errorResponse("Failed to cancel order");
  }
}