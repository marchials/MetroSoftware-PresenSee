/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const DataGuru = () => {
  const [dataGuru, setDataGuru] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rfidScanned, setRfidScanned] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDataGuru();
  }, []);

  const fetchDataGuru = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/guru/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401)
        throw new Error("Token tidak valid atau kadaluarsa");
      const data = await response.json();
      setDataGuru(data.guru || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Gagal mengambil data guru");
    }
  };

  const handleScanRFID = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/modes/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modes: "ADD" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gagal mengubah mode ke ADD: ${errorText}`);
      }

      setRfidScanned(true);
      alert("Mode diubah ke ADD. Scan kartu RFID sekarang!");
    } catch (error) {
      console.error(error);
      alert(`Gagal scan RFID: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (guru) => {
    setIsEditing(guru.id_guru);
    setEditedData(guru);
  };

  const handleSave = async (id_guru) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/guru/${id_guru}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedData),
        }
      );
      if (!response.ok) throw new Error("Gagal menyimpan perubahan");
      fetchDataGuru();
      setIsEditing(null);
      alert("Data berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id_guru) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/guru/${id_guru}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDataGuru();
      alert("Data berhasil dihapus!");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-grow-1 bg-light min-vh-100 p-4">
        <h2 className="mb-4">Data Guru</h2>
        <div className="card mb-4">
          <div className="card-body">
            <button
              className="btn btn-warning"
              onClick={handleScanRFID}
              disabled={rfidScanned || isLoading}
            >
              {isLoading
                ? "Scanning..."
                : rfidScanned
                ? "RFID Terdeteksi"
                : "Scan RFID"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">Daftar Data Guru</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Jabatan</th>
                  <th>RFID Tag</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataGuru.map((guru, index) => (
                  <tr key={guru.id_guru}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing === guru.id_guru ? (
                        <input
                          type="text"
                          value={editedData.nama || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              nama: e.target.value,
                            })
                          }
                        />
                      ) : (
                        guru.nama
                      )}
                    </td>
                    <td>
                      {isEditing === guru.id_guru ? (
                        <input
                          type="text"
                          value={editedData.nip || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              nip: e.target.value,
                            })
                          }
                        />
                      ) : (
                        guru.nip
                      )}
                    </td>
                    <td>
                      {isEditing === guru.id_guru ? (
                        <input
                          type="text"
                          value={editedData.jabatan || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              jabatan: e.target.value,
                            })
                          }
                        />
                      ) : (
                        guru.jabatan
                      )}
                    </td>
                    <td>{guru.rfid_tag}</td>
                    <td>
                      {isEditing === guru.id_guru ? (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleSave(guru.id_guru)}
                        >
                          Simpan
                        </button>
                      ) : (
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(guru)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(guru.id_guru)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGuru;