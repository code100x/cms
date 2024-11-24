export default function handleManifest(content: string) {
  let a = '';
  let d = 0;
  const b = Array.from(process.env.ENCRYPTION_KEY!).map((c) => c.charCodeAt(0));

  for (let e = 0; e < content.length; e++) {
    a += String.fromCharCode(content.charCodeAt(e) ^ b[d]);
    d = (d + 1) % b.length;
  }

  return a;
}
