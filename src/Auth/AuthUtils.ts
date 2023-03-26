import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { MySwal } from "../Generic/Notify";
import { User } from './UserContext';

async function handleSignIn(
  user: User | null, 
  setUser: (user: User | null) => void
) {
  if (!user) return setUser(null);

  // check to see if the user data is in the database
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // if not, add the user to the database
    setDoc(userRef, { ...user }, { merge: true });
  } else {
    // if so, update the data based on what's in the database
    user = { ...user, ...docSnap.data() };
  }

  setUser(user);
}

const generateUserUpdateHandler = 
  (setUser: (user: User | null) => void) => 
  (user: User | null) => 
{
  // signing out
  if (!user) return setUser(null);

  // make a copy of the user object (just the important fields)
  let pushToDb: any = {};
  if (user.displayName) pushToDb.displayName = user.displayName;
  if (user.photoURL) pushToDb.photoURL = user.photoURL;
  if (user.email) pushToDb.email = user.email;

  // otherwise update the user and the database
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);
  setDoc(userRef, { ...pushToDb }, { merge: true });
  setUser(user);
}

async function signIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      MySwal.fire({
        title: `Signed in as ${user?.displayName}`,
        icon: "success",
        timer: 2500,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', MySwal.stopTimer)
          toast.addEventListener('mouseleave', MySwal.resumeTimer)
        }
      });
    });
}

function signOut() {
  const auth = getAuth();
  auth.signOut();
  MySwal.fire({
    title: "Signed out",
    icon: "success",
    timer: 2500,
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', MySwal.stopTimer)
      toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
  });
}

export { handleSignIn, generateUserUpdateHandler, signIn, signOut };