import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-rep-backend.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="single-offer-page-body">
      <div className="single-offer-page">
        <div className="img-col">
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div className="infos-col">
          <p>{data.product_price} €</p>

          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);

            return (
              <div className="keys-values" key={index}>
                <span className="keys">{keys[0]} </span>
                <span className="offer-values">{elem[keys[0]]}</span>
              </div>
            );
          })}

          <div className="inf-bot">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <p>{data.owner.account.username}</p>
            <button className="buy-btn">Acheter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
