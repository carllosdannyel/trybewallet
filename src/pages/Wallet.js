import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchApiThunk } from '../actions';
import FormExpense from '../components/FormExpense';

class Wallet extends React.Component {
  componentDidMount = async () => {
    const { fetchApi } = this.props;
    await fetchApi();
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

const mapDispatchToProps = (dispatch) => ({
  fetchApi: () => dispatch(fetchApiThunk()),
});

const mapStateToProps = (state) => ({
  user: state.user,
});

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
