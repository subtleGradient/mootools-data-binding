

// Create a new blank ObservableHash instance
var myObservableHash = new ObservableHash();



window.addEvent('domready',function(){
	
	
	
	// Create the empty variable to put my element when I create it
	var pre;
	
	
	
	// Every time any value is set, log it to the console
	if(console && console.log)
		myObservableHash
			.observeAdd(function(){console.log([ "Add", arguments ].flatten());})
			.observeSet(function(){console.log([ "Set", arguments ].flatten());})
		;
	
	
	
	myObservableHash
		
		// When this value is added to myObservableHash, create this html element
		.observeAdd('PRE_HTML',function(value){
			
			pre = new Element('pre', { html:value }).inject(document.body);
			
		})
		
		// Every time the PRE_HTML is set, it will set the html of the PRE tag to the value of PRE_HTML
		.observeSet('PRE_HTML',function(value){
			
			pre.set('html', value);
			
		})
		
	;
	
	
	
	// Make a new TEXTAREA
	// 		whenever you type into it
	// 			set the value of PRE_HTML to the TEXTAREA value
	new Element('textarea',{ text:'Type stuff here!' })
		.inject(document.body)
		.addEvent('keyup',function(e){
			
			myObservableHash.set('PRE_HTML', this.value);
			
		})
	;
	
	
	
	// NOTE:
	// The PRE has no idea there is a TEXTAREA
	// The TEXTAREA has no idea there is a PRE
	// 
	// They are simply both setting and getting values from the same central ObservableHash
});
