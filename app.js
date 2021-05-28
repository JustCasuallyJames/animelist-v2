const express = require('express');
const fetch = require('node-fetch');
const port = 3000;
const anime_url = "https://api.jikan.moe/v3";

//express app
const app = express();

//register view engine (ejs)
app.set('views', './views');
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'))
app.use('/styles', express.static(__dirname + 'public/styles'))

//listens for requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/', async (req, res) => {
	const topAnimes = await fetch(`${anime_url}/top/anime/1/tv`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas

	console.log("Running the default /");
	res.render('index', {topAnimes})
});

app.get('/about', async (req, res) => {
	const topMangas = await fetch(`${anime_url}/top/manga/1/manga`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas

	res.render('about', {topMangas})
	// res.send('<p>About Page</p>')
});

//obtains the top results data for the anime
app.get("/anime/:anime/:page", async (req, res) => {
	const query = req.params.anime;
	const animeResults = await fetch(`${anime_url}/search/anime?q=${query}&order_by=title&sort=asc`)
		.then(res => res.json())
		.then(data => data.results) //not top because the array is called results

	console.log(animeResults)
	res.render('animePage', {animeResults})
})


