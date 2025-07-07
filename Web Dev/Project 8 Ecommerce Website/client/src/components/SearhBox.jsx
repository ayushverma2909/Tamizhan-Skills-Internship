import React, { useEffect, useRef, useState } from "react";

const dummySuggestions = [
  "Shoes",
  "Shirts",
  "Bags",
  "Beauty",
  "Bluetooth",
  "Books",
  "Bottle",
  "Blanket",
];

const SearchBox = ({ onClose }) => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    const filtered = dummySuggestions.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative w-60 animate-slide-fade z-10"
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring focus:border-blue-400 shadow"
      />
      {query && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white mt-1 border w-full rounded-md shadow-md text-sm">
          {filteredSuggestions.map((item, idx) => (
            <li
              key={idx}
              className="px-3 py-1 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setQuery(item);
                onClose();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
