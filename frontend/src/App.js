// import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import CartProvider from "./components/ContextReducer";
import Footer from "./components/Footer";

export const logo = "TummyYep"

function App() {
  return (
    <>
        <Toaster className="text-uppercase " />
      <CartProvider>
      <Header />
      <div className="height-100">
        <Outlet />
      </div>
      <Footer/>
      </CartProvider>
    </>
  );
}

export default App;
