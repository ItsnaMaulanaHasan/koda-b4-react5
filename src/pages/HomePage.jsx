import CardInput from "../components/CardInput";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import Alert from "../components/Alert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const surveyFormSchema = yup.object({
  fullName: yup.string().required("Nama harus diisi").min(3, "Nama minimal 3 karakter"),
  age: yup.number().required("Umur harus diisi").positive("Umur harus positif").integer("Umur harus bilangan bulat").min(13, "Umur minimal 13 tahun").max(100, "Umur maksimal 100 tahun").typeError("Umur harus berupa angka"),
  gender: yup.string().required("Jenis kelamin harus dipilih").oneOf(["man", "woman"], "Pilihan tidak valid"),
  isSmoker: yup.boolean().required("Pilih apakah Anda perokok atau tidak").typeError("Pilihan harus dipilih"),
  cigaretteBrands: yup.array().when("isSmoker", {
    is: true,
    then: (schema) => schema.min(1, "Pilih minimal 1 merek rokok jika Anda perokok"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function HomePage() {
  const navigate = useNavigate();
  const [cigaretteBrands, setCigaretteBrands] = useState([]);
  const [alertStatus, setAlertStatus] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(surveyFormSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      isSmoker: null,
      cigaretteBrands: [],
    },
  });

  const isSmoker = watch("isSmoker");
  const gender = watch("gender");

  const onSubmit = (data) => {
    try {
      const surveyData = {
        ...data,
        id: Date.now(),
      };

      const existingData = JSON.parse(localStorage.getItem("surveyData") || "[]");
      existingData.push(surveyData);
      localStorage.setItem("surveyData", JSON.stringify(existingData));

      setAlertStatus({
        type: "success",
        message: "Form berhasil disubmit! Mengalihkan ke halaman submission...",
      });

      setTimeout(() => {
        navigate("/submission");
      }, 1500);
    } catch (error) {
      setAlertStatus({
        type: "error",
        message: `Terjadi kesalahan saat menyimpan data. Silakan coba lagi: ${error}`,
      });
    }
  };

  const handleCheckboxChange = (brand) => {
    const currentBrands = cigaretteBrands.includes(brand) ? cigaretteBrands.filter((b) => b !== brand) : [...cigaretteBrands, brand];

    setCigaretteBrands(currentBrands);
    setValue("cigaretteBrands", currentBrands, { shouldValidate: true });
  };

  return (
    <section id="form-container" className="py-[1.25rem] min-w-[40%]">
      <form id="form-survey" className="form-survey" onSubmit={handleSubmit(onSubmit)} action="/submission" method="">
        <Alert type={alertStatus.type} message={alertStatus.message} onClose={() => setAlertStatus({ type: "", message: "" })} />
        {/* header */}
        <div className="form-header">
          <span className="form-title">Form Survey Perokok</span>
          <div className="divider"></div>
          <div className="header-info">
            <div className="user-email">
              hasanmaulana453@gmail.com{" "}
              <a className="change-account-link" href="">
                Ganti akun
              </a>
            </div>
            <img className="icon-small" src="/public/icon/icon-cloud-check.svg" alt="Icon Cloud Check" />
          </div>
          <div className="privacy-info">
            <img className="icon-small" src="/public/icon/icon-email-failed.svg" alt="Icon email failed" />
            Tidak dibagikan
          </div>
        </div>

        <CardInput
          label={<label htmlFor="fullName">Siapa nama Anda?</label>}
          input={
            <div>
              <Input id="fullName" type="text" {...register("fullName")} />
              {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="age">Berapa umur Anda</label>}
          input={
            <div>
              <Input id="age" type="number" {...register("age")} />
              {errors.age && <p className="error-message">{errors.age.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="man">Apa jenis kelamin Anda?</label>}
          input={
            <div>
              <div className="radio-group">
                <Radio id="man" checked={gender === "man"} onChange={() => setValue("gender", "man", { shouldValidate: true })} label="Laki-laki" />
                <Radio id="woman" checked={gender === "woman"} onChange={() => setValue("gender", "woman", { shouldValidate: true })} label="Perempuan" />
              </div>
              {errors.gender && <p className="error-message">{errors.gender.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="smoker">Apakah Anda seorang perokok?</label>}
          input={
            <div>
              <div className="radio-group">
                <Radio id="smoker" checked={isSmoker === true} onChange={() => setValue("isSmoker", true, { shouldValidate: true })} label="Ya" />
                <Radio
                  id="noSmoker"
                  checked={isSmoker === false}
                  onChange={() => {
                    setValue("isSmoker", false, { shouldValidate: true });
                    setCigaretteBrands([]);
                    setValue("cigaretteBrands", [], { shouldValidate: true });
                  }}
                  label="Tidak"
                />
              </div>
              {errors.isSmoker && <p className="radio-group">{errors.isSmoker.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="brands">Jika Anda perokok, rokok apa yang Anda pernah coba?</label>}
          input={
            <div>
              <div className="checkbox-group">
                <Checkbox checked={cigaretteBrands.includes("GudangGaram")} onChange={() => handleCheckboxChange("GudangGaram")} label="Gudang Garam" />
                <Checkbox checked={cigaretteBrands.includes("LuckyStrike")} onChange={() => handleCheckboxChange("LuckyStrike")} label="Lucky Strike" />
                <Checkbox checked={cigaretteBrands.includes("Marlboro")} onChange={() => handleCheckboxChange("Marlboro")} label="Marlboro" />
                <Checkbox checked={cigaretteBrands.includes("Esse")} onChange={() => handleCheckboxChange("Esse")} label="Esse" />
              </div>
              {errors.cigaretteBrands && <p className="error-message">{errors.cigaretteBrands.message}</p>}
            </div>
          }
        />
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Kirim
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setCigaretteBrands([]);
            }}
            className="reset-button"
          >
            Kosongkan formulir
          </button>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
