import type { Product } from "./types"; 
export type AppState = 
| { status: "idle"; } 
| { status: "loading"; } 
| { status: "success"; products: Product[]; } 
| { status: "error"; message: string; }; 
export let appState: AppState = { status: "idle" }; 
export const setState = (state: AppState): void => { appState = state; }; 
export const assertNever = (value: never): never => { throw new Error(`Unhandled state: ${JSON.stringify(value)}`); };