import { load } from "cheerio";
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
export const replaceAllImages = (html: string, attachments: formidable.Files<string>) => {
    const images = findImages(html);
    const atts = Object.keys(attachments).sort().map(a => attachments[a][0]);
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const a = atts[i];
        html = html.replace(img, base64String(a));
    }
    return html;
}