const express = require('express');
const res = require('express/lib/response');
const app = express();
const config = require('./config');
const Task = require('./models/Task');
const Goal = require('./models/goal')
const Note = require('./models/note')
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//Establish connetion to database
config.authenticate().then(function () {
    console.log('Database is connected');
}).catch(function (err) {
    console.log(err);
});

//Update Goal list
//Update status of a task
app.patch('/goals/:id', function (req, res) {
    let id = req.params.id;

    //Find the task
    Goal.findByPk(id).then(function (result) {
        //Check if task was found
        if (result) {
            console.log(result.description)
            console.log(result.id)
            if (result.status === "not done" || result.status === "started") {
                // result.status = req.body.status
                result.status = 'completed'
                console.log(result.status)
                // }else if(result.status ==="completed"){
                // result.status = "not done";
            }else {
                result.status = "started"
                console.log('here at else')
            }
            //Save changes to DB
            console.log('weird1')
            result.save().then(function () {
                res.send(result)
                console.log('weird');
            }).catch(function (err) {
                res.status(500).send('err');
            });
        }
        else {
            res.status(404).send('Goals record not found');
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//Update Task list
//Update status of a task
app.patch('/tabs/tab2/:id', function (req, res) {
    let id = req.params.id;

    //Find the task
    Task.findByPk(id).then(function (result) {
        //Check if task was found
        if (result) {
            console.log(result.name)
            console.log(result.id)
            if (result.status === "not done" || result.status === "started") {
                // result.status = req.body.status
                result.status = 'completed'
                console.log(result.status)
                // }else if(result.status ==="completed"){
                // result.status = "not done";
            }else {
                result.status = "started"
                console.log('here at else')
            }
            //Save changes to DB
            console.log('weird1')
            result.save().then(function () {
                res.send(result)
                console.log('weird');
            }).catch(function (err) {
                res.status(500).send('err');
            });
        }
        else {
            res.status(404).send('Goals record not found');
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//Get all tasks
app.get('/', function (req, res) {
    Task.findAll().then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});
//Get all goals
app.get('/goals', function (req, res) {
    Goal.findAll().then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//Get all notes
app.get('/notes', function (req, res) {
    Note.findAll().then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//Get a task
app.get('/:task_id', function (req, res) {
    let taskID = req.params.task_id

    Task.findOne({ where: { id: taskID } }).then(function (result) {
        res.status(200).send(result);
    }).catch(function (err) {
        res.status(500).send(err);
    });
});





// Create a new task
app.post('/', function (req, res) {
    Task.create(req.body).then(function (result) {
        res.redirect('/');
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

// Create a new goal
app.post('/addgoal', function (req, res) {
    Goal.create(req.body).then(function (result) {
        res.redirect('/goals');
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

// Create a new note
app.post('/addnote', function (req, res) {
    Note.create(req.body).then(function (result) {
        res.redirect('/notes');
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

//Delete a task
app.delete('/:task_id', function (req, res) {
    let taskID = req.params.task_id


    //Find a task
    Task.findByPk(taskID).then(function (result) {
        if (result) {
            //Delete task from database
            result.destroy().then(function () {
                res.redirect('/');
            }).catch(function (err) {
                res.status(500).send(err);
            });

        }
        else {
            res.status(404).send('Task not found');
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});


//Update priority level and progress
app.patch('/:task_id', function (req, res) {
    let taskID = req.params.task_id

    //Find a task
    Task.findByPk(taskID).then(function (result) {
        //Check if task was found
        if (result) {
            //Update Task
            if (req.body.priority_level === undefined) {
                result.priority_level = result.priority_level
            } else {
                result.priority_level = req.body.priority_level;
            }
            if (req.body.progress_level === undefined) {
                result.progress_level = result.progress_level
            } else {
                result.progress_level = req.body.progress_level;
            }
            //Save changes to DB
            result.save().then(function () {
                res.redirect('/');
            }).catch(function (err) {
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Task not found');
        }
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

app.listen(3000, function () {
    console.log('Server running on port 3000...');
});