"use client";
import { Stack, Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import Heading from "./components/Heading";
import ImageFrame from "./components/ImageFrame";
import ControlPanel from "./components/ControlPanel";
import games from "./games.json";

const DEFAULT_IMAGE_BLUR = 32;
const BLUR_DECREMENT = 4;

type Game = {
  id: number;
  name: string;
  cover: number;
};

export default function Home() {
  const gameOptions: Game[] = games;
  const [randomGame, setRandomGame] = useState<Game | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [amountOfBlur, setAmountOfBlur] = useState<number>(DEFAULT_IMAGE_BLUR);
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const chooseRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * gameOptions.length);
    setRandomGame(gameOptions[randomIndex]);
  };

  // Choose a random game when the component mounts
  useEffect(() => {
    chooseRandomGame();
  }, [gameOptions]);

  const checkIfGuessMatches = () => {
    if (!selectedGame) {
      alert("Please select a game from the list.");
      return;
    }

    if (randomGame?.name === selectedGame) {
      setAmountOfBlur(DEFAULT_IMAGE_BLUR);
      chooseRandomGame();
      alert("Correct!");
    } else {
      const guessGameIndex = gameOptions.findIndex(
        (game) => game.name === selectedGame
      );

      if (guessGameIndex !== -1) {
        gameOptions.splice(guessGameIndex, 1); // Remove incorrectly guessed game
      }

      setAmountOfBlur((prev) => Math.max(prev - BLUR_DECREMENT, 0));
      alert("Incorrect! Try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={2}>
        <Heading />
        <ImageFrame
          url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg"
          amountOfBlur={amountOfBlur}
        />
        <Autocomplete
          id="game-autocomplete"
          freeSolo
          options={gameOptions.map((game) => game.name)}
          onChange={(event, value) => setSelectedGame(value)} // Get the selected option
          renderInput={(params) => <TextField {...params} />}
        />
        <ControlPanel
          isLargeScreen={isLargeScreen}
          onSubmit={checkIfGuessMatches}
        />
        <p>{randomGame?.name}</p>
      </Stack>
    </main>
  );
}
