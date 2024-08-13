import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const MobileNav = ({ toggleMenu }) => {
  return (
    <div
    //   onClick={toggleMenu}
    >
      <div
        className="bg-white fixed lg:hidden top-0 left-0 w-full max-w-80 md:max-w-96 h-screen py-5 
         text-black shadow-lg transition z-50  overscroll-contain overflow-scroll has-scrollbar"
      >
        <div
          className="flex items-center justify-between pb-7 text-xl px-7  border-b-[0.3px] 
        border-b-gray-200"
        >
          <h1>logo</h1>
          <button
            onClick={toggleMenu}
            className="lg:hidden text-xl hover:text-pink"
          >
            <IoMdClose />
          </button>
        </div>

        <ul className="text-[16px] py-2 border-b-[0.3px] border-b-gray-200 ">
          <li
            className="flex items-center justify-between cursor-pointer hover:text-pink transition-all px-7 py-2
           hover:bg-gray-100 "
          >
            <span> All Category</span>
            <button>
              <MdKeyboardArrowRight />
            </button>
          </li>
          <span className="block border-b-[0.3px]  border-b-gray-200 pt-2"></span>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/">Home</Link>
          </li>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/about">About Us</Link>
          </li>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/pages">Pages</Link>
          </li>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-4 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/shop">Shop</Link>
          </li>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-4 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/blog">Blog</Link>
          </li>
          <li
            onClick={toggleMenu}
            className="hover:text-pink transition-all px-7 py-4 hover:bg-gray-100 cursor-pointer"
          >
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
        <div className=" px-7  py-3">
          <Link
            onClick={toggleMenu}
            to="login"
            className="text-sm text-center block rounded-full border-[1px] border-gray-700 py-[6px] px-3 
             hover:border-pink hover:text-pink m-6"
          >
            login
          </Link>

          <Link
            onClick={toggleMenu}
            to="become-seller"
            className="text-sm text-center block rounded-full border-[1px] border-gray-700 py-[6px] px-3  
            hover:border-pink hover:text-pink m-6"
          >
            Vendor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
