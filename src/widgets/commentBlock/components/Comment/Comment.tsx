import {Text} from '@gravity-ui/uikit';
import {UserInfo} from '@/entities/user';
import {Comment as CommentType} from '@/shared/api/comment';
import {Rating} from '@/shared/components';

import block from 'bem-cn-lite';
import './Comment.scss';
const b = block('comment');

export interface CommentProps {
    comment: CommentType;
}

export const Comment = ({comment}: CommentProps) => {
    const {userData, comment: commentText, rating, self} = comment;

    return (
        <div className={b()}>
            <div className={b('commentHeader')}>
                <UserInfo
                    uuid={userData.userId}
                    avatarUrl={userData.photoUrl}
                    name={`${userData.firstName} ${userData.lastName}`}
                    self={self}
                />
                <Rating rating={rating} />
            </div>
            <Text variant="body-2">{commentText}</Text>
        </div>
    );
};

export default Comment;
