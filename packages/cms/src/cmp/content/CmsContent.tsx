import React, {lazy} from "react";
const CmsArticle = lazy(() => import('../article/CmsArticle'));
const CmsPage = lazy(() => import('../page/CmsPage'));
const CmsGrid = lazy(() => import('../grid/CmsGrid'));
// import CmsArticle from "./CmsArticle";
// import CmsFunctionalComponent from "./CmsFunctionalComponent";
// import CmsTextContent from "./CmsTextContent";
// import CmsInfoTile from "./CmsInfoTile";
// import CmsArticleTeaserListByYear from "./CmsArticleTeaserListByYear";

const CmsContent : React.FC<any> = (props) => {
    const type = props["_type"];
    return <>
        {type === "page" && <CmsPage {...props} />}
        {type === "grid" && <CmsGrid {...props} />}
        {type === "article" && <CmsArticle {...props} />}
        {/*{type === "functionalcomponent" && <CmsFunctionalComponent {...props} />}*/}
        {/*{type === "textcontent" && <CmsTextContent {...props} />}*/}
        {/*{type === "infotile" && <CmsInfoTile {...props} />}*/}
        {/*{type === "articleteaserlist" && <CmsArticleTeaserListByYear {...props} />}*/}
    </>
}

export default CmsContent;