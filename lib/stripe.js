import Stripe from 'stripe'
 
// Singleton pattern — reuse same instance across all API routes
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
})
 
export default stripe

