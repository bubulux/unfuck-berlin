import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
// import { Text } from "../../components/atoms/text";
// import { WAHLSYSTEM } from "../../data/wahlsystem";
import { NEWS_CMS } from "../../data/news.generated";

  console.log('NEWS_CMS', NEWS_CMS)

export function NewsPage() {
  const { pathname } = useLocation();
  // const { heading, first, second, mit16 } = WAHLSYSTEM;
  console.log('NEWS_CMS', NEWS_CMS)

  return (
    <PageLayout activePath={pathname} variant="purple">
      <pre>{JSON.stringify(NEWS_CMS, null, 2)}</pre>
    </PageLayout>
  );
}
