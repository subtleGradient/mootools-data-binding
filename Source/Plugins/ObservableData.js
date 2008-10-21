/*
Script: ObservableData.js
	A bunch of methods that you can implement on your own classes that provide a standard interface to Observable classes.

License:
	MIT-style license.

Copyright:
	Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/


var ObservableData = {
	
	set: function(key,value){
		if(this.get(key) == value)
			return this;
		
		this.fireEvent('set:'+key, [value, key])
			.fireEvent('set', [value, key]);
		
		if(this.has && !this.has(key)) this
			.fireEvent('add:'+key, [value, key])
			.fireEvent('add', [value, key]);
		
		return this.parent(key,value);
	},
	
	get: function(key){
		this.fireEvent('get:'+key, key)
			.fireEvent('get', key);
		return this.parent(key);
	},
	
	erase: function(key){
		this.fireEvent('erase:'+key, key)
			.fireEvent('erase', key);
		return this.parent(key);
	},
	
	
	
	observeAdd: function(key,fn){
		if($type(key)!='function') return this;
		
		return this
			.addEvent('add:'+key, fn)
			.addEvent('add', key);
	},
	
	observeGet: function(key,fn){
		if($type(key)!='function') return this;
		
		return this
			.addEvent('get:'+key, fn)
			.addEvent('get', key);
	},
	
	observeSet: function(key,fn){
		if($type(key)!='function') return this;
		
		return this
			.addEvent('set:'+key, fn)
			.addEvent('set', key);
	},
	
	observeErase: function(key,fn){
		if($type(key)!='function') return this;
		
		return this
			.addEvent('erase:'+key, fn)
			.addEvent('erase', key);
	}
	
};
