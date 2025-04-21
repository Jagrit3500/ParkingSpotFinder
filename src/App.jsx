/* src/App.jsx */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParkingProvider } from "./context/ParkingContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <ParkingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="details/:id" element={<Details />} />
            <Route path="booking/:id" element={<Booking />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ParkingProvider>
  );
}

export default App;
