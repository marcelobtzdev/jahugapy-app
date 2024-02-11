import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';

interface IProps {
  children: JSX.Element;
  navigationRef: any;
}

const AuthLogoutWrapper = ({ children, navigationRef }: IProps) => {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user && navigationRef.isReady()) {
      navigationRef?.navigate('Welcome');
    }
  }, [user]);

  return children;
};

export default AuthLogoutWrapper;
