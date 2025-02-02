import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(true);
  
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };


// Function to handle navigation and scrolling
const handleNavigation = (event, sectionId) => {
  event.preventDefault(); // Prevent default anchor behavior

  if (location.pathname !== "/") {
    navigate("/", { replace: true }); // Navigate to home first
    setTimeout(() => scrollToSection(sectionId), 50); // Delay scrolling to ensure page loads
  } else {
    scrollToSection(sectionId); // Scroll immediately if already on home
  }
};

// Function to smoothly scroll to a section
const scrollToSection = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Automatically scroll to section when navigating back to home
useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => scrollToSection(hash), 50); // Ensure DOM is ready
  }
}, [location.pathname]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="TestDD.Ai" hidden="true"/>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => handleNavigation(e, item.url)}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === location.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
            <HamburgerMenu />
          </div>

        </nav>

        <Link to="/demo" className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">Demo</Link>

        <Link to="/signup" className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block">New Account</Link>
        <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;