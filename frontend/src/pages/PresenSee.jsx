import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const PresenSee = () => {
  const [guruData, setGuruData] = useState([]);
  const [siswaData, setSiswaData] = useState([]);
  const [sortGuru, setSortGuru] = useState({ key: "", ascending: true });
  const [sortSiswa, setSortSiswa] = useState({ key: "", ascending: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchGuru();
    fetchSiswa();
  }, []);

  const fetchGuru = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/absensi/guru");
      const data = await response.json();
      setGuruData(data);
    } catch (error) {
      console.error("Gagal mengambil data guru", error);
    }
  };

  const fetchSiswa = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/absensi/siswa");
      const data = await response.json();
      setSiswaData(data);
    } catch (error) {
      console.error("Gagal mengambil data siswa", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="container mt-4">
        <h2 className="text-center">PresenSee - Monitoring Absensi</h2>
        <div className="text-muted">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        {/* Tabel Guru */}
        <h4 className="mt-4">Absensi Guru Hari Ini</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-success">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIP</th>
                <th>Jabatan</th>
                <th>Waktu Masuk</th>
                <th>Keterangan Masuk</th>
                <th>Waktu Pulang</th>
                <th>Keterangan Pulang</th>
              </tr>
            </thead>
            <tbody>
              {guruData.map((guru, index) => (
                <tr key={guru.id_absensi_guru}>
                  <td>{index + 1}</td>
                  <td>{guru.guru?.nama}</td>
                  <td>{guru.guru?.nip}</td>
                  <td>{guru.guru?.jabatan}</td>
                  <td>{guru.waktu_masuk}</td>
                  <td>{guru.keterangan_masuk}</td>
                  <td>{guru.waktu_pulang || "-"}</td>
                  <td>{guru.keterangan_pulang || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabel Siswa */}
        <h4 className="mt-4">Absensi Siswa Hari Ini</h4>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-success">
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NISN</th>
                <th>Kelas</th>
                <th>Waktu Masuk</th>
                <th>Keterangan Masuk</th>
                <th>Waktu Pulang</th>
                <th>Keterangan Pulang</th>
              </tr>
            </thead>
            <tbody>
              {siswaData.map((siswa, index) => (
                <tr key={siswa.id_absensi_siswa}>
                  <td>{index + 1}</td>
                  <td>{siswa.siswa?.nama}</td>
                  <td>{siswa.siswa?.nisn}</td>
                  <td>{siswa.siswa?.kelas}</td>
                  <td>{siswa.waktu_masuk}</td>
                  <td>{siswa.keterangan_masuk}</td>
                  <td>{siswa.waktu_pulang || "-"}</td>
                  <td>{siswa.keterangan_pulang || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PresenSee;
