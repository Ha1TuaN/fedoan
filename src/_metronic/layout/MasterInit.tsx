import { useEffect } from 'react'
import { Tab } from 'bootstrap'
import {
  MenuComponent,
  DrawerComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
  SwapperComponent,
} from '../assets/ts/components'
import { ThemeModeComponent } from '../assets/ts/layout'
import { useAuth } from 'src/app/modules/auth';

import { useLayout } from './core'

export function MasterInit() {
  const { config } = useLayout()

  const pluginsInitialization = () => {
    ThemeModeComponent.init()
    setTimeout(() => {
      ToggleComponent.bootstrap()
      ScrollTopComponent.bootstrap()
      DrawerComponent.bootstrap()
      StickyComponent.bootstrap()
      MenuComponent.bootstrap()
      ScrollComponent.bootstrap()
      SwapperComponent.bootstrap()
      document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
        Tab.getOrCreateInstance(tab)
      })
    }, 500)
  }

  const pluginsCleanup = () => {
    ScrollComponent.destroyAll()
  }

  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      pluginsInitialization()
    } else {
      pluginsCleanup()
    }
  }, [config, currentUser])

  return <></>
}

// import { useEffect, useRef } from 'react'
// import { Tab } from 'bootstrap'
// import {
//   MenuComponent,
//   DrawerComponent,
//   ScrollComponent,
//   ScrollTopComponent,
//   StickyComponent,
//   ToggleComponent,
//   SwapperComponent,
// } from '../assets/ts/components'
// import { ThemeModeComponent } from '../assets/ts/layout'
// import { useAuth } from 'src/app/modules/auth';

// import { useLayout } from './core'

// export function MasterInit() {
//   const { config } = useLayout()
//   const isFirstRun = useRef(true)
//   const pluginsInitialization = () => {
//     isFirstRun.current = false
//     ThemeModeComponent.init()
//     setTimeout(() => {
//       ToggleComponent.bootstrap()
//       ScrollTopComponent.bootstrap()
//       DrawerComponent.bootstrap()
//       StickyComponent.bootstrap()
//       MenuComponent.bootstrap()
//       ScrollComponent.bootstrap()
//       SwapperComponent.bootstrap()
//       document.querySelectorAll('[data-bs-toggle="tab"]').forEach((tab) => {
//         Tab.getOrCreateInstance(tab)
//       })
//     }, 500)
//   }
//   const { currentUser } = useAuth();


//   useEffect(() => {
//     if (isFirstRun.current && currentUser) {
//       isFirstRun.current = false
//       pluginsInitialization()
//     }
//   }, [config, currentUser])

//   return <></>
// }
