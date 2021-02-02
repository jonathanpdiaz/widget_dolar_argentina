#!/usr/bin/env /usr/local/bin/node
//  -*- coding: utf-8 -*-
//  <bitbar.title>Dolar Argentina</bitbar.title>
//  <bitbar.version>1.0</bitbar.version>
//  <bitbar.author>Jony & Raul</bitbar.author>
//  <bitbar.author.github>jonathanpdiaz</bitbar.author.github>
//  <bitbar.desc>Keep an eye on the Dolar in Argentina !</bitbar.desc>
//  <bitbar.image>https://github.com/jonathanpdiaz/widget_dolar_argentina/raw/master/Screen%20Shot%202018-11-27%20at%2013.47.32.png?raw=true</bitbar.image>

const got = require("got");
const bitbar = require("bitbar");
const { nth, template, find, last, first } = require("lodash");

const STATS_INFO_URL =
  `https://www.cronista.com/templateGetPrincipal.html?r=${Math.random() * 10000}`;

const SATOSHI_COINS_URL = 'https://api.satoshitango.com/v3/graph/ARS';
const RIPIO_USDC_URL = 'https://api.exchange.ripio.com/api/v1/rate/USDC_ARS/';
const BUENBIT_DAI_URL = 'https://be.buenbit.com/api/market/tickers/';

const MONEDAS = [
  /*{
    Nombre: "DÓLAR B. NACIÓN",
    replace: template(
      "🇦🇷\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    Nombre: "DÓLAR MAYORISTA",
    replace: template(
      "🏦\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    Nombre: "DÓLAR BLUE",
    replace: template(
      "💙\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    Nombre: "DÓLAR CDO C/LIQ",
    replace: template(
      "CCL\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    Nombre: "DÓLAR MEP Contado",
    replace: template(
      "MEP\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },*/
  {
    Nombre: "DÓLAR BUEN BIT",
    replace: template(
      "DAI\t$${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)}"
    )
  },
  {
    Nombre: "USDC SATOSHI",
    replace: template(
      "USDC ST\t$${parseFloat(last_price).toFixed(2)} [$${parseFloat(low).toFixed(2)}-$${parseFloat(high).toFixed(2)}] ~ ${parseFloat(change)}%"
    )
  },
  {
    Nombre: "USDC RIPIO",
    replace: template(
      "USDC RP\t$${parseFloat(last_price).toFixed(2)} [$${parseFloat(low).toFixed(2)}-$${parseFloat(high).toFixed(2)}] ~ ${parseFloat(variation)}%"
    )
  }/*,
  {
    Nombre: "BITCOIN USD",
    replace: template(
      "BTC\tUS$${parseFloat(Compra).toFixed(2)}/US$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  }*/
];

function getMainMessage(currency) {
  const venta =
    currency && currency.last_price && currency.last_price.toFixed(2);
  const variacion = currency && currency.change;
  if (variacion > 2) {
    return `💸 $${venta}`;
  } else if (variacion > 0) {
    return `📈 $${venta}`;
  } else if (variacion < 0) {
    return `📉 $${venta}`;
  } else {
    return `$${venta}`;
  }
}

async function getDolarStats() {
  let dolarBody = {};
  try {
    let info = await got(STATS_INFO_URL, { json: true });
    dolarBody = info.body;
  } catch (e) {
    //failed to load stats
  }
  const monedas = dolarBody.monedas ? dolarBody.monedas : [];
  let rawCoins;
  try {
    rawCoins = await got(SATOSHI_COINS_URL, { json: true });
  } catch (e) {
    //failed to load coins
  }
  const { data: { graph } } = rawCoins.body;
  const coins = Object.keys(graph).map(Nombre => {
    return { Nombre: `${Nombre} SATOSHI`, ...graph[Nombre], last_price: last(graph[Nombre].graph) }
  });
  const items = monedas.concat(coins);
  let buenBitDAI;
  try {
    const { body: data } = await got(BUENBIT_DAI_URL, { json: true });
    const daiusdselling = parseFloat(data.object.daiusd.selling_price);
    const daiarsselling = parseFloat(data.object.daiars.selling_price);
    const daiusdpurchase = parseFloat(data.object.daiusd.purchase_price);
    const daiarspurchase = parseFloat(data.object.daiars.purchase_price);
    buenBitDAI = {
      Compra: daiarspurchase / daiusdselling,
      Venta: daiarsselling / daiusdpurchase
    }
  } catch (e) {
    //failed to load buenbit
  }
  items.push({ "Nombre": "DÓLAR BUEN BIT", ...buenBitDAI });
  let ripoUSDC;
  try {
    ripoUSDC = await got(RIPIO_USDC_URL, { json: true});
  }catch {
    ripoUSDC = {body:{"pair":"USDC_ARS","last_price":"0","low":"0","high":"0","variation":"0","volume":"0","base":"USDC","base_name":"USD Coin","quote":"ARS","quote_name":"Argentine Peso","bid":"0","ask":"0","avg":"0","ask_volume":"0","bid_volume":"0"}};
  }
  items.push({"Nombre":"USDC RIPIO", ...ripoUSDC.body});

  const satoshi = first(coins.filter(c => c.Nombre === 'USDC SATOSHI'));
  const message = getMainMessage(satoshi);
  let menu = [];
  menu.push({
    text: message,
    color: bitbar.darkMode ? "white" : "black",
    dropdown: false,
  });
  menu.push(bitbar.separator);
  menu = menu.concat(
    MONEDAS.map(({ Nombre, replace }) => {
      const item = find(items, { Nombre });
      return {
        text: replace(item),
        font: "Courier New",
        trim: false,
        color: bitbar.darkMode ? "white" : "black",
        size: 12,
      };
    })
  );
  menu.push(bitbar.separator);
  menu.push({
    text: "🔄 Refresh",
    refresh: true,
  });
  bitbar(menu);
}

getDolarStats();
