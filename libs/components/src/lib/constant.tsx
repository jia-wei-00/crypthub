const introjsOptions = {
  showProgress: true,
  tooltipClass: 'custom-introjs-theme',
  highlightClass: 'custom-introjs-highlight',
  showStepNumbers: false,
  exitOnOverlayClick: false,
};

export const sellP2PModalTour = {
  options: introjsOptions,
  steps: [
    {
      element: '.add-contract-current-price',
      intro:
        'This section displays the current market price for ETH and BTC based on your input coin amount.',
    },
    {
      element: '#wallet-currency-select',
      intro: 'Please select the currency you wish to sell.',
    },
    {
      element: '.sell-p2p-input-field',
      intro:
        'Here, you can input the amount of coins you want to sell and set the selling price.',
    },
    {
      element: '#sell-on-p2p',
      intro:
        'Once you have filled the necessary details, you can create the contract and start trading.',
    },
  ],
};
