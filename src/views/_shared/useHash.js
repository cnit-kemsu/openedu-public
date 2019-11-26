import { useEffect } from 'react';

function changeHash(hash) {
  if (window.location.hash === hash) {
    window.location.hash = '';
    setTimeout(() => {
      window.location.hash = hash;
      //window.scroll(0, 100);
    }, 0);
  }
}

export function useHash(hash) {
  useEffect(() => changeHash(hash), [hash]);
}