import '@stefanhasenberg/bunny-ui/bunny-ui.css';
import useFetch from "./hooks/data/useFetch.ts";
import {type paths} from "@bunny-web/cms";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router";
import PageLayout from "./cmp/layout/PageLayout.tsx";
import CmsContentPage from "./cmp/pages/CmsContentPage.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";
import CmsArticlePage from "./cmp/pages/CmsArticlePage.tsx";
import './i18n';
import {useTranslation} from "react-i18next";
import LoadingPage from "./cmp/pages/LoadingPage.tsx";

type IPages = paths["/cms/{language}/pages"]["get"]["responses"]["200"]["content"]["application/json"];

function App() {
    const {t, i18n} = useTranslation("common");
    const [dataDE, loadingDE, errorDE] = useFetch<IPages>(t("api.cms.pages", {"language": i18n.language}));
    const [dataEN, loadingEN, errorEN] = useFetch<IPages>(t("api.cms.pages", {"language": i18n.language}));
    const data  = [
        ...dataDE??[],
        ...dataEN??[]
    ];
    const loading = loadingDE || loadingEN;
    const error = errorDE??errorEN;
    const newsPage = data?.find(d => d.relativeUrl === t("router.path.default"));
    const newsPageDE = data?.find(d => d.relativeUrl === t("router.path.default.de"));
    const newsPageEN = data?.find(d => d.relativeUrl === t("router.path.default.en"));
  return (
      <>
          {loading ?  <LoadingPage /> : <RouterProvider router={createBrowserRouter(createRoutesFromElements(
              <Route path="/" element={<PageLayout/>}>
                  {!loading && !error && newsPage && <Route key={`index`} path={"/"}
                                                            element={<CmsContentPage key={`cms_page_index`}
                                                                                     id={newsPage._id}
                                                                                     language={newsPage.language as ("de" | "en")}/>}/>}

                  {!loading && !error && newsPageDE && <Route key={`index`} path={"/de"}
                                                              element={<CmsContentPage key={`cms_page_index`}
                                                                                       id={newsPageDE._id}
                                                                                       language={newsPageDE.language as ("de" | "en")}/>}/>}
                  {!loading && !error && newsPageEN && <Route key={`index`} path={"/en"}
                                                              element={<CmsContentPage key={`cms_page_index`}
                                                                                       id={newsPageEN._id}
                                                                                       language={newsPageEN.language as ("de" | "en")}/>}/>}

                  {!loading && !error && data?.map(page => <Route key={`${page?.relativeUrl}`}
                                                                  path={`${page?.relativeUrl}`} element={page["_id"] ?
                      <CmsContentPage key={`cms_page_${page?.["_id"]}`} id={page["_id"]}
                                      language={page.language as ("de" | "en")}/> : <></>}/>)}

                  <Route path="/de">
                      <Route path="artikel/:articleId" element={<CmsArticlePage language="de"/>}/>
                  </Route>
                  <Route path="/en">
                      <Route path="article/:articleId" element={<CmsArticlePage language="en"/>}/>
                  </Route>

                  <Route path="*" element={<NotFound/>}/>
              </Route>
          ))
          }/>}
      </>
  )
}

export default App
