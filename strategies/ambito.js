const Base = require('./base')

class Ambito extends Base {
  constructor() {
    super()
    this._name = 'AMBITO'
    this._base_url = 'https://mercados.ambito.com//mercados/monedas'
  }

  parseStats() {
    const keys = [
      { key: 'Dólar BNA', label: '🇦🇷' },
      { key: 'Dólar Ahorro', label: '🛏️' },
      { key: 'Dólar Tarjeta', label: '💳' },
      { key: 'Dólar Informal', label: '💙' },
      { key: 'Dólar Mayorista', label: '🏦' },
    ]
    let values = []
    keys.forEach((item) => {
      const find = this._stats.find((stat) => stat.nombre === item.key)
      if (find) {
        const { compra, venta, variacion } = find
        const label = `${item.label}\t$${Base.parse(compra)}/$${Base.parse(venta)} ~ ${Base.parse(variacion)}%`
        values.push({ label })
      }
    })
    return values
  }
}

module.exports = Ambito
