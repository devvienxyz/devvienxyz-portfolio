const AvatarActions = Object.freeze({
	STATIC: "static",
	IDLE: "idle",
	WALK: "walk",
	SPRINT: "sprint",
	JUMP: "jump",
	FALL: "fall",
	CROUCH: "crouch",
	SIT: "sit",
	DRIVE: "drive",
	DIE: "die",
	PICK_UP: "pick-up",
	EMOTE_YES: "emote-yes",
	EMOTE_NO: "emote-no",
	HOLDING_RIGHT: "holding-right",
	HOLDING_LEFT: "holding-left",
	HOLDING_BOTH: "holding-both",
	HOLDING_RIGHT_SHOOT: "holding-right-shoot",
	HOLDING_LEFT_SHOOT: "holding-left-shoot",
	HOLDING_BOTH_SHOOT: "holding-both-shoot",
	ATTACK_MELEE_RIGHT: "attack-melee-right",
	ATTACK_MELEE_LEFT: "attack-melee-left",
	ATTACK_KICK_RIGHT: "attack-kick-right",
	ATTACK_KICK_LEFT: "attack-kick-left",
	INTERACT_RIGHT: "interact-right",
	INTERACT_LEFT: "interact-left",
	WHEELCHAIR_SIT: "wheelchair-sit",
	WHEELCHAIR_LOOK_LEFT: "wheelchair-look-left",
	WHEELCHAIR_LOOK_RIGHT: "wheelchair-look-right",
	WHEELCHAIR_MOVE_FORWARD: "wheelchair-move-forward",
	WHEELCHAIR_MOVE_BACK: "wheelchair-move-back",
	WHEELCHAIR_MOVE_LEFT: "wheelchair-move-left",
	WHEELCHAIR_MOVE_RIGHT: "wheelchair-move-right",
});

export default AvatarActions;

const JUMP_VELOCITY = 3.0;

export { JUMP_VELOCITY };
