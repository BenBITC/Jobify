import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Single-origin coffee echo park irure, paleo trust fund cliche next
            level labore. Pinterest disrupt veniam, crucifix four loko etsy kogi
            tbh irure austin small batch pok pok non. XOXO sustainable sed
            aliquip. Vegan fingerstache solarpunk fam aute biodiesel mlkshk
            sartorial tacos kinfolk.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img
          src={main}
          alt="traveler looking down a road"
          className="img main-img"
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
