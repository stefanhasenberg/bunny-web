import useFetch from "../../hooks/data/useFetch.ts";
import {CmsContent, type paths} from "@bunny-web/cms";
import {useTranslation} from "react-i18next";
import {LoadingSpinner} from "@stefanhasenberg/bunny-ui/page";

type CmsContentPageParams = {
    id: string,
    language: ("de" | "en")
}

type IPage = paths["/cms/{language}/page/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

const CmsContentPage = ({id, language}: CmsContentPageParams) : React.JSX.Element => {
    const {t, i18n} = useTranslation("common");
    const [data, loading, error] = useFetch<IPage>(t("api.cms.page", {"language": language, "id": id}));
    console.log("Page", data)
    return <>
        {!loading && error}
        {loading ? <LoadingSpinner /> : data?._translations?.filter(trans => trans.language === i18n?.language).map(t => <CmsContent key={t?.content} {...t.content} />)}

    </>
}

export default CmsContentPage;