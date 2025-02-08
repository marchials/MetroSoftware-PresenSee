import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isOpen = false, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/presensee", label: "PresenSee", icon: "📊" },
    { path: "/guru", label: "Data Guru", icon: "👨‍🏫" },
    { path: "/siswa", label: "Data Siswa", icon: "👩‍🎓" },
    { path: "/laporan", label: "Laporan", icon: "📄" },
  ];

  return (
    <div
      className={`sidebar bg-success bg-gradient text-white min-vh-100 transition-all d-flex flex-column ${
        isOpen ? "p-3" : "p-2 align-items-center"
      }`}
      style={{ width: isOpen ? "250px" : "70px", transition: "width 0.3s ease" }}
    >
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-sm btn-outline-light" onClick={toggleSidebar}>
          {isOpen ? "←" : "☰"}
        </button>
        {isOpen && <h4 className="mb-0 ms-3">PresenSee!</h4>}
      </div>

      <nav className="flex-grow-1 w-100">
        <ul className="nav flex-column gap-3 w-100">
          {menuItems.map(({ path, label, icon }) => (
            <li key={path}>
              <button
                className={`btn w-100 text-start d-flex align-items-center gap-2 px-3 py-2 ${
                  location.pathname === path ? "btn-light text-dark" : "btn-outline-light"
                }`}
                onClick={() => navigate(path)}
              >
                <span>{icon}</span> {isOpen && <span>{label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="btn btn-danger w-100 d-flex align-items-center gap-2 justify-content-center mt-3"
        onClick={handleLogout}
      >
        🚪 {isOpen && "Logout"}
      </button>
    </div>
  );
}

export default Sidebar;
