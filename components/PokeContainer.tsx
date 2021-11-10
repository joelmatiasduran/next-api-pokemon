import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  image: string | any;
  name: any;
  pokemons: any;
}

const PokeContainer = (pokemons: Props) => {
  return (
    <>
      <a>
        <br></br>
        <Image
          src={pokemons.image}
          height={100}
          width={100}
          alt={pokemons.name}
        />
      </a>
    </>
  );
};

export default PokeContainer;
