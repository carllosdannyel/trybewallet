import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpenseForm extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <form>
        <label htmlFor="expenses">
          Valor
          <input data-testid="value-input" id="expenses" type="text" />
        </label>
        <label htmlFor="description">
          Descrição
          <input data-testid="description-input" id="description" type="text" />
        </label>
        <label htmlFor="despesa">
          Moeda
          <select id="despesa">
            {expenses.map((expense) => (
              <option key={ expense }>{expense}</option>
            ))}
          </select>
        </label>
        <label htmlFor="despesa">
          Pagamento
          <select data-testid="method-input" id="despesa">
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
  expenses: state.wallet.currencies,
});

ExpenseForm.propTypes = {
  expense: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(ExpenseForm);
