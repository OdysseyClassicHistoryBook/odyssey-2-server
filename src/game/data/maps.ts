import { GameDataManager } from './game-data';

//TODO extract to Definitions
export interface MapDocument extends Server.GameDataDocument, Odyssey.Maps.Map {

}

export class MapDataManager extends GameDataManager<MapDocument> {
  //TODO need to build a blank map when we request a map that doesn't exist.

  /**
   * Provides a normalized (x,y) way to get tiles.
   * Currently due to legacy code, map tiles are organized y,x.
   * This method abstracts that away, so if it changes calls to this method will still be valid.
   *
   * @static
   * @param {MapDocument} map
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof MapDataManager
   */
  static getTile(map: Odyssey.Maps.Map, x: number, y: number) {
    if (!map.tiles[y] || !map.tiles[y][x]) {
      return null;
    }
    return map.tiles[y][x];
  }
}

export enum AttributeType {
  Wall = 1,
  Warp,
  Key,
  Door,
  Keep,
  NoAttack,
  ObjectSpawn,
  TouchPlate,
  Damage,
  NoMonster,
  Script,
  Click,
  Fish,
  Ore,
  ProjectileWall,
  Tree,
  DirectionalWall,
  S,
  Light,
  LightDampening,
  O1,
  O2
}

export enum Direction {
  up = 0,
  down,
  left,
  right
}
