import React, { useEffect } from "react";
import Headers from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

    const Home = () => {
    let navigate = useNavigate();
  useEffect(() => {
    fetch("https://login-system-ecommerce.herokuapp.com/verifyAccess", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
            navigate('/signUp')
            alert(data.msg)
        }
      });
  }, []);

  return (
    <div className="Home">
      <Headers />
    </div>
  );
};

export default Home;
