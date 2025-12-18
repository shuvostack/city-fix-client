import React from "react";
import { X, Rocket, ShieldCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Dashboard/Payment/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const BoostModal = ({ issueId, closeModal }) => {
  const handleSuccess = () => {
    closeModal();
    window.location.reload(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-zoom-in relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
              <Rocket size={32} className="text-orange-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Boost Priority</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
              Pay <span className="font-bold text-gray-800">100tk</span> to mark
              this issue as High Priority.
            </p>
          </div>

          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-green-500" /> Secure
              Payment
            </div>

            
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={100} 
                type="boost" 
                issueId={issueId} 
                onSuccess={handleSuccess} 
              />
            </Elements>
          </div>

          <p className="text-center text-[10px] text-gray-400 mt-4">
            Authorities will be notified immediately after payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoostModal;
