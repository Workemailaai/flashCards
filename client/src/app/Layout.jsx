import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/footer";

export default function Layout() {
  return (
    <div className="app">
      <Navigation />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}