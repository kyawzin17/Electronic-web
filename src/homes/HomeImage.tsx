
import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import "./homeImage.css";

import image1d from "../assets/school-d-norun.webp";
import image2d from "../assets/school-d-run.webp";
import image3d from "../assets/keypad-d-norun.webp";
import image4d from "../assets/keypad-d-run.webp";
import image5d from "../assets/first-d.webp";

import image1l from "../assets/school-l-norun.webp";
import image2l from "../assets/school-l-run.webp";
import image3l from "../assets/keypad-l-norun.webp";
import image4l from "../assets/keypad-l-run.webp";
import image5l from "../assets/first-l.webp";



const imageDark = [
  { src: image1d, alt: "Smart Lock System!", title: "Smart Lock System!" },
  { src: image2d, alt: "Smart Lock System!", title: "Smart Lock System!" },
  { src: image3d, alt: "My School Project for Measure Distance!", title: "My School Project for Measure Distance!" },
  { src: image4d, alt: "My School Project for Measure Distance!", title: "My School Project for Measure Distance!" },
  { src: image5d, alt: "First Project!", title: "First Project!" },
];

const imageLight = [
  { src: image1l, alt: "Smart Lock System!", title: "Smart Lock System!" },
  { src: image2l, alt: "Smart Lock System!", title: "Smart Lock System!" },
  { src: image3l, alt: "My School Project for Measure Distance!", title: "My School Project for Measure Distance!" },
  { src: image4l, alt: "My School Project for Measure Distance!", title: "My School Project for Measure Distance!" },
  { src: image5l, alt: "First Project!", title: "First Project!" },
];
export default function ImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

   const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    // လက်ရှိ theme ကို ချက်ချင်းစစ်ဆေးမယ်
    updateTheme();

    // Theme Button က html class ပြောင်းတာကို စောင့်ကြည့်မယ်
    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);


  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % (isDark ? imageDark.length : imageLight.length));
  }, []);

  const previous = useCallback(() => {
    setActiveIndex((i) => (i - 1 + (isDark ? imageDark.length : imageLight.length)) % (isDark ? imageDark.length : imageLight.length));
  }, []);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(next, 3000);
    return () => window.clearInterval(timer);
  }, [paused, next]);

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 45) {
      distance < 0 ? next() : previous();
    }

    touchStartX.current = null;
  }

  return (
    <section
      className="rde-carousel"
      aria-label="Circuit project gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      <div
        className="rde-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="rde-carousel__track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
        {(isDark ? imageDark : imageLight).map((image, index) => ( 
            <article
              className="rde-carousel__slide"
              key={image.src}
              aria-hidden={index !== activeIndex}
            >
              <img
                src={image.src}
                alt={image.alt}
                draggable={false}
              />

              <div className="rde-carousel__caption bg-primary/35 backdrop-blur-md text-text-main px-2 py-0.5">
                <span>{image.title}</span>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="rde-carousel__arrow rde-carousel__arrow--left"
          onClick={previous}
          aria-label="Previous image"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className="rde-carousel__arrow rde-carousel__arrow--right"
          onClick={next}
          aria-label="Next image"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
