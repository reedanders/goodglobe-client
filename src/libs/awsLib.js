import { Storage } from "aws-amplify";
import config from '../config';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  Storage.configure({ level: 'public' });

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    ACL: 'public-read'

  });

  const result = `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${stored.key}`;
  console.log(result);
  return result;
}

export async function s3GetUrl(attachment) {

  const attachmentUrl = await Storage.vault.get(attachment);

  return attachmentUrl;
}