const Base = require('./base');

class Blue extends Base {

    constructor() {
        super();
        this._name = 'BLUE';
        this._base_url = 'https://mercados.ambito.com//dolar/informal/variacion';
    }

    parseStats() {
        const venta = Base.parse(this._stats.venta);
        let variacion = Base.parse(this._stats.variacion);
        variacion = parseFloat(variacion);
        if (variacion > 2) {
            return `💸 $${venta}`;
        } else if (variacion > 0) {
            return `📈 $${venta}`;
        } else if (variacion < 0) {
            return `📉 $${venta}`;
        } else {
            return `$${venta}`;
        }
    }
}

module.exports = Blue;