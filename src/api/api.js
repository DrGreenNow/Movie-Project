import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org',
});

export const getSearchList = (searchWord, page) => {
    return instance
        .get(
            `/3/search/movie?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&query=${searchWord}&page=${page}`
        )
        .then((response) => response.data.results);
};

export const getPopularList = (page) => {
    return instance
        .get(
            `/3/movie/popular?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&&page=${page}`
        )
        .then((response) => response.data.results);
};

export const getFilm = (id) => {
    return instance
        .get(
            `/3/movie/${id}?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US`
        )
        .then((response) => response.data);
};

export const getRecomended = (id) => {
    return instance
        .get(
            `/3/movie/${id}/recommendations?api_key=0d747b42c205fad6e960bdfef2b60881&language=en-US&page=1`
        )
        .then((response) => response.data.results);
};
