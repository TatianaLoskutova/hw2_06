import {Response, Router} from 'express';
import {authValidationBearer} from '../../middlewares/authorization_validation/auth_validation_bearer';
import {contentValidation} from '../../middlewares/comments_validation/comments_validation';
import {errorsValidation} from '../../middlewares/errors_reply/errors_validation';
import {RequestWithParamsAndBody} from '../../types/types';
import {GetByIdParam} from '../../models/getById';
import {BlogInputModel} from '../../models/blog/blogInputModel';
import {blogsService} from '../../domain/blogs/blogs_service';
import {CommentInputModel} from '../../models/comment/commentInputModel';


export const commentsRouter = Router()

// commentsRouter.put('/:id',
//     authValidationBearer,
//     contentValidation,
//     errorsValidation,
//     async (req: RequestWithParamsAndBody<GetByIdParam,CommentInputModel>, res: Response) => {
//         const isUpdated = await blogsService.updateBlog(req.params.id, req.body)
//         if (isUpdated) {
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)
//         }
//     })
