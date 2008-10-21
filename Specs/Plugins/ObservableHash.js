/*
Script: ObservableHash.js
	Specification Examples of ObservableHash.

License:
	MIT-style license.
*/

var defaultData;
var myHash;
var myObservableHash;

describe('ObservableHash', {

	'before': function(){
		
		defaultData = {
			
			0:0,
			a:'a',
			'this':'this',
			that:'that'
			
		};
		
		myHash = new Hash(defaultData);
		myObservableHash = new ObservableHash(defaultData);
	},

	'after': function(){
		defaultData = null;
		
		myHash = null;
		myObservableHash = null;
	},

	'should set and get values just like a regular hash': function(){
		value_of( myObservableHash.$data          ).should_be( myHash          ); 
		
		value_of( myObservableHash.get(0)         ).should_be( myHash.get(0)   ); 
		value_of( myObservableHash.set(0).$data   ).should_be( myHash.set(0)   ); 
		value_of( myObservableHash.erase(0).$data ).should_be( myHash.erase(0) ); 
		
		value_of( myObservableHash.get('a')         ).should_be( myHash.get('a')   ); 
		value_of( myObservableHash.set('a').$data   ).should_be( myHash.set('a')   ); 
		value_of( myObservableHash.erase('a').$data ).should_be( myHash.erase('a') ); 
		
	},
	
	'should NOT allow direct property access': function(){
		
		
		
	},
	
	'should be chainable': function(){
		
		value_of( myObservableHash.set('key','value') ).should_be( myObservableHash );
		value_of( myObservableHash.erase('key') ).should_be( myObservableHash );
		
	},
	
	'should fire events for CRUD': function(){
		
		var C,R,U,D;
		
		myObservableHash.addEvents({
			'add'   : function(){C=true},
			'get'   : function(){R=true},
			'set'   : function(){U=true},
			'erase' : function(){D=true}
		});
		
		myObservableHash.set   ('CRUD',1);
		myObservableHash.get   ('CRUD');
		myObservableHash.set   ('CRUD',2);
		myObservableHash.erase ('CRUD');
		
		value_of(C).should_be_true();
		value_of(R).should_be_true();
		value_of(U).should_be_true();
		value_of(D).should_be_true();
	},
	
	'should fire events for specific keys': function(){
		
		var C,R,U,D;
		
		myObservableHash.addEvents({
			  'add:mySpecialKey' : function(){C=true},
			  'get:mySpecialKey' : function(){R=true},
			  'set:mySpecialKey' : function(){U=true},
			'erase:mySpecialKey' : function(){D=true}
		});
		
		myObservableHash.set   ('mySpecialKey',1);
		myObservableHash.get   ('mySpecialKey');
		myObservableHash.set   ('mySpecialKey',2);
		myObservableHash.erase ('mySpecialKey');
		
		value_of(C).should_be_true();
		value_of(R).should_be_true();
		value_of(U).should_be_true();
		value_of(D).should_be_true();
	}

});
