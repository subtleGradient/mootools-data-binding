// MyClass from the second definition can contain a setOptions method that will have this.parent referring to the original setOptions
// var MyClass = new Class({Extends:new Class({Implements:Options})});

/*
Class.Mutators.Logs=function(self,methods){
	$splat(methods).each(function(methodName){
		var method = self[methodName];
		self[methodName]=function(){
			try{ console.log(Array.flatten([methodName, arguments]).join(',')); }catch(e){};
			return method(arguments);
		};
	});
	return self;
};
Class.Mutators.FiresEvents=function(self,methods){
	$splat(methods).each(function(methodName){
		var method = self[methodName];
		self[methodName]=function(){
			this.fireEvent(methodName,arguments);
			return method(arguments);
		};
	});
	return self;
};

MyClass = new Class({
	
	FiresEvents:'test',
	Logs:'test',
	
	Implements:Events,
	
	initialize: function(){},
	
	test: function(){
		return 'flarm';
	}
	
});

myMyClass = new MyClass();
myMyClass.test();
*/



Class.Mutators.ExtendsNative=function(self,klass){
	self.$data = new klass();
	
	Hash.getKeys(klass).each(function(key){
		self[key] = function(){ return self.$data[key].apply(self.$data, arguments); };
	});
	
	return self;
};

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

/*
var HashClass = new Class({
	
	ExtendsNative:Hash
	
});
*/

var ObservableHash = new Class({
	
	// Extends:HashClass,
	ExtendsNative:Hash,
	Implements:Events
	
});
ObservableHash.implement(ObservableData);

/*
myHash = new HashClass({ test:'it works!' });
document.write( myHash.getKeys() );
document.write( myHash.test );
document.write( myHash.get('test') );
document.write( myHash.set('test','again').getKeys() );
document.write( myHash.get('test') );
document.write('\n\n');
*/

// USAGE:
var myObservableHash = new ObservableHash({ test:'it works!' });

/*
document.write( myObservableHash.getKeys() );
document.write( myObservableHash.test );
document.write( myObservableHash.get('test') );
document.write( myObservableHash.set('test','again').getKeys() );
document.write( myObservableHash.get('test') );
document.write('\n\n');

document.write( myObservableHash.get );
document.write( myObservableHash.set );
*/

Element.implement({
	
	_bindSet: function(method, elementKey, data, dataKey){
		var element = this;
		var fn = function(value){ return element[method](elementKey, value); };
		fn(data.get(dataKey||elementKey));
		return data.observeSet(dataKey||elementKey, fn);
	},
	bindSet: function(elementKey, data, dataKey){
		return this._bindSet('set', elementKey, data, dataKey);
	},
	bindSetStyle: function(elementKey, data, dataKey){
		return this._bindSet('setStyle', elementKey, data, dataKey);
	},
	bindTween: function(elementKey, data, dataKey){
		return this._bindSet('tween', elementKey, data, dataKey);
	},
	
	_bindSets: function(method, data, mapping){
		Hash.each(function(dataKey,elementKey){
			
			if(elementKey == 'style' && /^object$/.test($type(elementKey)) )
				return this._bindSets('setStyle', dataKey, mapping);
			
			this._bindSet(method, elementKey, data, dataKey);
			
		});
		
		return this;
	}
	
});

window.addEvent('domready',function(){
	
	function logChange(value,key){ console.log("{"+key+":"+value+"}"); }
	function alertChange(){ new Element('div',{ text:$A(arguments) }).inject(document.body); }
	
	// Observe when ANY property is set
	myObservableHash.addEvent('set', logChange);
	
	// Observe when the key "key1" is set
	myObservableHash.addEvent('set:key1', alertChange);
	
	// Observe when the key "key1" is set; Same as `.addEvent('set:key1',fn)`
	myObservableHash.observeSet('key1', alertChange);
	
	myObservableHash.get('key1');
	myObservableHash.set('key1', 'changed!');
	
	
	var thing = new Element('h1').inject(document.body);
	
	new Element('input',{type:'text'}).inject(document.body)
		.addEvent('keyup',function(){ myObservableHash.set('input', this.get('value') ); })
		.bindSet('value', myObservableHash, 'input');
	
	new Element('input',{type:'text'}).inject(document.body)
		.addEvent('keyup',function(){ myObservableHash.set('font-size', this.get('value').toInt() ); })
		.bindSet('value', myObservableHash, 'font-size');
	
	new Element('input',{type:'text'}).inject(document.body)
		.addEvent('keyup',function(){ myObservableHash.set('background-color', this.get('value') ); })
		.bindSet('value', myObservableHash, 'background-color');
	
	// myObservableHash.observeSet('input', function(value){ thing.set('text',value); });
	
	
	// myObservableHash.observeSet(function(){
	// 	
	// 	try{console.log( this );}catch(e){};
	// 	
	// });
	
	thing.set('tween',{link:'chain'});
	
	myObservableHash.set('input','default text');
	thing.bindSet('text', myObservableHash, 'input');
	
	
	myObservableHash.set('font-size',22);
	thing.bindTween('font-size', myObservableHash);
	// thing.bindSetStyle('font-size', myObservableHash);
	
	
	myObservableHash.set('background-color','#ff0');
	thing.bindTween('background-color', myObservableHash);
	
	// thing._bindSets('set',myObservableHash,{
	// 	text: 'input',
	// 	style:{
	// 		'font-size':'font-size'
	// 	}
	// });
	// 
});



/*
var ObservableHash = new Class({
	
	Extends:ObservableData
	
});



myObservableHash.set('key1','value1');
myObservableHash.get('key1');


*/

var BoundWidget = new Class({
	
	Extends:ObservableHash,
	
	data:{
		title:"Default"
	},
	
	initialize: function(data){
		this.observeSet('title', this.populateTitle.bind(this) );
	},
	
	populateTitle: function(title){
		$$('pre').set('html', title);
	}
	
});
window.addEvent('domready',function(){
	
	var myBoundWidget = new BoundWidget();
	
	myBoundWidget.set('title','my new title');
	
});

