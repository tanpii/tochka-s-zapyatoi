import {useMemo} from 'react';
import {Text, Tooltip, UserLabel} from '@gravity-ui/uikit';
import {Person} from '@gravity-ui/icons';

import stubImage from '@/shared/assets/stub.jpg';

import block from 'bem-cn-lite';
import './AuthorInfo.scss';
const b = block('authorInfo');

export interface AuthorInfoProps {
    authorImgSrc: string;
    authorName: string;
}

export const AuthorInfo = ({authorImgSrc, authorName}: AuthorInfoProps) => {
    const tooltipContent = useMemo(() => {
        return (
            <div className={b('tooltip')}>
                <div className={b('imgContainer')}>
                    <img className={b('img')} src={authorImgSrc || stubImage} alt={authorName} />
                </div>
                <div className={b('infoContainer')}>
                    <Text className={b('info')} variant="subheader-1">
                        Автор
                        <hr />
                    </Text>
                    <Text className={b('info')} variant="body-1">
                        {authorName}
                    </Text>
                </div>
            </div>
        );
    }, [authorImgSrc, authorName]);

    return (
        <Tooltip content={tooltipContent} openDelay={500}>
            <UserLabel
                className={b('authorLabel')}
                type="person"
                avatar={authorImgSrc ? authorImgSrc : {icon: Person}}
                size={'m'}
                view="clear"
            >
                {authorName}
            </UserLabel>
        </Tooltip>
    );
};

export default AuthorInfo;
