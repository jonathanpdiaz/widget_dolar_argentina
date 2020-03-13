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
const { nth, template, get, values } = require("lodash");
const he = require("he");

const STATS_INFO_URL =
  "https://www.cronista.com/MercadosOnline/json/eccheader.json?_rnd=282633634327";
const MAE_ROFEX_URL = "http://www.mae.com.ar/mercados/Forex/Default.aspx";
const RIESGO_URL =
  "https://static.coins.infobae.com/cotizacion-simple/dolar-riesgo.json";

const STATS_INFO_INDEX = [
  {
    currency: "Dólar B.Nación",
    replace: template(
      "🏦 $${parseFloat(valorcompra).toFixed(2)}/$${parseFloat(valorventa).toFixed(2)} ~ ${parseFloat(variacion).toFixed(2)}%"
    ),
    index: 0
  },
  {
    currency: "Dólar Blue",
    replace: template(
      "🔵 $${parseFloat(valorcompra).toFixed(2)}/$${parseFloat(valorventa).toFixed(2)} ~ ${parseFloat(variacion).toFixed(2)}%"
    ),
    index: 1
  },
  {
    currency: "Merval",
    replace: template(
      "${parseFloat(variacion) > 0 ? '📈': '📉'} $${parseFloat(valor).toFixed(2)} ~ ${parseFloat(variacion).toFixed(2)}% ${parseFloat(variacion) < -2 ? '🔥':''}"
    ),
    index: 2
  }
];

function getMainMessage(currency) {
  const venta =
    currency && currency.valorventa && currency.valorventa.toFixed(2);
  const variacion = currency && currency.variacion;
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

async function getMAEForex() {
  const site = await got(MAE_ROFEX_URL);
  const $ = cheerio.load(site.body);
  const text = $("#ctl00_ContentPlaceHolder1_UpdatePanel1 div").html();
  return text;
}

async function getDolarStats() {
  const info = await got(STATS_INFO_URL, { json: true });
  const riesgo = await got(RIESGO_URL, { json: true });
  const items = values(info.body);
  const dolar = nth(items, 1);
  const message = getMainMessage(dolar);
  let menu = [];
  menu.push({
    text: message,
    color: bitbar.darkMode ? "white" : "black",
    dropdown: false
  });
  menu.push(bitbar.separator);
  menu = menu.concat(
    STATS_INFO_INDEX.map(({ index, replace }) => {
      const item = nth(items, index);
      return {
        text: replace(item),
        size: 12
      };
    })
  );
  menu.push(bitbar.separator);
  menu.push({
    text: `💣 ${get(riesgo.body, "items[1].unico")}`,
    size: 13
  });
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
