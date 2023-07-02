import {Router, Response} from 'express';
import {ObjectId} from 'mongodb';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from '../../types/types';
import {PostQueryModel} from '../../models/post/postQueryModel';
import {postsQueryRepository} from '../../repositories/posts/posts_query_repository';
import {errorsValidation} from '../../middlewares/errors_reply/errors_validation';
import {GetByIdParam} from '../../models/getById';
import {authorizationValidationВasic} from '../../middlewares/authorization_validation/authorization_validation_basic';
import {postBlogIdValidation, postContentValidation, postShortDescription, postTitleValidation} from '../../middlewares/posts_validation/posts_validators';
import {PostInputModel} from '../../models/post/postInputModel';
import {postsService} from '../../domain/posts/posts_service';



export const postsRouters = Router()


// Ниже все менять не нужно
postsRouters.get('/', async (req: RequestWithQuery<PostQueryModel>, res: Response) => {
    const allPosts = await postsQueryRepository.getAllPosts(
        req.query.pageNumber,
        req.query.pageSize,
        req.query.sortBy,
        req.query.sortDirection
    )
    if (allPosts) {
        res.status(200).send(allPosts)
    }
})

postsRouters.get('/:id',
    errorsValidation,
    async (req:RequestWithParams<GetByIdParam>, res: Response) => {
        const result = await postsQueryRepository.findPostById(new ObjectId(req.params.id))
        if (!result) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(result)
    })

postsRouters.post('/',
    authorizationValidationВasic,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsValidation,
    async (req: RequestWithBody<PostInputModel>, res: Response) => {
        const newPost = await postsService.createPost(req.body)
        if (newPost) {
            res.status(201).send(newPost)
        }
    })

postsRouters.put('/:id',
    authorizationValidationВasic,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsValidation,
    async (req: RequestWithParamsAndBody<GetByIdParam,PostInputModel>, res: Response) => {
        const isUpdated = await postsService.updatePost(req.params.id, req.body)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

postsRouters.delete('/:id',
    authorizationValidationВasic,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await postsService.deletePostById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })