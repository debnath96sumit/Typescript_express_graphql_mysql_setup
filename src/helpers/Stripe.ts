import stripe from 'stripe';
import { STRIPE_SECRET_KEY  } from '../config/variables';

export const stripeClient = new stripe(STRIPE_SECRET_KEY);

export const createStripeCustomer = async (name: string, email: string)=>{
    return await stripeClient.customers.create({name, email});
}

export const createPaymentIntent = async (amount: number, customer_id: string)=>{
    return await stripeClient.paymentIntents.create({
        amount: amount * 100,
        currency: 'USD',
        customer: customer_id,
        automatic_payment_methods: {
            enabled: true
        }
    })
}