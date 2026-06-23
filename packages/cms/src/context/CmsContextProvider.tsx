import {createContext, ReactNode} from "react";
import {components} from "../types/bunnywebapi";
import {SanityImageObject, SanityImageSource} from "@sanity/image-url";

export type CmsContextType = {
    getImage?: (name: string, imgSrc: Record<string, never>) => Promise<IImage | undefined>,
    getContent?: (docRef: string) => Promise<Record<string, never>[] | undefined>
};

export const CmsContext = createContext<CmsContextType>({});

type IImage = components["schemas"]["Image"];

type CmsContextProviderParams = {
    children?: ReactNode,
    getImage: (name: string, imgSrc: Record<string, never>) => Promise<IImage | undefined>,
    getContent: (docRef: string) => Promise<Record<string, never>[] | undefined>
};

const CmsContextProvider = ({
    children,
    getImage,
    getContent
}: CmsContextProviderParams) : React.JSX.Element => {
    return <CmsContext.Provider value={{getImage, getContent}}>{children}</CmsContext.Provider>
}

export default CmsContextProvider;