import { Outlet } from 'react-router-dom';
import Header from '../shared/Header'; // Ou import { Header } from '../shared/Header';

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;