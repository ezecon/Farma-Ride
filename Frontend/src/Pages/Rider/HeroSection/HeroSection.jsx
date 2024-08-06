import axios from "axios";
import { useEffect, useState } from "react";

export default function HeroSection() {

  return (
    <div className="relative">
      <img
        src="https://static.ecommercedb.com/media/2024/02/rider-with-parcel-on-a-delivery-bike-12413.webp"
        className="h-full w-full object-cover object-center rounded-xl blur-img"
        alt="Hero Section Image"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="animated-text montserrat-alternates-bold text-xl md:text-2xl lg:text-4xl py-2 md:py-4">
           FIGHT & RIDE
          </h1>

        </div>
      </div>
    </div>
  );
}
