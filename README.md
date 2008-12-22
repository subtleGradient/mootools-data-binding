Data Binding for MooTools
=========================

In the MVC style of coding you have a Model which is in charge of your data and its methods, you have your view of that model along with its various templates and styles, and you have all the glue code that binds the model to the view and allows you to edit the model using a view, etc...

The basic goal of the databinding mootools plugins project is to make MVC on the client-side simple and easy. Especially simple and easy to integrate into your existing applications. Should be simple and easy enough to use for the tiniest of widgets and powerful enough to use for full blown webapps.

The way I'm going about making this happen is with completely separate but complimentary plugins.

The very basics of the system is to define a standard "interface" for each layer in each MVC compatible class. Any class should be able to implement this interface easily with either very minor or no changes to the class required.

Each part of the system should work completely all by itself without requiring the use of the other part of the system.

The basic parts of the complete MVC stack are: Datastore, Model, Controller, Transformers, View, Templates & Styles.

Datastore
---------
read/write data from some data storage system, AJAX/Cookie/Local Database/Google Gears/Filesystem/etc...

Model
-----
The requirements for a model are very basic. Anything can be a model from a Hash to a full-blown ORM.

Controller
----------
Bind multiple objects together that implement the basic model/view methods. Any time you set a value on the controller, it sends the message to all of its bound objects.

**Example:**

	var myModel = new Hash({ name:'Tom' });
	var myController = new Controller();
	var myView = new Element('input',{type:'text'});
	
	myController.addbinding('name', myModel);
	myController.addbinding('name', myView, 'value');
	
	myModel.get('name'); // returns "Tom"
	myView.get('value'); // returns "Tom"
	
	myView.set('value', 'Fred');
	myModel.get('name'); // returns "Fred"
	
	myModel.set('name', 'Mary');
	myView.get('value'); // returns "Mary"
	

In this basic example, you create a model, view and controller. You bind the value of the view and the name of the model the the controller. Then any time you change the view or the model, they are both kept up to date by the controller.

Transformer
-----------
A simple wrapper around an object that implements the model/view methods. It transforms the values from set/get methods in some way. EG: Wrapping an object in a CurrencyTransformer would transform the value of all get/set methods to a currency from a float and back again.

This is very useful for controllers so you can bind your view to your model without having to sacrifice your data.

View
----
A view can be anything that implements all the view methods. Anything from a Hash to an Elements to some complex custom Widget of your own creation.
