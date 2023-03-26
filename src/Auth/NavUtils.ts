import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MySwal } from "../Generic/Notify";
import { signIn } from "./AuthUtils";
import UserContext from "./UserContext";

function useProtectedNav() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  return (route: string) => {
    if (user) {
      navigate(route);
      return;
    }

    // otherwise, open a modal to sign in
    MySwal.fire({
      title: "Please sign in to continue",
      backdrop: true,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sign in with Google",
      confirmButtonColor: "#4285f4",
      cancelButtonText: "Cancel",
      html: `<p class="text-sm">You need to sign in to continue because this
      resource requires backend functionality (e.g., database) so all users
      are required to register for safety and data persistence.</p>`
    })
    .then((result) => {
      if (!result.isConfirmed) return;
      signIn().then(() => navigate(route));
    });
  }

};

export { useProtectedNav };