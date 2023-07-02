import {CommentInputModel} from '../../models/comment/commentInputModel';
import {CommentViewModel} from '../../models/comment/commentViewModel';
import {ObjectId} from 'mongodb';
import {commentsRepository} from '../../repositories/comments/comments_repository';
import {CommentDbType} from '../../types/types';
import {UserViewModel} from '../../models/users/userViewModel';



export const commentsService = {
    async createComment(inputData: CommentInputModel, user: UserViewModel): Promise<CommentViewModel | null> {
        const commentToMongoDb: CommentDbType = {
            _id: new ObjectId(),
            content: inputData.content,
            commentatorInfo: {
                userId: user.id,
                userLogin: user.login
            },
            createdAt: new Date().toISOString(),
        }
        return await commentsRepository.createComment(commentToMongoDb)
    },
}

