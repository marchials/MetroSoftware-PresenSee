import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalAdmin: 0,
    totalGuru: 0,
    totalSiswa: 0,
    totalGuruAbsen: 0,
    totalSiswaAbsen: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Gagal mengambil data.");

        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-grow-1 bg-light min-vh-100 ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="container-fluid p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <span className="text-success">📊</span> Dashboard Overview
            </h2>
            <div className="text-muted">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-success bg-opacity-10 p-3">
                      👥
                    </div>
                    <div className="ms-3">
                      <h6 className="text-muted mb-1">Total Admin</h6>
                      <h3 className="mb-0">{stats.totalAdmin}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-primary bg-opacity-10 p-3">
                      👨‍🏫
                    </div>
                    <div className="ms-3">
                      <h6 className="text-muted mb-1">Total Guru</h6>
                      <h3 className="mb-0">{stats.totalGuru}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-info bg-opacity-10 p-3">
                      👩‍🎓
                    </div>
                    <div className="ms-3">
                      <h6 className="text-muted mb-1">Total Siswa</h6>
                      <h3 className="mb-0">{stats.totalSiswa}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-3">
                      📊
                    </div>
                    <div className="ms-3">
                      <h6 className="text-muted mb-1">Guru Absen Bulan Ini</h6>
                      <h3 className="mb-0">{stats.totalGuruAbsen}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-3">
                      📊
                    </div>
                    <div className="ms-3">
                      <h6 className="text-muted mb-1">Siswa Absen Bulan Ini</h6>
                      <h3 className="mb-0">{stats.totalSiswaAbsen}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
