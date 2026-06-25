/*
 * Browser-side image helpers shared by the blog editor and the page builder.
 *
 * Images are downscaled + JPEG-encoded in the browser before upload so the base64 payload stays
 * well under Vercel's ~4.5 MB request-body limit, then sent to /api/upload (which stores them in
 * Sanity's asset store and returns a cdn.sanity.io URL).
 */

/** Downscale to maxWidth and JPEG-encode. Returns { dataBase64, filename, contentType }. */
export function downscaleImage(file, maxWidth = 1600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read_failed'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('decode_failed'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve({
          dataBase64: canvas.toDataURL('image/jpeg', 0.82),
          filename: (file.name || 'image').replace(/\.[^.]+$/, '') + '.jpg',
          contentType: 'image/jpeg',
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Downscale a File and upload it through the admin `api` helper. Returns the /api/upload
 * response ({ ok, assetId, url }). The caller stores `url` (a cdn.sanity.io URL).
 */
export async function uploadImage(api, file) {
  const { dataBase64, filename, contentType } = await downscaleImage(file);
  return api('upload', { method: 'POST', body: { dataBase64, filename, contentType } });
}
