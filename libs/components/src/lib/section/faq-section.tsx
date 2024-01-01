import { Button, Container, useMediaQuery } from '@mui/material';
import React from 'react';
import '../styles/components/hero.scss';
import { motion } from 'framer-motion';
import ScrollText from '../scroll-text';
import { FAQAccordions } from '../faq';
import { FAQDialog } from '../dialog';
import { FAQDataProps } from '../faq/type';

export type SectionT = {
  title?: string;
  subtitle?: string;
  desc?: string;
  link_btn?: {
    title: string;
    link: string;
  };
  type?: string;
  scrol_text: {
    main: string;
    sub: string;
  };
  faq_data: FAQDataProps[];
};

const FAQSection: React.FC<SectionT> = ({
  title,
  desc,
  scrol_text,
  faq_data,
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  const [faqModal, setFaqModal] = React.useState(false);

  return (
    <>
      <div className="section-container">
        <Container maxWidth="lg">
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ ease: 'linear', delay: 0.5, duration: 0.3 }}
            className="logo"
          >
            {title}
          </motion.div>
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ ease: 'linear', delay: 1.3, duration: 0.2 }}
            className="desc"
          >
            {desc}
          </motion.div>
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ ease: 'linear', delay: 1.5, duration: 0.2 }}
            className="title"
          >
            {!matches ? (
              <FAQAccordions data={faq_data} />
            ) : (
              <Button variant="contained" onClick={() => setFaqModal(true)}>
                Details
              </Button>
            )}
          </motion.div>
        </Container>
        <ScrollText main={scrol_text.main} sub={scrol_text.sub} />
      </div>
      <FAQDialog state={faqModal} setState={setFaqModal} />
    </>
  );
};

export default FAQSection;
