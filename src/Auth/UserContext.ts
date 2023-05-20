import { User as FirebaseUser } from "firebase/auth";
import { createContext } from "react";

enum UserRole {
  TEACHER = "teacher",
  STUDENT = "studetn",
}

interface User extends FirebaseUser {
  role?: UserRole;
  admin?: boolean;
  datamax?: {
    activeQuizzes: string[];
    pastQuizzes: string[];
  }
}

interface UserContextPayload {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextPayload>({ user: null, setUser: () => {} });

export default UserContext;
export type { User };