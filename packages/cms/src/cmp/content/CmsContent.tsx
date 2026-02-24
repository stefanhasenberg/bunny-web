import React from "react";
import CmsPage from "../page/CmsPage";
import CmsGrid from "../grid/CmsGrid";
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
        {/*{type === "article" && <CmsArticle {...props} />}*/}
        {/*{type === "functionalcomponent" && <CmsFunctionalComponent {...props} />}*/}
        {/*{type === "textcontent" && <CmsTextContent {...props} />}*/}
        {/*{type === "infotile" && <CmsInfoTile {...props} />}*/}
        {/*{type === "articleteaserlist" && <CmsArticleTeaserListByYear {...props} />}*/}
    </>
}

export default CmsContent;