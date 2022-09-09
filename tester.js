const strategy = require('./strategies/cryptoya');

async function applyStrategy(strategy) {
    const instance = new strategy();
    try {
        await instance.getStats();
    } catch (error) {
        return `${instance._name} request failed.`;
    }
    try {
        const data = instance.parseStats();
        return data;
    } catch (e) {
        return `${instance._name} parse failed.`;
    }
}

async function getStats() {
    const data = await applyStrategy(strategy);
    console.log(data);
}

getStats()