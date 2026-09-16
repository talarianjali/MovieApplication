const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/movieDB")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    actor: {
        type: String,
        required: true
    },
    actress: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});


// Movie Model
const Movie = mongoose.model("Movie", movieSchema);


// GET ALL MOVIES
app.get("/movies", async (req, res) => {

    try {

        const movies = await Movie.find();

        res.json(movies);

    } catch (error) {

        res.status(500).json({
            message: "Error getting movies"
        });

    }

});


// ADD MOVIE
app.post("/movies", async (req, res) => {

    try {

        const movie = new Movie(req.body);

        await movie.save();

        res.json(movie);

    } catch (error) {

        res.status(500).json({
            message: "Error adding movie"
        });

    }

});


// GET ONE MOVIE
app.get("/movies/:id", async (req, res) => {

    try {

        const movie = await Movie.findById(req.params.id);

        res.json(movie);

    } catch (error) {

        res.status(500).json({
            message: "Error getting movie"
        });

    }

});


// UPDATE MOVIE
app.put("/movies/:id", async (req, res) => {

    try {

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.json(movie);

    } catch (error) {

        res.status(500).json({
            message: "Error updating movie"
        });

    }

});


// DELETE MOVIE
app.delete("/movies/:id", async (req, res) => {

    try {

        await Movie.findByIdAndDelete(req.params.id);

        res.json({
            message: "Movie deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting movie"
        });

    }

});


// START SERVER
app.listen(8080, () => {

    console.log("Server running at http://localhost:8080");

});