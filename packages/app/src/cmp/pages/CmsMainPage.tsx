import {useTranslation} from "react-i18next";
import useFetch from "../../hooks/data/useFetch.ts";
import type {paths} from "@bunny-web/cms";
import {useLocation, useParams} from "react-router";
import CmsContentPage from "./CmsContentPage.tsx";
import NotFound from "./NotFound.tsx";
import {LoadingSpinner} from "@stefanhasenberg/bunny-ui/page";
import CmsArticlePage from "./CmsArticlePage.tsx";

type IPages = paths["/cms/{language}/pages"]["get"]["responses"]["200"]["content"]["application/json"];

const CmsMainPage : React.FC = () => {
    const {t, i18n} = useTranslation("common");
    const location = useLocation();
    const params = useParams();

    const getCurrentLocation = (locationPath?: string) => {
        let currentLocation = locationPath ?? "/";

        if ((currentLocation?.length ?? 0) > 1 && currentLocation?.endsWith("/")) {
            currentLocation = currentLocation.substring(0, currentLocation.length - 1);
        }

        if (!currentLocation || currentLocation === "/") {
            if (i18n?.language === "de") {
                currentLocation = "/de/neuigkeiten";
            } else {
                currentLocation = "/en/news"
            }
        } else if (currentLocation === "/en") {
            currentLocation = "/en/news";
        } else if (currentLocation === "/de") {
            currentLocation = "/de/neuigkeiten";
        }

        return currentLocation;
    }

    const currentLocation = getCurrentLocation(location?.pathname);

    console.log("Current loc", {currentLocation, location});
    const [pages, loadingPages, errorPages] = useFetch<IPages>(t("api.cms.pages", {"language": i18n.language}));
    console.log("Pages", pages?.map(p => p.relativeUrl))

    const matchPath = (relativeUrl: string, currentLocation?: string) => {
        const pathSegments = relativeUrl.split("/");
        for(let i = 0; i < pathSegments.length; i++) {
            let segment = pathSegments[i];
            if(segment?.startsWith(":")) {
                segment = "segment" + i;
            }
            pathSegments[i] = segment;
        }
        const mappedUrl = pathSegments.join("/");
        console.log("mapped url", mappedUrl);
        return mappedUrl === currentLocation
    }
    const currrentPage = pages?.find(page => matchPath(page.relativeUrl, currentLocation));
    return loadingPages ?
        <LoadingSpinner />
        : (params?.segment1 === "artikel" || params?.segment1 === "article") ?
            (<CmsArticlePage articleSeoName={params?.segment2??''} language={i18n?.language as ("de" | "en")} />)
            : currrentPage && !errorPages ? <CmsContentPage id={currrentPage?._id} language={currrentPage?.language as ("de" | "en")} /> : <NotFound />;
}


export default CmsMainPage;