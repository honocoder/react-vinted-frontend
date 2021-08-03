import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ userToken, userId, productTitle, productPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const clientProtectPrice = 0.8;
  const deliveryPrice = 1.6;
  const total = (productPrice + clientProtectPrice + deliveryPrice).toFixed(2);

  console.log(productPrice);
  console.log(total);

  const handleSubmit = async (event) => {
    // console.log("Hello!");
    try {
      event.preventDefault();

      // Get datas from form
      const cardElements = elements.getElement(CardElement);
      // Send it to Stripe's API
      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });
      console.log(stripeResponse);
      console.log(stripeResponse.token.id);
      // Send stripeToken to the server
      const response = await axios.post(
        "https://vinted-rep-backend.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          price: productPrice,
          title: productTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Server's response ===> ", response.data);

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h4>Résumé de la commande</h4>
      <div>
        <div>Commande</div>
        <div>{productPrice}</div>
      </div>
      <div>
        <div>Frais protection acheteurs</div>
        <div>
          <span>{clientProtectPrice} €</span>
        </div>
      </div>
      <div>
        <div>Frais de port</div>
        <div>
          <span>{deliveryPrice} €</span>
        </div>
      </div>

      <div>
        <div>Total</div>
        <div>{total} €</div>
      </div>
      <p>
        Il ne vous reste plus qu'une étape pour vous offrir{" "}
        <strong>{productTitle}</strong>. Vous allez payer{" "}
        <strong>{total} €</strong> (frais de protection et frais de port
        inclus).
      </p>

      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <input type="submit" />
        </form>
      ) : (
        <span>Merci pour votre achat !</span>
      )}
    </div>
  );
};

export default CheckoutForm;
