/*
Script: ObservableHash.js
	A Hash, but observable!

License:
	MIT-style license.

Copyright:
	Copyright (c) 2008 [Thomas Aylott](http://subtlegradient.com).

*/


var ObservableData = {
	
	set: function(key,value){
		if(this.get(key) == value)
			return this;
		this.fireEvent('set:'+key, [value, key]);
		this.fireEvent('set', [value, key]);
		if(this.has && !this.has(key))
			this.fireEvent('add', [value, key]);
		return this.parent(key,value);
	},
	set: function(key,value){
		if(this.get(key) == value)
			return this;
		this.fireEvent('set:'+key, [value, key]);
		this.fireEvent('set', [value, key]);
		if(this.has && !this.has(key))
			this.fireEvent('add', [value, key]);
		return this.parent(key,value);
	},
	get: function(key){
		this.fireEvent('get:'+key, key);
		this.fireEvent('get', key);
		return this.parent(key);
	},
	erase: function(key){
		this.fireEvent('erase:'+key, key);
		this.fireEvent('erase', key);
		return this.parent(key);
	},
	
	observeSet: function(key,fn){
		if($type(key)=='function')
			return this.addEvent('set', key);
		// try{console.log( 'this.addEvent','set:'+key, fn );}catch(e){};
		return this.addEvent('set:'+key, fn);
	},
	observeAdd: function(key,fn){
		if($type(key)=='function')
			return this.addEvent('add', key);
		return this.addEvent('add:'+key, fn);
	},
	observeGet: function(key,fn){
		if($type(key)=='function')
			return this.addEvent('get', key);
		return this.addEvent('get:'+key, fn);
	},
	observeErase: function(key,fn){
		if($type(key)=='function')
			return this.addEvent('erase', key);
		return this.addEvent('erase:'+key, fn);
	}
	
};
