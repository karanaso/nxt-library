import { Outlet, Route, Routes } from 'react-router-dom';
import { ListMembers } from './containers/ListMembers';
import { EditMember } from './containers/EditMember';
import ResponsiveAppBar from './containers/NavBar';

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
        <Route path="members" element={<ListMembers />} />
        <Route path="members/:id" element={<EditMember />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

export default App;
