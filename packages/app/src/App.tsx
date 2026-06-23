import '@stefanhasenberg/bunny-ui/bunny-ui.css';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from "react-router";
import './i18n';
import PageLayout from "./cmp/layout/PageLayout.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";
import CmsMainPage from "./cmp/pages/CmsMainPage.tsx";
import {CmsContextProvider, type paths} from "@bunny-web/cms";
import {useTranslation} from "react-i18next";

type IImage = paths["/cms/{language}/image/{name}"]["post"]["responses"]["200"]["content"]["application/json"];
//type IContent = paths["/cms/{language}/content/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

function App() {
    const {t, i18n} = useTranslation("common");
    const fetchImage = async (name: string, imgSrc: Record<string, never>) => {
        console.log("Fetching image", {name, imgSrc});
        try {
            const controller = new AbortController();
            const res = await fetch(`${t('api.cms.image', {language: i18n?.language, imageName: name})}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(imgSrc),
                signal: controller.signal,
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            return await res.json() as IImage;
        } catch (err:any) {
            if (err.name !== "AbortError") {
                return undefined;
            }
        }
    }

  return (
      <CmsContextProvider getImage={async (name, imgSrc) => {
          console.log("TODO: Fetch image", name);
          return fetchImage(name, imgSrc);
      }} getContent={async () => {
          console.log("TODO: Fetch content");
          return undefined;
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
