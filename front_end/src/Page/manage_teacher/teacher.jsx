import { GoBell } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./css.css";

export default function Teacher() {
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
          <div className="content-header">
            <h2>Manage Students</h2>
            <div className="actions">
              <p>4 Students</p>
              <button className="add-btn">+ Add Student</button>
              <input type="text" placeholder="Filter" className="filter-input" />
            </div>
          </div>
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {["Student 1", "Student 2", "Student 3", "Student 4"].map(
                (name, idx) => (
                  <tr key={idx}>
                    <td>{name}</td>
                    <td>123@gmail.com</td>
                    <td>
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
    </div>
  );
}
