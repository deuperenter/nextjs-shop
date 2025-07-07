export function delay(ms: number) {
  const delay = Date.now() + ms;
  while (Date.now() < delay) {}
}

export function makeError() {
  throw new Error();
}
