import { Storage } from "aws-amplify";
import config from '../config';

export async function uploadAll(file) {
  return Promise.all(file.map(image => s3Upload(image)))
}

export async function s3Upload(image) {

  const filename = `${Date.now()}-${image.name}`;

  Storage.configure({ level: 'public' });

  const stored = await Storage.put(filename, image, {
    contentType: image.type,
    ACL: 'public-read'

  });

  const result = `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${stored.key}`;
  return result;
}

export async function s3GetUrl(attachment) {

  const attachmentUrl = await Storage.vault.get(attachment);

  return attachmentUrl;
}