import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import MobileNav from "./MobileNav";
import MobileSearch from "./MobileSearch";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="shadow-lg h-32 ">
      <div className="flex justify-between items-center px-10  xl:px-24 pt-3 h-16 border-l-0 ">
        <div>Logo Here</div>
        <div className="hidden lg:block">
          <form className="flex items-center relative">
            <button className="absolute top-4 left-4 mr-4 text-gray-400 rounded-none bg-none ">
              <IoSearchOutline />
            </button>
            <input
              className=" focus:outline-0 bg-cultured border-[1px] border-primary rounded-[50px] 
              rounded-r-none w-[400px] 
              py-2 placeholder:pl-5 pl-6"
              type="search"
              name="search"
              placeholder="Enter your product name...."
            />
            <button className="py-2.5 px-4 bg-primary text-white text-base rounded-r-sm">
              Search
            </button>
          </form>
        </div>

        <div className="flex gap-10 items-center text-xl">
          {showSearch ? (
            <>
              <div
                onClick={toggleSearch}
                className="lg:hidden fixed top-0 left-0 bg-overLayColor w-full h-full z-20"
              ></div>
              <MobileSearch
                toggleSearch={toggleSearch}
                showSearch={showSearch}
              />
            </>
          ) : null}
          <button
            onClick={toggleSearch}
            className="md:hidden text-2xl hover:text-primary"
          >
            <IoSearchOutline />
          </button>
          <button className="relative hover:text-primary">
            <span
              className="absolute -top-3 -right-2 min-w-2 px-[6px] lg:px-[7px] text-sm  text-center rounded-full bg-primary
             text-white"
            >
              5
            </span>
            <IoIosHeartEmpty size={28} />
          </button>
          <button className="relative hover:text-primary">
            <span
              className="absolute -top-3 -right-2 min-w-2 px-[6px] lg:px-[7px] text-sm  
              text-center rounded-full bg-primary
             text-white"
            >
              4
            </span>
            <BsCart3 size={25} />
          </button>
          <div className="hidden md:block">
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
                <FaRegUser />
              </button>
            ) : (
              <Link
                to="become-seller"
                className="hidden lg:flex items-center gap-2 text-sm border-[1px] rounded-full 
                border-darkGray py-2 pl-5 pr-3 hover:border-primary hover:text-primary"
              >
                Vendor <MdKeyboardArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div
        className="flex justify-between items-center px-10  xl:px-24 mt-3 h-12 lg:h-14 border-l-0 border-none
         bg-black text-white text-base"
      >
        <div className="flex items-center gap-7 ">
          <Link
            to="/categories"
            className="flex items-center gap-2 text-xs lg:text-sm py-4 lg:py-[18px] px-3 lg:px-5 mr-5 bg-primary hover:opacity-80"
          >
            <MdMenu /> <span>All Categories</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-7 text-sm">
            <li className="hover:text-pink transition-all  ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pages"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                Pages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-pink"
                    : "text-white hover:text-pink transition-all"
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <div>
            {showMenu ? (
              <button
                onClick={toggleMenu}
                className="lg:hidden text-xl hover:text-pink"
              >
                <IoMdClose />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className="lg:hidden text-xl hover:text-pink"
              >
                <MdMenu />
              </button>
            )}
            {showMenu ? (
              <>
                <div
                  onClick={toggleMenu}
                  className="bg-overLayColor fixed lg:hidden top-0 left-0 w-full h-screen z-0 "
                ></div>
                <MobileNav toggleMenu={toggleMenu} />
              </>
            ) : null}
          </div>

          <button
            onClick={handleLogin}
            className="hidden lg:block pb-2 pt-[5px] px-7  rounded-full bg-primary text-[14px] text-white hover:opacity-85"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
