var myDiv1 = new Element('div').inject(document.body);
var myArray = [0,1,2,3];
/*
var myHash = new Hash({
	
	name:    new Data.Name('John Doe'),
	address: new Data.Address(123, 'Oak Drive', 'Atlanta', 'GA'),
	phone:   new Data.Phone(3215551234)
	
});
*/
var myHash = new Hash({
	name:    'John Doe',
	address: [123, 'Oak Drive', 'Atlanta', 'GA'],
	phone:   3215551234
});

var myHsh1 = new Hash({
	row1:myHash
});




// Make a separate binding for each object.
// Label the bindings so that you can easily bind to specific things

Controller.addBinding('', );

myBinding.update();



addBinding(type:String, fn:Function[, internal:Boolean])
myController.addBinding('user name', { property:'name', get:myHash.get, set:myHash.set, update:'periodical' });
myController.addBinding('user name', { property:'text', get:myDiv1.get, set:myDiv1.set, update:'change' });

myController.addBinding('user name', { get:myHash.get, set:myHash.set, update:'periodical' }, 'name');
myController.addBinding('user name', { get:myDiv1.get, set:myDiv1.set, update:'change'     }, 'text');

myController.addBinding('name', myHash);
myController.addBinding('name', myDiv1, 'text');
myController.addBinding('name', myDiv2, 'text');

myController.addBinding('name', myHsh1);
myController.addBinding('name', myDiv1, 'text');
myController.addBinding('name', myDiv2, 'text');

addBindings({
	type: fn:Function,
	type: fn:Function,
	type: fn:Function
})
Controller.addBindings({
	arbitraryKey1:[
		{	property: 'name',
			get: myHash.get,
			set: myHash.set,
			update: 'periodical'
		},
		{	property: 'text',
			get: myDiv1.get,
			set: myDiv1.set,
			update: 'change'
		}
	],
	arbitraryKey2:[
		{	property: 'name',
			get: myHash.get,
			set: myHash.set,
			update: 'periodical'
		},
		{	property: 'text',
			get: myDiv1.get,
			set: myDiv1.set,
			update: 'change'
		}
	]
});




fireBinding(type:String[, args:Anything|Array[, delay:Number]])
removeBinding(type:String, fn:Function)
removeBindings([types:String|Array])
cloneBindings(from:Controller[, types:String|Array])


addEvent(type:String, fn:Function[, internal:Boolean])
addEvents({
	type: fn:Function,
	type: fn:Function,
	type: fn:Function
})
fireEvent(type:String[, args:Anything|Array[, delay:Number]])
removeEvent(type:String, fn:Function)
removeEvents([types:String|Array])
cloneEvents(from:Element[, type:String])
