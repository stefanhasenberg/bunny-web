import React from "react";
import {Helmet} from "react-helmet";
import CmsGrid from "../grid/CmsGrid";
import {paths} from "../../types/bunnywebapi";

type ICMSPage = paths["/cms/{language}/page/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

type IPage = {
    page: ICMSPage;
    language: ("de" | "en")
};

const CmsPage : React.FC<IPage> = ({page, language}) => {
    const {pageTitle, pageDescription, content, robots} = page._translations?.find(p => p.language === language)??{};
    return <>
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="robots" content={robots} />
            {page._translations?.filter(fp => fp?.language !== language).map(page => <link rel="alternate" hrefLang={page?.language} href={page?.relativeUrl} title={page?.pageTitle} />)}
        </Helmet>
        {content && <CmsGrid {...content} />}
    </>
}

export default CmsPage;