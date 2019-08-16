export function debounce(fn: (...args: any[]) => any, timeout: number) {

  let timer: any = undefined;

  return function wrapper(this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  }
}