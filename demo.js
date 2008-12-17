try{console.log( "domready" );}catch(e){};

var myController = new SubtleController();

var myModel = new Hash({
	"name":"Thomas"
});

var myView = $('view');
var myView_Name = new Element('input',{type:'text'}).inject(myView);
var myView_Name1 = new Element('input',{type:'text'}).inject(myView);
var myView_Name2 = new Element('h1').inject(myView);

new Element('input', {type:'button', value:'Add'}).inject(myView).addEvent('click',function(){
	myController.addBindings(new Element('input',{type:'text'}).inject(this,'before'), {'name':'value'});
});



myController.addBinding(myModel);

myController.addBindings(myView_Name, {'name':'value'});
myView_Name.addEvent('keyup', function(){ this.fireEvent('change'); })

myController.addBindings(myView_Name2, {'name':'html'});

myController.addBindings(myView_Name1, {'name':'value'});

// Binding to an element should be allowed, even before domready
// the controller should handle waiting for domready and then bind

