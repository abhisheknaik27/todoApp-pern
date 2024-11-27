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
        console.log(error);
    }
})

//get all todo
app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error);
    }
})

//update todo
app.put('/', (req, res) => {

})

//get todo
app.get('/', (req, res) => {

})

//delete todo
app.delete('/', (req, res) => {

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));