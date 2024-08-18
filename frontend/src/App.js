import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NavBar from "./components/common/NavBar";
import LoadingScreen from "./components/core/ScreenLoader/LoadingScreen";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      {
        loading === true && <LoadingScreen />
      }

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage type={"login"} />} />
        <Route path="/signup" element={<AuthPage type={"signup"} />} />
      </Routes>
    </div>
  );
}

export default App;
