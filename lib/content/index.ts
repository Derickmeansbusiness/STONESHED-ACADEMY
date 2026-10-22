import { CATALOG } from "./courses/catalog";
import { INVESTING_101 } from "./courses/investing-101";
import type { CourseDef } from "./types";

export const COURSES: CourseDef[] = [INVESTING_101, ...CATALOG];
export { SERIES } from "./videos";
export { ARTICLES } from "./articles";
export { GLOSSARY } from "./glossary";
export { EVENTS } from "./events";
export { INSTITUTIONS } from "./institutions";
export { INSTRUCTORS } from "./instructors";
export { FUNDS, FUND_FLAGS, FUND_FAQ, FUND_RISKS } from "./funds";
