import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useState } from "react";
// import { usePokemon } from "../hooks/usePokemon";
import { useUser } from "@auth0/nextjs-auth0";
import {
  SinglePokemon,
  FetchAllPokemonResponse,
  PokemonTypes,
} from "../interfaces/PokemonTypes";

interface Props {
  user: string;
  pokemons: any;
  rawdata: any;
}

const HomePage = withPageAuthRequired(
  ({
    user,
    pokemons,
    rawdata,
  }: {
    user: { name: string };
    pokemons: PokemonTypes;
    rawdata: FetchAllPokemonResponse;
  }) => {
    const [page, setPage] = useState("");
    const [search, setSearch] = useState("");

    //Handles Input
    const handleChange = (e: any) => {
      setSearch(e.target.value);
    };

    //Filter Pokemons
    const filteredPokemons = pokemons.filter((pokemons: { name: string }) =>
      pokemons.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        <div className="flex flex-col items-center text-center justify-center mb-10">
          <h1 className="w-full flex-col md:flex-row text-2xl md:text-3xl text-center items-center justify-center p-10 bg-yellow-300">
            <span className="text-3xl m-5 font-mono">Welcome!!</span>
            <br></br>
            <div className="mt-10">
              <span className="cursor-pointer capitalize bg-red-500 border-2 border-transparent hover:bg-yellow-300 hover:border-red-600 text-white hover:text-black p-5 rounded-full duration-300">
                {" "}
                {user.name}{" "}
              </span>
            </div>
          </h1>
          <div className="flex flex-col p-10 items-center justify-center text-center bg-blue-400 rounded-lg text-black h-24 w-1/3">
            <h2 className="text-sm m-10 text-center font-bold font-mono">
              Now that you are logged in, you can see all the pokemons! ;)
            </h2>
          </div>
        </div>
        <div className="text-center justify-center relative">
          <div className="px-14 py-6 absolute right-0 z-10">
            <button className="bg-red-600 hover:bg-yellow-300 duration-300 p-6 text-white hover:text-black rounded-full right-5 transform hover:scale-150 cursor-pointer">
              Next
            </button>
          </div>
          <div className="px-14 py-6 absolute left-0 z-10">
            <button className="bg-red-600 hover:bg-yellow-300 duration-300 p-6 text-white hover:text-black rounded-full left-5 transform hover:scale-150 cursor-pointer">
              Previous
            </button>
          </div>
          <form>
            <h2 className="font-mono">SEARCH YOUR POKEMON!</h2>
            <div className="relative mr-6 my-2">
              <input
                type="text"
                placeholder="Search your Pokemon!"
                onChange={handleChange}
                className="border-2 border-red-600 p-4"
              />
            </div>
          </form>
        </div>

        {/*Displaying Pokemon Info */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon: PokemonTypes, index: number) => (
            <li
              key={index}
              className="text-center items-center list-none m-4 p-3"
            >
              <span className="w-full bg-red-600 hover:bg-yellow-300 duration-300 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row text-black hover:text-red-600">
                <Link href={`/pokemon/${index + 1}`} passHref>
                  <a className="flex flex-col p-5 items-center justify-center text-center">
                    <span className="capitalize text-xl font-bold font-mono">
                      {pokemon.name}
                    </span>
                    <br></br>
                    <div className="transform hover:scale-150 duration-300 cursor-pointer">
                      <Image
                        src={pokemon.image}
                        height={100}
                        width={100}
                        alt={pokemon.name}
                      />
                    </div>
                  </a>
                </Link>
              </span>
            </li>
          ))}
        </div>
      </>
    );
  }
);

export const getStaticProps: GetStaticProps = async (query) => {
  const pageNumber = 0;
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber}&limit=20`
  );
  const rawdata = response.data;
  const data = response.data.results;

  const pokemons = await Promise.all(
    data.map(async (result: any, index: number) => {
      const paddedIndex = index + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${paddedIndex}/`
      );
      const pokeid = response.data;
      const image = pokeid.sprites.front_default;

      return {
        ...result,
        image,
      };
    })
  );

  return {
    props: {
      pokemons,
      rawdata,
    },
  };
};
export default HomePage;
