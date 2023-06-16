const Base = require('./base');

class Ambito extends Base {

    constructor() {
        super();
        this._name = 'AMBITO';
        this._base_url = 'https://mercados.ambito.com//home/general3';
    }

    parseStats() {
        const keys = [
            { key: "D\u00f3lar BNA", label: "🇦🇷" },
            { key: 'D\u00f3lar Qatar', label: "💳" },
            { key: "D\u00f3lar Informal", label: "💙" }
        ]
        return keys.map(item => {
            const { compra, venta, variacion } = this._stats.find(stat => stat.nombre === item.key);
            return { label: `${item.label}\t$${Base.parse(compra)}/$${Base.parse(venta)} ~ ${Base.parse(variacion)}%` }
        })
    }
}

module.exports = Ambito;