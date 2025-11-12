import React, { useState, useRef, useEffect } from "react";

const AsyncDropDown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Simulated async API fetch — replace this with your actual fetch call
  const fetchOptions = async (search) => {
    setLoading(true);
    // simulate API latency
    await new Promise((res) => setTimeout(res, 700));

    // Example API behavior — return filtered frameworks
    const all = [
      "React",
      "Vue",
      "Angular",
      "Svelte",
      "Next.js",
      "Nuxt.js",
      "Ember",
      "SolidJS",
      "Preact",
    ];
    const filtered = all.filter((o) =>
      o.toLowerCase().includes(search.toLowerCase())
    );

    setOptions(filtered);
    setLoading(false);
  };

  // fetch options when query changes
  useEffect(() => {
    fetchOptions(query);
  }, [query]);

  const addOption = (option) => {
    setSelected((prev) => [...prev, option]);
    setQuery("");
    requestAnimationFrame(() =>
      inputRef.current && inputRef.current.focus()
    );
  };

  const removeTag = (tag) => {
    setSelected((prev) => prev.filter((t) => t !== tag));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelected([]);
    setQuery("");
    inputRef.current && inputRef.current.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === "Backspace" && query === "" && selected.length) {
      setSelected((prev) => prev.slice(0, prev.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed) return;
      if (!selected.includes(trimmed)) {
        addOption(trimmed);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-80" ref={containerRef}>
      {/* Input Area */}
      <div
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1 bg-white cursor-text"
        onClick={() => {
          setOpen(true);
          inputRef.current && inputRef.current.focus();
        }}
      >
        <div className="flex-1 flex flex-wrap items-center gap-1">
          {selected.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full"
            >
              <span>{item}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(item);
                }}
                className="text-xs px-1 rounded-full hover:bg-blue-200"
              >
                ✕
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className="flex-1 min-w-[80px] py-1 outline-none text-sm"
            placeholder={selected.length === 0 ? "Search or add..." : ""}
          />
        </div>

        {selected.length > 0 && (
          <button
            onClick={clearAll}
            className="text-gray-500 hover:text-red-500 px-2 py-1 text-sm"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-20 max-h-48 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center py-2 text-gray-500 text-sm">
              <svg
                className="animate-spin h-4 w-4 mr-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Loading...
            </div>
          )}

          {!loading && options.length === 0 && query.trim() !== "" && (
            <div
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => addOption(query.trim())}
            >
              Add “{query.trim()}”
            </div>
          )}

          {!loading &&
            options.map(
              (option) =>
                !selected.includes(option) && (
                  <div
                    key={option}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center justify-between"
                    onClick={() => addOption(option)}
                  >
                    <span>{option}</span>
                    <span className="text-blue-600 font-semibold">+</span>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default AsyncDropDown;
