const Base = require('./base');
const { get, last } = require('lodash');

class Satoshi extends Base {

    constructor() {
        super();
        this._name = 'SATOSHI';
        this._base_url = 'https://api.satoshitango.com/v3/graph/ARS';
    }

    parseStats() {
        const usdc = get(this._stats, 'data.graph.USDC');
        if (usdc) {
            const lastPrice = last(usdc.graph)
            const low = parseFloat(usdc.low).toFixed(2);
            const high = parseFloat(usdc.high).toFixed(2);
            return `USDC ST\t$${lastPrice} [$${low}-$${high}] ~ ${usdc.change}%`
        }
    }
}

module.exports = Satoshi;