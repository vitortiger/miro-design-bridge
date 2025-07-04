
import { ReactNode } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';

export function AuthProvider({ children }: { children: ReactNode }) {
  const authState = useAuthState();
  const authActions = useAuthActions();

  return (
    <AuthContext.Provider value={{
      ...authState,
      ...authActions
    }}>
      {children}
    </AuthContext.Provider>
  );
}
