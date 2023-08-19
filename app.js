import express from "express";
import {
  getQuotes,
  getRandomQuote,
  getQuote,
  createQuote,
} from "./database.js";
import cors from "cors";
const app = express();
const PORT = 8080;
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  throw new Error("BROKEN"); // Express will catch this on its own.
});

app.listen(PORT, () => {
  console.log(`Alive on http://localhost:${PORT}`);
});

app.get("/quotes", async (req, res) => {
  const notes = await getQuotes();
  res.status(200).send(notes);
});
app.get("/quotes/rand", async (req, res) => {
  const notes = await getRandomQuote();
  res.status(200).send(notes);
});
app.get("/quotes/:id", async (req, res) => {
  const notes = await getQuote(req.params.id);
  res.status(200).send(notes);
});
app.post("/quotes", async (req, res) => {
  const { text, author } = req.body;
  const notes = await createQuote(text, author);
  res.status(201).send(notes);
});
