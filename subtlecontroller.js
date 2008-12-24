var SubtleController = new Class({
	
	Implements: [Options, Events],
	
	options:{
		
	},
	
	initialize: function(data, options){
		this.setOptions(options);
		this.bindings = $H(data);
		window.addEvent('domready',function(){ this.ready = true; }.bind(this));
		return this.fireEvent('initialize');
	},
	
	update: function(keys){
		try{console.log( "	update("+keys+")" );}catch(e){};
		keys = $splat(keys);
		
		keys.each(this.updateOne, this);
		try{console.log( "	/update("+keys+")" );}catch(e){};
	},
	
	updateOne: function(key, value){
		try{console.log( "		updateOne("+key+")" );}catch(e){};
		var self = this;
		
		var bindings = this.bindings.get(key);
		var bindingValue = value;
		if (value==undefined || value===0)
			bindingValue = bindings[0].get();
		
		bindings.each(function(binding){
			if (!binding) return;
			// if (binding == bindings[0])	return;
			binding.set(bindingValue);
		},this);
		try{console.log( "		/updateOne("+key+")" );}catch(e){};
	},
	
	// addBinding(binding)
	// binding required interface:
	// 	get(key,value)
	// 	set(key,value)
	// 
	// 
	// addBinding({
	//     get:function(key,value){},
	//     set:function(key,value){}
	// });
	// 
	// addBinding({
	//     get:myInstance.get.bind(myInstance),
	//     set:myInstance.set.bind(myInstance)
	// });
	// 
	// addBinding(myInstance);
	// 
	// addBinding(myInstance, 'key', 'key');
	// 
	// addBindings(myInstance, {
	// 	'key': 'key',
	// 	'key1': 'key1'
	// });
	// 
	
	addBinding: function(bindable, key, bindableKey){
		try{console.log( "  addBinding(" + [bindable, key, bindableKey] + ")" );}catch(e){};
		if (key==undefined) return this.addBindings(bindable);
		var self = this;
		
		if (!this.ready && /element|string/.test($type(bindable))){
			window.addEvent('domready',function(){
				self.addBinding(bindable, key, bindableKey);
			});
			return this;
		}
		
		if (typeof bindable == 'string') bindable = $(bindable);
		bindableKey = bindableKey || key;
		
		var thinggy = {};
		
		thinggy.get = bindableKey.get || function(){
			console.log('thinggy.get(', key, bindableKey, bindable.get(bindableKey));
			return bindable.get(bindableKey);
		};
		thinggy.set = bindableKey.set || function(value){
			console.log('thinggy.set(', key, bindableKey, value);
			return bindable.set(bindableKey, value);
		};
		
		(this.bindings.get(key) || this.bindings.set(key, []).get(key)).push(thinggy);
		
		if (bindable.addEvent) bindable.addEvent('change', function(){
			myController.updateOne(key, this.get(bindableKey));
		})
		
		this.update(key);
		try{console.log( "  /addBinding(" + [bindable, key, bindableKey] + ")" );}catch(e){};
		return this.fireEvent('addBinding');
	},
	
	addBindings: function(bindable, mapping){
		try{console.log( "addBindings(" + [bindable, mapping] + ")" );}catch(e){};
		
		var MAPPING = {};
		mapping = mapping || Hash.getKeys(bindable);
		
		switch($type(mapping)){
		case 'string':
			mapping = $splat(mapping);
		case 'array':
			mapping.each(function(key){
				MAPPING[key] = key;
			});
			break;
		case 'object':
			if (!mapping.set){
				MAPPING = mapping;
				break;
			}
			
			MAPPING = { $:mapping };
			break;
		default:
			return this;
		}
		
		try{console.log( MAPPING );}catch(e){};
		
		Hash.each(MAPPING, function(bindableKey, key){
			this.addBinding(bindable, key, bindableKey);
		}, this);
		
		try{console.log( "/addBindings(" + [bindable, mapping] + ")" );}catch(e){};
		return this.fireEvent('addBindings');
	}
	
});

SubtleController.Hash = new Class({
	
	Extends: SubtleController
	
});
SubtleController.Array = new Class({
	
	Extends: SubtleController
	
});
SubtleController.Tree = new Class({
	
	Extends: SubtleController
	
});
SubtleController.Defaults = new Class({
	
	Extends: SubtleController.Hash
	
});


// MEDIATING CONTROLLERS
// Establish the bindings between properties of view objects and properties of the controller object, 
// and then between those controller properties and specific properties of a model object.
// 
//     * Commit and Discard Changes
//     * Management of Selections
//     * Placeholder Values
// 
// NSController
//     NSObjectController
//     NSArrayController
//     NSUserDefaultsController
//     NSTreeController


// COORDINATING CONTROLLERS
// Oversee—or coordinate—the functioning of the entire application or of part of the application.
// 
//    * Responding to delegation messages and observing notifications
//    * Responding to action messages
//    * Managing the life cycle of "owned" objects (for example, releasing them at the proper time)
//    * Establishing connections between objects and performing other set-up tasks
// 
//     NSWindowController
//     NSDocumentController
// 
