import { CharacterDocument } from '../data/characters';

export class CharacterManager implements Server.Managers.CharacterManager {
  private characterData;

  constructor(private game: Server.GameState) {
    this.characterData = game.data.managers.characters;
  }

  public createCharacter(accountId, name, description, classIndex, female) {
    return new Promise((resolve, reject) => {
      let character: Odyssey.Character = {
        name: name,
        class: classIndex,
        female: female,
        sprite: 1, //TODO calculate or load sprite
        description: description,
        status: 1,
        location: { //TODO define start location
          map: 1,
          x: 0,
          y: 0,
          direction: 0
        },
        stats: {
          attack: 1,
          defense: 1,
          magicDefense: 1,
          maxHp: 10,
          maxEnergy: 10,
          maxMana: 10,
          level: 1,
          experience: 0
        }, //TODO
        inventory: new Array(20), //TODO
        equipped: new Array(5),
        ammo: null,
        bank: new Array(20), //TODO
        guild: {
          id: null,
          rank: 0,
          slot: 0,
          invite: 0
        },
        timers: {
          walk: 0
        }, //TODO
        alive: true
      };

      this.characterData.createCharacter(accountId, character, (err, character) => {
        if (err) {
          throw err;
        }

        resolve(character);
      });
    });
  }

  public async getCharacter(accountId: string): Promise<Odyssey.Character> {
    return this.characterData.getCharacter(accountId);
  }
}
