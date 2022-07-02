import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class FormExpense extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor
          <input data-testid="value-input" id="valor" type="text" />
        </label>
        <label htmlFor="descricao">
          Descrição
          <input data-testid="description-input" id="descricao" type="text" />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda">
            {currencies.map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          <select data-testid="method-input" id="pagamento">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="categoria">
          Categoria
          <select data-testid="tag-input" id="categoria">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

FormExpense.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(FormExpense);
