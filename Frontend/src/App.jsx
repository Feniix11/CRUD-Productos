import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/Products/productList";
import Login from "./components/Login/login";
import NavBar from "../src/utilities/Navbar/navBar";
import Register from "./components/Register/register";
import { AuthProvider } from "../src/service/authContext";
import ProtectedRoute from "../src/components/ProtectedRoutes/protectedRoutes";

function App() {
  return (
    <div>
      <NavBar />
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/productos"
            element={<ProtectedRoute element={<ProductList />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
