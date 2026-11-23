import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/config/site";
import { simpleHead } from "@/lib/heads";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/fr/politique-de-confidentialite")({
  head: () =>
    simpleHead({
      title: "Politique de confidentialité",
      description:
        "Comment Novare Solutions Techniques collecte, utilise et protège vos données personnelles, conformément à la loi 09-08 et aux recommandations de la CNDP.",
      path: "/fr/politique-de-confidentialite",
      label: "Politique de confidentialité",
    }),
  component: Page,
});

function Page() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      path="/fr/politique-de-confidentialite"
      updated="1er novembre 2026"
      intro="La protection de vos données personnelles est une priorité. Cette politique explique quelles données nous traitons, pourquoi, et quels sont vos droits."
      sections={[
        {
          title: "Responsable du traitement",
          content: (
            <p>
              Le responsable du traitement est <strong>{site.legalName}</strong>,{" "}
              {site.address.full}, {site.country}. Pour toute question relative à vos données :{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          ),
        },
        {
          title: "Cadre légal",
          content: (
            <p>
              Les traitements sont réalisés conformément à la loi n° 09-08 du 18 février 2009
              relative à la protection des personnes physiques à l'égard du traitement des données à
              caractère personnel, et aux délibérations de la Commission Nationale de contrôle de la
              protection des Données à caractère Personnel (CNDP).
            </p>
          ),
        },
        {
          title: "Données collectées",
          content: (
            <>
              <p>
                Nous collectons uniquement les données que vous nous transmettez volontairement via
                nos formulaires, l'assistant du site, WhatsApp, l'email ou le téléphone :
              </p>
              <ul>
                <li>Identité : nom, société le cas échéant.</li>
                <li>Coordonnées : téléphone, adresse email, ville.</li>
                <li>
                  Informations sur votre demande : métier concerné, type d'établissement,
                  description du besoin.
                </li>
                <li>Pour les candidatures : parcours, expérience et CV.</li>
              </ul>
              <p>
                Les formulaires du site ne stockent aucune donnée sur nos serveurs : ils préparent
                un message que vous envoyez vous-même via WhatsApp ou votre messagerie.
              </p>
            </>
          ),
        },
        {
          title: "Finalités",
          content: (
            <ul>
              <li>Répondre à vos demandes de devis, d'information ou d'intervention.</li>
              <li>
                Organiser et assurer le suivi des interventions et des contrats de maintenance.
              </li>
              <li>Traiter les candidatures reçues.</li>
            </ul>
          ),
        },
        {
          title: "Destinataires",
          content: (
            <p>
              Vos données sont destinées exclusivement aux équipes de {site.legalName} habilitées à
              traiter votre demande. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à
              des fins commerciales.
            </p>
          ),
        },
        {
          title: "Durée de conservation",
          content: (
            <p>
              Les données liées à une demande de devis sont conservées pendant la durée nécessaire à
              son traitement puis, en l'absence de suite, pendant trois ans au maximum. Les données
              clients sont conservées pendant la durée de la relation contractuelle augmentée des
              délais légaux. Les candidatures non retenues sont conservées deux ans au maximum, sauf
              opposition de votre part.
            </p>
          ),
        },
        {
          title: "Vos droits",
          content: (
            <>
              <p>
                Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification et
                d'opposition, pour des motifs légitimes, au traitement de vos données. Pour exercer
                ces droits, écrivez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> ou à
                notre adresse postale, en précisant votre demande.
              </p>
              <p>Vous pouvez également adresser une réclamation à la CNDP (www.cndp.ma).</p>
            </>
          ),
        },
        {
          title: "Cookies et stockage local",
          content: (
            <p>
              Le site n'utilise pas de cookies publicitaires. L'assistant Novare peut conserver la
              conversation en cours dans le stockage de session de votre navigateur, effacé à la
              fermeture de l'onglet. La carte d'accès est fournie par Google Maps, soumis à sa
              propre politique de confidentialité.
            </p>
          ),
        },
        {
          title: "Sécurité",
          content: (
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour
              protéger vos données contre tout accès non autorisé, perte ou altération.
            </p>
          ),
        },
      ]}
    />
  );
}
