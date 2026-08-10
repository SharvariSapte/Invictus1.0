import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { name: "BRIEFING", id: "briefing" },
    { name: "TIMELINE", id: "timeline" },
    { name: "WAR ROOM", id: "war-room" },
    { name: "COMMUNICATIONS", id: "communications" },
    { name: "CONTACT HQ", id: "contact-hq" },
    { name: "RECRUITMENT", id: "recruitment" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/80 to-black/0">

      {/* Main navbar */}
      <div className="h-[70px] px-6 md:px-10 flex items-center justify-between">

        {/* LEFT - Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >

          {/* Military emblem */}
          <div className="text-[#d8c9ad] text-2xl">
            ★
          </div>

          <div className="leading-none">
            <h1 className="text-[#e5dccb] tracking-[0.25em] text-xl font-serif">
              INVICTUS
            </h1>

            <p className="text-[#a99b85] text-[9px] tracking-[0.3em] mt-1">
              OPERATION 1944
            </p>
          </div>

        </div>


        {/* CENTER - Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="
                relative
                text-[#cfc3ad]
                text-xs
                tracking-[0.25em]
                font-medium
                py-2
                transition-all
                duration-300
                hover:text-[#f0e5d1]

                after:absolute
                after:left-0
                after:bottom-0
                after:w-0
                after:h-[1px]
                after:bg-[#b86a45]
                after:transition-all
                after:duration-300
                hover:after:w-full
              "
            >
              {item.name}
            </button>
          ))}

        </div>


        {/* RIGHT - Status */}
        <div className="hidden md:flex items-center gap-3">

          {/* Status dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a64f2d] opacity-60"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a64f2d]"></span>
          </span>

          <span className="text-[#a99b85] text-[10px] tracking-[0.2em]">
            OPERATION ACTIVE
          </span>

        </div>


        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#d8c9ad] text-2xl"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </div>


      {/* Bottom line */}
      <div className="mx-6 md:mx-10 border-b border-[#d0c1a8]/20"></div>


      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            md:hidden
            absolute
            top-[76px]
            left-0
            w-full
            bg-[#15120f]/95
            backdrop-blur-md
            border-b
            border-[#d0c1a8]/20
          "
        >

          <div className="flex flex-col px-8 py-5">

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="
                  text-left
                  py-4
                  text-[#cfc3ad]
                  text-xs
                  tracking-[0.25em]
                  border-b
                  border-[#d0c1a8]/10
                  hover:text-[#f0e5d1]
                  transition
                "
              >
                {item.name}
              </button>
            ))}

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;