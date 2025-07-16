export function copyProperties<T, R>(source: T, target: (source: T) => R): R;
export function copyProperties<T, R>(source: T[], target: (data: T) => R): R[];
export function copyProperties<T, R>(source: T | T[], target: (data: T) => R): R | R[] {
    return Array.isArray(source) ? source.map(target) : target(source);
}
