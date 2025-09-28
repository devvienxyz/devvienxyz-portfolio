const Avatars = Object.freeze({
  default: "character-female-e",
  fem_a: "character-female-a",
  mal_a: "character-male-a",
  // TODO: Add more avatars
});

export default Avatars;

const AvatarMeshParts = Object.freeze({
  ROOT: "root",
  LEG_LEFT: "leg-left",
  LEG_RIGHT: "leg-right",
  TORSO: "torso",
  ARM_LEFT: "arm-left",
  ARM_RIGHT: "arm-right",
  HEAD: "head",
  BODY_MESH: "body-mesh",
  HEAD_MESH: "head-mesh",
});

const AVATAR_SCALE = 0.1;

export { AvatarMeshParts, AVATAR_SCALE };
