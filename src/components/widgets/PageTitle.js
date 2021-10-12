import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { TITLE_SEPARATOR, URL_BASE } from "../../utils/c";


export default function PageTitle({link, title, description, image, type, updatedTime}) {
    const { t } = useTranslation("common")

    return (
        <Head>
            <meta property="og:site_name" content={t('common:sitename')} />
            {
                updatedTime?
                <meta property="og:updated_time" content={updatedTime} /> : null
            }
            {
                link? 
                <>
                    <link rel="canonical" href={URL_BASE + link} />
                    <meta property="og:url" content={URL_BASE + link} />
                </> : null
            }
            {
                title? 
                <>
                    <title>{t("sitename")}{TITLE_SEPARATOR}{title}</title>
                    <meta property="og:title" content={`${t("sitename")}${TITLE_SEPARATOR}${title}`} />
                </> : null
            }
            {
                description? 
                <>
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                </> : null
            }
            {
                image? 
                <>
                    <meta property="og:image" itemprop="image" content={image} />
                </> : null
            }
            {
                type? 
                <>
                    <meta property="og:type" content={type} />
                </> : null
            }
        </Head>
    )
    
}