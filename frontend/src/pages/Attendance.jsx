// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden bg-white">
      {/* Background decorative elements */}
      <div className="position-absolute green-glow start-0 top-0"></div>
      <div className="position-absolute green-glow end-0 bottom-0"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg p-4 bg-light rounded-4 animated-card">
              
              {/* Header Section */}
              <div className="card-header border-0 text-center py-4 bg-transparent">
                <h1 className="display-5 fw-bold text-success fade-in">PresenSee!</h1>
                <h2 className="h5 text-secondary slide-in">SDN Percobaan</h2>
                
                {/* Date display */}
                <div className="mt-3 py-2 px-4 bg-success bg-opacity-10 rounded-pill bounce-in">
                  <p className="text-success mb-0">
                    <i className="bi bi-calendar3 me-2"></i>
                    {currentDate}
                  </p>
                </div>
              </div>

              {/* Button Group */}
              <div className="d-grid gap-3 px-lg-3">
                <button
                  className="btn btn-lg py-3 btn-attendance zoom-in"
                  onClick={() => navigate("/attendance/guru")}
                >
                  <span className="h5 mb-0 d-flex align-items-center justify-content-center">
                    <i className="bi bi-person-workspace me-3"></i>
                    Guru
                  </span>
                </button>

                <button
                  className="btn btn-lg py-3 btn-attendance zoom-in"
                  onClick={() => navigate("/attendance/siswa")}
                >
                  <span className="h5 mb-0 d-flex align-items-center justify-content-center">
                    <i className="bi bi-mortarboard me-3"></i>
                    Siswa
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .green-glow {
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, rgba(52, 211, 153, 0) 80%);
            filter: blur(60px);
            animation: pulse 3s infinite alternate ease-in-out;
          }

          .btn-attendance {
            background: linear-gradient(135deg, #28a745, #218838);
            border: none;
            color: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .btn-attendance:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.5);
          }

          .btn-attendance::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transform: skewX(-30deg);
            transition: 0.5s;
          }

          .btn-attendance:hover::before {
            left: 100%;
          }

          @keyframes pulse {
            from {
              transform: scale(1);
              opacity: 0.6;
            }
            to {
              transform: scale(1.2);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes bounceIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes zoomIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .fade-in { animation: fadeIn 1s ease-in-out; }
          .slide-in { animation: slideIn 1s ease-in-out; }
          .bounce-in { animation: bounceIn 0.8s ease-in-out; }
          .zoom-in { animation: zoomIn 0.8s ease-in-out; }
        `}
      </style>
    </div>
  );
};

export default Attendance;
