import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk } from '../actions';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

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
      const soma = acc + (value * exchangeRates[currency].ask);
      return soma;
    }, 0);
    this.setState({ total });
  };

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">{total.toFixed(2)}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <ExpenseForm saveTotal={ this.getTotal } />
        <ExpenseTable total={ total } />
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
