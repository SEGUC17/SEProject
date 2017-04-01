okay, here is the plan:

this branch is our base project, what are going to do:
1) download this project on your machine
2) redirect to inside the src folder by typing in the terminal "cd ~/Desktop/SEProject/src", assuming the you downloaded the project on your desktop
3) type the command "npm install" to install any dependencies in the package.json file that you don't have on your machine

now that you have the base project set up on your machine, your work flow is going to be as the following:
1) copy paste your already implemented methods so far in their corresponding controllers and test them, the main controller will just contain the functions of the visitor
2) add any dependencies that you already had in your package.json file in this project's package.json file and run the "npm install" command again
3) I wrote an example for you in the serviceProvider controller, and called the function in the server file.


now, ezay han-test ? 
1) in the server file, require the controller and any schema you will need in testing
2) call the method like this: controllername(the name of the var you required in the file).methodname(back in the controller file)
3) you should put console.log messages in the function implemented in the controller to make sure it runs correctly
4) I erote an example in the server file were I add a service privider, just an example, will remove it later

please make sure that you test your methods, and when you finish push to a branch
this will make merging a lot easier for us, so please stick with this :D

do not worry about the routes right now just focus on implementing and testing your functions.
I also changed the emails in all schemas to use mongoose-email
