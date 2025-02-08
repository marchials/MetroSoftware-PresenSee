import { useState, useEffect, useRef } from "react";

function AttendanceSiswa() {
  const [dataAbsensi, setDataAbsensi] = useState([]);
  const videoRef = useRef(null);

  // Format tanggal
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // Ambil data absensi dari backend
    fetch("http://localhost:5000/api/absensi/siswa")
      .then((response) => response.json())
      .then((data) => setDataAbsensi(data))
      .catch((error) => console.error("Error fetching data:", error));

    // Aktifkan kamera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();
  }, []);

  return (
    <div className="container-fluid bg-white vh-100 d-flex flex-column overflow-hidden p-3">
      <div className="container-fluid text-center py-3">
        <h1 className="fw-bold text-success">Selamat Datang di SDN Percobaan</h1>
        <p className="text-muted">{currentDate}</p>
      </div>

      <div className="container-fluid px-5 mb-4 d-flex justify-content-center">
        <div className="card border-success shadow-sm" style={{ width: '30%' }}>
          <div className="card-header bg-success text-white text-center">
            <h4 className="my-0">Face Recognition</h4>
          </div>
          <div className="card-body d-flex justify-content-center align-items-center">
            <video 
              ref={videoRef} 
              autoPlay 
              className="w-100 rounded border border-success"
            />
          </div>
        </div>
      </div>

      <div className="container-fluid px-5 flex-grow-1">
        <div className="card border-success shadow-sm h-100">
          <div className="card-header bg-success text-white text-center">
            <h4 className="my-0">Absensi Siswa</h4>
          </div>
          <div className="card-body p-0" style={{ overflowY: 'auto' }}>
            <table className="table table-hover table-striped mb-0">
              <thead className="table-success sticky-top">
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
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
                {dataAbsensi.length > 0 ? (
                  dataAbsensi.map((item, index) => (
                    <tr key={item.id_absensi_siswa}>
                      <td>{index + 1}</td>
                      <td>{new Date(item.waktu_masuk).toLocaleDateString("id-ID")}</td>
                      <td>{item.siswa.nama || "Tidak Diketahui"}</td>
                      <td>{item.siswa.nisn || "-"}</td>
                      <td>{item.siswa.kelas || "-"}</td>
                      <td>{new Date(item.waktu_masuk).toLocaleTimeString("id-ID")}</td>
                      <td>{item.keterangan_masuk || "-"}</td>
                      <td>{item.waktu_pulang ? new Date(item.waktu_pulang).toLocaleTimeString("id-ID") : "-"}</td>
                      <td>{item.keterangan_pulang || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      Tidak ada data absensi hari ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSiswa;