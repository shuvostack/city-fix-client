import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckCircle, Crown, ShieldCheck, Zap } from "lucide-react";
import CheckoutForm from "./CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const price = 1000;

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 font-sans flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 animate-fade-in-down">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-xs bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
            Premium Upgrade
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 mb-3">
            Unlock Full Potential
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Become a verified citizen and help us build a better city without
            any limits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden text-white group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/20 rounded-full -ml-10 -mb-10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-orange-400 mb-8 border border-white/10 shadow-lg">
                  <Crown size={32} fill="currentColor" />
                </div>

                <h2 className="text-3xl font-bold mb-2">Lifetime Membership</h2>
                <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8">
                  <span className="text-5xl font-extrabold text-white">
                    ৳{price}
                  </span>
                  <span className="text-gray-400 font-medium mb-1">
                    / one-time
                  </span>
                </div>

                <ul className="space-y-5">
                  {[
                    "Verified User Badge on Profile",
                    "Report Unlimited Issues",
                    "Priority Review by Admin",
                    "Direct Impact on City Development",
                    "Premium Support Access",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-200 font-medium"
                    >
                      <CheckCircle
                        size={20}
                        className="text-green-400 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <Zap className="text-yellow-400" size={24} />
                  <p className="text-xs text-gray-300">
                    <strong>Instant Activation:</strong> Your account will be
                    upgraded immediately after successful payment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 animate-fade-in-up delay-100">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="text-green-500" size={28} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Secure Checkout
                  </h3>
                  <p className="text-xs text-gray-400">Encrypted by Stripe</p>
                </div>
              </div>

              
              <Elements stripe={stripePromise}>
                <CheckoutForm price={price} />
              </Elements>

              <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src="https://img.icons8.com/color/48/visa.png"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://img.icons8.com/color/48/mastercard.png"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://img.icons8.com/color/48/amex.png"
                  alt="Amex"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
