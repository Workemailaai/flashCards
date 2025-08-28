import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../widgets/navigation/Navigation';


export default function Layout() {
  return (
    <div className='app'>
      <Navigation />
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
}