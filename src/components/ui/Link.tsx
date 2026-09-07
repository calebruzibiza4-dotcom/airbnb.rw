import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (
      e.button !== 0 ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey ||
      href.startsWith('http') ||
      href.startsWith('mailto:')
    ) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);

    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new Event('pushstate'));
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
