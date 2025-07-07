import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediaSliderThumbCSS from "./MediaSilderThumb.module.css";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

type PropType = {
  selected: boolean;
  index: string;
  onClick: () => void;
  isImg: boolean;
};

export const MediaSilderThumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, isImg } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image src={index} width={50} height={50} alt={index} />
        {!isImg && (
          <FontAwesomeIcon
            icon={faCirclePlay}
            className={MediaSliderThumbCSS.videoIcon}
          />
        )}
      </button>
    </div>
  );
};
