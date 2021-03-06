
/*
header looks like this:
<https://www.anapioficeandfire.com/api/characters?page=2&pageSize=50>; rel="next", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50>; rel="first", <https://www.anapioficeandfire.com/api/characters?page=43&pageSize=50>; rel="last"
this function extracts the last page number so that it is clear when pagination is finished
*/

export function extractPageNumberFromHeader(headerLink: string | null): number | null {
    try {
        if (!headerLink) {
            return null;
        }

        const str = headerLink?.split(",")[2].split(";")[0].replace("<", "").replace(" ", "").replace(">", "")
        let url;
        if (str) {
            url = new URL(str);
        } else {
            throw new Error("Invalid")
        }
        const c = url.searchParams.get("page");
        if (c) return parseInt(c)
        return null;

    } catch (error) {
        return null;
    }

}