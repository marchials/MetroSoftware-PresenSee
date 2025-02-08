import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AttendanceGuru() {
  const [dataAbsensi, setDataAbsensi] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fungsi fetch data
  const fetchData = () => {
    fetch("http://localhost:5000/api/absensi/guru")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const newestId = data[0].id_absensi_guru; // Ambil ID terbaru dari array pertama (anggap data urut dari terbaru)

          if (lastId === null) {
            // Set ID pertama kali saat komponen dimount (biar gak muncul alert awalnya)
            setLastId(newestId);
          } else if (newestId > lastId) {
            // Cek jika ada data baru
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000); // Hilangkan alert setelah 3 detik
            setLastId(newestId); // Update lastId ke yang terbaru
          }
        }
        setDataAbsensi(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData(); // Fetch pertama kali

    // Polling setiap 1 detik
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, []);

  return (
    <div className="min-vh-100 py-5 bg-white">
      <div className="container">
        {/* Alert berhasil */}
        {showAlert && (
          <div
            className="alert alert-success fade show custom-alert"
            role="alert"
          >
            <i className="bi bi-check-circle-fill me-2"></i> Absensi berhasil
            ditambahkan!
          </div>
        )}

        <div className="card border-0 shadow-lg mb-4 bg-light rounded-4">
          <div className="card-body text-center py-4">
            <h1 className="text-success mb-3 fw-bold">Selamat Datang di SDN Percobaan</h1>
            <div className="badge bg-success bg-opacity-50 px-4 py-2 text-success d-inline-block">
              <i className="bi bi-calendar3 me-2"></i>
              <span className="fw-bold">{currentDate}</span>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-lg bg-light rounded-4">
          <div className="card-body p-4">
            <h3 className="text-success mb-2">
              <i className="bi bi-person-workspace me-2"></i>
              Absensi Guru
            </h3>

            <div className="table-responsive">
              <table className="table table-hover custom-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
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
                  {dataAbsensi.length > 0 ? (
                    dataAbsensi.map((item, index) => (
                      <tr key={item.id_absensi_guru}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(item.waktu_masuk).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td>{item.guru.nama || "Tidak Diketahui"}</td>
                        <td>{item.guru.nip || "-"}</td>
                        <td>{item.guru.jabatan || "-"}</td>
                        <td>
                          {new Date(item.waktu_masuk).toLocaleTimeString(
                            "id-ID"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.keterangan_masuk === "Tepat Waktu"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {item.keterangan_masuk || "-"}
                          </span>
                        </td>
                        <td>
                          {item.waktu_pulang
                            ? new Date(item.waktu_pulang).toLocaleTimeString(
                                "id-ID"
                              )
                            : "-"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.keterangan_pulang === "Tepat Waktu"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {item.keterangan_pulang || "-"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-secondary">
                        <div className="py-4">
                          <i className="bi bi-inbox-fill fs-1 d-block mb-2"></i>
                          Tidak ada data absensi hari ini.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .custom-table thead th {
            background: rgb(40, 167, 70);
            color: rgb(0, 0, 0);
            border: none;
            padding: 1rem;
          }
          
          .custom-table tbody td {
            border-color: rgba(40, 167, 69, 0.1);
            padding: 1rem;
            vertical-align: middle;
          }
          
          .custom-table tbody tr:hover {
            background: rgba(40, 167, 69, 0.1);
          }
          
          .back-btn {
            transition: all 0.3s ease;
            background: rgb(40, 167, 70);
            border-radius: 10px;
          }
          
          .back-btn:hover {
            background: rgb(199, 5, 5);
            transform: translateX(-5px);
          }
          
          .badge {
            padding: 0.5em 1em;
            font-weight: 500;
          }

          .custom-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1050;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-size: 1rem;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default AttendanceGuru;
