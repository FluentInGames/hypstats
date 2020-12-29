module.exports = {
	name: 'duels',
	description: 'Get a player\'s duels stats',
	execute(message, args) {

    const fetch = require('node-fetch')
    const Discord = require('discord.js')

    fetch(`https://api.hypixel.net/player?key=${process.env.api_key}&name=${args[1]}`)
    .then(result => result.json())
    .then(({ player }) => {

      if (!player) {
				message.reply('I can\'t find any stats for that player!')
			}

      var rank = '';
      var generalRank = player.newPackageRank
      var specialRank = player.rank
      var monthlyRank = player.monthlyPackageRank
      if (monthlyRank === 'SUPERSTAR'){
        rank = '[MVP++]'
      } else if (specialRank){
        if (specialRank === 'ADMIN'){
          rank = '[ADMIN]'
        } else if (specialRank === 'MODERATOR'){
          rank = '[MOD]'
        } else if (specialRank === 'HELPER'){
          rank = '[HELPER]'
        } else if (specialRank === 'YOUTUBER'){
          rank = '[YOUTUBE]'
        }
      } else if (generalRank){
        if (generalRank === 'VIP_PLUS'){
          rank = '[VIP+]'
        } else if (generalRank === 'VIP'){
          rank = '[VIP]'
        } else if (generalRank === 'MVP_PLUS'){
          rank = '[MVP+]'
        } else if (generalRank === 'MVP'){
          rank = '[MVP]'
        }
      } else {
        rank = ''
      }

      function getNumeral(number){
        if (number === 1){
          return 'I'
        } else if (number === 2){
          return 'II'
        } else if (number === 3){
          return 'III'
        } else if (number === 4){
          return 'IV'
        } else if (number === 5){
          return 'V'
        } else if (number === 6){
          return 'VI'
        } else if (number === 7){
          return 'VII'
        } else if (number === 8){
          return 'VIII'
        } else if (number === 9){
          return 'IX'
        } else {
          return 'X'
        }
      }




      // skywars
      var skywarsRank = ''
      var numeral
      if (player.stats.Duels.skywars_rookie_title_prestige){
        if (player.stats.Duels.skywars_iron_title_prestige){
          if (player.stats.Duels.skywars_gold_title_prestige){
            if (player.stats.Duels.skywars_diamond_title_prestige){
              if (player.stats.Duels.skywars_master_title_prestige){
                if (player.stats.Duels.skywars_legend_title_prestige){
                  if (player.stats.Duels.skywars_grandmaster_title_prestige){
                    if (player.stats.Duels.skywars_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.skywars_godlike_title_prestige)
                      skywarsRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.skywars_grandmaster_title_prestige)
                      skywarsRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.skywars_legend_title_prestige)
                    skywarsRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.skywars_master_title_prestige)
                  skywarsRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.skywars_diamond_title_prestige)
                skywarsRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.skywars_gold_title_prestige)
              skywarsRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.skywars_iron_title_prestige)
            skywarsRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.skywars_rookie_title_prestige)
          skywarsRank = 'Rookie ' + numeral
        }
      } else {
        skywarsRank = ''
      }

      var skywarsDuelsSolos = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Skywars Duels | Solos')
      .addFields(
        { name: 'Skywars Rank', value: skywarsRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.sw_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_sw_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.sw_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.sw_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline:  true},
        { name: 'W/L', value: (player.stats.Duels.sw_duel_wins / player.stats.Duels.sw_duel_losses).toFixed(2), inline: true},
        { name: 'Kills', value: (player.stats.Duels.sw_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.sw_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.sw_duel_kills / player.stats.Duels.sw_duel_deaths || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var skywarsDuelsDoubles = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Skywars Duels | Doubles')
      .addFields(
        { name: 'Skywars Rank', value: skywarsRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.sw_doubles_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_sw_doubles || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.sw_doubles_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.sw_doubles_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.sw_doubles_wins / player.stats.Duels.sw_doubles_losses).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.sw_doubles_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.sw_doubles_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.sw_doubles_kills / player.stats.Duels.sw_doubles_deaths || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')





      // classic
      var duelsRank = ''
      var numeral
      if (player.stats.Duels.classic_rookie_title_prestige){
        if (player.stats.Duels.classic_iron_title_prestige){
          if (player.stats.Duels.classic_gold_title_prestige){
            if (player.stats.Duels.classic_diamond_title_prestige){
              if (player.stats.Duels.classic_master_title_prestige){
                if (player.stats.Duels.classic_legend_title_prestige){
                  if (player.stats.Duels.classic_grandmaster_title_prestige){
                    if (player.stats.Duels.classic_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.classic_godlike_title_prestige)
                      duelsRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.classic_grandmaster_title_prestige)
                      duelsRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.classic_legend_title_prestige)
                    duelsRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.classic_master_title_prestige)
                  duelsRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.classic_diamond_title_prestige)
                duelsRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.classic_gold_title_prestige)
              duelsRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.classic_iron_title_prestige)
            duelsRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.classic_rookie_title_prestige)
          duelsRank = 'Rookie ' + numeral
        }
      } else {
        duelsRank = ''
      }

       var classicDuels = new Discord.MessageEmbed()
       .setTitle(rank + ' ' + player.displayname + '\'s Classic Duels')
       .addFields(
         { name: 'Classic Rank', value: duelsRank, inline: true},
         { name: 'Games Played', value: (player.stats.Duels.classic_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_classic_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'Kills', value: (player.stats.Duels.classic_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'Deaths', value: (player.stats.Duels.classic_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'K/D', value: ((player.stats.Duels.classic_duel_kills / player.stats.Duels.classic_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'Wins', value: (player.stats.Duels.classic_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'Losses', value: (player.stats.Duels.classic_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
         { name: 'W/L', value: ((player.stats.Duels.classic_duel_wins / player.stats.Duels.classic_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
       )
       .setColor(0xFF5100)
       .setTimestamp()
       .setFooter('HypStats by SirArchibald')





      // sumo
      var sumoRank = ''
      var numeral
      if (player.stats.Duels.sumo_rookie_title_prestige){
        if (player.stats.Duels.sumo_iron_title_prestige){
          if (player.stats.Duels.sumo_gold_title_prestige){
            if (player.stats.Duels.sumo_diamond_title_prestige){
              if (player.stats.Duels.sumo_master_title_prestige){
                if (player.stats.Duels.sumo_legend_title_prestige){
                  if (player.stats.Duels.sumo_grandmaster_title_prestige){
                    if (player.stats.Duels.sumo_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.sumo_godlike_title_prestige)
                      sumoRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.sumo_grandmaster_title_prestige)
                      sumoRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.sumo_legend_title_prestige)
                    sumoRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.sumo_master_title_prestige)
                  sumoRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.sumo_diamond_title_prestige)
                sumoRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.sumo_gold_title_prestige)
              sumoRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.sumo_iron_title_prestige)
            sumoRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.sumo_rookie_title_prestige)
          sumoRank = 'Rookie ' + numeral
        }
      } else {
        sumoRank = ''
      }

      var sumoDuels = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Sumo Duel')
      .addFields(
        { name: 'Sumo Rank', value: sumoRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.sumo_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_sumo_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.sumo_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.sumo_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.sumo_duel_kills / player.stats.Duels.sumo_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.sumo_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.sumo_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.sumo_duel_wins / player.stats.Duels.sumo_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')





      // uhc
      var uhcRank = ''
      var numeral
      if (player.stats.Duels.uhc_rookie_title_prestige){
        if (player.stats.Duels.uhc_iron_title_prestige){
          if (player.stats.Duels.uhc_gold_title_prestige){
            if (player.stats.Duels.uhc_diamond_title_prestige){
              if (player.stats.Duels.uhc_master_title_prestige){
                if (player.stats.Duels.uhc_legend_title_prestige){
                  if (player.stats.Duels.uhc_grandmaster_title_prestige){
                    if (player.stats.Duels.uhc_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.uhc_godlike_title_prestige)
                      uhcRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.uhc_grandmaster_title_prestige)
                      uhcRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.uhc_legend_title_prestige)
                    uhcRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.uhc_master_title_prestige)
                  uhcRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.uhc_diamond_title_prestige)
                uhcRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.uhc_gold_title_prestige)
              uhcRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.uhc_iron_title_prestige)
            uhcRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.uhc_rookie_title_prestige)
          uhcRank = 'Rookie ' + numeral
        }
      } else {
        uhcRank = ''
      }

      var uhcDuelsSolos = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s UHC Duels | Solos')
      .addFields(
        { name: 'UHC Rank', value: uhcRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.uhc_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_uhc_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.uhc_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.uhc_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.uhc_duel_kills / player.stats.Duels.uhc_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.uhc_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.uhc_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.uhc_duel_wins / player.stats.Duels.uhc_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var uhcDuelsDoubles = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s UHC Duels | Doubles')
      .addFields(
        { name: 'UHC Rank', value: uhcRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.uhc_doubles_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_uhc_doubles || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.uhc_doubles_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.uhc_doubles_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.uhc_doubles_kills / player.stats.Duels.uhc_doubles_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.uhc_doubles_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.uhc_doubles_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.uhc_doubles_wins / player.stats.Duels.uhc_doubles_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')






      // op
      var opRank = ''
      var numeral
      if (player.stats.Duels.op_rookie_title_prestige){
        if (player.stats.Duels.op_iron_title_prestige){
          if (player.stats.Duels.op_gold_title_prestige){
            if (player.stats.Duels.op_diamond_title_prestige){
              if (player.stats.Duels.op_master_title_prestige){
                if (player.stats.Duels.op_legend_title_prestige){
                  if (player.stats.Duels.op_grandmaster_title_prestige){
                    if (player.stats.Duels.op_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.op_godlike_title_prestige)
                      opRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.op_grandmaster_title_prestige)
                      opRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.op_legend_title_prestige)
                    opRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.op_master_title_prestige)
                  opRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.op_diamond_title_prestige)
                opRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.op_gold_title_prestige)
              opRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.op_iron_title_prestige)
            opRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.op_rookie_title_prestige)
          opRank = 'Rookie ' + numeral
        }
      } else {
        opRank = ''
      }

      var opDuelsSolos = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s OP Duels | Solos')
      .addFields(
        { name: 'OP Rank', value: opRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.op_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_op_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.op_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.op_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.op_duel_kills / player.stats.Duels.op_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.op_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.op_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.op_duel_wins / player.stats.Duels.op_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

			var opDuelsDoubles = new Discord.MessageEmbed()
			.setTitle(rank + ' ' + player.displayname + '\'s OP Duels | Doubles')
			.addFields(
				{ name: 'OP Rank', value: opRank, inline: true},
				{ name: 'Games Played', value: (player.stats.Duels.op_doubles_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_op_doubles || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Kills', value: (player.stats.Duels.op_doubles_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Deaths', value: (player.stats.Duels.op_doubles_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'K/D', value: ((player.stats.Duels.op_doubles_kills / player.stats.Duels.op_doubles_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Wins', value: (player.stats.Duels.op_doubles_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Losses', value: (player.stats.Duels.op_doubles_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'W/L', value: ((player.stats.Duels.op_doubles_wins / player.stats.Duels.op_doubles_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
			)
			.setColor(0xFF5100)
			.setTimestamp()
			.setFooter('HypStats by SirArchibald')







      // bridge
      var bridgeRank = ''
      var numeral
      if (player.stats.Duels.bridge_rookie_title_prestige){
        if (player.stats.Duels.bridge_iron_title_prestige){
          if (player.stats.Duels.bridge_gold_title_prestige){
            if (player.stats.Duels.bridge_diamond_title_prestige){
              if (player.stats.Duels.bridge_master_title_prestige){
                if (player.stats.Duels.bridge_legend_title_prestige){
                  if (player.stats.Duels.bridge_grandmaster_title_prestige){
                    if (player.stats.Duels.bridge_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.bridge_godlike_title_prestige)
                      bridgeRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.bridge_grandmaster_title_prestige)
                      bridgeRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.bridge_legend_title_prestige)
                    bridgeRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.bridge_master_title_prestige)
                  bridgeRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.bridge_diamond_title_prestige)
                bridgeRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.bridge_gold_title_prestige)
              bridgeRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.bridge_iron_title_prestige)
            bridgeRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.bridge_rookie_title_prestige)
          bridgeRank = 'Rookie ' + numeral
        }
      } else {
        bridgeRank = ''
      }

      var bridgeDuelsSolos = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bridge Duels | Solo')
      .addFields(
        { name: 'Bridge Rank', value: bridgeRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bridge_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bridge_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bridge_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bridge_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bridge_duel_kills / player.stats.Duels.bridge_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bridge_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bridge_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bridge_duel_wins / player.stats.Duels.bridge_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var bridgeDuelsDoubles = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bridge Duels | 2v2')
      .addFields(
        { name: 'Bridge Rank', value: bridgeRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bridge_doubles_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bridge_doubles || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bridge_doubles_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bridge_doubles_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bridge_doubles_kills / player.stats.Duels.bridge_doubles_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bridge_doubles_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bridge_doubles_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bridge_doubles_wins / player.stats.Duels.bridge_doubles_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var bridgeDuelsFours = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bridge Duels | 4v4')
      .addFields(
        { name: 'Bridge Rank', value: bridgeRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bridge_fours_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bridge_fours || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bridge_fours_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bridge_fours_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bridge_fours_kills / player.stats.Duels.bridge_fours_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bridge_fours_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bridge_fours_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bridge_fours_wins / player.stats.Duels.bridge_fours_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var bridgeDuels2v2v2v2 = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bridge Duels | 2v2v2v2')
      .addFields(
        { name: 'Bridge Rank', value: bridgeRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bridge_2v2v2v2_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bridge_2v2v2v2 || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bridge_2v2v2v2_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bridge_2v2v2v2_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bridge_2v2v2v2_kills / player.stats.Duels.bridge_2v2v2v2_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bridge_2v2v2v2_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bridge_2v2v2v2_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bridge_2v2v2v2_wins / player.stats.Duels.bridge_2v2v2v2_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')

      var bridgeDuel3v3v3v3 = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bridge Duels | 3v3v3v3')
      .addFields(
        { name: 'Bridge Rank', value: bridgeRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bridge_3v3v3v3_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bridge_4v4v4v4 || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bridge_3v3v3v3_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bridge_3v3v3v3_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bridge_3v3v3v3_kills / player.stats.Duels.bridge_3v3v3v3_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bridge_3v3v3v3_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bridge_3v3v3v3_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bridge_3v3v3v3_wins / player.stats.Duels.bridge_3v3v3v3_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')





			// bow
			var bowRank = ''
      var numeral
      if (player.stats.Duels.bow_rookie_title_prestige){
        if (player.stats.Duels.bow_iron_title_prestige){
          if (player.stats.Duels.bow_gold_title_prestige){
            if (player.stats.Duels.bow_diamond_title_prestige){
              if (player.stats.Duels.bow_master_title_prestige){
                if (player.stats.Duels.bow_legend_title_prestige){
                  if (player.stats.Duels.bow_grandmaster_title_prestige){
                    if (player.stats.Duels.bow_godlike_title_prestige){
                      numeral = getNumeral(player.stats.Duels.bow_godlike_title_prestige)
                      bowRank = 'Godlike ' + numeral
                    } else {
                      numeral = getNumeral(player.stats.Duels.bow_grandmaster_title_prestige)
                      bowRank = 'Grandmaster ' + numeral
                    }
                  } else {
                    numeral = getNumeral(player.stats.Duels.bow_legend_title_prestige)
                    bowRank = 'Legend ' + numeral
                  }
                } else {
                  numeral = getNumeral(player.stats.Duels.bow_master_title_prestige)
                  bowRank = 'Master ' + numeral
                }
              } else {
                numeral = getNumeral(player.stats.Duels.bow_diamond_title_prestige)
                bowRank = 'Diamond ' + numeral
              }
            } else {
              numeral = getNumeral(player.stats.Duels.bow_gold_title_prestige)
              bowRank = 'Gold ' + numeral
            }
          } else {
            numeral = getNumeral(player.stats.Duels.bow_iron_title_prestige)
            bowRank = 'Iron ' + numeral
          }
        } else {
          numeral = getNumeral(player.stats.Duels.bow_rookie_title_prestige)
          bowRank = 'Rookie ' + numeral
        }
      } else {
        bowRank = ''
      }

      var bowDuelsSolos = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Bow Duels | Solos Stats')
      .addFields(
        { name: 'Bow Rank', value: bowRank, inline: true},
        { name: 'Games Played', value: (player.stats.Duels.bow_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_bow_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Kills', value: (player.stats.Duels.bow_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Deaths', value: (player.stats.Duels.bow_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'K/D', value: ((player.stats.Duels.bow_duel_kills / player.stats.Duels.bow_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Wins', value: (player.stats.Duels.bow_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Losses', value: (player.stats.Duels.bow_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'W/L', value: ((player.stats.Duels.bow_duel_wins / player.stats.Duel.bow_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')






			// no debuffs
			var no_debuffsRank = ''
			var numeral
			if (player.stats.Duels.no_debuff_rookie_title_prestige){
				if (player.stats.Duels.no_debuff_iron_title_prestige){
					if (player.stats.Duels.no_debuff_gold_title_prestige){
						if (player.stats.Duels.no_debuff_diamond_title_prestige){
							if (player.stats.Duels.no_debuff_master_title_prestige){
								if (player.stats.Duels.no_debuff_legend_title_prestige){
									if (player.stats.Duels.no_debuff_grandmaster_title_prestige){
										if (player.stats.Duels.no_debuff_godlike_title_prestige){
											numeral = getNumeral(player.stats.Duels.no_debuff_godlike_title_prestige)
											no_debuffRank = 'Godlike ' + numeral
										} else {
											numeral = getNumeral(player.stats.Duels.no_debuff_grandmaster_title_prestige)
											no_debuffRank = 'Grandmaster ' + numeral
										}
									} else {
										numeral = getNumeral(player.stats.Duels.no_debuff_legend_title_prestige)
										no_debuffRank = 'Legend ' + numeral
									}
								} else {
									numeral = getNumeral(player.stats.Duels.no_debuff_master_title_prestige)
									no_debuffRank = 'Master ' + numeral
								}
							} else {
								numeral = getNumeral(player.stats.Duels.no_debuff_diamond_title_prestige)
								no_debuffRank = 'Diamond ' + numeral
							}
						} else {
							numeral = getNumeral(player.stats.Duels.no_debuff_gold_title_prestige)
							no_debuffRank = 'Gold ' + numeral
						}
					} else {
						numeral = getNumeral(player.stats.Duels.no_debuff_iron_title_prestige)
						no_debuffRank = 'Iron ' + numeral
					}
				} else {
					numeral = getNumeral(player.stats.Duels.no_debuff_rookie_title_prestige)
					no_debuffRank = 'Rookie ' + numeral
				}
			} else {
				no_debuffRank = ''
			}

			var no_debuffDuelsSolos = new Discord.MessageEmbed()
			.setTitle(rank + ' ' + player.displayname + '\'s No-Debuffs Duels')
			.addFields(
				{ name: 'No-Debuffs Rank', value: no_debuffsRank, inline: true},
				{ name: 'Games Played', value: (player.stats.Duels.no_debuff_duel_rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Winstreak', value: (player.stats.Duels.current_winstreak_mode_no_debuff_duel || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Kills', value: (player.stats.Duels.no_debuff_duel_kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Deaths', value: (player.stats.Duels.no_debuff_duel_deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'K/D', value: ((player.stats.Duels.no_debuff_duel_kills / player.stats.Duels.no_debuff_duel_deaths).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Wins', value: (player.stats.Duels.no_debuff_duel_wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'Losses', value: (player.stats.Duels.no_debuff_duel_losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
				{ name: 'W/L', value: ((player.stats.Duels.no_debuff_duel_wins / player.stats.Duels.no_debuff_duel_losses || 0).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
			)
			.setColor(0xFF5100)
			.setTimestamp()
			.setFooter('HypStats by SirArchibald')
  			// general
      var duelsGeneral = new Discord.MessageEmbed()
      .setTitle(rank + ' ' + player.displayname + '\'s Duels Stats')
      .addFields(
        { name: 'Total Games Played', value: (player.stats.Duels.rounds_played || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Winstreak', value: (player.stats.Duels.current_winstreak || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Coins', value: (player.stats.Duels.coins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Total Wins', value: (player.stats.Duels.wins || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Total Losses', value: (player.stats.Duels.losses || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Overall W/L', value: (player.stats.Duels.wins / player.stats.Duels.losses).toFixed(2), inline: true},
        { name: 'Total Kills', value: (player.stats.Duels.kills || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Total Deaths', value: (player.stats.Duels.deaths || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), inline: true},
        { name: 'Overall K/D', value: (player.stats.Duels.kills / player.stats.Duels.deaths || 0).toFixed(2), inline: true},
      )
      .setColor(0xFF5100)
      .setTimestamp()
      .setFooter('HypStats by SirArchibald')







      if (args[3]) {
        if (args[3] === 'skywars' || args[3] === 'sw') {
          if (args[4]) {
            if (args[4] === 'solo' || args[4] === '1') {
              message.channel.send(skywarsDuelsSolos)
            } else if (args[4] === 'doubles' || args[4] === '2') {
              message.channel.send(skywarsDuelsDoubles)
            } else {
              message.reply(`what are you trying to do? Try: \`!s ${args[1]} duels skywars solo\``)
            }
          } else {
            message.channel.send(skywarsDuelsSolos)
          }
        } else if (args[3] === 'classic' || args[3] === 'c') {
          message.channel.send(classicDuels)
        } else if (args[3] === 'op') {
          message.channel.send(opDuels)
        } else if (args[3] === 'sumo') {
          message.channel.send(sumoDuels)
        } else if (args[3] === 'bridge') {
          if (args[4]) {
            if (args[4] === 'solo' || args[4] === '1') {
              message.channel.send(bridgeDuelsSolos)
            } else if (args[4] === 'doubles' || args[4] === '2') {
              message.channel.send(bridgeDuelsDoubles)
            } else if (args[4] === 'fours' || args[4] === '3') {
              message.channel.send(bridgeDuelsFours)
            } else if (args[4] === '3v3' || args[4] === '4') {
              message.channel.send(bridgeDuel3v3v3v3)
            } else if (args[4] === '2v2' || args[4] === '5') {
              message.channel.send(bridgeDuels2v2v2v2)
            } else {
              message.reply(`what are you trying to do? Try: \`!s ${args[1]} duels bridge solo\``)
            }
          } else {
            message.channel.send(bridgeDuelsSolos)
          }
        } else {
          message.reply(`what are you trying to do? Try: \`!s ${args[1]} duels\``)
        }
      } else {
        message.channel.send(duelsGeneral)
      }

    })
	},
};
