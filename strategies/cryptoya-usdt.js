
const CryptoYa = require('./cryptoya');


class CryptoYaUSDT extends CryptoYa {

    static USDT_ICON = "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"

    constructor() {
        super();
        this._name = 'CRYPTOYA-USDT';
        this._base_url = 'https://criptoya.com/api/usdt/ars/1';
        this._icon = CryptoYaUSDT.USDT_ICON;
    }
}

module.exports = CryptoYaUSDT;