module.exports = {
	'Attribute Contains: (Attribute: href, Expected: /topanimes/1)' (browser){
		browser.url("http://localhost:3001/topanimes/1")
			.verify.attributeContains(".nav-elements","href", "/topanimes/1");
	},

	'Attribute Contains: (Attribute: autocomplete, Expected: off)' (browser){
		browser.url("http://localhost:3001")
			.verify.attributeContains("#searchBar","autocomplete", "off");
	},
}