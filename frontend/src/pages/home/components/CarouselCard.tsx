import { Carousel } from "antd";
import { SectionTitle } from "../../../components/common/SectionTitle";
import bwImg from "../../../assets/images/bw-thumbnail.png";
import loginImg from "../../../assets/images/login-thumbnail.png";

export const CarouselCard = () => {
  return (
    <div className="h-[320px] flex flex-grow flex-col p-4">
      <SectionTitle text="이벤트 / 소식" classNames="justify-start" />
      <Carousel autoplay>
        <div className="h-[260px]">
          <img className="w-full h-full" src={bwImg} />
        </div>
        <div className="h-[260px]">
          <img className="w-full h-full" src={loginImg} />
        </div>
      </Carousel>
    </div>
  );
};
