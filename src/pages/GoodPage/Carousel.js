import { useState } from "react";
import { Thumbnails } from "./Thumbnails";
import { BACKEND_HOSTNAME } from "../../APIpages/api";
export const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      {images.length > 0 && (
        <img
          src={`http://${BACKEND_HOSTNAME}/${images[current].url}`}
          style={{
            width: "50%",
            aspectRatio: "0.8",
            position: "relative",
          }}
          alt="Some good"
          onClick={(e) => {
            const { layerX } = e.nativeEvent;
            const { clientWidth } = e.target;

            layerX < clientWidth / 3
              ? setCurrent((current) =>
                  current === 0 ? (current = images.length - 1) : +current - 1
                )
              : setCurrent((current) =>
                  current === images.length - 1 ? (current = 0) : +current + 1
                );
          }}
        />
      )}
      <Thumbnails
        images={images}
        current={current}
        onChange={(index) => setCurrent(index)}
      />
    </div>
  );
};
