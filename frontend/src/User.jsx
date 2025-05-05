import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { ToastContext } from './utils/contexts';

function User() {
  const [name, setName] = useState('');
  const [contact, setCotnact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUserID, setEditingUserID] = useState(null);

  const addToast = useContext(ToastContext);

  const SERVER_URL = 'http://localhost:4000';

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  async function clearInput() {
    setName('');
    setCotnact('');
    setEmail('');
    setPassword('');
    setRole('');
    setEditingUserID(null);
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (editingUserID) {
      // update
      try {
        const formData = { name, contact, email, password, role };

        await axios.post(`${SERVER_URL}/users/${editingUserID}`, formData);

        addToast(`Update Successful`, `User: ${name} updated`);

        clearInput();
      } catch (error) {
        console.log(error);
        addToast(`Update Failed`, `${error}`);
      } finally {
        setEditingUserID(null);
      }
    } else {
      // create
      try {
        const formData = { name, contact, email, password, role };

        await axios.post(`${SERVER_URL}/users`, formData);

        addToast(`Add Successful`, `User: ${name} added`);

        clearInput();
      } catch (error) {
        console.log(error);
        addToast(`Add Failed`, `${error}`);
      }
    }

    fetchUsers();
  }

  async function fetchUsers() {
    try {
      const res = await axios.get(`${SERVER_URL}/users`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      addToast(`Fetching Users Failed`, `${error}`);
    }
  }

  async function editUser(user) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setName(user.name);
    setCotnact(user.contact);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setEditingUserID(user._id);
  }

  async function deleteUser(id, name) {
    try {
      await axios.delete(`${SERVER_URL}/users/${id}`);

      addToast(`Delete Successful`, `User: ${name} deleted`);

      fetchUsers();
    } catch (error) {
      console.log(error);
      addToast(`Delete Failed`, `${error}`);
    }
  }

  async function fetchRoles() {
    try {
      const res = await axios.get(`${SERVER_URL}/roles`);
      setRoles(res.data);
      setRole(res.data[0]._id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl font-bold my-12">
          {editingUserID ? 'Update User' : 'Create User'}
        </h1>
        <form
          className="flex flex-col gap-4 w-64"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="contact"
            value={contact}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setCotnact(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={password}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            name="role"
            id="role"
            value={role}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
          <button type="submit" className="primary-btn">
            {editingUserID ? 'Update' : 'Submit'}
          </button>
          <button type="reset" className="secondary-btn" onClick={clearInput}>
            {editingUserID ? 'Reset' : 'Clear'}
          </button>
          <Link to={'/'} className="light-btn">
            Back
          </Link>
        </form>
      </div>
      <hr className="hr" />
      <div className="flex flex-col overflow-auto">
        <table className="md:m-12 my-12 mx-4">
          <thead>
            <tr>
              <th className="th">ID</th>
              <th className="th">Name</th>
              <th className="th">Contact</th>
              <th className="th">Email</th>
              <th className="th">Password</th>
              <th className="th">Role</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="td">{user._id}</td>
                  <td className="td">{user.name}</td>
                  <td className="td">{user.contact}</td>
                  <td className="td">{user.email}</td>
                  <td className="td truncate max-w-8">{user.password}</td>
                  <td className="td">{user.role.name}</td>
                  <td className="td flex gap-2">
                    <button
                      className="primary-btn"
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger-btn"
                      onClick={() => deleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-12 text-center font-medium">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr className="hr" />
    </>
  );
}

export default User;
