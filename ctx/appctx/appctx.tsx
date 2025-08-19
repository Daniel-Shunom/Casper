import React, { 
  createContext, 
  PropsWithChildren, 
  useContext, 
  useEffect, 
  useState,
} from "react";

const AuthContext = createContext<{
  isLoading: boolean
  username: Option<string>
  userid: Option<string>,
  getUsername: () => string
  getUserid: () => string
  signIn: (value?: string) => void
  signOut: () => void
  loadSession: () => void
}>({
  isLoading: false,
  username: { None: null },
  userid: { None: null },
  getUsername: () => "",
  getUserid: () => "",
  signIn: (_provider?: string) => null,
  signOut: () => null,
  loadSession: () => null,
})

export const useSession = () => {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== "production") {
    if (!value) { throw new Error("useSession must be wrapped in </SessionProvider>")}
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [loading, _setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<Option<string>>({ None: null })
  const [userid, setUserid] = useState<Option<string>>({ None: null })

  useEffect(() => {
    setUsername({ Some: "not-a-username" })
    setUserid({ Some: "not-a-userid"})
  }, [])

  // todo -> set some other authentication here.

  return(
    <AuthContext.Provider value={{
      isLoading: loading,

      username: username,
      
      userid: userid,

      getUsername: () => {
        return 'Some' in username
          ? username.Some
          : "not-a-username"
      },

      getUserid: () => {
        return 'Some' in userid
          ? userid.Some
          : "not-a-userid"
      },

      signIn: (_value?: string) => {},
      
      signOut: () => {},

      loadSession: () => {}
    }}>
      {children}
    </AuthContext.Provider>
  )
}
