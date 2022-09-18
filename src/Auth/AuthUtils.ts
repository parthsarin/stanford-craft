import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(swal);

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