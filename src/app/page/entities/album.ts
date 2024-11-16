export interface Album {
    totalTracks: number;
    id: string;
    imgUrl: string;
    name: string;
    artistsNames: string[];
    //Se guardan en el componente search, implementar si se quieren ampliar los resultados de búsqueda
    // href: string;
    // limit: number;
    // next: string;
    // previous: string;
    // offset : number;
}
