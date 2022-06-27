const Base = require('./base');
const Cheerio = require('cheerio');

class Infodolar extends Base {

    constructor() {
        super();
        this._name = 'INFODOLAR';
        this._base_url = 'https://www.infodolar.com/';
    }

    getStats() {
        return super.getStats({ method: 'GET', json: false });
    }

    parseStats() {
        const $ = Cheerio.load(this._stats);
        const cotizaciones = $('#DolarPromedio tbody tr').children();
        const stats = cotizaciones.map(cotizacion => {
            const name = cotizacion.text();
            return { name };
        })
    }
}

module.exports = Infodolar;