export function unwrapResult<R>(value: Result<R, any>, deft: R): R {
  if ('Ok' in value) {
    return value.Ok
  }

  return deft
}

export function mapResult<R, A>(value: Result<R, any>, func: (res: R) => A): Result<A, any> {
  if ('Ok' in value) {
    return { Ok: func(value.Ok) }
  }

  return value
}

export function mapError<E, A>(value: Result<any, E>, func: (res: E) => A): Result<any, A> {
  if ('Error' in value) {
    return { Error: func(value.Error) }
  }

  return value
}

export function isOk<T>(value: Result<T, any>): boolean {
  return 'Ok' in value
}

export function isError<T>(value: Result<T, any>): boolean {
  return 'Error' in value
}

export function partitionResult<R, E>(values: Result<R, E>[]): [Array<R>, Array<E>] {
  let rAcc: Array<R> = [];
  let eAcc: Array<E> = []

  for (const value of values) {
    if ('Ok' in value) {
      rAcc.push(value.Ok)
    } else {
      eAcc.push(value.Error)
    }
  }

  return [rAcc, eAcc]
}

export function replaceOk<E>(value: Result<any, E>, other: any): Result<any, E> {
  if ('Ok' in value) {
    return { Ok: other }
  }

  return value;
}


export function replaceError<R>(value: Result<R, any>, other: any): Result<R, any> {
  if ('Error' in value) {
    return { Error: other }
  }

  return value
}

export function thenResult<R, E>(value: Result<R, E>, func: (res: R) => Result<any, E>): Result<any, E> {
  if ('Ok' in value) {
    return { Ok: func(value.Ok) }
  }

  return value
}

export function thenRecover<R, E>(value: Result<R, E>, func: (err: E) => Result<R, any>): Result<R, any> {
  if ('Error' in value) {
    return func(value.Error)
  }

  return value
}

export function unwrapBoth<R>(value: Result<R, R>): R {
  if ('Ok' in value) {
    return value.Ok
  } else {
    return value.Error
  }
}

export function unwrapError<E>(value: Result<any, E>, deft: E): E {
  if ('Error' in value) {
    return value.Error
  }

  return deft
}

export function resultValues<R>(values: Result<R, any>[]): R[] {
  return values
    .filter(value => 'Ok' in value)
    .map(value => value.Ok)
}
