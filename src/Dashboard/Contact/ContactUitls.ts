import { doc, getFirestore, setDoc } from "firebase/firestore";
import { MySwal } from "../../Generic/Notify";

const SignedUp = MySwal.mixin({
  icon: 'success',
  title: 'Thanks for signing up!',
  text: `We'll let you know when we have updates`,
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', MySwal.stopTimer)
    toast.addEventListener('mouseleave', MySwal.resumeTimer)
  }
});

function isValidEmail(email: string) {
  const re = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
  return re.test(email);
}

function signUpForUpdates(email: string) {
  if (!isValidEmail(email)) {
    MySwal.fire({
      icon: 'error',
      title: 'Invalid email address',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    })
    return;
  }

  const db = getFirestore();
  const docRef = doc(db, 'emailsForUpdates', email);
  setDoc(docRef, { email: email })
    .then(() => SignedUp.fire())
    .catch((error) => SignedUp.fire())

}

export { signUpForUpdates };