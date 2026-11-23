import { createFileRoute } from "@tanstack/react-router";
import { allPhones, site } from "@/config/site";
import { simpleHead } from "@/lib/heads";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/fr/mentions-legales")({
  head: () =>
    simpleHead({
      title: "Mentions légales",
      description:
        "Mentions légales du site de Novare Solutions Techniques, Marrakech : éditeur, hébergement, propriété intellectuelle et responsabilité.",
      path: "/fr/mentions-legales",
      label: "Mentions légales",
    }),
  component: Page,
});

function Page() {
  return (
    <LegalPage
      title="Mentions légales"
      path="/fr/mentions-legales"
      updated="1er novembre 2026"
      intro="Informations relatives à l'éditeur du site, à son hébergement et aux conditions d'utilisation de son contenu."
      sections={[
        {
          title: "Éditeur du site",
          content: (
            <>
              <p>
                Le site {site.domain.replace("https://", "")} est édité par{" "}
                <strong>{site.legalName}</strong>, entreprise de droit marocain spécialisée dans
                l'installation, la maintenance et l'optimisation des équipements techniques du
                bâtiment.
              </p>
              <ul>
                <li>
                  Siège : {site.address.full}, {site.country}
                </li>
                <li>Téléphone : {allPhones.map((p) => p.display).join(" · ")}</li>
                <li>
                  Email : <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              </ul>
              <p>Le directeur de la publication est le représentant légal de la société.</p>
            </>
          ),
        },
        {
          title: "Hébergement",
          content: (
            <p>
              Le site est hébergé sur une infrastructure cloud professionnelle assurant la
              disponibilité et la sécurité des données. Les coordonnées de l'hébergeur peuvent être
              obtenues sur simple demande adressée à {site.email}.
            </p>
          ),
        },
        {
          title: "Propriété intellectuelle",
          content: (
            <>
              <p>
                L'ensemble des éléments composant ce site (textes, visuels, illustrations, logo,
                charte graphique, structure) est la propriété exclusive de {site.legalName} ou fait
                l'objet d'une autorisation d'utilisation. Toute reproduction, représentation,
                modification ou adaptation, totale ou partielle, sans autorisation écrite préalable
                est interdite, conformément à la loi n° 2-00 relative aux droits d'auteur et droits
                voisins.
              </p>
              <p>
                Les noms des établissements cités en références appartiennent à leurs titulaires
                respectifs et sont mentionnés à titre informatif, pour présenter les interventions
                réalisées.
              </p>
            </>
          ),
        },
        {
          title: "Responsabilité",
          content: (
            <>
              <p>
                {site.legalName} s'efforce de fournir des informations exactes et à jour. Les
                contenus publiés, notamment les articles de conseil, ont une vocation informative et
                ne remplacent pas un diagnostic réalisé sur site par un professionnel qualifié.
              </p>
              <p>
                La société ne saurait être tenue responsable des dommages directs ou indirects
                résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
              </p>
            </>
          ),
        },
        {
          title: "Liens externes",
          content: (
            <p>
              Le site peut contenir des liens vers des services tiers (WhatsApp, Google Maps,
              réseaux sociaux). {site.legalName} n'exerce aucun contrôle sur ces services et décline
              toute responsabilité quant à leur contenu ou à leurs pratiques en matière de données.
            </p>
          ),
        },
        {
          title: "Données personnelles",
          content: (
            <p>
              Le traitement des données personnelles collectées via le site est décrit dans notre{" "}
              <a href="/fr/politique-de-confidentialite">politique de confidentialité</a>,
              conformément à la loi n° 09-08 relative à la protection des personnes physiques à
              l'égard du traitement des données à caractère personnel.
            </p>
          ),
        },
        {
          title: "Droit applicable",
          content: (
            <p>
              Les présentes mentions légales sont régies par le droit marocain. Tout litige relatif
              à l'utilisation du site relève de la compétence des juridictions de Marrakech.
            </p>
          ),
        },
      ]}
    />
  );
}
