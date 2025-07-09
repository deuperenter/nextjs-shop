"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { MediaSilderThumb } from "./MediaSilderThumb";
import "./media-slider.css";
import Image from "next/image";
import { refArray } from "@/lib/utils";

type PropType = {
  pMedia: string[][];
  options?: EmblaOptionsType;
};

const MediaSilder: React.FC<PropType> = ({ pMedia, options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {pMedia[0].map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <Image src={index} width={480} height={480} alt={index} />
              </div>
            </div>
          ))}
          {pMedia[1].map((index, i) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <video
                  width={480}
                  height={480}
                  controls
                  preload="none"
                  ref={(el) => refArray<HTMLVideoElement>(el, videoRefs)}
                  onBlur={() =>
                    videoRefs.current.forEach((video) => {
                      if (video) {
                        video.pause();
                      }
                    })
                  }
                >
                  <source src={index} type="video/mp4" />
                </video>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {[...pMedia[0], ...pMedia[2]].map((index, i) => (
              <MediaSilderThumb
                key={index}
                onClick={() => onThumbClick(i)}
                selected={i === selectedIndex}
                index={index}
                isImg={i < pMedia[0].length ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSilder;
