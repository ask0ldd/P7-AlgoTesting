export function FirstLetterMaj(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function normalize(string){
    return string.toLowerCase().trim()
}