// f2ffea4938b1399a0724ac9ef0692c2b
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmZmZWE0OTM4YjEzOTlhMDcyNGFjOWVmMDY5MmMyYiIsInN1YiI6IjY1MjNmYzc2NzQ1MDdkMDBjNTdkNmExZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.95HCn9y3f3Oli4ct9fXYlAdce3u1F6PTA3XkLljTbM8

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'f2ffea4938b1399a0724ac9ef0692c2b';
const instance = axios.create({
	baseURL: BASE_URL,
	params: {
		language: 'en-US',
		api_key: API_KEY
	}
});

// Функция сервиса
export const requestTrendMovies = async () => {
	const { data } = await instance.get('/trending/all/day');
	return data;
};
export const requestMovies = async (inputValue) => {
	const { data } = await instance.get('/search/movie', {
		params: {
			query: inputValue // это будет значение, которое ввели в инпут
		}
	});

	return data;
};

export const requestDetails = async (movieId) => {
	const { data } = await instance.get(`/movie/${movieId}`);
	return data;

};

export const requestCasts = async (movieId) => {
	const { data } = await instance.get(`/movie/${movieId}/casts`);

	return data;
};
export const requestReviews = async (movieId) => {
	const { data } = await instance.get(`/movie/${movieId}/reviews`);

	return data;
};
