import React, {useCallback, useState} from 'react';
import {Icon} from '@gravity-ui/uikit';
import {Star, StarFill} from '@gravity-ui/icons';

import block from 'bem-cn-lite';
import './RatingInput.scss';
const b = block('rating-input');

export interface RatingInputProps {
    totalStars?: number;
    initialRating?: number;
    onRatingChange?: (rating: number) => void;
}

export const RatingInput: React.FC<RatingInputProps> = ({
    totalStars = 5,
    initialRating = 0,
    onRatingChange,
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleRatingChange = useCallback(
        (ratingValue: number) => {
            setRating(ratingValue);
            onRatingChange?.(ratingValue);
        },
        [onRatingChange],
    );

    return (
        <div className={b()}>
            {[...Array(totalStars)].map((_, index) => {
                const value = index + 1;
                return (
                    <div
                        key={value}
                        className={b('star', {active: value <= (hover || rating)})}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleRatingChange(value)}
                    >
                        <Icon data={value <= (hover || rating) ? StarFill : Star} size="24px" />
                    </div>
                );
            })}
        </div>
    );
};
