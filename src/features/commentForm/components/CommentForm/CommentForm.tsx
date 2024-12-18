import React, {useState, useCallback} from 'react';
import {Button, TextArea, Text} from '@gravity-ui/uikit';
import {RatingInput} from '../RatingInput/RatingInput';

import block from 'bem-cn-lite';
import './CommentForm.scss';
const b = block('commentForm');

export interface ReviewFormProps {
    onSubmit?: (reviewData: {text: string; rating: number}) => void;
}

export const CommentForm: React.FC<ReviewFormProps> = ({onSubmit}) => {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setError('');
    }, []);

    const handleRatingChange = useCallback((newRating: number) => {
        setRating(newRating);
        setError('');
    }, []);

    const handleSubmit = useCallback(() => {
        if (!text.trim()) {
            setError('Отзыв и оценка обязательны для заполнения');
            return;
        }

        if (rating === 0) {
            setError('Отзыв и оценка обязательны для заполнения');
            return;
        }

        setError('');
        onSubmit?.({text, rating});
        setText('');
        setRating(0);
    }, [text, rating, onSubmit]);

    return (
        <div className={b()}>
            <TextArea
                value={text}
                onChange={handleTextChange}
                placeholder="Напишите ваш отзыв здесь..."
                rows={4}
                size="xl"
            />
            <div className={b('block')}>
                <RatingInput
                    totalStars={5}
                    initialRating={rating}
                    onRatingChange={handleRatingChange}
                />
                {error && (
                    <Text color="danger" variant="body-2">
                        {error}
                    </Text>
                )}
                <Button
                    className={b('submitButton')}
                    onClick={handleSubmit}
                    view="action"
                    size="xl"
                >
                    Отправить свой
                </Button>
            </div>
        </div>
    );
};
