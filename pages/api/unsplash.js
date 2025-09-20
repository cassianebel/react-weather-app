export default async function handler(req, res) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return res.status(500).json({ error: "Unsplash access key not set" });
  }

  try {
    // Get orientation from query params, default to 'landscape'
    const { orientation = "landscape" } = req.query;
    const response = await fetch(
      `https://api.unsplash.com/photos/random?collections=CSiArET2uEg&orientation=${orientation}`,
      {
        headers: { Authorization: `Client-ID ${accessKey}` },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Unsplash API error" });
    }

    const data = await response.json();
    res.status(200).json({ data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
