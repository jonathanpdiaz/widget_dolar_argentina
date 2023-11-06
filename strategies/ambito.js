const Base = require('./base')

class Ambito extends Base {
    constructor() {
        super();
        this._name = 'AMBITO';
        this._base_url = 'https://mercados.ambito.com//mercados/monedas';
    }

    parseStats() {
        const keys = [
            { key: 'Dólar BNA', label: '🇦🇷' },
            { key: 'Dólar Ahorro', label: '🛏️' },
            { key: 'Dólar Qatar', label: "💳" },
            { key: 'Dólar Informal', label: '💙' },
            { key: "Dólar Mayorista", label: "🏦" },
        ];
        return keys.map(item => {
            const { compra, venta, variacion } = this._stats.find((stat) => stat.nombre === item.key)
            const label = `${item.label}\t$${Base.parse(compra)}/$${Base.parse(venta)} ~ ${Base.parse(variacion)}%`
            return { label };
        });
    }
}

module.exports = Ambito;
