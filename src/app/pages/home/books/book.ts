export interface Book {
    url: string,
    name: string,
    isbn: string,
    authors: string[],
    numberOfPages: string,
    publisher: string,
    country: string,
    mediaType: string,
    released: Date,
    characters: string[],
    povCharacters: string[],
}

export interface IObjectKeys {
    [key: string]: string | boolean | Date | undefined;
}

export interface BookFilter extends IObjectKeys {
    fromReleaseDate?: Date,
    toReleaseDate?: Date
}
