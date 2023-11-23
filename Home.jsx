import React from "react";
import BannerImg from "../Images/BGimage.png"
import BannerImage from "../Images/Banimg.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        {/* <div className="home-bannerImage-container">
          <img src={BannerImg} alt="" />
        </div> */}
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your One-Step E-Identity Proof
          </h1>
          <p className="primary-text">
           
          Identity Proof that can be accessed anywhere to identify you,
          as an individual of this country
          </p>

          <Link className="secondary-button" to="/UserDetails">
              Register Now <FiArrowRight />{" "}
            </Link>

          {/* <button className="secondary-button">
            Register Now <FiArrowRight />{" "}
          </button> */}


        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default Home;