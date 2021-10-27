export interface House {
    url: string,
    name: string,
    region: string,
    coatOfArms: string,
    words: string,
    titles: string[],
    seats: string[],
    currentLord: string,
    heir: string,
    overlord: string,
    founded: string,
    founder: string,
    diedOut: string,
    ancestralWeapons: string[],
    cadetBranches: string[],
    swornMembers: string[],
}

export interface IObjectKeys {
    [key: string]: string | boolean | Date | undefined;
}

export interface HouseFilter extends IObjectKeys {
    hasWords?: boolean,
    hasTitles?: boolean,
    hasSeats?: boolean,
    hasDiedOut?: boolean,
    hasAncestralWeapons?: boolean,
}