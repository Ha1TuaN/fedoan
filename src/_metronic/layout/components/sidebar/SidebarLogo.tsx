import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { KTIcon, toAbsoluteUrl } from '../../../helpers';
import { useLayout } from '../../core';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ToggleComponent } from '../../../assets/ts/components';

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};

const SidebarLogo = (props: PropsType) => {
  const { config } = useLayout();
  const toggleRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const appSidebarDefaultMinimizeDesktopEnabled = config?.app?.sidebar?.default?.minimize?.desktop?.enabled;
  const appSidebarDefaultCollapseDesktopEnabled = config?.app?.sidebar?.default?.collapse?.desktop?.enabled;
  const toggleType = appSidebarDefaultCollapseDesktopEnabled ? 'collapse' : appSidebarDefaultMinimizeDesktopEnabled ? 'minimize' : '';
  const toggleState = appSidebarDefaultMinimizeDesktopEnabled ? 'active' : '';
  const appSidebarDefaultMinimizeDefault = config.app?.sidebar?.default?.minimize?.desktop?.default;

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!) as ToggleComponent | null;

      if (toggleObj === null) {
        return;
      }

      // Add a class to prevent sidebar hover effect after toggle click
      toggleObj.on('kt.toggle.change', function () {
        // Set animation state
        props.sidebarRef.current!.classList.add('animating');
        // Toggle the minimized state
        setIsMinimized(!isMinimized);

        // Wait till animation finishes
        setTimeout(function () {
          // Remove animation state
          props.sidebarRef.current!.classList.remove('animating');
        }, 300);
      });
    }, 600);
  }, [toggleRef, props.sidebarRef, isMinimized]);

  // Add event listeners for hover state
  useEffect(() => {
    const sidebar = props.sidebarRef.current;
    if (!sidebar) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    sidebar.addEventListener('mouseenter', handleMouseEnter);
    sidebar.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      sidebar.removeEventListener('mouseenter', handleMouseEnter);
      sidebar.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [props.sidebarRef]);

  return (
    <div className='app-sidebar-logo px-6 d-flex align-items-center' id='kt_app_sidebar_logo'>
      <Link to='/' className='d-flex align-items-center'>
        {config.layoutType === 'dark-sidebar' ? (
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='app-sidebar-logo-default' />
        ) : (
          <>
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='app-sidebar-logo-default theme-light-show' />
            <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='app-sidebar-logo-default theme-dark-show' />
          </>
        )}
        {(!isMinimized || isHovered) && <span className='logo logo-title fs-1 ms-5 fw-bolder'></span>}
      </Link>

      <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.svg')} className='h-40px app-sidebar-logo-minimize' />
    </div>
  );
};

export { SidebarLogo };
