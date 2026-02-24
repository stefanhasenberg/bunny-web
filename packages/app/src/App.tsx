import {LoadingSpinner, Text} from "@stefanhasenberg/bunny-ui/page";
import '@stefanhasenberg/bunny-ui/bunny-ui.css';
import useFetch from "./hooks/data/useFetch.ts";
import {type paths} from "@bunny-web/cms";
import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes
} from "react-router";
import PageLayout from "./cmp/layout/PageLayout.tsx";
import CmsContentPage from "./cmp/pages/CmsContentPage.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";
import CmsArticlePage from "./cmp/pages/CmsArticlePage.tsx";

type IPages = paths["/cms/{language}/pages"]["get"]["responses"]["200"]["content"]["application/json"];

function App() {

    const {data, loading, error} = useFetch<IPages>("/api/cms/de/pages");
  return (
      <RouterProvider router={createBrowserRouter(createRoutesFromElements(
          <Route path="/" element={<PageLayout />}>
              {!loading && !error && data?.map(page => <Route key={`${page?.relativeUrl}`} path={`${page?.relativeUrl}`} element={page["_id"] ? <CmsContentPage key={`cms_page_${page?.["_id"]}`} id={page["_id"]} language={page.language as ("de" | "en")} /> : <></>} />)}
              <Route path="/de">
                  <Route path="artikel/:articleId" element={<CmsArticlePage language="de" />} />
              </Route>
              <Route path="/en">
                  <Route path="article/:articleId" element={<CmsArticlePage language="en" />} />
              </Route>
              <Route path="*" element={<NotFound />} />
          </Route>
      ))
      } />
  )
}

export default App
