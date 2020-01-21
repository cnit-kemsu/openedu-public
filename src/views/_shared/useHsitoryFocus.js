import { useEffect, useRef } from 'react';

// const options = {
//   root: null,
//   rootMargin: '-45% 0px -45% 0px',
//   threshold: 0
// };

// const callback = (entries, observer) => { 
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const key = elementsMap.get(entry.target);
//       history.replaceState({ ...history.state, focusElementKey: key }, document.title, location.href);
//     }
//   });
// };

// const observer = new IntersectionObserver(callback, options);

//const elementsMap = new Map();

export function useHsitoryFocus(key) {
  const ref = useRef();
  useEffect(() => {
    const element = ref.current;
    // observer.observe(element);
    // elementsMap.set(element, key);
    if (history.state?.focusElementKey === key) element.scrollIntoView();
    // return () => {
    //   observer.unobserve(element);
    //   elementsMap.delete(element);
    // };
  }, [key]);
  return ref;
}