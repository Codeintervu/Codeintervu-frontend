import { ArrowRight } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <div>
      <section
        id="home"
        className="pt-32 pb-20 bg-[url('/assets/images/hero-bg.svg')] dark:bg-[url('/assets/images/hero-bg-dark.svg')] bg-cover bg-center"
      >
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8">
          {/* Left Text Content */}
          <div className="md:w-1/2 animate-slide-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-league-spartan leading-tight text-gray-800 dark:text-white">
              Learn to Code.
              <br />
              Build Cool Stuff.
              <br />
              <span className="text-kappel dark:text-teal-400">Get Hired.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Bite-sized tutorials, real projects, and expert guidance — all in
              one platform. From basics to building full-stack apps , we've got
              your back.
            </p>

            <div>
              <span className="inline-flex items-center gap-2 bg-kappel dark:bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg text-lg">
                Start Your First Lesson Now – It's 100% Free!
              </span>
            </div>
          </div>

          {/* Right Banner Images */}
          <div className="md:w-1/2 grid grid-cols-2 gap-6 relative animate-slide-right">
            <div className="rounded-tr-[70px] rounded-bl-[110px] overflow-hidden transform hover:scale-105 transition duration-500">
              <img
                src="/assets/images/hero-banner-1.jpg"
                alt="Hero banner"
                className="w-4/5 h-full object-cover"
              />
            </div>
            <div className="rounded-tl-[50px] rounded-br-[90px] overflow-hidden mt-16 transform hover:scale-105 transition duration-500">
              <img
                src="/assets/images/hero-banner-2.jpg"
                alt="Hero banner"
                className="w-full h-full object-cover"
              />
            </div>
            {/* <img
              src="/assets/images/hero-shape-1.svg"
              alt=""
              className="absolute -bottom-10 -left-10 z-10 hidden lg:block animate-fade-in dark:opacity-50"
            /> */}
            <img
              src="/assets/images/hero-shape-2.png"
              alt=""
              className="absolute -top-20 -right-20 z-0 hidden lg:block animate-fade-in delay-200 dark:opacity-50"
            />
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        .animate-slide-left {
          animation: slideLeft 1s ease-out;
        }

        .animate-slide-right {
          animation: slideRight 1s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
        }

        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Hero;
