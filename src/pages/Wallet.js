import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchApi from '../services';
import { saveCurrencies } from '../actions';

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
        <h1>TrybeWallet</h1>
        <Header />
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
