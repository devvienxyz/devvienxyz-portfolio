import { create } from "zustand";

export const GameStates = Object.freeze({
	LOADING: "loading",
	PLAYING: "playing",
	PAUSED: "paused",
	GAME_OVER: "game_over",
	MENU: "menu",
});

const useGameStateManager = create((set) => ({
	state: GameStates.LOADING,

	setState: (newState) => set(() => ({ state: newState })),

	is: (targetState) => useGameStateManager.getState().state === targetState,

	// Lifecycle transitions
	startGame: () => set(() => ({ state: GameStates.PLAYING })),
	pauseGame: () => set(() => ({ state: GameStates.PAUSED })),
	resumeGame: () => set(() => ({ state: GameStates.PLAYING })),
	gameOver: () => set(() => ({ state: GameStates.GAME_OVER })),
	backToMenu: () => set(() => ({ state: GameStates.MENU })),
}));

export default useGameStateManager;
