import { useAuthStore } from "@/store/AuthStore";

const PrivateRoute = () => {
  const { user } = useAuthStore();

  console.log(user);

  return <div></div>;
};

export default PrivateRoute;
