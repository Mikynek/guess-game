"use client";
import {
  Stack,
  Autocomplete,
  TextField,
  Alert,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { transformCoverUrl } from "./utils/utils";
import { Game } from "./types/types";
import Heading from "./components/Heading";
import ImageFrame from "./components/ImageFrame";
import ControlPanel from "./components/ControlPanel";
import HistoryPanel from "./components/HistoryPanel";

const DEFAULT_IMAGE_BLUR = 32;
const BLUR_DECREMENT = 4;

export default function Home() {
  const [gameOptions, setGameOptions] = useState<Game[]>([]);
  const [randomGame, setRandomGame] = useState<Game | undefined>(undefined);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [amountOfBlur, setAmountOfBlur] = useState<number>(DEFAULT_IMAGE_BLUR);
  const [guessHistory, setGuessHistory] = useState<React.ReactNode[]>([]);
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
      setGuessHistory((prevHistory) => [
        <Divider/>,
        <Alert severity="success" key={prevHistory.length}>
          Correct! The game was {randomGame.name}.
        </Alert>,
        ...prevHistory,
      ]);
    } else {
      const guessGameIndex = gameOptions.findIndex(
        (game) => game.name === selectedGame
      );

      if (guessGameIndex !== -1) {
        gameOptions.splice(guessGameIndex, 1); // Remove incorrectly guessed game
      }

      setAmountOfBlur((prev) => Math.max(prev - BLUR_DECREMENT, 0));
      setGuessHistory((prevHistory) => [
        <Alert severity="error" key={prevHistory.length}>
          Incorrect! You guessed {selectedGame}.
        </Alert>,
        ...prevHistory,
      ]);
    }
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
        <HistoryPanel>{guessHistory}</HistoryPanel>
      </Stack>
    </main>
  );
}
