import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

let api = express.Router();
let shots = [];

const initApi = async (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);
  app.use(express.static("public"));
};

api.use(bodyParser.json());
api.use(cors());

api.get("/shots", (req, res) => {
  res.json(shots);
});

api.post("/shots", (req, res) => {
  const { bean, input, output, time, notes } = req.body;
  
  const ratio = output / input;
  let column = "ok";
  if (ratio >= 1.8 && ratio <= 2.2 && time >= 25 && time <= 35) column = "good";
  else if (ratio < 1.5 || ratio > 2.5 || time < 20 || time > 40) column = "bad";

  const newShot = {
    id: Date.now().toString(),
    bean,
    input,
    output,
    time,
    notes: notes || '',
    ratio: parseFloat((output / input).toFixed(1)),
    column,
    createdAt: new Date().toISOString()
  };

  shots.push(newShot);
  res.status(201).json(newShot);
});

api.patch("/shots/:id", (req, res) => {
  const { column, notes } = req.body;
  const shot = shots.find(s => s.id === req.params.id);
  
  if (!shot) return res.status(404).json({ error: "Shot not found" });
  
  if (column) shot.column = column;
  if (notes !== undefined) shot.notes = notes;
  
  res.json(shot);
});

api.delete("/shots/:id", (req, res) => {
  const index = shots.findIndex(s => s.id === req.params.id);
  
  if (index === -1) return res.status(404).json({ error: "Shot not found" });
  
  shots.splice(index, 1);
  res.status(204).end();
});

api.all("/*", (req, res) => {
  res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.url}` });
});

export default initApi;