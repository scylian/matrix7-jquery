import { BASE_URL } from './config.mjs';

export const ctxAPI = async (endpoint, query={}) => {
  let queryStr = '?';
  if (!jQuery.isEmptyObject(query)) {
    Object.entries(query).forEach(entry => {
      queryStr += `${entry[0]}=${entry[1]}&`;
    });
  }
  const response = await fetch(`${BASE_URL}/${endpoint}.php${queryStr}`);
  const json = await response.json();
  return json;
}