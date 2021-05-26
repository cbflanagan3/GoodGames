const gameRouter = require('express').Router();
// import igdb from 'idgb-api-node';
// const client = igdb('130d015e5a9bdf6428cbb1de58b9c4fa');
const axios = require('axios');
// const cors = require(cors());
// require('dotenv').config();

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? (page - 1) * limit : 0;
    return {
      limit,
      offset,
    };
  };

gameRouter.get('/?', async (req, res, next) => {
    const {filter, page, size} = req.query;
    const games = await axios.get('https://api-v3.igdb.com/games?fields=*&limit=20', {headers: {"user-key": '130d015e5a9bdf6428cbb1de58b9c4fa', Accept: "application/json"}});
    res.send(games.data);
  })

gameRouter.get('/genre', async (req, res, next) => {
    const games = await axios({  url: "https://api-v3.igdb.com/genres",
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'user-key': '130d015e5a9bdf6428cbb1de58b9c4fa'
    },
    data: "fields checksum,created_at,name,slug,updated_at,url;"
  })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);})
})
  
gameRouter.post("/", function (req, res) {
    // search term
    let {game} = req.body;

    // sends a request to igdb api for game search
    axios.get(`https://api-endpoint.igdb.com/games/?search=${game}&fields=*`, {headers: {"user-key": '130d015e5a9bdf6428cbb1de58b9c4fa', Accept: "application/json"}})
    .then(response => {

        // clean up the response.data array
        let games = response.data.map(curGame => {
            let {rating, cover, first_release_date, id, name, summary, url, videos, websites} = curGame;

            // if cover is not given then change to undefined
            if(typeof cover === "undefined" || typeof cover === undefined ) cover = 'undefined';
            // if cover is given then replace it from a thumbnail to a high quality image
            else cover = cover.url.replace(/thumb/g, "logo_med_2x");

            // if release date is given then convert from seconds to "Month Day Year" format
            if(first_release_date  !== "undefined" && first_release_date  !== undefined) {
                first_release_date = new Date(first_release_date * 1000);
                first_release_date = String(first_release_date);
                first_release_date = first_release_date.split(" ", 3);
            }

            // converted rating from being x/100 to x/5
            rating = Math.round((rating / 10)/2) - 1;

            // return game with updated data
            let updatedGame = {rating, cover, first_release_date, id, name, summary, url, videos, websites}
            return (updatedGame)
        })

        // games array sent to client
        res.json(games)
    })
    .catch(e => {
        // if error occurs then sample data will be given to user
        let games = games.map(curGame => {
            let {rating, cover, first_release_date, id, name, summary, url, videos, websites} = curGame;
            let updatedGame = {rating, cover, first_release_date, id, name, summary, url, videos, websites}
            return (updatedGame)
        })

        // games array sent to client
        res.json(games)
        console.log("error", e);
    });
    
});

module.exports = gameRouter;