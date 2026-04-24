import { motion } from "framer-motion";
const IncomePage = () => {
  return (
    <motion.div
      className="ml-2 md:ml-69"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <h1>Income Page</h1>
      <p>This is where you can manage your income.</p>
    </motion.div>
  );
};

export default IncomePage;
