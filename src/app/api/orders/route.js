import dbConnect from "@/lib/db";
import { Orders } from "@/model/Order";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await dbConnect();  

        const payload = await request.json();  
        const orderObj = new Orders(payload);
        const result = await orderObj.save();

        if (result) {
            return NextResponse.json({ success: true, message: "Order placed successfully", order: result });
        } else {
            return NextResponse.json({ success: false, message: "Order could not be placed" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
