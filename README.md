okay, here is the plan:

this branch is our base project, what are going to do:
1) download this project on your machine
2) redirect to inside the src folder by typing in the terminal "cd ~/Desktop/SEProject/src", assuming the you downloaded the project on your desktop
3) type the command "npm install" to install any dependencies in the package.json file that you don't have on your machine

now that you have the base project set up on your machine, your work flow is going to be as the following:
1) copy paste your already implemented methods so far in their corresponding schema and test them
2) add any add any dependencies that you already had in your package.json file in this projects package.json file and run the "npm install" command again


now, ezay han-test ? 
1) redirect to the directory of the file you want to test, i.e type "cd ~/Desktop/SEProject/src/db"
2) you have to connect to the db at the top of the file, but I have already written that for you.
3) after you have redirected your terminal as in step 1, type the command "node"
4) then type "x = require('./Admin.js)" Admin can be replaced by the file that contains the method you want to test
5) type "y = new x({})" inside the curly bracket you should insert the a JS object you want to try to insert for example
6) then type y.add(), the method add is an example method I implemented in the schemas file
7) and the object you have written inside the curly brackets will be inserted in the collection you have required in step 4
8) so in general just require the schema you that has the method you want to test, create an object of the required collection using the keyword "new" and call the method on this object like we do in java

now, if you decide for any reason to add a schema, make sure you do the following:
1) do not forget to connect to the database at the top of the file, our database is named "platform"
2) you have to write "var Schema = mongoose.Schema;" then create the schema with "var mySchema = new Schema({ 7ot el attributes hena}); don't ask me why but it only works that way
3) just copy paste the first few lines, until the "var Schema = mongoose.Schema;" line the start defining your schema.
4) when you add a method you have to write "mySchema.methods.methodName = function(attributes here){function body}"

please make sure that you test your methods, and when you finish push to a branch
this will make merging a lot easier for us, so please stick with this :D
