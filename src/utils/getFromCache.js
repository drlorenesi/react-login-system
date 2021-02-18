import { differenceInMinutes } from 'date-fns';
import config from '../config';

// Takes in 'lastFetch' from slice
const getFromCache = (lastFetch) => {
  const diffInMinutes = differenceInMinutes(Date.now(), lastFetch);
  // If last fetch was less than ${config.cacheMins} minutes ago use cached value.
  if (diffInMinutes < config.cacheMins) {
    return true;
  } else {
    return false;
  }
};

export default getFromCache;
