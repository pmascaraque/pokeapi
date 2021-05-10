import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [pokeData, setPokeData] = useState(null);
  const [pokeNum, setPokeNum] = useState(1);
  const [pokeDesc, setPokeDesc] = useState(null);

  const getPokemon = async (num) => {
    const request = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
    const json = await request.json();
    setPokeData(json);
  };

  const getPokeDesc = async (num) => {
    const request = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + num
    );
    const json = await request.json();
    setPokeDesc(json);
  };

  let currentNum = pokeNum;
  console.log(Math.round());
  return (
    <div>
      <img src={pokeData && pokeData.sprites.front_default} alt="" />
      <h1>{pokeData && pokeData.name.toUpperCase()}</h1>
      <p>
        {pokeDesc &&
          pokeDesc.flavor_text_entries[0].flavor_text.replace("\f", " ")}
      </p>
      {currentNum > 1 && (
        <button
          onClick={() => {
            currentNum--;
            setPokeNum(currentNum);
            getPokemon(currentNum);
            getPokeDesc(currentNum);
          }}
        >
          Previous
        </button>
      )}
      <button
        onClick={() => {
          currentNum++;
          setPokeNum(currentNum);
          getPokemon(currentNum);
          getPokeDesc(currentNum);
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          currentNum = Math.round(Math.random() * 898);
          setPokeNum(currentNum);
          getPokemon(currentNum);
          getPokeDesc(currentNum);
        }}
      >
        Random
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
