const Base = require('./base');
const { get } = require('lodash');

class SeSocioBTC extends Base {

    constructor() {
        super();
        this._name = 'SE_SOCIO';
        this._base_url = 'https://ssbe.ssbacktrap.com/core/api/v2/projects?page[size]=1&filter[project_title_id]=bitcoin&filter[country]=AR&filter[show_currency]=IUSD&extra_fields[projects]=variations,original_part_values,sale_value,curve_actual_bonus';
        this._headers = { referer: ' https://www.sesocio.com/' }
    }

    parseStats() {
        const lastPrice = get(this._stats, 'data[0].attributes.sale_value');
        const variation = get(this._stats, 'data[0].attributes.variations.ARS');
        return `BTC SS\t$${lastPrice} ~ ${Number.parseFloat(variation).toFixed(3)}%`;
    }
}

module.exports = SeSocioBTC;