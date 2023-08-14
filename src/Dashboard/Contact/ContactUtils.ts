import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { MySwal } from "../../Generic/Notify";

const SignedUp = MySwal.mixin({
  icon: "success",
  title: "Thanks for signing up!",
  text: `We'll let you know when we have updates`,
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", MySwal.stopTimer);
    toast.addEventListener("mouseleave", MySwal.resumeTimer);
  },
});

enum MessageTopic {
  Bug = "Report a bug",
  Feature = "Request a feature",
  Media = "Media inquiry",
  Partnership = "Partnership inquiry",
  Funding = "Make a gift to the project",
  Other = "Other (please specify)",
}

interface Message {
  id: string;
  name: string;
  email: string;
  topic: MessageTopic;
  message: string;
  visible: boolean;
  timestamp: Timestamp;
  viewedBy: string[];
}

function isValidEmail(email: string) {
  const re = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  return re.test(email);
}

function signUpForUpdates(email: string) {
  if (!isValidEmail(email)) {
    MySwal.fire({
      icon: "error",
      title: "Invalid email address",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
    });
    return;
  }

  const db = getFirestore();
  const docRef = doc(db, "emailsForUpdates", email);
  setDoc(docRef, { email: email })
    .then(() => SignedUp.fire())
    .catch(() => SignedUp.fire());
}

function sendMessage(
  name: string,
  email: string,
  topic: MessageTopic | null,
  message: string,
  clearData: () => void
) {
  // validate message
  if (!topic || !message) {
    MySwal.fire({
      icon: "error",
      title: "Invalid message",
      text: "Please select a topic and write your message",
    });
    return;
  }

  // validate email
  if (email && !isValidEmail(email)) {
    MySwal.fire({
      icon: "error",
      title: "Invalid email address",
      text: "Please enter a valid email address",
    });
    return;
  }

  // write to db
  const db = getFirestore();
  addDoc(collection(db, "messages"), {
    name: name,
    email: email,
    topic: topic,
    message: message,
    visible: true,
    timestamp: serverTimestamp(),
    viewedBy: [],
  })
    .then(() => {
      MySwal.fire({
        icon: "success",
        title: "Message sent!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
      });
      clearData();
    })
    .catch(() => {
      MySwal.fire({
        icon: "error",
        title: "Message failed to send",
        text: "Please try again later",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
      });
    });
}

export { signUpForUpdates, sendMessage, MessageTopic };
export type { Message };
