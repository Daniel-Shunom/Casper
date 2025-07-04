type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type DOB = {
  day: IntRange<1, 32>;
  month: IntRange<1, 13>;
  year: number;
};

type Gender = 
  | "cisgender" 
  | "transgender" 
  | "nonbinary" 
  | "other";

type Pronouns = `${string}/${string}`;

type Name = {
  first: string;
  last: string;
};

export type UserName = `@${string}`;

export type NewUser = {
  name: Name;
  username: UserName;
  userid: string;
  userauth: boolean;
  userdob: DOB;
  usergender: Gender;
  userpronouns: Pronouns;
};

export type User = NewUser & {
  userdesc: string,
  joined: `${Month}, ${number}`
}

export type UserSignin = {
  username: string;
  password: string;
};

export type UserSession = {
  userid: string;
};

export type UserAuth = {
  userid: string;
  authnticated: boolean;
};

export type UserProfile = {
  userid: string;
  name: string;
  username: string;
  gender: Gender;
  pronouns: Pronouns;
  authenticated: boolean;
};

// ==========ROOMS========== //

type Capacity = 
  | "small" 
  | "medium" 
  | "large";

export type NewRoom = {
  ownerid: String;
  roomname: string;
  roomcapacity: Capacity;
};

export type RoomInfo = {
  roomname: string,
  roomdesc: string,
  roomowner: UserName,
  roomcapacity: number
}

export type DeleteRoom = {
  userid: string;
  roomid: string;
};

export type NewRoomResponse = {
  roomname: string;
  roomid: string;
};

// ==========MESSAGE========== //
export type Message = {
  userid: string;
  roomid: string;
  content: string;
  authenticated: boolean;
}
// ==========LOGIN========== //

export type Auth = {
  username: string;
  password: string;
};

// ==========MISC========== //

type Month = 
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
