import React, {useContext, useEffect, useState} from 'react';
import {components} from "../../types/bunnywebapi";
import {CmsContext} from "../../context/CmsContextProvider";

type IImage = components["schemas"]["Image"];

type IImageRef = {
    name: string;
};

const CmsImage : React.FC<IImageRef> = (imageRef) => {
    const {getImage} = useContext(CmsContext);
    const [image, setImage] = useState(undefined as IImage | undefined);

    useEffect(() => {
        getImage?.(imageRef.name).then(img => setImage(img));
    }, []);

    return <>
        {image && <picture>
            {image?.sourceItems?.map(sourceItem => <source media={sourceItem.media} srcSet={sourceItem.srcSet}/>)}
            <img width={'100%'} src={image?.src} alt={image?.name}/>
        </picture>}
    </>
}

export default CmsImage;