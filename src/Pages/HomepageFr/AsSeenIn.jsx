import React from "react";
import EU from "../../Images/EU.jpg";
import UNESCO from "../../Images/unesco.jpg";
import AMCH from "../../Images/AMCH.jpg";
import ENTREP from "../../Images/entrpreneur.png";
import TEDX from "../../Images/tedx.jpeg";

export default function AsSeenIn() {
  return (
    <div className="my-10 mb-16 ">
      <h1 className="font-bold text-3xl mb-8 specialFont">As Seen In</h1>
      <div className="flex flex-wrap justify-center opacity-60 ">
        <img src={UNESCO} alt="" className="w-[150px] object-contain" />
        <img src={EU} alt="" className="w-[150px] object-contain" />
        <img src={TEDX} alt="" className="w-[150px] object-contain" />
        <img src={AMCH} alt="" className="w-[150px] object-contain" />
        <img src={ENTREP} alt="" className="w-[150px] object-contain" />
      </div>
    </div>
  );
}
