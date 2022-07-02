import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchApi from '../services';
import { saveCurrencies } from '../actions';
import FormExpense from '../components/FormExpense';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const fetch = await fetchApi();
    dispatch(
      saveCurrencies(
        Object.keys(fetch).filter((currencie) => currencie !== 'USDT'),
      ),
    );
  };

  render() {
    return (
      <div>
        <Header />
        <FormExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
