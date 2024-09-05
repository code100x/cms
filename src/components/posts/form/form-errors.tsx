import { motion } from 'framer-motion';
interface FormErrorsProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPostErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        type: 'spring',
        damping: 10,
      }}
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-sm"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center gap-2 rounded-lg border border-red-600 bg-red-600/10 p-3 font-medium text-red-600"
        >
          {error}
        </div>
      ))}
    </motion.div>
  );
};
