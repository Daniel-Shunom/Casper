export function unwrapOption<T>(value: Option<T>, deft: T): T {
  if ('Some' in value) {
    return value.Some
  }

  return deft
}

export function mapOption<T, U>(value: Option<T>, func: (opt: T) => U): Option<U> {
  if ('Some' in value) {
    const { Some: option } = value;
    return { Some: func(option) }
  }

  return { None: null } 
}

export function allOptions<T>(values: Option<T>[]): Option<T[]> {
  let acc: Array<T> = []

  for (const value of values) {
    if ('None' in value) return { None: null }
    if ('Some' in value) acc.push(value.Some)
  }

  return { Some: acc }
}

export function isOptionNone<T>(value: Option<T>): boolean {
  return 'None' in value
}

export function isOptionSome<T>(value: Option<T>): boolean {
  return 'Some' in value
}

export function eitherOption<T>(either: Option<T>, or: Option<T>): Option<T> {
  if (isOptionSome(either)) return either;
  if (isOptionSome(or)) return or;
  return { None: null }
}

export function thenOption<T, U>(value: Option<T>, func: (opt: T) => Option<U>): Option<U> {
  if ('Some' in value) {
    return func(value.Some)
  }

  return { None: null }
}

export function toResult<T, U>(value: Option<T>, error_type: U): Result<T, U> {
  if ('Some' in value) {
    const { Some: option } = value;
    return { Ok: option }
  } else {
    return { Error: error_type }
  }
}

export function optionValues<T>(values: Option<T>[]): T[] {
  return values
    .filter(value => 'Some' in value)
    .map(value => value.Some)
}
