import {commentsCollection} from '../../db/db';
import {makeCommentMapping, makeCommentsPagination} from '../../helpers/functions';
import {PaginatorCommentViewModel} from '../../models/comment/commentsViewModelWithPagination';


export const commentsQueryRepository = {
    async getAllComments(
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = 'createdAt',
        sortDirection: string = 'desc'
    ): Promise<PaginatorCommentViewModel> {
        const sortObj: any = {}

        if (sortBy) {
            sortObj[sortBy] = -1
        }

        if (sortDirection === 'asc') {
            sortObj[sortBy] = 1
        }
        const commentsCount = await commentsCollection.countDocuments()
        const pagesCount = Math.ceil(commentsCount / +pageSize)
        const paging = await makeCommentsPagination(sortObj, pageNumber, pageSize)

        return {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: commentsCount,
            items: makeCommentMapping(paging)
        }
    }
}