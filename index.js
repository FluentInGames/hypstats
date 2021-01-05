const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
const prefix = ";";


// bot commands
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// bot methods
bot.methods = new Discord.Collection();
const methodFiles = fs.readdirSync("./methods").filter((file) => file.endsWith(".js"));
for (const file of methodFiles) {
    const method = require(`./methods/${file}`);
    bot.methods.set(method.name, method);
}


bot.login(process.env.BOT_TOKEN);

bot.on("ready", () => {
    console.log("Bot online!");

    const activity = require("./activity.json");
    let index = Math.floor(Math.random() * (activity.phrases.length - 1) + 1);
    bot.user.setActivity(activity.phrases[index].phrase);

    setInterval(() => {
      let index = Math.floor(Math.random() * (activity.phrases.length - 1) + 1);
      bot.user.setActivity(activity.phrases[index].phrase);
    }, 25000);
});

bot.on("message", async message => {
    if (message.author.bot) return;

    let command = message.content.slice(1).toLowerCase();
    let args = command.split(" ");

    let rand_num = Math.floor(Math.random() * 10000);
    console.log(rand_num);
    if (rand_num === 1) {
      let prize = new Discord.MessageEmbed().setDescription('Congratulations lucky user, you have been chosen to recieve [this amazing gift](https://bit.ly/3lQ9CfX "A special gift just for you!")!');
      await message.channel.send(prize);
    }

    if (message.content.startsWith(prefix)) {
        let playerInfo = await bot.methods.get("playerInfo").execute(args[1]);
        if (!playerInfo.name) return message.channel.send(`:x: I can't find any players with the name ${args[1]}`);

        if (args[0] === "bw" || args[0] === "bedwars") {
          if (args.length !== 2) return bot.commands.get("bedwars").help(message, args);
          bot.commands.get("bedwars").execute(message, args, bot.methods, playerInfo);

        } else if (args[0] === "sb" || args[0] === "skyblock") {
          if (message.author.id !== "398890149607637013") return message.channel.send("This command is not yet functional, please come back later!");
          bot.commands.get("skyblock").execute(message, args, playerInfo);

        } else if (args[0] === "p" || args[0] === "player") {
          bot.commands.get("player").execute(message, args, playerInfo, bot.methods);

        }
    }
});
