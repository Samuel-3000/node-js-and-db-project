const express = require('express');
const app = express();
const config = require('./config');
const Student = require('./Models/Student');


app.use(express.urlencoded({extended: false}));
//establish connection to database
config.authenticate().then(function(){
    console.log('The database is connected');
}).catch(function(err){
    console.log(err);
});




app.get('/', function(req, res){
    let data = {
        where: {}
    }
    
    if(req.query.idstudent !== undefined){
        data.where.idstudent = req.query.idstudent;
    }
    Student.findAll(data).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err)
    });
});




//create a new student
app.post('/', function(req, res){
    Student.create(req.body).then(function(result){
        console.log(req.body);
        res.redirect('/');//redirect to get route to display all students 
    }).catch(function(err){
        res.send(err);
    });
});



//update name of student

app.patch('/:idstudent', function(req, res){
    let studentId = req.params.idstudent;


        //find the student
    Student.findByPk(studentId).then(function(result){
        //check if student was found
        if(result){
            //update student record
            result.studentname = req.body.studentname;
            console.log(req.body.studentname);
            //save changes to DB

            result.save().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });


        } else {
            res.status(404).send('Student record not found');
        }
    }).catch(function(err){
        res.send(err);
    });
});

//delete a student


app.delete('/:idstudent', function(req, res){
    let studentId = req.params.idstudent;

    //find student

    Student.findByPk(studentId).then(function(result){
        if(result){
           

            result.destroy().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.send(err);
            });


        } else {
            res.send('Student record not found');
        }
    })
})

app.listen(3000, function(){
    console.log('The server is running on port 3000.....');
});