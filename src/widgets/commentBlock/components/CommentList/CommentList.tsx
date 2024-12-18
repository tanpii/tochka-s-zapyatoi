import {Comment as CommentType} from '@/shared/api/comment';
import {WithClassName} from '@/shared/types';
import Comment from '../Comment/Comment';

import block from 'bem-cn-lite';
import './CommentList.scss';
const b = block('commentList');

export interface CommentListProps extends WithClassName {
    comments: CommentType[];
}

export const CommentList = ({className, comments}: CommentListProps) => {
    return (
        <div className={[b(), className].join(' ')}>
            {comments.map((comment) => (
                <Comment key={comment.bookId} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;
