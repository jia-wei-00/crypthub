import { Button, Container } from '@mui/material';
import React from 'react';
import '../styles/hero.scss';
import Logo from '../assets/logo.svg';
import { motion } from 'framer-motion';
import ScrollText from '../scroll-text';
import { SectionT } from './faq-section';

const HeroSection: React.FC<SectionT> = ({
  subtitle,
  link_btn,
  desc,
  scrol_text,
}) => {
  return (
    <div className="section-container">
      <Container maxWidth="lg">
        <div className="logo">
          <motion.img
            initial={{ rotate: -180, y: 0 }}
            whileInView={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            src={Logo}
            width={150}
          />
          <motion.div
            initial={{ width: 0, scaleX: 0, opacity: 0 }}
            whileInView={{
              scaleX: 1,
              width: 'unset',
              opacity: 1,
            }}
            transition={{ ease: 'linear', delay: 0.6, duration: 0.5 }}
          >
            rypthub
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ ease: 'linear', delay: 1.3, duration: 0.5 }}
          className="title"
        >
          {subtitle}
        </motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ ease: 'linear', delay: 1.3, duration: 0.5 }}
          className="desc"
        >
          {desc}
        </motion.div>
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          transition={{ ease: 'linear', delay: 2, duration: 0.3 }}
          className="trade-btn"
        >
          <Button variant="contained" href={link_btn!.link} target="_blank">
            {link_btn!.title}
          </Button>
        </motion.div>
      </Container>
      <ScrollText main={scrol_text.main} sub={scrol_text.sub} />
    </div>
  );
};

export default HeroSection;
