require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./movies.json')
const app = express();
const cors = require('cors')
const helmet = require('helmet')

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// app.use ((req, res, next)=>{
//     const apiToken = process.env.API_TOKEN
//     const authToken = req.get('Authorization')

//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     return res.status(401).json({ error: 'Unauthorized request' })
//   }
//   // move to the next middleware
//   next()
// });

app.get('/movie', (req, res) => {
    const { genre, country, avg_vote } = req.query;
    return res
        .status(200)
        .json(MOVIES)

  
    // filter by name if name query param is present
    for(let i=0; i < MOVIES.length; i++){
        let response = MOVIES[i].genre
        if (req.query.genre) {
            let genres =
                response.filter(movie =>
                // case insensitive searching
                MOVIES[i]
                    .genre
                    .toLowerCase()
                    .includes(req.query.genre.toLowerCase())
            )
            }
    }
  
    // filter our MOVIES by genre if type query param is present
//     if (req.query.genre) {
//       response = response.filter(genre =>
//         pokemon.type.includes(req.query.genre)
//       )
//     }
  
    res.json(response)
  });
  
  const PORT = 8000
  
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
  })