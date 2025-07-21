import React, { useEffect } from "react";
import { X } from "lucide-react";

const SIDEBAR_WIDTH = 260;

const Sidebar = ({
  items,
  onSelect,
  selected,
  isOpen,
  onClose,
  categoryName,
}) => {
  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // Sidebar content
  const sidebarContent = (
    <aside
      className="h-full bg-gray-100 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 z-30 w-[260px]"
      role="navigation"
      style={{ width: SIDEBAR_WIDTH }}
    >
      {/* Mobile close button */}
      <div className="flex md:hidden justify-end mb-4">
        <button onClick={onClose} aria-label="Close sidebar">
          <X size={28} />
        </button>
      </div>
      <ul className="list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className={`py-2 px-3 rounded mb-1 cursor-pointer transition font-medium ${
              selected === item
                ? "bg-green-600 text-white font-bold"
                : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              onSelect(item);
              if (onClose) onClose();
            }}
          >
            {categoryName ? `${categoryName} - ${item}` : item}
          </li>
        ))}
      </ul>
    </aside>
  );

  return (
    <>
      {/* Sidebar drawer for mobile */}
      <div className="md:hidden">
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={onClose}
          aria-label="Close sidebar overlay"
        ></div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 bg-gray-100 dark:bg-gray-800 shadow-lg ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: SIDEBAR_WIDTH }}
        >
          {sidebarContent}
        </div>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:block md:relative md:z-0 h-full">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
