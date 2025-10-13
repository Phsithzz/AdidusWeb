
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

  useEffect(() => {
    getUser();
  }, []);
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-6 ">
        <div className="p-10 border">

          <h1>{email}</h1>
          <h1>{name}</h1>
          <h1>{lastname}</h1>
          <h1>{role}</h1>
        </div>
      </div>
    </>
  );
};

export default PageUser;
