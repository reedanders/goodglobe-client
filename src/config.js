const dev = {
  STRIPE_KEY: "pk_test_IkEk1d6pYbKDsXnVqdtcTRFp",
  s3: {
    REGION: "us-east-1",
    BUCKET: "goodglobe-app-api-dev-attachmentsbucket-rpxrvu4akwpp"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://dwnzqe1u8c.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_Xgu0DvQtA",
    APP_CLIENT_ID: "7psd42lucjjdcfj95id29808vu",
    IDENTITY_POOL_ID: "us-east-1:7fb4570d-76bd-406a-b5d7-d1edc46c6776"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_IkEk1d6pYbKDsXnVqdtcTRFp",
  s3: {
    REGION: "us-east-1",
    BUCKET: "goodglobe-app-api-prod-attachmentsbucket-1dc1vp66vq3z5"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://y1fnzbn6ua.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_swZ3aWaox",
    APP_CLIENT_ID: "4lu1m39h9or3e2479v71ok8aaj",
    IDENTITY_POOL_ID: "us-east-1:ac03ee8a-0325-4eba-b287-019186789a71"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};

