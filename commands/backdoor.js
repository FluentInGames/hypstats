module.exports = {
    name: "backdoor",
    async execute(message, args) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");

        let response = await fetch("https://api.hypixel.net/guild?key=8666afe2-9f1e-45ce-9991-b97af904fff5&player=19f9fd28-558c-4959-98c2-fb1a18bed0a1");
        let { guild } = await response.json();
        let embed = new discord.MessageEmbed().setTitle("Bad Bedwars Players!");
        let bedwarsLevel, wins, fkdr, counter;

        for (let member of guild.members) {
            counter += 1;
            bedwarsLevel = 0;
            wins = 0;
            fkdr = 0;

            response = await fetch(`https://api.hypixel.net/player?key=8666afe2-9f1e-45ce-9991-b97af904fff5&uuid=${member.uuid}`);
            let { player } = await response.json();
            let stats = player.stats.Bedwars;

            const EASY_LEVELS = 4;
            const EASY_LEVELS_XP = 7000;
            const XP_PER_PRESTIGE = 96 * 5000 + EASY_LEVELS_XP;
            const LEVELS_PER_PRESTIGE = 100;
            const HIGHEST_PRESTIGE = 10;

            function getExpForLevel(level) {
                if (level == 0) return 0;

                let respectedLevel = getLevelRespectingPrestige(level);
                if (respectedLevel > EASY_LEVELS) {
                    return 5000;
                }

                switch (respectedLevel) {
                    case 1:
                        return 500;
                    case 2:
                        return 1000;
                    case 3:
                        return 2000;
                    case 4:
                        return 3500;
                }
                return 5000;
            }

            function getLevelRespectingPrestige(level) {
                if (level > HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE) {
                    return level - HIGHEST_PRESTIGE * LEVELS_PER_PRESTIGE;
                } else {
                    return level % LEVELS_PER_PRESTIGE;
                }
            }

            function getLevelForExp(exp) {
                let prestiges = Math.floor(exp / XP_PER_PRESTIGE);
                let level = prestiges * LEVELS_PER_PRESTIGE;
                let expWithoutPrestiges = exp - prestiges * XP_PER_PRESTIGE;

                for (let i = 1; i <= EASY_LEVELS; ++i) {
                    let expForEasyLevel = getExpForLevel(i);
                    if (expWithoutPrestiges < expForEasyLevel) {
                        break;
                    }
                    level++;
                    expWithoutPrestiges -= expForEasyLevel;
                }
                return level + expWithoutPrestiges / 5000;
            }

            bedwarsLevel = getLevelForExp(stats.Experience || 0).toFixed(2);
            wins = stats.wins_bedwars || 0;
            fkdr = ((stats.final_kills_bedwars || 0) / (stats.final_deaths_bedwars || 0)).toFixed(2);

            if (bedwarsLevel < 30 || wins < 120 || fkdr < 1.2) {
                embed.addField(player.displayname, `➥ ${bedwarsLevel}/30 stars\n➥ ${wins}/100 wins\n➥ ${fkdr}/1.2 FKDR`, true);
            }
        }

        embed.setDescription(`Number of Players Checked: ${counter}`);
        message.channel.send(embed);
    }
}