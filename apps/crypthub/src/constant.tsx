import deposit from "./assets/deposit.png";
import hp1 from "./assets/hp1.png";
import hp2 from "./assets/hp2.png";
import candlestats from "./assets/candlestats.png";
import scrollable from "./assets/scrollable.png";
import desiredprice from "./assets/desiredprice.png";
import ongoing from "./assets/ongoing.png";
import marketplace from "./assets/marketplace.png";
import filter from "./assets/filter.png";

export const initialModals = {
  crypthub_trader_modal: false,
  p2p_trader_modal: false,
};

export const MODALACTIONS = {
  CRYPTHUB_MODAL: "crypthub_modal",
  P2P_MODAL: "p2p_modal",
};

export const crypthub_data = [
  { image: hp1, details: "Simplified UI with detailed statistics" },
  { image: hp2, details: "Live cryptocurrency prices for each tick" },
  {
    image: candlestats,
    details: "Accurate candlestick charts for every minute, hour, and day",
  },
  { image: scrollable, details: "Buy and sell effortlessly" },
  {
    image: deposit,
    details: "Deposit and withdraw your balance with a click of a button",
  },
];

export const p2p_data = [
  {
    image: marketplace,
    details: "Trade and sell your crypto with various users in the Marketplace",
  },
  {
    image: filter,
    details: "Explore the Marketplace and filter your favourite crypto",
  },
  {
    image: desiredprice,
    details: "Sell your contract with the prices you desire",
  },
  { image: ongoing, details: "View your ongoing contracts" },
];

export const FAQ_data = [
  {
    panel: "panel1",
    header: "How do I create an account on your trading website?",
    content:
      "To create an account, click on the 'Start Trading' button on our website and follow the registration process. Provide the required information, including your name, email address, and password.",
  },
  {
    panel: "panel2",
    header: "How long does it take for my account to be verified?",
    content:
      "Your account will be verified as soon as you click on the verification link sent to your email",
  },
  {
    panel: "panel3",
    header: "What types of assets can I trade on your platform?",
    content:
      "Our platform offers two main cryptocurrencies. You can explore the available options on our trading platform.",
  },
  {
    panel: "panel4",
    header: "Are there any trading fees or commissions?",
    content:
      "Yes, we have 5% commissions for every crypto that you sell, but there are no trading fees.",
  },
  {
    panel: "panel5",
    header: "How can I buy a crypto on your website?",
    content:
      "Buying is simple. Log into your account, navigate to the trading platform, select the desired currency, set the price you wish to buy, and click 'Buy' to execute purchase.",
  },
  {
    panel: "panel6",
    header: "What is the minimum deposit required to start trading?",
    content: "There is no specified minimum deposit required to start trading.",
  },
  {
    panel: "panel7",
    header:
      "What security measures do you have in place to protect my funds and personal information?",
    content:
      "We prioritize the security of your funds and personal information. We employ industry-standard security protocols, including encryption, and segregated client accounts. Our website and trading platform are also regularly monitored and audited for vulnerabilities",
  },
  {
    panel: "panel8",
    header: "Do you provide real-time market data and charts?",
    content:
      "Yes, we provide real-time market data, including live price quotes and interactive charts, to help you make informed trading decisions. These tools are available within our trading platform.",
  },
  {
    panel: "panel9",
    header: "What other trading services do you provide?",
    content:
      "We offer P2P trading, where you can sell your crypto at your desired price and buy multiple crypto contracts.",
  },
];
