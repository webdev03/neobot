import type { CommandData } from "../types";

export const commands: CommandData[] = [
  (await import("./maths")).default,
  (await import("./ping")).default
];
