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
const { nth, template, find } = require("lodash");

const STATS_INFO_URL =
  `https://www.cronista.com/templateGetPrincipal.html?r=${Math.random() * 10000}`;

const SATOSHI_COINS_URL = 'https://api.satoshitango.com/v3/graph/ARS';

const MONEDAS = [
  {
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
  },
  {
    Nombre: "USDC",
    replace: template(
      "USDC\t$${parseFloat(low).toFixed(2)}/$${parseFloat(high).toFixed(2)} ~ ${parseFloat(change)}%"
    )
  },
  {
    Nombre: "BITCOIN USD",
    replace: template(
      "BTC\tUS$${parseFloat(Compra).toFixed(2)}/US$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  }
];

function getMainMessage(currency) {
  const venta =
    currency && currency.Venta && currency.Venta.toFixed(2);
  const variacion = currency && currency.VariacionPorcentual;
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
  const info = await got(STATS_INFO_URL, { json: true });
  const { monedas, indices, commodities, acciones, tasas, bonos } = info.body;
  const rawCoins = await got(SATOSHI_COINS_URL, { json: true });
  const { data: { graph } } = rawCoins.body;
  const coins = Object.keys(graph).map(Nombre => {
    return { Nombre, ...graph[Nombre] }
  });
  const items = monedas.concat(coins);
  const dolar = nth(monedas, 1);
  const message = getMainMessage(dolar);
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
