import { AppShell, Center, Loader } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routes_app } from '../routes';
import styles from "./layout.module.css"
import { Header } from './header/header';


const NotFound = lazy(() => import("../pages/404"));



function CollapseDesktop() {
  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <AppShell
      // padding="md"
      header={{ height: 65 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !false, desktop: !false },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main className={`${styles.layoutBody} flex flex-col items-center p-0 m-0 bg-primaryBlue-100`}>
      <div className={`${styles.layout} flex flex-col`}>
        {/* <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button> */}
        <Suspense fallback={<Center className='h-full'><Loader /></Center>}>
        <Routes>
        <Route path="/" element={<Navigate to="/tests" replace />} />
          {routes_app?.map((route:any, idx:number) => {
            return (
                route.element && (
                <Route
                    key={idx}
                    path={route?.path}
                    // exact={route?.exact}
                    // name={route?.name}
                    element={<route.element />}
                />
                )
            );
            })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default CollapseDesktop;