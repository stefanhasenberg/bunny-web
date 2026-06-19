import {useParams} from "react-router";

type CmsArticlePageParams = {
    language: ("de" | "en")
};

const CmsArticlePage = ({language}: CmsArticlePageParams): React.JSX.Element => {
    const params = useParams();
    return <>
        CMS Article
        {language}
        ID: {params?.segment2}
    </>
}

export default CmsArticlePage;