module.exports = {
    name: "bedwars2",
    async execute(message, args, methods) {

        const discord = require("discord.js");
        const fetch = require("node-fetch");
        const { modes, pretty_modes, stats, pretty_stats } = require("./bw_modes.json");
        const playerInfo = await methods.get("playerInfo").execute(args[1]);

        if (!playerInfo.found) {
            message.reply("I can't find any stats for the player `" + args[1] + "`");
        } else {

            let response = await fetch(`https://api.hypixel.net/player?key=${process.env.api_key}&uuid=${playerInfo.uuid}`);
            let { player } = await response.json();
            const apistats = player.stats.Bedwars;

            let current_page = 0;
            const pages = [];

            const level = await methods.get("bedwarsLevel").execute(apistats.Experience);

            let quick = new discord.MessageEmbed()
                .setTitle(playerInfo.rank + " " + playerInfo.name + " | Quick Stats")
                .addFields(
                    { name: "Level", value: level.toFixed(2) || 0, inline: true},
                    { name: "Final K/D", value: (apistats.final_kills_bedwars / apistats.final_deaths_bedwars).toFixed(2) || 0, inline: true},
                    { name: "Win Rate", value: (apistats.wins_bedwars / apistats.games_played_bedwars).toFixed(2) || 0, inline: true}
                )
                .setFooter("Requested by " + message.author.username)
                .setColor(0xff5100)
                .setThumbnail(`https://crafatar.com/avatars/${playerInfo.uuid}?overlay`)
                .setTimestamp()
            pages.push(quick);

            let bedwars_general = new discord.MessageEmbed()
                .setTitle(playerInfo.rank + " " + playerInfo.name + " | Overall")
                .setDescription("Note: These stats do not include Bedwars Dream modes!")
                .addFields(
                    {name: "Bedwars Level", value: level.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "★", inline: true,},
                    {name: "Coins", value: (apistats.coins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true,},
                    {name: "Loot Chests", value: (apistats.bedwars_boxes || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true,},
                )
                .setFooter("Requested by " + message.author.username)
                .setColor(0xff5100)
                .setThumbnail(`https://crafatar.com/avatars/${playerInfo.uuid}?overlay`)
                .setTimestamp()

            stats.forEach(stat => {
                if (stat.includes("|")) {
                    let combo = stat.split("|");
                    let calc = apistats[combo[0].slice(1)] / apistats[combo[1].slice(1)];
                    bedwars_general.addField(pretty_stats[stats.indexOf(stat)], calc.toFixed(2) || 0, true);
                } else {
                    bedwars_general.addField(pretty_stats[stats.indexOf(stat)], apistats[stat.slice(1)] || 0, true);
                }
            });
            pages.push(bedwars_general);

            modes.forEach(mode => {
                let name = pretty_modes[modes.indexOf(mode)];
                let embed = new discord.MessageEmbed();
                embed.setTitle(playerInfo.rank + " " + playerInfo.name + " | " + name);
                stats.forEach(stat => {
                    if (stat.includes("|")) {
                        let combo = stat.split("|");
                        let calc = apistats[mode + combo[0]] / apistats[mode + combo[1]];
                        embed.addField(pretty_stats[stats.indexOf(stat)], calc.toFixed(2) || 0, true);
                    } else {
                        embed.addField(pretty_stats[stats.indexOf(stat)], apistats[mode + stat] || 0, true);
                    }
                });
                embed.setFooter("Requested by " + message.author.username);
                embed.setColor(0xff5100);
                embed.setThumbnail(`https://crafatar.com/avatars/${playerInfo.uuid}?overlay`);
                embed.setTimestamp();
                pages.push(embed);
            });


            await message.channel.send(pages[0]).then(m => {
               m.react("⬅️");
               m.react("➡️");

               const filter = (reaction, user) => (reaction.emoji.name === "⬅️" || reaction.emoji.name === "➡️") && user.id === message.author.id;
               const collector = m.createReactionCollector(filter, { max: 10000, time: 5 * 60000});

               collector.on("collect", reaction => {
                   if (reaction.emoji.name === "⬅️") {
                       current_page -= 1;
                       if (current_page < 0) {
                           current_page = pages.length - 1;
                       }
                   } else {
                       current_page += 1;
                       if (current_page > pages.length) {
                           current_page = 0;
                       }
                   }

                   m.edit(pages[current_page]).then(m => {
                       m.react("⬅️");
                       m.react("➡️");
                   });
               });
            });
        }
    }
};