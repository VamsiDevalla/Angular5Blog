import { Like } from "./Like";
import { Comment } from "./Comment";

export interface Post{
    "_id" ?: string,
    "title": string,
    "body": string,
    "createdBy": {
        id : string,
        username: string
    },
    showComment: boolean,
    liked: boolean,
    "comments":Comment[],
    "likes": Like[] ,
}