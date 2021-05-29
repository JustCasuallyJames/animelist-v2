module.exports = {
	'cssProperty: (cssProperty: display, Expected: inline-block)' (browser){
		browser.url("http://localhost:3001")
			.verify.cssProperty(".fade-in-text", "display", "inline-block");
	},

}