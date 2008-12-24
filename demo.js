
try{console.log( "domready" );}catch(e){};

var myController = new SubtleController.Hash();

// =========
// = MODEL =
// =========
var myModel = new Hash({
	"name":"Thomas",
	"cost":1234.5
});


// ========
// = VIEW =
// ========
var myView = $('view');

var myView_Name = new Element('input',{type:'text'}).inject(myView);
myView_Name.addEvent('keyup', function(){ this.fireEvent('change'); })

var myView_Name1 = new Element('input',{type:'text'}).inject(myView);
myView_Name1.addEvent('keyup', function(){ this.fireEvent('change'); })

var myView_Name2 = new Element('h1').inject(myView);

new Element('input', {type:'button', value:'Add'}).inject(myView).addEvent('click',function(){
	myController.addBindings(new Element('input',{type:'text'}).inject(this,'before'), {'name':'value'});
});


// ==============
// = CONTROLLER =
// ==============
myController.addBinding(myModel);

myController.addBindings(myView_Name, {'cost':'value'});

myController.addBindings(myView_Name1, {
	'cost': new SubtleTransformer(myView_Name1, 'value', 
		function(value) {
			return value + " Rocks!";
		},
		String.toFloat
	)
});

myController.addBindings(myView_Name2, {
	'cost': new SubtleTransformer.Currency(myView_Name2, 'html')
});

// ==================
// = Implementation =
// ==================
window.addEvent('domready',function(){
	
	// var data = JSON.decode($('data').get('html'));
	// 
	// myModel.set(data);
	var data = $('data');
	try{console.log( "SubtleTransformer.JSON" );}catch(e){};
	myController.addBindings(data, new SubtleTransformer.JSON(data, 'html'));
	try{console.log( "/SubtleTransformer.JSON" );}catch(e){};
	
	
});


// Binding to an element should be allowed, even before domready
// the controller should handle waiting for domready and then bind

