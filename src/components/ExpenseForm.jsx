import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApiThunk } from '../actions';
import currenciesApi from '../services/currenciesApi';

class ExpenseForm extends Component {
  state = {
    id: 0,
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    exchangeRates: null,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Referência sobre o delete => https://www.horadecodar.com.br/2020/12/11/remover-propriedade-de-objeto-javascript/

  handleClick = async () => {
    const { saveTotal } = this.props;

    const fetchCurrencies = await currenciesApi();
    delete fetchCurrencies.USDT;

    this.setState({ exchangeRates: fetchCurrencies }, () => {
      const { fetchApi } = this.props;
      fetchApi(this.state);
      this.setState((previousState) => ({
        id: previousState.id + 1,
        value: '',
        description: '',
      }));
    });

    saveTotal();
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
            id="valor"
            type="number"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            id="moeda"
          >
            {currencies.map((currencie) => (
              <option key={ currencie }>{currencie}</option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
            id="pagamento"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria:
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
            id="categoria"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
            id="descricao"
            type="text"
          />
        </label>
        <button type="button" onClick={ this.handleClick }>
          Adicionar Despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchApi: (state) => dispatch(fetchApiThunk(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
