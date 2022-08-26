const Base = require('./base');

class Ripio extends Base {

    constructor() {
        super();
        this._name = 'RIPIO';
        this._base_url = 'https://api.exchange.ripio.com/api/v1/rate/USDC_ARS/';
    }

    parseStats() {
        const usdc = this._stats;
        if (usdc) {
            const last_price = Base.parse(usdc.last_price);
            const low = Base.parse(usdc.low);
            const high = Base.parse(usdc.high);
            const variation = Base.parse(usdc.variation);
            return { label: `USDC RP\t$${last_price} [$${low}-$${high}] ~ ${variation}%` }
        }
    }
}

module.exports = Ripio;