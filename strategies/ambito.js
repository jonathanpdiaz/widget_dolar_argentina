const Base = require('./base');

class Ambito extends Base {

    constructor() {
        super();
        this._name = 'AMBITO';
        this._base_url = 'https://mercados.ambito.com//home/general3';
    }

    parseStats() {
        const keys = [
            { key: "Dólar BNA", label: "🇦🇷" },
            { key: 'Dólar Tarjeta', label: "💳" },
            { key: "Dólar Informal", label: "💙" }
        ]
        return keys.map(item => {
            const { compra, venta, variacion, val1 } = this._stats.find(stat => stat.nombre === item.key);
            if (val1) {
                return { label: `${item.label}\t$${Base.parse(val1)} ~ ${Base.parse(variacion)}%` }
            }
            return { label: `${item.label}\t$${Base.parse(compra)}/$${Base.parse(venta)} ~ ${Base.parse(variacion)}%` }
        })
    }
}

module.exports = Ambito;