import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import '../../styles/pages/p2p.scss';
import ItemCard from './item-card';
import { motion } from 'framer-motion';
import SellButton from './floading-sell';
import { observer } from 'mobx-react-lite';
import { authStore, modalStore, tourStore, p2pStore } from '@crypthub/store';
import { ConfirmationPopUp } from '@crypthub/components';
import { Steps } from 'intro.js-react';
import { P2PTour } from '../../constant';
import { filterContracts } from '../../functions';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const P2P: React.FC = () => {
  const [active, setActive] = React.useState('market');
  const [checked, setChecked] = React.useState([true, true]);
  const [sellModal, setSellModal] = React.useState(false);
  const [extend, setExtend] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<{ coin: number[]; price: number[] }>(
    { coin: [0, 50], price: [0, 60000] }
  );

  const filtered_market = React.useMemo(
    () => filterContracts(p2pStore.p2p_contracts, checked, value),
    [p2pStore.p2p_contracts, checked, value]
  );
  const filtered_ongoing = React.useMemo(
    () => filterContracts(p2pStore.p2p_ongoing_contracts, checked, value),
    [p2pStore.p2p_ongoing_contracts, checked, value]
  );

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  React.useEffect(() => {
    if (authStore.user === null) {
      setActive('market');
    }
  }, [authStore.user]);

  React.useEffect(() => {
    p2pStore.fetchOnGoingContracts();
    p2pStore.fetchP2PMarket();
  }, []);

  return (
    <Container maxWidth="xl" className="p2p-container">
      <div className="filter">
        <Typography variant="body1">Filter</Typography>
        <Divider />
        <div>
          <FormControlLabel
            label="Currency"
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
              label="ETH"
              control={
                <Checkbox checked={checked[0]} onChange={handleChange2} />
              }
            />
            <FormControlLabel
              label="BTC"
              control={
                <Checkbox checked={checked[1]} onChange={handleChange3} />
              }
            />
          </Box>
        </div>

        <div className={`filter-slider ${extend && 'extend'}`}>
          <Divider />
          <Typography variant="body2" id="price-slider">
            Price Range:
          </Typography>
          <Slider
            value={value.price}
            onChange={(_, new_value) =>
              setValue({ ...value, price: new_value as number[] })
            }
            size="small"
            valueLabelDisplay="auto"
            min={0}
            max={60000}
            step={100}
          />
          <Typography variant="body2" id="coin-slider">
            Coin Range:
          </Typography>
          <Slider
            value={value.coin}
            onChange={(_, new_value) =>
              setValue({ ...value, coin: new_value as number[] })
            }
            size="small"
            valueLabelDisplay="auto"
            min={0}
            max={50}
          />
        </div>

        <div className="extend-arrow" onClick={() => setExtend(!extend)}>
          {!extend ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </div>
      </div>
      <div className="market-card">
        <Stack direction="row" className="p2p-head-stack">
          <Button
            onClick={() => setActive('market')}
            className={
              authStore.user === null
                ? 'toggle-market-btn-width'
                : active !== 'market'
                ? 'bg-color'
                : ''
            }
            id="market-tour"
          >
            Marketplace
          </Button>
          {authStore.user !== null && (
            <Button
              onClick={() => setActive('ongoing')}
              className={active !== 'ongoing' ? 'bg-color' : ''}
              id="ongoing-tour"
            >
              On Going
            </Button>
          )}
          <motion.div
            className="p2p-indicator"
            animate={active === 'market' ? { x: 0 } : { x: '100%' }}
          />
        </Stack>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {active === 'market' ? (
            p2pStore.p2p_contracts.length === 0 ? (
              <div className="absolute-middle">No Contract</div>
            ) : (
              filtered_market.map((contract, index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                  <ItemCard active={active} contract={contract} />
                </Grid>
              ))
            )
          ) : p2pStore.p2p_ongoing_contracts.length === 0 ? (
            <div className="absolute-middle">No Contract</div>
          ) : (
            filtered_ongoing.map((contract, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <ItemCard active={active} contract={contract} />
              </Grid>
            ))
          )}
        </Grid>
      </div>
      <SellButton state={sellModal} setState={setSellModal} />
      {modalStore.confirmation_modal.open && <ConfirmationPopUp />}

      <Steps
        enabled={tourStore.tour.p2p}
        steps={P2PTour.steps}
        initialStep={0}
        onExit={() => tourStore.setTour({ p2p: false })}
        options={P2PTour.options}
        onBeforeExit={(step) => {
          if (step === P2PTour.steps.length - 1) {
            setSellModal(true);
            setTimeout(() => {
              tourStore.setTour({ sell_p2p: true });
            }, 500);
          }
        }}
      />
    </Container>
  );
};

export default observer(P2P);
