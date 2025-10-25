
export function add(...arr: number[]): number {
    return arr.reduce((acc, item) => {
        return acc + item
    }, 0)
}