function shortDate(): string {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}${month}${day}`
}

function shortId(num: number): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    let randomString = ''

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        randomString += alphabet[randomIndex]
    }

    return randomString
}

export function shortName(): string {
    return `SWA-${shortDate()}-${shortId(5)}`
}
