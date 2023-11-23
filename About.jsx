import React from "react";
import AboutBackground from "../Images/AboutImg.jpg";
import AboutBackgroundImage from "../Images/AboutBgImg.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";

const About = () => {
  return (
    <div>
    <HomeNavbar />
  
    <div className="about-section-container">
    
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        {/* <img src={AboutBackgroundImage} alt="" /> */}
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About Us</p>
        <h1 className="primary-heading">
          Get Your E-Identity Proof
        </h1>
        <p className="primary-text">
          Get your E-ID proof done here without any hassle !!
            </p>
        
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>

      </div>
    </div>
    </div>
    
  );
};

export default About;