import {
  AxiosRequestHandler,
  getRevealedResponseOrReject,
} from './generated-api/core';
import axios from 'axios';
import {parse} from 'qs';
import {getAvgPrice} from './generated-api/api/v3';

const requestHandler = new AxiosRequestHandler({
  axios: axios.create({baseURL: 'https://api.binance.com'}),
  urlDecodeQueryString: queryString => {
    return parse(queryString);
  },
});

async function queryEthereumPrice(): Promise<string> {
  const response = await getRevealedResponseOrReject(
    200,
    'application/json',
    getAvgPrice(requestHandler, {
      queryParams: {
        symbol: 'ETHUSDT',
      },
    })
  );
  return response.body.price;
}

queryEthereumPrice().then(price => {
  console.log(
    `\x1b[32mCurrent Ethereum market price equals ${price} USD.\x1b[0m`
  );
});
