import Logo from "../assets/logo-vinted.png";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return userToken ? (
    <div className="header-loggedin">
      <Link to={"/"}>
        <img className="logo" src={Logo} alt="" />
      </Link>
      <input
        className="search"
        type="search"
        placeholder="Recherche des articles"
      />
      <div className="header-loggedin-buttons">
        <Link onClick={() => setUser(null)} className="red-btn" to="/">
          Se déconnecter
        </Link>
        <Link to={"/publish"}>
          <button style={{ cursor: "pointer" }}>Vends tes articles</button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src={Logo} alt="" />
      </Link>
      <div className="header-buttons">
        <input
          className="search"
          type="search"
          placeholder="Recherche des articles"
        />
        <Link to="/signup" className="white-btn">
          S'inscrire
        </Link>
        <Link to={"/login"} className="white-btn">
          Se connecter
        </Link>
        <Link to={"/publish"}>
          <button style={{ cursor: "pointer" }}>Vends tes articles</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
