import './Login.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isEnabled: true,
  };

  validateButton = () => {
    const { email, password } = this.state;
    const magicNumber = 6;
    const formatEmail = /\S+@\S+\.\S+/;
    const passwordLength = password.length >= magicNumber;

    if (formatEmail.test(email) && passwordLength) {
      this.setState({ isEnabled: false });
    } else {
      this.setState({ isEnabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  handleClick = async () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(saveEmail({ email }));
    history.push('/carteira');
  };

  render() {
    const { isEnabled, email, password } = this.state;
    return (
      <div className="form-container">
        <form className="forms">
          <h1 className="title">LOGIN</h1>
          <label htmlFor="email" className="label-input">
            <input
              className="label-input"
              name="email"
              data-testid="email-input"
              type="text"
              id="email"
              value={ email }
              placeholder="Digite seu email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password" className="label-input">
            <input
              className="label-input"
              name="password"
              data-testid="password-input"
              type="password"
              id="password"
              value={ password }
              placeholder="Digite sua senha"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="button"
            id="button"
            type="button"
            disabled={ isEnabled }
            onClick={ this.handleClick }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
