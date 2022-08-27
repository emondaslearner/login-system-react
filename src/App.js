import "./App.css";
import LoginAndRegister from "./components/LoginAndRegister/LoginAndRegister";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signUp" element={<LoginAndRegister />} />
    </Routes>
  );
}

export default App;
