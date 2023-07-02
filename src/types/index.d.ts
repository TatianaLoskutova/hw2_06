
import {UserViewModel} from '../models/users/userViewModel';

declare global {
    namespace Express {
        export interface Request {
            user: UserViewModel | null
        }
    }
}
