import axios from "axios";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-rep-backend.herokuapp.com/user/signup",
        {
          username: name,
          email: email,
          password: password,
        }
      );

      const token = response.data.token;

      if (token) {
        setUser(token);
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.status === 409) {
        setErrorMessage("Cet email est déjà utilisé.");
      }
    }
  };

  return (
    <div className="signup">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleNameChange}
        />
        <input type="text" placeholder="Email" onChange={handleEmailChange} />
        {/* <input type="text" placeholder="Téléphone"  /> */}
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
        />
        <div className="news-input">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <button type="submit">S'inscrire</button>
        <Link className="signup-link" to={"/signup"}>
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default Signup;
