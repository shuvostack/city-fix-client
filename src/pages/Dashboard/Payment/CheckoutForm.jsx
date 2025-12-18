import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, CreditCard, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CheckoutForm = ({
  price,
  type = "subscription",
  issueId = null,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  
  useEffect(() => {
    if (price > 0 && !clientSecret) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          console.log("Client Secret Received");
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => console.error("Payment Intent Error", err));
    }
  }, [axiosSecure, price, clientSecret]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    setProcessing(true);

    
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError("");
    }

    
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          userEmail: user.email,
          userName: user.displayName,
          transactionId: paymentIntent.id,
          amount: price,
          date: new Date(),
          type: type, 
          status: "paid",
          issueId: issueId, 
        };

        try {
          const res = await axiosSecure.post("/payments", paymentInfo);
          console.log("Payment Saved:", res.data);

          if (res.data.insertedId) {
            if (type === "subscription") {
              Swal.fire({
                title: "Payment Successful!",
                text: `Welcome to Premium! Transaction ID: ${paymentIntent.id}`,
                icon: "success",
                confirmButtonColor: "#10B981",
                confirmButtonText: "Go to Profile",
              }).then(() => {
                navigate("/dashboard/profile");
              });
            } else if (type === "boost") {
              Swal.fire({
                title: "Boost Successful!",
                text: "Your issue has been prioritized to High!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              if (onSuccess) onSuccess(); 
            }
          }
        } catch (err) {
          console.error(err);
          toast.error("Payment succeeded but failed to update database.");
        } finally {
          setProcessing(false);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Input Field */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
          <CreditCard size={14} /> Card Details
        </label>
        <div
          className={`p-4 border rounded-xl bg-gray-50 transition-colors
                    ${
                      cardError
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 focus-within:border-primary focus-within:bg-white"
                    }
                `}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1f2937",
                  fontFamily: "sans-serif",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
        {cardError && (
          <p className="text-red-500 text-xs font-medium flex items-center gap-1">
            <Lock size={12} /> {cardError}
          </p>
        )}
      </div>

      {/* Pay Button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
      >
        {processing ? (
          <>
            <Loader2 className="animate-spin" /> Processing...
          </>
        ) : (
          <>
            Pay ৳{price}{" "}
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
