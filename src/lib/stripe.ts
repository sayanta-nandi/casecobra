import Stripe from "stripe";

export const stripe = new Stripe(process.env.SECRET_KEY ?? "", {
  apiVersion: "2025-05-28.basil",
  typescript: true,
});
