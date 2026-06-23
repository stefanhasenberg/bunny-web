import React from "react";
import CmsContentReference from "../content/CmsContentReference";
import { PortableText } from "@portabletext/react";
import CmsImage from "../image/CmsImage";
import CmsList from "../list/CmsList";
import {components} from "../../types/bunnywebapi";
import {Grid} from "@stefanhasenberg/bunny-ui/page";

type IGrid = components["schemas"]["Grid"];

const CmsGrid : React.FC<IGrid> = ({rows}) => {
    return <>
        {rows?.map((row, i) => <Grid key={`grid_row_${i}`} gridType={'one-one'} gridGap={"medium"}>
            {row?.cells?.map((cell, c) => <div
                key={`grid_cell_${i}_${c}_${cell.contentType}`}
                >
                    <div>
                {cell?.contentType === "richtext" && cell?.content && cell?.content?.map((c, ci) => <PortableText key={`richtext_${ci}`} value={c as any} />)}
                {cell?.contentType === "image" && <CmsImage {...cell?.image} />}
                {cell?.contentType === "list" && <CmsList {...cell?.list} />}
                {cell?.contentType === "contentRef" && cell?.contentRef && <CmsContentReference {...cell?.contentRef} />}
                    </div>
                </div>)}
        </Grid>)}
    </>
}

export default CmsGrid;