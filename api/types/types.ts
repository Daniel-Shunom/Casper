type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N 
  ? Acc[number] 
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

type DOB = {
  day: IntRange<1, 32>,
  month: IntRange<1, 13>,
  year: number
}

type Gender = 'cisgender'
  | 'transgender'
  | 'nonbinary'
  | 'other'

type Pronouns = `${string}/${string}`

type UserName = `@${string}`

type Name = {
  first: string,
  last: string
}

export type NewUser = {
  name: Name,
  username: UserName,
  userid: string,
  userauth: boolean,
  userdob: DOB,
  usergender: Gender,
  userpronouns: Pronouns
}

// ==========ROOMS========== //

type Capacity = 'small' 
  | 'medium' 
  | 'large'

export type Room = { 
  ownerid: String,
  roomname: string,
  roomcapacity: Capacity,
}

// ==========LOGIN========== //

export type Auth = {
  username: string,
  password: string
}