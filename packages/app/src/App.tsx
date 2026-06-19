import '@stefanhasenberg/bunny-ui/bunny-ui.css';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from "react-router";
import './i18n';
import PageLayout from "./cmp/layout/PageLayout.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";
import CmsMainPage from "./cmp/pages/CmsMainPage.tsx";
import {CmsContextProvider, type paths} from "@bunny-web/cms";

type IImage = paths["/cms/{language}/image/{name}"]["get"]["responses"]["200"]["content"]["application/json"];
type IContent = paths["/cms/{language}/content/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function App() {


  return (
      <CmsContextProvider getImage={async (name) => {
          console.log("TODO: Fetch image", name);
          return {} as IImage;
      }} getContent={async () => {
          console.log("TODO: Fetch content");
          return {} as IContent;
      }}>
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
    </CmsContextProvider>
  )
}

export default App
