import React, { useState, useEffect } from "react";
import axios from "axios";

//Create a pagination

//Add a Link to the moves

//Refactor Components

//When user clicks on "Evolution" it must be redirected to Evolution's related info.

interface Props {
  id: string;
  name: string;
  image: string;
  current_price: number;
}

const HomePage: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div>
        <h1></h1>Welcome to the home page, if you see this, is probably because
        you are already logged in
      </div>
      <div className="coin-search">
        <h1 className="coin-text">Search a Pokemon</h1>
        <form>
          <input
            type="text"
            placeholder="Coin Name"
            className="coin-input"
            //onChange={handleChange}
          />
        </form>

        {/*filteredCoins.map((coin) => {
          return (
            <Pokemon
              key={something.id}
              name={something.name}
              image={something.image}
              price={something.current_price}
            />
          );
        })*/}
      </div>
    </>
  );
};

export default HomePage;
