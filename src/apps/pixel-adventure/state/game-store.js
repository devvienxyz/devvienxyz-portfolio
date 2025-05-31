import { create } from "zustand";

const GameStates = Object.freeze({
	INTRO: "intro",
	POST_INTRO: "post_intro",
	LOADING: "loading",
	PLAYING: "playing",
	PAUSED: "paused",
	GAME_OVER: "game_over",
	MENU: "menu",
});

const useGameStateManager = create((set) => ({
	gamePhase: GameStates.INTRO,
	completedZone: 0,

	setGamePhase: (newPhase) => set(() => ({ gamePhase: newPhase })),
	setCompletedZone: (zone) => set(() => ({ completedZone: zone })),

	is: (targetPhase) => useGameStateManager.getState().gamePhase === targetPhase,

	// Lifecycle transitions
	startGame: () => set(() => ({ state: GameStates.PLAYING })),
	pauseGame: () => set(() => ({ state: GameStates.PAUSED })),
	resumeGame: () => set(() => ({ state: GameStates.PLAYING })),
	gameOver: () => set(() => ({ state: GameStates.GAME_OVER })),
	backToMenu: () => set(() => ({ state: GameStates.MENU })),
}));

export default useGameStateManager;

export { GameStates };
