/* eslint-disable eqeqeq */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */

import path from 'path';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const fileUrl = (str) => {
  if (typeof str !== 'string') {
    throw new Error('Expected a string');
  }

  let pathName = path.resolve(str).replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash (changes: C:/Users/ ==> /C:/Users)
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`;
  }

  return encodeURI(`file://${pathName}`);
};

export const getAuthInfoFromProxyUrl = (proxy) => {
  const isAuth = proxy.split(':').length === 4;

  if (isAuth) {
    const [host, port, user, pass] = proxy.split(':');
    return [host, port, user, pass];
  }

  const [host, port] = proxy.split(':');
  return [host, port];
};

// VAlidate time format
export const isValidTime = (str) => {
  // Regex to check valid
  // time in 12-hour format
  const regex = new RegExp(/((1[0-2]|0?[1-9]):([0-5][0-9]))/);

  //  if str
  // is empty return false
  if (str == null) {
    return 'false';
  }

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return 'true';
  }
  return 'false';
};
