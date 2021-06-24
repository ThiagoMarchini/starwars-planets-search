const SW_URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getSWData = () => (
  fetch(SW_URL_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getSWData;
