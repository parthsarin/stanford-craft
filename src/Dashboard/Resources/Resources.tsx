import { useAuthUser } from "@react-query-firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Resources = () => {
  const { isLoading, data: user } = useAuthUser('user', getAuth());
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) navigate('/login');
  }, [user, isLoading, navigate]);
  
  if (isLoading) return null;
  
  return (
    <div className="flex-1 p-4">
     <h1 className="text-2xl">Resources</h1>
     <div></div>
    </div>
  )
}

export default Resources;