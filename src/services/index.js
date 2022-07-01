const endPoint = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const request = await fetch(endPoint);
  const dataJson = await request.json();
  return dataJson;
};

export default fetchApi;
