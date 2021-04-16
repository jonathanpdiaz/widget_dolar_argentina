const Base = require('./base');

class Buenbit extends Base {

    constructor() {
        super();
        this._name = 'BUENBIT';
        this._base_url = 'https://be.buenbit.com/api/market/tickers/';
    }

    parseStats() {
        const data = this._stats;
        const daiusdselling = parseFloat(data.object.daiusd.selling_price);
        const daiarsselling = parseFloat(data.object.daiars.selling_price);
        const daiusdpurchase = parseFloat(data.object.daiusd.purchase_price);
        const daiarspurchase = parseFloat(data.object.daiars.purchase_price);
        const compra = daiarspurchase / daiusdselling;
        const venta = daiarsselling / daiusdpurchase;
        return `DAI\t$${Base.parse(compra)}/$${Base.parse(venta)}`;
    }
}

module.exports = Buenbit;