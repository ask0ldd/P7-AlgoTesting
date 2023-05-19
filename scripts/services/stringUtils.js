export function FirstLetterMaj(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function normalize(string){
    // gets rid of all accents, all whitespaces at the start or at the end & all the maj
    return string.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}