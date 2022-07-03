export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const fetchApiThunk = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((json) => dispatch(
    saveCurrencies(
      Object.keys(json).filter((currencie) => currencie !== 'USDT'),
    ),
  ));
