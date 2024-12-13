type EmptyObject = Record<string, never>

export type IsEmpty<T> = T extends EmptyObject ? true : false
export type IsUndefined<T> = undefined extends T ? true : false

export type IsAny<T> = IsEmpty<T> extends true ? false : IsUndefined<T> extends true ? false : true
export type IsUnknown<T> = IsAny<T> extends true ? false : true
