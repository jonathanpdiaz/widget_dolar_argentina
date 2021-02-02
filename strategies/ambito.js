const Base = require('./base');

class Ambito extends Base {

    constructor() {
        super();
        this._name = 'AMBITO';
        this._base_url = 'https://mercados.ambito.com//home/general';
    }

    parseStats() {
        const keys = [
            { key: "D\u00f3lar Oficial", label: "🇦🇷" },
            { key: 'D\u00f3lar Turista', label: "💳" },
            { key: "D\u00f3lar Informal", label: "💙" },
            { key: "D\u00f3lar Mayorista", label: "🏦" },
        ]
        return keys.map(item => {
            const stat = this._stats.find(stat => stat.nombre === item.key);
            if (stat) {
                return `${item.label}\t$${stat.compra}/$${stat.venta} ~ ${stat.variacion}`
            }
        })
    }
}

module.exports = Ambito;