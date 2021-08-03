import axios from "axios";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [data, setData] = useState();

  const token = userToken;

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // formData()
      const formData = new FormData();

      // add keys/values pairs
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      // Axios request
      const response = await axios.post(
        "https://vinted-rep-backend.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      }
      console.log(response.data);
      setData(response.data.result);
    } catch (error) {
      console.log(error.response);
    }
  };

  return userToken ? (
    <div className="publish">
      <h1>Vends ton article</h1>
      <form onSubmit={handleSubmit} id="publish-form">
        <div className="pic-pub" style={{ backgroundColor: "white" }}>
          <div className="dashed">
            <div className="input-style">
              <input
                type="file"
                onChange={(event) => setPicture(event.target.files[0])}
                id="pic-upload"
              />
              <label htmlFor="pic-upload" className="label-pic">
                <span className="plus-sign">+</span>
                <span className="add-pic-text">Ajoute une photo</span>
              </label>
            </div>
          </div>
        </div>

        <div className="title-desc-pub" style={{ backgroundColor: "white" }}>
          <div className="input-text">
            <h4>Titre</h4>
            <input
              type="text"
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="input-text">
            <h4>Décris ton article</h4>
            <input
              type="text"
              placeholder="ex: porté quelques fois, taille correctement"
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>

        <div className="details-pub" style={{ backgroundColor: "white" }}>
          <div className="input-text">
            <h4>Marque</h4>
            <input
              type="text"
              placeholder="ex: Zara"
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="input-text">
            <h4>Taille</h4>
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div className="input-text">
            <h4>Couleur</h4>
            <input
              type="text"
              placeholder="ex: Fuschia"
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="input-text">
            <h4>État</h4>
            <input
              type="text"
              placeholder="Neuf avec étiquette"
              onChange={(event) => setCondition(event.target.value)}
            />
          </div>
          <div className="input-text">
            <h4>Lieu</h4>
            <input
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>

        <div className="price-pub" style={{ backgroundColor: "white" }}>
          <div className="input-text">
            <h4>Prix</h4>
            <div className="price-and-checkbox">
              <div className="price-input">
                <input
                  type="text"
                  placeholder="0,00€"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="checkbox-input">
                <input type="checkbox" id="echanges" />
                <label
                  htmlFor="echanges"
                  className="checkbox-style"
                  type="checkbox"
                ></label>
                <span className="checkbox-text-style">
                  Je suis intéressé.e par les échanges
                </span>
              </div>
            </div>
          </div>
        </div>
        <button type="submit">Ajouter</button>
      </form>
      {data && <img src={data.secure_url} alt="" />}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
