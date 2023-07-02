import {CommentDbType} from '../../types/types';
import {commentsCollection} from '../../db/db';
import {CommentViewModel} from '../../models/comment/commentViewModel';


export const commentsRepository = {
    async createComment(newComment: CommentDbType): Promise<CommentViewModel> {

        const result = await commentsCollection.insertOne(newComment)
        return {
            id: result.insertedId.toString(),
            content: newComment.content,
            commentatorInfo: {
                userId: newComment.commentatorInfo.userId,
                userLogin: newComment.commentatorInfo.userLogin
            },
            createdAt: newComment.createdAt
        }
    },
}