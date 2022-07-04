const nameOfCoins = (coin) => {
  const coins = {
    USD: 'Dólar Comercial',
    CAD: 'Dólar canadense',
    GBP: 'Libra esterlina',
    ARS: 'Peso argentino',
    BTC: 'Bitcoin',
    LTC: 'Litecoin',
    EUR: 'Euro',
    JPY: 'Iene japonês',
    CHF: 'Franco suíço',
    AUD: 'Dólar australiano',
    CNY: 'Remimbi',
    ILS: 'Novo shekel israelense',
    ETH: 'Ethereum',
    XRP: 'Ripple',
    DOGE: 'Dogecoin',
  };

  return coins[coin];
};

export default nameOfCoins;
