/*
Script: HashClass.js
	Specification Examples of HashClass.

License:
	MIT-style license.
*/

describe('HashClass', {

	'before all': function(){
		defaultData = {
			
			0:0,
			a:'a',
			'this':'this',
			that:'that'
			
		};
		
		myHash = new Hash(defaultData);
		myHashClass = new HashClass(defaultData);
	},

	'after all': function(){
		defaultData = null;
		
		myHash = null;
		myHashClass = null;
	},

	'should set and get values just like a regular hash': function(){
		(0
		); value_of( myHashClass .$data[0]
		).should_be( myHash      .get(0)
		
		); value_of( myHashClass .get(0)
		).should_be( myHash      .get(0)
		); value_of( myHashClass .set(0, '0 set')
		).should_be( myHash      .set(0, '0 set')
		); value_of( myHashClass .get(0)
		).should_be( myHash      .get(0)
		
		);
	}

});
