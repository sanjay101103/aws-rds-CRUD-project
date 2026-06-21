import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editId, setEditId] = useState(null);
  const editUser = (user) => {
  setName(user.name);
  setEmail(user.email);
  setEditId(user.id);
};
const updateUser = async () => {
  await axios.put(
    `http://56.228.73.237:3000/users/${editId}`,
    {
      name,
      email
    }
  );

  getUsers();
  setName("");
  setEmail("");
  setEditId(null);
};

  const loadUsers = async () => {
    const res = await axios.get("http://56.228.73.237:3000/users");
    setUsers(res.data);
  };
  const deleteUser = async (id) => {
  await axios.delete(`http://56.228.73.237:3000/users/${id}`);
  getUsers();
};



  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {
    await axios.post("http://56.228.73.237:3000/users", {
      name,
      email,
    });
    await axios.put('http://56.228.73.237:3000/users/${id}',
      {
        name,
        email
      }
    );

    setName("");
    setEmail("");

    loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AWS RDS CRUD Project</h1>

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
        <button onClick={updateUser}>Update User</button>):(
      <button onClick={addUser}>Add User</button>)}
      

      <hr />

      <h2>Users List</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p><b>Name:</b> {user.name}</p>  
          <p><b>Email:</b> {user.email}</p>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
          <button onClick={() => editUser(user)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default App;
