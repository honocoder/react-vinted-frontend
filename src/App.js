// Functions imports
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components imports
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import CheckoutForm from "./containers/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JKNh7DBzgsanfUiD0u2eVkWvQ4J6bRZDP0o4JUlFSHYuYowCd8hIlUOGAmL2G53qPru270ETTyylYbxlYqSi57a00YswXevj8"
);
// Routes declaration
function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // Loading Stripe
  // Function to create a cookie containing the user's token and modify the state to change the Header
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 7,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} />
        </Route>
        <Elements stripe={stripePromise}>
          <Route path="/payment">
            <CheckoutForm />
          </Route>
        </Elements>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
