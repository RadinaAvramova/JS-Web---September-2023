import * as request from '../lib/requester';

const baseUrl = 'http://localhost:3030/data/sofas';

export const getAll = async () => {

    const result = await request.get(baseUrl);

    return result;
};

export const create = async (sofaData) => {
    const result = await request.post(baseUrl, sofaData);

    return result;
};

export const getOne = async (sofaId) => {
    const result = await request.get(`${baseUrl}/${sofaId}`);

    return result;
}

export const edit = async (sofaId, sofaData) => {
    const result = await request.put(`${baseUrl}/${sofaId}`, sofaData);

    return result;
}

export const remove = async (sofaId) => request.del(`${baseUrl}/${sofaId}`);


export const getLatestBlinds = async () => {

    const result = await request.get(`${baseUrl}?sortBy=_createdOn%20desc&offset=0&pageSize=3`);

    return result;
}

export const search = async (query) => {

    const result = await request.get(`${baseUrl}?where=name%20LIKE%20%22${query}%22`)

    return result;
}

export const getMyPost = async (userId) => {
    const result = (await getAll()).filter(sofa => sofa._ownerId === userId);

    return result;
}