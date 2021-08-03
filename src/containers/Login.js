import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(
        "https://vinted-rep-backend.herokuapp.com/user/login",
        {
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
    }
  };

  return (
    <div className="login">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleEmailChange}
          type="text"
          placeholder="Adresse email"
        />
        <input
          onChange={handlePasswordChange}
          type="password"
          placeholder="Mot de passe"
        />
        <button type="submit">Se connecter</button>
        <Link className="login-link" to={"/signup"}>
          Pas encore de compte ? Inscris-toi !
        </Link>
      </form>
    </div>
  );
};

export default Login;
