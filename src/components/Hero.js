import Heroimg from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <img className="hero-img" src={Heroimg} alt="" />
      <div className="cta">
        <h2>Prêts à faire du tri dans vos placards ?</h2>
        <Link to={"/publish"}>
          <button style={{ cursor: "pointer" }}>Commencer à vendre</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
