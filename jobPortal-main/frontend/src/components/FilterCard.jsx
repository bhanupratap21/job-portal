import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronRight } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Mobile Developer",
      "DevOps Engineer",
      "QA Engineer",
    ],
  },
  {
    filterType: "Job Type",
    array: ["Full-time", "Part-time", "Internship", "Contract"],
  },
  {
    filterType: "Company",
    array: ["TCS", "Infosys", "Wipro", "HCL", "Accenture"],
  },
  {
    filterType: "Skills",
    array: ["Java", "Python", "React", "Angular", "Spring Boot", "Node.js"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [openSections, setOpenSections] = useState({});
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const toggleSection = (filterType) => {
    setOpenSections((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div
      className="w-full max-w-md mx-auto bg-white p-4 rounded-md shadow-sm
                    sm:max-w-lg md:max-w-full md:p-6"
    >
      <h1 className="font-bold text-xl mb-4 text-center md:text-left">
        Filter Jobs
      </h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          const isOpen = openSections[data.filterType] || false;
          return (
            <div key={index} className="mb-4 border-b border-gray-200 pb-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection(data.filterType)}
              >
                <h2 className="font-semibold text-lg">{data.filterType}</h2>
                {isOpen ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </div>

              {isOpen && (
                <div className="mt-2 ml-2 max-h-48 overflow-y-auto">
                  {data.array.map((item, idx) => {
                    const itemId = `id-${index}-${idx}`;
                    return (
                      <div
                        key={itemId}
                        className="flex items-center space-x-2 my-2"
                      >
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          className="w-4 h-4 border border-gray-400 rounded-full checked:bg-blue-600 checked:border-blue-600 appearance-none relative flex items-center justify-center"
                        >
                          <span className="w-2 h-2 bg-white rounded-full absolute" />
                        </RadioGroupItem>
                        <Label htmlFor={itemId} className="text-sm">
                          {item}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
