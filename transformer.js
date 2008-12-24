var SubtleTransformer = new Class({
	
	initialize: function(obj, keys, _set, _get){
		keys = $splat(keys);
		this.obj = obj;
		
		_set && (this._set = _set);
		_get && (this._get = _get);
		
		var self = this;
		this.set = function(keyOrValue, value) {
			if (value==undefined)
				return self.obj.set(keys[0], self._set(keyOrValue));
			else
				return self.obj.set(key, self._set(value));
		};
		this.get = function(key) {
			if (key==undefined)
				return self._get( self.obj.get(keys[0]) );
			else
				return self._get( self.obj.get(key) );
		};
		
		keys.each(function(key){
			self['set' + String.camelCase(key).capitalize()] = function(value) {
				return self.obj.set(key, self._set(value));
			};
			self['get' + String.camelCase(key).capitalize()] = function() {
				return self._get(self.obj.get(key));
			};
		});
	},
	
	// When something tries to set a value on this object, transform!
	_set: function(value){ return value; },
	
	// When something tries to get a value on this object, transform back!
	_get: function(value){ return value; }
	
});

function formatCurrency(num){
	num = (num||'0').toString().replace(/\$|\,/g,'');
	if(isNaN(num)) num = "0";
	if(num+0 == 0) return '$0';
	
	var sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	
	var cents = num%100;
	num = Math.floor(num/100).toString();
	
	if(cents<10) cents = "0" + cents;
	
	numlength = num.length;
	
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
	
	return [
		sign ? '' : '-',
		'$',
		num,
		'.',
		cents
	].join('');
}

SubtleTransformer.Boolean = new Class({
	Extends: SubtleTransformer,
	_set: function(value){return !!value;},
	_get: function(value){return !!value;}
});
SubtleTransformer.String = new Class({
	Extends: SubtleTransformer,
	_set: String
});
SubtleTransformer.String.hyphenate = new Class({
	Extends: SubtleTransformer,
	_set: String.hyphenate
});
SubtleTransformer.ClassName = SubtleTransformer.String.hyphenate;

SubtleTransformer.Currency_ = new Class({
	Extends: SubtleTransformer,
	options:{},
	_get: function(value){
		console.log( "Transformer#_get(", value );
		value = formatCurrency(value);
		return value;
	},
	_set: function(value){
		console.log( "Transformer#_set(", value );
		value = String.replace(value, '$','');
		value = String.replace(value, ',','');
		value = value.toFloat();
		return value;
	}
});
SubtleTransformer.Currency = new Class({
	Extends: SubtleTransformer,
	options:{},
	_set: function(value){
		console.log( "Transformer#_set(", value );
		value = formatCurrency(value);
		return value;
	},
	_get: function(value){
		console.log( "Transformer#_get(", value );
		value = String.replace(value, '$','');
		value = String.replace(value, ',','');
		value = value.toFloat();
		return value;
	}
});



SubtleTransformer.JSON = new Class({
	Extends: SubtleTransformer,
	options:{},
	_set: JSON.encode,
	_get: JSON.decode
});



/*
var myData = new Hash({
    name:"thing",
    cost:1234.5
});

myData_asCurrency = new SubtleTransformer.Currency(myData, {});

myData_asCurrency.get('cost'); // $1,234.50
myData_asCurrency.set('cost', 5432.1);
myData_asCurrency.set('cost', "$5,432.1");
myData_asCurrency.setCost(5432.1);
myData_asCurrency.setCost("$5,432.1");

*/
