import ky from 'ky';

export const fetchNavDetails = (schemeNumber) => {
   return ky.get(`https://api.mfapi.in/mf/${schemeNumber}`).json()
}
