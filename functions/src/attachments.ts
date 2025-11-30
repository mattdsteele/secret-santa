import { load } from "cheerio";
import { FirebaseStorage, getDownloadURL, ref, uploadString } from "firebase/storage";
import formidable = require("formidable");
import { readFileSync } from "node:fs";

export const findImages = (html: string): string[] => {
    const $ = load(html);
    const imgs = $('img');
    let items: string[] = [];
    imgs.each((_, i) => {
        items.push(i.attributes.find(e => e.name === 'src')?.value!);
    })
    return items;
};
export const base64String = (metadata: formidable.File, includePreamble = true) => {
    const base64String = readFileSync(metadata.filepath, {encoding: 'base64'});
    const preamble = `data:${metadata.mimetype};base64,`;
    return `${includePreamble ? preamble : ''}${base64String}`;
};
      
const uploadAndGetDownloadUrl = async (
  f: formidable.File,
  storage: any
): Promise<string> => {
  const storageRef = ref(storage, `attachments/${f.newFilename}`);
  const firebaseFile = await uploadString(
    storageRef,
    base64String(f, false),
    "base64",
    { contentType: f.mimetype }
  );
  const dlUrl = await getDownloadURL(firebaseFile.ref);
  console.log(dlUrl);
  return dlUrl;
};
export const replaceAllImages = async (
  html: string,
  attachments: formidable.Files<string>,
  storage: FirebaseStorage
) => {
  const images = findImages(html);
  const atts = Object.keys(attachments)
    .sort()
    .map((a) => attachments[a][0]);
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const a = atts[i];
    const dlUrl = await uploadAndGetDownloadUrl(a, storage);
    html = html.replace(img, dlUrl);
  }
  return html;
};