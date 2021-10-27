export function extractIdFromUrl(url: string) {
    let urlArray = url.split("/");
    return urlArray[urlArray.length - 1];
}