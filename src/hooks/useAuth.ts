import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, isLoading } = useAuthContext();
  return { user, isLoading, isAuthenticated: !!user };
};
