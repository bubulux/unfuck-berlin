import { useLocation, useParams, Link as RouterLink } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import {
  CandidateDetail,
  type CandidateBlock,
} from "../../components/organisms/candidate-detail";
import { Button } from "../../components/atoms/button";
import { Text } from "../../components/atoms/text";
import { KANDIDATEN } from "../../data/kandidaten";

export function KandidatDetail() {
  const { pathname } = useLocation();
  const { slug } = useParams();
  const kandidat = KANDIDATEN.find((k) => k.slug === slug);

  if (!kandidat) {
    return (
      <PageLayout activePath={pathname} variant="light">
        <section className="candidate candidate--light">
          <div
            className="candidate__inner"
            style={{ alignItems: "center", textAlign: "center", gap: "var(--space-5)" }}
          >
            <Text as="h1" variant="subtitel" color="purple">
              Kandidat*in nicht gefunden
            </Text>
            <Button as={RouterLink} to="/kandidierende" color="neon">
              Zur Landesliste
            </Button>
          </div>
        </section>
      </PageLayout>
    );
  }

  const facts = [`Listenplatz: ${kandidat.listenplatz}`];
  if (kandidat.alter) facts.push(`Alter: ${kandidat.alter}`);
  if (kandidat.bezirk) facts.push(`Bezirk: ${kandidat.bezirk}`);
  if (kandidat.wahlkreis) facts.push(kandidat.wahlkreis);
  const meta = ["Kandidat*in der Landesliste Volt Berlin", facts.join(" | ")];

  const blocks: CandidateBlock[] = [];
  if (kandidat.herzensthema)
    blocks.push({ heading: "Herzensthema", body: kandidat.herzensthema });
  if (kandidat.ueberMich)
    blocks.push({ heading: "Über mich", body: kandidat.ueberMich });

  const socials = kandidat.socials

  return (
    <PageLayout activePath={pathname} variant="light">
      <CandidateDetail
        variant="light"
        name={kandidat.name}

        image={kandidat.imageDetail || kandidat.image}
        imageAlt={kandidat.name}
        foto_originalFilename={kandidat.foto_originalFilename}

        image_2={kandidat.imageDetail_2}
        imageAlt_2={kandidat.name}
        foto_originalFilename_2={kandidat.foto_originalFilename_2}
        
        meta={meta}
        blocks={blocks}
        socials={socials}
      />
    </PageLayout>
  );
}

export default KandidatDetail;
