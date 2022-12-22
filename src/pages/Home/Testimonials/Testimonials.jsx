import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../components/Loading";
import Testimonial from "./Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";
// required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Testimonials = () => {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await fetch(
        "https://ebay-cars-server.vercel.app/testimonials"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="py-10 px-5">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold pb-10 text-center">
          What People Says
        </h2>
        <div className="testimonials">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper lg:w-1/2"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id} className="px-10 xl:px-16">
                <Testimonial testimonial={testimonial}></Testimonial>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
