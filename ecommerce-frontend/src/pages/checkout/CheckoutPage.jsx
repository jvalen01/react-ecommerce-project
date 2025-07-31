import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ cart, loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const deliveryResponse = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime"
        );
        setDeliveryOptions(deliveryResponse.data);

        const paymentResponse = await axios.get("/api/payment-summary");
        setPaymentSummary(paymentResponse.data);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
      }
    };
    fetchCheckoutData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.svg" />

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
