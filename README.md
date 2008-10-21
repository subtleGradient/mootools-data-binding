# **Hash**Class
**HashClass** is a strict version of the Hash, implemented as a Class. So you can subclass it and Extend it. NOTE: Only supports accessing or setting data with methods. You can't use normal JS Object property access.

# Observable**Data**
**ObservableData** is just a bunch of methods that you can implement on your own classes that provide a standard interface to Observable classes.

# Observable**Hash**
**ObservableHash**, extends HashClass, implementing the ObservableData interface.  
This allows you to addEvents to the ObservableHash instance to observe when events fire for set() and get()
