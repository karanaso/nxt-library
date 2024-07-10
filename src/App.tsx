import { Outlet, Route, Routes } from 'react-router-dom';
import { ListMembers } from './containers/ListMembers';
import { EditMember } from './containers/EditMember';
import ResponsiveAppBar from './containers/NavBar';
import { EditBook } from './containers/EditBook';
import { ListBooks } from './containers/ListBooks';
import { ListTransactions } from './containers/ListTransactions';
import { EditTransaction } from './containers/EditTransaction';
import { Login } from './containers/Login';

const NoMatch = () => <div>No match</div>
const Home = () => <div>Home</div>

function Layout() {
  return (
    <div>
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="members" element={<ListMembers />} />
        <Route path="members/:id" element={<EditMember />} />
        <Route path="books/" element={<ListBooks />} />
        <Route path="books/:id" element={<EditBook />} />
        <Route path="transactions/" element={<ListTransactions />} />
        <Route path="transactions/:id" element={<EditTransaction />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
