import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { HighlightText } from "../../atoms/highlight-text";
import { CandidateCluster } from "../../molecules/candidate-cluster";
import "./styles.css";
import SpitzenduoComposite from "../spitzenduo-composite";

function ElectionProgramCard(){
  return <div className="candidates__grid">
    <HighlightText
            as="h2"
            lines={["Wahlprogramm"]}
            variant="titel"
            color="white"
            textColor="purple"
            align="left"
            uppercase
            className="candidates__heading"
          />

          <Text as="p" variant="body" color="white" className="candidates__text">
            Volt Berlin ist die neue sozial-liberale Mitte. Mit unserem Wahlprogramm legen wir einen konkreten Plan vor, wie diese Stadt wieder funktioniert: pragmatisch, evidenzbasiert und europäisch.
          </Text>

          <Link
            href="/wahlprogramm"
            color="white"
            className="candidates__cta"
            {...{'data-umami-event': 'wahlprogram-teaser-cta-click'}}
          >
            Wahlprogramm lesen
            <span className="candidates__arrow" aria-hidden="true">
              {" "}
              →
            </span>
          </Link>

          <a href="/wahlprogramm" className="candidates__cluster" {...{'data-umami-event': 'wahlprogram-teaser-image-click'}}>
            <img className="electionProgramFirstPageImg" src="/wahlprogramm-page-one.jpg" style={{ width: '100%', height: 'auto' }} />
            <div className="electionProgramFirstPage" />
          </a>
  </div>
}

export function CandidatesCard() {
  return (
        <div className="candidates__grid">
          <HighlightText
            as="h2"
            lines={["Unsere", "Kandidierenden"]}
            variant="titel"
            color="white"
            textColor="purple"
            align="left"
            uppercase
            className="candidates__heading"
          />

          <Text as="p" variant="body" color="white" className="candidates__text">
            Unsere Kandidierenden kommen nicht aus der Politik. Sie sind Macher:innen aus der Praxis.
          </Text>

          <Link
            href="/kandidierende"
            color="white"
            className="candidates__cta"
            {...{'data-umami-event': 'candidate-teaser-cta-click'}}
          >
            Unsere Kandidierenden stellen sich vor
            <span className="candidates__arrow" aria-hidden="true">
              {" "}
              →
            </span>
          </Link>

          <div className="candidates__cluster">
            <CandidateCluster  />
          </div>
        </div>
  );
}

export function CandidatesAndElectionProgamSection() {
  return (
    <section className="candidates">
      <div className="candidates__inner">
        <ElectionProgramCard />
        <CandidatesCard />
      </div>
      <SpitzenduoComposite className="candidates__inner" />
    </section>
  );
}

export default CandidatesAndElectionProgamSection;
