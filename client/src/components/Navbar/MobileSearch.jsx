import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

// eslint-disable-next-line react/prop-types
const MobileSearch = ({ toggleSearch }) => {
  return (
    // <div className="lg:hidden fixed top-0 left-0 bg-overLayColor w-full h-full z-20">
    <div className="fixed top-4 left-[50%] -translate-x-2/4  bg-white h-[75%] w-[90%] z-[99]">
      <div className="flex items-center justify-between p-5 shadow">
        <form className="flex items-center relative">
          <input
            className=" focus:outline-0 bg-cultured border-[1px] border-primary rounded-[50px] w-[260px] 
                xs:w-[320px] md:w-[400px] py-2   pl-5 text-sm"
            type="search"
            name="search"
            placeholder="Enter your product name.... "
          />
          <button className="absolute top-2 right-[10px] text-gray-400 rounded-none bg-none ">
            <IoSearchOutline />
          </button>
        </form>

        <div>
          <button onClick={toggleSearch} className="hover:text-pink text-xl">
            <IoMdClose />
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default MobileSearch;
