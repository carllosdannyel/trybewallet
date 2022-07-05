// Refêrencia da tabela => https://www.homehost.com.br/blog/criar-sites/tabela-html/#topico03

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import nameOfCoins from '../services/nameOfCoins';
import './Wallet.css';

class Wallet extends React.Component {
  state = {
    total: 0,
  }

  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  };

  getTotal = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const soma = acc + (value * (Number(exchangeRates[currency].ask > 100
        ? exchangeRates[currency].ask.replace('.', '')
        : exchangeRates[currency].ask)));
      return soma;
    }, 0);
    this.setState({ total });
  };

  render() {
    const { email, expenses } = this.props;
    const { total } = this.state;
    return (
      <div className="wallet-container">
        <header className="header">
          <img className="icon" src="https://pngimg.com/uploads/wallet/wallet_PNG77010.png" alt="wallet" />
          <p className="text" data-testid="email-field">{email}</p>
          <p className="text" data-testid="total-field">{total.toFixed(2)}</p>
          <p className="text" data-testid="header-currency-field">BRL</p>
        </header>
        <ExpenseForm saveTotal={ this.getTotal } />
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              ({
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{nameOfCoins(currency)}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>
                    {(value * (Number(exchangeRates[currency].ask > 100
                      ? exchangeRates[currency].ask.replace('.', '')
                      : exchangeRates[currency].ask))).toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td className="button-container">
                    <button className="editar" type="button">Editar</button>
                    <button
                      className="excluir"
                      data-testid="delete-btn"
                      type="button"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  user: state.user,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
