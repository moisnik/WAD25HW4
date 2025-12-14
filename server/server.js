const express = require('express');
const { pool } = require('./database');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());

// POST requests
app.post('/api/posts', async(req, res) => {
    try {
        console.log("a post request has arrived");
        const { body } = req.body;
        const newpost = await pool().query(
            "INSERT INTO posttable (body) VALUES ($1) RETURNING *", [body]
        );
        res.json(newpost.rows[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});
// GET requests (all)
app.get('/api/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool().query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// GET requests (with route parameter)
app.get('/api/posts/:id', async(req, res) => {
    try {
        console.log("get a post with route parameter request has arrived");
        const { id } = req.params; 
        const posts = await pool().query( 
            "SELECT * FROM posttable WHERE id = $1", [id]
        );
        res.json(posts.rows[0]); 
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// PUT requests
app.put('/api/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("update request has arrived"); 
        const updatepost = await pool().query(
            "UPDATE posttable SET body = $2 WHERE id = $1 RETURNING *", [id, body]
        );
        res.json(updatepost.rows[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});



// DELETE requests (all)
app.delete('/api/posts', async(req, res) => {
    try {
        console.log("delete all posts request has arrived");
        const deletepost = await pool().query(
            "DELETE FROM posttable"
        );
        res.json({message: "all posts deleted"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});

// DELETE ()
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete one post request has arrived");
    await pool().query("DELETE FROM posttable WHERE id = $1", [id]);
    res.json({ message: "post deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});