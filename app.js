const express = require('express');
const fetch = require('node-fetch');
const path = require('path')
const port = 3001;
const anime_url = "https://api.jikan.moe/v3";
// const anime_url = "https://private-anon-a0bcd03475-jikan.apiary-proxy.com/v3";

//express app
const app = express();

//static files
app.use(express.static('public'))
app.use('/styles', express.static(path.join(__dirname, 'public')))
// console.log(__dirname + '/public')

//register view engine (ejs)
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req,res) =>{
	try{
		res.render('homepage');
	}catch (e) {
		console.log(e);
	}
})

app.get('/topanimes/:page', async (req, res) => {
	try{
		const page = parseInt(req.params.page);
		const topAnimes = await fetch(`${anime_url}/top/anime/${page}/tv`)
			.then(res => res.json())
			.then(data => data.top) //this grabs 10 animes

		res.render('topAnime', {topAnimes: topAnimes, page: page})
		// console.log("Successful in the /")
	}catch(e){
		// console.log("Inside the /");
		console.log(e);
	}

});

app.get('/topmangas/:page', async (req, res) => {
	try{
		const page = parseInt(req.params.page);
		const topMangas = await fetch(`${anime_url}/top/manga/${page}/manga`)
			.then(res => res.json())
			.then(data => data.top) //this grabs all the data

		res.render('topManga', {topMangas: topMangas, page: page})
	}catch (e) {
		console.log(e);
	}

});

app.get('/topupcominganime/:page', async (req, res) => {
	try{
		const page = parseInt(req.params.page);
		const topUpcomingAnime = await fetch(`${anime_url}/top/anime/${page}/upcoming`)
			.then(res => res.json())
			.then(data => data.top) //This grabs all the data

		res.render('topUpcomingAnime', {topUpcomingAnime: topUpcomingAnime, page: page})
	}catch (e) {
		console.log(e);
	}

});

//obtains the top results data for the anime
app.get("/anime/:anime/:page", async (req, res) => {
	try{
		const query = req.params.anime;
		const page = parseInt(req.params.page);
		let animeResults = await fetch(`${anime_url}/search/anime?q=${query}&order_by=title&sort=asc&page=${page}`)
			.then(res => res.json())
			.then(data => data.results) //not top because the array is called results

		res.render('searchAnime', {animeResults: animeResults, page: page, search: query})
	}catch(e){
		// console.log("Inside the /anime/:anime/:page");
		console.log(e);
	}

})

//listens for requests
app.listen(port, () => console.log(`Anime app listening on port ${port}!`));

