import {PageStyle} from "@stefanhasenberg/bunny-ui/page";
import {Outlet} from "react-router";

const PageLayout = () : React.JSX.Element => {
    return <PageStyle theme={"nazgul"}>
        <Outlet />
    </PageStyle>
}

export default PageLayout;