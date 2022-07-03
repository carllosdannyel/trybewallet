import fetchCurrenciesApi from '../services/currenciesApi';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  payload: currencies,
});

export const saveExpenses = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  const currencieApi = await fetchCurrenciesApi();

  dispatch(
    saveCurrencies(
      Object.keys(currencieApi).filter((currencie) => currencie !== 'USDT'),
    ),
  );
};

export const fetchApiThunk = (expense) => async (dispatch) => {
  await dispatch(saveExpenses(expense));
};

// Outras formas de se fazer um thunk creator

// export const fetchCurrenciesThunka = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
//   .then((response) => response.json())
//   .then((data) => dispatch(
//     saveCurrencies(
//       Object.keys(data).filter((currencie) => currencie !== 'USDT'),
//     ),
//   ));

// export const fetchCurrenciesThunk = () => async (dispatch) => {
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((data) => dispatch(
//       saveCurrencies(
//         Object.keys(data).filter((currencie) => currencie !== 'USDT'),
//       ),
//     ));
// };
