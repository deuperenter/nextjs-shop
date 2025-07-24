"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { MediaSliderThumb } from "./MediaSliderThumb";
import Image from "next/image";

import "./media-slider.css";

type PropType = {
  pImgs: string[];
  pVideo?: string[];
  pVideoThumb?: string[];
  options?: EmblaOptionsType;
};

const MediaSlider: React.FC<PropType> = (props) => {
  const { pImgs, pVideo, pVideoThumb, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const pThumb = [...pImgs];
  if (pVideoThumb) {
    pThumb.push(...pVideoThumb);
  }

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

  const videoRefs = useRef<HTMLDivElement>(null);

  const pauseVideos = () => {
    videoRefs.current?.querySelectorAll("video").forEach((v) => v.pause());
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container" ref={videoRefs}>
          {pImgs.map((index, i) => (
            <div className="embla__slide" key={`prodImg${i}`}>
              <div className="embla__slide__number">
                <Image
                  src={index}
                  width={480}
                  height={480}
                  alt={`prodImg${i}`}
                />
              </div>
            </div>
          ))}
          {pVideo?.map((index, i) => (
            <div className="embla__slide" key={`prodVideo${i}`}>
              <div className="embla__slide__number">
                <video width={480} height={480} controls onBlur={pauseVideos}>
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
            {pThumb.map((index, i) => (
              <MediaSliderThumb
                key={`pThumb${i}`}
                onClick={() => onThumbClick(i)}
                selected={i === selectedIndex}
                index={index}
                isImg={i < pImgs.length ? false : true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaSlider;
