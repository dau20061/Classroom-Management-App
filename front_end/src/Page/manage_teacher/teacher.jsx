import { useState } from "react";
import { GoBell } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import "./css.css";

export default function Teacher() {
  const [showModal, setShowModal] = useState(false);

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
              <p>4 Students</p>
              <button className="add-btn" onClick={() => setShowModal(true)}>
                + Add Student
              </button>
              <div className="filter-input-wrapper">
                <CiSearch className="filter-icon" />
                <input
                  type="text"
                  placeholder="Filter"
                  className="filter-input"
                />
              </div>
            </div>
          </div>

          <table className="student-table">
            <thead className="thead">
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th className="status_thead">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {["Student 1", "Student 2", "Student 3", "Student 4"].map(
                (name, idx) => (
                  <tr key={idx}>
                    <td>{name}</td>
                    <td className="email">123@gmail.com</td>
                    <td className="status">
                      <span className="status active">Active</span>
                    </td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      </div>

      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowModal(false)} 
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="modal-title">Create Student</h2>
            <form className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input type="text" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label>Address</label>
                  <input type="text" />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="create-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
