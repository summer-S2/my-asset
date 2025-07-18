import { Carousel } from "antd";
import { SectionTitle } from "../../../components/common/SectionTitle";

const contentStyle: React.CSSProperties = {
  height: "260px",
  color: "#fff",
  lineHeight: "260px",
  textAlign: "center",
  background: "#364d79",
};

export const CarouselCard = () => {
  return (
    <div className="h-[320px] flex w-full flex-col p-4">
      <SectionTitle text="공지사항" classNames="justify-start" />
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>정보1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>정보2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>정보3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>정보4</h3>
        </div>
      </Carousel>
    </div>
  );
};
