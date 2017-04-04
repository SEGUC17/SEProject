let Student =require('../db/Student');

let StudentController = {


  checkStudentLogin:function(username, password) {
      Student.find( {username :username },function(err, studentuser) {
        if (err) {
          console.log(err);
          return console.log("errooooorrrrrrr");
        }
          if (studentuser.length ==   0) {
            return console.log("Incorrect username.");
          }
        //  console.log(studentuser.password);
          Student.find( {username :username ,'password':password},function(err, studentuser2) {
          //  console.log(password);
            if (studentuser2.length ==   0) {

               return console.log("Incorrect password.");
             }

             return console.log(studentuser2);
              });
      });

    },

    // // adding student method for testing only
    // saveStudent:function(Student){
    //   Student.save(function(err){
    //       if(err){
    //         console.log(err);
    //         console.log("error in adding this student / has been added ");
    //       }else {
    //         console.log("this student has been added correctly ");
    //       }
    //
    //   })
    //
    // },


}

module.exports = StudentController;
