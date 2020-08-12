/**
 * {@link WindowApi} provides helper functions to handle windows
 */
import { Window } from "./window.class";

export interface WindowApi {
  getWindows(): Promise<Window[]>;
  getActiveWindow(): Promise<Window>;
}
