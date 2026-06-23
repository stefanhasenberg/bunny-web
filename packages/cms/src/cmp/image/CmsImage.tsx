import React, {useContext, useEffect, useState} from 'react';
import {components} from "../../types/bunnywebapi";
import {CmsContext} from "../../context/CmsContextProvider";
import {Placeholder} from "@stefanhasenberg/bunny-ui/page";
import {SanityImageObject, SanityImageSource} from "@sanity/image-url";

type IImage = components["schemas"]["Image"];

type IImageRef = {
    asset: { _ref: string };
};

const CmsImage : React.FC<Record<string, never>> = (imageRef) => {
    const {getImage} = useContext(CmsContext);
    const [image, setImage] = useState(undefined as IImage | undefined);

    console.log("image ref", imageRef);
    useEffect(() => {
        if(imageRef) {
            console.log("image ref effect", imageRef);
            getImage?.("Image", imageRef).then(img => setImage(img));
        }
    }, [imageRef]);

    return <>
        {(image) && <picture>
            {image?.sourceItems?.map(sourceItem => <source media={sourceItem.media} srcSet={sourceItem.srcSet}/>)}
            <img width={'100%'} src={image?.src} alt={image?.name}/>
        </picture>}
        {!(image) && <Placeholder ratio={"widescreen"} /> }
    </>
}

export default CmsImage;