import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { MySwal, Toast } from '../Generic/Notify';


export function loginWithEmailPassword(email: string, password: string) {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      MySwal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    })
}

export function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .catch((error) => {
      MySwal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    })
}

export function signOutAndNotify(navigate: (path: string) => void) {
  const auth = getAuth();

  signOut(auth)
    .then(() => navigate('/'))
    .then(() => {
      Toast.fire({
        title: 'You have been signed out',
        icon: 'success'
      });
    })
}