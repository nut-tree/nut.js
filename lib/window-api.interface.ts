/**
 * {@link WindowApi} provides helper functions to handle windows
 */
import { Window } from "./window.class";

export interface WindowApi {
  windows(): Promise<Window[]>;
  activeWindow(): Promise<Window>;
}
