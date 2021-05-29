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
	const page = parseInt(req.params.page);
	const topMangas = await fetch(`${anime_url}/top/manga/${page}/manga`)
		.then(res => res.json())
		.then(data => data.top) //This is grabs the first ten datas

	console.log(topMangas);
	res.render('topManga', {topMangas: topMangas, page: page})
});

//obtains the top results data for the anime
app.get("/anime/:anime/:page", async (req, res) => {
	try{
		const query = req.params.anime;
		const page = req.params.page;
		let animeResults = await fetch(`${anime_url}/search/anime?q=${query}&order_by=title&sort=asc`)
			.then(res => res.json())
			.then(data => data.results) //not top because the array is called results
		if(page < (animeResults.length/10)){ //if the page number is less than the number of entries divided by 10
			animeResults = animeResults.slice((page-1)*10 , page*10); //this gets only 10 of the anime, 0-10 10-20 based on that algorithm
		}else{
			//throw an error if the page is greater
		}
		// console.log(animeResults)
		res.render('animePage', {animeResults})
	}catch(e){
		// console.log("Inside the /anime/:anime/:page");
		console.log(e);
	}

})

//listens for requests
app.listen(port, () => console.log(`Anime app listening on port ${port}!`));

