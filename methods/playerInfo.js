module.exports = {
    name: "playerInfo",
    async execute(username) {
        const fetch = require("node-fetch");

        let playerInfo = {};
        let response = await fetch(`https://api.hypixel.net/player?key=8666afe2-9f1e-45ce-9991-b97af904fff5&name=${username}`);
        let data = await response.json();

        if (!data.player) {
            playerInfo = {
                found: false,
                name: null,
                uuid: null,
                rank: null,
            }
        } else {
            let rank = "";
            let generalRank = data.player.newPackageRank;
            let specialRank = data.player.rank;
            let monthlyRank = data.player.monthlyPackageRank;
            if (monthlyRank === "SUPERSTAR") {
                rank = "[MVP++]";
            } else if (specialRank) {
                if (specialRank === "ADMIN") {
                    rank = "[ADMIN]";
                } else if (specialRank === "MODERATOR") {
                    rank = "[MOD]";
                } else if (specialRank === "HELPER") {
                    rank = "[HELPER]";
                } else if (specialRank === "YOUTUBER") {
                    rank = "[YOUTUBE]";
                }
            } else if (generalRank) {
                if (generalRank === "VIP_PLUS") {
                    rank = "[VIP+]";
                } else if (generalRank === "VIP") {
                    rank = "[VIP]";
                } else if (generalRank === "MVP_PLUS") {
                    rank = "[MVP+]";
                } else if (generalRank === "MVP") {
                    rank = "[MVP]";
                }
            } else {
                rank = "";
            }

            playerInfo = {
                found: true,
                name: data.player.displayname,
                uuid: data.player.uuid,
                rank: rank,
            }
        }

        return playerInfo;
    }
}