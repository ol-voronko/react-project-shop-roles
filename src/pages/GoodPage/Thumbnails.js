import { BACKEND_HOSTNAME } from "../../APIpages/api";

export const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div className="thumbnails">
      {images.length &&
        images.map((image, index) => (
          <img
            src={`http://${BACKEND_HOSTNAME}/${image.url}`}
            alt="Some good"
            onClick={() => onChange(index)}
            style={
              index === current
                ? {
                    border: " 5px, solid ,black",
                    padding: "2px",
                    width: "2vw",
                  }
                : {
                    border: " none",
                    width: "100px",
                    boxSizing: "border-box",
                    width: "2vw",
                  }
            }
          />
        ))}
    </div>
  );
};
