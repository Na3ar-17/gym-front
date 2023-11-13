import { FC, useEffect } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Shop from "./Pages/Shop/Shop";
import Product from "./Pages/Product/Product";
import Pricing from "./Pages/Pricing/Pricing";
import Profile from "./Pages/Profile/Profile";
import { fetchAuthMe } from "./Redux/Slices/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import LeftMenuDrawer from "./Components/LeftMenuDrawer/LeftMenuDrawer";
import { IUserData } from "./Interfaces/UserData";
import { closeDrawer } from "./Redux/Slices/appSlice";
import Settings from "./Pages/Settings/Settings";
import TimeTable from "./Pages/TimeTable/TimeTable";
import Trainers from "./Pages/Trainers/Trainers";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import { fetchGetAdmin } from "./Redux/Slices/adminSlice";
import Admin from "./Pages/Admin/Admin";
import CreateShopItemForm from "./Components/CreateShopItemForm/CreateShopItemForm";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.auth.data) as IUserData;

  useEffect(() => {
    dispatch(fetchAuthMe());
    dispatch(fetchGetAdmin());
  }, []);

  const toggleDrawer = () => {
    dispatch(closeDrawer());
  };

  const { isDrawerOpen } = useAppSelector((state) => state.app);

  return (
    <>
      <BrowserRouter>
        <LeftMenuDrawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          email={data ? data.email : "error"}
          fullName={data ? data.fullName : "error error"}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/time-table"
            element={
              <TimeTable isFooter={true} isHeader={true} isLoader={true} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/our-team"
            element={
              <Trainers isFooter={true} isHeader={true} isLoader={true} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/shop-item/:id" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/profile"
            element={<Profile toggleDrawer={toggleDrawer} />}
          />
          <Route
            path="/profile/settings"
            element={<Settings toggleDrawer={toggleDrawer} />}
          />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<Admin toggleDrawer={toggleDrawer} />}
          />
          <Route
            path="/edit/:id"
            element={<CreateShopItemForm toggleDrawer={toggleDrawer} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
