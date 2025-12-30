import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">Task Manager</div>

        <div style={{ position: "relative" }}>
          <button className="btn" onClick={() => setOpen(!open)}>
            Get Started
          </button>

          {open && (
            <div className="dropdown">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Organize Your Tasks Efficiently</h1>
          <p>
            Manage tasks with priorities, deadlines, and status updates.
            Stay productive and focused.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
