import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import { AuthProvider } from "../src/service/authContext";
import ProtectedRoute from "../src/components/ProtectedRoutes/protectedRoutes";
import ProductsMenuComponents from "./components/Products/ProductsMenuComponents";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/main"
            element={<ProtectedRoute element={<ProductsMenuComponents />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
