import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function s3GetUrl(attachment) {

  const attachmentUrl = await Storage.vault.get(attachment);

  console.log(attachmentUrl);

  return attachmentUrl;
}