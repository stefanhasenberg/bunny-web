import { Helmet } from "react-helmet";
import {paths} from "@/types/bunnywebapi";
import {Collection, InfoBox, Text} from "@stefanhasenberg/bunny-ui/page";
import CmsGrid from "../grid/CmsGrid";
import CmsImage from "../image/CmsImage";

type ICMSArticlePage = paths["/cms/{language}/article/{seoName}"]["get"]["responses"]["200"]["content"]["application/json"];

type ICmsArticle = {
    content: ICMSArticlePage;
    headlineHierarchy: (1 | 2 | 3 | 4 | 5);
}

const CmsArticle : React.FC<ICmsArticle> = ({content, headlineHierarchy}) => {
    console.log(content)

    return <>
        <Helmet>
            <title>- stefanhasenberg.de</title>
            <meta name="description" content="Article - stefanhasenberg.de" />
            <link rel="alternate" lang="de" href="/de/" title="Artikel - stefanhasenberg.de - Deutsch" />
            <link rel="alternate" lang="en" href="/en/" title="Article - stefanhasenberg.de - English" />
        </Helmet>
        <article>
            <Collection marginBottom={"medium"}>
            <InfoBox text={content?.category} />
            <Text type={`h${headlineHierarchy}`} content={content?.headline} />
            <Text type={`h${headlineHierarchy + 1 as (2 | 3 | 4 | 5 | 6)}`} content={content?.subheadline} />
            <CmsImage {...content?.image} />
            <CmsGrid {...content?.content} />
            <Text type={"small"} content={content?.author} />
            </Collection>
        </article>
    </>
}

export default CmsArticle;