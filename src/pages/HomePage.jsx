import CardInput from "../components/CardInput";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  const [cigaretteBrands, setCigaretteBrands] = useState([]);
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
    const surveyData = {
      ...data,
      id: Date.now(),
    };

    const existingData = JSON.parse(localStorage.getItem("surveyData") || "[]");
    existingData.push(surveyData);
    localStorage.setItem("surveyData", JSON.stringify(existingData));

    alert("Form berhasil disubmit!\n\nData telah disimpan. Cek console untuk melihat data.");

    reset();
    setCigaretteBrands([]);
  };

  const handleCheckboxChange = (brand) => {
    const currentBrands = cigaretteBrands.includes(brand) ? cigaretteBrands.filter((b) => b !== brand) : [...cigaretteBrands, brand];

    setCigaretteBrands(currentBrands);
    setValue("cigaretteBrands", currentBrands, { shouldValidate: true });
  };

  return (
    <section id="form-container" className="py-[1.25rem] min-w-[40%]">
      <form id="form-survey" className="flex flex-col gap-[0.75rem]" onSubmit={handleSubmit(onSubmit)} action="/submission" method="">
        {/* header */}
        <div className="flex flex-col gap-[1.5rem] p-[1.875rem] bg-white rounded-[12px] border-t-[10px] border-[#ff5f26]">
          <span className="font-[500] text-[2rem]">Form Survey Perokok</span>
          <div className="h-[1px] w-full bg-black"></div>
          <div className="flex justify-between items-center">
            <div className="font-[500] text-[#373737]">
              hasanmaulana453@gmail.com{" "}
              <a className="decoration-none font-normal text-[#377dff]" href="">
                Ganti akun
              </a>
            </div>
            <img className="h-[20px]" src="/public/icon/icon-cloud-check.svg" alt="Icon Cloud Check" />
          </div>
          <div className="flex items-center gap-[10px]">
            <img className="h-[20px]" src="/public/icon/icon-email-failed.svg" alt="Icon email failed" />
            Tidak dibagikan
          </div>
        </div>

        <CardInput
          label={<label htmlFor="fullName">Siapa nama Anda?</label>}
          input={
            <div>
              <Input id="fullName" type="text" {...register("fullName")} />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="age">Berapa umur Anda</label>}
          input={
            <div>
              <Input id="age" type="number" {...register("age")} />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="man">Apa jenis kelamin Anda?</label>}
          input={
            <div>
              <div className="flex flex-col gap-[0.625rem]">
                <Radio id="man" checked={gender === "man"} onChange={() => setValue("gender", "man", { shouldValidate: true })} label="Laki-laki" />
                <Radio id="woman" checked={gender === "woman"} onChange={() => setValue("gender", "woman", { shouldValidate: true })} label="Perempuan" />
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="smoker">Apakah Anda seorang perokok?</label>}
          input={
            <div>
              <div className="flex flex-col gap-[0.625rem]">
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
              {errors.isSmoker && <p className="text-red-500 text-sm mt-1">{errors.isSmoker.message}</p>}
            </div>
          }
        />

        <CardInput
          label={<label htmlFor="brands">Jika Anda perokok, rokok apa yang Anda pernah coba?</label>}
          input={
            <div>
              <div className="flex flex-col gap-[0.625rem]">
                <Checkbox checked={cigaretteBrands.includes("GudangGaram")} onChange={() => handleCheckboxChange("GudangGaram")} label="Gudang Garam" />
                <Checkbox checked={cigaretteBrands.includes("LuckyStrike")} onChange={() => handleCheckboxChange("LuckyStrike")} label="Lucky Strike" />
                <Checkbox checked={cigaretteBrands.includes("Marlboro")} onChange={() => handleCheckboxChange("Marlboro")} label="Marlboro" />
                <Checkbox checked={cigaretteBrands.includes("Esse")} onChange={() => handleCheckboxChange("Esse")} label="Esse" />
              </div>
              {errors.cigaretteBrands && <p className="text-red-500 text-sm mt-1">{errors.cigaretteBrands.message}</p>}
            </div>
          }
        />
        <div className="flex gap-[0.75rem]">
          <button type="submit" className="px-6 py-2 bg-[#ff5f26] text-white rounded-lg hover:bg-[#e54e1a] transition">
            Kirim
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setCigaretteBrands([]);
            }}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Kosongkan formulir
          </button>
        </div>
      </form>
    </section>
  );
}

export default HomePage;
