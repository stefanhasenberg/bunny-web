import {Link} from "react-router";
import {Collection, Section} from "@stefanhasenberg/bunny-ui/page";
import {useTranslation} from "react-i18next";
import {CmsArticle, type paths} from "@bunny-web/cms";
import useFetch from "../../hooks/data/useFetch.ts";

type CmsArticlePageParams = {
    articleSeoName: string,
    language: ("de" | "en")
};

type ICmsArticleContent = paths["/cms/{language}/article/{seoName}"]["get"]["responses"]["200"]["content"]["application/json"];

const CmsArticlePage = ({language, articleSeoName}: CmsArticlePageParams): React.JSX.Element => {
    const {t, i18n} = useTranslation("common");
    const [data, loading, error] = useFetch<ICmsArticleContent[]>(t("api.cms.article", {"language": language, "seoName": articleSeoName}))

    console.log("cmsContent", data)
    return <>
        <Section>
            <Collection paddingBottom="medium">
                {!loading && data && !error && <CmsArticle key={`${data}`} content={data?.[0]} headlineHierarchy={1} />}
            </Collection>
            <Collection paddingBottom="medium">
                <Link to={`/${i18n?.language}`} >Back</Link>
            </Collection>
        </Section>
    </>
}

export default CmsArticlePage;