import {
  Bans,
  Civs,
  CurrentSeason,
  Match,
  MatchPlayerFlags,
  MatchPlayers,
  Player,
  Playercivs,
  Stats,
  Subs,
  statsObject,
} from './database'
import { CiscoBotSchema } from './database/schema'

setTimeout(() => {
  CiscoBotSchema.close()
}, 5000)
