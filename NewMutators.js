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
