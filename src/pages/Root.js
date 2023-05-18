import { Outlet} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {


  return (
    <>
      <MainNavigation />
      <main>
      {/* renders if any child routing is present * ********************/}
        <Outlet /> 
      </main>
    </>
  );
}

export default RootLayout;
