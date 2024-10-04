import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import { AuthProvider } from "../src/service/authContext";
import ProtectedRoute from "../src/components/ProtectedRoutes/protectedRoutes";
import ProductsMenuComponents from "./components/Products/ProductsMenuComponents";
import HeaderComponent from "./components/Header/HeaderComponent";
import "../src/app.css";
import FooterComponent from "./components/Footer/FooterComponent";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          <Route
            path="/main"
            element={
              <ProtectedRoute
                element={
                  <>
                    <HeaderComponent />
                    <div className="main-content">
                      <ProductsMenuComponents />
                    </div>
                    <FooterComponent />
                  </>
                }
              />
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
