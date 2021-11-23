import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  SinglePokemon,
  FetchAllPokemonResponse,
  PokemonTypes,
} from "../interfaces/PokemonTypes";
import Squirtle from "../components/Squirtle";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

interface Props {
  user: { name: string };
  pokemons: PokemonTypes;
  rawdata: FetchAllPokemonResponse;
  notFound: boolean;
}

const HomePage: React.FC<Props> = withPageAuthRequired(
  ({ user, pokemons, rawdata, notFound }: Props) => {
    if (notFound) {
      return <p>Loading...</p>;
    } else {
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
          <Layout title="Home | Next.js">
            <div className="bg-black">
              <div className="flex flex-col items-center text-center justify-center mb-10">
                <motion.div
                  initial={{
                    boxShadow: "0px 0px 40px #ffd900 ",
                  }}
                  className="w-full flex-col md:flex-col text-2xl md:text-3xl text-center items-center justify-center p-10 bg-yellow-300 rounded-full"
                >
                  <Link href="/pokemon/7" passHref>
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="items-center justify-center"
                    >
                      <Squirtle />
                    </motion.a>
                  </Link>
                  <h1 className="text-3xl m-5 font-mono">Welcome!!</h1>
                  <br></br>
                  <div className="mt-10">
                    <span className="cursor-pointer capitalize bg-red-500 border-2 border-transparent hover:bg-yellow-300 hover:border-red-600 text-white hover:text-black p-5 rounded-full duration-300">
                      {" "}
                      {user.name}{" "}
                    </span>
                  </div>
                </motion.div>
                {/* <div className="flex flex-col md:p-10 items-center justify-center text-center transform hover:scale-150 bg-blue-400 hover:bg-transparent hover:border-blue-400 border-2 border-transparent rounded-lg text-black hover:text-blue-400 h-24 w-full md:w-1/3 duration-300">
                <h2 className="text-sm m-10 text-center font-bold font-mono">
                  Now that you are logged in, you can see all the pokemons! ;)
                </h2>
              </div> */}
              </div>
              <div className="bg-black h-full">
                <div className="text-center justify-center md:relative h-full py-16">
                  <div className="px-14 py-6 md:absolute right-0 z-10">
                    <button className="bg-red-600 hover:bg-yellow-300 duration-300 p-6 text-white hover:text-black rounded-full right-5 transform hover:scale-150 cursor-pointer">
                      Next
                    </button>
                  </div>
                  <div className="px-14 py-6 md:absolute left-0 z-10">
                    <button className="bg-red-600 hover:bg-yellow-300 duration-300 p-6 text-white hover:text-black rounded-full left-5 transform hover:scale-150 cursor-pointer">
                      Previous
                    </button>
                  </div>
                  <form>
                    <h2 className="font-mono focus-within:text-transparent">
                      SEARCH YOUR POKEMON!
                    </h2>
                    <div className="relative mr-6 my-2">
                      <input
                        type="text"
                        placeholder="Search your Pokemon!"
                        onChange={handleChange}
                        className="border-6 border-red-600 p-4 transform duration-300 ease-in-out focus:ring-8 focus:rounded-full"
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/*Displaying Pokemon Info */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-black">
                {filteredPokemons.map(
                  (pokemon: PokemonTypes, index: number) => (
                    <motion.li
                      initial={{ x: "-250vw" }}
                      animate={{ x: 0 }}
                      key={index}
                      className="text-center items-center list-none m-4 p-3"
                    >
                      {{ pokemon } ? (
                        <motion.span
                          initial={{
                            boxShadow: "0px 0px 40px #ff0000 ",
                          }}
                          whileHover={{
                            scale: 1.1,
                          }}
                          className="w-full bg-red-600 hover:bg-yellow-300 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row text-black hover:text-red-600 group"
                        >
                          <Link href={`/pokemon/${index + 1}`} passHref>
                            <a className="flex flex-col p-5 items-center justify-center text-center group">
                              <span className="capitalize text-xl font-bold font-mono">
                                {pokemon.name}
                              </span>
                              <br></br>
                              <div className="transform hover:scale-150 duration-300 cursor-pointer">
                                {!pokemon.image ? (
                                  "Loading . . ."
                                ) : (
                                  <Image
                                    src={pokemon.image}
                                    height={100}
                                    width={100}
                                    alt={pokemon.name}
                                  />
                                )}
                              </div>
                            </a>
                          </Link>
                        </motion.span>
                      ) : (
                        "loading . . ."
                      )}
                    </motion.li>
                  )
                )}
              </div>
            </div>
          </Layout>
        </>
      );
    }
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
      //Index 0 doesn't exist, so we add a 1
      const paddedIndex = index + 1;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${paddedIndex}/`
      );
      const pokeid = response.data;
      //Location of the image
      const image = pokeid.sprites.front_default;

      return {
        ...result,
        image,
      };
    })
  );

  if (!pokemons) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        pokemons,
        rawdata,
      },
    };
  }
};
export default HomePage;
