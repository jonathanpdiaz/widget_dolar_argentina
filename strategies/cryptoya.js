
const Base = require('./base');

class CryptoYa extends Base {

  static USDC_ICON = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACPVBMVEUAAAAAAAAmdcondcomdMondcondcondcomdcondcondcondcomdcondcondcomdMomdcondcomdMondcomdMondcondcomdcondcondcondcondcondcondcondcondcondcondcomdMondMondcondcondcomdcomdMondcondcomdMondcondcomdMondcondcomdMomdMomdMondcomdMomdMondMondcondMomdMondcondcomdMondcondcomdMomdMsndMondcondcsodsspdssqdssqd8sseMwveswves0wes0yfM0zfM0zfc40fc42fs42f843f844gM87gc89g9A/hNBBhdFEh9JIitNKi9NPjtRQj9VRkNVWk9ZYlNZalddbltddl9hemNhgmdhim9ljm9lmndpqoNtroNtuotxvo9xxpNxypd1zpt13qN54qd55qd58q99+reCCr+CGsuKHsuKJs+KKtOOSueSTuuWVu+WZvuaavuabv+edwOelxemlxummxumnx+mnx+qryeqsyuuty+uuy+uwzOyzzuy20O250u670+6/1u/B1/DC2PDE2fHH2/HI2/HJ3PLM3vLN3/LN3/PQ4fPS4vTT4/TU4/TX5fXY5vXZ5/XZ5/ba5/bb6Pbc6fbe6vff6/fh6/fh7Pfi7fjl7vjn7/no8Pnq8vrr8vru9Prw9fvx9vv1+Pz1+fz2+fz2+f33+v34+v35+/36/P37/P78/f79/f79/v7+/v7///+ulQU9AAAAQHRSTlMAAgoKDAwQEhQWGDY+QEJKTExSVFZYYmRkZmiBh4mPkZWXmZmZpaepwcHD0dPX2d3f4+Xn5+nt8fP19/f5+/v9uZoAZgAAAdpJREFUGBklwYdfzHEcBvDnQ3WUzMxsEQ2jOKPS8717NJwIKZQZQrL3JpSRZI9EZGYUhY5ff5tX1/sN6zdg5NQ56ekpSQlR1g8R0Yl+9gmQiyfGIMJgFjdPlCgnOnHBEMAAMxuWJbl1lU7S9hJJyxPMDEDcMnLlxa5mkoEH3ZdXMZATD8Ci54ulL72GCoractd7XSZm+gAkSkVvuqsld7VWUnVXW7E0GRjoJ697+0iWtrasJQN7/9aTS30YRW0K14s63dP5++d+ilf+lVNjME06522W2xC+kRd6+EVSWfiSNBOzyUdvRZZ7F8iSCgbIZ88ZSEU69alBYt4Lr7nueBFF1n2nMjCXbL9NRxc6drPFexciee0HmYmUoJofS8E1OwqlM727JTV+lNIwnar9tVrc1XtU7qS3Ta6w445TMkaTld4pxxX3/zQ19TSKPOwdIMcjaon0pGNjUAU1H74dzJfWt7cVKHsQbJJU3tlaKrGxRc4VP+3Z6dwMADEZZFX310N5LC6hqt6Hj5D+WMAQv1za+qr3XlDSrd7Pe6TcEWYwWEKOlF9zlnI6fyLkXO44GCKGZjo6R8cI/3D0MZjBNyVLCqpPdlKs9YHBDAbf2FmpCxelJU8YDBhg+A8q16AC+g8gAwAAAABJRU5ErkJggg==";

  constructor() {
    super();
    this._name = "CRYPTOYA-USDC";
    this._base_url = "https://criptoya.com/api/usdc/ars/1";
    this._icon = CryptoYa.USDC_ICON;
  }

  parseStats() {
    const defaultLabelLength = 12;
    const keys = [
      { key: "huobi", label: "Huobi" },
      { key: "bitex", label: "Bitex" },
      { key: 'buenbit', label: "Buenbit" },
      { key: "ripio", label: "Ripio" },
      { key: "satoshitango", label: "Satoshi" },
      { key: "lemoncash", label: "Lemon" },
      { key: "belo", label: "Belo" },
      { key: "letsbit", label: "Let'sBit" },
      { key: "fiwind", label: "Fiwind" },
      { key: "binance", label: "Binance" },
      { key: "vibrant", label: "Vibrant" }
    ]
    let values = [];
    keys.forEach(item => {
      if (this._stats[item.key]) {
        const { totalAsk, totalBid } = this._stats[item.key];
        let labelLength = item.label.length;
        const label = labelLength < defaultLabelLength
          ? item.label.concat(" ".repeat(defaultLabelLength - labelLength))
          : item.label;
        const value = `$${Base.parse(totalBid)}/$${Base.parse(totalAsk)}`;
        values.push({
          totalAsk,
          totalBid,
          image: this._icon,
          label: `${label}\t${value}`
        })
      }
    });
    values = values.sort((a, b) => a.totalBid - b.totalBid);
    return values.map(item => {
      const { label, image } = item;
      return { label, image };
    });
  }

}

module.exports = CryptoYa;