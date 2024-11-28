/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {useIntl} from 'react-intl';
import {KTSVG} from '../../../../helpers';
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub';
import {SidebarMenuItem} from './SidebarMenuItem';
import {useAuth} from 'src/app/modules/auth';

const SidebarMenuMain = () => {
  const intl = useIntl();
  const {currentUser, currentPermissions} = useAuth();

  const CheckRole = (roles, role) => {
    if (!roles) {
      return false;
    }
    return roles.some((v) => role.includes(v));
  };

  return (
    <>
      <SidebarMenuItem to='/dashboard' icon='/media/icons/duotune/art/art002.svg' title={'Trang chủ'} fontIcon='bi-app-indicator' />
    </>
  );
};

export {SidebarMenuMain};
