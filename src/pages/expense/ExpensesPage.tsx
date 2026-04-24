import { motion } from "framer-motion";
const ExpensesPage = () => {
  return (
    <motion.div
      className="ml-2 md:ml-69"
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <h1>Expenses Page</h1>
      <p>This is where you can manage your expenses.</p>
    </motion.div>
  );
};

export default ExpensesPage;
