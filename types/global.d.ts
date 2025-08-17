export { }

declare global {
  type Ok<T>  = { Ok: T }
  type Error<E> = { Error: E }
  type Result<T, E> = 
    | Ok<T>
    | Error<E>

  type Some<T> = { Some: T }
  type None = { None: null }
  type Option<T> = 
    | Some<T>
    | None
    
  export const pipe = <T>(...fns: Array<(arg: T) => T>) =>
    (input: T): T => fns.reduce((acc, fn) => fn(acc), input);
}
