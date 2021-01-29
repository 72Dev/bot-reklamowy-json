exports.run = client => {
    setInterval(() => {
        const reklama_json = require("../../data/reklama.json");
        const serwery = [];
        client.guilds.cache.forEach(serwer_each => {
            const json = reklama_json[serwer_each.id];
            if (!json) return;

            const spr_serwer = client.guilds.cache.get(serwer_each.id);
            if (!spr_serwer) return;

            if (!json.weryfikacja === "tak") return;

            const kanal = client.channels.cache.get(json.kanal);
            if (!kanal) return;

            serwery.push(serwer_each.id);

            let serwer_random = serwery[Math.floor(Math.random() * serwery.length)];
            if(serwer_random = serwer_each.id) serwer_random = serwery[Math.floor(Math.random() * serwery.length)];
            const reklama = reklama_json[serwer_random];

            kanal.send(reklama.reklama+"\n\n"+reklama.zaproszenie);
        });
    }, 5 * 60 * 1000);
};
