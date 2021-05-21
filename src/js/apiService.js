
const JSON_BASE_URL = 'https://pixabay.com/api';

export const fetchDataImg = (searchQuery = 'cat', pageNamber = 1) =>
    fetch (
        `${JSON_BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNamber}&per_page=12&key=21708715-c005b8eff9b2107cefe751bb8`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('ошибка')
    });


