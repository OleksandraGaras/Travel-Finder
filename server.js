const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let favorites = [
    { id: 1, country: "Spain", region: "Catalunya", capital: "Barcelona", population: 5500000 },
    { id: 2, country: "France", region: "Île-de-France", capital: "Paris", population: 2200000 }
];

app.use(express.static("public"));          

app.get("/favorites", (req, res) => {
    res.json(favorites);
});

app.post("/favorites", (req, res) => {

    if (!req.body || !req.body.country) {
        return res.status(400).json({ message: "Country is required" });
    }

    const exists = favorites.some(f => f.country.toLowerCase() === req.body.country.toLowerCase());

    if (exists) {
        return res.status(400).json({ message: "Aquesta destinació ja esta a favorits" });
    }

    const newFavorite = {
        id: Date.now(),
        country: req.body.country
    };

    favorites.push(newFavorite);

    res.status(201).json(newFavorite);
});

app.delete("/favorites/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const favorite = favorites.find(f => f.id === id);


    favorites = favorites.filter(f => f.id !== id);

    res.json({ message: "Destinació eliminada" });
});

app.listen(PORT, () => {
    console.log(`API executant-se a http://localhost:${PORT}`);
});