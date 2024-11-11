import { Track } from "./track";

export interface Round {
    question: Track;
    options: Track[];
    score?: number;
}
