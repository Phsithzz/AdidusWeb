import Navbar from "../components/Navbar.jsx";
import { useState } from "react";
import { useEffect } from "react";
import * as users from "../function/user.js";

const PageUser = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [role, setRole] = useState(null);
  const [login, setLogin] = useState(false);

  const [imageUser, setImageUser] = useState(false);
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    getUser();
   

  }, []);
 useEffect(()=>{
 if (email) checkImage();
 },[email])
  const getUser = async () => {
    await users
      .getUser()
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        setName(res.data.name);
        setLastname(res.data.lastname);
        setRole(res.data.role);
        setLogin(res.data.login);
      })
      .catch((err) => console.log(err.message));
  };

  const checkImage = async () => {
    const image = new Image();
    image.src = `${import.meta.env.VITE_API}/img_users/${email}.jpg`;

    image.onload = () => {
      setImageUser(true);
    };
    image.onerror = () => {
      setImageUser(false);
    };
  };

  const onFileChange = async (e) => {
    setFile(e.target.files[0]);
  };
  const uploadFile = async () => {
    if (!file) {
      setMessage("เลือกFile เพื่อ Upload");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", file);

    try {
      const res = await users.uploadUser(formData);
      setMessage(res.message );
      checkImage();
    } catch (err) {
      console.log(err);
      setMessage("Upload Fail");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 ">
        <div className="p-10 border">
          <img
            src={
              imageUser
                ? `${import.meta.env.VITE_API}/img_users/${email}.jpg`
                : `${import.meta.env.VITE_API}/img_users/default.jpg`
            }
            alt={email}
          />

          <h1>{email}</h1>
          <h1>{name}</h1>
          <h1>{lastname}</h1>
          <h1>{role}</h1>
          <input type="file" onChange={onFileChange} />
          <button
            onClick={uploadFile}
            className="mt-2 px-4 py-2 border cursor-pointer bg-black text-white rounded-md hover:bg-white hover:text-black trantsition ease-in duration-200"
          >
           Save
          </button>
          {message && <p className="mt-2 text-green-500">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default PageUser;
