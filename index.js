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
const cheerio = require("cheerio");
const { find, template } = require("lodash");
const he = require("he");

const STATS_INFO_URL =
  "https://www.cronista.com/MercadosOnline/json/getValoresCalculadora.html";
const MAE_ROFEX_URL = "http://www.mae.com.ar/mercados/Forex/Default.aspx";

const STATS_INFO_INDEX = [
  {
    currency: "DÓLAR B. NACIÓN",
    replace: template(
      "🏦 $${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    currency: "DÓLAR CDO C/LIQ",
    replace: template(
      "💧 $${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    currency: "DÓLAR BLUE",
    replace: template(
      "🔵 $${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%"
    )
  },
  {
    currency: "BITCOIN",
    replace:
      template("⛏ $${parseFloat(Compra).toFixed(2)}/$${parseFloat(Venta).toFixed(2)} ~ ${parseFloat(VariacionPorcentual).toFixed(2)}%")
  }
];

function getMainMessage(currency) {
  const venta = currency && currency.Venta && currency.Venta.toFixed(2);
  const variacion = currency && currency.VariacionPorcentual;
  if (variacion > 2) {
    return `💸 $${venta}`;
  } else if (variacion > 0) {
    return `📈 $${venta}`;
  } else if (variacion < 0) {
    return `📉 $${venta}`;
  } else {
    return `${venta}`;
  }
}

async function getMAEForex() {
  const site = await got(MAE_ROFEX_URL);
  const $ = cheerio.load(site.body);
  const text = $("#ctl00_ContentPlaceHolder1_UpdatePanel1 div").html();
  return text;
}

async function getDolarStats() {
  const info = await got(STATS_INFO_URL, { json: true });
  const items = info.body;
  const dolar = find(items, { Nombre: STATS_INFO_INDEX[0].currency });
  const message = getMainMessage(dolar);
  let menu = [];
  menu.push({
    text: message,
    color: bitbar.darkMode ? "white" : "red",
    dropdown: false
  });
  menu.push(bitbar.separator);
  menu = menu.concat(
    STATS_INFO_INDEX.map(({ currency, replace }) => {
      const item = find(items, { Nombre: currency }) || {};
      return {
        text: replace(item),
        size: 12
      };
    })
  );
  menu.push(bitbar.separator);
  // const mae = await getMAEForex();
  // menu.push({
  //   text: he.decode(mae),
  //   href: MAE_ROFEX_URL,
  //   length: 40,
  //   size: 10
  // });
  menu.push(bitbar.separator);
  menu.push({
    text: "🔄",
    refresh: true
  });
  bitbar(menu);
}

getDolarStats();
