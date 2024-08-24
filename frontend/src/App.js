import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import NavBar from "./components/common/NavBar";
import LoadingScreen from "./components/core/ScreenLoader/LoadingScreen";
import { useSelector } from "react-redux";
import ErrorPage from "./pages/ErrorPage";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";

function App() {
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <NavBar />

      {
        loading === true && <LoadingScreen />
      }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <OpenRoute >
            <AuthPage type={"login"} />
          </OpenRoute>
        } />

        <Route path="/signup" element={
          <OpenRoute>
            <AuthPage type={"signup"} />
          </OpenRoute>
        } />
        
        <Route path="forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        }/>

        <Route path="/update-password/:token"
          element={
            <UpdatePassword />
          }
        />
        <Route path="/verify-email"
          element={
            <VerifyEmail />
          }
        />

        <Route path="/about"
          element={
            <About />
          }
        />

        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </div>
  );
}

export default App;
