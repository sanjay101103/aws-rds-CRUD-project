const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("RDS CONNECTED");
});

app.get("/testdb", (req, res) => {
  db.query("SELECT NOW() as time", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
//add get 
app.get("/users", (req, res) => {
  db.query(
    "SELECT * FROM users",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

//add post
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User Added"
      });
    }
  );
});

//put or update 

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  db.query(
    "UPDATE users SET name=?, email=? WHERE id=?",
    [name, email, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User Updated"
      });
    }
  );
});

// delete

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        message: "User Deleted"
      });
    }
  );
});