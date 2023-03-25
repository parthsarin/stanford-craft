export { default as UserContext } from './UserContext';
export { 
  handleSignIn, 
  generateUserUpdateHandler,
  signIn,
  signOut,
} from './AuthUtils';

export type { User } from './UserContext';