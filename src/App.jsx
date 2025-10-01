import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubmissionPage from "./pages/SubmissionPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/submission",
      element: <SubmissionPage />,
    },
  ]);
  return (
    <main className="justify-items-center bg-[#ffebd3]">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
