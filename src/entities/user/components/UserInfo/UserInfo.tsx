import {UserLabel} from '@gravity-ui/uikit';
import {useNavigate} from 'react-router-dom';

interface UserInfoProps {
    self: boolean;
    uuid: string;
    avatarUrl: string;
    name: string;
}

export const UserInfo = ({self, uuid, avatarUrl, name}: UserInfoProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (self) {
            navigate('/cabinet');
        } else {
            navigate(`/user/${uuid}`);
        }
    };

    return (
        <div onClick={handleClick}>
            <UserLabel type="person" avatar={avatarUrl}>
                {name}
            </UserLabel>
        </div>
    );
};
