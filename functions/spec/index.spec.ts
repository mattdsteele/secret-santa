import { expect, test } from 'vitest';
import {findImages, base64String, replaceAllImages} from '../src/attachments';

import * as fixtures from './fixtures';

test('image', () => {
    const {wishlist} = fixtures;
    const images = findImages(wishlist);
    expect(images.length).toEqual(2);
    expect(images[0]).toEqual('cid:ii_mii6iqdu0');
})
test('base64', () => {
    const [att1]: any = fixtures.attachments['attachment-1']
    const b64 = base64String(att1);
    expect(b64).toContain('data:image/png;base64,');
});
test('replace', () => {
    const newWishlist = replaceAllImages(fixtures.wishlist, fixtures.attachments as any);
    expect(newWishlist).toContain(`src="data:image/png;base64,`)
})