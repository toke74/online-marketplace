import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/NavbarPages/Home";
import Login from "./pages/AuthPages/Login";
import SignUp from "./pages/AuthPages/SignUp";
import About from "./pages/NavbarPages/About";
import BecomeSeller from "./pages/NavbarPages/BecomeSeller";
import Blog from "./pages/NavbarPages/Blog";
import Pages from "./pages/NavbarPages/Pages";
import Shop from "./pages/NavbarPages/Shop";
import Contact from "./pages/NavbarPages/Contact";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-5 px-10  xl:px-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <h1>Welcome to Online Marketplace</h1>
      </div>
    </>
  );
};

export default App;
