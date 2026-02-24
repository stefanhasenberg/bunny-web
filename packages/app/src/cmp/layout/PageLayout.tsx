import {PageStyle} from "@stefanhasenberg/bunny-ui/page";
import {Outlet, useLocation} from "react-router";

const PageLayout = () : React.JSX.Element => {
    const loc = useLocation();
    console.log("Loc", loc)
    return <PageStyle theme={"nazgul"}>
        <Outlet />
    </PageStyle>
}

export default PageLayout;