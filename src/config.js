const dev = {
  STRIPE_KEY: "pk_test_IkEk1d6pYbKDsXnVqdtcTRFp",
  s3: {
    REGION: "us-east-1",
    BUCKET: "goodglobe-app-5-api-dev-attachmentsbucket-1mlcmgwve4go7"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://8h6745jlr4.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_suTKBbvwN",
    APP_CLIENT_ID: "7kud8enl3dok6e1ubteihes7d5",
    IDENTITY_POOL_ID: "us-east-1:e85feec3-fba3-4002-8fe9-b9471eb06296"
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

