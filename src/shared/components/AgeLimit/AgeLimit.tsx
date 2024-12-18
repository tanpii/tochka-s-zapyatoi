import {Label} from '@gravity-ui/uikit';
import {WithClassName} from '@/shared/types';

export interface RatingProps extends WithClassName {
    ageLimit: number;
}

export const AgeLimit = ({ageLimit, className}: RatingProps) => {
    return (
        <Label className={className} theme="unknown" size="m">
            {ageLimit}+
        </Label>
    );
};
