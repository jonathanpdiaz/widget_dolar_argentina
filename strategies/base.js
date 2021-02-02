const got = require('got');

class Base {

    constructor() {
        this._base_url = undefined;
        this._name = undefined;
    }

    static parse(amount) {
        if (typeof amount === 'string') {
            amount = amount.replace(',', '.');
            amount = amount.replace('%', '');
        }
        amount = parseFloat(amount).toFixed(2);
        return amount;
    }

    async getStats() {
        if (!this._base_url) {
            throw new Error('Missing base url');
        }
        const response = await got(this._base_url, { json: true });
        this._stats = response.body;
        return this._stats;
    }

}

module.exports = Base;