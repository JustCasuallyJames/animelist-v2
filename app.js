const express = require('express');
const fetch = require('node-fetch');
const path = require('path')
const port = 3000;
const anime_url = "https://api.jikan.moe/v3";

//express app
const app = express();

//static files
app.use(express.static('public'))
app.use('/styles', express.static(path.join(__dirname, 'public')))
// console.log(__dirname + '/public')

//register view engine (ejs)
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
	const topAnimes = await fetch(`${anime_url}/top/anime/1/tv`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas

	res.render('index', {topAnimes})
});

app.get('/topmangas', async (req, res) => {
	const topMangas = await fetch(`${anime_url}/top/manga/1/manga`)
		.then(res => res.json())
		.then(data => data.top.slice(0,10)) //This is grabs the first ten datas

	res.render('about', {topMangas})
	// res.send('<p>About Page</p>')
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
		console.log(e);
	}

})

//listens for requests
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

