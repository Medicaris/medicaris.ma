/* Medicaris — données Actualités / Congrès / FAQ
   CONTENU D'EXEMPLE — à remplacer par du contenu réel (à terme via un
   back-office). Structure pensée pour être interchangeable avec un
   fetch() vers une API sans changer le rendu (voir resources-render.js). */

window.MEDICARIS_NEWS = [
  {
    id: 'news-1',
    date: '2026-07-15',
    sample: true,
    title: {
      fr: 'Exemple d’actualité — nouvelle configuration disponible',
      en: 'Sample news — new configuration available'
    },
    excerpt: {
      fr: 'Emplacement réservé pour annoncer une nouvelle configuration d’équipement ou un ajout à la gamme distribuée.',
      en: 'Placeholder for announcing a new equipment configuration or an addition to the distributed range.'
    }
  },
  {
    id: 'news-2',
    date: '2026-06-02',
    sample: true,
    title: {
      fr: 'Exemple d’actualité — retour d’expérience clinique',
      en: 'Sample news — clinical feedback'
    },
    excerpt: {
      fr: 'Emplacement réservé pour partager un retour d’expérience d’une clinique partenaire, une fois autorisé par l’établissement concerné.',
      en: 'Placeholder for sharing feedback from a partner clinic, once authorised by the institution concerned.'
    }
  },
  {
    id: 'news-3',
    date: '2026-04-20',
    sample: true,
    title: {
      fr: 'Exemple d’actualité — extension de la gamme de consommables',
      en: 'Sample news — consumables range extension'
    },
    excerpt: {
      fr: 'Emplacement réservé pour annoncer un nouveau format de consommable (fibres, cathéters, électrodes) disponible au stock.',
      en: 'Placeholder for announcing a new consumable format (fibres, catheters, electrodes) available in stock.'
    }
  },
  {
    id: 'news-4',
    date: '2026-02-10',
    sample: true,
    title: {
      fr: 'Exemple d’actualité — mise à jour du protocole de formation',
      en: 'Sample news — training protocol update'
    },
    excerpt: {
      fr: 'Emplacement réservé pour détailler une évolution du parcours de formation proposé aux équipes de bloc.',
      en: 'Placeholder for detailing an update to the training path offered to theatre teams.'
    }
  }
];

window.MEDICARIS_EVENTS = [
  {
    id: 'event-1',
    dateStart: '2026-10-14',
    dateEnd: '2026-10-16',
    status: 'upcoming',
    sample: true,
    location: { fr: 'Casablanca, Maroc', en: 'Casablanca, Morocco' },
    title: {
      fr: 'Salon [Exemple] de chirurgie par énergie',
      en: '[Sample] Energy-Based Surgery Fair'
    },
    description: {
      fr: 'Emplacement réservé pour un salon ou congrès réel auquel Medicaris participerait — nom, lieu et dates à confirmer avant publication.',
      en: 'Placeholder for a real fair or congress Medicaris would attend — name, location and dates to confirm before publishing.'
    }
  },
  {
    id: 'event-2',
    dateStart: '2026-11-05',
    dateEnd: '2026-11-05',
    status: 'upcoming',
    sample: true,
    location: { fr: 'Rabat, Maroc', en: 'Rabat, Morocco' },
    title: {
      fr: 'Journée de formation [Exemple] — proctologie',
      en: '[Sample] Training Day — Proctology'
    },
    description: {
      fr: 'Emplacement réservé pour une session de formation ou de démonstration produit organisée avec un établissement partenaire.',
      en: 'Placeholder for a training or product demonstration session organised with a partner institution.'
    }
  },
  {
    id: 'event-3',
    dateStart: '2026-03-18',
    dateEnd: '2026-03-19',
    status: 'past',
    sample: true,
    location: { fr: 'Marrakech, Maroc', en: 'Marrakech, Morocco' },
    title: {
      fr: 'Congrès [Exemple] de phlébologie',
      en: '[Sample] Phlebology Congress'
    },
    description: {
      fr: 'Emplacement réservé pour un événement passé — à remplacer par un compte-rendu réel une fois le contenu disponible.',
      en: 'Placeholder for a past event — to be replaced with a real recap once content is available.'
    }
  }
];

window.MEDICARIS_FAQ = [
  {
    q: { fr: 'Quels sont les délais entre la commande et l’installation ?', en: 'What is the timeline between order and installation?' },
    a: {
      fr: 'Le délai dépend du modèle commandé et des formalités douanières. Nous communiquons une estimation précise dès la validation du devis et tenons la clinique informée à chaque étape, de la commande auprès du fabricant jusqu’à la livraison.',
      en: 'The timeline depends on the model ordered and customs formalities. We provide a precise estimate as soon as the quotation is validated and keep the clinic informed at every step, from the manufacturer order through to delivery.'
    }
  },
  {
    q: { fr: 'La formation de l’équipe est-elle incluse ?', en: 'Is team training included?' },
    a: {
      fr: 'Oui. L’installation sur site est systématiquement suivie d’une prise en main avec le chirurgien et l’équipe de bloc, comme indiqué dans notre parcours de service.',
      en: 'Yes. On-site installation is always followed by hands-on training with the surgeon and theatre team, as described in our service process.'
    }
  },
  {
    q: { fr: 'Comment sont réapprovisionnés les consommables (fibres, cathéters, électrodes) ?', en: 'How are consumables (fibres, catheters, electrodes) restocked?' },
    a: {
      fr: 'Vous passez la commande directement auprès de Medicaris, distributeur exclusif au Maroc, sans intermédiaire. Contactez-nous par WhatsApp ou téléphone pour connaître les délais selon la référence.',
      en: 'You order directly from Medicaris, the exclusive distributor in Morocco, with no middleman. Contact us via WhatsApp or phone to check lead times for a given reference.'
    }
  },
  {
    q: { fr: 'Que se passe-t-il en cas de panne ou de problème technique ?', en: 'What happens in case of a breakdown or technical issue?' },
    a: {
      fr: 'Contactez notre support technique via WhatsApp ou téléphone ; nous répondons sous 24 heures ouvrables pour qualifier le problème et organiser une intervention ou un échange si nécessaire.',
      en: 'Contact our technical support via WhatsApp or phone; we reply within 24 business hours to assess the issue and arrange an intervention or replacement if needed.'
    }
  },
  {
    q: { fr: 'Medicaris travaille-t-elle uniquement avec des cliniques à Casablanca ?', en: 'Does Medicaris only work with clinics in Casablanca?' },
    a: {
      fr: 'Non. Nous sommes basés à Casablanca mais livrons et intervenons dans tout le Maroc, auprès de chirurgiens, cliniques et établissements de santé.',
      en: 'No. We are based in Casablanca but deliver and provide support across Morocco, working with surgeons, clinics and healthcare institutions.'
    }
  },
  {
    q: { fr: 'Peut-on demander une démonstration avant de s’engager ?', en: 'Can we request a demonstration before committing?' },
    a: {
      fr: 'Oui, c’est même l’approche que nous recommandons : voir l’équipement fonctionner avant de décider. Utilisez le formulaire de contact ou WhatsApp pour organiser une démonstration sur site.',
      en: 'Yes, this is actually our recommended approach: see the equipment in action before deciding. Use the contact form or WhatsApp to arrange an on-site demonstration.'
    }
  }
];
