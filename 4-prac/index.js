const express = require('express');

const app = express();
app.use(express.json());
app.use(cors);

const movies = [];

let nextMovieId = 1;

app.get('/v1/movies', (req, res) => {
  const { keyword, limit = 10, page = 1, sort } = req.query;
  // 浅拷贝，深拷贝
  let moviesCopy = [...movies];

  if (keyword) {
    moviesCopy = moviesCopy.filter(
      (movie) =>
        movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (sort === 'rating') {
    moviesCopy.sort((a, b) => a.averageRating - b.averageRating);
  } else if (sort === '-rating') {
    moviesCopy.sort((a, b) => b.averageRating - a.averageRating);
  }

  // const currentPage = parseInt(page) || 1
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const returnedMovies = moviesCopy.slice(startIndex, endIndex);

  res.json(returnedMovies);
});

app.get('/v1/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === +id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
    return;
  }
  res.json(movie);
});

app.post('/v1/movies', (req, res) => {
  const { title, description, types } = req.body;
  if (!title || !description || !Array.isArray(types) || types.length === 0) {
    res.status(400).json({
      message: 'Some fields are invalid',
    });
    return;
  }
  const newMovie = {
    id: nextMovieId++,
    title,
    description,
    types,
    averageRating: 0,
    reviews: [],
  };
  movies.unshift(newMovie);
  res.status(201).json(newMovie);
});

app.put('/v1/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === +id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
    return;
  }
  const { title, description, types } = req.body;
  if (title) {
    movie.title = title;
  }
  if (description) {
    movie.description = description;
  }
  if (types) {
    if (!Array.isArray(types) || types.length === 0) {
      res.status(400).json({
        message: 'types must be an array',
      });
      return;
    }
    movie.types = types;
  }
  res.json(movie);
});

app.delete('/v1/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex((movie) => movie.id === +req.params.id);
  if (movieIndex === -1) {
    res.status(404).json({ message: 'Movie not found' });
    return;
  }
  movies.splice(movieIndex, 1);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
}
