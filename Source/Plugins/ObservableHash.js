/*
Script: ObservableHash.js
	A Hash, but observable!

License:
	MIT-style license.

Copyright:
	Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/
var ObservableHash = new Class({
	
	Implements: [Options, Events],
	
	options: {
		
	},
	
	initialize: function(options){
		this.setOptions(options);
		
		$$('p').setStyle('background','blue');
		
		this.fireEvent("initialize");
	}
	
});
