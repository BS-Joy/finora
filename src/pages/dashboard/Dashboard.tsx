import { useAuthStore } from "@/store/AuthStore";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <section className="p-2">
      <motion.div
        className="ml-2 md:ml-69 font-jakarta"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <h1>Welcome to Finora</h1>
        <p>{user?.id && user?.user_metadata?.name}</p>{" "}
      </motion.div>
    </section>
  );
};

export default Dashboard;
