
import {UserViewModel} from '../models/users/userViewModel';
import {UserDbType} from './types';

declare global {
    namespace Express {
        export interface Request {
            user: UserViewModel | null
        }
    }
}
