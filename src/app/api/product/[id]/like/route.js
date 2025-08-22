import { getAuth } from "@clerk/nextjs/server"
import Product from "@/model/Product"
import { dbConnect } from "@/lib/db"

export async function PATCH(req, { params }) {
    await dbConnect()

    const { userId } = getAuth(req)
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }

    try {
        const product = await Product.findById(params.id)
        if (!product) {
            return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 })
        }

        // Check if user already liked the product
        const alreadyLiked = product.likedBy.includes(userId)

        if (alreadyLiked) {
            // Remove like
            product.likedBy = product.likedBy.filter(id => id !== userId)
            product.likes = Math.max(0, product.likes - 1)
        } else {
            // Add like
            product.likedBy.push(userId)
            product.likes = product.likes + 1
        }

        await product.save()

        return new Response(
            JSON.stringify({
                success: true,
                likes: product.likes,
                likedBy: product.likedBy,
                message: alreadyLiked ? "Like removed" : "Like added"
            }),
            { status: 200 }
        )
    } catch (error) {
        console.error("Like error:", error)
        return new Response(JSON.stringify({
            error: "Something went wrong",
            details: error.message
        }), { status: 500 })
    }
}