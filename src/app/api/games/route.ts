import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const igdbResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields name,
       cover.url;
       where rating_count > 1200; limit 100;`,
      {
        headers: {
          "Client-ID": process.env.NEXT_PUBLIC_CLIENT_ID,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTHORIZATION}`,
        },
      }
    );

    return NextResponse.json(igdbResponse.data);
  } catch (error) {
    console.error("Error fetching data from IGDB API:", error);
    return NextResponse.json(
      { error: "Error fetching data from IGDB API" },
      { status: 500 }
    );
  }
}
