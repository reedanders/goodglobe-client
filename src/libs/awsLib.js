import { Storage } from "aws-amplify";
import config from '../config';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  Storage.configure({ level: 'public' });

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });
  // const stored_public = await Storage.put(filename, file, {
  //   contentType: file.type,
  // });

  // const stored = await Storage.put(filename, file, {
  //   contentType: file.type,
  // }).then (result => Storage.get(result.key));


  const result = `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${stored.key}`;
  console.log(result);
  return result;
}

export async function s3GetUrl(attachment) {

  const attachmentUrl = await Storage.vault.get(attachment);

  console.log(attachmentUrl);

  return attachmentUrl;
}