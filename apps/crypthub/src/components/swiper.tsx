// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/components/swiper.scss";

// import required modules
import { EffectCube, Pagination, Navigation } from "swiper/modules";
import { ImageDataSetT } from "../type";

export default ({ data }: ImageDataSetT) => {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCube, Pagination, Navigation]}
        className="my-swiper"
      >
        {data.map((data, index) => (
          <SwiperSlide key={index}>
            <img src={data.image} />
            <p>{data.details}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
