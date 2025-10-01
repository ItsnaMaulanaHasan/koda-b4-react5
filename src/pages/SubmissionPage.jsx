import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function SubmissionPage() {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("surveyData") || "[]");
    setSurveyData(data);
  }, []);

  return (
    <section className="submission-container">
      <div className="submission-wrapper">
        {/* Header */}
        <div className="submission-header">
          <div className="header-back-button-wrapper">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <ArrowLeft size={20} />
              Kembali ke Form
            </button>
          </div>
          <h1 className="header-title">Data Submission Survey</h1>
          <p className="header-subtitle">Total responden: {surveyData.length} orang</p>
        </div>

        {/* Table */}
        <div className="table-container">
          {surveyData.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">Belum ada data submission.</p>
              <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-[#ff5f26] text-white rounded-lg hover:bg-[#e54e1a] transition">
                Isi Survey
              </button>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead className="table-head">
                  <tr>
                    <th className="table-header">No</th>
                    <th className="table-header">Nama Lengkap</th>
                    <th className="table-header">Umur</th>
                    <th className="table-header">Jenis Kelamin</th>
                    <th className="table-header">Status Perokok</th>
                    <th className="table-header">Merek Rokok</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyData.map((data, index) => (
                    <tr key={data.id} className="table-row">
                      <td className="table-cell">{index + 1}</td>
                      <td className="table-cell-name">{data.fullName}</td>
                      <td className="table-cell">{data.age} tahun</td>
                      <td className="table-cell">{data.gender === "man" ? "Laki-laki" : "Perempuan"}</td>
                      <td className="table-cell">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.isSmoker ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{data.isSmoker ? "Perokok" : "Bukan Perokok"}</span>
                      </td>
                      <td className="table-cell">
                        {data.cigaretteBrands.length > 0 ? (
                          <div className="brands-container">
                            {data.cigaretteBrands.map((brand) => (
                              <span key={brand} className="brand-badge">
                                {brand === "GudangGaram" ? "Gudang Garam" : brand === "LuckyStrike" ? "Lucky Strike" : brand}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="empty-brand">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SubmissionPage;
