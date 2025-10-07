import { useState, useEffect } from 'react';
import { usersApi } from '../services/api';
import './UserForm.css';

function UserForm({ userToEdit, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        password: '',
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      if (userToEdit) {
        await usersApi.update(userToEdit.id, userData);
      } else {
        await usersApi.create(userData);
      }
      
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(`Failed to ${userToEdit ? 'update' : 'create'} user`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    if (onCancel) onCancel();
  };

  return (
    <div className="user-form-container">
      <h2>{userToEdit ? 'Edit User' : 'Create New User'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password {userToEdit ? '(leave blank to keep current)' : '*'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!userToEdit}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : (userToEdit ? 'Update User' : 'Create User')}
          </button>
          {userToEdit && (
            <button type="button" onClick={handleCancelEdit} className="btn-cancel">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;
