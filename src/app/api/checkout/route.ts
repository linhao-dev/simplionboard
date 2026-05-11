import { NextResponse } from "next/server";
import { createCheckout } from "@/lib/lemonsqueezy";

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    const checkout = await createCheckout(
      process.env.LEMON_SQUEEZY_STORE_ID!,
      process.env.LEMON_SQUEEZY_VARIANT_ID!,
      {
        checkoutData: {
          email,
          custom: { user_id: userId },
        },
        productOptions: { redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?subscribed=1` },
      },
    );

    const url = (checkout as any).data?.attributes?.url;
    if (!url) throw new Error("No checkout URL");
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
