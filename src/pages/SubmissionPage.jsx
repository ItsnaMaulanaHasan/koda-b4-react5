import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";

function SubmissionPage() {
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("surveyData") || "[]");
    setSurveyData(data);
  }, []);

  return (
    <section className="min-h-screen w-full bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <ArrowLeft size={20} />
              Kembali ke Form
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Data Submission Survey</h1>
          <p className="text-gray-600 mt-2">Total responden: {surveyData.length} orang</p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {surveyData.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">Belum ada data submission.</p>
              <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-[#ff5f26] text-white rounded-lg hover:bg-[#e54e1a] transition">
                Isi Survey
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama Lengkap</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Umur</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jenis Kelamin</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status Perokok</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Merek Rokok</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyData.map((data, index) => (
                    <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{data.fullName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{data.age} tahun</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{data.gender === "man" ? "Laki-laki" : "Perempuan"}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${data.isSmoker ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{data.isSmoker ? "Perokok" : "Bukan Perokok"}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {data.cigaretteBrands.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {data.cigaretteBrands.map((brand) => (
                              <span key={brand} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                                {brand === "GudangGaram" ? "Gudang Garam" : brand === "LuckyStrike" ? "Lucky Strike" : brand}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
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
