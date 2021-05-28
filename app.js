const express = require('express');
const fetch = require('node-fetch');
const anime_url = "https://api.jikan.moe/v3";

//express app
const app = express();

//register view engine (ejs)
app.set('view engine', 'ejs');

//listens for requests
app.listen(3000);

app.get('/', async (req, res) => {
	const topAnimes = await fetch(`${anime_url}/top/anime/1/tv`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas

	res.render('index', {topAnimes})
});

app.get('/about', async (req, res) => {
	const topMangas = await fetch(`${anime_url}/top/anime/1/tv`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas
	res.send('<p>About Page</p>')
});

//obtains the top results data for the anime
app.get("/:anime/:page", async (req, res) => {
	const query = req.params.anime;
	const animeResults = await fetch(`${anime_url}/search/anime?q=${query}&order_by=title&sort=asc`)
		.then(res => res.json())
		.then(data => data.top) //grabs all the data from the results

	res.render('animePage', {animeResults})
})
