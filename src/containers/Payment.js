import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { onError } from '../libs/errorLib';
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from '../components/BillingForm';
import config from '../config';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
}));

export default function Payment() {
  const history = useHistory();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const message = "Heads up! We'll accept payments soon.";

  useEffect(() => {
    setStripe(window.Stripe(config.STRIPE_KEY));
    enqueueSnackbar(message, {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
    });
  }, [enqueueSnackbar]);

  function billUser(details) {
    return API.post('goodglobe', '/billing', {
      body: details,
    });
  }

  async function handleFormSubmit(storage, { token, error }) {
    if (error) {
      onError(error);
      return;
    }

    setIsLoading(true);

    try {
      await billUser({
        storage,
        source: token.id,
      });

      alert('Your card has been charged successfully!');
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Payment">
      <Paper className={classes.paper}>
        <StripeProvider stripe={stripe}>
          <Elements>
            <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit} />
          </Elements>
        </StripeProvider>
      </Paper>
    </div>
  );
}
