import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";

interface Props {
  pokemon: any;
}

const Pokemon: React.FC<Props> = withPageAuthRequired((pokemon: any) => {
  const pokemondescription = pokemon.pokemon.moves;
  const pokemonEvolution = pokemon.pokemandesc.chain.evolves_to;
  const pokemonName = pokemon.pokemon.name;
  const str2 = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

  return (
    <>
      <Layout title={`${str2} | Next Js`}>
        <div className="w-3/3 flex flex-col lg:flex-row items-center content-center justify-center bg-yellow-300">
          {/*Moves */}
          <div className="flex flex-col items-center justify-center w-3/3 lg:w-1/3 h-1/3 bg-red-600 rounded-lg">
            <h2 className="text-3xl p-10 text-white">Moves</h2>
            <br></br>
            <div className="text-center flex flex-wrap">
              {/*this time the index value here it should be the value for the next page*/}

              {pokemondescription
                .slice(0, 12)
                .map(
                  (
                    pokemondescription: { move: { name: string } },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="justify-center text-center items-center list-none m-1 p-3"
                    >
                      <span className="transform hover:scale-150 duration-300 cursor-pointer w-full capitalize  p-4 bg-white hover:bg-yellow-300 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        {pokemondescription.move.name}
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
          {/*The pokemon Itself */}
          <div className="flex flex-col items-center justify-center w-3/3 lg:w-1/3 h-3/3 rounded-lg">
            <h2 className="text-3xl p-10 text-black  font-mono">
              Who is that pokemon?
            </h2>
            <div className="transform animate-spin bg-red-600 items-center justify-center rounded-full p-12 h-100 w-100">
              <h2 className="mt-4 text-center text-2xl text-white capitalize font-mono">
                {pokemon.pokemon.name}
              </h2>
              <div className="flex items-center justify-center transform hover:scale-150 duration-300 cursor-pointer">
                <Image
                  src={pokemon.pokemon.sprites.front_default}
                  height={100}
                  width={100}
                  className="items-center justify-center"
                  alt={pokemon.pokemon.name}
                />
              </div>
              <div className="justify-between p-10">
                <Link href="/homepage">
                  <a className="p-4 m-4 bg-yellow-300 rounded-full hover:bg-transparent hover:text-white duration-300 border border-transparent  hover:border-white">
                    Back To Home{" "}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          {/*Evolution */}
          <div className="flex flex-col items-center justify-center w-3/3 lg:w-1/3 h-1/3 bg-red-600 rounded-lg">
            <h2 className="text-3xl p-10 text-white">Evolutions</h2>
            <br></br>
            <div className="text-center flex flex-wrap">
              {pokemonEvolution
                .slice(0, 1)
                .map((pokemonEvolution: any, index: any) => (
                  <div
                    key={index}
                    className="justify-center text-center items-center list-none m-1 p-3"
                  >
                    <Link
                      href={`/pokemon/${
                        pokemonEvolution.species.url.split("/")[6]
                      }`}
                    >
                      <a className="transform hover:scale-150 duration-300 cursor-pointer w-full capitalize  p-4 bg-white hover:bg-yellow-300 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                        {pokemonEvolution.species.name}
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
            <Link href={""}>
              <a className="p-4 m-4 bg-yellow-300 rounded-full hover:bg-transparent hover:text-white duration-300 border border-transparent  hover:border-white">
                Evolutions
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
});

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const resdesc = await axios.get(
    `https://pokeapi.co/api/v2/evolution-chain/${id}/`
  );

  const pokemandesc = resdesc.data;
  let pokemanevolve = resdesc.data.chain.evolves_to;
  // To add evolution image also
  // const pokemons = await Promise.all(
  //   pokemanevolve.map(async (array: any, index: number) => {
  //     const pokename = pokemanevolve.index.species.name;
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${pokename}/`
  //     );
  //     const pokeid = response.data;
  //     const image = pokeid.sprites.front_default;

  //     return {
  //       ...array,
  //       image,
  //     };
  //   })
  // );
  const pokeman = res.data;

  return {
    props: { pokemon: pokeman, pokemandesc, pokemanevolve },
  };
};

export default Pokemon;
