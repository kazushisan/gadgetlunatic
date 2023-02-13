import { useCallback, useEffect, useState } from 'react';

const getPosition = (element) => {
  const sibling = element.parentElement.previousElementSibling;

  if (sibling) {
    return sibling.getBoundingClientRect().bottom;
  }

  return element.getBoundingClientRect().bottom;
};

export const useTableOfContentsActiveItem = (headings) => {
  const [activeId, setActiveId] = useState(null);

  const getHeadingElements = useCallback(
    () =>
      Array.from(
        document.querySelectorAll(headings.map(({ id }) => `#${id}`).join(',')),
      ),
    [headings],
  );

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(() => {
      const headingElements = getHeadingElements();

      const target = headingElements.reduce(
        (acc, cur) => {
          const position = getPosition(cur);

          if (position > 0) {
            return acc;
          }

          if (acc.position > cur.position) {
            return acc;
          }

          return {
            position,
            id: cur.id,
          };
        },
        {
          position: getPosition(headingElements[0]),
          id: headingElements[0].id,
        },
      );

      if (target.id !== activeId) {
        setActiveId(target.id);
      }
    });

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      const sibling = element.parentElement.previousElementSibling;
      if (sibling) {
        observer.observe(sibling);
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings, getHeadingElements]);

  return activeId;
};
