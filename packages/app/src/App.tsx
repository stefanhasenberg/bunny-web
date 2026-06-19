import '@stefanhasenberg/bunny-ui/bunny-ui.css';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from "react-router";
import './i18n';
import PageLayout from "./cmp/layout/PageLayout.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";
import CmsMainPage from "./cmp/pages/CmsMainPage.tsx";

function App() {
  return (
      <RouterProvider router={createBrowserRouter(
          createRoutesFromElements(
              <Route path="/" element={<PageLayout/>}>
                  <Route
                      path={"/:lang?/:segment1?/:segment2?/:segment3?/:segment4?/:segment5?/:segment6?/:segment7?/:segment8?/:segment9?"}
                      element={<CmsMainPage />} />
                  <Route path="*" element={<NotFound/>}/>
              </Route>
          )
      )} />
  )
}

export default App
