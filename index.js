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
const { flatten, compact } = require("lodash");

const Blue = require('./strategies/blue');
const Ambito = require('./strategies/ambito');
const Satoshi = require('./strategies/satoshi');
const Ripio = require('./strategies/ripio');
const Buenbit = require('./strategies/buenbit');

const strategies = [Ambito, Satoshi, Ripio, Buenbit];

async function applyStrategy(strategy) {
    const instance = new strategy();
    try {
        await instance.getStats();
    } catch (error) {
        return `${instance._name} request failed.`;
    }
    try {
        const data = instance.parseStats();
        return data;
    } catch (e) {
        return `${instance._name} parse failed.`;
    }
}

async function getStats() {
    const promises = strategies.map(strategy => {
        return applyStrategy(strategy);
    })
    const items = await Promise.all(promises);
    const menu = compact(flatten(items));
    return menu;
}

async function prepareWidget() {
    const blue = await applyStrategy(Blue);
    let menu = [];
    menu.push(blue);
    menu.push(bitbar.separator);

    const stats = await getStats();
    const coins = stats.map(stat => {
        return {
            text: stat,
            font: "Courier New",
            trim: false,
            color: bitbar.darkMode ? "white" : "black",
            size: 12,
        };
    });
    menu = menu.concat(coins);
    menu.push(bitbar.separator);

    menu.push({
        text: "🔄 Refresh",
        refresh: true,
    });
    bitbar(menu);
}

prepareWidget()