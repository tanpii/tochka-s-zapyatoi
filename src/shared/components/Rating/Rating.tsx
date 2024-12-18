import {Icon, Label} from '@gravity-ui/uikit';
import {StarFill} from '@gravity-ui/icons';
import {WithClassName} from '@/shared/types';

export interface RatingProps extends WithClassName {
    rating: number;
}

export const Rating = ({rating, className}: RatingProps) => {
    return (
        <Label className={className} icon={<Icon data={StarFill} />} size="m" theme="unknown">
            {rating}
        </Label>
    );
};
