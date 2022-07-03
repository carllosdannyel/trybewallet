import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrenciesThunk } from '../actions';
import FormExpense from '../components/FormExpense';

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
    const { total } = this.state;
    return (
      <div>
        <Header total={ total } />
        <FormExpense saveTotal={ this.getTotal } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
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
