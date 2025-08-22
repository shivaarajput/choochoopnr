export default async function handler(req, res) {
  const { pnrNumber } = req.query;
  const API_URL = process.env.API_URL; // set in Vercel Environment Variables

  try {
    const response = await fetch(`${API_URL}/${pnrNumber}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proPlanName: "CP10" })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API request failed" });
    }

    const data = await response.json();

    if (data.error || data.data?.pnrResponse?.error) {
      return res.status(400).json({
        error: data.error?.message || data.data?.pnrResponse?.error?.message
      });
    }

    return res.status(200).json(data.data.pnrResponse);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
