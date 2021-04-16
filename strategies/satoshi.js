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
            const lastPrice = Base.parse(last(usdc.graph));
            const low = Base.parse(usdc.low);
            const high = Base.parse(usdc.high);
            const change = Base.parse(usdc.change);
            return `USDC ST\t$${lastPrice} [$${low}-$${high}] ~ ${change}%`
        }
    }
}

module.exports = Satoshi;