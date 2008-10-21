Class: ObservableHash {#ObservableHash}
===============================

**HashClass** is a strict version of the Hash, implemented as a Class. So you can subclass it and Extend it. NOTE: Only supports accessing or setting data with methods. You can't use normal JS Object property access.

**ObservableData** is just a bunch of methods that you can implement on your own classes that provide a standard interface to Observable classes.

**ObservableHash**, extends HashClass, implementing the ObservableData interface. This allows you to addEvents to the ObservableHash instance to observe when events fire for set() and get()

### Notes:

- Only supports accessing or setting data with methods. You can't use normal JS Object property access.

### Implements:

[Events][]
[ObservableData][]

### Syntax:

	var myThing = new ObservableHash([options]);

### Arguments:

1. data  - (*object*, optional) The default data for your ObservableHash.

### Examples:

	var myObservableHash = new ObservableHash({ key:value });

### Returns:

* (*object*) A new ObservableHash instance.

## Events:

* **add**
* **get**
* **set**
* **erase**

#### Signature:

	onSet(key,value)
	onAdd(key,value)
	onGet(key)
	onErase(key)

## *Generated* Events:

* **add:key**
* **get:key**
* **set:key**
* **erase:key**

#### Signature:

	addEvent(  'set:key', function(key,value){})
	addEvent(  'add:key', function(key,value){})
	addEvent(  'get:key', function(key){}      )
	addEvent('erase:key', function(key){}      )

## Methods:

### observeSet

Add the function 'fn' to run when any 'set' event fires:

	observeSet(fn)

Add the function 'fn' to run when the 'set:flarm' event fires:

	observeSet('flarm',fn)
	OR
	addEvent('set:'+'flarm', fn)

### observeAdd

Add the function 'fn' to run when any 'add' event fires:

	observeAdd(fn)

Add the function 'fn' to run when the 'add:flarm' event fires:

	observeAdd('flarm',fn)
	OR
	addEvent('add:'+'flarm', fn)

### observeGet

Add the function 'fn' to run when any 'get' event fires:

	observeGet(fn)

Add the function 'fn' to run when the 'get:flarm' event fires:

	observeGet('flarm',fn)
	OR
	addEvent('get:'+'flarm', fn)

### observeErase

Add the function 'fn' to run when any 'erase' event fires:

	observeErase(fn)

Add the function 'fn' to run when the 'erase:flarm' event fires:

	observeErase('flarm',fn)
	OR
	addEvent('erase:'+'flarm', fn)

### Demos:

- ObservableHash - `<none yet>`

