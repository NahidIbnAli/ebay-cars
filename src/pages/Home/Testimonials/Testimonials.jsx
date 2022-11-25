import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../components/Loading";
import Testimonial from "./Testimonial";

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/testimonials");
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="pb-10 pt-16 px-7">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">
          What People Says
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <Testimonial
              key={testimonial._id}
              testimonial={testimonial}
            ></Testimonial>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
