/* eslint-disable no-shadow */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// TODO: Check for a better way to achieve this
export const createFileHyperlink = (absolutePath) => `${absolutePath}`; // file://${absolutePath}

export const getAuthInfoFromProxyUrl = (proxy) => {
  const isAuth = proxy.split(':').length === 4;

  if (isAuth) {
    const [host, port, user, pass] = proxy.split(':');
    return [host, port, user, pass];
  }

  const [host, port] = proxy.split(':');
  return [host, port];
};
