import { Ranking } from "./ranking";

export interface User {
    id?: string;
    password: string;
    topRanking?: Ranking[];
}
