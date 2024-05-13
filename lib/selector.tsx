// Imports necessary data and dependencies.
import { COUNTRIES } from "./countries";
import { SelectMenuOption } from "./types";
import { AnimatePresence, motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

// Defines props for the CountrySelector component.
export interface CountrySelectorProps {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: SelectMenuOption["value"]) => void;
  selectedValue: SelectMenuOption;
  classExt: string;
}

// CountrySelector component to select countries.
export default function CountrySelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
  classExt
}: CountrySelectorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target as Node) &&
        open
      ) {
        onToggle();
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const [query, setQuery] = useState("");

  return (
    <div ref={ref}>
      <div className="relative">
        {/* Country selection button */}
        <button 
          type="button"
          className={`${
            disabled ? "bg-neutral-100" : "bg-neutral-750"
          } relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${classExt}`}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
          disabled={disabled}
        >
          {/* Display selected country */}
          <span style={{color: "#CCC",fontFamily: "Inter",fontSize: "16px",fontStyle: "normal",fontWeight: 400}} className="truncate flex items-center">
            &nbsp;&nbsp;<img
              alt={`${selectedValue.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
              className={"inline mr-2 h-4 rounded-sm"}
            />
            {selectedValue.title}
          </span>
        </button>

        {/* Dropdown for country selection */}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
              style={{padding: "20px",zIndex: "100",background: "#232323",overflow: "overlay",maxHeight: "200px",color: "#ccc",scrollbarColor: "#BAFF00 #4F4E4E",
              scrollbarWidth: "thin"}}
            >
              <div>
                {/* Search input */}
                <li className="">
                  <input
                    type="search"
                    name="search"
                    autoComplete={"off"}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md search-select-input"
                    placeholder={"Search a country"}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  "max-h-64"
                }
              >
                {/* List of countries */}
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                    No countries found
                  </li>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    if (value.value!==""){
                      return (
                        <li
                          key={`${id}-${index}`}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            onChange(value.value);
                            setQuery("");
                            onToggle();
                          }}
                        >
                          <img
                            alt={`${value.value}`}
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                            className={"inline mr-2 h-4 rounded-sm"}
                          />

                          <span style={{color: "#CCC",fontFamily: "Inter",fontSize: "16px",fontStyle: "normal",fontWeight: 400}} className="font-normal truncate">
                            {value.title}
                          </span>
                          {/* Indicates selected country */}
                          {value.value === selectedValue.value ? (
                            <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </li>
                      );
                    }
                  })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}