// /app/api/unsplash.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return res.status(500).json({ error: "Unsplash access key not set" });
  }

  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random?collections=CSiArET2uEg",
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Unsplash API error" });
    }

    const data = await response.json();
    res.status(200).json({ url: data.urls.full });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
