const Base = require('./base');
const { get, first } = require('lodash');

class Ripio extends Base {

    constructor() {
        super();
        this._name = 'RIPIO';
        this._base_url = 'https://api.exchange.ripio.com/api/v1/rate/USDC_ARS/';
    }

    parseStats() {
        const usdc = this._stats;
        if (usdc) {
            const last_price = parseFloat(usdc.last_price).toFixed(2);
            const low = parseFloat(usdc.low).toFixed(2);
            const high = parseFloat(usdc.high).toFixed(2);
            return `USDC RP\t$${last_price} [$${low}-$${high}] ~ ${usdc.variation}%`
        }
    }
}

module.exports = Ripio;