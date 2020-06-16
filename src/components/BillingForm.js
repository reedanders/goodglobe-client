import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { useFormFields } from "../libs/hooksLib";
import "./BillingForm.css";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Title from '../containers/Title';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function BillingForm({ isLoading, onSubmit, ...props }) {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.storage !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event) {
    event.preventDefault();

    setIsProcessing(true);

    const { token, error } = await props.stripe.createToken({ name: fields.name });

    setIsProcessing(false);

    onSubmit(fields.storage, { token, error });
  }

  return (
    <Container className="BillingForm, {classes.paper}" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Title>
            Payment information
        </Title>
        <form className={classes.form} onSubmit={handleSubmitClick} noValidate>
          <TextField
          value={fields.storage}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          required
          type="number"
          fullWidth
          id="storage"
          label="Storage"
          name="storage"
          autoComplete="storage"
          autoFocus
        />
        <TextField
          value={fields.name}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          min="0"
          type="text"
          required
          fullWidth
          id="name"
          label="Cardholder's name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <CardElement
          className="card-field"
          onChange={e => setIsCardComplete(e.complete)}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!validateForm()}
        >
          Purchase
        </Button>
        </form>
      </div>
    </Container>
  );
}

export default injectStripe(BillingForm);