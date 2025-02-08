import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Sidebar from "../components/Sidebar";

const Laporan = () => {
  const [dataGuru, setDataGuru] = useState([]);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedData, setSelectedData] = useState("guru");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    if (!startDate || !endDate) return;

    try {
      if (selectedData === "guru") {
        const resGuru = await fetch(
          `http://localhost:5000/api/absensi/guru?startDate=${startDate}&endDate=${endDate}`
        );
        const dataGuru = await resGuru.json();
        setDataGuru(dataGuru);
        setDataSiswa([]);
      } else {
        const resSiswa = await fetch(
          `http://localhost:5000/api/absensi/siswa?startDate=${startDate}&endDate=${endDate}`
        );
        const dataSiswa = await resSiswa.json();
        setDataSiswa(dataSiswa);
        setDataGuru([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, filename);
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="container mt-4">
        <h2 className="mb-4">Laporan Absensi</h2>

        {/* Input Rentang Tanggal & Pilihan Data */}
        <div className="card mb-4 p-3">
          <h5>Pilih Rentang Tanggal</h5>
          <div className="row">
            <div className="col-md-4">
              <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-md-4">
              <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="col-md-4">
              <select className="form-control" value={selectedData} onChange={(e) => setSelectedData(e.target.value)}>
                <option value="guru">Data Absensi Guru</option>
                <option value="siswa">Data Absensi Siswa</option>
              </select>
            </div>
            <div className="col-md-12 mt-2">
              <button className="btn btn-warning w-100" onClick={fetchData}>Tampilkan</button>
            </div>
          </div>
        </div>

        {/* Tabel Data */}
        {selectedData === "guru" && (
          <div className="card mb-4 p-3">
            <h5 className="mb-3">Laporan Guru</h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
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
                  {dataGuru.length > 0 ? (
                    dataGuru.map((guru) => (
                      <tr key={guru.nip}>
                        <td>{guru.nama}</td>
                        <td>{guru.nip}</td>
                        <td>{guru.jabatan}</td>
                        <td>{guru.waktuMasuk}</td>
                        <td>{guru.keteranganMasuk}</td>
                        <td>{guru.waktuPulang}</td>
                        <td>{guru.keteranganPulang}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={() => exportToExcel(dataGuru, "laporan_guru.xlsx")}>Unduh Laporan Guru</button>
          </div>
        )}

        {selectedData === "siswa" && (
          <div className="card p-3">
            <h5 className="mb-3">Laporan Siswa</h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
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
                  {dataSiswa.length > 0 ? (
                    dataSiswa.map((siswa) => (
                      <tr key={siswa.nisn}>
                        <td>{siswa.nama}</td>
                        <td>{siswa.nisn}</td>
                        <td>{siswa.kelas}</td>
                        <td>{siswa.waktuMasuk}</td>
                        <td>{siswa.keteranganMasuk}</td>
                        <td>{siswa.waktuPulang}</td>
                        <td>{siswa.keteranganPulang}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Tidak ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-success" onClick={() => exportToExcel(dataSiswa, "laporan_siswa.xlsx")}>Unduh Laporan Siswa</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Laporan;
