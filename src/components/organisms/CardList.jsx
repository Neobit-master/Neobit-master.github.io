import React from "react";
import Card from "@Components/molecules/Card";

const CardList = ({ astheroids }) => {
  return (
    <section className="cardList">
      {astheroids.map((astheroid) => (
        <Card astheroid={astheroid} key={astheroid._id} />
      ))}
    </section>
  );
};

export default CardList;
