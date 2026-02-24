type CmsContentPageParams = {
    id: string,
    language: ("de" | "en")
}

const CmsContentPage = ({id, language}: CmsContentPageParams) : React.JSX.Element => {
    return <>
        CMS Content
        {id}
        {language}
    </>
}

export default CmsContentPage;