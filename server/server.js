const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mdb = require('moviedb')(process.env.MOVIE_API_KEY || require('./config').MOVIE_API_KEY);

app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/nowplaying', (req, res, next) => {
   mdb.miscNowPlayingMovies({}, (err, mres) => {
       err ? res.status(429).send(err) : res.send(mres);
   });
});

app.get('/videoid/:id', (req, res, next) => {
    mdb.movieVideos({id: req.params.id}, (err, mres) => {
        err ? res.status(429).send(err) : res.send(mres.results[0].key);
    });
});

app.listen(process.env.PORT || 3000);