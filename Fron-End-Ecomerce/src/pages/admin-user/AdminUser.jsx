// AdminUser.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../pagination/Pagination';
import './AdminUser.css';

const API_URL = 'http://localhost:3000/api/users';

const AdminUser = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [totalItems, setTotalItems] = useState(0);
  const [pageItems, setPageItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getUsers({ page: currentPage, limit: pageItems });
  }, [currentPage, pageItems]);

  const getUsers = async ({ page = 0, limit = 5 }) => {
    try {
      const response = await axios.get(`${API_URL}?limit=${limit}&page=${page}`);
      const { users, total } = response.data;
      setUsers(users);
      setTotalItems(total);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (data) => {
  try {
    const formData = new FormData();
    formData.append('Usuario', data.fullname);
    formData.append('Email', data.email);
    formData.append('Telefono', data.telephone);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    const response = await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log('User added:', response.data);
    Swal.fire('Éxito', 'Usuario agregado correctamente', 'success');
    reset();
    getUsers({ page: currentPage, limit: pageItems });
  } catch (error) {
    console.error('Error adding user:', error);
    Swal.fire('Error', 'No se pudo agregar el usuario', 'error');
  }
};

 const editUser = async (data) => {
  try {
    const formData = new FormData();
    formData.append('Usuario', data.fullname);
    formData.append('Email', data.email);
    formData.append('Telefono', data.telephone);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    const response = await axios.put(`${API_URL}/${editingUserId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log('User updated:', response.data);
    Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
    setIsEditing(false);
    setEditingUserId(null);
    reset();
    getUsers({ page: currentPage, limit: pageItems });
  } catch (error) {
    console.error('Error updating user:', error);
    Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
  }
};

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire('Éxito', 'Usuario eliminado correctamente', 'success');
      getUsers({ page: currentPage, limit: pageItems });
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
    }
  };

  const onSubmit = (data) => {
    const telefono = data.telephone.replace(/\D/g, '');
    if (telefono.length !== 10) {
      Swal.fire('Error', 'El teléfono debe contener 10 números', 'error');
      return;
    }

    if (isEditing) {
      editUser({ ...data, telephone: telefono });
    } else {
      addUser({ ...data, telephone: telefono });
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUserId(user._id);
    reset({
      fullname: user.fullname,
      email: user.email,
      telephone: user.telephone
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="admin-user-container">
      <h1>Gestión de Usuarios</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <input type="hidden" {...register('id')} />
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input type="text" {...register('fullname', { required: true })} />
          {errors.fullname && <span className="error">Nombre completo es requerido</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" {...register('email', { required: true })} />
          {errors.email && <span className="error">Email es requerido</span>}
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input type="tel" {...register('telephone', { required: true })} />
          {errors.telephone && <span className="error">Teléfono es requerido</span>}
        </div>

        <div className="form-group">
  <label>Imagen:</label>
  <input type="file" {...register('image')} />
</div>

        <button type="submit" className="btn-submit">
          {isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
      </form>

      <h2>Usuarios</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <img
                  src={
                    user.image
                      ? `http://localhost:3000/images/${user.image}`
                      : '/images/users/default-user.png'
                  }
                  alt={user.fullname}
                  className="user-image"
                  style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                />
              </td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.telephone}</td>
              <td>
                <button className="action-btn btn-edit" onClick={() => handleEdit(user)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="action-btn btn-danger" onClick={() => deleteUser(user._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <Pagination
          totalItems={totalItems}
          loadPage={handlePageChange}
          pageItems={pageItems}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default AdminUser;
