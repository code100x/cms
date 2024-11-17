'use client';
import FooterCTA from '@/components/landing/footer-cta';
import { privacyPolicyContent } from './privacy-policy';
import { motion } from 'framer-motion';
import Footer from '@/components/landing/footer';

const PrivacyPolicyPage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        className="wrapper flex flex-col items-start justify-center"
      >
        <h1 className="mx-auto mb-8 w-full text-center text-4xl font-extrabold tracking-tighter text-primary md:mb-12 md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mx-auto text-center text-lg font-medium text-foreground/70">
          Last Updated At:{' '}
          <span className="text-primary">November 2, 2024</span>
        </div>
        <br />
        <div className="mx-auto max-w-3xl">
          {privacyPolicyContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + item.id * 0.1,
                type: 'spring',
                damping: 10,
                stiffness: 100,
              }}
              className="mb-6"
            >
              <p className="text-lg font-medium text-foreground/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.main>
      <FooterCTA />
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
