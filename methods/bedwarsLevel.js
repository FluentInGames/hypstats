module.exports = {
    name: "bedwarsLevel",
    async execute(xp) {

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

        return getLevelForExp(xp || 0);
    }
};