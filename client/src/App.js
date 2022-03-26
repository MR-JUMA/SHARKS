import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Tigo from "./pages/companylist/Tigo";
import Voda from "./pages/companylist/Voda";
import Halo from "./pages/companylist/Halo";
import Air from "./pages/companylist/Air";
import Sales from "./pages/sales/Sales";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import NotFound from "./pages/notfound/NotFound";
import Alerts from "./components/layout/Alerts";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PrivateRoute from './components/routing/PrivateRoute'



function App({darkMode}) {

  return (
    <div className={darkMode.darkMode ? "app dark" : "app"}>
      <Alerts/>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute/>}>
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path='/sales' element={<Sales />} />
            <Route path='/tigo' element={<Tigo />} />
            <Route path='/voda' element={<Voda />} />
            <Route path='/halo' element={<Halo />} />
            <Route path='/air' element={<Air />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

App.propTypes = {
  darkMode : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  darkMode : state.darkMode
})

export default connect(mapStateToProps)(App)
