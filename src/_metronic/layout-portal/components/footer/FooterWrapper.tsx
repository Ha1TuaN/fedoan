import clsx from 'clsx';
import { useLayout } from '../../core';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';

const FooterWrapper = () => {
  const { config } = useLayout();
  if (!config.app?.footer?.display) {
    return null;
  }

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <span className="text-muted">© Phần mềm quản lý nhiệm vụ khoa học.</span>
      </div>
    </footer>
  );
};

export { FooterWrapper };