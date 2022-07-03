const endPoint = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrenciesApi = () => fetch(endPoint)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => console.log(error));

export default fetchCurrenciesApi;
