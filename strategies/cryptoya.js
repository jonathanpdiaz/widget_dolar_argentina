
const Base = require('./base');

class CryptoYa extends Base {

    constructor() {
        super();
        this._name = 'CRYPTOYA';
        this._base_url = 'https://criptoya.com/api/usdc/ars/1';
    }

    parseStats() {
        const keys = [
            { key: "bitex", label: "bitex" },
            { key: 'buenbit', label: "buenbit" },
            { key: "ripio", label: "ripio" },
            { key: "satoshitango", label: "satoshi" },
            { key: "lemoncash", label: "lemon" },
            { key: "belo", label: "belo" },
            { key: "letsbit", label: "letsbit" },
        ]
        let values = keys.map(item => {
            const { ask, bid } = this._stats[item.key];
            return {
                ask,
                bid,
                label: `USDC [${item.label}]\t$${Base.parse(bid)}/$${Base.parse(ask)}`
            }
        });
        values = values.sort((a, b) => a.bid - b.bid);
        return values.map(item => {
            const { label } = item;
            return label;
        });
    }

}

module.exports = CryptoYa;