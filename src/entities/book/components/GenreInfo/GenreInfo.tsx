import {useMemo} from 'react';
import {Icon, Text, Tooltip, UserLabel} from '@gravity-ui/uikit';
import {Pencil} from '@gravity-ui/icons';

import block from 'bem-cn-lite';
import './GenreInfo.scss';
const b = block('genreInfo');

export interface GenreInfoProps {
    genres: string[];
    showTooltip?: boolean;
}

export const GenreInfo = ({genres, showTooltip}: GenreInfoProps) => {
    const tooltipContent = useMemo(() => {
        return (
            <div className={b('tooltip')}>
                <div className={b('infoContainer')}>
                    <Text className={b('info')} variant="subheader-1">
                        Жанры книги <Icon data={Pencil} />
                        <hr />
                    </Text>
                    <Text className={b('info')} variant="body-1">
                        {genres.join(', ')}
                    </Text>
                </div>
            </div>
        );
    }, [genres]);

    const genreLabel = useMemo(() => {
        return (
            <UserLabel
                className={b('infoLabel')}
                type="person"
                avatar={{icon: Pencil}}
                size="m"
                view="clear"
            >
                {genres.join(', ')}
            </UserLabel>
        );
    }, [genres]);

    return showTooltip ? (
        <Tooltip content={tooltipContent} openDelay={500}>
            {genreLabel}
        </Tooltip>
    ) : (
        genreLabel
    );
};

export default GenreInfo;
