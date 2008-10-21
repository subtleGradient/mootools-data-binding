/*
Script: Selectors.Children.js
	Specification Examples of Pseudo Selector :children.

License:
	MIT-style license.
*/

describe('ObservableHash', {

	'before all': function(){
		defaultData = {
			
			0:0,
			a:'a',
			'this':'this',
			that:'that'
			
		};
		
		myHash = new Hash(defaultData);
		myObservableHash = new ObservableHash(defaultData);
	},

	'after all': function(){
		defaultData = null;
		
		myHash = null;
		myObservableHash = null;
	},

	'should set and get values just like a regular hash': function(){
		(0
		); value_of( myObservableHash .$data[0]
		).should_be( myHash           .get(0)
		
		); value_of( myObservableHash .get(0)
		).should_be( myHash           .get(0)
		); value_of( myObservableHash .set(0, '0 set')
		).should_be( myHash           .set(0, '0 set')
		); value_of( myObservableHash .get(0)
		).should_be( myHash           .get(0)
		
		);
	}

});
