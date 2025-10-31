import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import * as user from "../function/user.js";
const EditProfileAdmin = ({
  onCancel,
  name,
  setName,
  lastname,
  setLastname,
  email,
  setEmail,
  image,
  checkImage,
}) => {
  // เพิ่ม state สำหรับเก็บค่าชั่วคราว
  const [tempName, setTempName] = useState("");
  const [tempLastname, setTempLastname] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // สำหรับ preview image
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTempName(name || "");
    setTempLastname(lastname || "");
    setTempEmail(email || "");
  }, [name, lastname, email]);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleUpdateInfo = async () => {
    const userData = {
      name: tempName,
      lastname: tempLastname,
      email: tempEmail,
    };
    try {
      await user.userEditInfo(email, userData);
      setName(tempName);
      setLastname(tempLastname);
      setEmail(tempEmail);
      onCancel();
    } catch (err) {
      console.log(err);
      onCancel()  
    }
  };

  const handleFileChange = (e) => {
const selectedFile = e.target.files[0];
if (selectedFile) {
  setFile(selectedFile);
  setPreview(URL.createObjectURL(selectedFile));
}
  };

  const handleUploadImage = async () => {
    if (!file) return alert("เลือกไฟล์ก่อนอัปโหลด");
    const formData = new FormData();
    formData.append("email", tempEmail);
    formData.append("file", file);

    setLoading(true);
    try {
      await user.uploadUser(formData);
      checkImage(); 
      setFile(null);
      setPreview(null);
      onCancel()  
    } catch (err) {
      console.log(err);
      alert("Upload Fail");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold">แก้ไขโปรไฟล์</h1>
        <div className="flex gap-4 flex-wrap items-center justify-between ">
          <div className="flex flex-col relative  ">
            <img
              src={
                preview ? preview: image
                  ? `${
                      import.meta.env.VITE_API
                    }/img_users/${email}.jpg?${Date.now()}`
                  : `${import.meta.env.VITE_API}/img_users/default.jpg`
              }
              alt={email}
              className="rounded-full w-[200px] h-[200px] bg-contain"
            />
            <label className="flex absolute cursor-pointer bottom-0 rounded-full w-12 h-12 items-center justify-center right-0 gap-2 bg-black">
              <FaRegEdit className="text-white text-xl font-semibold" />
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="nameAdmin">ชื่อ</label>
              <input
                type="text"
                id="nameAdmin"
                required
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="border-2 border-gray-200 py-2 rounded-md  px-4"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="lastnameAdmin">นามสกุล</label>
              <input
                type="text"
                id="lastnameAdmin"
                required
                className="border-2 border-gray-200 py-2 rounded-md  px-4"
                value={tempLastname}
                onChange={(e) => setTempLastname(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="emailAdmin">อีเมล</label>
              <input
                type="email"
                id="emailAdmin"
                required
                className="border-2 border-gray-200 py-2 rounded-md  px-4"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </div>
          </form>

          {file && (
            <button
              type="button"
              onClick={handleUploadImage}
              disabled={loading}
              className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-white hover:text-black hover:border transition ease-out duration-200"
            >
              {loading ? "Uploading..." : "อัปโหลดรูป"}
            </button>
          )}
          <div className="flex gap-4  justify-between">
            <button
              type="button"
              onClick={()=>{setPreview(null); // ✅ reset ตอนปิด
                                  setFile(null); onCancel()}}
              
              className="cursor-pointer px-4 py-2 border-2 w-full hover:border-red-600  transition ease-in duration-200 text-black rounded-md  text-center bg-white  font-semibold"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleUpdateInfo}
              className="cursor-pointer border-2 px-4 py-2 text-white hover:bg-white w-full hover:text-black transition ease-in duration-200  rounded-md  text-center bg-black font-semibold"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileAdmin;