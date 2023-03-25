import { User as FirebaseUser } from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { createContext } from "react";

enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

interface User extends FirebaseUser {
  role?: UserRole;
}

async function handleSignIn(user: User) {
  // check to see if the user data is in the database
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // if not, add the user to the database
    setDoc(userRef, { ...user });
  }
}

const UserContext = createContext<User | null>(null);
export default UserContext;
export type { User };
export { UserRole, handleSignIn };