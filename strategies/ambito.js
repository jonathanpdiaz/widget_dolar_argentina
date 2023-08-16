const Base = require('./base')

class Ambito extends Base {
  constructor() {
    super()
    this._name = 'AMBITO'
    this._base_url = 'https://mercados.ambito.com//mercados/monedas'
  }

  parseStats() {
    const keys = [
      { key: 'D\u00f3lar BNA', label: '🇦🇷' },
      { key: 'D\u00f3lar Ahorro', label: '🛏️' },
      { key: 'D\u00f3lar Qatar', label: "💳" },
      { key: 'D\u00f3lar Informal', label: '💙' },
      { key: "D\u00f3lar Mayorista", label: "🏦" },
    ]
    const stats = []
    for (const item of keys) {
      const { compra, venta, variacion } = this._stats.find((stat) => stat.nombre === item.key)
      const label = `${item.label}\t$${Base.parse(compra)}/$${Base.parse(venta)} ~ ${Base.parse(variacion)}%`
      stats.push({ label })
    }
    return stats
  }
}

module.exports = Ambito
