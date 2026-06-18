import {LoadingSpinner, PageStyle} from "@stefanhasenberg/bunny-ui/page";

const LoadingPage = () : React.JSX.Element => {
    return <PageStyle theme={"nazgul"}>
        <LoadingSpinner />
    </PageStyle>
}

export default LoadingPage;