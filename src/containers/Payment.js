import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router";

// Component import
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKNh7DBzgsanfUiD0u2eVkWvQ4J6bRZDP0o4JUlFSHYuYowCd8hIlUOGAmL2G53qPru270ETTyylYbxlYqSi57a00YswXevj8"
);

const Payment = () => {
  const location = useLocation();
  const { userToken, userId, product_name, product_price } =
    location.state.data;

  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userToken={userToken}
            userId={userId}
            productTitle={product_name}
            productPrice={product_price}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
