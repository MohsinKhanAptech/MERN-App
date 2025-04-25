import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import { ToastContext } from './utils/contexts';

function Role() {
  const [name, setName] = useState('');
  const [roles, setRoles] = useState([]);
  const [editingID, setEditingID] = useState(null);

  const addToast = useContext(ToastContext);

  const SERVER_URL = 'http://localhost:4000';

  useEffect(() => {
    fetchRoles();
  }, []);

  async function clearInput() {
    setName('');
    setEditingID(null);
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (editingID) {
      // update
      try {
        const formData = { name };

        await axios.post(`${SERVER_URL}/roles/${editingID}`, formData);

        addToast(`Update Successful`, `Role: ${name} updated`);

        clearInput();
      } catch (error) {
        console.log(error);
        addToast(`Update Failed`, `${error}`);
      } finally {
        setEditingID(null);
      }
    } else {
      // create
      try {
        const formData = { name };

        await axios.post(`${SERVER_URL}/roles`, formData);

        addToast(`Add Successful`, `Role: ${name} added`);

        clearInput();
      } catch (error) {
        console.log(error);
        addToast(`Add Failed`, `${error}`);
      }
    }

    fetchRoles();
  }

  async function fetchRoles() {
    try {
      const res = await axios.get(`${SERVER_URL}/roles`);
      setRoles(res.data);
    } catch (error) {
      console.log(error);
      addToast(`Fetching Roles Failed`, `${error}`);
    }
  }

  async function editRole(role) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setName(role.name);
    setEditingID(role._id);
  }

  async function deleteRole(id, roleName) {
    try {
      await axios.delete(`${SERVER_URL}/roles/${id}`);

      addToast(`Delete Successful`, `Role: ${roleName} deleted`);

      fetchRoles();
    } catch (error) {
      console.log(error);
      addToast(`Delete Failed`, `${error}`);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl font-bold my-12">
          {editingID ? 'Update Role' : 'Create Role'}
        </h1>
        <form
          className="flex flex-col gap-4 w-64"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            type="text"
            name="role"
            placeholder="role"
            value={name}
            className="p-2 border-2 border-neutral-400 rounded"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">
            {editingID ? 'Update' : 'Submit'}
          </button>
          <button type="reset" className="secondary-btn" onClick={clearInput}>
            {editingID ? 'Reset' : 'Clear'}
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
              <th className="th">Role</th>
              <th className="th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length !== 0 ? (
              roles.map((role) => (
                <tr key={role._id}>
                  <td className="td">{role._id}</td>
                  <td className="td">{role.name}</td>
                  <td className="td flex gap-2">
                    <button
                      className="primary-btn"
                      onClick={() => editRole(role)}
                    >
                      Edit
                    </button>
                    <button
                      className="danger-btn"
                      onClick={() => deleteRole(role._id, role.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-12 text-center font-medium">
                  No Roles Found
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

export default Role;
