import { db } from "@/db";
import { stripe } from "@/lib/sripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Missing Stripe signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const { userId } = session.metadata || { userId: null };

      if (!userId) {
        console.error("Invalid metadata: userId is missing");
        return new Response("Invalid metadata: userId is missing", {
          status: 400,
        });
      }

      console.log("User ID from metadata:", userId);

      try {
        await db.user.update({
          where: { id: userId },
          data: { plan: "PRO" },
        });

        console.log(`User plan updated to 'PRO' for userId: ${userId}`);
      } catch (error) {
        console.error("Error updating user plan:", error);
        return new Response("Error updating user plan", { status: 500 });
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("OK");
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
