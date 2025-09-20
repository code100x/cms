'use client';
import Footer from '@/components/landing/footer';
import { tncContent } from './tnc-content';
import { motion } from 'framer-motion';
import FooterCTA from '@/components/landing/footer-cta';

const TermsAndConditionsPage = () => {
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
          Terms & Conditions
        </h1>
        <div className="mx-auto max-w-3xl">
          {tncContent.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                type: 'spring',
                damping: 10,
                stiffness: 100,
              }}
              className="mb-6"
            >
              <p className="mb-2 text-lg font-medium text-foreground/80">
                {item.description}
              </p>
              {item.points?.map((point) => (
                <p
                  key={point.id}
                  className="ml-4 mt-2 text-base text-foreground/70"
                >
                  {point.id}. {point.description}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.main>
      <FooterCTA />
      <Footer />
    </>
  );
};

export default TermsAndConditionsPage;
