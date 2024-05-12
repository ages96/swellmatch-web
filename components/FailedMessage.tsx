import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import failedIcon from "../public/assets/failed.png";

interface FailedMessageProps {
  message: any;
}

const failedVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const FailedMessage: React.FC<FailedMessageProps> = ({ message }) => {
  const refresh = () => window.location.reload();

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={failedVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="md:mb-4">
        <Image
          src={failedIcon}
          width={150}
          height={150}
          alt="Failed Icon"
        />
      </div>
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Failed!
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        {message}
      </p>
      <div className="flex items-center mt-6">
        <Button
          onClick={refresh}
          className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
        >
          <RefreshCcw className="mr-2 h-4 w-4" /> Restart
        </Button>
      </div>
    </motion.section>
  );
};

export default FailedMessage;