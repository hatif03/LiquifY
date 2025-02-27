import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useInkathon } from '@scio-labs/use-inkathon'
import { useRouter } from 'next/router';
import { privateApi } from '../api';
import { useLanding } from '../landing-provider';
import { User, UserTypeEnum } from '../../../utility/src';

type CurrentUserContextInterface = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchingUser: boolean;
  setFetchingUser: (fetching: boolean) => void;
};

export const CurrentUserContext = createContext<CurrentUserContextInterface>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {},
  fetchingUser: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFetchingUser: () => {}
});

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setCurUser] = useState<User | null>(null);
  const [fetchingUser, setFetchingUser] = useState(false);
  const { push, pathname } = useRouter();
  const { type , setType } = useLanding();

  const setUser = (user: User | null) => {
    setCurUser(user);
    if (user) {
      Cookies.set('authenticated', 'true', {
        expires: 30,
        sameSite: 'Lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      });
      setType(user.currentUserType as UserTypeEnum);
      if ((type ===  UserTypeEnum.Freelancer || type === UserTypeEnum.Company) 
      && !pathname.includes('dashboard')) {
        push('/dashboard');
      }
    }
  };

  useEffect(() => {
    if (Cookies.get('authenticated')) {
      if (user) {
        setFetchingUser(false);
      }
    } else {
      setFetchingUser(false);
    }
  }, [user]);

  return (
    <CurrentUserContext.Provider value={{ user, setUser, fetchingUser, setFetchingUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useCurrentUser() {
  const { user, setUser, fetchingUser, setFetchingUser } = useContext(CurrentUserContext);
  const {
    activeChain,
    switchActiveChain,
    connect,
    disconnect,
    isConnecting,
    activeAccount,
    accounts,
    setActiveAccount,
  } = useInkathon()
  const { push } = useRouter();

  const logout = async () => {
    disconnect?.();
    // await privateApi.get('/auth/logout');
    push('/');
    setTimeout(() => {
      Cookies.remove('authenticated');
      setUser(null);
    }, 200);
  };

  return { user, setUser, logout, fetchingUser, setFetchingUser };
}
