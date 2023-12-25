import { makeObservable, action, observable, runInAction } from 'mobx';
// @ts-expect-error Deriv API
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic.js';
import { makePersistable } from 'mobx-persist-store';
import { toast } from 'react-toastify';

export interface Candlesticks {
  open: number;
  high: number;
  low: number;
  close: number;
  epoch?: EpochTimeStamp;
}

export interface ChartData {
  previous: number;
  price: number;
  time: EpochTimeStamp;
}

class WebsocketStoreImplementation {
  chart_data: ChartData[] = [];
  candlesticks: Candlesticks[] = [];
  subscribe_currency: string = 'BTC';
  chart_type: string = 'line';
  interval: string = '1t';
  ohlc: Candlesticks[] = [];

  constructor() {
    makeObservable(this, {
      chart_data: observable,
      subscribe_currency: observable,
      chart_type: observable,
      interval: observable,
      ohlc: observable,
      candlesticks: observable,
      setInterval: action.bound,
      setChartType: action.bound,
      tickResponse: action.bound,
      subscribeTicks: action.bound,
      unsubscribeTicks: action.bound,
      resetData: action.bound,
      tickHistory: action.bound,
      setSubscribeCurrency: action.bound,
      changeSubscribedCurrency: action.bound,
    });

    makePersistable(this, {
      name: 'chart_store',
      properties: ['subscribe_currency', 'chart_type', 'interval'],
      storage: window.localStorage,
    });
  }

  app_id = 1089;

  connection: WebSocket = new WebSocket(
    `wss://ws.binaryws.com/websockets/v3?app_id=${this.app_id}`
  );

  api = new DerivAPIBasic({ connection: this.connection });

  tickHistory = () =>
    this.api.subscribe(
      this.interval === '1t'
        ? {
            ticks_history:
              this.subscribe_currency === 'BTC' ? 'cryBTCUSD' : 'cryETHUSD',
            adjust_start_time: 1,
            count: 2000,
            end: 'latest',
            start: 1,
            style: 'ticks',
          }
        : {
            ticks_history:
              this.subscribe_currency === 'BTC' ? 'cryBTCUSD' : 'cryETHUSD',
            adjust_start_time: 1,
            count: this.interval === '60' ? 500 : 2000,
            end: 'latest',
            granularity: this.interval,
            start: Math.floor(Date.now() / 1000) - 6 * 30 * 24 * 60 * 60,
            style: 'candles',
          }
    );

  setSubscribeCurrency = (currency: string) => {
    this.subscribe_currency = currency;
  };

  setChartType = (type: string) => {
    this.chart_type = type;
  };

  setInterval = (interval: string) => {
    this.interval = interval;
  };

  resetData = () => {
    this.chart_data = [];
    this.candlesticks = [];
    this.ohlc = [];
  };

  tickResponse = async (res: MessageEvent) => {
    const data = JSON.parse(res.data);

    if (data.error !== undefined) {
      toast.error(`Error: ${data.error.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.connection?.removeEventListener('message', this.tickResponse, false);
      await this.api.disconnect();
    }

    if (data.msg_type === 'history') {
      const convertedData = data.history.prices.map(
        (price: number, index: number) => ({
          previous: data.history.prices[index - 1],
          price: price,
          time: data.history.times[index],
        })
      );

      convertedData.shift();
      runInAction(() => {
        this.chart_data = convertedData;
      });
    }

    if (data.msg_type === 'tick') {
      runInAction(() => {
        this.chart_data = [
          ...this.chart_data,
          {
            previous: this.chart_data[this.chart_data.length - 2].price,
            price: data.tick.quote,
            time: data.tick.epoch,
          },
        ];
        if (this.chart_data.length > 2000) {
          this.chart_data.shift();
        }
      });
    }

    if (data.msg_type === 'candles') {
      runInAction(() => {
        this.candlesticks = data.candles;
      });
    }

    if (data.msg_type === 'ohlc') {
      runInAction(() => {
        this.ohlc = [
          ...this.ohlc,
          {
            close: Number(data.ohlc.close),
            epoch: data.ohlc.epoch,
            high: Number(data.ohlc.high),
            low: Number(data.ohlc.low),
            open: Number(data.ohlc.open),
          },
        ];
        if (this.ohlc.length > 2) {
          this.ohlc.shift();
        }
        if (
          data.ohlc.epoch -
            this.candlesticks[this.candlesticks.length - 1].epoch! ===
          data.ohlc.granularity
        ) {
          this.candlesticks = [
            ...this.candlesticks,
            {
              close: Number(data.ohlc.close),
              epoch: data.ohlc.epoch,
              high: Number(data.ohlc.high),
              low: Number(data.ohlc.low),
              open: Number(data.ohlc.open),
            },
          ];
        } else {
          this.candlesticks[this.candlesticks.length - 1] = {
            close: Number(data.ohlc.close),
            epoch: this.candlesticks[this.candlesticks.length - 1].epoch,
            high: Number(data.ohlc.high),
            low: Number(data.ohlc.low),
            open: Number(data.ohlc.open),
          };
        }
      });
    }
  };

  changeSubscribedCurrency = (currency: string) => {
    this.resetData();
    this.setSubscribeCurrency(currency);
    this.subscribeTicks();
  };

  changeSubscribedInterval = (interval: string) => {
    this.resetData();
    this.setInterval(interval);
    this.subscribeTicks();
  };

  subscribeTicks = async () => {
    this.unsubscribeTicks(); // Disconnect previous connection
    this.resetData();

    this.connection = new WebSocket(
      `wss://ws.binaryws.com/websockets/v3?app_id=${this.app_id}`
    );
    this.api = new DerivAPIBasic({ connection: this.connection });

    await this.tickHistory(); // Subscribe to ticks

    setInterval(() => {
      this.api.ping();
    }, 30000);

    this.connection.addEventListener('message', this.tickResponse);
  };

  unsubscribeTicks = async () => {
    this.connection!.removeEventListener('message', this.tickResponse, false);
    await this.tickHistory().unsubscribe();
    this.resetData();
  };
}

export const websocketStore = new WebsocketStoreImplementation();
