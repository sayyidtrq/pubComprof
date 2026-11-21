import "server-only";
import { AwsClient } from "aws4fetch";

const accountId = process.env.R2_ACCOUNT_ID;
const bucket = process.env.R2_BUCKET;
const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");

export const r2Configured = Boolean(
  accountId &&
  bucket &&
  publicUrl &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY,
);

function client() {
  return new AwsClient({
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    service: "s3",
    region: "auto",
  });
}

const objectUrl = (key: string) =>
  `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${key}`;

export const ALLOWED_TYPES = ["image/webp", "image/jpeg", "image/png"] as const;
export const MAX_BYTES = 5 * 1024 * 1024;

/** A short-lived URL the browser can PUT one image to, plus its public address. */
export async function presignUpload(folder: string, contentType: string) {
  const ext = contentType.split("/")[1].replace("jpeg", "jpg");
  const key = `${folder}/${crypto.randomUUID()}.${ext}`;
  const url = new URL(objectUrl(key));
  url.searchParams.set("X-Amz-Expires", "300");
  const signed = await client().sign(
    new Request(url, {
      method: "PUT",
      headers: { "content-type": contentType },
    }),
    { aws: { signQuery: true } },
  );
  return { uploadUrl: signed.url, publicUrl: `${publicUrl}/${key}` };
}

/** Deletes an image we uploaded; bundled /images/... paths and foreign URLs are left alone. */
export async function deleteUploaded(src: string) {
  if (!r2Configured || !src.startsWith(`${publicUrl}/`)) return;
  const key = src.slice(publicUrl!.length + 1);
  await client().fetch(objectUrl(key), { method: "DELETE" });
}
