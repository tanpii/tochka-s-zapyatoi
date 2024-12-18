import {PropsWithChildren, useCallback, useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight} from '@gravity-ui/icons';
import {Button, Icon} from '@gravity-ui/uikit';

import block from 'bem-cn-lite';
import './Carousel.scss';
const b = block('carousel');

export interface CarouselProps {
    // Количество элементов в children
    itemCount: number;
}

export const Carousel = ({itemCount, children}: PropsWithChildren<CarouselProps>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalScrolls, setTotalScrolls] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    // Функция для скроллинга
    const scrollHorizontally = useCallback(
        (direction: 'left' | 'right') => {
            if (!carouselRef.current || itemWidth === 0) {
                return;
            }

            // Скроллим на количество элементов, которое помещается на экране
            const scrollAmount = itemWidth * itemsPerPage;

            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        },
        [itemWidth, itemsPerPage],
    );

    // Обработчики нажатий на кнопки
    const handlePrev = useCallback(() => {
        if (currentIndex <= 0) return;
        scrollHorizontally('left');
        setCurrentIndex(currentIndex - 1);
    }, [currentIndex, scrollHorizontally]);

    const handleNext = useCallback(() => {
        if (currentIndex >= totalScrolls - 1) return;
        scrollHorizontally('right');
        setCurrentIndex(currentIndex + 1);
    }, [currentIndex, scrollHorizontally, totalScrolls]);

    useEffect(() => {
        if (!carouselRef.current || !containerRef.current) {
            return;
        }

        const containerWidth = containerRef.current.clientWidth;
        const carouselWidth = carouselRef.current.scrollWidth;

        // Рассчитываем ширину каждого элемента в списке
        const newItemWidth = carouselWidth / itemCount;
        setItemWidth(newItemWidth);

        // Рассчитываем, сколько элементов помещается в одном экране
        const newItemsPerPage = Math.floor(containerWidth / newItemWidth);
        setItemsPerPage(newItemsPerPage > 0 ? newItemsPerPage : 1);

        // Количество страниц для прокрутки
        setTotalScrolls(Math.ceil(itemCount / newItemsPerPage));

        // Если ширина карусели меньше ширины контейнера, скрываем стрелки
        if (carouselWidth <= containerWidth) {
            setShowControls(false);
        }
    }, [children]);

    return (
        <div ref={containerRef} className={b()}>
            <div ref={carouselRef} className={b('childContainer')}>
                {children}
            </div>
            {showControls && (
                <div className={b('controls')}>
                    <Button
                        onClick={handlePrev}
                        view="raised"
                        size="l"
                        className={b('button', {hidden: currentIndex === 0})}
                    >
                        <Icon data={ChevronLeft} size={18} />
                    </Button>
                    <Button
                        onClick={handleNext}
                        view="raised"
                        size="l"
                        className={b('button', {hidden: currentIndex === totalScrolls - 1})}
                    >
                        <Icon data={ChevronRight} size={18} />
                    </Button>
                </div>
            )}
        </div>
    );
};
