import React from "react";
import "./Home.css";
import Categories from "./comp/Categories"
import Featured from "./comp/Featured"

function Home() {



  return (
    <div>
      <div className="home__banner animFadeIn">
        <img
          className="home__bannerImage"
          src="amazon_smile_plain.png"
          alt=""
        />
      </div>
      <div className="home__dealsCont animFadeIn">
        <div className="home__bannerImage2Cont grow">
          <img src="/thumb/shopdeals.png" className="home__bannerImage2" alt="Many Deals"/>
        </div>
        <div className="home__bannerImage2Cont grow">
          <img src="/thumb/holiday_01.jpg" className="home__bannerImage2" alt="Great Deals for the Holiday"/>
        </div>
      </div>
      <div className="home animFadeIn">
        <span className="home__catTitle">Categories</span>
        <Categories />
        <span className="home__featuredTitle">Featured</span>
        <Featured />
      </div>
    </div>
  );
}

export default Home;
