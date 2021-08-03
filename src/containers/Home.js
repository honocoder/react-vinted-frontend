// Functions imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// Componenents imports

import Hero from "../components/Hero";

const Home = () => {
  // States declarations
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch through data using a useEffect
  useEffect(() => {
    console.log("test");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-rep-backend.herokuapp.com/offers"
        );
        console.log("Data ===>" + response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // Call of the fetching function
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="home-body">
      <Hero />
      <div className="offers">
        {data.offers.map((elem, index) => {
          return (
            <Link to={`/offer/${elem._id}`} className="offers-link">
              <div className="single-offer" key={elem._id}>
                <p className="home-offer-owner">
                  {elem.owner.account.username}
                </p>
                <img
                  src={elem.product_image.secure_url}
                  alt={elem.product_name}
                />
                <p className="price">{elem.product_price} €</p>
                <p className="size">{elem.product_details[1].TAILLE}</p>
                <p className="brand">{elem.product_details[0].MARQUE}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
