export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "goodglobe-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://8u9wea898a.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_jmMvb4mfg",
    APP_CLIENT_ID: "2ai2qbsjiof3l1m6iggn92olfn",
    IDENTITY_POOL_ID: "us-east-1:eeacd6ad-cbd4-4d52-b920-a0c955365252"
  }
};
