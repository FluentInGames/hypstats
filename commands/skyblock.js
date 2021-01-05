const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
	name: 'skyblock',
	async execute(message, args, playerInfo) {

		let response = await fetch(`https://sky.shiiyu.moe/api/v2/profile/${args[1]}`);
		let data = await response.json();

		if (data.error) {
			message.reply("I can't find any stats for the player `" + args[1] + "`");

		} else {
			if (args.length !== 3) {
				let profiles = new Discord.MessageEmbed()
					.setTitle(`${playerInfo.rank} ${playerInfo.name}'s Skyblock Profiles`)
					.setDescription("Usage: ```;sb <username> <profile>```\n")
					.setThumbnail(`https://crafatar.com/avatars/${playerInfo.uuid}?overlay`)
				let profileList = "";
				for (let [key, value] of Object.entries(data.profiles)) {
					for (let member of value.data.members) {
						profileList += `${member.display_name}\n`;
					}
					profiles.addField(value.cute_name, `${playerInfo.name}\n` + profileList, true);
					profileList = "";
				}

				await message.channel.send(profiles);

			} else {
				let profile;
				for (let [key, value] of Object.entries(data.profiles)) {
					if (value.cute_name.toLowerCase() === args[2]) {
						profile = value;
					}
				}
				let basicStats = new Discord.MessageEmbed()
					.setTitle(`${playerInfo.rank} ${playerInfo.name} | ${profile.cute_name}`)
					.setThumbnail(`https://crafatar.com/avatars/${playerInfo.uuid}?overlay`)

				let baseStats = [
					"health", "defense", "strength", "speed", "crit_chance",
					"crit_damage", "bonus_attack_speed", "intelligence",
					"sea_creature_chance", "magic_find", "pet_luck", "ferocity", "ability_damage"
				];
				let prettyNames = [
					"❤ Health", "❈️ Defense", "❁ Strength", "✦ Speed",
					"☣ Crit Chance", "☠ Crit Damage", "⚔ Attack Speed",
					"✎ Intelligence", "α Sea Creature Chance", "✯ Magic Find",
					"☘ Pet Luck", "⫽ Ferocity", "Ability Damage"
				];

				let pretty = 0;
				baseStats.forEach(stat => {
					let total = profile.data.stats[stat];
					basicStats.addField(prettyNames[pretty], "```" + total + "```", true);
					pretty += 1;
				});

				await message.channel.send(basicStats);

			}
		}
	}
};
