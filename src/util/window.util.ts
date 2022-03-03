const MOBILE_BREAKPOINT = 768;

const resize = (callback: Function) => {
  let resizeTimer = 0;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      callback();
    }, 100);
  });
};

const isMobile = () =>
  document.body.getBoundingClientRect().width < MOBILE_BREAKPOINT;

export const WindowUtil = {
  resize,
  isMobile,
};
