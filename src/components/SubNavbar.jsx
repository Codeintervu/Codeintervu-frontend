import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FiLoader, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatCategoryPath } from "../utils/pathUtils";

const SubNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories for SubNavbar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories, loading]);

  const scrollBy = (amount) => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const activeLinkStyle = {
    backgroundColor: "#04AA6D", // W3Schools green
    color: "white",
  };

  return (
    <nav className="bg-[#282A35] shadow-sm border-b border-black sticky top-[62px] z-40">
      <div className="container mx-auto px-4 flex items-center">
        {/* Left Arrow */}
        <button
          className={`mr-1 p-1 rounded-full bg-[#23242a] text-white transition-opacity ${
            canScrollLeft ? "opacity-100" : "opacity-30 cursor-default"
          }`}
          onClick={() => canScrollLeft && scrollBy(-150)}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <FiChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex items-center justify-start space-x-1 overflow-x-auto py-1 scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-2">
              <FiLoader className="animate-spin text-white" />
              <span className="text-white text-sm">Loading...</span>
            </div>
          ) : (
            categories.map((category) => (
              <NavLink
                key={category._id}
                to={formatCategoryPath(category.path)}
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                className="text-white hover:bg-[#4a4e69] px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors"
              >
                {category.name}
              </NavLink>
            ))
          )}
        </div>
        {/* Right Arrow */}
        <button
          className={`ml-1 p-1 rounded-full bg-[#23242a] text-white transition-opacity ${
            canScrollRight ? "opacity-100" : "opacity-30 cursor-default"
          }`}
          onClick={() => canScrollRight && scrollBy(150)}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </nav>
  );
};

export default SubNavbar;
