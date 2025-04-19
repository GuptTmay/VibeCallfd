import React from "react";

import Button from "../components/Button";
import Login from "../components/Login.jsx";
import Navbar from "../components/Navbar.jsx";
import RoomMenu from "../components/RoomMenu.jsx";
import Register from "../components/Register.jsx";

import meetImage from "../assets/HomePageImage.png";
import { AuthMenuStatus } from "../constants/AuthMenuStatus.js";

const HomePage = ({ authMenu, setAuthMenu }) => {
  return (
    <div className="flex flex-col justify-start items-center h-full w-full">
      <Navbar />
      <div className="flex items-center text-black h-full w-full">
        <div className="flex justify-center items-center -mt-12">
          <img className="w-170 h-125" src={meetImage} alt="Meeting Image" />
        </div>

        <div className="flex flex-col justify-start items-center flex-1 h-full">
          <div
            className={`text-5xl font-bold cursor-pointer transition-all duration-1000 text-center ${authMenu === AuthMenuStatus.DEFAULT ? "mt-36" : "mt-12"}`}
          >
            <span className="text-red-400">
              V<span className="text-5xl">ibe</span>
            </span>
            <span className="text-purple-400 ml-1">
              C<span className="text-5xl">all</span>
            </span>
          </div>
          <div className="mt-3 flex flex-col items-center justify-center text-xl font-medium text-pink-600 tracking-wide">
            <p>Connect with your</p>
            <p>
              friends{" "}
              <span className="text-purple-600 text-[1.4rem] font-semibold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500">
                instantly
              </span>
            </p>
          </div>

          {authMenu === AuthMenuStatus.DEFAULT && (
            <>
              <div className="flex mt-12 items-center gap-4">
                <Button
                  text="Register"
                  onClick={() => {
                    setAuthMenu(AuthMenuStatus.REGISTER);
                  }}
                />
                <span className="text-gray-500">or</span>
                <Button
                  text="Log In"
                  onClick={() => {
                    setAuthMenu(AuthMenuStatus.LOGIN);
                  }}
                />
              </div>
            </>
          )}

          {authMenu === AuthMenuStatus.LOGIN && (
            <Login setAuthMenu={setAuthMenu} />
          )}
          {authMenu === AuthMenuStatus.REGISTER && (
            <Register setAuthMenu={setAuthMenu} />
          )}
          {authMenu === AuthMenuStatus.AUTHENTICATED && (
            <RoomMenu setAuthMenu={setAuthMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
