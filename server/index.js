const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const pool = require('./db.js')

//middleware
app.use(cors());
app.use(express.json());

//ROUTES with postgres
//create todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *", 
            [description]);
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//get all todo
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//get todo
app.get('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1" , [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

//update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id]);
        res.json(updateTodo.rows[0]);
        //res.json("todo updated");
    } catch (error) {
        console.log(error.message);
    }
})



//delete todo
app.delete('/todos/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1" , [id]);
        res.json('todo deleted');
        //res.json(deleteTodo.rows)
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));