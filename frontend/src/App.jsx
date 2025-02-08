import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Attendance from "./pages/Attendance";
import AttendanceGuru from "./pages/AttendanceGuru";
import AttendanceSiswa from "./pages/AttendanceSiswa";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PresenSee from "./pages/PresenSee";
import DataGuru from "./pages/DataGuru";
import DataSiswa from "./pages/DataSiswa";
import Laporan from "./pages/Laporan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance/guru" element={<AttendanceGuru />} />
        <Route path="/attendance/siswa" element={<AttendanceSiswa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presensee" element={<PresenSee />} />
        <Route path="/guru" element={<DataGuru />} />
        <Route path="/siswa" element={<DataSiswa />} />
        <Route path="/laporan" element={<Laporan />} />
      </Routes>
    </Router>
  );
}

export default App;
