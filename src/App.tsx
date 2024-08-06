import { Outlet, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ListMembers } from './containers/ListMembers';
import { EditMember } from './containers/EditMember';
import ResponsiveAppBar from './containers/NavBar';
import { EditBook } from './containers/EditBook';
import { ListBooks } from './containers/ListBooks';
import { ListTransactions } from './containers/ListTransactions';
import { EditTransaction } from './containers/EditTransaction';
import { SignIn } from './containers/users/SignIn';
import { SignUp } from './containers/users/SignUp';
import { PasswordReset } from './containers/users/PasswordReset';
import { links } from './helpers/links';
import { Signout } from './containers/users/Signout';
import { useLayoutEffect, useState } from 'react';
import { redirectIfUnsecure } from './helpers/auth';
import { Configuration } from './containers/users/ConfigurationOptions';

import { MultiProvider } from './components/SnackbarComponent';
import { IntlProvider } from 'react-intl';
import { messages } from './helpers/internationalization';

const NoMatch = () => <div>No match</div>
const Home = () => <div>Home</div>

function Layout() {
  const locale = 'el';
  const navigate = useNavigate();
  const location = useLocation();
  useLayoutEffect(() => {
    redirectIfUnsecure({ location, navigate });
  });

  return (
    <MultiProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ResponsiveAppBar />
        <Outlet />
      </IntlProvider>
    </MultiProvider>
  );
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={links.user.signin} element={<SignIn />} />
        <Route path={links.user.signup} element={<SignUp />} />
        <Route path={links.user.signout} element={<Signout />} />
        <Route path={links.user.forgotPassword} element={<PasswordReset />} />
        <Route path={links.user.configuration} element={<Configuration />} />
        <Route path={links.members.list} element={<ListMembers />} />
        <Route path={links.members.edit(':id')} element={<EditMember />} />
        <Route path={links.books.list} element={<ListBooks />} />
        <Route path={links.books.edit(':id')} element={<EditBook />} />
        <Route path={links.transactions.list} element={<ListTransactions />} />
        <Route path={links.transactions.edit(':id')} element={<EditTransaction />} />
        <Route path={links.transactions.byBemberId(':memberOrBook', ':id')} element={<ListTransactions />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
