/*
Script: HashClass.js
	Specification Examples of HashClass.

License:
	MIT-style license.
*/

describe('HashClass', {

	'before': function(){
		defaultData = {
			
			0:0,
			a:'a',
			'this':'this',
			that:'that'
			
		};
		
		myHash = new Hash(defaultData);
		myHashClass = new HashClass(defaultData);
	},

	'after': function(){
		defaultData = null;
		
		myHash = null;
		myHashClass = null;
	},

	'should set and get values just like a regular hash': function(){
		value_of( myHashClass.$data                  ).should_be( myHash                  );
		
		value_of( myHashClass.get(0)                 ).should_be( myHash.get(0)           );
		value_of( myHashClass.set(0,'0 set').$data   ).should_be( myHash.set(0,'0 set')   );
		value_of( myHashClass.erase(0).$data         ).should_be( myHash.erase(0)         );
		
		value_of( myHashClass.get('a')               ).should_be( myHash.get('a')         );
		value_of( myHashClass.set('a','a set').$data ).should_be( myHash.set('a','a set') );
		value_of( myHashClass.erase('a').$data       ).should_be( myHash.erase('a')       );
	}

});
