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
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import Setting from "./components/core/Dashboard/Setting/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import AddCourses from "./components/core/Dashboard/AddCourses/AddCourses";

function App() {
  const loading = useSelector((state) => state.auth.loading);
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="relative w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />

      {loading === true && <LoadingScreen />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <AuthPage type={"login"} />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <AuthPage type={"signup"} />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:token"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/setting" element={<Setting />} />

          {user?.accountType == ACCOUNT_TYPE.STUDENT ? (
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          ):
          <>
            <Route
              path="/dashboard/my-courses"
              element={<MyCourses />}
            />
            <Route
              path="/dashboard/add-course"
              element={<AddCourses />}
            />
          </>
          }
        </Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
