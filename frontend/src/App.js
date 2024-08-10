import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage type={"login"}/>} />
        <Route path="/signup" element={<AuthPage type={"signup"}/>} />
      </Routes>
    </div>
  );
}

export default App;
