const Base = require('./base');
const { get } = require('lodash');

class SeSocio extends Base {

    constructor() {
        super();
        this._name = 'SE_SOCIO';
        this._base_url = 'https://ssbe.ssbacktrap.com/core/api/v2/projects?page[size]=1&filter[project_title_id]=usd-coin&filter[country]=AR&filter[show_currency]=IARS&extra_fields[projects]=variations,original_part_values,sale_value,curve_actual_bonus';
        this._headers = { referer: ' https://www.sesocio.com/' }
    }

    parseStats() {
        const lastPrice = get(this._stats, 'data[0].attributes.sale_value');
        const variation = get(this._stats, 'data[0].attributes.variations.ARS');
        return `USDC SS\t$${lastPrice} ~ ${Number.parseFloat(variation).toFixed(3)}%`;
    }
}

module.exports = SeSocio;