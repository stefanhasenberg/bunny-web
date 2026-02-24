import {createContext, ReactNode} from "react";
import {components} from "../types/bunnywebapi";

export type CmsContextType = {
    getImage?: (name: string) => Promise<IImage>,
    getContent?: (docRef: string) => Promise<Record<string, never>[]>
};

export const CmsContext = createContext<CmsContextType>({});

type IImage = components["schemas"]["Image"];

type CmsContextProviderParams = {
    children?: ReactNode,
    getImage: (name: string) => Promise<IImage>,
    getContent: (docRef: string) => Promise<Record<string, never>[]>
};

const CmsContextProvider = ({
    children,
    getImage,
    getContent
}: CmsContextProviderParams) : React.JSX.Element => {
    return <CmsContext.Provider value={{getImage, getContent}}>{children}</CmsContext.Provider>
}

export default CmsContextProvider;