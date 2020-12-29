module.exports = {
	name: 'player',
	async execute(message, args, playerInfo, methods) {

		const fetch = require('node-fetch');
		const discord = require('discord.js');

		let response = await fetch(`https://api.hypixel.net/player?key=${process.env.api_key}&name=${playerInfo.name}`);
		let { player } = await response.json();

		if (!playerInfo.found) {
			message.reply("I can't find any stats for the player `" + args[1] + "`");
		} else {
			response = await fetch(`https://api.hypixel.net/status?key=${process.env.api_key}&uuid=${playerInfo.uuid}`);
			let { session } = await response.json();

			let networkLevel = (Math.sqrt((2 * player.networkExp) + 30625) / 50) - 2.5;

			let embed = new discord.MessageEmbed()
				.setTitle(`${playerInfo.rank} ${playerInfo.name}`)
				.addFields(
					{ name: "Network Level", value: networkLevel.toFixed(2), inline: true},
					{ name: "First Login", value: await methods.get("date").execute(player.firstLogin), inline: true},
					{ name: "Last Login", value: await methods.get("date").execute(player.lastLogin), inline: true},
					{ name: "Karma", value: player.karma, inline: true},
					{ name: "Achievement Points", value: player.achievementPoints, inline: true},
				)
				.setThumbnail(`https://crafatar.com/renders/body/${playerInfo.uuid}?overlay`)

			if (session.online) {
				embed.addFields(
					{ name: "Status", value: "Online", inline: false},
					{ name: "Current Game", value: session.gameType, inline: true},
					{ name: "Current Map", value: session.mode, inline: true},
				)
			} else {
				embed.addField("Status", "Offline", false);
			}


			await message.channel.send(embed);
		}
	},
};
