import type { Language } from "@/lib/i18n";

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalCopy = {
  common: {
    updated: string;
    controller: string;
    emailLabel: string;
    legalLabel: string;
    privacyLabel: string;
    cookiesLabel: string;
    settingsLabel: string;
    complaintLabel: string;
    complaintHref: string;
  };
  banner: {
    title: string;
    text: string;
    acknowledge: string;
  };
  privacy: {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    sections: LegalSection[];
  };
  cookies: {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    storageTitle: string;
    storageHeaders: [string, string, string, string, string, string];
    storageRow: [string, string, string, string, string, string];
    sections: LegalSection[];
  };
};

const legalCopy: Record<Language, LegalCopy> = {
  nl: {
    common: {
      updated: "Laatst bijgewerkt: 17 augustus 2026",
      controller: "Ludovic Paronetto",
      emailLabel: "E-mail",
      legalLabel: "Privacy",
      privacyLabel: "Privacyverklaring",
      cookiesLabel: "Cookiebeleid",
      settingsLabel: "Privacy-instellingen",
      complaintLabel: "Dien een klacht in bij de Gegevensbeschermingsautoriteit",
      complaintHref: "https://www.gegevensbeschermingsautoriteit.be/index.php/burger/acties/klacht-indienen",
    },
    banner: {
      title: "Privacy, zonder ruis.",
      text: "Deze site gebruikt geen analyse- of marketingcookies. Alleen noodzakelijke browseropslag onthoudt maximaal zes maanden dat je deze uitleg hebt gelezen.",
      acknowledge: "Begrepen",
    },
    privacy: {
      metadataTitle: "Privacyverklaring",
      metadataDescription: "Lees hoe Ludovic Paronetto persoonsgegevens verwerkt wanneer je deze website bezoekt, contact opneemt of een gesprek boekt.",
      eyebrow: "PRIVACYVERKLARING",
      title: "Duidelijk over wat er met je gegevens gebeurt.",
      intro: "Deze verklaring beschrijft welke persoonsgegevens via deze website en de daaraan gekoppelde contactkanalen kunnen worden verwerkt, waarom dat gebeurt en welke rechten je hebt.",
      sections: [
        {
          title: "Wie is verantwoordelijk?",
          paragraphs: [
            "Ludovic Paronetto is de verwerkingsverantwoordelijke voor de persoonsgegevens die in het kader van deze website en rechtstreekse professionele contacten worden verwerkt.",
            "Voor vragen of de uitoefening van je privacyrechten kun je contact opnemen via ludovic@lpcyberlaunchpad.com. Er is geen afzonderlijke functionaris voor gegevensbescherming aangesteld; privacyvragen worden rechtstreeks via dit adres behandeld.",
          ],
        },
        {
          title: "Welke gegevens kunnen worden verwerkt?",
          paragraphs: [
            "De website bevat geen gebruikersaccount, nieuwsbriefinschrijving of ingebouwde tracking. De projectbrief op de transformatiepagina werkt volledig lokaal in je browser: je invoer wordt niet door de website opgeslagen of verzonden. Alleen wanneer je de voorbereide e-mail zelf verstuurt of een externe boekingsdienst opent, worden de gegevens via die gekozen dienst verwerkt.",
          ],
          bullets: [
            "Websitebezoek: IP-adres, browser- en apparaatgegevens, opgevraagde pagina, datum en tijd en beperkte server- of beveiligingslogs.",
            "Rechtstreeks contact: je naam, e-mailadres, professionele context en de inhoud van je bericht.",
            "Boeking via Proton Calendar: de gegevens die je daar zelf invult, de gekozen datum en tijd en eventuele toelichting.",
            "Privacyvoorkeur: een lokale aanduiding dat je de cookiemelding hebt gelezen.",
          ],
        },
        {
          title: "Waarom en op welke rechtsgrond?",
          paragraphs: [
            "Technische gegevens worden verwerkt om de website te leveren, beveiligen en misbruik te voorkomen. Dit steunt op het gerechtvaardigde belang om een veilige en betrouwbare website aan te bieden.",
            "Contact- en boekingsgegevens worden gebruikt om je vraag te beantwoorden, een gesprek te organiseren en eventueel stappen te zetten vóór of tijdens een samenwerking. De rechtsgrond is, afhankelijk van de context, je verzoek om precontractuele maatregelen, de uitvoering van een overeenkomst, een wettelijke verplichting of het gerechtvaardigde belang om professioneel te communiceren.",
            "De website neemt geen uitsluitend geautomatiseerde beslissingen en stelt geen profielen van bezoekers op.",
          ],
        },
        {
          title: "Met wie kunnen gegevens worden gedeeld?",
          paragraphs: [
            "Alleen partijen die nodig zijn om de website en communicatie mogelijk te maken kunnen gegevens ontvangen, zoals de hosting- en IT-leverancier, e-mail- en agenda-aanbieders en professionele adviseurs wanneer dat noodzakelijk is. Gegevens worden niet verkocht.",
            "Gegevens kunnen ook worden verstrekt wanneer dit wettelijk verplicht is, noodzakelijk is voor de vaststelling of verdediging van rechtsvorderingen of nodig is om de veiligheid van personen of systemen te beschermen.",
          ],
        },
        {
          title: "Externe diensten en internationale doorgifte",
          paragraphs: [
            "Links naar Proton Calendar, LinkedIn, Standaard Boekhandel en LP Cyber Launchpad activeren geen cookies van die diensten zolang je er niet op klikt. Na het openen van zo’n externe website geldt het privacy- en cookiebeleid van die aanbieder.",
            "Sommige dienstverleners kunnen gegevens buiten de Europese Economische Ruimte verwerken. Waar Ludovic Paronetto zelf een dergelijke leverancier inschakelt, gebeurt dit alleen met een geldige doorgiftegrond en passende waarborgen volgens de AVG.",
          ],
        },
        {
          title: "Hoe lang worden gegevens bewaard?",
          paragraphs: [
            "Technische logs worden niet langer bewaard dan nodig voor werking en beveiliging, volgens de beperkte termijnen van de hostingomgeving. Gewone contact- en boekingscorrespondentie wordt in beginsel uiterlijk 24 maanden na het laatste inhoudelijke contact verwijderd, tenzij een samenwerking, geschil of wettelijke bewaarplicht een langere termijn vereist.",
            "Contractuele, fiscale en administratieve documenten worden bewaard gedurende de wettelijk verplichte termijnen. De lokale privacyvoorkeur vervalt na maximaal zes maanden.",
          ],
        },
        {
          title: "Welke rechten heb je?",
          paragraphs: [
            "Je kunt, binnen de voorwaarden van de AVG, vragen om inzage, verbetering, verwijdering, beperking of overdracht van je persoonsgegevens. Je kunt bezwaar maken tegen een verwerking op basis van gerechtvaardigd belang en een gegeven toestemming op elk moment intrekken zonder dat dit afbreuk doet aan eerdere rechtmatige verwerking.",
            "Stuur je verzoek naar ludovic@lpcyberlaunchpad.com. Om gegevens aan de juiste persoon te bezorgen kan om redelijke identiteitsverificatie worden gevraagd. Je hebt daarnaast het recht een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit of de bevoegde toezichthouder in je woon- of werkland.",
          ],
        },
        {
          title: "Beveiliging en wijzigingen",
          paragraphs: [
            "Passende technische en organisatorische maatregelen worden gebruikt om gegevens te beschermen tegen verlies, ongeoorloofde toegang en misbruik. Verstuur via e-mail geen gevoelige informatie die niet nodig is voor je vraag.",
            "Deze verklaring kan worden aangepast wanneer de website, gebruikte diensten of wettelijke verplichtingen wijzigen. De datum bovenaan toont de meest recente versie.",
          ],
        },
      ],
    },
    cookies: {
      metadataTitle: "Cookiebeleid",
      metadataDescription: "Een transparant overzicht van cookies en lokale opslag op de website van Ludovic Paronetto.",
      eyebrow: "COOKIEBELEID",
      title: "Geen tracking. Wel duidelijkheid.",
      intro: "De huidige websitecode plaatst geen cookies en gebruikt geen analytics, advertentiepixels, socialemediaplug-ins of externe embeds. Alleen strikt noodzakelijke lokale browseropslag onthoudt je privacykeuze.",
      storageTitle: "Actieve browseropslag",
      storageHeaders: ["Naam", "Type en domein", "Pad", "Doel", "Bewaartermijn", "Toegang derden"],
      storageRow: ["lp_privacy_notice_v1", "localStorage · first party · huidig domein", "Niet van toepassing", "Onthoudt dat de privacy- en cookie-uitleg werd gelezen", "Maximaal 6 maanden", "Nee"],
      sections: [
        {
          title: "Wat is lokale opslag?",
          paragraphs: [
            "Browseropslag is, net als cookies, een techniek waarmee een website beperkte informatie op je apparaat kan bewaren. De sleutel hierboven bevat alleen een versienummer en het tijdstip waarop je de melding bevestigde. Ze bevat geen naam, e-mailadres, advertentie-ID of surfprofiel.",
          ],
        },
        {
          title: "Waarom is dit strikt noodzakelijk?",
          paragraphs: [
            "De opslag voorkomt dat dezelfde privacy-uitleg bij elk bezoek opnieuw verschijnt. Ze wordt pas geschreven nadat je op ‘Begrepen’ klikt en wordt uiterlijk zes maanden later door de website als vervallen behandeld. Voor deze noodzakelijke voorkeur is geen toestemming vereist, maar je wordt er wel transparant over geïnformeerd.",
          ],
        },
        {
          title: "Analyse en marketing",
          paragraphs: [
            "Er zijn momenteel geen analytische, personalisatie- of marketingtechnologieën actief. Daarom vraagt de banner niet om algemene of toekomstige toestemming en bevat ze geen misleidende knop ‘alles accepteren’.",
            "Als later analytics, advertenties, video-embeds of socialemediaplug-ins worden toegevoegd, worden die standaard geblokkeerd totdat vooraf geldige toestemming is gegeven. Dit beleid en de instellingen worden dan eerst aangepast.",
          ],
        },
        {
          title: "Externe websites",
          paragraphs: [
            "Proton Calendar, LinkedIn, Standaard Boekhandel en LP Cyber Launchpad openen als afzonderlijke websites na een bewuste klik. Zij kunnen vanaf dat moment hun eigen cookies of vergelijkbare technieken gebruiken. Hun beleid valt onder hun eigen verantwoordelijkheid.",
          ],
        },
        {
          title: "Je keuze wissen of opnieuw bekijken",
          paragraphs: [
            "Gebruik ‘Privacy-instellingen’ in de footer om de opgeslagen keuze te wissen en de melding opnieuw te openen. Je kunt de sleutel ook verwijderen via de privacy- of opslaginstellingen van je browser.",
          ],
        },
        {
          title: "Rechten en contact",
          paragraphs: [
            "Vragen over cookies of andere persoonsgegevens kun je sturen naar ludovic@lpcyberlaunchpad.com. De privacyverklaring beschrijft je rechten op inzage, verbetering, verwijdering, beperking, overdraagbaarheid en bezwaar. Er vindt geen geautomatiseerde besluitvorming of profilering plaats.",
          ],
        },
      ],
    },
  },
  en: {
    common: {
      updated: "Last updated: 17 August 2026",
      controller: "Ludovic Paronetto",
      emailLabel: "Email",
      legalLabel: "Privacy",
      privacyLabel: "Privacy statement",
      cookiesLabel: "Cookie policy",
      settingsLabel: "Privacy settings",
      complaintLabel: "Lodge a complaint with the Belgian Data Protection Authority",
      complaintHref: "https://www.dataprotectionauthority.be/form-complaint",
    },
    banner: {
      title: "Privacy, without noise.",
      text: "This site uses no analytics or marketing cookies. Only necessary browser storage remembers for up to six months that you have read this explanation.",
      acknowledge: "Understood",
    },
    privacy: {
      metadataTitle: "Privacy statement",
      metadataDescription: "Learn how Ludovic Paronetto processes personal data when you visit this website, get in touch or book a conversation.",
      eyebrow: "PRIVACY STATEMENT",
      title: "Clear about what happens to your data.",
      intro: "This statement explains which personal data may be processed through this website and its linked contact channels, why this happens and which rights you have.",
      sections: [
        {
          title: "Who is responsible?",
          paragraphs: [
            "Ludovic Paronetto is the data controller for personal data processed in connection with this website and direct professional contacts.",
            "For questions or to exercise your privacy rights, contact ludovic@lpcyberlaunchpad.com. No separate data protection officer has been appointed; privacy questions are handled directly through this address.",
          ],
        },
        {
          title: "Which data may be processed?",
          paragraphs: [
            "The website has no user account, newsletter registration or embedded tracking. The project brief on the transformation page runs entirely in your browser: your input is not stored or transmitted by the website. Data is processed through your chosen service only when you send the prepared email yourself or open an external booking service.",
          ],
          bullets: [
            "Website visit: IP address, browser and device data, requested page, date and time, and limited server or security logs.",
            "Direct contact: your name, email address, professional context and the content of your message.",
            "Booking through Proton Calendar: the data you enter there, the selected date and time, and any message.",
            "Privacy preference: a local indication that you have read the cookie notice.",
          ],
        },
        {
          title: "Why and on which legal basis?",
          paragraphs: [
            "Technical data is processed to deliver and secure the website and prevent misuse. This is based on the legitimate interest in providing a safe and reliable website.",
            "Contact and booking data is used to answer your request, organise a conversation and, where relevant, take steps before or during a collaboration. Depending on the context, the legal basis is your request for pre-contractual steps, performance of a contract, a legal obligation or the legitimate interest in professional communication.",
            "The website makes no solely automated decisions and creates no visitor profiles.",
          ],
        },
        {
          title: "Who may receive data?",
          paragraphs: [
            "Only parties needed to operate the website and communications may receive data, such as hosting and IT providers, email and calendar providers, and professional advisers where necessary. Personal data is not sold.",
            "Data may also be disclosed where legally required, necessary to establish or defend legal claims, or needed to protect people or systems.",
          ],
        },
        {
          title: "External services and international transfers",
          paragraphs: [
            "Links to Proton Calendar, LinkedIn, Standaard Boekhandel and LP Cyber Launchpad do not activate those services' cookies until you click them. Once an external website opens, that provider's privacy and cookie terms apply.",
            "Some service providers may process data outside the European Economic Area. Where Ludovic Paronetto selects such a provider, this is done only with a valid transfer mechanism and appropriate GDPR safeguards.",
          ],
        },
        {
          title: "How long is data retained?",
          paragraphs: [
            "Technical logs are kept no longer than needed for operation and security, within the limited periods used by the hosting environment. Ordinary contact and booking correspondence is normally deleted no later than 24 months after the last substantive contact, unless a collaboration, dispute or legal duty requires longer retention.",
            "Contractual, tax and administrative documents are retained for the periods required by law. The local privacy preference expires after no more than six months.",
          ],
        },
        {
          title: "Which rights do you have?",
          paragraphs: [
            "Subject to the GDPR's conditions, you can request access, correction, deletion, restriction or portability of your personal data. You may object to processing based on legitimate interests and withdraw consent at any time without affecting earlier lawful processing.",
            "Send requests to ludovic@lpcyberlaunchpad.com. Reasonable identity verification may be requested to protect your data. You also have the right to complain to the Belgian Data Protection Authority or the competent supervisory authority in your country of residence or work.",
          ],
        },
        {
          title: "Security and changes",
          paragraphs: [
            "Appropriate technical and organisational measures are used to protect data against loss, unauthorised access and misuse. Do not send sensitive information by email unless it is necessary for your request.",
            "This statement may change when the website, services or legal duties change. The date above identifies the latest version.",
          ],
        },
      ],
    },
    cookies: {
      metadataTitle: "Cookie policy",
      metadataDescription: "A transparent overview of cookies and local storage on Ludovic Paronetto's website.",
      eyebrow: "COOKIE POLICY",
      title: "No tracking. Full clarity.",
      intro: "The current website code sets no cookies and uses no analytics, advertising pixels, social plug-ins or external embeds. Only strictly necessary local browser storage remembers your privacy choice.",
      storageTitle: "Active browser storage",
      storageHeaders: ["Name", "Type and domain", "Path", "Purpose", "Retention", "Third-party access"],
      storageRow: ["lp_privacy_notice_v1", "localStorage · first party · current domain", "Not applicable", "Remembers that the privacy and cookie explanation was read", "Up to 6 months", "No"],
      sections: [
        {
          title: "What is local storage?",
          paragraphs: [
            "Browser storage, like cookies, lets a website keep limited information on your device. The key above contains only a version number and the time when you confirmed the notice. It contains no name, email address, advertising ID or browsing profile.",
          ],
        },
        {
          title: "Why is it strictly necessary?",
          paragraphs: [
            "The storage prevents the same privacy explanation from appearing on every visit. It is written only after you select ‘Understood’ and is treated as expired by the website after no more than six months. This necessary preference does not require consent, but it is explained transparently.",
          ],
        },
        {
          title: "Analytics and marketing",
          paragraphs: [
            "No analytics, personalisation or marketing technology is currently active. The banner therefore does not ask for blanket or future consent and contains no misleading ‘accept all’ button.",
            "If analytics, advertising, video embeds or social plug-ins are added later, they will be blocked by default until valid prior consent has been given. This policy and the settings will be updated first.",
          ],
        },
        {
          title: "External websites",
          paragraphs: [
            "Proton Calendar, LinkedIn, Standaard Boekhandel and LP Cyber Launchpad open as separate websites after a deliberate click. From that point they may use their own cookies or similar technologies under their own responsibility.",
          ],
        },
        {
          title: "Delete or revisit your choice",
          paragraphs: [
            "Use ‘Privacy settings’ in the footer to delete the saved choice and reopen the notice. You can also remove the key through your browser's privacy or storage settings.",
          ],
        },
        {
          title: "Rights and contact",
          paragraphs: [
            "Questions about cookies or other personal data can be sent to ludovic@lpcyberlaunchpad.com. The privacy statement explains your rights to access, correction, deletion, restriction, portability and objection. No automated decision-making or profiling takes place.",
          ],
        },
      ],
    },
  },
  fr: {
    common: {
      updated: "Dernière mise à jour : 17 août 2026",
      controller: "Ludovic Paronetto",
      emailLabel: "E-mail",
      legalLabel: "Vie privée",
      privacyLabel: "Déclaration de confidentialité",
      cookiesLabel: "Politique de cookies",
      settingsLabel: "Paramètres de confidentialité",
      complaintLabel: "Introduire une plainte auprès de l'Autorité de protection des données",
      complaintHref: "https://www.autoriteprotectiondonnees.be/citoyen/agir/introduire-une-plainte",
    },
    banner: {
      title: "La vie privée, sans bruit.",
      text: "Ce site n'utilise aucun cookie d'analyse ou de marketing. Seul un stockage nécessaire dans le navigateur mémorise pendant six mois au maximum que vous avez lu cette explication.",
      acknowledge: "Compris",
    },
    privacy: {
      metadataTitle: "Déclaration de confidentialité",
      metadataDescription: "Découvrez comment Ludovic Paronetto traite les données personnelles lorsque vous visitez ce site, prenez contact ou réservez un échange.",
      eyebrow: "DÉCLARATION DE CONFIDENTIALITÉ",
      title: "Clair sur ce qui arrive à vos données.",
      intro: "Cette déclaration explique quelles données personnelles peuvent être traitées via ce site et les canaux de contact associés, pourquoi elles le sont et quels sont vos droits.",
      sections: [
        {
          title: "Qui est responsable ?",
          paragraphs: [
            "Ludovic Paronetto est le responsable du traitement des données personnelles liées à ce site et aux contacts professionnels directs.",
            "Pour toute question ou pour exercer vos droits, contactez ludovic@lpcyberlaunchpad.com. Aucun délégué distinct à la protection des données n'est désigné ; les questions de confidentialité sont traitées directement via cette adresse.",
          ],
        },
        {
          title: "Quelles données peuvent être traitées ?",
          paragraphs: [
            "Le site ne contient aucun compte utilisateur, inscription à une newsletter ou suivi intégré. Le brief projet de la page transformation fonctionne entièrement dans votre navigateur : vos réponses ne sont ni stockées ni transmises par le site. Elles ne sont traitées par le service choisi que lorsque vous envoyez vous-même l'e-mail préparé ou ouvrez un service de réservation externe.",
          ],
          bullets: [
            "Visite du site : adresse IP, données du navigateur et de l'appareil, page demandée, date et heure et journaux techniques ou de sécurité limités.",
            "Contact direct : votre nom, votre adresse e-mail, le contexte professionnel et le contenu de votre message.",
            "Réservation via Proton Calendar : les données que vous y saisissez, la date et l'heure choisies et tout commentaire éventuel.",
            "Préférence de confidentialité : une indication locale confirmant la lecture de l'avis relatif aux cookies.",
          ],
        },
        {
          title: "Pourquoi et sur quelle base juridique ?",
          paragraphs: [
            "Les données techniques servent à fournir et sécuriser le site et à prévenir les abus. Ce traitement repose sur l'intérêt légitime à proposer un site fiable et sécurisé.",
            "Les données de contact et de réservation servent à répondre à votre demande, organiser un échange et, le cas échéant, préparer ou exécuter une collaboration. Selon le contexte, la base juridique est votre demande de mesures précontractuelles, l'exécution d'un contrat, une obligation légale ou l'intérêt légitime à communiquer professionnellement.",
            "Le site ne prend aucune décision exclusivement automatisée et n'établit aucun profil de visiteur.",
          ],
        },
        {
          title: "Qui peut recevoir les données ?",
          paragraphs: [
            "Seuls les prestataires nécessaires au site et aux communications peuvent recevoir des données, notamment l'hébergeur et les prestataires informatiques, de messagerie et d'agenda, ainsi que des conseillers professionnels si nécessaire. Les données ne sont pas vendues.",
            "Elles peuvent également être communiquées lorsqu'une obligation légale l'impose, pour établir ou défendre un droit en justice ou pour protéger des personnes ou des systèmes.",
          ],
        },
        {
          title: "Services externes et transferts internationaux",
          paragraphs: [
            "Les liens vers Proton Calendar, LinkedIn, Standaard Boekhandel et LP Cyber Launchpad n'activent pas les cookies de ces services avant votre clic. Dès l'ouverture d'un site externe, la politique de ce fournisseur s'applique.",
            "Certains prestataires peuvent traiter des données hors de l'Espace économique européen. Lorsque Ludovic Paronetto choisit un tel prestataire, il ne le fait qu'avec un mécanisme de transfert valable et des garanties appropriées au regard du RGPD.",
          ],
        },
        {
          title: "Combien de temps les données sont-elles conservées ?",
          paragraphs: [
            "Les journaux techniques ne sont pas conservés plus longtemps que nécessaire au fonctionnement et à la sécurité, selon les durées limitées de l'environnement d'hébergement. La correspondance ordinaire de contact et de réservation est normalement supprimée au plus tard 24 mois après le dernier échange substantiel, sauf si une collaboration, un litige ou une obligation légale impose une durée plus longue.",
            "Les documents contractuels, fiscaux et administratifs sont conservés pendant les durées prévues par la loi. La préférence locale de confidentialité expire après six mois au maximum.",
          ],
        },
        {
          title: "Quels sont vos droits ?",
          paragraphs: [
            "Dans les conditions du RGPD, vous pouvez demander l'accès, la rectification, l'effacement, la limitation ou la portabilité de vos données. Vous pouvez vous opposer à un traitement fondé sur l'intérêt légitime et retirer un consentement à tout moment sans affecter les traitements antérieurs licites.",
            "Envoyez votre demande à ludovic@lpcyberlaunchpad.com. Une vérification raisonnable de votre identité peut être demandée afin de protéger vos données. Vous pouvez également introduire une plainte auprès de l'Autorité belge de protection des données ou de l'autorité compétente de votre pays de résidence ou de travail.",
          ],
        },
        {
          title: "Sécurité et modifications",
          paragraphs: [
            "Des mesures techniques et organisationnelles appropriées protègent les données contre la perte, l'accès non autorisé et l'abus. N'envoyez pas par e-mail de données sensibles inutiles à votre demande.",
            "Cette déclaration peut évoluer si le site, les services ou les obligations légales changent. La date ci-dessus indique la version la plus récente.",
          ],
        },
      ],
    },
    cookies: {
      metadataTitle: "Politique de cookies",
      metadataDescription: "Un aperçu transparent des cookies et du stockage local sur le site de Ludovic Paronetto.",
      eyebrow: "POLITIQUE DE COOKIES",
      title: "Aucun suivi. Une transparence complète.",
      intro: "Le code actuel du site ne place aucun cookie et n'utilise aucun outil d'analyse, pixel publicitaire, plug-in social ou contenu externe intégré. Seul un stockage local strictement nécessaire mémorise votre choix de confidentialité.",
      storageTitle: "Stockage actif dans le navigateur",
      storageHeaders: ["Nom", "Type et domaine", "Chemin", "Finalité", "Durée", "Accès de tiers"],
      storageRow: ["lp_privacy_notice_v1", "localStorage · first party · domaine actuel", "Sans objet", "Mémorise que l'explication relative à la vie privée et aux cookies a été lue", "6 mois maximum", "Non"],
      sections: [
        {
          title: "Qu'est-ce que le stockage local ?",
          paragraphs: [
            "Le stockage du navigateur permet, comme les cookies, de conserver une quantité limitée d'informations sur votre appareil. La clé ci-dessus contient uniquement un numéro de version et le moment où vous avez confirmé l'avis. Elle ne contient ni nom, ni adresse e-mail, ni identifiant publicitaire, ni profil de navigation.",
          ],
        },
        {
          title: "Pourquoi est-il strictement nécessaire ?",
          paragraphs: [
            "Ce stockage évite d'afficher la même explication à chaque visite. Il n'est écrit qu'après avoir choisi « Compris » et le site le considère comme expiré après six mois au maximum. Cette préférence nécessaire ne requiert pas de consentement, mais elle est expliquée de manière transparente.",
          ],
        },
        {
          title: "Analyse et marketing",
          paragraphs: [
            "Aucune technologie d'analyse, de personnalisation ou de marketing n'est actuellement active. La bannière ne demande donc pas de consentement général ou futur et ne comporte pas de bouton trompeur « tout accepter ».",
            "Si des outils d'analyse, publicités, vidéos intégrées ou plug-ins sociaux sont ajoutés plus tard, ils seront bloqués par défaut jusqu'à l'obtention préalable d'un consentement valable. Cette politique et les paramètres seront d'abord mis à jour.",
          ],
        },
        {
          title: "Sites externes",
          paragraphs: [
            "Proton Calendar, LinkedIn, Standaard Boekhandel et LP Cyber Launchpad s'ouvrent comme des sites distincts après un clic volontaire. Ils peuvent alors utiliser leurs propres cookies ou techniques similaires sous leur propre responsabilité.",
          ],
        },
        {
          title: "Effacer ou revoir votre choix",
          paragraphs: [
            "Utilisez « Paramètres de confidentialité » dans le pied de page pour effacer le choix enregistré et rouvrir l'avis. Vous pouvez également supprimer la clé dans les paramètres de confidentialité ou de stockage de votre navigateur.",
          ],
        },
        {
          title: "Droits et contact",
          paragraphs: [
            "Vos questions sur les cookies ou les données personnelles peuvent être envoyées à ludovic@lpcyberlaunchpad.com. La déclaration de confidentialité explique vos droits d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition. Aucune décision automatisée ni aucun profilage n'a lieu.",
          ],
        },
      ],
    },
  },
};

export const getLegalCopy = (lang: Language) => legalCopy[lang];
