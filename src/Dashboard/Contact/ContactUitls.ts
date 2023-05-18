import { doc, getFirestore, setDoc } from "firebase/firestore";
import { MySwal } from "../../Generic/Notify";

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
    .then(() => {
      MySwal.fire({
        icon: 'success',
        title: 'Thanks for signing up!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    }
  )


}

export { signUpForUpdates };