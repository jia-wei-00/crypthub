import { Button, Container } from '@mui/material';
import React from 'react';
import '../styles/components/hero.scss';
import { motion } from 'framer-motion';
import { ScrollText } from '@crypthub/components';
import { ActionT, ModalStateT, SectionT } from '../type';
import {
  MODALACTIONS,
  crypthub_data,
  initialModals,
  p2p_data,
} from '../constant';
import { CrypthubTraderDialog, P2PTraderDialog } from '@crypthub/components';

const reducer = (state: ModalStateT, action: ActionT) => {
  switch (action.type) {
    case MODALACTIONS.CRYPTHUB_MODAL:
      return { ...state, crypthub_trader_modal: !state.crypthub_trader_modal };
    case MODALACTIONS.P2P_MODAL:
      return { ...state, p2p_trader_modal: !state.p2p_trader_modal };
    default:
      return state;
  }
};

const Section: React.FC<SectionT> = ({
  title,
  subtitle,
  desc,
  link_btn,
  type,
  scrol_text,
}) => {
  const [modal, dispatch] = React.useReducer(reducer, initialModals);

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
          {subtitle && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ ease: 'linear', delay: 1.3, duration: 0.2 }}
              className="title"
            >
              {subtitle}
            </motion.div>
          )}
          {desc && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ ease: 'linear', delay: 1.3, duration: 0.2 }}
              className="desc"
            >
              {desc}
            </motion.div>
          )}
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            transition={{ ease: 'linear', delay: 1.8, duration: 0.3 }}
            className="trade-btn"
          >
            {link_btn && (
              <Button variant="contained" href={link_btn.link} target="_blank">
                {link_btn.title}
              </Button>
            )}
            {type && (
              <Button
                variant="outlined"
                onClick={() => dispatch({ type: type })}
              >
                Details
              </Button>
            )}
          </motion.div>
        </Container>
        <ScrollText main={scrol_text.main} sub={scrol_text.sub} />
      </div>
      <CrypthubTraderDialog
        modal={modal}
        dispatch={dispatch}
        data={crypthub_data}
      />
      <P2PTraderDialog modal={modal} dispatch={dispatch} data={p2p_data} />
    </>
  );
};

export default Section;
