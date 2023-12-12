import * as request from '../lib/requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const createComment = async (sofaId, comment, username) => {
    const newComment = await request.post(baseUrl, { sofaId, comment, username });
    return newComment;
}

export const getAllComment = async (sofaId) => {
    const query = new URLSearchParams({
        where: `sofaId="${sofaId}"`,
        load: `owner=_ownerId:users`,
    });
    const result = await request.get(`${baseUrl}?${query}`)
    return result;

}
