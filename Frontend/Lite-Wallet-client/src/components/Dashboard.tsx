import { useState } from "react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">

              {/* Mobile sidebar toggle — uses useState instead of data-drawer-toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                type="button"
                className="sm:hidden bg-transparent border border-transparent hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm p-2 rounded-lg focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
                </svg>
              </button>

              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3" alt="FlowBite Logo" />
                <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                </button>

                <div className="z-50 hidden bg-white border border-gray-200 rounded-lg shadow-lg w-44" id="dropdown-user">
                  <div className="px-4 py-3 border-b border-gray-200" role="none">
                    <p className="text-sm font-medium text-gray-900" role="none">Neil Sims</p>
                    <p className="text-sm text-gray-500 truncate" role="none">neil.sims@flowbite.com</p>
                  </div>
                  <ul className="p-2 text-sm text-gray-700 font-medium" role="none">
                    <li>
                      <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded" role="menuitem">Earnings</a>
                    </li>
                    <li>
                      <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded" role="menuitem">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
          <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3" alt="Flowbite Logo" />
            <span className="self-center text-lg text-gray-900 font-semibold whitespace-nowrap">Flowbite</span>
          </a>

          <ul className="space-y-2 font-medium">
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span className="bg-gray-100 border border-gray-200 text-gray-800 text-xs font-medium px-1.5 py-0.5 rounded-sm">Pro</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-medium text-red-600 bg-red-100 border border-red-200 rounded-full">2</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-2 py-1.5 text-gray-700 rounded-lg hover:bg-gray-100 group">
                <svg className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="p-4 sm:ml-64 mt-14">
        <div className="p-4 border border-dashed border-gray-300 rounded-lg">

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded-lg bg-gray-100">
              <p className="text-gray-400">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded-lg bg-gray-100">
              <p className="text-gray-400">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded-lg bg-gray-100">
              <p className="text-gray-400">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center h-48 rounded-lg bg-gray-100 mb-4">
            <p className="text-gray-400">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
              </svg>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-center h-24 rounded-lg bg-gray-100">
                <p className="text-gray-400">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center h-48 rounded-lg bg-gray-100 mb-4">
            <p className="text-gray-400">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
              </svg>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-center h-24 rounded-lg bg-gray-100">
                <p className="text-gray-400">
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                  </svg>
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;