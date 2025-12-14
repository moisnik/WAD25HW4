require('dotenv').config();

const express = require('express');
const { pool, ready } = require('./database');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

async function ensureUsersTable() {
  const db = await ready;
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS posttable (
      id SERIAL PRIMARY KEY,
      title TEXT,
      body TEXT NOT NULL,
      date TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await db.query(`
    ALTER TABLE posttable
    ADD COLUMN IF NOT EXISTS title TEXT
  `);

  await db.query(`
    ALTER TABLE posttable
    ADD COLUMN IF NOT EXISTS date TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `);
}

function requireJwt(req, res, next) {
  const header = req.headers.authorization || '';
  const parts = header.split(' ');
  const type = parts[0];
  const token = parts[1];

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET missing (.env)' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid/expired token' });
  }
}

function signToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

app.post('/api/auth/signup', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET missing (.env)' });
    }

    const db = await ready;
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    const existing = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const created = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, password_hash]
    );

    const token = signToken(created.rows[0]);
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT_SECRET missing (.env)' });
    }

    const db = await ready;
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }

    const found = await db.query(
      'SELECT id, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    if (found.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = found.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);

    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ id: user.id, email: user.email });
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// POST requests
app.post('/api/posts', requireJwt, async(req, res) => {
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
app.get('/api/posts', requireJwt, async(req, res) => {
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
app.get('/api/posts/:id', requireJwt, async(req, res) => {
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
app.put('/api/posts/:id', requireJwt, async(req, res) => {
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
app.delete('/api/posts', requireJwt, async(req, res) => {
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
app.delete('/api/posts/:id', requireJwt, async (req, res) => {
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

(async () => {
  await ensureUsersTable();
  app.listen(port, () => {
      console.log("Server is listening to port " + port)
  });
})().catch(err => {
  console.error(err);
  process.exit(1);
});