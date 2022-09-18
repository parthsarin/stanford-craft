import { getAuth, GoogleAuthProvider, sendSignInLinkToEmail, signInWithEmailLink, signInWithPopup, signOut } from 'firebase/auth';
import { MySwal, Toast } from '../Generic/Notify';


export function sendSignInLink(email: string) {
  const actionCodeSettings = {
    url: `${window.location.origin}/login`,
    handleCodeInApp: true,
  }
  const auth = getAuth();

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      Toast.fire({
        icon: 'success',
        title: 'Sign-in link sent to your email'
      })
    });
}

export function callbackSignInLink() {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }

  const auth = getAuth();
  return signInWithEmailLink(auth, email!, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');
      return result;
    })
    .catch((error) => {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    });
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