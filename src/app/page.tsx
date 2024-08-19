"use client";
import { Stack, Autocomplete, TextField, useMediaQuery } from "@mui/material";
import ImageFrame from "./components/ImageFrame";
import ButtonGroup from "./components/ButtonGroup";
import games from "./games.json";

export default function Home() {
  const gameOptions = games.map((game) => game.name);
  const isLargeScreen = useMediaQuery("(min-width:600px)");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Stack spacing={2}>
        <p>Placeholder for logo/heading?</p>
        <ImageFrame url="https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg" />
        <Autocomplete
          id="game-autocomplete"
          freeSolo
          options={gameOptions}
          renderInput={(params) => <TextField {...params} />}
        />
        <ButtonGroup isLargeScreen={isLargeScreen} />
      </Stack>
    </main>
  );
}
