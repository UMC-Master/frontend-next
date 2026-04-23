'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

interface ChallengeHeroCarouselProps {
  images: string[];
  title: string;
}

const SLIDE_GAP = 16;
const VELOCITY_THRESHOLD = 0.35;
const DISTANCE_THRESHOLD_RATIO = 0.18;
const AUTOPLAY_INTERVAL = 3500;
const AUTOPLAY_RESUME_DELAY = 5000;
const LOOP_REPEAT_COUNT = 5;
const SLIDE_WIDTH = 320;
const SLIDE_HEIGHT = 300;

export default function ChallengeHeroCarousel({
  images,
  title,
}: ChallengeHeroCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const autoplayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const loopedImages = useMemo(() => {
    if (images.length <= 1) {
      return images;
    }

    return Array.from({ length: LOOP_REPEAT_COUNT }, () => images).flat();
  }, [images]);

  const getSlideElements = () => {
    const container = scrollRef.current;
    if (!container) {
      return [];
    }

    return Array.from(
      container.querySelectorAll<HTMLElement>('[data-carousel-slide="true"]'),
    );
  };

  const getTargetScrollLeft = (index: number) => {
    const container = scrollRef.current;
    const slides = getSlideElements();
    const slide = slides[index];

    if (!container || !slide) {
      return 0;
    }

    return slide.offsetLeft;
  };

  const centerSlide = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const slides = getSlideElements();
    const slide = slides[index];

    if (!slide) {
      return;
    }

    slide.scrollIntoView({
      behavior,
      block: 'nearest',
      inline: 'center',
    });
  };

  const getRawIndex = () => {
    const container = scrollRef.current;
    const slides = getSlideElements();

    if (!container || slides.length === 0) {
      return 0;
    }

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - containerCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  };

  const getFloatingIndex = () => {
    const container = scrollRef.current;
    const slides = getSlideElements();

    if (!container || slides.length === 0) {
      return 0;
    }

    const firstSlide = slides[0];
    const secondSlide = slides[1] ?? firstSlide;
    const slideSpacing = secondSlide.offsetLeft - firstSlide.offsetLeft || SLIDE_WIDTH + SLIDE_GAP;
    const firstTarget = getTargetScrollLeft(0);

    return (container.scrollLeft - firstTarget) / slideSpacing;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || images.length <= 1) {
      setIsReady(true);
      return;
    }

    const slides = getSlideElements();
    if (slides.length === 0) {
      return;
    }

    container.scrollLeft = getTargetScrollLeft(images.length * 2);
    setIsReady(true);
  }, [images.length]);

  useEffect(() => {
    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }

      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container || images.length === 0) {
      return;
    }

    const rawIndex = getRawIndex();

    if (images.length === 1) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex(((rawIndex % images.length) + images.length) % images.length);
  };

  const normalizeLoopPosition = () => {
    const container = scrollRef.current;
    if (!container || images.length <= 1) {
      return;
    }

    const rawIndex = getRawIndex();
    const firstSafeBlockStart = images.length;
    const lastSafeBlockStart = images.length * (LOOP_REPEAT_COUNT - 1);

    if (rawIndex < firstSafeBlockStart) {
      container.scrollTo({
        left: getTargetScrollLeft(rawIndex + images.length * 2),
        behavior: 'auto',
      });
    }

    if (rawIndex >= lastSafeBlockStart) {
      container.scrollTo({
        left: getTargetScrollLeft(rawIndex - images.length * 2),
        behavior: 'auto',
      });
    }
  };

  const handleScroll = () => {
    updateActiveIndex();
  };

  const handleScrollEnd = () => {
    normalizeLoopPosition();
    updateActiveIndex();
  };

  const pauseAutoplayTemporarily = (delay = AUTOPLAY_RESUME_DELAY) => {
    setIsAutoplayPaused(true);

    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, delay);
  };

  const snapToClosestSlide = () => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const slides = getSlideElements();
    if (slides.length === 0) {
      return;
    }

    if (images.length <= 1) {
      centerSlide(0);
      return;
    }

    const currentIndex = getFloatingIndex();
    const nearestIndex = getRawIndex();
    const delta = container.scrollLeft - dragStartScrollLeftRef.current;
    const firstSlide = slides[0];
    const secondSlide = slides[1] ?? firstSlide;
    const slideSpacing = secondSlide.offsetLeft - firstSlide.offsetLeft || SLIDE_WIDTH + SLIDE_GAP;
    const distanceThreshold = slideSpacing * DISTANCE_THRESHOLD_RATIO;

    let targetIndex = nearestIndex;

    if (Math.abs(velocityRef.current) > VELOCITY_THRESHOLD) {
      targetIndex = velocityRef.current > 0 ? nearestIndex + 1 : nearestIndex - 1;
    } else if (Math.abs(delta) > distanceThreshold) {
      targetIndex = delta > 0 ? Math.ceil(currentIndex) : Math.floor(currentIndex);
    }

    centerSlide(targetIndex);

    window.setTimeout(() => {
      normalizeLoopPosition();
      updateActiveIndex();
    }, 220);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    pauseAutoplayTemporarily();

    if (event.pointerType !== 'mouse') {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityRef.current = 0;
    setIsDragging(true);

    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) {
      return;
    }

    event.preventDefault();
    const deltaX = event.clientX - dragStartXRef.current;
    const currentTime = performance.now();
    const timeDelta = currentTime - lastPointerTimeRef.current;

    if (timeDelta > 0) {
      velocityRef.current = (lastPointerXRef.current - event.clientX) / timeDelta;
    }

    lastPointerXRef.current = event.clientX;
    lastPointerTimeRef.current = currentTime;
    container.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handlePointerRelease = () => {
    if (!isDraggingRef.current) {
      handleScrollEnd();
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    snapToClosestSlide();
    pauseAutoplayTemporarily();
  };

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    const slides = getSlideElements();
    if (slides.length === 0) {
      return;
    }

    const targetIndex = images.length <= 1 ? index : index + images.length * 2;

    centerSlide(targetIndex);
  };

  const scrollToNextSlide = () => {
    const container = scrollRef.current;
    if (!container || images.length <= 1) {
      return;
    }

    const slides = getSlideElements();
    if (slides.length === 0) {
      return;
    }

    const currentIndex = getRawIndex();

    centerSlide(currentIndex + 1);

    window.setTimeout(() => {
      normalizeLoopPosition();
      updateActiveIndex();
    }, 220);
  };

  useEffect(() => {
    if (!isReady || images.length <= 1 || isDragging || isAutoplayPaused) {
      return;
    }

    autoplayTimeoutRef.current = setTimeout(() => {
      scrollToNextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [activeIndex, images.length, isAutoplayPaused, isDragging, isReady]);

  return (
    <div className="mb-8">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerRelease}
        onPointerCancel={handlePointerRelease}
        onTouchEnd={() => {
          pauseAutoplayTemporarily();
          window.setTimeout(() => {
            snapToClosestSlide();
          }, 120);
        }}
        onMouseEnter={() => setIsAutoplayPaused(true)}
        onMouseLeave={() => pauseAutoplayTemporarily(1200)}
        onDragStart={event => event.preventDefault()}
        className={clsx(
          'flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] touch-pan-y overscroll-x-contain [&::-webkit-scrollbar]:hidden',
          !isReady && 'opacity-0',
          isDragging ? 'snap-none' : 'snap-x snap-mandatory',
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab md:cursor-grab',
        )}
      >
        <div
          aria-hidden
          className="shrink-0"
          style={{ width: `max(24px, calc((100% - ${SLIDE_WIDTH}px) / 2))` }}
        />
        {loopedImages.map((image, index) => {
          const normalizedIndex =
            images.length <= 1 ? index : ((index % images.length) + images.length) % images.length;
          const isActive = normalizedIndex === activeIndex;

          return (
            <div
              data-carousel-slide="true"
              key={`${image}-${index}`}
              className={clsx(
                'relative shrink-0 snap-center overflow-hidden rounded-lg transition-transform duration-200',
                isActive ? 'scale-100' : 'scale-[0.98]',
                normalizedIndex === 1 ? 'mt-2' : '',
              )}
              style={{
                width: `${SLIDE_WIDTH}px`,
                height: `${SLIDE_HEIGHT}px`,
              }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="pointer-events-none object-cover select-none"
                sizes="320px"
                priority={index <= 2}
                draggable={false}
              />
            </div>
          );
        })}
        <div
          aria-hidden
          className="shrink-0"
          style={{ width: `max(24px, calc((100% - ${SLIDE_WIDTH}px) / 2))` }}
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={`${image}-indicator-${index}`}
            type="button"
            aria-label={`${index + 1}번 이미지로 이동`}
            onClick={() => {
              pauseAutoplayTemporarily();
              scrollToSlide(index);
            }}
            className={clsx(
              'h-2 rounded-full transition-all',
              index === activeIndex ? 'w-5 bg-main-500' : 'w-2 bg-gray-300',
            )}
          />
        ))}
      </div>
    </div>
  );
}
