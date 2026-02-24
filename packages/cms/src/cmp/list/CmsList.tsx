import React from 'react';
import {List} from "@stefanhasenberg/bunny-ui/page";
import {components} from "../../types/bunnywebapi";

type IList = components["schemas"]["List"];

const CmsList = ({listItems} : IList) : React.JSX.Element => {
    return <List items={listItems} />
}

export default CmsList;