/** All skogix definitions */
interface Manager {
  hp: HP;
  skills: Skills;
  exp: Skills;
  mults: Multipliers;
  city: CityName;
}

/** @public */
interface Player extends Person {
  money: number;
  numPeopleKilled: number;
  entropy: number;
  jobs: Record<string, string>;
  factions: string[];
  totalPlaytime: number;
  location: string;
}
