
/*
header looks like this:
<https://www.anapioficeandfire.com/api/characters?page=2&pageSize=50>; rel="next", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50>; rel="first", <https://www.anapioficeandfire.com/api/characters?page=43&pageSize=50>; rel="last"
this function extracts the last page number so that it is clear when pagination is finished
*/

export const URL_REGX = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
export const REL_LAST_STR = 'rel=\"last\"';
export const HL_SEPARATOR = ',';
export const LINK_REL_SEPARATOR = ';';

export function extractPageNumberFromHeader(headerLink: string | null): number | null {
    try {
        const linkLast = headerLink?.split(HL_SEPARATOR)
                                   ?.find(hl => hl.includes(REL_LAST_STR))
                                   ?.split(LINK_REL_SEPARATOR)?.find(() => true)
                                   ?.match(URL_REGX)?.find(() => true)
    
        return (+(((new URL(linkLast!)).searchParams.get('page'))!) || null);

        // // THIS DOESN'T WORK IN SOME CASES AND IT BRAKES THE INFINITE LOADING
        // F.E WHEN THE RETURN IS LIKE THAT (IT'S NOT 3RD ANYMORE): <https://www.anapioficeandfire.com/api/characters?page=3&pageSize=50>; rel="next", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50>; rel="prev", <https://www.anapioficeandfire.com/api/characters?page=1&pageSize=50>; rel="first", <https://www.anapioficeandfire.com/api/characters?page=43&pageSize=50>; rel="last"
        // -------------------------------------------------------------------->

        // const str = headerLink?.split(",")[2].split(";")[0].replace("<", "").replace(" ", "").replace(">", "")
        // let url;
        // if (str) {
        //     url = new URL(str);
        // } else {
        //     throw new Error("Invalid")
        // }
        // const c = url.searchParams.get("page");
        // if (c) return parseInt(c)
        // return null;

        // <--------------------------------------------------------------------

    } catch (error) {
        return null;
    }

}