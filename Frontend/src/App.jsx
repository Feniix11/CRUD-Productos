import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../src/service/authContext";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProductMain from "./components/Products/ProductMain";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/main"
            element={<ProtectedRoute element={<ProductMain />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
