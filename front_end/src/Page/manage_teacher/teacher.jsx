import { useState, useEffect } from "react";
import { GoBell } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../component/studentform";
import "./css.css";

export default function Teacher() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false); 

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateStudent(formData.phone, formData);
      } else {
        await createStudent(formData);
      }
      setFormData({ name: "", phone: "", email: "", role: "", address: "" });
      setShowModal(false);
      setIsEditing(false);
      fetchStudents();
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  const handleDelete = async (phone) => {
    try {
      await deleteStudent(phone);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo"></div>
        <div className="menu">
          <button className="menu-btn active">Manage Students</button>
          <button className="menu-btn">Manage Lessons</button>
          <button className="menu-btn">Message</button>
        </div>
      </div>

      <div className="main">
        <header className="header">
          <a href="/" className="icon-link">
            <GoBell className="icon" />
          </a>
          <a href="/" className="icon-link">
            <IoPersonCircleOutline className="icon" />
          </a>
        </header>

        <section className="content">
          <h2>Manage Students</h2>
          <div className="content-header">
            <div className="actions">
              <p>{students.length} Students</p>
              <button
                className="add-btn"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    role: "",
                    address: "",
                  });
                  setShowModal(true);
                }}
              >
                + Add Student
              </button>
              <div className="filter-input-wrapper">
                <CiSearch className="filter-icon" />
                <input type="text" placeholder="Filter" className="filter-input" />
              </div>
            </div>
          </div>
          <table className="student-table">
            <thead className="thead">
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th className="status_thead">status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.phone}>
                  <td>{student.name}</td>
                  <td className="email">{student.email}</td>
                    <td className="status">
                      <span className="status active">Active</span>
                    </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student.phone)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {isEditing ? "Edit Student" : "Create Student"}
            </h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={isEditing}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label>Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="create-btn">
                  {isEditing ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
