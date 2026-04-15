import Stripe from "stripe";
import { getStripeSecretKey } from "./env";

let cachedStripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!cachedStripe) {
    cachedStripe = new Stripe(getStripeSecretKey(), {
      typescript: true,
    });
  }
  return cachedStripe;
}
