import { Ranking } from "./ranking";

export interface User {
    id?: string;
    password: string;
    accessToken?: string;
    topRanking?: Ranking[];
}
