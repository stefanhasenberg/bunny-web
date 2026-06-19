import {
    Route, Routes,
} from "react-router";
import CmsContentPage from "./cmp/pages/CmsContentPage.tsx";
import CmsArticlePage from "./cmp/pages/CmsArticlePage.tsx";
import {useTranslation} from "react-i18next";
import useFetch from "./hooks/data/useFetch.ts";
import type {paths} from "@bunny-web/cms";
import PageLayout from "./cmp/layout/PageLayout.tsx";
import NotFound from "./cmp/pages/NotFound.tsx";

type IPages = paths["/cms/{language}/pages"]["get"]["responses"]["200"]["content"]["application/json"];

const AppRoutes: React.FC = () => {
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

    console.log("Router", !loading && !error && newsPage)
    return <Routes>
        <Route path="/" element={<PageLayout/>}>
        {!loading && !error && newsPage && <Route key={`root`} path={"/"}
                                                  element={<CmsContentPage key={`cms_page_root`}
                                                                           id={newsPage._id}
                                                                           language={newsPage.language as ("de" | "en")}/>}/>}

        {!loading && !error && newsPageDE && <Route key={`root_de`} path={"/de"}
                                                    element={<CmsContentPage key={`cms_page_root_de`}
                                                                             id={newsPageDE._id}
                                                                             language={newsPageDE.language as ("de" | "en")}/>}/>}
        {!loading && !error && newsPageEN && <Route key={`root_en`} path={"/en"}
                                                    element={<CmsContentPage key={`cms_page_root_en`}
                                                                             id={newsPageEN._id}
                                                                             language={newsPageEN.language as ("de" | "en")}/>}/>}

        {!loading && !error && data?.map(page => <Route key={`${page?.relativeUrl}`}
                                                        path={`${page?.relativeUrl}`} element={page["_id"] ?
            <CmsContentPage key={`cms_page_${page?.["_id"]}`} id={page["_id"]}
                            language={page.language as ("de" | "en")}/> : <></>}/>)}

        <Route path="/de">
            <Route path="artikel/:articleId" element={<CmsArticlePage articleId={""} language="de"/>}/>
        </Route>
        <Route path="/en">
            <Route path="article/:articleId" element={<CmsArticlePage articleId={""} language="en"/>}/>
        </Route>
        <Route path="*" element={<NotFound/>}/>
    </Route>
    </Routes>
}

export default AppRoutes;