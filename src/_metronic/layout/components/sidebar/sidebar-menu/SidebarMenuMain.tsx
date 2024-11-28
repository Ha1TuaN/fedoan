/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {useIntl} from 'react-intl';
import {KTSVG} from '../../../../helpers';
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub';
import {SidebarMenuItem} from './SidebarMenuItem';
import {useAuth} from 'src/app/modules/auth';

const SidebarMenuMain = () => {
  const intl = useIntl();
  const {currentUser, logout} = useAuth();

  return (
    <>
      <SidebarMenuItem to='/manage/dashboard' icon='/media/icons/duotune/art/art002.svg' title={'Trang chủ'} />

      <SidebarMenuItemWithSub to='/manage/owner' title='Quản lý bài đăng' icon='/media/icons/duotune/general/gen025.svg'>
        <SidebarMenuItem to='/manage/owner/post' title='Quản lý bài đăng' hasBullet={true} />
      </SidebarMenuItemWithSub>

      {/* <SidebarMenuItemWithSub to='/manage/system' title='Hệ thống' icon='/media/icons/duotune/coding/cod001.svg'>
        <SidebarMenuItem to='/manage/system/organizationunits' title='Cơ cấu tổ chức' hasBullet={true} />
        <SidebarMenuItem to='/manage/system/users' title='Người dùng' hasBullet={true} />
        <SidebarMenuItem to='/manage/system/roles' title='Vai trò người dùng' hasBullet={true} />
        <SidebarMenuItem to='/manage/system/audits' title='Nhật ký thao tác' hasBullet={true} />
        <SidebarMenuItem to='/manage/system/auditlogins' title='Nhật ký đăng nhập' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
    </>
  );
};

export {SidebarMenuMain};
