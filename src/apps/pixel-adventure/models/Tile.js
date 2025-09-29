export default class Tile {
  constructor(index, { name, position, scale = 1, rotationY = 0 }) {
    this.index = index;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.rotationY = rotationY;
  }

  getKey() {
    return `${this.name}-${this.position.join(",")}-${this.index}`;
  }

  getModelPath(prefix) {
    return `${prefix}/${this.name}.glb`;
  }
}
