module.exports = {
	'Finding AnimeDatabase Name' (browser){
		browser.url("http://localhost:3001")
			.waitForElementVisible(".full-title")
			.verify.containsText(".full-title", "AnimeDatabase");
	},

	'Finding Full Metal Alchemist Brotherhood Name' (browser){
		browser.url("http://localhost:3001/anime/Full Metal Alchemist: Brotherhood/1")
			.waitForElementVisible(".anime-card-title", time=10000)
			.verify.containsText(".anime-card-title", "Fullmetal Alchemist: Brotherhood")
	},

	'Finding Vagabond Manga Name' (browser){
		browser.url("http://localhost:3001/topmangas/1")
			.waitForElementVisible("#anime-card-title-1706", time=10000)
			.verify.containsText("#anime-card-title-1706", "JoJo no Kimyou na Bouken Part 7: Steel Ball Run")
	},

	'Finding Jujutsu Kaisen TV Name' (browser){
		browser.url("http://localhost:3001/topanimes/1")
			.waitForElementVisible("#anime-card-title-40748", time=10000)
			.verify.containsText("#anime-card-title-40748", "Jujutsu Kaisen (TV)")
	}
}