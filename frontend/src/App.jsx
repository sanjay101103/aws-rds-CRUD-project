import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API = "https://sanjaycrud.work.gd/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const addUser = async () => {
    await axios.post(API, {
      name,
      email,
    });

    setName("");
    setEmail("");
    loadUsers();
  };

  const editUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const updateUser = async () => {
    await axios.put(`${API}/${editId}`, {
      name,
      email,
    });

    setName("");
    setEmail("");
    setEditId(null);
    loadUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AWS CRUD Project</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {editId ? (
        <button onClick={updateUser}>Update User</button>
      ) : (
        <button onClick={addUser}>Add User</button>
      )}

      <hr />

      <h2>Users List</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

          <button onClick={() => editUser(user)}>
            Update
          </button>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
