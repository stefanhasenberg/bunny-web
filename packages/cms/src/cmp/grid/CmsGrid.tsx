import React from "react";
import CmsContentReference from "../content/CmsContentReference";
import { PortableText } from "@portabletext/react";
import CmsImage from "../image/CmsImage";
import CmsList from "../list/CmsList";
import {components} from "../../types/bunnywebapi";
import {Grid} from "@stefanhasenberg/bunny-ui/page";

type IGrid = components["schemas"]["Grid"];

const CmsGrid : React.FC<IGrid> = ({rows}) => {
    const MAX_CELLS_XL = 12;
    const MAX_CELLS_LG = 12;
    const MAX_CELLS_MD = 6;
    const MAX_CELLS_SM = 3;
    const MAX_CELLS_XS = 1;

    const getCellCount = (maxCells: number, cellsOfRow: number) => {
        const cellWidth = Math.floor(12 / cellsOfRow);
        return cellsOfRow <= maxCells ? cellWidth : Math.floor(12/ maxCells);
    }

    const getMarginForCell = (margin?: ("none" | "small" | "medium" | "large")) => {
        if(!margin) {
            return '0';
        }
        switch(margin) {
            case "small":
                return '0.5em';
            case "medium":
                return '1em';
            case "large":
                return '1.5em';
            default:
                return '0';
        }
    }
    
    return <>
        {rows?.map((row, i) => <Grid key={`grid_row_${i}`}>
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