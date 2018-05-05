const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mdb = require('moviedb')(require('./config').MOVIE_API_KEY);

app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/nowplaying', (req, res, next) => {
   mdb.miscNowPlayingMovies({}, (err, mres) => {
       res.send(mres);
   });
});

app.listen(process.env.PORT || 3000);