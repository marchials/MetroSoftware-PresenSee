import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const DataSiswa = () => {
  const [formInput, setFormInput] = useState({
    id_siswa: null,
    nama: "",
    nisn: "",
    kelas: "",
    face_encoding: "",
  });

  const [dataSiswa, setDataSiswa] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const fetchDataSiswa = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/siswa/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setDataSiswa(data.siswa || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableInputChange = (index, field, value) => {
    setDataSiswa((prev) => {
      const updatedData = [...prev];
      updatedData[index] = { ...updatedData[index], [field]: value };
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const newSiswa = {
        ...formInput,
        face_encoding: formInput.face_encoding
          ? JSON.parse(formInput.face_encoding)
          : [],
      };

      const response = await fetch("http://localhost:5000/api/siswa/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSiswa),
      });

      if (response.ok) {
        alert("Data siswa berhasil ditambahkan");
        fetchDataSiswa();
        setFormInput({ id_siswa: null, nama: "", nisn: "", kelas: "", face_encoding: "" });
      } else {
        alert("Gagal menambahkan data siswa");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleUpdate = async (siswa) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/siswa/${siswa.id_siswa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(siswa),
      });
      if (response.ok) {
        alert("Data siswa berhasil diperbarui");
        fetchDataSiswa();
        setIsEditing(null);
      } else {
        alert("Gagal memperbarui data siswa");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/siswa/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        alert("Data siswa berhasil dihapus");
        fetchDataSiswa();
      } else {
        alert("Gagal menghapus data siswa");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="container mt-4 flex-grow-1">
        <h2>Data Siswa</h2>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Input Data Siswa</h5>
            <form onSubmit={handleSubmit}>
              <input type="text" name="nama" value={formInput.nama} onChange={handleInputChange} placeholder="Nama" className="form-control mb-2" required />
              <input type="text" name="nisn" value={formInput.nisn} onChange={handleInputChange} placeholder="NISN" className="form-control mb-2" required />
              <input type="text" name="kelas" value={formInput.kelas} onChange={handleInputChange} placeholder="Kelas" className="form-control mb-2" required />
              <input type="text" name="face_encoding" value={formInput.face_encoding} onChange={handleInputChange} placeholder="Face Encoding (JSON)" className="form-control mb-2" required />
              <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Simpan Data"}</button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">Daftar Data Siswa</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NISN</th>
                  <th>Kelas</th>
                  <th>Face Encoding</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataSiswa.map((siswa, index) => (
                  <tr key={siswa.id_siswa}>
                    <td>{index + 1}</td>
                    <td>{isEditing === siswa.id_siswa ? <input type="text" value={siswa.nama} onChange={(e) => handleTableInputChange(index, "nama", e.target.value)} className="form-control" /> : siswa.nama}</td>
                    <td>{isEditing === siswa.id_siswa ? <input type="text" value={siswa.nisn} onChange={(e) => handleTableInputChange(index, "nisn", e.target.value)} className="form-control" /> : siswa.nisn}</td>
                    <td>{isEditing === siswa.id_siswa ? <input type="text" value={siswa.kelas} onChange={(e) => handleTableInputChange(index, "kelas", e.target.value)} className="form-control" /> : siswa.kelas}</td>
                    <td>{JSON.stringify(siswa.face_encoding).substring(0, 50)}...</td>
                    <td>
                      {isEditing === siswa.id_siswa ? <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(siswa)}>Simpan</button> : <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(siswa.id_siswa)}>Edit</button>}
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(siswa.id_siswa)}>Hapus</button>
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

export default DataSiswa;
