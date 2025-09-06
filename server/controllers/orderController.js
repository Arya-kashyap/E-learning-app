import { Order } from "../models/orderModel.js";
import { Purchase } from "../models/purchaseModel.js";

/**
 * @desc Create an order and register the purchase
 * @route POST /api/order
 */
export const orderData = async (req, res) => {
  const order = req.body;

  // ✅ Validate required fields
  if (!order?.userId || !order?.courseId) {
    return res.status(400).json({ error: "Missing userId or courseId in request body" });
  }

  try {
    // 🧾 Create order record
    const orderInfo = await Order.create(order);

    // ✅ Defensive check
    if (!orderInfo || !orderInfo.userId || !orderInfo.courseId) {
      return res.status(500).json({ error: "Order creation failed" });
    }

    // 🎯 Create purchase record
    await Purchase.create({
      userId: orderInfo.userId,
      courseId: orderInfo.courseId,
    });

    // 🚀 Respond with success
    res.status(201).json({
      message: "Order and purchase recorded successfully",
      orderInfo,
    });
  } catch (error) {
    console.error("❌ Error in order creation:", error);
    res.status(500).json({ error: "Internal server error during order processing" });
  }
};
