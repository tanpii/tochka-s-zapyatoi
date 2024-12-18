import {User} from '@/shared/api/user';
import {Card, Icon, Text} from '@gravity-ui/uikit';
import {Calendar, Envelope, Person} from '@gravity-ui/icons';
import {formatDate} from '@/shared/helpers';

import block from 'bem-cn-lite';
import './UserDetailedInfo.scss';
const b = block('userDetailedInfo');

interface UserDetailedInfoProps {
    self?: boolean;
    userData: User;
}

export const UserDetailedInfo = ({self, userData}: UserDetailedInfoProps) => {
    const {firstName, lastName, photoUrl, email, birthDate} = userData;
    return (
        <Card view="filled">
            <div className={b()}>
                {photoUrl && (
                    <div className={b('imgContainer')}>
                        <img
                            className={b('img')}
                            src={photoUrl}
                            alt={`Пользователь ${firstName} ${lastName}`}
                        />
                    </div>
                )}
                <div className={b('info')}>
                    <Icon data={Person} />
                    <Text variant="body-2">
                        {firstName} {lastName}
                    </Text>
                </div>

                {self && (
                    <div className={b('info')}>
                        <Icon data={Envelope} />
                        <Text variant="body-2">{email}</Text>
                    </div>
                )}
                <div className={b('info')}>
                    <Icon data={Calendar} />
                    <Text variant="body-2">{formatDate(birthDate)}</Text>
                </div>
            </div>
        </Card>
    );
};
