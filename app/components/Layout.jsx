import {Navbar} from './Navbar';

export function Layout({children, title}) {
  return (
    <div className="flex flex-col min-h-screen antialiased bg-neutral-50">
      <Navbar title={title} />

      <main
        role="main"
        id="mainContent"
        className="flex-grow p-6 md:p-8 lg:p-12"
      >
        {children}
      </main>
    </div>
  );
}
