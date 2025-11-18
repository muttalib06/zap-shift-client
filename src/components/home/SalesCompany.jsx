import React from "react";
import team1 from "../../assets/brands/amazon.png";
import team2 from "../../assets/brands/amazon_vector.png";
import team3 from "../../assets/brands/casio.png";
import team4 from "../../assets/brands/moonstar.png";
import team5 from "../../assets/brands/randstad.png";
import team6 from "../../assets/brands/star.png";
import team7 from "../../assets/brands/start_people.png";
import Marquee from "react-fast-marquee";

const SalesCompany = () => {
  const teams = [team1, team2, team3, team4, team5, team6, team7];
  return (
    <Marquee>
      <div className="flex gap-10 justify-center items-center mt-8">
        {teams.map((team) => (
          <img src={team}></img>
        ))}
      </div>
    </Marquee>
  );
};

export default SalesCompany;
