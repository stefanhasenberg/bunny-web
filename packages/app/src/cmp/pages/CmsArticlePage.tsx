type CmsArticlePageParams = {
    language: ("de" | "en")
};

const CmsArticlePage = ({language}: CmsArticlePageParams): React.JSX.Element => {
    return <>
        CMS Article
        {language}
    </>
}

export default CmsArticlePage;