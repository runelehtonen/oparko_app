import { createContext } from 'react';

// Create context
export const CredentialsContext = createContext({ storedCredentials: {}, setStoredCredentials: () => {} });
