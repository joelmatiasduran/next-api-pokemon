import React, { useState, useEffect } from "react";
import axios from "axios";

//Axios must be used for http request

//Here I have to display 20 pokemons

//Create a pagination

//Create a search input that filter the list by name

//Each Pokemon must display: Name and photo

{
  /* HERE IS THE PART OF STATIC SITE GENERATION*/
}

//When the user clicks on the Item it will be redirected to item's description > ﻿https://pokeapi.co/api/v2/pokemon/id

//Description parameters must include "﻿Move's name" and "evolutions"

//When user clicks on "Evolution" it must be redirected to Evolution's related info.

interface Props {
  id: string;
  name: string;
  image: string;
  current_price: number;
}

const HomePage = (props: Props) => {
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
              key={coin.id}
              name={coin.name}
              image={coin.image}
              price={coin.current_price}
            />
          );
        })*/}
      </div>
    </>
  );
};

export default HomePage;
