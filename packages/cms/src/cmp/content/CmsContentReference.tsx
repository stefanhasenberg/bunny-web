import React, {useContext, useEffect, useState} from "react";
import CmsContent from "./CmsContent";
import {paths} from "../../types/bunnywebapi";
import {CmsContext} from "../../context/CmsContextProvider";

type IGenericContent = paths["/cms/{language}/content/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

type IContentRef = {
    docId: string
};

const CmsContentReference : React.FC<IContentRef> = ({ docId}) => {
    console.log(useState);
    const [data, setData] = useState(undefined as IGenericContent | undefined);
    const {getContent} = useContext(CmsContext);

    useEffect(() => {
        getContent?.(docId).then(content => setData(content));
    }, []);

    return <>{data?.map((d, i) => <CmsContent key={`content_${i}_${docId}`} {...d} />)}</>
}

export default CmsContentReference;