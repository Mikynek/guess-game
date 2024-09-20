"use client";
import { Stack, Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./components/Heading";
import ImageFrame from "./components/ImageFrame";
import ControlPanel from "./components/ControlPanel";

const DEFAULT_IMAGE_BLUR = 32;
const BLUR_DECREMENT = 4;

type Game = {
  id: number;
  name: string;
  cover: string;
};

export default function Home() {
  const [gameOptions, setGameOptions] = useState<Game[]>([]);
  const [randomGame, setRandomGame] = useState<Game | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [amountOfBlur, setAmountOfBlur] = useState<number>(DEFAULT_IMAGE_BLUR);
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    if (gameOptions.length > 0) {
      chooseRandomGame();
    }
  }, [gameOptions]);

  const fetchGames = async () => {
    try {
      const response = await axios.get("/api/games"); // Call your own API route
      const fetchedGames = response.data.map((game: any) => ({
        id: game.id,
        name: game.name,
        cover: game.cover ? game.cover.url : "",
      }));
      setGameOptions(fetchedGames);
    } catch (error) {
      console.error("Error fetching games from IGDB API:", error);
    }
  };

  const chooseRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * gameOptions.length);
    setRandomGame(gameOptions[randomIndex]);
  };

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

  const transformCoverUrl = (url: string) => {
    const httpsUrl = url.startsWith("//")
      ? `https:${url}`
      : url.replace(/^http:/, "https:");
    return httpsUrl.replace("t_thumb", "t_cover_big");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={2}>
        <Heading />
        <ImageFrame
          url={transformCoverUrl(randomGame?.cover ?? "")}
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
      </Stack>
    </main>
  );
}
