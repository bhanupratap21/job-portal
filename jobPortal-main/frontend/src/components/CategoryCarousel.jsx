import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { setSearchedQuery } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Scientist",
  "Graphic Designer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Software Engineer",
  "Project Manager",
  "Business Analyst",
  "Cloud Engineer",
  "Cybersecurity Specialist",
  "AI/ML Engineer",
  "Database Administrator",
  "Product Manager",
  "Content Writer",
  "Marketing Specialist",
  "HR Recruiter",
  "QA/Test Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const searchJobHandler = (query) => {
      console.log("Searching for:", query); // debug
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-10 px-4">
      <Carousel className="w-full">
        <CarouselContent className="flex items-center py-3">
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 p-2">
              <Button
                onClick={() => searchJobHandler(item)}
                variant="outline"
                className="
        rounded-full w-full py-3 px-4 text-sm font-medium
        border border-gray-300 bg-white text-gray-800
        hover:bg-[#6A38C2] hover:text-white
        focus-visible:ring-2 focus-visible:ring-[#6A38C2] focus-visible:ring-offset-2
        active:bg-[#5b30a6] active:text-white
      "
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="top-5 left-[-70px]  bg-[#6A38C2] hover:bg-[#5825b1] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md" />{" "}
        <CarouselNext className="top-5 right-[-70px] -translate-y-1/2 translate-x-1/2 bg-[#6A38C2] hover:bg-[#5825b1] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
