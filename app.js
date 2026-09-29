/* Zia — v1.0 (construite à partir de Sayko de poche v2.12)
   App 100 % locale : aucune donnée ne quitte le téléphone. */
'use strict';

/* =====================================================================
   1. CONTENU
   ===================================================================== */
const DOMAINS = {
  fond: 'Fondations', rel: 'Relationnel & leadership', psy: 'Psychologie & neuromarketing',
  vente: 'Vente', offre: 'Offre & copywriting', nego: 'Négociation', mkt: 'Marketing & acquisition',
  test: 'Tester une idée', fin: 'Finance & gestion', jur: 'Juridique & fiscal', plan: 'Dossier de lancement'
};
const QUARTERS = [
  { t: 'T1 · Les bases', d: 'Comprendre comment marche un business et comment fonctionnent les gens.' },
  { t: 'T2 · Convaincre', d: 'Vendre, construire une offre, négocier.' },
  { t: 'T3 · Attirer des clients', d: 'Marketing, acquisition, et valider une idée sans capital.' },
  { t: 'T4 · Structurer', d: 'Chiffres, statut juridique, fiscalité, et ton dossier de lancement.' }
];
const MONTHS = [
  { n: 1, dom: 'fond', title: 'Comment marche un business',
    why: "C'est la carte d'ensemble : tout ce que tu apprendras ensuite viendra s'accrocher dessus.",
    res: [{ t: 'Le Personal MBA — Josh Kaufman', w: 'Livre (FR). Médiathèque ou livre audio.' },
          { t: 'GDIY — Matthieu Stefani', w: "Podcast. Choisis 4 épisodes d'entrepreneurs partis de zéro." }],
    acq: ["Expliquer les 5 fonctions d'un business : créer de la valeur, marketing, vente, livraison, finance",
          'Calculer une marge brute et une marge nette',
          "Distinguer chiffre d'affaires, bénéfice et trésorerie",
          "Décrire le modèle économique d'un commerce que je connais",
          'Résumer en 5 lignes les 3 idées du livre qui me servent le plus'],
    ex: "Analyse Mister Pizza comme un business : d'où vient l'argent, où il part, ce qui fait revenir les clients. Estime le prix de revient d'une pizza." },
  { n: 2, dom: 'rel', title: 'Relationnel & leadership',
    why: "Tu passes responsable d'équipe : c'est le moment idéal pour pratiquer sur le terrain.",
    res: [{ t: 'Comment se faire des amis — Dale Carnegie', w: 'Livre (FR). Médiathèque.' },
          { t: 'Le Manager Minute — Ken Blanchard', w: 'Livre court (FR). Se lit en une soirée.' },
          { t: 'Le Gratin — Pauline Laigneau', w: 'Podcast. Épisodes sur le management et la relation client.' }],
    acq: ["Pratiquer l'écoute active et la reformulation",
          'Faire un recadrage bienveillant et factuel',
          "Fixer un objectif clair et mesurable à quelqu'un de mon équipe",
          'Féliciter sur un fait précis, au moment où il se produit',
          'Retenir les prénoms et les détails des gens que je rencontre'],
    ex: "Chaque semaine, applique une technique de Carnegie ou de Blanchard avec ton équipe en gare et note ce qui a marché." },
  { n: 3, dom: 'psy', title: 'Psychologie & neuromarketing',
    why: 'Comprendre pourquoi les gens achètent, avant d\'apprendre à vendre.',
    res: [{ t: 'Influence et manipulation — Robert Cialdini', w: 'Livre (FR). La référence de la persuasion.' },
          { t: 'Système 1 / Système 2 — Daniel Kahneman', w: 'Livre (FR). Dense : lis les parties 1 et 4 en priorité.' },
          { t: 'Neuromarketing — Renvoisé & Morin', w: "Livre. Comment le cerveau prend une décision d'achat." }],
    acq: ['Reconnaître les principes de Cialdini : réciprocité, engagement, preuve sociale, autorité, sympathie, rareté',
          "Expliquer les biais d'ancrage, d'aversion à la perte et de cadrage",
          'Repérer ces leviers dans 5 pubs ou pages de vente',
          'Savoir où passe la frontière entre persuasion et manipulation'],
    ex: 'Prends 5 pubs TikTok ou Instagram et note, pour chacune, le levier psychologique utilisé et à qui elle parle.' },
  { n: 4, dom: 'vente', title: 'Vendre',
    why: 'La compétence qui fait vivre un business dès le premier jour.',
    res: [{ t: 'SPIN Selling — Neil Rackham', w: 'Livre (EN, ou résumés en FR). La vente par les questions.' },
          { t: "Chaîne YouTube d'Alex Hormozi", w: 'YouTube, sous-titres FR. Vidéos sur la vente et le closing.' }],
    acq: ['Mener une découverte du besoin avec des questions ouvertes (Situation, Problème, Implication, Nécessité)',
          'Répondre aux objections « c\'est trop cher », « je vais réfléchir », « pas maintenant »',
          'Présenter un bénéfice plutôt qu\'une caractéristique',
          'Proposer clairement la vente à la fin d\'un échange',
          'Conclure une vente réelle, même petite'],
    ex: 'Vends quelque chose pour de vrai : un objet sur Leboncoin, un service, peu importe. Débriefe : qu\'est-ce qui a déclenché le oui ?' },
  { n: 5, dom: 'offre', title: 'Offre & copywriting',
    why: 'Une bonne offre se vend presque toute seule.',
    res: [{ t: 'Offres à 100 millions $ — Alex Hormozi', w: "Livre (FR). L'équation de la valeur." },
          { t: "The Copywriter's Handbook — Robert Bly", w: 'Livre (EN). Les bases du texte qui vend.' }],
    acq: ["Utiliser l'équation de la valeur pour améliorer une offre",
          'Écrire une accroche qui parle du problème du client',
          'Rédiger une page de vente simple : problème, solution, preuve, offre, appel à l\'action',
          'Ajouter garantie, bonus et urgence de façon honnête',
          'Réécrire une offre existante pour la rendre plus forte'],
    ex: "Rédige l'offre complète d'un de tes projets comme si tu la lançais demain, puis fais-la lire à 2 personnes." },
  { n: 6, dom: 'nego', title: 'Négocier',
    why: 'Fournisseurs, loyer, partenaires : chaque point gagné est du bénéfice net.',
    res: [{ t: 'Ne coupez jamais la poire en deux — Chris Voss', w: 'Livre (FR). La négociation par un ex-négociateur du FBI.' },
          { t: 'Comment réussir une négociation — Fisher & Ury', w: 'Livre (FR). La méthode de Harvard.' }],
    acq: ['Préparer ma solution de repli (MESORE) avant de négocier',
          'Utiliser le miroir, l\'étiquetage et les questions calibrées',
          'Séparer la personne du problème, les intérêts des positions',
          'Ne jamais faire de concession sans contrepartie',
          'Mener une vraie négociation et en faire le bilan'],
    ex: 'Négocie quelque chose de réel : un prix, un abonnement, un loyer, un fournisseur. Note ta préparation et le résultat.' },
  { n: 7, dom: 'mkt', title: 'Les bases du marketing',
    why: 'Savoir à qui tu parles, et pourquoi on te choisirait toi.',
    res: [{ t: 'This Is Marketing — Seth Godin', w: 'Livre (existe en FR). Le marketing centré sur les gens.' },
          { t: 'HubSpot Academy — Inbound Marketing', w: 'Cours gratuit en ligne, avec certificat (academy.hubspot.com).' }],
    acq: ['Définir un client idéal précis pour un projet',
          'Formuler mon positionnement en une phrase',
          'Écrire une proposition de valeur claire',
          'Analyser 3 concurrents : prix, message, points faibles',
          'Obtenir le certificat HubSpot Inbound'],
    ex: 'Rédige la fiche client idéal et le positionnement de ton projet le plus avancé.' },
  { n: 8, dom: 'mkt', title: 'Acquérir des clients',
    why: "Transformer l'attention en clients, chiffres à l'appui.",
    res: [{ t: 'Google Ateliers Numériques', w: 'Formations gratuites en marketing digital, avec certificat.' },
          { t: 'Meta Blueprint', w: 'Cours gratuits sur la publicité Facebook et Instagram.' },
          { t: 'My First Million', w: "Podcast (EN). Des idées d'acquisition et de business." }],
    acq: ["Dessiner un tunnel d'acquisition : attention, intérêt, achat, fidélité",
          "Calculer un coût d'acquisition client (CAC)",
          'Calculer un taux de conversion à chaque étape du tunnel',
          'Calculer la valeur vie client et la comparer au CAC',
          'Choisir 1 ou 2 canaux adaptés à un projet'],
    ex: "Construis un petit tableau de suivi (CAC, conversion, valeur vie client) pour un projet, avec des chiffres réalistes. C'est aussi un exercice de data analyst." },
  { n: 9, dom: 'test', title: 'Tester une idée sans capital',
    why: 'Valider avant d\'investir, c\'est la meilleure protection de ton argent.',
    res: [{ t: 'The Mom Test — Rob Fitzpatrick', w: 'Livre court (EN). Interroger des clients sans se mentir.' },
          { t: 'Lean Startup — Eric Ries', w: 'Livre (FR). Construire, mesurer, apprendre.' }],
    acq: ['Poser des questions sur ce que les gens ont fait, pas sur ce qu\'ils feraient',
          'Mener 10 entretiens avec de vrais clients potentiels',
          'Définir le plus petit test possible d\'une idée',
          'Fixer à l\'avance le résultat qui valide ou invalide le test',
          'Décider sur des faits : continuer, ajuster ou abandonner'],
    ex: 'Choisis un projet, fais 10 entretiens, puis lance un mini-test à moins de 50 € (page d\'attente, précommande, annonce).' },
  { n: 10, dom: 'fin', title: 'Finance & gestion',
    why: 'Beaucoup de business rentables meurent faute de trésorerie.',
    res: [{ t: 'Bpifrance Création — fiches gestion et prévisionnel', w: 'Gratuit en ligne (bpifrance-creation.fr).' },
          { t: 'La comptabilité pour les Nuls', w: 'Livre (FR). Médiathèque.' }],
    acq: ['Lire un compte de résultat et un bilan simples',
          'Faire un plan de trésorerie sur 12 mois',
          'Calculer un seuil de rentabilité',
          'Séparer charges fixes et charges variables',
          'Construire un prévisionnel sur 3 ans pour un projet'],
    ex: 'Fais le prévisionnel complet (3 ans) et le plan de trésorerie (12 mois) de ton projet prioritaire.' },
  { n: 11, dom: 'jur', title: 'Juridique & fiscal',
    why: 'Choisir la bonne structure et te rémunérer intelligemment, légalement.',
    res: [{ t: 'Bpifrance Création — statuts juridiques', w: 'Gratuit en ligne, avec comparateur.' },
          { t: 'URSSAF — portail auto-entrepreneur', w: 'autoentrepreneur.urssaf.fr' },
          { t: 'service-public.fr et impots.gouv.fr', w: 'Sources officielles, gratuites.' },
          { t: 'CCI Nice Côte d\'Azur — « 5 jours pour entreprendre »', w: 'Formation en présentiel, à réserver à l\'avance.' }],
    acq: ['Comparer micro-entreprise, EURL, SASU et SAS',
          "Expliquer la différence entre impôt sur le revenu (IR) et impôt sur les sociétés (IS)",
          'Comparer salaire et dividendes, statut TNS et assimilé salarié',
          'Comprendre la franchise en base de TVA',
          'Savoir à quoi sert une holding et à partir de quand elle devient utile',
          'Vérifier ce que mon contrat de travail permet pour une activité à côté'],
    ex: 'Pour chacun de tes projets, note la structure qui te semble adaptée et pourquoi. Le moment venu, fais valider par un expert-comptable.' },
  { n: 12, dom: 'plan', title: 'Dossier de lancement',
    why: 'Tout assembler pour être prêt le jour où tu te lances.',
    res: [{ t: 'Bpifrance Création — modèle de business plan', w: 'Gratuit en ligne.' },
          { t: 'Tes notes des 11 mois précédents', w: 'Dans chaque mois de cet onglet.' }],
    acq: ['Rédiger le business plan de mon projet prioritaire',
          'Chiffrer précisément le capital de départ nécessaire',
          'Lister mes 90 premiers jours après le lancement',
          'Présenter mon projet en 2 minutes, sans notes'],
    ex: 'Pitche ton projet à 3 personnes de confiance et note toutes leurs questions : ce sont les trous de ton dossier.' }
];

/* 50 mots parmi les plus fréquents du Coran : [arabe, sens, racine] */
const WORDS = [
  ['اللَّه', 'Allah (Dieu)', ''], ['رَبّ', 'Seigneur', 'ر ب ب'], ['قَالَ', 'il a dit', 'ق و ل'], ['قُلْ', 'dis !', 'ق و ل'],
  ['كَانَ', 'il était', 'ك و ن'], ['الَّذِينَ', 'ceux qui', ''], ['مِنْ', 'de, parmi', ''], ['فِي', 'dans', ''],
  ['عَلَىٰ', 'sur', ''], ['إِلَىٰ', 'vers', ''], ['لَا', 'non, ne… pas', ''], ['مَا', 'ce que ; ne… pas', ''],
  ['إِنَّ', 'certes', ''], ['يَا', 'ô', ''], ['هُوَ', 'il, lui', ''], ['أَنْتَ', 'tu, toi', ''], ['نَحْنُ', 'nous', ''],
  ['يَوْم', 'jour', 'ي و م'], ['أَرْض', 'terre', 'أ ر ض'], ['سَمَاء', 'ciel', 'س م و'], ['نَاس', 'les gens', 'ن و س'],
  ['قَوْم', 'peuple', 'ق و م'], ['آمَنَ', 'il a cru', 'أ م ن'], ['كَفَرَ', 'il a mécru', 'ك ف ر'],
  ['عَمِلَ', 'il a œuvré', 'ع م ل'], ['عَلِمَ', 'il a su', 'ع ل م'], ['كِتَاب', 'livre, Écriture', 'ك ت ب'],
  ['آيَة', 'signe, verset', 'أ ي ي'], ['رَحْمَة', 'miséricorde', 'ر ح م'], ['قَلْب', 'cœur', 'ق ل ب'],
  ['نَفْس', 'âme, soi-même', 'ن ف س'], ['حَقّ', 'vérité, droit', 'ح ق ق'], ['هُدًى', 'guidée', 'ه د ي'],
  ['صَلَاة', 'prière', 'ص ل و'], ['جَنَّة', 'jardin, paradis', 'ج ن ن'], ['نَار', 'feu', 'ن و ر'],
  ['عَذَاب', 'châtiment', 'ع ذ ب'], ['رَسُول', 'messager', 'ر س ل'], ['شَيْء', 'chose', 'ش ي أ'],
  ['كُلّ', 'tout, chaque', 'ك ل ل'], ['عَبْد', 'serviteur', 'ع ب د'], ['ذِكْر', 'rappel, évocation', 'ذ ك ر'],
  ['دِين', 'religion ; rétribution', 'د ي ن'], ['سَبِيل', 'chemin, voie', 'س ب ل'], ['خَيْر', 'bien ; meilleur', 'خ ي ر'],
  ['رَزَقَ', 'il a pourvu', 'ر ز ق'], ['صَبْر', 'patience', 'ص ب ر'], ['عَظِيم', 'immense', 'ع ظ م'],
  ['عَلِيم', 'Omniscient', 'ع ل م'], ['رَحِيم', 'Très Miséricordieux', 'ر ح م']
];

/* Al-Fatiha, mot à mot (rasm uthmani, lecture Hafs) */
const FATIHA = [
  [['بِسْمِ', 'au nom de'], ['ٱللَّهِ', 'Allah'], ['ٱلرَّحْمَٰنِ', 'le Tout Miséricordieux'], ['ٱلرَّحِيمِ', 'le Très Miséricordieux']],
  [['ٱلْحَمْدُ', 'la louange'], ['لِلَّهِ', 'à Allah'], ['رَبِّ', 'Seigneur'], ['ٱلْعَٰلَمِينَ', 'des mondes']],
  [['ٱلرَّحْمَٰنِ', 'le Tout Miséricordieux'], ['ٱلرَّحِيمِ', 'le Très Miséricordieux']],
  [['مَٰلِكِ', 'Maître'], ['يَوْمِ', 'du jour'], ['ٱلدِّينِ', 'de la rétribution']],
  [['إِيَّاكَ', "c'est Toi (seul)"], ['نَعْبُدُ', 'nous adorons'], ['وَإِيَّاكَ', "et c'est Toi (seul)"], ['نَسْتَعِينُ', 'dont nous implorons le secours']],
  [['ٱهْدِنَا', 'guide-nous'], ['ٱلصِّرَٰطَ', 'le chemin'], ['ٱلْمُسْتَقِيمَ', 'droit']],
  [['صِرَٰطَ', 'le chemin'], ['ٱلَّذِينَ', 'de ceux'], ['أَنْعَمْتَ', 'Tu as comblé (de bienfaits)'], ['عَلَيْهِمْ', 'sur eux'],
   ['غَيْرِ', 'non pas'], ['ٱلْمَغْضُوبِ', 'ceux qui ont encouru la colère'], ['عَلَيْهِمْ', 'contre eux'], ['وَلَا', 'ni'], ['ٱلضَّآلِّينَ', 'les égarés']]
];

const AR_STEPS = [
  { t: 'T1 · Lecture fluide et vocabulaire', items: [
    'Suivre les modules de Tajwid Institut sans en sauter',
    'Lire 1 page du Coran par jour à voix haute',
    'Maîtriser les 50 mots du quiz',
    'Comprendre Al-Fatiha mot à mot'] },
  { t: 'T2 · Bases de grammaire', items: [
    "Distinguer nom, verbe et particule (ism, fi'l, harf)",
    'Comprendre le principe des racines à 3 lettres',
    'Connaître les pronoms personnels et possessifs',
    'Conjuguer un verbe au passé (mâdî) et au présent (mudâri\')'] },
  { t: "T3 · Sourates courtes du Juz 'Amma", items: [
    'Comprendre mot à mot les sourates que je récite en prière',
    "Comprendre le sens global de 10 sourates du Juz 'Amma",
    'Reconnaître les mots fréquents en écoutant une récitation'] },
  { t: 'T4 · Comprendre ce que je récite', items: [
    'Comprendre tout ce que je récite dans mes prières',
    'Lire un verset inconnu et en deviner le sens général',
    'Distinguer phrase nominale et phrase verbale'] }
];

/* Al-Fatiha + Juz 'Amma : [numéro, translittération, nom arabe] */
const SOURATES = [
  [1, 'Al-Fatiha', 'الفاتحة'], [114, 'An-Nas', 'الناس'], [113, 'Al-Falaq', 'الفلق'], [112, 'Al-Ikhlas', 'الإخلاص'],
  [111, 'Al-Masad', 'المسد'], [110, 'An-Nasr', 'النصر'], [109, 'Al-Kafirun', 'الكافرون'], [108, 'Al-Kawthar', 'الكوثر'],
  [107, "Al-Ma'un", 'الماعون'], [106, 'Quraysh', 'قريش'], [105, 'Al-Fil', 'الفيل'], [104, 'Al-Humaza', 'الهمزة'],
  [103, "Al-'Asr", 'العصر'], [102, 'At-Takathur', 'التكاثر'], [101, "Al-Qari'a", 'القارعة'], [100, "Al-'Adiyat", 'العاديات'],
  [99, 'Az-Zalzala', 'الزلزلة'], [98, 'Al-Bayyina', 'البينة'], [97, 'Al-Qadr', 'القدر'], [96, "Al-'Alaq", 'العلق'],
  [95, 'At-Tin', 'التين'], [94, 'Ash-Sharh', 'الشرح'], [93, 'Ad-Duha', 'الضحى'], [92, 'Al-Layl', 'الليل'],
  [91, 'Ash-Shams', 'الشمس'], [90, 'Al-Balad', 'البلد'], [89, 'Al-Fajr', 'الفجر'], [88, 'Al-Ghashiya', 'الغاشية'],
  [87, "Al-A'la", 'الأعلى'], [86, 'At-Tariq', 'الطارق'], [85, 'Al-Buruj', 'البروج'], [84, 'Al-Inshiqaq', 'الانشقاق'],
  [83, 'Al-Mutaffifin', 'المطففين'], [82, 'Al-Infitar', 'الانفطار'], [81, 'At-Takwir', 'التكوير'], [80, "'Abasa", 'عبس'],
  [79, "An-Nazi'at", 'النازعات'], [78, "An-Naba'", 'النبأ']
];
/* Ordre de l'ancienne app « Prépa Sayko » (pour la migration) */
const OLD_SOURATES = ['Al-Fatiha', 'An-Nas', 'Al-Falaq', 'Al-Ikhlas', 'Al-Masad', 'An-Nasr', 'Al-Kafirun', 'Al-Kawthar', "Al-Ma'un", 'Quraysh', 'Al-Fil', 'Al-Humaza', "Al-'Asr", 'At-Takathur', "Al-Qari'a", "Al-'Adiyat"];

const ROUTINE = [
  [30, 'Audio', 'Pendant les trajets : le podcast ou le livre audio du mois.'],
  [30, 'Lecture active', 'Le livre du mois, avec 3 idées notées dans le Parcours.'],
  [20, 'Arabe', 'Un module Tajwid Institut ou une page lue, puis le quiz.'],
  [10, 'Pratique', "Un pas concret sur l'exercice du mois."]
];

const EMP = { gare: 'Gare', pizza: 'Mister Pizza' };

/* =====================================================================
   2. OUTILS
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDate = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const todayISO = () => iso(new Date());
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const toMin = t => { const [h, m] = (t || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 450 min → « 7 h 30 » */
function fmtH(min) {
  const neg = min < 0; min = Math.round(Math.abs(min));
  const s = `${Math.floor(min / 60)} h ${pad(min % 60)}`;
  return neg ? '−' + s : s;
}
/* 450 min → « 7,50 » (format fiche de paie) */
const fmtDec = min => (min / 60).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtEur = v => v.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
/* « 151,67 », « 151.67 », « 151h40 », « 151:40 » → minutes */
function parseHours(str) {
  if (str == null) return null;
  const s = String(str).trim().replace(/\s/g, '').toLowerCase();
  if (!s) return null;
  let m = s.match(/^(\d+)[h:](\d{1,2})?$/);
  if (m) return Number(m[1]) * 60 + Number(m[2] || 0);
  const v = Number(s.replace(',', '.'));
  return Number.isFinite(v) ? Math.round(v * 60) : null;
}
const MONTH_FMT = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
const DAY_SHORT = new Intl.DateTimeFormat('fr-FR', { weekday: 'short' });
const DAY_LONG = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const DAY_MONTH = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short' });
const monthLabel = ym => MONTH_FMT.format(parseDate(ym + '-01'));
const mondayOf = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };

/* Jours fériés en France métropolitaine */
function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4,
    f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, month - 1, day);
}
const holidayCache = {};
function holidays(y) {
  if (holidayCache[y]) return holidayCache[y];
  const e = easter(y), o = {};
  [['01-01', "Jour de l'an"], ['05-01', 'Fête du Travail'], ['05-08', 'Victoire 1945'], ['07-14', 'Fête nationale'],
   ['08-15', 'Assomption'], ['11-01', 'Toussaint'], ['11-11', 'Armistice'], ['12-25', 'Noël']].forEach(([md, n]) => { o[`${y}-${md}`] = n; });
  o[iso(addDays(e, 1))] = 'Lundi de Pâques';
  o[iso(addDays(e, 39))] = 'Ascension';
  o[iso(addDays(e, 50))] = 'Lundi de Pentecôte';
  return (holidayCache[y] = o);
}
const holidayName = dateStr => holidays(Number(dateStr.slice(0, 4)))[dateStr] || null;

/* =====================================================================
   3. DONNÉES (IndexedDB, avec copie de secours dans localStorage)
   ===================================================================== */
const DB_NAME = 'zia', STORE = 'kv', LS_KEY = 'zia-state';
function nextFullMonth() { const d = new Date(); if (d.getDate() > 1) d.setMonth(d.getMonth() + 1, 1); return iso(d).slice(0, 7); }
function defaultSettings() {
  return {
    v: 2, nightStart: '21:00', nightEnd: '06:00', pas: 0,
    base: { gare: 150, pizza: 80 },            // Gare : base du compteur · Pizza : simple repère pour l'anneau
    counterStart: nextFullMonth(),             // mois où démarre le compteur d'heures de la Gare
    counterInit: '',                           // solde de départ du compteur (h, peut être négatif)
    threshold: { gare: 35, pizza: '' },        // alerte hebdo (vide = désactivée)
    rate: { gare: '', pizza: '' },             // taux horaire brut
    cotis: { gare: 22, pizza: 22 },            // % de cotisations salariales (brut → net)
    maj: { gare: { extra: 25, night: 0, sunday: 0, holiday: 0 }, pizza: { extra: 10, night: 0, sunday: 0, holiday: 0 } }
  };
}
function defaults() {
  return {
    v: 1, start: todayISO(),
    checks: {}, notes: {}, words: {}, hideFatiha: false, tajwid: { done: 0, total: 0 }, sourates: {},
    days: {},
    shifts: [], payslips: {},
    blocks: {}, seen: {}, money: defaultMoney(), faith: defaultFaith(), unlocks: {}, biz: { projects: [] }, body: defaultBody(), cycle: defaultCycle(), z: defaultZ(), nour: { log: {}, seen: '' }, zc: null, flux: { seen: {}, saved: [], day: { d: '', n: 0, q: 0, r: 0 }, used: false },
    settings: defaultSettings(),
    ideas: [], lastExport: null, createdAt: Date.now(), updatedAt: 0
  };
}
function normalize(s) {
  const d = defaults();
  const out = Object.assign(d, s || {});
  const src = (s && s.settings) || {}, ds = defaultSettings();
  // Migration v1 → v2 : le seuil hebdo de Mister Pizza passe en « désactivé », les bases mensuelles arrivent.
  if (s && s.settings && !src.v && src.threshold && Number(src.threshold.pizza) === 35) src.threshold.pizza = '';
  out.settings = Object.assign(ds, src, { v: 2 });
  ['threshold', 'rate', 'base', 'cotis'].forEach(k => { out.settings[k] = Object.assign({}, ds[k], src[k] || {}); });
  out.settings.maj = { gare: Object.assign({}, ds.maj.gare, (src.maj || {}).gare || {}), pizza: Object.assign({}, ds.maj.pizza, (src.maj || {}).pizza || {}) };
  out.tajwid = Object.assign({ done: 0, total: 0 }, out.tajwid || {});
  ['checks', 'notes', 'words', 'sourates', 'days', 'payslips', 'blocks', 'seen'].forEach(k => { if (typeof out[k] !== 'object' || !out[k] || Array.isArray(out[k])) out[k] = {}; });
  ['shifts', 'ideas'].forEach(k => { if (!Array.isArray(out[k])) out[k] = []; });
  const dm = defaultMoney(), sm = (s && s.money) || {};
  out.money = Object.assign(dm, sm);
  ['incomes', 'fixed', 'envelopes', 'pots', 'tx'].forEach(k => { if (!Array.isArray(out.money[k])) out.money[k] = dm[k]; });
  if (typeof out.money.months !== 'object' || !out.money.months) out.money.months = {};
  if (!Array.isArray(out.money.investments)) out.money.investments = [];
  out.money.debt = Object.assign({ total: '2000', start: '', monthly: '' }, sm.debt || {});
  if (out.money.safetyGoal == null || out.money.safetyGoal === '') out.money.safetyGoal = '4000';
  if (typeof out.money.auto !== 'boolean') out.money.auto = true;
  if (out.money.life == null) out.money.life = '';
  out.money.pots.forEach(p => { if (p.safety && String(p.target || '').trim() === '') p.target = String(out.money.safetyGoal); });
  const df = defaultFaith(), sf = (s && s.faith) || {};
  out.faith = { habits: Array.isArray(sf.habits) && sf.habits.length ? sf.habits : df.habits, log: sf.log && typeof sf.log === 'object' ? sf.log : {}, pt: sf.pt && typeof sf.pt === 'object' ? sf.pt : undefined };
  out.unlocks = (s && s.unlocks && typeof s.unlocks === 'object') ? s.unlocks : {};
  out.biz = { projects: s && s.biz && Array.isArray(s.biz.projects) ? s.biz.projects : [] };
  out.body = normalizeBody(s && s.body);
  out.nour = { log: s && s.nour && s.nour.log && typeof s.nour.log === 'object' ? s.nour.log : {}, seen: (s && s.nour && s.nour.seen) || '' };
  { const sf = (s && s.flux) || {}; out.flux = { seen: sf.seen && typeof sf.seen === 'object' ? sf.seen : {}, saved: Array.isArray(sf.saved) ? sf.saved : [], day: sf.day && typeof sf.day === 'object' ? sf.day : { d: '', n: 0, q: 0, r: 0 }, used: !!sf.used }; }
  out.zc = null;
  out.cycle = normalizeCycle(s && s.cycle);
  out.garden = s && s.garden && typeof s.garden === 'object' && s.garden.st ? s.garden : undefined;
  out.faith.homeSeen = !!(s && s.faith && s.faith.homeSeen);
  out.alif = s && s.alif && typeof s.alif === 'object' ? s.alif : { 1: {}, 2: {}, 3: {}, 4: {} };
  out.z = normalizeZ(s && s.z);
  return out;
}
let dbp = null;
function idb() {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    if (!('indexedDB' in window)) return rej(new Error('no idb'));
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
async function idbGet(key) {
  const db = await idb();
  return new Promise((res, rej) => { const t = db.transaction(STORE).objectStore(STORE).get(key); t.onsuccess = () => res(t.result); t.onerror = () => rej(t.error); });
}
async function idbSet(key, val) {
  const db = await idb();
  return new Promise((res, rej) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(val, key); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); });
}
async function loadState() {
  let s = null;
  try { s = await idbGet('state'); } catch (e) { /* IndexedDB indisponible */ }
  if (!s) { try { const raw = localStorage.getItem(LS_KEY); if (raw) s = JSON.parse(raw); } catch (e) {} }
  return normalize(s);
}
let S = defaults();
let saveTimer = null;
function save(now) {
  S.updatedAt = Date.now();
  clearTimeout(saveTimer);
  const run = () => {
    const snap = JSON.parse(JSON.stringify(S));
    idbSet('state', snap).catch(() => {});
    try { localStorage.setItem(LS_KEY, JSON.stringify(snap)); } catch (e) {}
  };
  if (now) run(); else saveTimer = setTimeout(run, 250);
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && saveTimer) { clearTimeout(saveTimer); save(true); } });
async function askPersist() {
  try { if (navigator.storage && navigator.storage.persist && !(await navigator.storage.persisted())) await navigator.storage.persist(); } catch (e) {}
}

/* =====================================================================
   4. CALCULS — HEURES
   ===================================================================== */
function span(sh) {
  const s = parseDate(sh.date); const [h1, m1] = sh.start.split(':').map(Number); s.setHours(h1, m1, 0, 0);
  const e = parseDate(sh.date); const [h2, m2] = sh.end.split(':').map(Number); e.setHours(h2, m2, 0, 0);
  if (e <= s) e.setDate(e.getDate() + 1); // service qui passe minuit
  return [s, e];
}
const overlap = (a0, a1, b0, b1) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
function calc(sh, settings = S.settings) {
  const [s, e] = span(sh);
  const spanMin = Math.round((e - s) / 60000);
  const worked = Math.max(0, spanMin - (Number(sh.pause) || 0));
  const ratio = spanMin ? worked / spanMin : 0;
  const ns = toMin(settings.nightStart), ne = toMin(settings.nightEnd);
  let night = 0, sunday = 0;
  for (let d = addDays(parseDate(sh.date), -1); d <= e; d = addDays(d, 1)) {
    const w0 = new Date(d); w0.setHours(0, ns, 0, 0);
    const w1 = new Date(d); w1.setHours(0, ne, 0, 0); if (ne <= ns) w1.setDate(w1.getDate() + 1);
    night += overlap(s, e, w0, w1);
    if (d.getDay() === 0) { const n = addDays(d, 1); sunday += overlap(s, e, d, n); }
  }
  night = Math.round(night / 60000 * ratio);
  sunday = Math.round(sunday / 60000 * ratio);
  return { worked, night, sunday, holiday: sh.ferie ? worked : 0, overnight: e.getDate() !== s.getDate() };
}
function sumShifts(list) {
  const t = { worked: 0, night: 0, sunday: 0, holiday: 0, n: list.length };
  list.forEach(sh => { const c = calc(sh); t.worked += c.worked; t.night += c.night; t.sunday += c.sunday; t.holiday += c.holiday; });
  return t;
}
const shiftsIn = (ym, emp) => S.shifts.filter(x => x.date.startsWith(ym) && (!emp || x.emp === emp));
function shiftsWeek(monday, emp) {
  const a = iso(monday), b = iso(addDays(monday, 6));
  return S.shifts.filter(x => x.date >= a && x.date <= b && (!emp || x.emp === emp));
}
const sortShifts = list => list.slice().sort((a, b) => (b.date + b.start).localeCompare(a.date + a.start));

/* =====================================================================
   5. CALCULS — PARCOURS, ARABE, ROUTINE
   ===================================================================== */
function currentMonth() {
  const s = parseDate(S.start), n = new Date();
  let m = (n.getFullYear() - s.getFullYear()) * 12 + (n.getMonth() - s.getMonth()) + (n.getDate() >= s.getDate() ? 1 : 0);
  return Math.min(12, Math.max(1, m));
}
const modDone = m => m.acq.filter((_, i) => S.checks[`m${m.n}-${i}`]).length;
const modPct = m => modDone(m) / m.acq.length;
function globalPct() { let t = 0, d = 0; MONTHS.forEach(m => { t += m.acq.length; d += modDone(m); }); return Math.round(d / t * 100); }
const wordsKnown = () => WORDS.filter((_, i) => (S.words[i] || 0) >= 3).length;
function streak() {
  let c = 0, d = new Date();
  if (!S.days[iso(d)]) d = addDays(d, -1);
  while (S.days[iso(d)]) { c++; d = addDays(d, -1); }
  return c;
}
function bestStreak() {
  const ks = Object.keys(S.days).filter(k => S.days[k]).sort(); let best = 0, cur = 0, prev = null;
  ks.forEach(k => { cur = prev && iso(addDays(parseDate(prev), 1)) === k ? cur + 1 : 1; best = Math.max(best, cur); prev = k; });
  return best;
}


/* =====================================================================
   6. ARGENT (brut → net → dans ta poche)
   ===================================================================== */
const numv = v => { const n = Number(String(v ?? '').replace(',', '.')); return Number.isFinite(n) ? n : 0; };
function money(emp, t) {
  const st = S.settings, rate = numv(st.rate[emp]);
  if (!rate) return null;
  const maj = st.maj[emp] || {};
  // Gare : mensualisé, les heures en plus vont au compteur (pas payées) → on paie la base.
  // Mister Pizza : payé à l'heure, toutes les heures du mois au même taux.
  const paid = emp === 'gare' && numv(st.base.gare) ? numv(st.base.gare) * 60 : t.worked;
  const brut = paid / 60 * rate + (t.night * numv(maj.night) + t.sunday * numv(maj.sunday) + t.holiday * numv(maj.holiday)) / 100 / 60 * rate;
  const net = brut * (1 - numv(st.cotis[emp]) / 100);
  return { brut, net, poche: net * (1 - numv(st.pas) / 100) };
}
/* « -12h30 », « +8 », « 4,5 » → minutes */
function parseSigned(v) { const str = String(v ?? '').trim().replace(/\s/g, ''); if (!str) return 0; const neg = /^[-−]/.test(str); const m = parseHours(str.replace(/^[-+−]/, '')); return m == null ? 0 : (neg ? -m : m); }
const fmtSigned = m => (m > 0 ? '+' : m < 0 ? '−' : '') + fmtH(Math.abs(m));
/* Compteur d'heures de la Gare (heures en plus stockées, rattrapées en repos) */
function gareCounter() {
  const st = S.settings, base = numv(st.base.gare) * 60; if (!base) return null;
  const cur = todayISO().slice(0, 7), start = st.counterStart || cur;
  const months = [];
  let bal = parseSigned(st.counterInit);
  for (let d = parseDate(start + '-01'); iso(d).slice(0, 7) < cur; d.setMonth(d.getMonth() + 1)) {
    const ym = iso(d).slice(0, 7), w = sumShifts(shiftsIn(ym, 'gare')).worked;
    bal += w - base; months.push({ ym, w, diff: w - base, bal });
  }
  const w = sumShifts(shiftsIn(cur, 'gare')).worked;
  return { started: start <= cur, start, init: parseSigned(st.counterInit), closed: bal, months, cur: { ym: cur, w, diff: w - base }, base };
}
const eur0 = v => v.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

/* =====================================================================
   7. OUTILS D'INTERFACE
   ===================================================================== */
const ICON = {
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  idea: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/></svg>',
  prev: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>',
  tick: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7"/></svg>',
  fstar: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5c.9 5.2 2.3 6.6 7.5 7.5-5.2.9-6.6 2.3-7.5 7.5-.9-5.2-2.3-6.6-7.5-7.5 5.2-.9 6.6-2.3 7.5-7.5z"/><path d="M19 16.5c.3 1.6.8 2.1 2.4 2.4-1.6.3-2.1.8-2.4 2.4-.3-1.6-.8-2.1-2.4-2.4 1.6-.3 2.1-.8 2.4-2.4z"/></svg>',
  fcopy: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/></svg>',
  fclose: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
};
/* Mini-icônes des planètes (chemins 24×24) */
const GLYPH = {
  parcours: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 2.4"/><circle cx="12" cy="4" r="2.4" fill="currentColor"/>',
  foi: '<path d="M15.5 4.5a8 8 0 1 0 4 12.5 6.5 6.5 0 1 1-4-12.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  arabe: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  routine: '<path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  argent: '<rect x="3.5" y="6" width="17" height="12.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 12.25h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M6 6l8.5-2.5 1 2.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  heures: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  corps: '<path d="M6.5 12h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="3.8" y="7.8" width="3.2" height="8.4" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="17" y="7.8" width="3.2" height="8.4" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 10.5v3M22 10.5v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  business: '<rect x="3.5" y="7.5" width="17" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 7.5V6a3 3 0 0 1 6 0v1.5M3.5 12.5h17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  flux: '<path d="M12 3c.7 4.3 1.9 5.5 6.2 6.2-4.3.7-5.5 1.9-6.2 6.2-.7-4.3-1.9-5.5-6.2-6.2C10.1 8.5 11.3 7.3 12 3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M6 19.5h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  orbite: '<path d="M12 20.5V11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 12.5C12 8.6 9.4 6 5 6c0 4.2 2.8 6.5 7 6.5zM12 15c0-3.3 2.4-6 6.6-6 0 3.7-2.6 6-6.6 6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7.5 20.5h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  reset: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M19.5 4.5v3.8h-3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 9.2l.8 1.9 2 .2-1.5 1.3.5 2-1.8-1.1-1.8 1.1.5-2-1.5-1.3 2-.2z" fill="currentColor"/>',
  hizya: '<rect x="3.5" y="6.5" width="12" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15.5 10.5l5-3v9l-5-3z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  appr: '<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5zM12 6.5v13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  cycle: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2.2 2.6"/><path d="M12 7.5c1.8 2.3 2.8 3.9 2.8 5.2a2.8 2.8 0 0 1-5.6 0c0-1.3 1-2.9 2.8-5.2z" fill="currentColor"/>'
};
/* Géométrie : 0° = en haut, sens des aiguilles d'une montre */
const polar = (r, deg) => { const a = (deg - 90) * Math.PI / 180; return [r * Math.cos(a), r * Math.sin(a)]; };
function arc(r, a0, a1) {
  let sweep = a1 - a0; if (sweep <= 0) sweep += 360; sweep = Math.min(sweep, 359.99);
  const [x0, y0] = polar(r, a0), [x1, y1] = polar(r, a0 + sweep);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
const ringDash = (r, p) => { const c = 2 * Math.PI * r; return `stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - Math.max(0, Math.min(1, p)))).toFixed(1)}"`; };
function tween(dur, fn, done) {
  if (reduceMotion()) { fn(1); done && done(); return; }
  const t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / dur); fn(1 - Math.pow(1 - k, 3)); if (k < 1) requestAnimationFrame(step); else done && done(); };
  requestAnimationFrame(step);
}

const COACH = {
  orbite: ['Ton jardin', 'Chaque plante est un module. Elle passe de graine à pousse, arbuste, arbre en fleurs, puis grenadier, au rythme de ce que tu y fais. Touche une plante pour y aller, touche la source au centre pour ouvrir le Flux. Partout dans l\'app, le bouton rond en bas ouvre la roue des modules : touche-le, ou appuie et glisse vers un module.'],
  corpsz: ['Ton corps, à la maison', 'Trois séances par semaine, sans matériel. Trois paliers : Éveil, puis Élan dès 12 séances, puis Rayonne dès 30. Coche chaque exercice, puis « Séance terminée ». Pendant tes règles, la séance douce compte tout autant.'],
  routinez: ['Ton quart d\'heure du soir', 'Coche chaque étape ce soir. Toutes cochées, la soirée est bouclée et ta série continue. Tu peux lancer le minuteur et modifier les étapes en bas.'],
  resetz: ['Ton reset du dimanche', 'Une demi-journée, le dimanche après-midi, pour ton esprit, ton corps, ta foi, ta maison et tes rituels. Chaque case allume de la lumière ; tout coché, c\'est un reset complet. Termine par ton bilan.'],
  hizyaz: ['Hizya', 'Note chaque vidéo publiée (objectif 3 par semaine), coche tes jours de story, mets à jour tes abonnés quand tu veux pour voir ta courbe vers 2 000, et avance ton produit étape par étape.'],
  apprz: ['Trente minutes par jour', 'Deux parcours : lire l\'arabe, et le business selon les règles islamiques. Chacun avance par paliers : le suivant s\'ouvre quand tu as appliqué le précédent.'],
  cycle: ['Ton cycle, et ta foi avec', 'Note le début et la fin de tes règles : tes prières se mettent en pause toutes seules, sans toucher à ta série ni à tes 90 %. Pendant ce temps, l\'app te propose des adorations toujours possibles. Tes données restent sur ce téléphone. Ce suivi n\'est pas une méthode de contraception.'],
  parcours: ['12 mois pour te former au business', 'Fais glisser l\'anneau ou touche une lune pour choisir un mois. Chaque mois se fait dans l\'ordre :', ['Écoute et lis les ressources', 'Coche les acquis quand tu les maîtrises', 'Fais l\'exercice pratique', 'Note ce que tu retiens']],
  arabe: ['Apprendre à lire, palier après palier', 'Palier 1, les 28 lettres. Palier 2, leurs formes dans le mot. Palier 3, les voyelles. Palier 4, lire des mots. Palier 5, leur sens. Touche une lettre pour voir ses formes et l\'écouter, puis entraîne-toi au quiz : une lettre est acquise après 3 bonnes réponses, et chaque palier s\'ouvre quand le précédent est acquis.'],
  routine: ['Ta 1 h 30 quotidienne', 'L\'anneau est découpé en 4 blocs. Touche un bloc quand il est fait : les 4 faits, la journée est validée et ta série continue.'],
  budget: ['Ta méthode', 'Elle tient en 3 temps :', ['Tu te paies d\'abord : ton épargne part en début de mois', 'Tes charges fixes sont mises de côté', 'Le reste est à toi, avec un budget par jour qui s\'ajuste à chaque dépense. Les enveloppes freinent les catégories où ça file vite.']],
  foi: ['Ta régularité', 'Touche chaque prière sur le chemin du soleil pour dire comment tu l\'as faite : chez toi à l\'heure, c\'est le maximum. Coche tes autres habitudes en dessous. Pendant tes règles, les prières se mettent en pause toutes seules : ta série et tes 90 % ne bougent pas.'],
  business: ['Pourquoi c\'est verrouillé', 'Pour que l\'app reflète honnêtement tes priorités : d\'abord les compétences et la constance, ensuite le business. Chaque volet affiche ce qu\'il te reste.'],
  businessOn: ['Ton atelier', 'Un projet = un nom, une étape, et une prochaine action concrète. Rien de plus pour l\'instant.'],
  corps: ['Construire, étape par étape', 'Tu repars de l\'arrêt : 12 séances de Réveil à la maison ouvrent la salle, 36 séances de Forge ouvrent la Sculpture. Pendant une séance, touche ✓ à chaque série : le repos se lance tout seul et l\'app te dit quand monter la charge.'],
  nutri: ['Ton carburant', 'Pour prendre du muscle : un léger surplus de calories et assez de protéines. Touche un aliment quand tu le manges, la jauge se remplit. Pèse-toi une fois par semaine : l\'app ajuste ta cible si tu prends trop vite ou trop lentement.'],
  soin: ['Réparer et entretenir', 'Le muscle se construit pendant le sommeil. Note tes nuits, calcule ton heure de coucher, et garde un œil sur la fitra : chaque jauge se vide en 40 jours.'],
  heures: ['Vérifier ta paie', 'Fais glisser les deux poignées du cadran pour ton début et ta fin (la zone sombre, c\'est la nuit). L\'app cumule tes heures du mois, tes heures de nuit et du dimanche, et le compteur d\'heures stockées de la Gare.']
};
function coach(key) {
  if (S.seen[key]) return '';
  const c = COACH[key];
  return `<div class="coach" data-coach="${key}"><b>${c[0]}.</b> ${c[1]}${c[2] ? `<ol>${c[2].map(x => `<li>${x}</li>`).join('')}</ol>` : ''}<br><button data-seen="${key}">J'ai compris</button></div>`;
}
function pageHead(title, sub, key) {
  return `<header class="top"><div><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
    <div class="top-actions">
      ${key && S.seen[key] ? `<button class="icon-btn" data-unseen="${key}" aria-label="Revoir l'explication">${ICON.info}</button>` : ''}
      <button class="icon-btn" data-open="ideas" aria-label="Mes idées">${ICON.idea}</button>
      <button class="icon-btn" data-open="settings" aria-label="Réglages et sauvegarde">${ICON.gear}</button>
    </div></header>${key ? coach(key) : ''}`;
}
const checkbox = (key, label, attr = 'data-chk', on = S.checks[key]) =>
  `<label class="check"><input type="checkbox" ${attr}="${esc(key)}" ${on ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${label}</span></label>`;

let toastTimer = null;
function toast(msg, action, fn, ms = 4000) {
  const t = $('#toast'), b = $('button', t);
  $('.msg', t).textContent = msg;
  b.hidden = !action; b.textContent = action || ''; b.onclick = () => { hideToast(); fn && fn(); };
  t.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, ms);
}
function hideToast() { $('#toast').classList.remove('on'); }
function haptic() { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} }
async function deliverFile(name, text, type) {
  const blob = new Blob([text], { type });
  try {
    const file = new File([blob], name, { type });
    if (navigator.canShare && navigator.canShare({ files: [file] }) && /iPhone|iPad|Android/i.test(navigator.userAgent)) { await navigator.share({ files: [file], title: name }); return true; }
  } catch (e) { if (e && e.name === 'AbortError') return false; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  return true;
}
/* Petit indicateur circulaire (liste « Aujourd'hui ») */
const miniOrb = (p, key, mint) => `<svg class="mini-orb" viewBox="-20 -20 40 40" aria-hidden="true"><circle r="16" fill="none" stroke="var(--raise)" stroke-width="3"/><circle r="16" fill="none" stroke="var(--${mint ? 'mint' : 'gold'})" stroke-width="3" stroke-linecap="round" transform="rotate(-90)" ${ringDash(16, p)}/><svg x="-8" y="-8" width="16" height="16" viewBox="0 0 24 24" style="color:var(--ink-2)">${GLYPH[key]}</svg></svg>`;

/* =====================================================================
   8. ORBITE (accueil)
   ===================================================================== */
const PLANETS = [
  { key: 'routine', name: 'Routine', r: 66, speed: 9, phase: 210 },
  { key: 'foi', name: 'Foi', r: 98, speed: 6, phase: 330, mint: true },
  { key: 'corps', name: 'Corps', r: 98, speed: 6, phase: 150 },
  { key: 'argent', name: 'Argent', r: 130, speed: 4, phase: 70 },
  { key: 'parcours', name: 'Parcours', r: 160, speed: 2.4, phase: 150 },
  { key: 'business', name: 'Business', r: 160, speed: 2.4, phase: 330 }
];
const todayBlocks = () => (S.blocks[todayISO()] || [0, 0, 0, 0]).filter(Boolean).length;
const baseTotal = () => (numv(S.settings.base.gare) + numv(S.settings.base.pizza)) * 60 || 1;
function planetValue(k) {
  const ym = todayISO().slice(0, 7);
  if (k === 'argent') {
    if (isSetUp()) { const b = budgetOf(ym); return [b.free > 0 ? Math.max(0, b.reste) / b.free : 0, eur0(b.reste)]; }
    const w0 = sumShifts(shiftsIn(ym)).worked; return [w0 / baseTotal(), fmtH(w0)];
  }
  if (k === 'parcours') return [globalPct() / 100, `${globalPct()} %`];
  if (k === 'foi') { const sc = faithScore(); return [sc.pct / FAITH_GOAL, `${Math.round(sc.pct * 100)} % / 30 j`]; }
  if (k === 'routine') { const d = S.days[todayISO()] ? 4 : todayBlocks(); return [d / 4, `${d}/4 blocs`]; }
  if (k === 'corps') { const ph = phaseOf(S.body.phase), n = weekSessions().length; return [n / ph.perWeek, `${n}/${ph.perWeek} séances`]; }
  if (k === 'business') {
    if (S.unlocks.business) { const n = S.biz.projects.length; return [1, `${n} projet${n > 1 ? 's' : ''}`]; }
    const st = bizStatus(), d = st.skills.reduce((m, x) => m + x.d, 0), t = st.skills.reduce((m, x) => m + x.t, 0) || 1;
    return [.5 * d / t + .5 * Math.min(1, st.faith.pct / FAITH_GOAL), 'Verrouillé'];
  }
  const w = sumShifts(shiftsIn(ym)).worked; return [w / baseTotal(), fmtH(w)];
}
/* Animation du système + rotation au doigt avec inertie */
const orb = { raf: 0, t0: 0, spin: 0, vel: 0, drag: null, last: 0 };
function startOrbit() {
  stopOrbit();
  const g = $('#planets'); if (!g) return;
  const nodes = PLANETS.map(p => $(`[data-planet="${p.key}"]`, g));
  const still = reduceMotion();
  orb.t0 = performance.now() - (orb.elapsed || 0); orb.last = performance.now();
  const frame = now => {
    const dt = Math.min(50, now - orb.last) / 1000; orb.last = now;
    if (!orb.drag && Math.abs(orb.vel) > 0.01) { orb.spin += orb.vel * dt; orb.vel *= Math.pow(0.04, dt); }
    orb.elapsed = still ? 0 : now - orb.t0;
    const t = orb.elapsed / 1000;
    PLANETS.forEach((p, i) => {
      const a = p.phase + (still ? 0 : p.speed * t) + orb.spin * (70 / p.r);
      const [x, y] = polar(p.r, a);
      nodes[i].setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    });
    orb.raf = requestAnimationFrame(frame);
  };
  orb.raf = requestAnimationFrame(frame);
  const stage = $('#stage');
  stage.addEventListener('pointerdown', e => { orb.drag = { x: e.clientX, y: e.clientY, moved: false, t: performance.now() }; orb.vel = 0; });
  stage.addEventListener('pointermove', e => {
    const d = orb.drag; if (!d) return;
    const dx = e.clientX - d.x; if (Math.abs(dx) > 6 || Math.abs(e.clientY - d.y) > 6) d.moved = true;
    if (Math.abs(dx) > Math.abs(e.clientY - d.y)) { orb.spin += dx * 0.6; const dt = Math.max(1, performance.now() - d.t); orb.vel = dx * 0.6 / dt * 1000; }
    d.x = e.clientX; d.y = e.clientY; d.t = performance.now();
  });
  const end = e => {
    const d = orb.drag; orb.drag = null;
    if (d && !d.moved) { const p = e.target.closest && e.target.closest('[data-planet]'); if (p) go(p.dataset.planet); else if (e.target.closest && e.target.closest('[data-sun]')) go('flux'); }
  };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', () => { orb.drag = null; });
}
function stopOrbit() { cancelAnimationFrame(orb.raf); orb.raf = 0; }

/* =====================================================================
   9. PARCOURS — l'année en orbite
   ===================================================================== */
const P = { sel: null, rot: 0 };
function vParcours() {
  const cm = currentMonth();
  if (P.sel == null) P.sel = cm;
  P.rot = -(P.sel - 1) * 30;
  const R = 118;
  const quarters = [0, 1, 2, 3].map(q => {
    const a0 = q * 90 - 13, a1 = q * 90 + 73, [lx, ly] = polar(150, q * 90 + 30);
    return `<path d="${arc(150, a0, a1)}" fill="none" stroke="var(--orbit)" stroke-width="1.2" stroke-linecap="round"/>
      <g class="qc" data-cx="${lx.toFixed(2)}" data-cy="${ly.toFixed(2)}"><rect x="${(lx - 13).toFixed(2)}" y="${(ly - 9).toFixed(2)}" width="26" height="18" rx="9" fill="var(--bg)"/><text class="qlabel" x="${lx.toFixed(2)}" y="${ly.toFixed(2)}">T${q + 1}</text></g>`;
  }).join('');
  const moons = MONTHS.map(m => {
    const [x, y] = polar(R, (m.n - 1) * 30);
    return `<g class="moon ${m.n === P.sel ? 'sel' : ''} ${m.n === cm ? 'now' : ''}" data-moon="${m.n}" role="button" tabindex="0" aria-label="Mois ${m.n} : ${esc(m.title)}" transform="translate(${x.toFixed(2)} ${y.toFixed(2)})">
      <circle r="26" fill="transparent"/>${m.n === cm ? '<circle class="halo" r="27"/>' : ''}
      <circle class="mt" r="22"/><circle class="mp" r="22" transform="rotate(-90)" ${ringDash(22, modPct(m))}/>
      <circle class="mb" r="${m.n === P.sel ? 18 : 16}"/>
      <text class="mn">${m.n}</text></g>`;
  }).join('');
  return `${pageHead('Parcours', `<span id="psub">Mois ${cm} sur 12 · ${globalPct()} % des acquis</span>`, 'parcours')}
  <div class="dial-wrap" id="pdial">
    <svg viewBox="-172 -172 344 344" aria-label="Les 12 mois du parcours">
      <circle r="${R}" fill="none" stroke="var(--orbit)" stroke-width="1"/>
      <circle r="84" fill="var(--gold-soft)" opacity=".55"/>
      <g id="ring" transform="rotate(${P.rot})">${quarters}${moons}</g>
    </svg>
    <div class="dial-center" id="pcenter"></div>
  </div>
  <div class="dial-nav">
    <button class="btn sm quiet" data-pstep="-1" aria-label="Mois précédent">${ICON.prev}</button>
    <button class="btn sm ghost" id="pnow" ${P.sel === cm ? 'hidden' : ''}>Revenir au mois ${cm}</button>
    <button class="btn sm quiet" data-pstep="1" aria-label="Mois suivant">${ICON.next}</button>
  </div>
  <div id="mcard"></div>
  <section><h2>Par compétence</h2>
    <div class="stats-line" style="margin-bottom:18px"><div><b class="num" id="gpct">${globalPct()} %</b><span>des acquis</span></div><div><b class="num" id="mdone">${MONTHS.filter(m => modPct(m) === 1).length}</b><span>mois bouclés</span></div></div>
    <div class="skills">${Object.keys(DOMAINS).map(k => `<div class="skill" data-skill="${k}"><span>${DOMAINS[k]}${BIZ_DOMAINS.includes(k) ? ' <span class="pill gold" style="margin-left:4px">clé Business</span>' : ''}</span><span class="small muted num" data-skill-n></span><div class="bar"><i style="width:0"></i></div></div>`).join('')}</div>
  </section>`;
}
function counterRotate() {
  const r = P.rot;
  $$('#ring .moon').forEach(g => { const t = g.querySelector('text'); t.setAttribute('transform', `rotate(${-r})`); });
  $$('#ring .qc').forEach(g => g.setAttribute('transform', `rotate(${-r} ${g.dataset.cx} ${g.dataset.cy})`));
}
function pCenter() {
  const m = MONTHS[P.sel - 1], el = $('#pcenter'); if (!el) return;
  el.innerHTML = `<p class="eyebrow">Mois ${m.n} · T${Math.ceil(m.n / 3)}</p><p class="big num">${Math.round(modPct(m) * 100)}<span style="font-size:1.5rem"> %</span></p><p class="t">${esc(m.title)}</p>`;
}
function pCard(animate) {
  const m = MONTHS[P.sel - 1], el = $('#mcard'); if (!el) return;
  const done = modDone(m), note = S.notes[m.n] || '';
  el.innerHTML = `<div class="month-card">
    <p class="eyebrow">${DOMAINS[m.dom]}${m.n === currentMonth() ? ' · <span style="color:var(--mint)">en cours</span>' : ''}</p>
    <h2 style="margin:8px 0 0">${esc(m.title)}</h2>
    <p class="why">${esc(m.why)}</p>
    <div class="steps">
      <div class="step"><span class="sn">1</span><div><h3>Écouter et lire</h3><ul class="res">${m.res.map(r => `<li><b>${esc(r.t)}</b><span>${esc(r.w)}</span></li>`).join('')}</ul></div></div>
      <div class="step ${done === m.acq.length ? 'ok' : ''}" id="step2"><span class="sn">2</span><div><h3>Valider les acquis <span id="acqn">${done}/${m.acq.length}</span></h3><div class="checks">${m.acq.map((a, i) => checkbox(`m${m.n}-${i}`, esc(a))).join('')}</div></div></div>
      <div class="step"><span class="sn">3</span><div><h3>Mettre en pratique</h3><div class="exercise"><p>${esc(m.ex)}</p></div></div></div>
      <div class="step ${note.trim() ? 'ok' : ''}" id="step4"><span class="sn">4</span><div><h3><label for="note-${m.n}">Noter ce que tu retiens</label></h3><textarea id="note-${m.n}" data-note="${m.n}" style="margin-top:10px" placeholder="Idées clés, déclics, ce que tu veux appliquer…">${esc(note)}</textarea></div></div>
    </div></div>`;
  if (animate && !reduceMotion()) { el.firstElementChild.style.animation = 'rise .45s var(--ease) both'; }
}
function refreshParcours() {
  if (!$('#ring')) return;
  MONTHS.forEach(m => { const c = $(`[data-moon="${m.n}"] .mp`); if (c) { const C = 2 * Math.PI * 22; c.setAttribute('stroke-dashoffset', (C * (1 - modPct(m))).toFixed(1)); } });
  pCenter();
  const m = MONTHS[P.sel - 1], d = modDone(m);
  if ($('#acqn')) { $('#acqn').textContent = `${d}/${m.acq.length}`; $('#step2').classList.toggle('ok', d === m.acq.length); }
  $('#psub').textContent = `Mois ${currentMonth()} sur 12 · ${globalPct()} % des acquis`;
  $('#gpct').textContent = `${globalPct()} %`; $('#mdone').textContent = MONTHS.filter(x => modPct(x) === 1).length;
  Object.keys(DOMAINS).forEach(k => {
    let t = 0, dd = 0; MONTHS.filter(x => x.dom === k).forEach(x => { t += x.acq.length; dd += modDone(x); });
    const el = $(`[data-skill="${k}"]`); if (!el) return;
    $('[data-skill-n]', el).textContent = `${dd}/${t}`; $('.bar i', el).style.width = `${t ? dd / t * 100 : 0}%`;
  });
}
function selectMonth(n) {
  n = ((n - 1 + 12) % 12) + 1;
  if (n === P.sel) return;
  const from = P.rot; let to = -(n - 1) * 30;
  while (to - from > 180) to -= 360; while (to - from < -180) to += 360;
  $$('#ring .moon').forEach(g => { const on = Number(g.dataset.moon) === n; g.classList.toggle('sel', on); g.querySelector('.mb').setAttribute('r', on ? 18 : 16); });
  P.sel = n; haptic();
  $('#pnow').hidden = n === currentMonth();
  pCenter(); pCard(true);
  tween(550, k => { P.rot = from + (to - from) * k; $('#ring').setAttribute('transform', `rotate(${P.rot})`); counterRotate(); });
}
function bindParcours() {
  counterRotate(); pCenter(); pCard(false);
  requestAnimationFrame(() => requestAnimationFrame(refreshParcours));
  const wrap = $('#pdial'); let sw = null;
  wrap.addEventListener('pointerdown', e => { sw = { x: e.clientX, y: e.clientY }; });
  wrap.addEventListener('pointerup', e => {
    if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) { selectMonth(P.sel + (dx < 0 ? 1 : -1)); return; }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) { const m = e.target.closest('[data-moon]'); if (m) selectMonth(Number(m.dataset.moon)); }
  });
}

/* =====================================================================
   10. ARABE & CORAN
   ===================================================================== */
let quiz = null; const session = { ok: 0, n: 0 };
const currentQuarter = () => Math.min(3, Math.floor((currentMonth() - 1) / 3));
function constellation() {
  return WORDS.map((w, i) => {
    const r = 13.6 * Math.sqrt(i + 0.6), a = i * 137.508, [x, y] = polar(r, a), sc = Math.min(3, S.words[i] || 0);
    const on = sc >= 3;
    return `<circle class="star" data-star="${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.4 + sc * 1.25).toFixed(2)}" fill="var(--${on ? 'mint' : 'gold'})" opacity="${on ? 1 : (0.22 + sc * 0.22).toFixed(2)}" ${on ? 'style="filter:drop-shadow(0 0 4px var(--mint))"' : ''}/>`;
  }).join('');
}
function vArabe() {
  const sw = `<div class="seg" role="group" aria-label="Arabe" style="margin-top:14px"><button data-arv="lettres" aria-pressed="${AV === 'lettres'}"><span class="dot"></span>Lire les lettres</button><button data-arv="mots" aria-pressed="${AV === 'mots'}"><span class="dot"></span>${alOpen(5) ? 'Le sens des mots' : 'Le sens · verrouillé'}</button></div>`;
  if (AV !== 'mots' || !alOpen(5)) return `${foiTop('arabe')}${sw.replace('data-arv="mots"', alOpen(5) ? 'data-arv="mots"' : 'data-arv="mots" disabled')}${alOpen(5) ? '' : '<p class="hint" style="text-align:center">Palier 5, le sens des mots : il s\'ouvre quand tu sais lire 20 mots.</p>'}${vLettres()}`;
  return vMots(sw);
}
function vMots(sw) {
  const t = S.tajwid, cq = currentQuarter(), nS = SOURATES.filter(s => S.sourates[s[1]]).length;
  const fat = FATIHA.map((v, vi) => `<div class="verse"><span class="vn">Verset ${vi + 1}</span><div class="words">${v.map(w => `<button class="w" data-fw><span class="a" lang="ar">${w[0]}</span><span class="f">${esc(w[1])}</span></button>`).join('')}</div></div>`).join('');
  const steps = AR_STEPS.map((s, si) => `<div class="qtr ${si === cq ? 'cur' : ''}" style="margin-top:${si ? 18 : 0}px"><p class="eyebrow" ${si === cq ? 'style="color:var(--gold)"' : ''}>${si === cq ? 'Maintenant · ' : ''}${s.t}</p><div class="checks">${s.items.map((it, i) => checkbox(`ar${si}-${i}`, esc(it))).join('')}</div></div>`).join('');
  return `${foiTop('arabe')}${sw}
  <div class="constel">
    <svg viewBox="-112 -104 224 208" id="constel" aria-label="${wordsKnown()} mots maîtrisés sur ${WORDS.length}">${constellation()}</svg>
    <p class="constel-tip" id="ctip"></p>
  </div>
  <div class="row between" style="margin-top:6px"><p class="eyebrow">Constellation de vocabulaire</p><p class="small num"><b id="wk" style="font:400 1.5rem var(--serif);color:var(--mint)">${wordsKnown()}</b><span class="muted"> / ${WORDS.length} mots</span></p></div>
  <section style="margin-top:22px">
    <div class="quiz"><div class="qcard" id="quiz" aria-live="polite"></div></div>
    <p class="hint">Les mots que tu connais le moins reviennent plus souvent.</p>
  </section>
  <section>
    <div class="row between" style="margin-bottom:4px"><h2 style="margin:0">Al-Fatiha</h2><button class="btn sm quiet" id="toggleFat" aria-pressed="${S.hideFatiha}">${S.hideFatiha ? 'Montrer le sens' : 'Cacher le sens'}</button></div>
    <p class="hint" id="fatHint" style="margin:0 0 10px">${S.hideFatiha ? 'Touche un mot pour révéler sa traduction.' : 'Mot à mot. Cache le sens pour te tester.'}</p>
    <div id="fatiha" class="${S.hideFatiha ? 'hide' : ''}">${fat}</div>
  </section>
  <section>
    <div class="row between" style="margin-bottom:6px"><h2 style="margin:0">Sourates mémorisées</h2><span class="small muted num" id="sourN">${nS} / ${SOURATES.length}</span></div>
    <p class="hint" style="margin:0 0 6px">Coche une sourate quand tu la connais par cœur.</p>
    <div class="sour checks">${SOURATES.map(s => `<label class="check"><input type="checkbox" data-sour="${esc(s[1])}" ${S.sourates[s[1]] ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="sn">${s[0]}</span><span class="txt">${esc(s[1])}</span><span class="ar" lang="ar">${s[2]}</span></label>`).join('')}</div>
  </section>`;
}
function pickWord() {
  const weights = WORDS.map((_, i) => { const sc = S.words[i] || 0; return sc >= 3 ? 0.4 : 4 - sc; });
  const prev = quiz && quiz.idx;
  let r = Math.random() * weights.reduce((a, b) => a + b, 0), idx = 0;
  for (; idx < weights.length; idx++) { r -= weights[idx]; if (r <= 0) break; }
  idx = Math.min(idx, WORDS.length - 1);
  if (idx === prev) idx = (idx + 1 + Math.floor(Math.random() * (WORDS.length - 1))) % WORDS.length;
  return idx;
}
function nextQuiz(anim) {
  const idx = pickWord();
  const others = WORDS.map((_, i) => i).filter(i => i !== idx && WORDS[i][1] !== WORDS[idx][1]).sort(() => Math.random() - 0.5).slice(0, 3);
  quiz = { idx, opts: [idx, ...others].sort(() => Math.random() - 0.5), answered: false };
  const el = $('#quiz');
  if (anim && el && !reduceMotion()) { el.classList.add('out'); setTimeout(() => { el.classList.remove('out'); drawQuiz(); el.classList.remove('in'); void el.offsetWidth; el.classList.add('in'); }, 220); }
  else drawQuiz();
}
function drawQuiz() {
  const el = $('#quiz'); if (!el || !quiz) return;
  const w = WORDS[quiz.idx], sc = Math.min(3, S.words[quiz.idx] || 0);
  el.innerHTML = `<div class="word" lang="ar">${w[0]}</div>
    <div class="root">${w[2] ? `racine <span class="ar" lang="ar">${w[2]}</span>` : 'mot-outil'}</div>
    <div class="opts">${quiz.opts.map(o => `<button class="opt" data-q="${o}">${esc(WORDS[o][1])}</button>`).join('')}</div>
    <div class="quiz-foot"><span class="num">Session ${session.ok}/${session.n}</span>
      <span class="mastery" aria-label="Maîtrise : ${sc} sur 3">${[0, 1, 2].map(i => `<i class="${i < sc ? 'on' : ''}"></i>`).join('')}</span>
      <span id="qnext" style="min-width:96px;text-align:right"></span></div>`;
}
function answerQuiz(btn) {
  if (!quiz || quiz.answered) return;
  quiz.answered = true;
  const pick = Number(btn.dataset.q), ok = pick === quiz.idx;
  session.n++;
  if (ok) { session.ok++; S.words[quiz.idx] = (S.words[quiz.idx] || 0) + 1; haptic(); if (S.words[quiz.idx] === 3) reward(2, { msg: ['Mot maîtrisé', `${WORDS[quiz.idx][0]} · ${WORDS[quiz.idx][1]}`] }); }
  else S.words[quiz.idx] = Math.max(0, (S.words[quiz.idx] || 0) - 1);
  save();
  $$('.opt').forEach(b => { const v = Number(b.dataset.q); b.classList.add(v === quiz.idx ? 'good' : v === pick ? 'bad' : 'dim'); b.disabled = true; });
  if (!ok && !reduceMotion()) btn.classList.add('shake');
  const sc = Math.min(3, S.words[quiz.idx] || 0);
  $$('.mastery i').forEach((i, k) => i.classList.toggle('on', k < sc));
  $('#qnext').innerHTML = `<button class="btn sm" id="qgo">Suivant</button>`;
  $('#wk').textContent = wordsKnown();
  $('#constel').innerHTML = constellation();
  const star = $(`[data-star="${quiz.idx}"]`); if (star && !reduceMotion()) star.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.8)' }, { transform: 'scale(1)' }], { duration: 600, easing: 'ease-out', transformOrigin: 'center', transformBox: 'fill-box' });
  showStar(quiz.idx);
  $('#qgo').focus({ preventScroll: true });
}
function showStar(i) {
  const w = WORDS[i], sc = Math.min(3, S.words[i] || 0);
  $('#ctip').innerHTML = `<span class="ar" lang="ar" style="font-size:1.25rem">${w[0]}</span> · ${esc(w[1])} · <span class="num">${sc}/3</span>`;
}

/* =====================================================================
   11. ROUTINE — l'anneau des 4 blocs
   ===================================================================== */
function dayBlocks(k) { return S.days[k] && !S.blocks[k] ? [1, 1, 1, 1] : (S.blocks[k] || [0, 0, 0, 0]); }
function vRoutine() {
  const k = todayISO(), bl = dayBlocks(k), n = bl.filter(Boolean).length, st = streak();
  let a = 0; const GAP = 3, total = ROUTINE.reduce((s, r) => s + r[0], 0);
  const segs = ROUTINE.map((r, i) => {
    const span = r[0] / total * 360, a0 = a + GAP / 2, a1 = a + span - GAP / 2, mid = a + span / 2; a += span;
    const [lx, ly] = polar(118, mid);
    return `<path class="seg-arc ${bl[i] ? 'on' : ''}" data-block="${i}" d="${arc(118, a0, a1)}" role="button" tabindex="0" aria-pressed="${!!bl[i]}" aria-label="${r[1]}, ${r[0]} minutes"/>
      <text class="seg-lbl ${bl[i] ? 'on' : ''}" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}">${r[0]}′</text>`;
  }).join('');
  const start = addDays(mondayOf(new Date()), -21); let cells = '';
  for (let i = 0; i < 28; i++) {
    const d = addDays(start, i), key = iso(d), future = key > k, b = dayBlocks(key), p = S.days[key] ? 100 : b.filter(Boolean).length * 25;
    cells += `<button class="day ${S.days[key] ? 'on' : ''} ${key === k ? 'today' : ''}" data-day="${key}" ${future ? 'disabled' : ''} style="--p:${p}" aria-pressed="${!!S.days[key]}" aria-label="${DAY_LONG.format(d)}${S.days[key] ? ', routine faite' : ''}"><i></i><span>${d.getDate()}</span></button>`;
  }
  const last28 = Array.from({ length: 28 }, (_, i) => iso(addDays(new Date(), -i))).filter(x => S.days[x]).length;
  return `${pageHead('Routine', '1 h 30 par jour, calée sur tes deux emplois.', 'routine')}
  <div class="ring-wrap ${n === 4 ? 'complete' : ''}" id="ringWrap">
    <svg viewBox="-150 -150 300 300" aria-label="Blocs de la routine du jour">${segs}</svg>
    <div class="ring-center">${n === 4
      ? `<div><p class="big" style="color:var(--gold)">${st}<span style="font-size:1.5rem"> j</span></p><p>Journée validée · série en cours</p></div>`
      : `<div><p class="big num">${n}<span style="font-size:1.5rem;color:var(--muted)">/4</span></p><p>blocs faits aujourd'hui</p></div>`}</div>
  </div>
  <div class="blocks">${ROUTINE.map((r, i) => `<button class="block ${bl[i] ? 'on' : ''}" data-block="${i}" aria-pressed="${!!bl[i]}"><b>${r[0]} min</b><span><h3>${r[1]}</h3><span class="small muted">${r[2]}</span></span><span class="dotc">${ICON.tick}</span></button>`).join('')}</div>
  <p class="hint">Un jour chargé ? Garde au moins l'audio et l'arabe.</p>
  <section>
    <div class="stats-line"><div><b class="num">${st}</b><span>jours d'affilée</span></div><div><b class="num">${bestStreak()}</b><span>record</span></div><div><b class="num">${last28}/28</b><span>sur 4 semaines</span></div></div>
  </section>
  <section style="margin-top:28px">
    <div class="cal">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => `<span class="dh">${x}</span>`).join('')}${cells}</div>
    <p class="hint">Touche un jour passé pour le valider ou l'annuler en entier.</p>
  </section>`;
}
function toggleBlock(i) {
  const k = todayISO(), bl = dayBlocks(k).slice();
  bl[i] = bl[i] ? 0 : 1; S.blocks[k] = bl;
  const all = bl.every(Boolean), was = !!S.days[k];
  if (all) S.days[k] = true; else delete S.days[k];
  save(); askPersist(); if (bl[i]) haptic();
  render();
  if (!bl[i]) { unreward(1 + (was ? 4 : 0)); return; }
  if (all && !was) reward(5, { big: true, msg: [`Routine validée · ${streak()} jour${streak() > 1 ? 's' : ''} d'affilée`, 'Une journée de plus sur la bonne trajectoire.'] });
  else reward(1);
}

/* =====================================================================
   12. HEURES — cadran 24 h, argent, vérification de paie
   ===================================================================== */
const H = { month: todayISO().slice(0, 7), filter: 'all', form: null };
function lastShift(emp) { return sortShifts(S.shifts.filter(x => !emp || x.emp === emp))[0] || null; }
function freshForm(emp) {
  const e = emp || (lastShift() || {}).emp || 'gare', l = lastShift(e), d = todayISO();
  return { emp: e, date: d, start: l ? l.start : (e === 'gare' ? '06:00' : '18:30'), end: l ? l.end : (e === 'gare' ? '13:00' : '23:00'), pause: l ? Number(l.pause) || 0 : 0, ferie: !!holidayName(d), note: '' };
}
const m2deg = m => m / 1440 * 360;
const hhmm = m => `${pad(Math.floor(m / 60) % 24)}:${pad(m % 60)}`;
function vDial() {
  const R = 118, ns = toMin(S.settings.nightStart), ne = toMin(S.settings.nightEnd);
  let ticks = '', labels = '';
  for (let h = 0; h < 24; h++) {
    const [x0, y0] = polar(137, h * 15), [x1, y1] = polar(h % 3 ? 141 : 144, h * 15);
    ticks += `<line class="tick" x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}"/>`;
    if (h % 3 === 0) { const [lx, ly] = polar(88, h * 15); labels += `<text class="hl" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}">${pad(h)}</text>`; }
  }
  return `<div class="tdial" id="tdial">
    <svg viewBox="-160 -160 320 320" id="tdialSvg" aria-label="Cadran des heures">
      <circle class="trk" r="${R}"/>
      <path class="night" d="${arc(R, m2deg(ns), m2deg(ne))}"/>
      ${ticks}${labels}
      <path class="shift-arc" id="shiftArc" d=""/>
      <g class="handle start" id="hStart" data-h="start" role="slider" tabindex="0" aria-label="Heure de début" aria-valuemin="0" aria-valuemax="1435"><circle class="hit" r="26"/><circle class="hb" r="16"/><path d="M-3 -5 L5 0 L-3 5Z" fill="var(--gold-ink)"/></g>
      <g class="handle end" id="hEnd" data-h="end" role="slider" tabindex="0" aria-label="Heure de fin" aria-valuemin="0" aria-valuemax="1435"><circle class="hit" r="26"/><circle class="hb" r="16"/><rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="var(--gold)"/></g>
    </svg>
    <div class="tdial-center"><div><p class="big num" id="tdur"></p><p id="tsub"></p></div></div>
  </div>`;
}
function updateDial() {
  const f = H.form, R = 118; if (!$('#tdial')) return;
  const s = toMin(f.start), e = toMin(f.end);
  $('#shiftArc').setAttribute('d', s === e ? '' : arc(R, m2deg(s), m2deg(e)));
  [['#hStart', s], ['#hEnd', e]].forEach(([id, m]) => {
    const [x, y] = polar(R, m2deg(m)), g = $(id);
    g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    g.setAttribute('aria-valuenow', m); g.setAttribute('aria-valuetext', hhmm(m));
  });
  const c = calc(f);
  $('#tdur').textContent = fmtH(c.worked);
  const extra = [c.night ? `${fmtH(c.night)} de nuit` : '', c.sunday ? `${fmtH(c.sunday)} dimanche` : ''].filter(Boolean).join(' · ');
  $('#tsub').textContent = extra || (c.overnight ? 'passe minuit' : `${f.start} → ${f.end}`);
  if ($('#fStart').value !== f.start) $('#fStart').value = f.start;
  if ($('#fEnd').value !== f.end) $('#fEnd').value = f.end;
}
function bindDial() {
  const svg = $('#tdialSvg'); if (!svg) return;
  let which = null, lastQ = null;
  const toMinutes = ev => {
    const b = svg.getBoundingClientRect(), dx = ev.clientX - (b.left + b.width / 2), dy = ev.clientY - (b.top + b.height / 2);
    let deg = Math.atan2(dx, -dy) * 180 / Math.PI; if (deg < 0) deg += 360;
    return (Math.round(deg / 360 * 1440 / 5) * 5) % 1440;
  };
  $$('.handle', svg).forEach(h => {
    h.addEventListener('pointerdown', ev => { ev.preventDefault(); which = h.dataset.h; h.setPointerCapture(ev.pointerId); h.classList.add('drag'); });
    h.addEventListener('pointermove', ev => {
      if (which !== h.dataset.h) return;
      const m = toMinutes(ev); H.form[which] = hhmm(m); updateDial();
      const q = Math.floor(m / 15); if (q !== lastQ) { lastQ = q; haptic(); }
    });
    const up = () => { which = null; h.classList.remove('drag'); };
    h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    h.addEventListener('keydown', ev => {
      const step = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5, PageUp: 60, PageDown: -60 }[ev.key]; if (!step) return;
      ev.preventDefault(); const k = h.dataset.h; H.form[k] = hhmm((toMin(H.form[k]) + step + 1440) % 1440); updateDial();
    });
  });
  updateDial();
}
function pocketBlock() {
  const ym = todayISO().slice(0, 7);
  const t = { gare: sumShifts(shiftsIn(ym, 'gare')), pizza: sumShifts(shiftsIn(ym, 'pizza')) };
  const baseG = numv(S.settings.base.gare) * 60, bg = baseG || 1, bp = Math.max(numv(S.settings.base.pizza) * 60 || 4800, t.pizza.worked);
  const diff = t.gare.worked - baseG;
  return `<div class="pocket">
    <svg viewBox="-68 -68 136 136" aria-label="Heures du mois">
      <circle r="58" fill="none" stroke="var(--raise)" stroke-width="9"/><circle r="58" fill="none" stroke="var(--gold)" stroke-width="9" stroke-linecap="round" transform="rotate(-90)" ${ringDash(58, t.gare.worked / bg)}/>
      <circle r="44" fill="none" stroke="var(--raise)" stroke-width="9"/><circle r="44" fill="none" stroke="var(--mint)" stroke-width="9" stroke-linecap="round" transform="rotate(-90)" ${ringDash(44, t.pizza.worked / bp)}/>
    </svg>
    <div>
      <p class="eyebrow">Heures · ${monthLabel(ym).split(' ')[0]}</p>
      <p class="big num" style="color:var(--ink)">${fmtH(t.gare.worked + t.pizza.worked)}</p>
      <div class="lines">
        <span><i class="legend" style="background:var(--gold)"></i>Gare <b>${fmtH(t.gare.worked)}</b>${baseG ? ` / ${String(numv(S.settings.base.gare)).replace('.', ',')} h` : ''}</span>
        <span><i class="legend" style="background:var(--mint)"></i>Mister Pizza <b>${fmtH(t.pizza.worked)}</b></span>
      </div>
    </div>
  </div>`;
}
function counterBlock() {
  const c = gareCounter(); if (!c) return '';
  const startLbl = monthLabel(c.start);
  if (!c.started) return `<section style="margin-top:30px"><p class="eyebrow"><span class="edot gare" style="margin-right:6px"></span>Compteur Gare</p>
    <p style="font:400 2.5rem/1.1 var(--serif);margin-top:6px" class="num">${fmtSigned(c.init)}</p>
    <p class="small muted">Démarre le 1er ${startLbl}. Chaque mois, les heures au-delà de ${numv(S.settings.base.gare)} h s'ajoutent, celles en dessous (repos de rattrapage) se retirent.</p>
    ${c.init ? '' : '<button class="btn sm ghost" data-open="settings" style="margin-top:12px">Entrer mon solde actuel</button>'}</section>`;
  const prevLbl = c.months.length ? `fin ${monthLabel(c.months[c.months.length - 1].ym).split(' ')[0]}` : 'au départ';
  const proj = c.closed + c.cur.diff;
  const col = c.closed < 0 ? 'var(--danger)' : 'var(--gold)';
  return `<section style="margin-top:30px">
    <p class="eyebrow"><span class="edot gare" style="margin-right:6px"></span>Compteur Gare · heures stockées</p>
    <div class="row between" style="align-items:flex-end;margin-top:6px">
      <div><p style="font:400 3rem/1 var(--serif);color:${col}" class="num">${fmtSigned(c.closed)}</p><p class="small muted">${c.closed < 0 ? 'à rattraper' : 'à récupérer en repos'} · ${prevLbl}</p></div>
      <div style="text-align:right"><p class="small muted">${monthLabel(c.cur.ym).split(' ')[0]} en cours</p><p class="num" style="font-weight:600">${fmtH(c.cur.w)} / ${numv(S.settings.base.gare)} h</p><p class="small muted num">fin de mois si tu t'arrêtes là : ${fmtSigned(proj)}</p></div>
    </div>
    ${c.months.length ? `<details style="margin-top:12px"><summary class="small" style="color:var(--gold);font-weight:650;min-height:44px;display:flex;align-items:center;cursor:pointer">Détail par mois</summary>
      <div class="weeks">${c.init ? `<div class="wk"><span>Solde de départ</span><b class="num">${fmtSigned(c.init)}</b></div>` : ''}${c.months.map(m => `<div class="wk"><span style="text-transform:capitalize">${monthLabel(m.ym)}</span><b class="num">${fmtSigned(m.bal)}</b><small>${fmtH(m.w)} travaillées · ${fmtSigned(m.diff)}</small></div>`).join('')}</div></details>` : ''}
  </section>`;
}
function vHeures() {
  if (!H.form) H.form = freshForm();
  const f = H.form, mon = mondayOf(new Date()), wk = sumShifts(shiftsWeek(mon));
  const overs = Object.keys(EMP).filter(k => numv(S.settings.threshold[k]) > 0 && sumShifts(shiftsWeek(mon, k)).worked > numv(S.settings.threshold[k]) * 60);
  const backupDays = S.lastExport ? Math.floor((Date.now() - S.lastExport) / 864e5) : null;
  const needBackup = S.shifts.length >= 3 && (backupDays === null || backupDays >= 14);
  const hol = holidayName(f.date);
  return `${argentTop('heures')}
  ${pocketBlock()}
  ${counterBlock()}
  <section id="entry" style="margin-top:36px">
    <h2>Noter un service</h2>
    <div class="seg" role="group" aria-label="Employeur">${Object.keys(EMP).map(k => `<button data-emp="${k}" aria-pressed="${f.emp === k}"><span class="dot"></span>${EMP[k]}</button>`).join('')}</div>
    ${vDial()}
    <div class="time-chips">
      <label class="time-chip"><span>Début</span><input type="time" id="fStart" value="${f.start}"></label>
      <label class="time-chip"><span>Fin</span><input type="time" id="fEnd" value="${f.end}"></label>
    </div>
    <div class="group" style="margin-top:12px" id="formGroup">
      <div class="cell"><label for="fDate">Date</label><input type="date" id="fDate" value="${f.date}"></div>
      <div class="cell"><span class="lbl" id="pauseLbl">Pause</span><div class="stepper" role="group" aria-labelledby="pauseLbl"><button data-pause="-15" aria-label="Moins 15 minutes">−</button><output id="fPause" class="num">${f.pause} min</output><button data-pause="15" aria-label="Plus 15 minutes">+</button></div></div>
      <div class="cell"><label for="fFerie">Jour férié<span class="small muted" id="ferieName" style="display:block">${hol ? esc(hol) : ''}</span></label><span class="switch"><input type="checkbox" id="fFerie" ${f.ferie ? 'checked' : ''}><span></span></span></div>
      <div class="cell"><input type="text" class="full" id="fNote" value="${esc(f.note)}" placeholder="Note (facultatif)" aria-label="Note" autocomplete="off"></div>
    </div>
    <div class="form-actions">
      <button class="btn" id="saveShift">Enregistrer</button>
      <button class="btn quiet" id="dupShift" ${S.shifts.length ? '' : 'disabled'}>Dupliquer le dernier</button>
    </div>
  </section>
  <section>
    <p class="eyebrow">Cette semaine · du ${DAY_MONTH.format(mon)} au ${DAY_MONTH.format(addDays(mon, 6))}</p>
    <div class="row between" style="margin-top:6px;align-items:baseline"><p style="font:400 2.5rem/1 var(--serif)" class="num">${fmtH(wk.worked)}</p>
      <p class="small muted num" style="text-align:right">${Object.keys(EMP).map(k => `${EMP[k]} ${fmtH(sumShifts(shiftsWeek(mon, k)).worked)}`).join('<br>')}</p></div>
    ${overs.length ? `<div class="alert">${ICON.warn}<span>Seuil hebdo dépassé chez ${overs.map(k => EMP[k]).join(' et ')}. Vérifie que ces heures sup apparaissent sur ta fiche de paie.</span></div>` : ''}
  </section>
  <section id="month">${vMonth()}</section>
  ${vArchive()}
  ${needBackup ? `<div class="nudge"><span>${backupDays === null ? "Tu n'as encore jamais sauvegardé tes données." : `Dernière sauvegarde il y a ${backupDays} jours.`}</span><button class="btn sm quiet" data-export>Sauvegarder</button></div>` : ''}`;
}
function vArchive() {
  const months = [...new Set(S.shifts.map(x => x.date.slice(0, 7)))].sort().reverse();
  if (months.length < 1) return '';
  const c = gareCounter(), bal = {}; if (c) c.months.forEach(m => { bal[m.ym] = m.bal; });
  const base = numv(S.settings.base.gare) * 60;
  return `<section><h2>Archive des compteurs</h2>
    <div class="archive">${months.map(ym => { const g = sumShifts(shiftsIn(ym, 'gare')), pz = sumShifts(shiftsIn(ym, 'pizza'));
      return `<button class="arow" data-arch="${ym}"><span class="am">${monthLabel(ym)}</span>
        <span class="ac"><small>Gare</small><b class="num">${fmtH(g.worked)}</b>${base && g.n ? `<small class="num" style="color:var(--${g.worked >= base ? 'gold' : 'muted'})">${fmtSigned(g.worked - base)}</small>` : ''}</span>
        <span class="ac"><small>Compteur</small><b class="num">${bal[ym] != null ? fmtSigned(bal[ym]) : ym === todayISO().slice(0, 7) ? '<span class="muted" style="font-weight:500">en cours</span>' : '—'}</b></span>
        <span class="ac"><small>Pizza</small><b class="num">${fmtH(pz.worked)}</b></span></button>`; }).join('')}</div>
    <p class="hint">Compteur = solde de tes heures stockées à la Gare à la fin du mois. Touche un mois pour voir son détail.</p></section>`;
}
function vMonth() {
  const ym = H.month, st = S.settings;
  const blocks = Object.keys(EMP).map(k => {
    const t = sumShifts(shiftsIn(ym, k)), base = numv(st.base[k]) * 60, mo = money(k, t);
    const slip = S.payslips[`${ym}|${k}`], slipMin = slip != null && slip !== '' ? parseHours(slip) : null;
    let gap = '';
    if (slipMin != null) {
      const diff = slipMin - t.worked;
      gap = Math.abs(diff) < 1 ? `<span class="pill mint">Ça correspond</span>` : diff < 0 ? `<span class="pill danger num">Il te manque ${fmtH(-diff)}</span>` : `<span class="pill gold num">+${fmtH(diff)} sur la fiche</span>`;
    }
    const baseLine = k === 'gare' && base ? (t.worked >= base ? `<span class="pill gold num">${fmtSigned(t.worked - base)} vers ton compteur</span>` : `<span class="small muted num">Base ${numv(st.base[k])} h · ${fmtSigned(t.worked - base)}</span>`) : '<span class="small muted">Total du mois</span>';
    return `<div class="emp-block">
      <div class="head"><h3 class="row" style="gap:8px"><span class="edot ${k}"></span>${EMP[k]}</h3><b class="num">${fmtH(t.worked)}</b></div>
      <div class="row between" style="margin-top:6px;flex-wrap:wrap">${baseLine}<span class="small muted num">${fmtDec(t.worked)} h · ${t.n} service${t.n > 1 ? 's' : ''}</span></div>
      <div class="kv"><div>Nuit<b>${fmtH(t.night)}</b></div><div>Dimanche<b>${fmtH(t.sunday)}</b></div><div>Férié<b>${fmtH(t.holiday)}</b></div></div>
      <div class="payslip"><label for="slip-${k}">Heures sur ta fiche de paie</label><input id="slip-${k}" data-slip="${k}" inputmode="decimal" placeholder="ex. ${numv(st.base[k]) || '151,67'}" value="${esc(slip ?? '')}"><span>${gap}</span></div>
    </div>`;
  }).join('');
  const tot = sumShifts(shiftsIn(ym));
  const first = parseDate(ym + '-01'), last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
  let weeks = '';
  for (let m = mondayOf(first); m <= last; m = addDays(m, 7)) {
    const all = sumShifts(shiftsWeek(m)); if (!all.n) continue;
    const parts = Object.keys(EMP).map(k => { const w = sumShifts(shiftsWeek(m, k)).worked; return w ? `${EMP[k]} ${fmtH(w)}` : ''; }).filter(Boolean).join(' · ');
    const over = Object.keys(EMP).filter(k => numv(st.threshold[k]) > 0 && sumShifts(shiftsWeek(m, k)).worked > numv(st.threshold[k]) * 60);
    weeks += `<div class="wk"><span>Du ${DAY_MONTH.format(m)} au ${DAY_MONTH.format(addDays(m, 6))}</span><b class="num">${fmtH(all.worked)}</b><small>${parts}${over.length ? ` <span class="pill warn">Seuil dépassé</span>` : ''}</small></div>`;
  }
  const list = sortShifts(shiftsIn(ym, H.filter === 'all' ? null : H.filter));
  const rows = list.map(sh => {
    const c = calc(sh), d = parseDate(sh.date);
    const tags = [c.night ? `<span class="pill">Nuit ${fmtH(c.night)}</span>` : '', c.sunday ? `<span class="pill">Dim. ${fmtH(c.sunday)}</span>` : '', sh.ferie ? '<span class="pill gold">Férié</span>' : ''].join('');
    return `<button class="shift" data-edit="${sh.id}"><span class="d"><b>${d.getDate()}</b><span>${DAY_SHORT.format(d).replace('.', '')}</span></span>
      <span><span class="who"><span class="edot ${sh.emp}"></span>${EMP[sh.emp]}</span><span class="when">${sh.start} → ${sh.end}${Number(sh.pause) ? ` · pause ${sh.pause} min` : ''}</span>${sh.note ? `<span class="when">${esc(sh.note)}</span>` : ''}${tags ? `<span class="tags">${tags}</span>` : ''}</span>
      <span class="dur">${fmtH(c.worked)}</span></button>`;
  }).join('');
  return `<div class="month-nav"><h2>${monthLabel(ym)}</h2><div class="row" style="gap:0">
      <button class="icon-btn" data-mnav="-1" aria-label="Mois précédent">${ICON.prev}</button>
      <button class="icon-btn" data-mnav="1" aria-label="Mois suivant" ${ym >= todayISO().slice(0, 7) ? 'disabled style="opacity:.3"' : ''}>${ICON.next}</button></div></div>
    <p class="small muted num" style="margin:-4px 0 6px">Total ${fmtH(tot.worked)} (${fmtDec(tot.worked)} h) · ${tot.n} service${tot.n > 1 ? 's' : ''}</p>
    ${blocks}
    <p class="hint">Compare ces totaux avec ta fiche de paie. Nuit, dimanche et férié t'aident à vérifier les majorations.</p>
    ${weeks ? `<h3 style="margin:30px 0 8px">Semaines</h3><div class="weeks">${weeks}</div>` : ''}
    <div class="row between" style="margin:30px 0 10px"><h3>Historique</h3><button class="btn sm ghost" id="csv" ${tot.n ? '' : 'disabled'}>Exporter en CSV</button></div>
    <div class="filters" role="group" aria-label="Filtrer par employeur">
      <button class="chip" data-filter="all" aria-pressed="${H.filter === 'all'}">Tous</button>
      ${Object.keys(EMP).map(k => `<button class="chip" data-filter="${k}" aria-pressed="${H.filter === k}">${EMP[k]}</button>`).join('')}
    </div>
    <div>${rows || `<p class="empty">Aucun service noté en ${monthLabel(ym)}.</p>`}</div>`;
}
function readForm() {
  const f = H.form; if (!$('#fDate')) return f;
  f.date = $('#fDate').value || todayISO(); f.start = $('#fStart').value || f.start; f.end = $('#fEnd').value || f.end;
  f.ferie = $('#fFerie').checked; f.note = $('#fNote').value.trim();
  return f;
}
function saveShift() {
  const f = readForm();
  if (f.start === f.end) { toast('Le début et la fin sont identiques.'); return; }
  const sh = { id: uid(), emp: f.emp, date: f.date, start: f.start, end: f.end, pause: Number(f.pause) || 0, ferie: !!f.ferie, note: f.note, created: Date.now() };
  S.shifts.push(sh); save(); askPersist(); haptic();
  H.month = sh.date.slice(0, 7); H.form = freshForm(sh.emp);
  render();
  toast(`${EMP[sh.emp]} · ${fmtH(calc(sh).worked)} enregistré`, 'Annuler', () => { S.shifts = S.shifts.filter(x => x.id !== sh.id); save(); render(); });
}
function dupLast() {
  const l = lastShift(); if (!l) return;
  const d = $('#fDate').value || todayISO();
  H.form = { emp: l.emp, date: d, start: l.start, end: l.end, pause: Number(l.pause) || 0, ferie: !!holidayName(d), note: l.note || '' };
  render();
  const g = $('#tdial'); if (g && !reduceMotion()) { g.classList.remove('flash'); void g.offsetWidth; g.classList.add('flash'); }
  toast('Dernier service repris. Vérifie la date, puis enregistre.');
}
function exportCSV() {
  const ym = H.month, list = shiftsIn(ym).slice().sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
  const n = v => (v / 60).toFixed(2).replace('.', ','), q = s => `"${String(s ?? '').replace(/"/g, '""')}"`, hm = v => fmtH(v).replace(' h ', ':');
  const lines = [['Date', 'Jour', 'Employeur', 'Début', 'Fin', 'Pause (min)', 'Heures (décimal)', 'Heures (h:min)', 'Dont nuit', 'Dont dimanche', 'Férié', 'Note'].join(';')];
  list.forEach(sh => { const c = calc(sh), d = parseDate(sh.date);
    lines.push([sh.date.split('-').reverse().join('/'), DAY_SHORT.format(d).replace('.', ''), EMP[sh.emp], sh.start, sh.end, sh.pause || 0, n(c.worked), hm(c.worked), n(c.night), n(c.sunday), sh.ferie ? 'oui' : 'non', q(sh.note)].join(';')); });
  lines.push('');
  Object.keys(EMP).forEach(k => { const t = sumShifts(shiftsIn(ym, k)); if (t.n) lines.push([`Total ${EMP[k]}`, '', '', '', '', '', n(t.worked), hm(t.worked), n(t.night), n(t.sunday), n(t.holiday), ''].join(';')); });
  const t = sumShifts(list); lines.push(['Total', '', '', '', '', '', n(t.worked), hm(t.worked), n(t.night), n(t.sunday), n(t.holiday), ''].join(';'));
  deliverFile(`heures-${ym}.csv`, '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
}
function openShift(id) {
  const sh = S.shifts.find(x => x.id === id); if (!sh) return;
  const body = $('#shiftSheetBody');
  body.innerHTML = `<div class="grab"></div>
    <div class="sheet-top"><button class="link-btn" data-close style="text-align:left">Annuler</button><h2 id="shiftSheetTitle">Modifier</h2><button class="link-btn" id="eSave" style="text-align:right">OK</button></div>
    <div class="seg" role="group" aria-label="Employeur">${Object.keys(EMP).map(k => `<button data-eemp="${k}" aria-pressed="${sh.emp === k}"><span class="dot"></span>${EMP[k]}</button>`).join('')}</div>
    <div class="group" style="margin-top:12px">
      <div class="cell"><label for="eDate">Date</label><input type="date" id="eDate" value="${sh.date}"></div>
      <div class="cell"><label for="eStart">Début</label><input type="time" id="eStart" value="${sh.start}"></div>
      <div class="cell"><label for="eEnd">Fin</label><input type="time" id="eEnd" value="${sh.end}"></div>
      <div class="cell"><label for="ePause">Pause</label><input type="number" inputmode="numeric" min="0" step="5" id="ePause" value="${Number(sh.pause) || 0}"><span class="unit">min</span></div>
      <div class="cell"><label for="eFerie">Jour férié</label><span class="switch"><input type="checkbox" id="eFerie" ${sh.ferie ? 'checked' : ''}><span></span></span></div>
      <div class="cell"><input type="text" class="full" id="eNote" value="${esc(sh.note || '')}" placeholder="Note (facultatif)" aria-label="Note"></div>
    </div>
    <button class="btn danger block" style="margin-top:22px" id="eDel">Supprimer ce service</button>`;
  body.dataset.id = id;
  $('#shiftSheet').showModal();
}
function commitShiftEdit() {
  const id = $('#shiftSheetBody').dataset.id, sh = S.shifts.find(x => x.id === id); if (!sh) return;
  const st = $('#eStart').value, en = $('#eEnd').value;
  if (!st || !en || st === en) { toast('Vérifie les heures de début et de fin.'); return; }
  sh.emp = $('[data-eemp][aria-pressed="true"]').dataset.eemp; sh.date = $('#eDate').value || sh.date; sh.start = st; sh.end = en;
  sh.pause = Math.max(0, Number($('#ePause').value) || 0); sh.ferie = $('#eFerie').checked; sh.note = $('#eNote').value.trim();
  save(); $('#shiftSheet').close(); render(); toast('Service modifié');
}
function deleteShift() {
  const id = $('#shiftSheetBody').dataset.id, i = S.shifts.findIndex(x => x.id === id); if (i < 0) return;
  const [removed] = S.shifts.splice(i, 1);
  save(); $('#shiftSheet').close(); render();
  toast('Service supprimé', 'Annuler', () => { S.shifts.push(removed); save(); render(); }, 6000);
}


/* =====================================================================
   12 bis. ARGENT — budget « reste à vivre » + enveloppes + cagnottes
   Méthode : 1) on se paie d'abord (épargne), 2) on met de côté les
   charges fixes, 3) le reste se dépense librement, avec un budget par
   jour qui s'ajuste à chaque dépense. Les enveloppes limitent les
   catégories où l'argent file vite.
   ===================================================================== */
const CATS = [
  ['courses', 'Courses'], ['resto', 'Restos & snacks'], ['transport', 'Essence & transport'], ['sorties', 'Sorties & loisirs'],
  ['shopping', 'Shopping'], ['maison', 'Maison'], ['sante', 'Santé'], ['abos', 'Abonnements'], ['cadeaux', 'Cadeaux & dons'],
  ['formation', 'Livres & formation'], ['divers', 'Divers']
];
const catName = id => (CATS.find(c => c[0] === id) || [id, 'Divers'])[1];
const INC_CATS = [['salaire', 'Salaire'], ['virement', 'Virement reçu'], ['vente', 'Vente'], ['rembours', 'Remboursement'], ['autre', 'Autre rentrée']];
const incName = id => (INC_CATS.find(c => c[0] === id) || [id, 'Rentrée'])[1];
function defaultMoney() {
  return {
    incomes: [
      { id: 'inc-gare', label: 'Salaire Gare', amount: '', day: 31, src: 'gare' },
      { id: 'inc-pizza', label: 'Salaire Mister Pizza', amount: '', day: 5, src: 'pizza' },
      { id: 'inc-femme', label: 'Virement de ma femme', amount: '', day: 1, src: '' }
    ],
    fixed: [
      { id: 'fx-loyer', label: 'Loyer', amount: '', day: 5 },
      { id: 'fx-energie', label: 'Électricité & gaz', amount: '', day: 10 },
      { id: 'fx-internet', label: 'Internet & téléphone', amount: '', day: 12 },
      { id: 'fx-assurance', label: 'Assurances', amount: '', day: 15 }
    ],
    envelopes: [{ id: 'env-courses', cat: 'courses', limit: '' }, { id: 'env-resto', cat: 'resto', limit: '' }, { id: 'env-transport', cat: 'transport', limit: '' }],
    pots: [{ id: 'pot-secu', name: 'Épargne de sécurité', target: '4000', start: '', monthly: '', deadline: '', safety: true }],
    debt: { total: '2000', start: '', monthly: '' }, safetyGoal: '4000', investments: [], auto: true, life: '',
    tx: [], months: {}
  };
}
const eur2 = v => v.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
const A = { open: new Set(), view: 'heures', month: todayISO().slice(0, 7), kind: 'exp', cat: 'courses', catFilter: 'all' };
try { const v = localStorage.getItem('zia-argent-view'); if (v === 'budget' || v === 'heures') A.view = v; } catch (e) {}
const prevMonth = ym => { const d = parseDate(ym + '-01'); d.setMonth(d.getMonth() - 1); return iso(d).slice(0, 7); };
const daysIn = ym => { const d = parseDate(ym + '-01'); return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); };

function expectedIncome(inc) {
  // Plus aucune prévision depuis les heures : seul un montant fixe saisi sert d'« attendu ».
  return { v: String(inc.amount).trim() !== '' ? numv(inc.amount) : 0, est: false };
}
const txIn = (ym, kind) => S.money.tx.filter(t => t.date.startsWith(ym) && (!kind || t.kind === kind));
function potBalance(p, upTo) {
  let b = numv(p.start);
  S.money.tx.forEach(t => { if (t.pot === p.id && (!upTo || t.date.slice(0, 7) <= upTo)) b += t.kind === 'save' ? numv(t.amount) : t.kind === 'withdraw' ? -numv(t.amount) : 0; });
  return b;
}
/* ----- Plan automatique : combien pour la dette et l'épargne ce mois-ci ----- */
const STARTER_CUSHION = 1000, PLAN_MARGIN = 0.10;
function lifeBudget(ym) {
  if (String(S.money.life).trim() !== '') return { v: numv(S.money.life), src: 'manuel' };
  const env = S.money.envelopes.reduce((a, e) => a + numv(e.limit), 0), hist = avgSpend(ym);
  if (!env && !hist) return { v: 0, src: 'inconnu' };
  return hist > env ? { v: Math.round(hist), src: 'historique' } : { v: env, src: 'enveloppes' };
}
function autoPlan(ym, incTotal, fixTotal, carry = 0) {
  const M = S.money, L = lifeBudget(ym);
  if (!(incTotal > 0)) return { ok: false, why: 'revenus', life: L };
  if (!(L.v > 0)) return { ok: false, why: 'vie', life: L };
  const others = M.pots.filter(p => !p.safety).reduce((a, p) => a + numv(p.monthly), 0);
  const remDebt = Math.max(0, numv(M.debt.total) - debtRepaid(prevMonth(ym)));
  const sp = M.pots.find(p => p.safety), safeBal = sp ? potBalance(sp, prevMonth(ym)) : 0;
  const safeNeed = Math.max(0, (numv(M.safetyGoal) || 4000) - safeBal);
  const avail = incTotal + carry - fixTotal - L.v - others;
  const surplus = Math.max(0, Math.floor(avail * (1 - PLAN_MARGIN) / 10) * 10);
  let phase, ratio;
  if (remDebt > 0 && safeBal < STARTER_CUSHION) { phase = 1; ratio = 0.5; }
  else if (remDebt > 0) { phase = 2; ratio = 0.8; }
  else if (safeNeed > 0) { phase = 3; ratio = 0; }
  else { phase = 4; ratio = 0; }
  let debt = Math.min(remDebt, Math.floor(surplus * ratio / 10) * 10), safety = Math.min(safeNeed, surplus - debt);
  let left = surplus - debt - safety;
  if (left > 0 && debt < remDebt) { const add = Math.min(left, remDebt - debt); debt += add; left -= add; }
  if (left > 0 && safety < safeNeed) { const add = Math.min(left, safeNeed - safety); safety += add; left -= add; }
  return { ok: true, auto: true, avail, surplus, debt, safety, extra: left, phase: surplus <= 0 ? 0 : phase, life: L, others, remDebt, safeBal };
}
function planFor(ym, incTotal, fixTotal, carry = 0) {
  const a = autoPlan(ym, incTotal, fixTotal, carry), o = (S.money.months[ym] || {}).plan;
  if (o && (o.debt !== '' || o.safety !== '')) return { ...a, ok: true, auto: false, debt: o.debt !== '' ? numv(o.debt) : (a.debt || 0), safety: o.safety !== '' ? numv(o.safety) : (a.safety || 0) };
  return a;
}
const PHASE_TXT = [
  'Ce mois-ci, tes revenus couvrent tout juste tes charges et ton budget de vie. Rien n\'est réservé : chaque euro remboursé ou épargné est un bonus.',
  'Tant que ton épargne de sécurité est sous 1 000 €, le surplus est partagé moitié-moitié : tu rembourses tout en te construisant un premier coussin.',
  'Premier coussin atteint : 80 % du surplus va à la dette pour t\'en libérer vite, 20 % continue vers ton objectif de sécurité.',
  'Dette soldée : tout le surplus part vers ton épargne de sécurité.',
  'Fondations posées : ce qui reste peut aller à l\'investissement.'
];
function vPlanCard(b) {
  if (!S.money.auto) return '';
  const P = b.plan, ym = A.month;
  if (!P.ok) return `<div class="plan-card"><p class="eyebrow">Plan du mois</p><p style="margin-top:8px">${P.why === 'revenus' ? 'Le plan se calcule dès que tu saisis un revenu reçu pour ce mois (dans « Revenus reçus », juste en dessous). Il se réajuste à chaque nouvelle rentrée.' : 'Indique ton <b>budget de vie</b> (courses, essence, sorties…) ou des plafonds d\'enveloppes : l\'app doit savoir ce qu\'il te faut pour vivre avant de répartir le reste.'}</p><button class="btn sm ghost" ${P.why === 'revenus' ? 'data-openinc' : 'data-bsetup'} style="margin-top:12px">${P.why === 'revenus' ? 'Saisir un revenu reçu' : 'Compléter mon mois type'}</button></div>`;
  const o = (S.money.months[ym] || {}).plan, edited = !P.auto;
  return `<div class="plan-card">
    <div class="row between"><p class="eyebrow">Plan du mois · ${edited ? 'modifié par toi' : 'calculé par l\'app'}</p></div>
    <div class="plan-split">
      <div><span>Dette</span><b class="num">${eur0(P.debt)}</b></div>
      <div><span>Épargne de sécurité</span><b class="num">${eur0(P.safety)}</b></div>
    </div>
    <p class="small muted">Disponible après charges fixes et budget de vie (${eur0(P.life.v)}${P.life.src === 'historique' ? ', ta moyenne des 3 derniers mois' : P.life.src === 'enveloppes' ? ', tes enveloppes' : ''}) : ${eur0(Math.max(0, P.avail))}. L'app en répartit 90 % et te laisse 10 % de marge${P.extra ? `, plus ${eur0(P.extra)} non affectés` : ''}.</p>
    <p class="small" style="margin-top:8px">${PHASE_TXT[P.phase]} Le plan se réajuste à chaque revenu reçu.</p>
    ${edited && P.debt + P.safety > Math.max(0, P.avail) ? `<div class="alert" style="margin-top:10px">${ICON.warn}<span>Ton plan dépasse ton disponible de ${eur0(P.debt + P.safety - Math.max(0, P.avail))} : ce sera pris sur ton budget de vie.</span></div>` : ''}
    <div id="planEdit"></div>
    <div class="row" style="margin-top:12px;flex-wrap:wrap">${edited ? '<button class="btn sm quiet" data-planreset>Revenir au calcul auto</button>' : ''}<button class="btn sm ghost" data-planedit>Modifier ce mois</button></div>
  </div>`;
}
function budgetOf(ym) {
  const M = S.money, st = M.months[ym] || {};
  const incomes = M.incomes.map(i => { const e = expectedIncome(i), rec = st.inc && st.inc[i.id] != null ? numv(st.inc[i.id]) : null; return { ...i, exp: e.v, rec, val: rec != null ? rec : 0 }; });
  const extraInc = txIn(ym, 'inc').reduce((a, t) => a + numv(t.amount), 0), fromPots = txIn(ym, 'withdraw').reduce((a, t) => a + numv(t.amount), 0);
  const incTotal = incomes.reduce((a, i) => a + i.val, 0) + extraInc + fromPots;
  const fixed = M.fixed.map(f => ({ ...f, val: numv(f.amount), paid: !!(st.paid && st.paid[f.id]) }));
  const fixTotal = fixed.reduce((a, f) => a + f.val, 0);
  const carry = st.carry != null && st.carry !== '' ? numv(st.carry) : 0;
  const P = M.auto ? planFor(ym, incTotal, fixTotal, carry) : null;
  const pots = M.pots.map(p => { const done = txIn(ym, 'save').filter(t => t.pot === p.id).reduce((a, t) => a + numv(t.amount), 0), plan = P && p.safety ? (P.ok ? P.safety : 0) : numv(p.monthly); return { ...p, done, plan, val: Math.max(plan, done), bal: potBalance(p) }; });
  const invested = txIn(ym, 'invest').reduce((a, t) => a + numv(t.amount), 0);
  const saveTotal = pots.reduce((a, p) => a + p.val, 0) + invested;
  const dTot = numv(M.debt.total), remStart = Math.max(0, dTot - debtRepaid(prevMonth(ym)));
  const dDone = txIn(ym, 'debt').reduce((a, t) => a + numv(t.amount), 0), dPlan = Math.min(P ? (P.ok ? P.debt : 0) : numv(M.debt.monthly), remStart);
  const debt = { plan: dPlan, done: dDone, val: Math.max(dPlan, dDone), remStart };
  const free = carry + incTotal - fixTotal - saveTotal - debt.val;
  const exps = txIn(ym, 'exp'), spent = exps.reduce((a, t) => a + numv(t.amount), 0);
  const byCat = {}; exps.forEach(t => { byCat[t.cat] = (byCat[t.cat] || 0) + numv(t.amount); });
  const cur = todayISO().slice(0, 7), dim = daysIn(ym), today = new Date().getDate();
  const daysLeft = ym === cur ? dim - today + 1 : ym > cur ? dim : 0;
  const elapsed = ym === cur ? (today - 1) / dim : ym < cur ? 1 : 0;
  const reste = free - spent;
  return { plan: P, carry, incomes, extraInc, fromPots, incTotal, fixed, fixTotal, pots, saveTotal, invested, debt, free, spent, byCat, reste, daysLeft, elapsed, dim, exps, envelopes: M.envelopes.map(e => ({ ...e, lim: numv(e.limit), sp: byCat[e.cat] || 0 })) };
}
const isSetUp = () => S.money.incomes.some(i => String(i.amount).trim() !== '') || S.money.fixed.some(f => numv(f.amount) > 0) || Object.values(S.money.months).some(m => m.inc && Object.keys(m.inc).length);

function argentTop(view) {
  const sub = view === 'budget' ? 'Tu te paies d\'abord, le reste est à toi.' : 'Chaque heure notée, chaque compteur à jour.';
  return `${pageHead('Argent', sub, view === 'budget' ? 'budget' : 'heures')}
  <div class="seg" role="group" aria-label="Section" style="margin-top:20px">
    <button data-aview="budget" aria-pressed="${view === 'budget'}"><span class="dot"></span>Budget</button>
    <button data-aview="heures" aria-pressed="${view === 'heures'}"><span class="dot"></span>Heures</button>
  </div>`;
}
function budgetRing(b) {
  const spentP = b.free > 0 ? b.spent / b.free : (b.spent > 0 ? 1 : 0), over = spentP > b.elapsed + 0.08;
  return `<svg viewBox="-68 -68 136 136" aria-label="Temps écoulé et budget dépensé">
    <circle r="58" fill="none" stroke="var(--raise)" stroke-width="6"/><circle r="58" fill="none" stroke="var(--muted)" stroke-width="6" stroke-linecap="round" transform="rotate(-90)" ${ringDash(58, b.elapsed)} opacity=".6"/>
    <circle r="45" fill="none" stroke="var(--raise)" stroke-width="11"/><circle r="45" fill="none" stroke="var(--${spentP > 1 ? 'danger' : over ? 'warn' : 'gold'})" stroke-width="11" stroke-linecap="round" transform="rotate(-90)" ${ringDash(45, spentP)}/>
    <text y="-4" text-anchor="middle" style="font:400 22px var(--serif);fill:var(--ink)">${Math.round(Math.min(spentP, 9.99) * 100)} %</text>
    <text y="14" text-anchor="middle" style="font-size:8.5px;font-weight:700;letter-spacing:.1em;fill:var(--muted)">DÉPENSÉ</text>
  </svg>`;
}
function vBudget() {
  const ym = A.month, b = budgetOf(ym), cur = todayISO().slice(0, 7), isCur = ym === cur;
  const daily = b.daysLeft ? b.reste / b.daysLeft : 0;
  const spentP = b.free > 0 ? b.spent / b.free : 0;
  const pace = b.elapsed > 0.05 ? b.spent / Math.max(1, Math.round(b.elapsed * b.dim)) : 0;
  const projEnd = isCur && pace ? b.free - (b.spent + pace * b.daysLeft) : null;
  let status = '';
  if (b.reste < 0) status = `<span class="pill danger">Budget dépassé de ${eur0(-b.reste)}</span>`;
  else if (isCur && spentP > b.elapsed + 0.08) status = '<span class="pill warn">Tu dépenses plus vite que le temps passe</span>';
  else if (isCur && b.spent) status = '<span class="pill mint">Dans les clous</span>';

  const setup = isSetUp() ? '' : `<div class="coach" style="background:var(--surface)"><b>Commence par ton mois type.</b> Indique tes revenus, tes charges fixes et ce que tu veux épargner : l'app calcule ensuite ce que tu peux dépenser chaque jour.<br><button data-bsetup>Configurer mon mois type</button></div>`;

  const kinds = [['exp', 'Dépense'], ['inc', 'Rentrée']];
  const chips = (A.kind === 'exp' ? CATS : INC_CATS).map(([id, n]) => `<button class="chip" data-bcat="${id}" aria-pressed="${A.cat === id}">${n}</button>`).join('');

  const envs = b.envelopes.filter(e => e.lim > 0);
  const unalloc = b.free - envs.reduce((a, e) => a + e.lim, 0);
  const envRows = envs.map(e => {
    const p = e.sp / e.lim, st = p > 1 ? 'danger' : p > 0.8 ? 'warn' : 'gold';
    return `<div class="env"><div class="row between"><span>${catName(e.cat)}</span><span class="num small"><b>${eur0(Math.max(0, e.lim - e.sp))}</b> <span class="muted">restants sur ${eur0(e.lim)}</span></span></div>
      <div class="bar"><i style="width:${Math.min(100, p * 100)}%;background:var(--${st})"></i></div>${p > 1 ? `<p class="small" style="color:var(--danger);margin-top:4px">Dépassée de ${eur0(e.sp - e.lim)}</p>` : ''}</div>`;
  }).join('');

  const pots = b.pots.filter(p => p.name);
  const potRows = pots.map(p => {
    const tgt = numv(p.target) || (p.safety ? 3 * (b.fixTotal + (avgSpend() || 0)) : 0);
    const prog = tgt ? p.bal / tgt : 0;
    let eta = '';
    if (tgt && p.bal < tgt && p.plan > 0) { const n = Math.ceil((tgt - p.bal) / p.plan), d = parseDate(ym + '-01'); d.setMonth(d.getMonth() + n); eta = `atteint vers ${monthLabel(iso(d).slice(0, 7))}`; }
    if (tgt && p.bal >= tgt) eta = 'objectif atteint';
    let need = '';
    if (tgt && p.deadline && p.bal < tgt) { const m = Math.max(1, (parseDate(p.deadline + '-01').getFullYear() - parseDate(ym + '-01').getFullYear()) * 12 + parseDate(p.deadline + '-01').getMonth() - parseDate(ym + '-01').getMonth()); need = ` · il faut ${eur0((tgt - p.bal) / m)}/mois pour ${monthLabel(p.deadline)}`; }
    const done = p.plan > 0 && p.done >= p.plan;
    return `<div class="pot">
      <svg viewBox="-24 -24 48 48" class="pot-ring" aria-hidden="true"><circle r="19" fill="none" stroke="var(--raise)" stroke-width="5"/><circle r="19" fill="none" stroke="var(--mint)" stroke-width="5" stroke-linecap="round" transform="rotate(-90)" ${ringDash(19, prog)}/></svg>
      <div class="grow"><b>${esc(p.name)}</b><p class="small muted num">${eur0(p.bal)}${tgt ? ` sur ${eur0(tgt)}${p.safety && !numv(p.target) ? ' (3 mois de dépenses)' : ''}` : ''}</p>${eta || need ? `<p class="small muted">${eta}${need}</p>` : ''}</div>
      <div style="display:grid;gap:6px;justify-items:end">${p.plan > 0 ? (done ? '<span class="pill mint">Versé</span>' : `<button class="btn sm" data-psave="${p.id}">Verser ${eur0(p.plan - p.done)}</button>`) : ''}<button class="btn sm quiet" data-psave="${p.id}" data-custom="1">${p.plan > 0 ? 'Autre montant' : 'Verser'}</button></div>
    </div>`;
  }).join('');

  const list = b.exps.concat(txIn(ym, 'inc'), txIn(ym, 'save'), txIn(ym, 'withdraw'), txIn(ym, 'debt'), txIn(ym, 'invest')).filter(t => A.catFilter === 'all' || t.cat === A.catFilter).sort((x, y) => (y.date + (y.created || 0)).localeCompare(x.date + (x.created || 0)));
  const txRows = list.map(t => {
    const d = parseDate(t.date), neg = ['exp', 'save', 'debt', 'invest'].includes(t.kind);
    const lbl = t.kind === 'exp' ? catName(t.cat) : t.kind === 'inc' ? incName(t.cat) : t.kind === 'debt' ? 'Remboursement de la dette' : t.kind === 'invest' ? `Investissement · ${esc((S.money.investments.find(i => i.id === t.inv) || {}).name || '')}` : t.kind === 'save' ? `Épargne · ${esc((S.money.pots.find(p => p.id === t.pot) || {}).name || '')}` : `Retrait · ${esc((S.money.pots.find(p => p.id === t.pot) || {}).name || '')}`;
    return `<button class="shift" data-tx="${t.id}"><span class="d"><b>${d.getDate()}</b><span>${DAY_SHORT.format(d).replace('.', '')}</span></span>
      <span><span class="who">${lbl}</span>${t.note ? `<span class="when">${esc(t.note)}</span>` : ''}</span>
      <span class="dur" style="color:${neg ? 'var(--ink)' : 'var(--mint)'}">${neg ? '−' : '+'}${eur2(numv(t.amount))}</span></button>`;
  }).join('');
  const usedCats = [...new Set(b.exps.map(t => t.cat))];

  return `${argentTop('budget')}
  ${setup}
  <div class="month-nav" style="margin-top:26px"><p class="eyebrow" style="text-transform:uppercase">${monthLabel(ym)}</p><div class="row" style="gap:0">
    <button class="icon-btn" data-bnav="-1" aria-label="Mois précédent">${ICON.prev}</button>
    <button class="icon-btn" data-bnav="1" aria-label="Mois suivant" ${ym >= cur ? 'disabled style="opacity:.3"' : ''}>${ICON.next}</button></div></div>
  <div class="pocket" style="margin-top:0">
    ${budgetRing(b)}
    <div>
      <p class="eyebrow">${isCur ? 'Reste à dépenser' : b.reste >= 0 ? 'Reste en fin de mois' : 'Dépassement'}</p>
      <p class="big num" style="${b.reste < 0 ? 'color:var(--danger)' : ''}">${eur0(b.reste)}</p>
      ${isCur && b.reste > 0 ? `<p class="small" style="margin-top:6px">soit <b class="num">${eur0(daily)}</b> par jour pendant ${b.daysLeft} jour${b.daysLeft > 1 ? 's' : ''}</p>` : ''}
      <div style="margin-top:8px">${status}</div>
    </div>
  </div>
  ${projEnd != null && b.spent > 0 ? `<p class="hint">À ce rythme (${eur0(pace)} par jour), tu finiras le mois à <b style="color:var(--${projEnd < 0 ? 'danger' : 'mint'})">${projEnd < 0 ? '−' : '+'}${eur0(Math.abs(projEnd))}</b>.</p>` : ''}

  ${isCur ? `<section style="margin-top:30px" id="quick">
    <div class="seg" role="group" aria-label="Type">${kinds.map(([k, n]) => `<button data-bkind="${k}" aria-pressed="${A.kind === k}"><span class="dot"></span>${n}</button>`).join('')}</div>
    <label class="amount"><input id="bAmount" type="text" inputmode="decimal" placeholder="0" autocomplete="off" aria-label="Montant en euros"><span>€</span></label>
    <div class="chips">${chips}</div>
    <div class="group" style="margin-top:12px">
      <div class="cell"><input type="text" class="full" id="bNote" placeholder="Note (facultatif)" aria-label="Note" autocomplete="off"></div>
      <div class="cell"><label for="bDate">Date</label><input type="date" id="bDate" value="${todayISO()}"></div>
    </div>
    <button class="btn block" id="bAdd" style="margin-top:12px">Ajouter</button>
  </section>` : ''}

  <section>
    <h2>Ton mois en une ligne</h2>
    <div class="flow">
      <details data-flow="carry" ${A.open.has('carry') ? 'open' : ''}><summary><span>Solde de départ</span><b class="num" style="color:var(--${b.carry < 0 ? 'danger' : b.carry > 0 ? 'mint' : 'muted'})">${b.carry < 0 ? '−' : b.carry > 0 ? '+' : ''}${eur0(Math.abs(b.carry))}</b></summary>
        <div class="flow-in">
          <div class="frow"><label class="check" style="padding:6px 0;min-height:44px"><input type="checkbox" data-carryneg ${b.carry < 0 || (S.money.months[ym] || {}).carryNeg ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">À découvert<span class="small muted" style="display:block">coche si ton compte est dans le rouge</span></span></label><input class="famt num" id="carryAmt" data-carry inputmode="decimal" value="${b.carry ? String(Math.abs(b.carry)).replace('.', ',') : ''}" placeholder="0" aria-label="Solde de départ"></div>
          <p class="hint">Le solde de ton compte courant avant les revenus de ce mois. Un découvert est couvert en premier par tes rentrées, sans compter comme une charge fixe, et ne revient pas le mois suivant.</p>
        </div></details>
      <details id="incDetails" data-flow="inc" ${A.open.has('inc') ? 'open' : ''}><summary><span>Revenus reçus</span><b class="num" style="color:var(--mint)">+${eur0(b.incTotal)}</b></summary>
        <div class="flow-in">${b.incomes.map(i => `<div class="frow"><label class="check" style="padding:6px 0;min-height:44px"><input type="checkbox" data-increc="${i.id}" ${i.rec != null ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${esc(i.label)}<span class="small muted" style="display:block">${i.rec != null ? 'reçu' : i.exp ? `attendu : ${eur0(i.exp)}, vers le ${i.day}` : `à saisir quand il arrive (vers le ${i.day})`}</span></span></label><input class="famt num" id="inc-${i.id}" data-incval="${i.id}" inputmode="decimal" value="${i.rec != null ? String(Math.round(i.rec * 100) / 100).replace('.', ',') : ''}" placeholder="${i.exp ? String(i.exp).replace('.', ',') : 'reçu'}" aria-label="Montant reçu ${esc(i.label)}"></div>`).join('')}
        ${b.extraInc ? `<div class="frow"><span class="small">Rentrées ponctuelles</span><b class="num small">+${eur0(b.extraInc)}</b></div>` : ''}${b.fromPots ? `<div class="frow"><span class="small">Retiré de l'épargne</span><b class="num small">+${eur0(b.fromPots)}</b></div>` : ''}
        <p class="hint">Seul l'argent vraiment reçu compte. Saisis chaque salaire dans le mois où tu vas le dépenser : le salaire de septembre, reçu fin septembre ou début octobre, va dans le budget d'octobre.</p></div></details>
      ${b.debt.val || numv(S.money.debt.total) > debtRepaid() ? `<details data-flow="debt" ${A.open.has('debt') ? 'open' : ''}><summary><span>Dette (d'abord)</span><b class="num">−${eur0(b.debt.val)}</b></summary><div class="flow-in"><div class="frow"><span>Remboursé ce mois</span><span class="num small">${eur0(b.debt.done)}${b.debt.plan ? ` / ${eur0(b.debt.plan)}` : ''}</span></div>${b.debt.plan ? '' : '<p class="hint">Fixe une mensualité dans ton mois type pour la réserver chaque mois.</p>'}</div></details>` : ''}
      <details data-flow="save" ${A.open.has('save') ? 'open' : ''}><summary><span>Épargne (tu te paies d'abord)</span><b class="num">−${eur0(b.saveTotal)}</b></summary>
        <div class="flow-in">${b.pots.filter(p => p.name).map(p => `<div class="frow"><span>${esc(p.name)}</span><span class="num small">${p.plan ? `${eur0(p.done)} / ${eur0(p.plan)}` : eur0(p.done)}</span></div>`).join('') || '<p class="hint">Aucune cagnotte pour l\'instant.</p>'}${b.invested ? `<div class="frow"><span>Investissements</span><span class="num small">${eur0(b.invested)}</span></div>` : ''}</div></details>
      <details data-flow="fix" ${A.open.has('fix') ? 'open' : ''}><summary><span>Charges fixes</span><b class="num">−${eur0(b.fixTotal)}</b></summary>
        <div class="flow-in">${b.fixed.map(f => `<div class="frow"><label class="check" style="padding:6px 0;min-height:44px"><input type="checkbox" data-fpaid="${f.id}" ${f.paid ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${esc(f.label)}<span class="small muted" style="display:block">${f.paid ? 'payé' : `le ${f.day}`}</span></span></label><b class="num small">${f.val ? eur0(f.val) : '<span class="muted">à renseigner</span>'}</b></div>`).join('')}</div></details>
      <div class="frow total"><span>Budget libre</span><b class="num">${eur0(b.free)}</b></div>
      <div class="frow"><span>Dépensé</span><b class="num">−${eur0(b.spent)}</b></div>
      <div class="frow total"><span>Reste</span><b class="num" style="color:var(--${b.reste < 0 ? 'danger' : 'gold'})">${eur0(b.reste)}</b></div>
    </div>
    <button class="btn sm ghost" data-bsetup style="margin-top:14px">Modifier mon mois type</button>
  </section>

  ${envRows ? `<section><h2>Enveloppes</h2><div class="envs">${envRows}</div>
    ${unalloc < 0 ? `<div class="alert">${ICON.warn}<span>Tes enveloppes (${eur0(b.free - unalloc)}) dépassent ton budget libre (${eur0(b.free)}). Baisse un plafond dans ton mois type.</span></div>` : `<p class="hint">Hors enveloppes, il te reste ${eur0(Math.max(0, unalloc - Object.keys(b.byCat).filter(c => !envs.some(e => e.cat === c)).reduce((a, c) => a + b.byCat[c], 0)))} pour tout le reste.</p>`}</section>` : ''}

  ${potRows ? `<section><h2>Épargne</h2><div class="pots">${potRows}</div><div id="potCustom"></div></section>` : ''}

  ${vFoundations(b)}

  ${insights(b, ym)}

  <section>
    <div class="row between" style="margin-bottom:10px"><h2 style="margin:0">Mouvements</h2><button class="btn sm ghost" id="bCsv" ${list.length ? '' : 'disabled'}>CSV</button></div>
    ${usedCats.length > 1 ? `<div class="filters"><button class="chip" data-bfilter="all" aria-pressed="${A.catFilter === 'all'}">Tout</button>${usedCats.map(c => `<button class="chip" data-bfilter="${c}" aria-pressed="${A.catFilter === c}">${catName(c)}</button>`).join('')}</div>` : ''}
    <div>${txRows || `<p class="empty">Aucun mouvement en ${monthLabel(ym)}.</p>`}</div>
  </section>`;
}
function avgSpend(from) {
  const ms = [1, 2, 3].map(k => { let ym = from || A.month; for (let i = 0; i < k; i++) ym = prevMonth(ym); return txIn(ym, 'exp').reduce((a, t) => a + numv(t.amount), 0); }).filter(Boolean);
  return ms.length ? ms.reduce((a, b) => a + b, 0) / ms.length : 0;
}
function insights(b, ym) {
  const out = [];
  if (b.incTotal > 0) {
    const rate = b.saveTotal / b.incTotal;
    out.push(`<b>${Math.round(rate * 100)} %</b> de tes revenus vont à l'épargne ce mois-ci.${rate < 0.1 ? ' Vise au moins 10 %, même en commençant petit.' : rate >= 0.2 ? ' Excellent rythme.' : ''}`);
  }
  const small = b.exps.filter(t => numv(t.amount) < 10);
  if (small.length >= 5) out.push(`<b>${small.length} petites dépenses</b> de moins de 10 € font <b>${eur0(small.reduce((a, t) => a + numv(t.amount), 0))}</b> au total. C'est souvent là que le budget fuit.`);
  const prev = budgetOf(prevMonth(ym));
  if (prev.spent > 0 && b.spent > 0) {
    let best = null;
    Object.keys(b.byCat).forEach(c => { const d = b.byCat[c] - (prev.byCat[c] || 0); if (!best || d > best.d) best = { c, d }; });
    if (best && best.d > 20) out.push(`<b>${catName(best.c)}</b> : ${eur0(best.d)} de plus que le mois dernier.`);
  }
  const top = Object.entries(b.byCat).sort((x, y) => y[1] - x[1])[0];
  if (top && b.spent > 0) out.push(`Ton premier poste de dépense : <b>${catName(top[0])}</b>, ${Math.round(top[1] / b.spent * 100)} % de tes dépenses.`);
  const upcoming = b.fixed.filter(f => !f.paid && f.val && Number(f.day) >= new Date().getDate()).sort((x, y) => x.day - y.day)[0];
  if (ym === todayISO().slice(0, 7) && upcoming) out.push(`Prochaine charge : <b>${esc(upcoming.label)}</b>, ${eur0(upcoming.val)} le ${upcoming.day}.`);
  if (!out.length) return '';
  return `<section><h2>À retenir</h2><ul class="insights">${out.map(x => `<li>${x}</li>`).join('')}</ul></section>`;
}
function addTx() {
  const amt = numv($('#bAmount').value.replace(/\s/g, ''));
  if (!(amt > 0)) { toast('Entre un montant.'); $('#bAmount').focus(); return; }
  const t = { id: uid(), kind: A.kind, amount: Math.round(amt * 100) / 100, cat: A.cat, date: $('#bDate').value || todayISO(), note: $('#bNote').value.trim(), created: Date.now() };
  S.money.tx.push(t); save(); askPersist(); haptic();
  render();
  toast(`${t.kind === 'exp' ? '−' : '+'}${eur2(t.amount)} · ${t.kind === 'exp' ? catName(t.cat) : incName(t.cat)}`, 'Annuler', () => { S.money.tx = S.money.tx.filter(x => x.id !== t.id); save(); render(); });
}
function potSave(id, custom) {
  const p = S.money.pots.find(x => x.id === id); if (!p) return;
  const b = budgetOf(A.month), pp = b.pots.find(x => x.id === id);
  if (custom || !(pp.plan - pp.done > 0)) {
    $('#potCustom').innerHTML = `<div class="confirm"><p class="small">Combien verser sur « ${esc(p.name)} » ?</p><div class="row" style="margin-top:10px"><input id="potAmt" inputmode="decimal" class="famt num" style="flex:1;text-align:left" placeholder="Montant"><button class="btn sm" data-potok="${id}">Verser</button><button class="btn sm quiet" data-potwd="${id}">Retirer</button></div></div>`;
    $('#potAmt').focus(); return;
  }
  commitPot(id, pp.plan - pp.done, 'save');
}
function commitPot(id, amount, kind) {
  if (!(amount > 0)) { toast('Entre un montant.'); return; }
  const t = { id: uid(), kind, amount: Math.round(amount * 100) / 100, pot: id, cat: kind, date: A.month === todayISO().slice(0, 7) ? todayISO() : A.month + '-01', note: '', created: Date.now() };
  S.money.tx.push(t); save(); haptic(); render();
  if (kind === 'save') reward(4, { msg: [`Épargne · ${eur2(t.amount)}`, 'Tu te paies d\'abord. C\'est comme ça qu\'on construit.'] });
  else toast(`Retiré ${eur2(t.amount)}`, 'Annuler', () => { S.money.tx = S.money.tx.filter(x => x.id !== t.id); save(); render(); });
}
function commitKind(kind, amount, inv) {
  if (!(amount > 0)) { toast('Entre un montant.'); return; }
  const t = { id: uid(), kind, amount: Math.round(amount * 100) / 100, cat: kind, inv, date: A.month === todayISO().slice(0, 7) ? todayISO() : A.month + '-01', note: '', created: Date.now() };
  S.money.tx.push(t); save(); haptic(); render();
  reward(kind === 'debt' ? 5 : 3, { big: kind === 'debt', msg: [kind === 'debt' ? `Remboursé · ${eur2(t.amount)}` : `Investi · ${eur2(t.amount)}`, kind === 'debt' ? 'Une dette en moins, un poids en moins.' : 'Ton argent travaille pour toi.'] });
}
function openTx(id) {
  const t = S.money.tx.find(x => x.id === id); if (!t) return;
  const cats = t.kind === 'exp' ? CATS : t.kind === 'inc' ? INC_CATS : null;
  const body = $('#shiftSheetBody');
  body.innerHTML = `<div class="grab"></div>
    <div class="sheet-top"><button class="link-btn" data-close style="text-align:left">Annuler</button><h2 id="shiftSheetTitle">Modifier</h2><button class="link-btn" id="txSave" style="text-align:right">OK</button></div>
    <label class="amount"><input id="txAmt" type="text" inputmode="decimal" value="${String(t.amount).replace('.', ',')}" aria-label="Montant"><span>€</span></label>
    ${cats ? `<div class="chips">${cats.map(([k, n]) => `<button class="chip" data-txcat="${k}" aria-pressed="${t.cat === k}">${n}</button>`).join('')}</div>` : ''}
    <div class="group" style="margin-top:12px">
      <div class="cell"><input type="text" class="full" id="txNote" value="${esc(t.note || '')}" placeholder="Note (facultatif)" aria-label="Note"></div>
      <div class="cell"><label for="txDate">Date</label><input type="date" id="txDate" value="${t.date}"></div>
    </div>
    <button class="btn danger block" style="margin-top:22px" id="txDel">Supprimer</button>`;
  body.dataset.tx = id;
  $('#shiftSheet').showModal();
}
function exportBudgetCSV() {
  const ym = A.month, rows = S.money.tx.filter(t => t.date.startsWith(ym)).sort((a, b) => a.date.localeCompare(b.date));
  const q = s => `"${String(s ?? '').replace(/"/g, '""')}"`;
  const kindLbl = { exp: 'Dépense', inc: 'Rentrée', save: 'Épargne', withdraw: 'Retrait épargne', debt: 'Remboursement dette', invest: 'Investissement' };
  const lines = [['Date', 'Type', 'Catégorie', 'Montant', 'Note'].join(';')];
  rows.forEach(t => lines.push([t.date.split('-').reverse().join('/'), kindLbl[t.kind], t.kind === 'exp' ? catName(t.cat) : t.kind === 'inc' ? incName(t.cat) : ((S.money.pots.find(p => p.id === t.pot) || {}).name || ''), String((['exp', 'save', 'debt', 'invest'].includes(t.kind) ? -1 : 1) * numv(t.amount)).replace('.', ','), q(t.note)].join(';')));
  deliverFile(`budget-${ym}.csv`, '﻿' + lines.join('\r\n'), 'text/csv;charset=utf-8');
}

/* Feuille « Mon mois type » */
function openBudgetSetup() {
  const M = S.money;
  const row = (list, it, fields) => `<div class="srow">${fields.map(([k, ph, mode, w]) => mode === 'cat'
    ? `<select data-mset="${list}.${it.id}.${k}" aria-label="Catégorie" style="flex:${w}">${CATS.map(([id, n]) => `<option value="${id}" ${it[k] === id ? 'selected' : ''}>${n}</option>`).join('')}</select>`
    : mode === 'month' ? `<input type="month" data-mset="${list}.${it.id}.${k}" value="${esc(it[k] || '')}" aria-label="${ph}" style="flex:${w}">`
      : `<input data-mset="${list}.${it.id}.${k}" value="${esc(String(it[k] ?? '').replace('.', ','))}" placeholder="${ph}" aria-label="${ph}" ${mode === 'num' ? 'inputmode="decimal"' : ''} style="flex:${w}">`).join('')}
    <button class="icon-btn" data-mdel="${list}.${it.id}" aria-label="Supprimer"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`;
  const hintInc = i => i.src ? '<p class="hint" style="margin:-4px 0 8px">Salaire variable : laisse le montant vide, tu saisiras chaque mois ce que tu as vraiment reçu.</p>' : '';
  $('#ideasBody').innerHTML = `<div class="grab"></div>
    <div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Mon mois type</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    <p class="small muted">Ce qui revient chaque mois. L'app s'en sert pour calculer ton reste à dépenser.</p>
    <p class="gt">Revenus · montant fixe attendu (facultatif) et jour d'arrivée</p>
    ${M.incomes.map(i => row('incomes', i, [['label', 'Nom', 'text', 3], ['amount', '€', 'num', 1.3], ['day', 'Jour', 'num', .8]]) + hintInc(i)).join('')}
    <button class="btn sm quiet" data-madd="incomes">+ Ajouter un revenu</button>
    <p class="gt">Charges fixes · montant et jour de prélèvement</p>
    ${M.fixed.map(f => row('fixed', f, [['label', 'Nom', 'text', 3], ['amount', '€', 'num', 1.3], ['day', 'Jour', 'num', .8]])).join('')}
    <button class="btn sm quiet" data-madd="fixed">+ Ajouter une charge</button>
    <p class="gt">Plan automatique</p>
    <div class="group"><div class="cell"><label for="mAuto">Laisser l'app calculer la dette et l'épargne de sécurité chaque mois</label><span class="switch"><input type="checkbox" id="mAuto" ${M.auto ? 'checked' : ''}><span></span></span></div>
      <div class="cell"><label for="mLife">Budget de vie mensuel<span class="small muted" style="display:block">courses, essence, sorties… ${(() => { const L = lifeBudget(A.month); return L.src === 'manuel' ? '' : L.v ? `(auto : ${eur0(L.v)})` : '(à renseigner)'; })()}</span></label><input class="r" id="mLife" inputmode="decimal" value="${esc(String(M.life || '').replace('.', ','))}" placeholder="auto"><span class="unit">€</span></div></div>
    <p class="hint">Avec le plan automatique, l'app garde ton budget de vie, puis répartit 90 % du reste entre la dette et l'épargne selon tes priorités. Tu peux corriger chaque mois.</p>
    <p class="gt">Dette · montant total, déjà remboursé${M.auto ? '' : ', mensualité'}</p>
    <div class="srow"><input data-dset="total" inputmode="decimal" value="${esc(String(M.debt.total || '').replace('.', ','))}" placeholder="Total €" aria-label="Montant total de la dette" style="flex:1"><input data-dset="start" inputmode="decimal" value="${esc(String(M.debt.start || '').replace('.', ','))}" placeholder="Déjà remboursé €" aria-label="Déjà remboursé" style="flex:1">${M.auto ? '' : `<input data-dset="monthly" inputmode="decimal" value="${esc(String(M.debt.monthly || '').replace('.', ','))}" placeholder="€/mois" aria-label="Mensualité" style="flex:.8">`}</div>
    <p class="hint" style="margin-top:0">${M.auto ? 'Le montant mensuel est calculé par le plan automatique.' : 'La mensualité est réservée en priorité chaque mois, avant l\'épargne.'}</p>
    <p class="gt">Objectif d'épargne de sécurité</p>
    <div class="srow"><input data-sgoal inputmode="decimal" value="${esc(String(M.safetyGoal || '').replace('.', ','))}" placeholder="4000" aria-label="Objectif de sécurité" style="flex:1"><span class="unit">€</span></div>
    <p class="gt">Cagnottes · objectif, déjà épargné, versement mensuel</p>
    ${M.pots.map(p => row('pots', p, [['name', 'Nom', 'text', 2.4], ['target', 'Objectif €', 'num', 1.3], ['start', 'Déjà €', 'num', 1.1], ['monthly', '€/mois', 'num', 1.1]])
      + `<div class="srow" style="margin-top:-4px"><span class="small muted" style="flex:1">Date cible (facultatif)</span><input type="month" data-mset="pots.${p.id}.deadline" value="${esc(p.deadline || '')}" aria-label="Date cible" style="flex:1.4"></div>`).join('')}
    <p class="hint">L'épargne de sécurité est ta protection en cas d'imprévu. Elle fait partie des conditions pour débloquer l'investissement.${M.auto ? ' Son versement mensuel est calculé par le plan automatique : le champ €/mois ne sert que pour tes autres cagnottes.' : ''}</p>
    <button class="btn sm quiet" data-madd="pots">+ Nouvelle cagnotte</button>
    <p class="gt">Enveloppes · plafond mensuel par catégorie</p>
    ${M.envelopes.map(e => row('envelopes', e, [['cat', 'Catégorie', 'cat', 2.4], ['limit', 'Plafond €', 'num', 1.3]])).join('')}
    <button class="btn sm quiet" data-madd="envelopes">+ Ajouter une enveloppe</button>
    <p class="hint" style="margin-top:20px">Garde les enveloppes pour 2 à 4 catégories où l'argent file vite. Le reste se pilote avec ton budget par jour.</p>`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal();
  d.dataset.mode = 'bsetup';
}
function mset(path, value) {
  const [list, id, key] = path.split('.'), it = S.money[list].find(x => x.id === id); if (!it) return;
  it[key] = ['amount', 'target', 'start', 'monthly', 'limit'].includes(key) ? value.trim().replace(/\s/g, '').replace(',', '.') : key === 'day' ? Math.min(31, Math.max(1, parseInt(value, 10) || 1)) : value;
  save();
}


/* =====================================================================
   12 ter. FONDATIONS & DÉBLOCAGES
   - Investissement (onglet Argent) : dette 100 % remboursée + épargne de sécurité ≥ objectif.
   - Business (onglet) : 6 compétences clés acquises + régularité de foi ≥ 90 % sur 30 jours.
   Déblocage définitif : une fois atteint, la date est enregistrée dans S.unlocks.
   ===================================================================== */
const PRAYERS = [['fajr', 'Fajr', 'الفجر'], ['dhuhr', 'Dhuhr', 'الظهر'], ['asr', 'Asr', 'العصر'], ['maghrib', 'Maghrib', 'المغرب'], ['isha', 'Isha', 'العشاء']];
function defaultFaith() {
  return { habits: [['fajr', 'Fajr'], ['dhuhr', 'Dhuhr'], ['asr', 'Asr'], ['maghrib', 'Maghrib'], ['isha', 'Isha']].map(p => ({ id: p[0], name: `${p[1]} à l'heure`, prayer: true })).concat([{ id: 'coran', name: 'Lire un peu de Coran', pause: true }, { id: 'adhm', name: 'Adhkar du matin' }, { id: 'adhs', name: 'Adhkar du soir' }, { id: 'dua', name: 'Invocations' }]), log: {} };
}
const FAITH_GOAL = 0.9, FAITH_DAYS = 30;
const F = { view: 'habitudes', day: todayISO() };
try { const v = localStorage.getItem('zia-foi-view'); if (v === 'habitudes' || v === 'arabe') F.view = v; } catch (e) {}
/* Pendant les règles : les prières (et la lecture du Coran, sujet de divergence) sortent du compte.
   La série et la régularité ne bougent pas. */
/* Une prière est due si la fin de son temps tombe hors des règles (à l'heure près, grâce à startAt / endAt). */
const reqOf = k => { const t = ptDay(k); return S.faith.habits.filter(h => h.prayer && t.win[h.id] ? !pausedAt(+t.win[h.id][1]) : h.pause ? !inPeriod(k) : true); };
const needOf = k => reqOf(k).length;
const dayDone = k => { const d = S.faith.log[k] || {}; return reqOf(k).filter(h => d[h.id] && d[h.id] !== 'x').length; };
const dayW = k => { const d = S.faith.log[k] || {}; return reqOf(k).reduce((m, h) => m + (h.prayer ? pWeight(d[h.id]) : d[h.id] ? 1 : 0), 0); };
/* Régularité sur 30 jours : la journée en cours ne compte que lorsqu'elle est complète. */
function faithScore() {
  const hs = S.faith.habits, n = hs.length; if (!n) return { pct: 0, tracked: 0, done: 0, need: 0, total: 0 };
  const todayFull = dayDone(todayISO()) === needOf(todayISO()), off = todayFull ? 0 : 1;
  let done = 0, tracked = 0, total = 0;
  for (let i = off; i < off + FAITH_DAYS; i++) { const k = iso(addDays(new Date(), -i)), c = dayDone(k); done += dayW(k); total += needOf(k); if (c) tracked++; }
  if (!total) return { pct: 0, tracked, done, total, need: 0 };
  return { pct: done / total, tracked, done, total, need: Math.max(0, Math.ceil(FAITH_GOAL * total - done)) };
}

const BIZ_DOMAINS = ['rel', 'psy', 'vente', 'nego', 'mkt', 'jur'];
const BIZ_LABEL = { rel: 'Relationnel & leadership', psy: 'Psychologie & neuromarketing', vente: 'Vente', nego: 'Négociation', mkt: 'Marketing & acquisition client', jur: 'Juridique & fiscal' };
function bizStatus() {
  const skills = BIZ_DOMAINS.map(k => { let t = 0, d = 0; MONTHS.filter(m => m.dom === k).forEach(m => { t += m.acq.length; d += modDone(m); }); return { k, t, d, months: MONTHS.filter(m => m.dom === k).map(m => m.n) }; });
  const f = faithScore(), skillsOk = skills.every(s => s.d === s.t);
  return { skills, skillsOk, faith: f, faithOk: f.pct >= FAITH_GOAL, ok: skillsOk && f.pct >= FAITH_GOAL, left: skills.reduce((a, s) => a + s.t - s.d, 0) };
}
function debtRepaid(upTo) { let r = numv(S.money.debt.start); S.money.tx.forEach(t => { if (t.kind === 'debt' && (!upTo || t.date.slice(0, 7) <= upTo)) r += numv(t.amount); }); return r; }
function investStatus() {
  const total = numv(S.money.debt.total), repaid = Math.min(total, debtRepaid());
  const pot = S.money.pots.find(p => p.safety), goal = numv(S.money.safetyGoal) || 4000, safety = pot ? potBalance(pot) : 0;
  const debtOk = total <= 0 || repaid >= total, safeOk = safety >= goal;
  return { total, repaid, debtOk, debtP: total ? repaid / total : 1, goal, safety, safeOk, safeP: Math.min(1, safety / goal), ok: debtOk && safeOk };
}
function checkUnlocks() {
  if (!S.unlocks.invest && investStatus().ok) { S.unlocks.invest = todayISO(); save(); setTimeout(() => toast('Investissement débloqué. Tes fondations sont posées.'), 400); }
  if (!S.unlocks.business && bizStatus().ok) { S.unlocks.business = todayISO(); save(); setTimeout(() => toast('Onglet Business débloqué. Bravo.'), S.unlocks.invest === todayISO() ? 4600 : 400); }
  checkBodyUnlocks();
}
const lockIcon = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/></svg>';
const condRow = (ok, title, p, detail) => `<div class="cond ${ok ? 'ok' : ''}">
  <div class="row between"><h3>${ok ? '<span class="cond-ok">' + ICON.tick + '</span>' : ''}${title}</h3><span class="num small ${ok ? '' : 'muted'}">${Math.round(Math.min(1, p) * 100)} %</span></div>
  <div class="bar"><i style="width:${Math.min(100, p * 100)}%;${ok ? 'background:var(--mint)' : ''}"></i></div>
  <p class="small muted" style="margin-top:6px">${detail}</p></div>`;

/* ----- Onglet Argent : fondations + investissement ----- */
function vFoundations(b) {
  const s = investStatus(), d = S.money.debt;
  const remain = Math.max(0, s.total - s.repaid);
  const debtDetail = s.debtOk ? 'Remboursée. Une chose de moins sur les épaules.' : `${eur0(s.repaid)} remboursés sur ${eur0(s.total)} · reste ${eur0(remain)}${b.debt.plan > 0 ? ` · fin prévue vers ${monthLabel((() => { const x = new Date(); x.setMonth(x.getMonth() + Math.ceil(remain / b.debt.plan) - 1); return iso(x).slice(0, 7); })())}` : ''}`;
  const safeDetail = s.safeOk ? 'Objectif atteint.' : `${eur0(s.safety)} sur ${eur0(s.goal)} · reste ${eur0(s.goal - s.safety)}`;
  const thisMonthDebt = b.debt;
  const debtBtn = !s.debtOk ? (thisMonthDebt.plan > 0 && thisMonthDebt.done >= thisMonthDebt.plan ? '<span class="pill mint">Remboursé ce mois</span>' : `<button class="btn sm" data-debtpay>${thisMonthDebt.plan > thisMonthDebt.done ? `Rembourser ${eur0(thisMonthDebt.plan - thisMonthDebt.done)}` : 'Rembourser'}</button>`) : '';
  const unlocked = !!S.unlocks.invest;
  return `<section>
    <h2>Fondations</h2>
    ${vPlanCard(b)}
    ${condRow(s.debtOk, 'Dette remboursée', s.debtP, debtDetail)}
    ${debtBtn ? `<div class="row" style="margin:-4px 0 18px;flex-wrap:wrap">${debtBtn}<button class="btn sm quiet" data-debtcustom>Autre montant</button></div>` : ''}
    ${condRow(s.safeOk, 'Épargne de sécurité', s.safeP, safeDetail)}
    <div id="debtCustom"></div>
  </section>
  <section>
    <div class="row between" style="margin-bottom:14px"><h2 style="margin:0">Investissement</h2>${unlocked ? '' : `<span class="pill">${lockIcon.replace('width="18" height="18"', 'width="13" height="13"')} Verrouillé</span>`}</div>
    ${unlocked ? vInvest() : `<div class="locked-card">
      <p>Débloqué une fois la dette remboursée et l'épargne de sécurité atteinte.</p>
      <div class="row" style="gap:18px;margin-top:12px">
        <div><b class="num">${Math.round((1 - s.debtP) * 100)} %</b><span>de dette restante</span></div>
        <div><b class="num">${Math.round((1 - s.safeP) * 100)} %</b><span>d'épargne à constituer</span></div>
      </div>
      <p class="hint">Investir avec une dette ou sans matelas, c'est risquer de devoir revendre au pire moment.</p>
    </div>`}
  </section>`;
}
function invBalance(i) { let v = numv(i.start); S.money.tx.forEach(t => { if (t.kind === 'invest' && t.inv === i.id) v += numv(t.amount); }); return v; }
function vInvest() {
  const inv = S.money.investments;
  const rows = inv.map(i => { const put = invBalance(i), val = String(i.value).trim() !== '' ? numv(i.value) : put, g = val - put;
    return `<div class="pot"><span class="inv-type">${i.type === 'or' ? 'Or' : i.type === 'etf' ? 'ETF' : '•'}</span>
      <div class="grow"><b>${esc(i.name || 'Sans nom')}</b><p class="small muted num">${eur0(put)} investis · valeur ${eur0(val)} <span style="color:var(--${g >= 0 ? 'mint' : 'danger'})">${g >= 0 ? '+' : '−'}${eur0(Math.abs(g))}</span></p></div>
      <button class="btn sm quiet" data-invest="${i.id}">Investir</button></div>`; }).join('');
  const tp = inv.reduce((a, i) => a + invBalance(i), 0), tv = inv.reduce((a, i) => a + (String(i.value).trim() !== '' ? numv(i.value) : invBalance(i)), 0);
  return `<p class="small muted">Débloqué le ${new Date(S.unlocks.invest).toLocaleDateString('fr-FR')}. Tes fondations sont posées.</p>
    ${inv.length ? `<div class="stats-line" style="margin:14px 0 6px"><div><b class="num">${eur0(tv)}</b><span>valeur actuelle</span></div><div><b class="num" style="color:var(--${tv - tp >= 0 ? 'mint' : 'danger'})">${tv - tp >= 0 ? '+' : '−'}${eur0(Math.abs(tv - tp))}</b><span>plus ou moins-value</span></div></div>` : ''}
    <div class="pots">${rows || '<p class="empty">Aucune ligne pour l\'instant.</p>'}</div><div id="invCustom"></div>
    <button class="btn sm ghost" data-invsetup style="margin-top:12px">Gérer mes lignes (ETF halal, or…)</button>
    <p class="hint">Mets à jour la valeur actuelle de temps en temps depuis ton courtier. L'app ne se connecte à rien.</p>`;
}
function openInvestSetup() {
  const row = i => `<div class="srow"><input data-iset="${i.id}.name" value="${esc(i.name)}" placeholder="Nom (ex. ETF MSCI World Islamic)" aria-label="Nom" style="flex:2.6">
    <select data-iset="${i.id}.type" aria-label="Type" style="flex:1"><option value="etf" ${i.type === 'etf' ? 'selected' : ''}>ETF</option><option value="or" ${i.type === 'or' ? 'selected' : ''}>Or</option><option value="autre" ${i.type === 'autre' ? 'selected' : ''}>Autre</option></select>
    <button class="icon-btn" data-invdel="${i.id}" aria-label="Supprimer"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="srow" style="margin-top:-2px"><input data-iset="${i.id}.start" inputmode="decimal" value="${esc(String(i.start || '').replace('.', ','))}" placeholder="Déjà investi €" aria-label="Déjà investi" style="flex:1"><input data-iset="${i.id}.value" inputmode="decimal" value="${esc(String(i.value || '').replace('.', ','))}" placeholder="Valeur actuelle €" aria-label="Valeur actuelle" style="flex:1"></div>`;
  $('#ideasBody').innerHTML = `<div class="grab"></div><div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Investissements</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    ${S.money.investments.map(row).join('<div style="height:10px"></div>')}
    <button class="btn sm quiet" data-invadd style="margin-top:12px">+ Ajouter une ligne</button>`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal(); d.dataset.mode = 'bsetup';
}

/* ----- Onglet Foi : habitudes ----- */
function foiTop(view) {
  return `${pageHead('Foi', view === 'arabe' ? 'Apprendre à lire, puis comprendre.' : 'La régularité avant tout. Chaque prière à l\'heure compte.', view === 'arabe' ? 'arabe' : 'foi')}
  <div class="seg" role="group" aria-label="Section" style="margin-top:20px">
    <button data-fview="habitudes" aria-pressed="${view === 'habitudes'}"><span class="dot"></span>Habitudes</button>
    <button data-fview="arabe" aria-pressed="${view === 'arabe'}"><span class="dot"></span>Arabe & Coran</button>
  </div>`;
}
function vHabits() {
  const k = F.day, d = S.faith.log[k] || {}, isToday = k === todayISO();
  const sc = faithScore(), ok = sc.pct >= FAITH_GOAL;
  // Chemin du soleil : Fajr à l'aube, Dhuhr au zénith, Asr, Maghrib au couchant, Isha dans la nuit.
  const ANG = { fajr: 196, dhuhr: 94, asr: 46, maghrib: 6, isha: -34 }, R = 136;
  const prayers = S.faith.habits.filter(h => h.prayer && ANG[h.id] != null);
  const nodes = prayers.map(h => { const a = ANG[h.id] * Math.PI / 180, x = R * Math.cos(a), y = -R * Math.sin(a), p = PRAYERS.find(q => q[0] === h.id);
    const v = pv(d[h.id]), pt = ptDay(k).win[h.id];
    return `<button class="prayer ${v && v !== 'x' ? 'on' : ''} ${v ? 'w-' + v : ''}" data-prayer="${h.id}" aria-label="${esc(PNAMES[h.id])} ${hm(pt[0])}${v ? ', ' + PWAY[v][0] : ''}" style="left:${((x + 180) / 360 * 100).toFixed(2)}%;top:${((y + 160) / 250 * 100).toFixed(2)}%"><span class="ar" lang="ar">${p[2]}</span><small>${hm(pt[0]).replace(' h ', ':')}</small>${v ? `<i class="pbadge">${PICON(v, 12)}</i>` : ''}</button>`; }).join('');
  const pn = isToday ? prayerNow() : null, nx = isToday && !pn ? nextPrayer() : null;
  const pnLine = pn ? (d[pn.id] && pn.k === k ? `${PNAMES[pn.id]} validée · prochaine à ${hm(nextPrayer().start)}` : `<b>${PNAMES[pn.id]}</b> en cours · se termine à ${hm(pn.end)}, dans ${leftTxt(pn.end - new Date())}`) : nx ? `Prochaine prière : <b>${PNAMES[nx.id]}</b> à ${hm(nx.start)}` : '';
  const ym = k.slice(0, 7); let cm = 0, cg = 0, cs = 0, cr = 0, cx = 0; Object.keys(S.faith.log).filter(x => x.startsWith(ym)).forEach(x => { const dd = S.faith.log[x]; ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(id => { const w = pv(dd[id]); if (w === 'm') cm++; else if (w === 'g') cg++; else if (w === 's') cs++; else if (w === 'r') cr++; else if (w === 'x') cx++; }); });
  let fs = 0; for (let i = (pWeight((S.faith.log[todayISO()] || {}).fajr) === 1 || inPeriod(todayISO()) ? 0 : 1); i < 400; i++) { const kk = iso(addDays(new Date(), -i)); if (inPeriod(kk)) continue; if (pWeight((S.faith.log[kk] || {}).fajr) === 1) fs++; else break; }
  const others = S.faith.habits.filter(h => !(h.prayer && ANG[h.id] != null));
  const nDone = dayDone(k), n = needOf(k), paused = inPeriod(k);
  const start = addDays(new Date(), -(FAITH_DAYS - 1));
  let cells = '';
  for (let i = 0; i < FAITH_DAYS; i++) { const dd = addDays(start, i), kk = iso(dd), c = dayDone(kk), nn = needOf(kk); cells += `<button class="day ${c === nn ? 'on' : ''} ${kk === k ? 'today' : ''} ${inPeriod(kk) ? 'pd' : ''}" data-fday="${kk}" style="--p:${nn ? c / nn * 100 : 0}" aria-label="${DAY_LONG.format(dd)} : ${c} sur ${nn}${inPeriod(kk) ? ', règles' : ''}"><i></i><span>${dd.getDate()}</span></button>`; }
  const dayLbl = isToday ? "Aujourd'hui" : DAY_LONG.format(parseDate(k));
  return `${foiTop('habitudes')}
  <div class="month-nav" style="margin-top:24px"><p class="eyebrow" style="text-transform:uppercase">${dayLbl}</p><div class="row" style="gap:0">
    <button class="icon-btn" data-fstep="-1" aria-label="Jour précédent" ${k <= iso(start) ? 'disabled style="opacity:.3"' : ''}>${ICON.prev}</button>
    <button class="icon-btn" data-fstep="1" aria-label="Jour suivant" ${isToday ? 'disabled style="opacity:.3"' : ''}>${ICON.next}</button></div></div>
  ${paused ? `<div class="pause-note"><p><b>Règles en cours · prières en pause.</b> Ta série et ta régularité ne bougent pas.</p><button class="btn sm" data-goto="cycle">Mes adorations du jour</button></div>`
    : ghuslDue() ? `<div class="pause-note"><p><b>Fin des règles.</b> Pense au ghusl avant de reprendre la prière.</p><button class="btn sm" data-ghusl>Ghusl fait</button></div>`
    : pnLine ? `<p class="pnow ${pn && !(d[pn.id] && pn.k === k) && pn.end - new Date() < 45 * 60000 ? 'hot' : ''}">${pnLine}</p>` : ''}
  <div class="sunpath ${paused ? 'paused' : ''}">
    <svg viewBox="-180 -160 360 250" aria-hidden="true">
      <path d="M-170 0 L170 0" stroke="var(--line)" stroke-width="1"/><text x="-170" y="-6" style="font-size:8px;font-weight:700;letter-spacing:.14em;fill:var(--muted)">HORIZON</text>
      <path d="${`M${(-R).toFixed(1)} 0 A${R} ${R} 0 0 1 ${R} 0`}" fill="none" stroke="var(--orbit)" stroke-width="1.2" stroke-dasharray="3 5"/>
      <text x="0" y="-40" text-anchor="middle" style="font:400 44px var(--serif);fill:var(--gold)">${nDone}<tspan style="font-size:20px;fill:var(--muted)">/${n}</tspan></text>
      <text x="0" y="-18" text-anchor="middle" style="font-size:9px;font-weight:700;letter-spacing:.14em;fill:var(--muted)">HABITUDES</text>
    </svg>
    ${nodes}
  </div>
  <p class="hint" style="text-align:center;margin-top:34px">${paused ? 'Pendant les règles, les prières ne sont pas comptées.' : 'Touche une prière pour dire comment tu l\'as faite.'}</p>
  ${others.length ? `<div class="checks" style="margin-top:6px">${others.map(h => checkbox(h.id, esc(h.name) + (paused && h.pause ? ' <span class="small muted">· facultatif pendant les règles</span>' : ''), 'data-habitc', !!d[h.id])).join('')}</div>` : ''}
  <section>
    <p class="eyebrow">Tes prières · ${MONTH_FMT.format(parseDate(k))}</p>
    <div class="pstats">${[['s', cs], ['m', cm], ['g', cg], ['r', cr], ['x', cx]].map(([w, c]) => `<div class="w-${w}"><i>${PICON(w, 16)}</i><b class="num">${c}</b><span>${PWAY[w][0]}</span></div>`).join('')}</div>
    <p class="small" style="margin-top:12px">${fs ? `<b style="color:var(--gold)">${fs} jour${fs > 1 ? 's' : ''}</b> d'affilée avec Fajr à l'heure.` : 'Fajr à l\'heure demain : la série commence là.'}</p>
  </section>
  <section>
    <div class="row between" style="align-items:flex-end"><div><p class="eyebrow">Régularité · 30 derniers jours</p><p class="num" style="font:400 3.25rem/1.05 var(--serif);color:var(--${ok ? 'mint' : 'gold'});margin-top:4px">${Math.round(sc.pct * 100)} %</p></div>
      <p class="small muted" style="text-align:right">objectif ${Math.round(FAITH_GOAL * 100)} %<br>${sc.tracked}/${FAITH_DAYS} jours suivis</p></div>
    <div class="bar goal" style="margin-top:12px"><i style="width:${Math.min(100, sc.pct * 100)}%;${ok ? 'background:var(--mint)' : ''}"></i><span style="left:${FAITH_GOAL * 100}%"></span></div>
    <p class="small ${ok ? '' : 'muted'}" style="margin-top:10px">${ok ? 'Quota atteint. Garde ce cap.' : `Il te manque ${sc.need} coche${sc.need > 1 ? 's' : ''} sur la période pour atteindre ${Math.round(FAITH_GOAL * 100)} %.`}</p>
    <div class="cal cal10" style="margin-top:18px">${cells}</div>
    <p class="hint">Touche un jour pour le corriger. La journée en cours compte dès que tout est coché.</p>
    <button class="btn sm ghost" data-fsetup style="margin-top:12px">Modifier mes habitudes</button>
  </section>`;
}
function openFaithSetup() {
  $('#ideasBody').innerHTML = `<div class="grab"></div><div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Mes habitudes</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    <p class="small muted">Toutes ces habitudes comptent dans ta régularité. Les 5 prières restent sur le chemin du soleil.</p>
    <div style="margin-top:14px">${S.faith.habits.map(h => `<div class="srow"><input data-hset="${h.id}" value="${esc(h.name)}" aria-label="Nom de l'habitude" style="flex:1" ${h.prayer ? 'readonly' : ''}>${h.prayer ? '<span class="pill" style="flex:none">Prière</span>' : `<button class="icon-btn" data-hdel="${h.id}" aria-label="Supprimer"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`}</div>`).join('')}</div>
    <div class="srow" style="margin-top:14px"><input id="hNew" placeholder="Ex. Adhkar du matin" aria-label="Nouvelle habitude" style="flex:1"><button class="btn sm" data-hadd>Ajouter</button></div>
    <p class="gt">Horaires de ta mosquée</p>
    <p class="small muted" style="margin:0 4px 10px">Calculés pour Cannes. Ajuste chaque prière à la minute pour coller aux horaires de ta mosquée.</p>
    <div class="group">${(() => { const t = ptDay(todayISO()), o = ptConf().off; return ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map(id => `<div class="cell"><span class="lbl">${PNAMES[id]}</span><button class="icon-btn" data-poff="${id}.-1" aria-label="Une minute plus tôt">−</button><b class="num" style="min-width:4.2em;text-align:center">${hm(t[id])}</b><button class="icon-btn" data-poff="${id}.1" aria-label="Une minute plus tard">+</button><span class="small muted num" style="min-width:3em;text-align:right">${o[id] ? (o[id] > 0 ? '+' : '') + o[id] + ' min' : ''}</span></div>`).join(''); })()}</div>
    <p class="hint">Fin de chaque prière : Fajr au lever du soleil, Dhuhr à Asr, Asr à Maghrib, Maghrib à Isha, Isha au milieu de la nuit (${hm(ptDay(todayISO()).midnight)} ce soir).</p>`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal(); d.dataset.mode = 'bsetup';
}
/* ----- Prières : horaires, façon de prier, rappels -----
   Horaires calculés dans le téléphone (formules de PrayTimes.org), réglés par défaut sur Cannes, angle 12°
   pour Fajr et Isha, Asr standard, puis ajustés à la minute pour coller à la mosquée (S.faith.pt.off).
   Fenêtres : Fajr → lever du soleil, Dhuhr → Asr, Asr → Maghrib, Maghrib → Isha, Isha → milieu de la nuit.
   Journal : S.faith.log[date][prière] = 'm' mosquée · 'g' en groupe · 's' seul à l'heure · 'r' rattrapée · 'x' manquée
   (true, l'ancien format, vaut 's'). Régularité : m/g/s = 1, r = 0,5, x = 0. */
const PWAY = {
  s: ['Chez moi, à l\'heure', '<path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10v9.5h11V10"/><path d="M10 19.5V15h4v4.5"/>'],
  m: ['À la mosquée', '<path d="M4 20h16M6 20v-7a6 6 0 0 1 12 0v7M12 7V3.5M10 20v-3.5a2 2 0 0 1 4 0V20"/>'],
  g: ['En groupe', '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15.5 14.3c3 0 5.5 2.2 5.5 5.7"/>'],
  r: ['Rattrapée', '<path d="M4.5 12a7.5 7.5 0 1 0 2.3-5.4"/><path d="M4 4v4.5h4.5"/>'],
  x: ['Manquée', '<path d="M6 6l12 12M18 6L6 18"/>']
};
const PSHORT = { s: 'Chez moi', m: 'Mosquée', g: 'Groupe', r: 'Rattrapée' };
const PICON = (k, sz = 20) => `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${PWAY[k][1]}</svg>`;
const pv = v => v === true ? 's' : v;
const pWeight = v => { v = pv(v); return v === 'm' || v === 'g' || v === 's' ? 1 : v === 'r' ? 0.5 : 0; };
const PNAMES = { fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' };
function ptConf() { const p = S.faith.pt = S.faith.pt || {}; p.lat = p.lat ?? 43.5528; p.lon = p.lon ?? 7.0174; p.fa = p.fa ?? 12; p.ia = p.ia ?? 12; p.off = Object.assign({ fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }, p.off || {}); if (!p.since) p.since = Date.now(); return p; }
/* Calcul astronomique (PrayTimes.org, Hamid Zarrabi-Nezhad) */
const PT = (() => {
  const dtr = d => d * Math.PI / 180, rtd = r => r * 180 / Math.PI;
  const sin = d => Math.sin(dtr(d)), cos = d => Math.cos(dtr(d)), tan = d => Math.tan(dtr(d));
  const asin = x => rtd(Math.asin(x)), acos = x => rtd(Math.acos(x)), atan2 = (y, x) => rtd(Math.atan2(y, x)), acot = x => rtd(Math.atan(1 / x));
  const fix = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
  function sun(jd) {
    const D = jd - 2451545.0, g = fix(357.529 + 0.98560028 * D, 360), q = fix(280.459 + 0.98564736 * D, 360);
    const L = fix(q + 1.915 * sin(g) + 0.020 * sin(2 * g), 360), e = 23.439 - 0.00000036 * D;
    const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
    return { eqt: q / 15 - fix(RA, 24), decl: asin(sin(e) * sin(L)) };
  }
  function julian(y, m, d) { if (m <= 2) { y -= 1; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; }
  return function (date, lat, lon, fa, ia) {
    const y = date.getFullYear(), mo = date.getMonth() + 1, d = date.getDate();
    const tz = -new Date(y, mo - 1, d, 12).getTimezoneOffset() / 60, jd = julian(y, mo, d) - lon / (15 * 24);
    const noon = t => fix(12 - sun(jd + t).eqt, 24);
    const angle = (a, t, ccw) => { const s = sun(jd + t), T = acos((-sin(a) - sin(s.decl) * sin(lat)) / (cos(s.decl) * cos(lat))) / 15, n = noon(t); return n + (ccw ? -T : T); };
    const asr = (f, t) => { const s = sun(jd + t); return angle(-acot(f + tan(Math.abs(lat - s.decl))), t); };
    let t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, sunset: 18, isha: 18 };
    for (let i = 0; i < 2; i++) {
      const p = k => t[k] / 24;
      t = { fajr: angle(fa, p('fajr'), true), sunrise: angle(0.833, p('sunrise'), true), dhuhr: noon(p('dhuhr')), asr: asr(1, p('asr')), sunset: angle(0.833, p('sunset')), isha: angle(ia, p('isha')) };
    }
    const adj = h => h + tz - lon / 15;
    return { fajr: adj(t.fajr), sunrise: adj(t.sunrise), dhuhr: adj(t.dhuhr), asr: adj(t.asr), maghrib: adj(t.sunset), isha: adj(t.isha) };
  };
})();
const ptCache = {};
/* Horaires d'un jour (objets Date), fenêtres comprises */
function ptDay(k) {
  const c = ptConf(), key = k + JSON.stringify(c.off) + c.fa + c.ia + c.lat;
  if (ptCache[key]) return ptCache[key];
  const d0 = parseDate(k), h = PT(d0, c.lat, c.lon, c.fa, c.ia), hn = PT(addDays(d0, 1), c.lat, c.lon, c.fa, c.ia);
  const at = (hours, min = 0) => new Date(d0.getTime() + Math.round((hours * 60 + min)) * 60000);
  const r = { fajr: at(h.fajr, c.off.fajr), sunrise: at(h.sunrise), dhuhr: at(h.dhuhr, c.off.dhuhr), asr: at(h.asr, c.off.asr), maghrib: at(h.maghrib, c.off.maghrib), isha: at(h.isha, c.off.isha) };
  r.midnight = at(h.maghrib + ((hn.fajr + 24) - h.maghrib) / 2);
  r.win = { fajr: [r.fajr, r.sunrise], dhuhr: [r.dhuhr, r.asr], asr: [r.asr, r.maghrib], maghrib: [r.maghrib, r.isha], isha: [r.isha, r.midnight] };
  return (ptCache[key] = r);
}
const hm = d => `${d.getHours()} h ${pad(d.getMinutes())}`;
const leftTxt = ms => { const m = Math.max(1, Math.round(ms / 60000)); return m >= 60 ? `${Math.floor(m / 60)} h ${pad(m % 60)}` : `${m} min`; };
/* La prière en cours (aujourd'hui ou Isha d'hier après minuit) */
function prayerNow(now = new Date()) {
  for (const k of [todayISO(), iso(addDays(now, -1))]) {
    const t = ptDay(k);
    for (const id of Object.keys(t.win)) { const [a, b] = t.win[id]; if (now >= a && now < b) return { k, id, end: b, start: a }; }
  }
  return null;
}
function nextPrayer(now = new Date()) {
  for (const k of [todayISO(), iso(addDays(now, 1))]) { const t = ptDay(k); for (const id of Object.keys(t.win)) if (t.win[id][0] > now) return { k, id, start: t.win[id][0] }; }
  return null;
}
const prayerTracked = id => S.faith.habits.some(h => h.id === id && h.prayer);
/* Prières dont le temps est passé sans validation (depuis l'activation du suivi) */
function missedPrayers() {
  const now = new Date(), since = ptConf().since, out = [];
  for (const k of [iso(addDays(now, -1)), todayISO()]) {
    const t = ptDay(k), d = S.faith.log[k] || {};
    Object.keys(t.win).forEach(id => { const [a, b] = t.win[id]; if (prayerTracked(id) && b < now && a.getTime() >= since && !d[id] && !pausedAt(+b)) out.push({ k, id, start: a }); });
  }
  return out;
}
/* Pour une femme, prier chez soi vaut le maximum : pas de hiérarchie mosquée > maison. */
function prayerPts(id, v) { v = pv(v); return v === 's' || v === 'm' || v === 'g' ? 6 : v === 'r' ? 1 : 0; }
function setPrayer(k, id, v) {
  const d = S.faith.log[k] = S.faith.log[k] || {}, prev = d[id], n = needOf(k);
  const wasFull = dayDone(k) === n, today = k === todayISO() || k === iso(addDays(new Date(), -1));
  if (v) d[id] = v; else delete d[id];
  if (!Object.keys(d).length) delete S.faith.log[k];
  const full = dayDone(k) === n;
  save(); askPersist();
  if (today && prev && pv(prev) !== 'x') unreward(prayerPts(id, prev) + (wasFull && !full ? 5 : 0));
  if (today && prev === 'x') nourAdd(5);
  if (!v) { render(); return; }
  if (v === 'x') { nourAdd(-5); save(); refreshSun(); thud(); try { navigator.vibrate && navigator.vibrate(250); } catch (e) {} return; }
  if (!today) { render(); return; }
  const pts = prayerPts(id, v) + (full && !wasFull ? 5 : 0);
  const msg = v === 's' && !S.faith.homeSeen ? (S.faith.homeSeen = 1, save(), ['Chez toi, à l\'heure', 'Les meilleures mosquées des femmes sont le fond de leurs maisons.', 'Ahmad'])
    : v === 'm' ? ['À la mosquée', 'N\'empêchez pas les servantes d\'Allah d\'aller aux mosquées d\'Allah.', 'Bukhari, Muslim']
    : v === 'g' ? ['En groupe', 'La prière en groupe vaut vingt-sept fois celle faite seul.', 'Bukhari']
    : v === 'r' ? ['Rattrapée', 'Tu as tenu, c\'est ce qui compte. La prochaine, à l\'heure, in sha Allah.']
    : full && !wasFull ? ['Journée de foi complète', 'Qu\'Allah l\'accepte. Les actes les plus aimés sont les plus réguliers.'] : null;
  render();
  reward(pts, { big: full && !wasFull, msg, noBonus: v === 'r' });
}
/* Choix de la façon de prier : bulle au-dessus de la prière */
function openPrayerPick(btn) {
  closePrayerPick();
  const id = btn.dataset.prayer, k = F.day, cur = (S.faith.log[k] || {})[id], t = ptDay(k), now = new Date();
  if (pausedAt(+t.win[id][1])) { toast('Règles en cours : tes prières sont en pause. Ta série et ta régularité ne bougent pas.', 'Adorations', () => go('cycle'), 6000); return; }
  if (k === todayISO() && t.win[id][0] > now) { toast(`Pas encore l'heure : ${PNAMES[id]} commence à ${hm(t.win[id][0])}.`); return; }
  const wrap = btn.parentElement, pop = document.createElement('div');
  pop.className = 'ppick'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-label', `${PNAMES[id]} : comment l'as-tu faite ?`);
  pop.innerHTML = `<div class="ppick-o">${['s', 'm', 'g', 'r'].map(v => `<button data-pway="${v}" data-pid="${id}" aria-pressed="${pv(cur) === v}">${PICON(v, 18).replace('stroke-width="1.8"', 'stroke-width="1.4"')}<span>${PSHORT[v]}</span></button>`).join('')}</div>${cur ? `<button class="ppick-x" data-pway="" data-pid="${id}">Retirer</button>` : ''}`;
  wrap.appendChild(pop);
  const W = wrap.clientWidth, bx = btn.offsetLeft, by = btn.offsetTop, pw = pop.offsetWidth, ph = pop.offsetHeight;
  const left = Math.max(0, Math.min(W - pw, bx - pw / 2)), below = by - 40 - ph < -60;
  pop.style.left = `${left}px`;
  pop.style.top = `${below ? by + 40 : by - 40 - ph}px`;
  pop.style.setProperty('--cx', `${Math.max(22, Math.min(pw - 22, bx - left))}px`);
  if (below) pop.classList.add('below');
  requestAnimationFrame(() => pop.classList.add('on'));
}
function closePrayerPick() { $$('.ppick').forEach(p => p.remove()); }
/* Écran des prières non validées (le poids après) */
function missedOverlay() {
  if ($('#missed') || tab === 'z' || tab === 'flux') return;
  const list = missedPrayers(); if (!list.length) return;
  const el = document.createElement('div'); el.id = 'missed'; el.className = 'missed';
  const day = k => k === todayISO() ? 'aujourd\'hui' : 'hier';
  el.innerHTML = `<div class="in"><p class="eyebrow" style="color:#7E8F88">Prières non validées</p><h2>${list.length === 1 ? 'Une prière attend ta réponse.' : `${list.length} prières attendent ta réponse.`}</h2>
    <p class="small" style="color:#9DB0A8">Leur temps est passé sans que tu les valides. Sois honnête : c'est toi que ça sert.</p>
    ${list.map(p => `<div class="mrow" data-mk="${p.k}" data-mid="${p.id}"><p><b>${PNAMES[p.id]}</b> · ${day(p.k)}, ${hm(p.start)}</p><div class="mch">${['s', 'm', 'g', 'r', 'x'].map(v => `<button data-mway="${v}">${PICON(v, 18)}<span>${PWAY[v][0]}</span></button>`).join('')}</div></div>`).join('')}
    <button class="btn block" data-mdone style="margin-top:22px">Plus tard</button></div>`;
  document.body.appendChild(el); thud();
}

function toggleHabit(id) {
  const k = F.day, d = S.faith.log[k] = S.faith.log[k] || {};
  const on = !d[id], h = S.faith.habits.find(x => x.id === id), pts = h && h.prayer ? 2 : 1;
  if (d[id]) delete d[id]; else { d[id] = true; haptic(); }
  if (!Object.keys(d).length) delete S.faith.log[k];
  save(); askPersist(); render();
  const full = dayDone(k) === needOf(k);
  if (k !== todayISO()) { if (full && on) toast('Journée complète.'); return; }
  if (!on) { unreward(pts + (dayDone(k) === needOf(k) - 1 ? 5 : 0)); return; }
  if (full) reward(pts + 5, { big: true, msg: ['Journée de foi complète', 'Qu\'Allah l\'accepte. Les actes les plus aimés sont les plus réguliers.'] });
  else reward(pts);
}

/* ----- Onglet Business ----- */
const STAGES = ['Idée', 'Validation', 'Lancement', 'En activité'];
function vBusiness() {
  const st = bizStatus();
  if (!S.unlocks.business) {
    const skillRows = st.skills.map(s => condRow(s.d === s.t, BIZ_LABEL[s.k], s.t ? s.d / s.t : 0, s.d === s.t ? 'Acquis.' : `${s.t - s.d} acquis restant${s.t - s.d > 1 ? 's' : ''} · mois ${s.months.join(', ')} du parcours`)).join('');
    const f = st.faith;
    return `${pageHead('Business', 'S\'ouvre quand les fondations sont posées.', 'business')}
    <div class="locked-hero">
      <span class="lock-big">${lockIcon.replace('width="18" height="18"', 'width="34" height="34"')}</span>
      <p>Cet onglet se déverrouille quand tes <b>6 compétences clés</b> sont acquises et que ta <b>régularité de foi</b> atteint ${Math.round(FAITH_GOAL * 100)} % sur 30 jours.</p>
      <div class="row" style="gap:22px;margin-top:14px;justify-content:center">
        <div><b class="num">${st.left}</b><span>acquis restants</span></div>
        <div><b class="num">${Math.round(f.pct * 100)} %</b><span>régularité (objectif ${Math.round(FAITH_GOAL * 100)})</span></div>
      </div>
    </div>
    <section><div class="row between" style="margin-bottom:14px"><h2 style="margin:0">Compétences clés</h2>${st.skillsOk ? '<span class="pill mint">Validé</span>' : ''}</div>${skillRows}
      <button class="btn sm ghost" data-goto="parcours">Ouvrir le parcours</button></section>
    <section><div class="row between" style="margin-bottom:14px"><h2 style="margin:0">Foi</h2>${st.faithOk ? '<span class="pill mint">Validé</span>' : ''}</div>
      ${condRow(st.faithOk, 'Régularité sur 30 jours', f.pct / FAITH_GOAL, st.faithOk ? 'Quota atteint.' : `${Math.round(f.pct * 100)} % aujourd'hui · il manque ${f.need} coche${f.need > 1 ? 's' : ''} · ${f.tracked}/${FAITH_DAYS} jours suivis`)}
      <button class="btn sm ghost" data-goto="foi">Ouvrir le tracker</button></section>`;
  }
  const P2 = S.biz.projects;
  const warn = [];
  if (!st.faithOk) warn.push(`ta régularité de foi est à ${Math.round(st.faith.pct * 100)} %`);
  return `${pageHead('Business', `Débloqué le ${new Date(S.unlocks.business).toLocaleDateString('fr-FR')}. À toi de construire.`, 'businessOn')}
    ${warn.length ? `<div class="alert">${ICON.warn}<span>Garde tes fondations : ${warn.join(', ')}.</span></div>` : ''}
    <section><h2>Mes projets</h2>
      ${P2.map(p => `<div class="proj">
        <input class="proj-name" data-pset="${p.id}.name" value="${esc(p.name)}" placeholder="Nom du projet" aria-label="Nom du projet">
        <div class="chips" style="margin-top:8px">${STAGES.map((s, i) => `<button class="chip" data-pstage="${p.id}.${i}" aria-pressed="${p.stage === i}">${s}</button>`).join('')}</div>
        <input class="proj-next" data-pset="${p.id}.next" value="${esc(p.next || '')}" placeholder="Prochaine action concrète" aria-label="Prochaine action">
        <button class="link-btn small" data-pdel="${p.id}" style="color:var(--muted);min-width:0;padding:0">Supprimer</button></div>`).join('') || '<p class="empty">Aucun projet pour l\'instant.</p>'}
      <button class="btn block" data-padd style="margin-top:14px">+ Nouveau projet</button>
      <p class="hint">Un projet avance d'une étape quand il a une prochaine action claire. Valide avant d'investir (mois 9 du parcours).</p></section>`;
}

/* =====================================================================
   12 quater. CORPS — entraînement, nutrition, soin & sommeil
   Repères (sources dans NOTES.md) :
   - Prise de muscle propre : +0,25 à 0,5 % du poids par semaine (Iraki et al. 2019).
   - Protéines : ~1,6 g/kg suffit à la plupart, jusqu'à 2,2 g/kg (Morton et al. 2018) → cible 1,8 g/kg, en 4 prises.
   - Volume : ~10 séries par muscle et par semaine pour démarrer (Schoenfeld et al. 2017).
   - Sommeil : une nuit blanche réduit la synthèse des protéines musculaires d'environ 18 % (Lamon et al. 2021).
   - Mémoire musculaire : le muscle revient vite, tendons et articulations plus lentement → 4 semaines de reprise.
   - Fitra : ongles, moustache, aisselles, pubis, pas plus de 40 nuits (Muslim 258).
   ===================================================================== */
const EX = {
  // Maison, poids du corps
  squat_pdc: { n: 'Squat', cue: 'Pieds largeur d\'épaules, hanches sous les genoux, dos neutre.', v: ['Squat', 'Squat tempo (3 s en descente)', 'Squat pause (2 s en bas)'] },
  pompes: { n: 'Pompes', cue: 'Corps gainé, coudes à 45°, poitrine à 2 cm du sol.', v: ['Pompes inclinées (mains sur une table)', 'Pompes classiques', 'Pompes pieds surélevés', 'Pompes archer'] },
  row_table: { n: 'Rowing sous une table', cue: 'Allongé sous une table solide, tire ta poitrine vers le bord, omoplates serrées.', v: ['Rowing table, genoux pliés', 'Rowing table, jambes tendues', 'Rowing table, pieds surélevés'] },
  fentes: { n: 'Fentes arrière', cue: 'Grand pas en arrière, genou avant au-dessus de la cheville. Reps par jambe.', v: ['Fentes arrière', 'Fentes arrière tempo', 'Squat bulgare (pied sur une chaise)'] },
  planche: { n: 'Planche', cue: 'Coudes sous les épaules, fessiers serrés, respire.', sec: true },
  pont: { n: 'Pont fessier', cue: 'Pousse dans les talons, serre les fessiers 1 s en haut.', v: ['Pont fessier', 'Pont fessier une jambe'] },
  pike: { n: 'Pompes piquées', cue: 'Hanches hautes en V, la tête descend entre les mains : ce sont tes épaules qui travaillent.', v: ['Pompes piquées', 'Pompes piquées pieds surélevés'] },
  superman: { n: 'Superman en Y', cue: 'À plat ventre, bras en Y, décolle poitrine et bras, 2 s de pause.' },
  deadbug: { n: 'Dead bug', cue: 'Dos plaqué au sol, bras et jambe opposés s\'allongent lentement.' },
  // Salle
  squat: { n: 'Squat barre', cue: 'Barre sur les trapèzes, gainé, descends au moins à la parallèle.', kg: true, alt: 'ou presse à cuisses' },
  bench: { n: 'Développé couché', cue: 'Omoplates serrées, barre au bas des pectoraux, pieds ancrés.', kg: true },
  rowb: { n: 'Rowing buste penché', cue: 'Dos plat à 45°, tire vers le nombril.', kg: true, alt: 'ou rowing à la machine' },
  lat: { n: 'Élévations latérales', cue: 'Haltères légers, monte jusqu\'à hauteur d\'épaules.', kg: true },
  curl: { n: 'Curl biceps', cue: 'Coudes fixes, descente contrôlée.', kg: true },
  rdl: { n: 'Soulevé de terre roumain', cue: 'Genoux à peine fléchis, pousse les hanches en arrière, barre contre les cuisses.', kg: true },
  ohp: { n: 'Développé militaire haltères', cue: 'Gainé, pousse au-dessus de la tête sans cambrer.', kg: true },
  pulldown: { n: 'Tirage vertical', cue: 'Barre vers le haut de la poitrine, coudes vers les hanches.', kg: true, alt: 'ou tractions assistées' },
  lunge: { n: 'Fentes marchées haltères', cue: 'Grands pas, buste droit. Reps par jambe.', kg: true },
  tri: { n: 'Extension triceps à la poulie', cue: 'Coudes collés au corps, extension complète.', kg: true },
  calf: { n: 'Mollets debout', cue: 'Amplitude complète, 1 s en haut, 1 s en bas.', kg: true },
  incl: { n: 'Développé incliné haltères', cue: 'Banc à 30°, descends jusqu\'à l\'étirement des pectoraux.', kg: true },
  pullup: { n: 'Tractions', cue: 'Menton au-dessus de la barre. Lest en kg, ou assistance en kg négatifs.', kg: true },
  dips: { n: 'Dips', cue: 'Buste légèrement penché, descends jusqu\'à 90° aux coudes.', kg: true },
  row1: { n: 'Rowing haltère un bras', cue: 'Main et genou sur le banc, tire vers la hanche.', kg: true },
  face: { n: 'Face pull', cue: 'Corde à hauteur des yeux, tire vers le front, coudes hauts.', kg: true },
  hammer: { n: 'Curl marteau', cue: 'Prise neutre, coudes fixes.', kg: true },
  ohtri: { n: 'Extension triceps au-dessus de la tête', cue: 'Coudes serrés, grand étirement en bas.', kg: true },
  press: { n: 'Presse à cuisses', cue: 'Bas du dos collé au dossier, descends profond.', kg: true },
  legcurl: { n: 'Leg curl', cue: 'Descente contrôlée sur 2 s.', kg: true },
  deadlift: { n: 'Soulevé de terre', cue: 'Barre contre les tibias, dos plat, pousse le sol.', kg: true },
  bulg: { n: 'Squat bulgare haltères', cue: 'Pied arrière sur le banc, genou avant stable. Reps par jambe.', kg: true },
  legext: { n: 'Leg extension', cue: '1 s de contraction en haut.', kg: true },
  hipthrust: { n: 'Hip thrust', cue: 'Dos contre le banc, menton rentré, verrouille les fessiers en haut.', kg: true },
  raises: { n: 'Relevés de jambes suspendu', cue: 'Sans élan, enroule le bassin.' }
};
/* Programme : [exercice, séries, reps min, reps max (ou secondes), repos en s] */
const PROG = [
  { id: 1, name: 'Réveil', where: 'Maison · poids du corps', perWeek: 3,
    why: 'Tes muscles reviennent vite (mémoire musculaire), tes tendons et articulations beaucoup plus lentement. 4 semaines pour retrouver la technique et le rythme de 3 séances, sans te blesser.',
    tpl: { A: [['squat_pdc', 3, 12, 20, 60], ['pompes', 3, 6, 15, 90], ['row_table', 3, 6, 12, 90], ['fentes', 2, 8, 12, 60], ['planche', 3, 20, 45, 45]],
           B: [['pont', 3, 12, 20, 60], ['pike', 3, 6, 12, 90], ['row_table', 3, 6, 12, 90], ['fentes', 3, 8, 12, 60], ['superman', 2, 10, 15, 45], ['deadbug', 2, 8, 12, 45]] } },
  { id: 2, name: 'Forge', where: 'Salle · corps entier', perWeek: 3,
    why: 'Chaque muscle travaillé 3 fois par semaine, avec des charges qui montent dès que tu atteins le haut de la fourchette. C\'est ici que se construit l\'essentiel.',
    tpl: { A: [['squat', 3, 6, 10, 150], ['bench', 3, 6, 10, 150], ['rowb', 3, 8, 12, 120], ['lat', 3, 12, 20, 60], ['curl', 2, 10, 15, 60], ['planche', 2, 30, 60, 45]],
           B: [['rdl', 3, 8, 12, 150], ['ohp', 3, 8, 12, 120], ['pulldown', 3, 8, 12, 120], ['lunge', 2, 10, 12, 90], ['tri', 2, 10, 15, 60], ['calf', 3, 10, 15, 60]] } },
  { id: 3, name: 'Sculpture', where: 'Salle · haut / bas', perWeek: 4,
    why: 'Plus de volume par muscle, réparti sur 4 séances. Pour quand ta base est solide et que tes charges montent moins vite.',
    tpl: { 'Haut A': [['bench', 4, 6, 10, 150], ['rowb', 4, 8, 10, 120], ['incl', 3, 8, 12, 90], ['pulldown', 3, 8, 12, 90], ['lat', 3, 12, 20, 60], ['curl', 2, 10, 15, 60], ['tri', 2, 10, 15, 60]],
           'Bas A': [['squat', 4, 6, 10, 180], ['rdl', 3, 8, 10, 150], ['press', 3, 10, 15, 90], ['legcurl', 3, 10, 15, 60], ['calf', 3, 10, 15, 60], ['planche', 2, 30, 60, 45]],
           'Haut B': [['ohp', 4, 6, 10, 150], ['pullup', 4, 6, 10, 150], ['dips', 3, 8, 12, 90], ['row1', 3, 8, 12, 90], ['face', 3, 12, 20, 60], ['hammer', 2, 10, 15, 60], ['ohtri', 2, 10, 15, 60]],
           'Bas B': [['deadlift', 3, 4, 6, 180], ['bulg', 3, 8, 12, 90], ['hipthrust', 3, 8, 12, 90], ['legext', 3, 12, 15, 60], ['calf', 3, 10, 15, 60], ['raises', 3, 8, 15, 60]] } }
];
const UNLOCK = { 2: { from: 1, need: 12 }, 3: { from: 2, need: 36 } };
const FOODS = [['Œufs ×3', 19], ['Poulet 150 g', 45], ['Steak haché 5 % 125 g', 26], ['Thon, 1 boîte', 28], ['Skyr 150 g', 15], ['Fromage blanc 200 g', 15], ['Lentilles cuites 200 g', 18], ['Lait 250 ml', 8],
  ['Sardines, 1 boîte', 22], ['Poisson blanc 150 g', 30], ['Pois chiches cuits 200 g', 16], ['Flocons d\'avoine 80 g', 10], ['Whey, 1 dose', 24], ['Amandes 30 g', 6]];
const FITRA = [['ongles', 'Ongles'], ['moustache', 'Moustache'], ['aisselles', 'Aisselles'], ['pubis', 'Poils intimes']];
const FITRA_MAX = 40;
const C = { view: 'entrainement', edit: false, allFoods: false };
try { const v = localStorage.getItem('zia-corps-view'); if (['entrainement', 'nutrition', 'soin'].includes(v)) C.view = v; } catch (e) {}
function setCView(v) { C.view = v; try { localStorage.setItem('zia-corps-view', v); } catch (e) {} }

function defaultBody() {
  return {
    phase: 1, gym: false, unlocks: {}, sessions: [], active: null, level: {},
    profile: { weight: '', height: '', age: '24', fast: false, adj: 0, adjAt: '' },
    food: {}, fcount: {}, weights: [], sleep: {}, wake: '04:30',
    care: { list: [{ id: 'dents-m', name: 'Dents le matin' }, { id: 'dents-s', name: 'Dents le soir + fil dentaire' }, { id: 'douche', name: 'Douche' }, { id: 'visage', name: 'Visage : nettoyant + crème' }], log: {} },
    fitra: {}, ghusl: {}
  };
}
function normalizeBody(sb) {
  const d = defaultBody(); sb = sb && typeof sb === 'object' ? sb : {};
  const b = Object.assign(d, sb);
  b.profile = Object.assign(defaultBody().profile, sb.profile || {});
  b.care = { list: sb.care && Array.isArray(sb.care.list) && sb.care.list.length ? sb.care.list : d.care.list, log: sb.care && sb.care.log && typeof sb.care.log === 'object' ? sb.care.log : {} };
  ['unlocks', 'level', 'food', 'fcount', 'sleep', 'nap', 'fitra', 'ghusl'].forEach(k => { if (!b[k] || typeof b[k] !== 'object' || Array.isArray(b[k])) b[k] = {}; });
  ['sessions', 'weights'].forEach(k => { if (!Array.isArray(b[k])) b[k] = []; });
  if (![1, 2, 3].includes(b.phase)) b.phase = 1;
  return b;
}

/* ----- Calculs ----- */
const phaseOf = id => PROG.find(p => p.id === id) || PROG[0];
const kgTxt = w => `${String(Math.round(w * 100) / 100).replace('.', ',')} kg`;
const unitOf = id => EX[id].sec ? 's' : 'reps';
const exName = id => { const e = EX[id]; return e.v ? e.v[Math.min(S.body.level[id] || 0, e.v.length - 1)] : e.n; };
const fmtClock = m => { m = ((Math.round(m) % 1440) + 1440) % 1440; return `${Math.floor(m / 60)} h ${pad(m % 60)}`; };
const fmtDur = m => `${Math.floor(m / 60)} h${m % 60 ? ' ' + pad(m % 60) : ''}`;
function weekSessions(d = new Date()) { const a = iso(mondayOf(d)), b = iso(addDays(mondayOf(d), 6)); return S.body.sessions.filter(s => s.date >= a && s.date <= b); }
const phaseCount = id => S.body.sessions.filter(s => s.phase === id).length;
function nextTpl(ph) { const keys = Object.keys(ph.tpl), last = S.body.sessions.filter(s => s.phase === ph.id).slice(-1)[0]; return last ? keys[(keys.indexOf(last.tpl) + 1) % keys.length] : keys[0]; }
function phaseStatus(id) {
  if (id === 1 || S.body.unlocks[id]) return { open: true, p: 1 };
  const u = UNLOCK[id], n = phaseCount(u.from);
  return { open: false, n, need: u.need, gymOk: id !== 2 || S.body.gym, p: Math.min(1, n / u.need) };
}
function checkBodyUnlocks() {
  [2, 3].forEach(id => {
    if (S.body.unlocks[id]) return;
    const u = UNLOCK[id];
    if (phaseCount(u.from) >= u.need && (id !== 2 || S.body.gym)) { S.body.unlocks[id] = todayISO(); save(); setTimeout(() => toast(`Étape ${phaseOf(id).name} débloquée. Choisis-la sur ta piste.`), 600); }
  });
}
const isFastDay = (k = todayISO()) => !!S.body.profile.fast && [1, 4].includes(parseDate(k).getDay());
/* Dernière perf sur cet exercice (même variante) */
function lastPerf(id) {
  const lvl = S.body.level[id] || 0;
  for (let i = S.body.sessions.length - 1; i >= 0; i--) {
    const s = S.body.sessions[i];
    if (s.sets[id] && s.sets[id].length && (!EX[id].v || ((s.v || {})[id] || 0) === lvl)) return s.sets[id];
  }
  return null;
}
/* Double progression : on monte la charge quand toutes les séries atteignent le haut de la fourchette */
function suggest(id, sets, lo, hi) {
  const e = EX[id], u = e.sec ? ' s' : '', lp = lastPerf(id);
  if (!lp) return { r: lo, w: '', txt: e.kg ? 'Première fois : prends une charge avec laquelle tu t\'arrêtes à 2 reps de l\'échec.' : `Vise ${lo} à ${hi}${u || ' reps'} par série, en gardant 1 ou 2 reps en réserve.` };
  const w = e.kg ? Math.max(...lp.map(x => numv(x.w))) : '';
  const perf = `Dernière fois : ${lp.map(x => x.r).join(' · ')}${u}${e.kg && w ? ` à ${kgTxt(w)}` : ''}.`;
  if (lp.length >= sets && lp.every(x => x.r >= hi)) {
    if (e.kg) return { r: lo, w: w + 2.5, up: true, txt: `${perf} Haut de fourchette partout : monte à ${kgTxt(w + 2.5)} et repars à ${lo}.` };
    if (e.v && (S.body.level[id] || 0) < e.v.length - 1) return { r: hi, w: '', up: true, txt: `${perf} Haut de fourchette partout : passe à la variante plus dure avec ›.` };
    return { r: hi, w: '', txt: `${perf} Au plafond : ralentis la descente (3 s) pour garder l'effort.` };
  }
  return { r: Math.min(hi, lp[0].r), w, txt: `${perf} Bats au moins une série.` };
}
function estMinutes(tpl) { return Math.round(5 + tpl.reduce((m, [, s, , , rest]) => m + s * (45 + rest) / 60, 0)); }

/* Nutrition : Mifflin-St Jeor × 1,55 (deux emplois debout + 3 séances) + 300 kcal */
function sortedWeights() { return S.body.weights.slice().sort((a, b) => (a.date < b.date ? -1 : 1)); }
function bodyWeight() { const ws = sortedWeights(); return ws.length ? numv(ws[ws.length - 1].kg) : numv(S.body.profile.weight); }
function bodyTargets() {
  const pr = S.body.profile, w = bodyWeight(), h = numv(pr.height), a = numv(pr.age) || 24;
  if (!w || !h) return null;
  const bmr = 10 * w + 6.25 * h - 5 * a + 5, tdee = bmr * 1.55;
  return { w, kcal: Math.round((tdee + 300 + numv(pr.adj)) / 50) * 50, maint: Math.round(tdee / 50) * 50, prot: Math.round(w * 1.8 / 5) * 5, lo: w * 0.0025, hi: w * 0.005, water: Math.max(8, Math.round(w * 35 / 250)) };
}
const foodDay = (k = todayISO()) => S.body.food[k] || { p: 0, water: 0, log: [] };
function weightVerdict(t) {
  const ws = sortedWeights(); if (ws.length < 2) return null;
  const last = ws[ws.length - 1], from = iso(addDays(parseDate(last.date), -28)), pts = ws.filter(w => w.date >= from);
  if (pts.length < 2) return null;
  const xs = pts.map(p => (parseDate(p.date) - parseDate(pts[0].date)) / 864e5), ys = pts.map(p => numv(p.kg));
  if (xs[xs.length - 1] < 10) return { wait: true };
  const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
  let num = 0, den = 0; xs.forEach((x, i) => { num += (x - mx) * (ys[i] - my); den += (x - mx) ** 2; });
  const rate = den ? num / den * 7 : 0;
  return { rate, st: rate < t.lo ? 'slow' : rate > t.hi ? 'fast' : 'ok' };
}

/* ----- En-tête Corps ----- */
function corpsTop(view) {
  return `${pageHead('Corps', 'Un esprit sain dans un corps sain.', { entrainement: 'corps', nutrition: 'nutri', soin: 'soin' }[view])}
  <div class="seg seg3" role="group" aria-label="Section" style="margin-top:20px">
    <button data-cview="entrainement" aria-pressed="${view === 'entrainement'}">Entraînement</button>
    <button data-cview="nutrition" aria-pressed="${view === 'nutrition'}">Nutrition</button>
    <button data-cview="soin" aria-pressed="${view === 'soin'}">Soin</button>
  </div>`;
}

/* ----- Entraînement ----- */
function phaseTrack() {
  const xs = [34, 165, 296], cur = S.body.phase;
  const st = PROG.map(p => phaseStatus(p.id));
  const segs = [0, 1].map(i => {
    const p = st[i + 1].p, x0 = xs[i] + 26, x1 = xs[i + 1] - 26;
    return `<line x1="${x0}" y1="36" x2="${x1}" y2="36" stroke="var(--line)" stroke-width="4" stroke-linecap="round"/>
      <line x1="${x0}" y1="36" x2="${(x0 + (x1 - x0) * p).toFixed(1)}" y2="36" stroke="var(--gold)" stroke-width="4" stroke-linecap="round"/>`;
  }).join('');
  const nodes = PROG.map((p, i) => {
    const s = st[i], on = p.id === cur;
    return `<g class="pnode" data-phase="${p.id}" transform="translate(${xs[i]} 36)" role="button" tabindex="0" aria-label="Étape ${p.id}, ${p.name}${s.open ? '' : ', verrouillée'}${on ? ', en cours' : ''}">
      <circle r="34" fill="transparent"/>
      ${on ? '<circle r="31" fill="var(--glow)"/>' : ''}
      <circle class="pb" r="24" fill="${on ? 'var(--gold)' : 'var(--surface)'}" stroke="${s.open ? 'var(--gold)' : 'var(--orbit)'}" stroke-width="2"/>
      ${s.open ? `<text y="1" text-anchor="middle" dominant-baseline="central" style="font:400 22px var(--serif);fill:${on ? 'var(--gold-ink)' : 'var(--gold)'}">${p.id}</text>`
        : `<svg x="-9" y="-9" width="18" height="18" viewBox="0 0 24 24" style="color:var(--muted)">${GLYPH.lock}</svg>`}
      <text y="46" text-anchor="middle" style="font-size:12px;font-weight:700;fill:${on ? 'var(--gold)' : 'var(--ink-2)'}">${p.name}</text>
      <text y="61" text-anchor="middle" style="font-size:9.5px;fill:var(--muted)">${p.where.split(' · ')[0]}</text></g>`;
  }).join('');
  return `<div class="ptrack"><svg viewBox="0 0 330 104" aria-label="Tes 3 étapes">${segs}${nodes}</svg></div>`;
}
function unlockBlock(ph) {
  const nxt = PROG.find(p => p.id === ph.id + 1); if (!nxt) return '';
  const s = phaseStatus(nxt.id);
  if (s.open) return S.body.phase === ph.id ? `<div class="alert" style="background:var(--mint-soft);color:var(--mint)">${ICON.tick.replace('<svg', '<svg style="stroke:currentColor;stroke-width:2.5;fill:none"')}<span>L'étape ${nxt.name} est ouverte. Touche-la sur la piste quand tu es prêt.</span></div>` : '';
  let h = `<p class="eyebrow" style="margin-top:18px">Pour ouvrir ${nxt.name}</p>`;
  h += condRow(s.n >= s.need, `${s.need} séances de ${ph.name}`, s.n / s.need, s.n >= s.need ? 'Fait.' : `${s.n} sur ${s.need} · encore ${s.need - s.n}`);
  if (nxt.id === 2) h += `<label class="cell tap gymrow"><span class="lbl">Je suis inscrit à la salle</span><span class="switch"><input type="checkbox" id="gymSw" ${S.body.gym ? 'checked' : ''}><span></span></span></label>
    <p class="hint">La salle se mérite : 12 séances à la maison d'abord. Tu ne paies l'abonnement qu'une fois l'habitude installée.</p>`;
  return h;
}
function spark(vals, w = 84, h = 26) {
  if (vals.length < 2) return '';
  const mn = Math.min(...vals), mx = Math.max(...vals), rg = mx - mn || 1;
  const pts = vals.map((v, i) => `${(i / (vals.length - 1) * (w - 6) + 3).toFixed(1)},${(h - 3 - (v - mn) / rg * (h - 6)).toFixed(1)}`);
  const [lx, ly] = pts[pts.length - 1].split(',');
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><polyline points="${pts.join(' ')}" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${lx}" cy="${ly}" r="2.6" fill="var(--gold)"/></svg>`;
}
function progressRows(ph) {
  const ids = [...new Set(Object.values(ph.tpl).flat().map(x => x[0]))];
  const rows = ids.map(id => {
    const e = EX[id], lvl = S.body.level[id] || 0;
    const vals = S.body.sessions.filter(s => s.sets[id] && (!e.v || ((s.v || {})[id] || 0) === lvl))
      .map(s => e.kg ? Math.max(...s.sets[id].map(x => numv(x.w))) : Math.max(...s.sets[id].map(x => x.r))).slice(-10);
    if (!vals.length) return '';
    const last = vals[vals.length - 1];
    return `<div class="prog-row"><span class="grow">${esc(exName(id))}</span><b class="num">${e.kg ? kgTxt(last) : `${last} ${e.sec ? 's' : 'reps'}`}</b>${spark(vals) || '<span></span>'}</div>`;
  }).join('');
  return rows ? `<section><h2>Tes progrès</h2><p class="small muted" style="margin:-8px 0 8px">${ph.id === 1 ? 'Meilleure série de chaque exercice, séance après séance.' : 'Charge de travail, séance après séance.'}</p>${rows}</section>` : '';
}
function vTraining() {
  if (S.body.active) return vSession();
  const ph = phaseOf(S.body.phase), wk = weekSessions(), n = wk.length, per = ph.perWeek;
  const key = nextTpl(ph), tpl = ph.tpl[key], mon = mondayOf(new Date()), today = todayISO();
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((l, i) => {
    const k = iso(addDays(mon, i)), did = wk.some(s => s.date === k);
    return `<span class="${did ? 'on' : ''} ${k === today ? 'today' : ''} ${isFastDay(k) ? 'fast' : ''}"><i>${did ? ICON.tick : ''}</i>${l}</span>`;
  }).join('');
  const recent = S.body.sessions.slice(-3).reverse();
  return `${corpsTop('entrainement')}
  <figure class="hadith"><p class="ar" lang="ar" dir="rtl">الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ</p>
    <figcaption>« Le croyant fort est meilleur et plus aimé d'Allah que le croyant faible, et en chacun il y a du bien. » Muslim</figcaption></figure>
  ${phaseTrack()}
  <div class="phase-card"><p class="eyebrow">Étape ${ph.id} · ${ph.where} · ${per} séances / semaine</p><h3>${ph.name}</h3><p class="small" style="color:var(--ink-2);margin:0">${ph.why}</p>${unlockBlock(ph)}</div>
  <section>
    <div class="row between" style="align-items:flex-end"><h2 style="margin:0">Cette semaine</h2><p class="num" style="font:400 2.25rem/1 var(--serif);margin:0;color:var(--${n >= per ? 'mint' : 'gold'})">${n}<span style="font-size:1.1rem;color:var(--muted)">/${per}</span></p></div>
    <div class="wk">${days}</div>
    ${S.body.profile.fast ? '<p class="hint"><span class="fdot"></span> jours de jeûne (lundi, jeudi) : repos, ou séance légère après l\'iftar.</p>' : ''}
    ${isFastDay() ? `<div class="alert">${ICON.warn}<span>Jour de jeûne. Mieux vaut te reposer, ou t'entraîner après l'iftar, une fois hydraté et nourri.</span></div>` : ''}
    <div class="next-card">
      <p class="eyebrow">${n >= per ? 'Objectif de la semaine atteint' : 'Prochaine séance'}</p>
      <h3>Séance ${key}</h3>
      <p class="small muted" style="margin:0">≈ ${estMinutes(tpl)} min · ${tpl.length} exercices · échauffement compris</p>
      <ul class="ex-prev">${tpl.map(([id, s, lo, hi]) => `<li><span>${esc(exName(id))}</span><b>${s} × ${lo}–${hi}${EX[id].sec ? ' s' : ''}</b></li>`).join('')}</ul>
      <button class="btn block" data-cstart>Commencer la séance</button>
      ${n >= per ? '<p class="hint">Le muscle grandit pendant le repos. Une séance de plus reste possible si tu es frais.</p>' : ''}
    </div>
  </section>
  ${progressRows(ph)}
  ${recent.length ? `<section><h2>Dernières séances</h2>${recent.map(s => `<div class="prog-row"><span class="grow">${DAY_LONG.format(parseDate(s.date))}</span><b>${esc(phaseOf(s.phase).name)} · ${esc(s.tpl)}</b><span class="small muted" style="text-align:right">${s.min || '—'} min</span></div>`).join('')}</section>` : ''}`;
}
function sessLine() {
  const a = S.body.active, ph = phaseOf(a.phase), tpl = ph.tpl[a.tpl] || [];
  const tot = tpl.reduce((m, x) => m + x[1], 0), dn = Object.values(a.sets).reduce((m, arr) => m + (arr || []).filter(Boolean).length, 0);
  return `${Math.max(0, Math.round((Date.now() - a.start) / 60000))} min · ${dn}/${tot} séries`;
}
function vSession() {
  const a = S.body.active, ph = phaseOf(a.phase), tpl = ph.tpl[a.tpl] || [];
  const cards = tpl.map(([id, sets, lo, hi, rest], ei) => {
    const e = EX[id], lvl = S.body.level[id] || 0, sg = suggest(id, sets, lo, hi), done = a.sets[id] || [];
    let prevW = sg.w;
    const rows = Array.from({ length: sets }, (_, i) => {
      const d = done[i]; if (d && e.kg) prevW = d.w;
      const wv = d ? d.w : prevW;
      return `<div class="set-row ${e.kg ? '' : 'bw'} ${d ? 'done' : ''}"><span class="set-n">${i + 1}</span>
        <label class="set-f"><input inputmode="numeric" id="r-${id}-${i}" value="${d ? d.r : ''}" placeholder="${sg.r}" aria-label="Série ${i + 1}, ${e.sec ? 'secondes' : 'répétitions'}" ${d ? 'disabled' : ''}><span>${e.sec ? 's' : 'reps'}</span></label>
        ${e.kg ? `<label class="set-f"><input inputmode="decimal" id="w-${id}-${i}" value="${wv === '' || wv == null ? '' : String(wv).replace('.', ',')}" placeholder="—" aria-label="Série ${i + 1}, charge" ${d ? 'disabled' : ''}><span>kg</span></label>` : ''}
        <button class="set-ok" data-set="${id}.${i}" aria-pressed="${!!d}" aria-label="Série ${i + 1} ${d ? 'faite, toucher pour annuler' : 'faite'}">${ICON.tick}</button></div>`;
    }).join('');
    const nDone = done.filter(Boolean).length;
    return `<article class="ex-card ${nDone >= sets ? 'complete' : ''}">
      <div class="row between" style="align-items:flex-start"><div class="grow"><p class="eyebrow">${ei + 1}/${tpl.length} · ${sets} × ${lo}–${hi} ${e.sec ? 's' : 'reps'} · repos ${rest >= 60 ? `${Math.floor(rest / 60)} min${rest % 60 ? ' ' + rest % 60 : ''}` : rest + ' s'}</p><h3 class="ex-name">${esc(exName(id))}</h3></div>
      ${e.v ? `<div class="lvl"><button data-lvl="${id}.-1" aria-label="Variante plus facile" ${lvl === 0 ? 'disabled' : ''}>‹</button><button data-lvl="${id}.1" aria-label="Variante plus dure" ${lvl >= e.v.length - 1 ? 'disabled' : ''}>›</button></div>` : ''}</div>
      <p class="small muted" style="margin:0">${e.cue}${e.alt ? ` <i>(${e.alt})</i>` : ''}</p>
      <p class="sugg ${sg.up ? 'up' : ''}">${sg.txt}</p>
      ${rows}</article>`;
  }).join('');
  return `<header class="top"><div><p class="eyebrow">${ph.name} · séance en cours</p><h1>Séance <em>${esc(a.tpl)}</em></h1><p id="sessEl" class="num">${sessLine()}</p></div></header>
  <details class="warm"><summary>Échauffement · 5 min</summary><p>30 s de jumping jacks, 10 rotations d'épaules, 10 squats lents, 10 pompes faciles. Puis, pour le premier exercice, 1 ou 2 séries légères.</p></details>
  ${cards}
  <button class="btn block" data-cfinish style="margin-top:22px">Terminer la séance</button>
  <button class="btn block quiet" data-cabort style="margin-top:10px">Abandonner</button>
  <p class="hint">Touche ✓ quand une série est faite : si tu n'as rien tapé, le chiffre grisé est retenu et le repos se lance. Tes notes sont gardées même si tu quittes l'app.</p>`;
}
function startSession() {
  const ph = phaseOf(S.body.phase);
  S.body.active = { phase: ph.id, tpl: nextTpl(ph), start: Date.now(), sets: {}, v: {} };
  save(); audioUnlock(); render(true); window.scrollTo(0, 0);
}
function doSet(id, i) {
  const a = S.body.active; if (!a) return;
  const arr = a.sets[id] = a.sets[id] || [];
  if (arr[i]) { arr[i] = null; while (arr.length && !arr[arr.length - 1]) arr.pop(); save(); render(); return; }
  const rIn = $(`#r-${id}-${i}`), wIn = $(`#w-${id}-${i}`);
  const r = parseInt((rIn.value || rIn.placeholder || '').replace(/\D/g, ''), 10) || 0;
  if (!r) { toast('Indique ce que tu as fait.'); rIn.focus(); return; }
  const w = wIn ? numv((wIn.value || '').replace(/\s/g, '').replace(',', '.')) : '';
  arr[i] = { r, w }; a.v[id] = S.body.level[id] || 0;
  audioUnlock(); save(); reward(1);
  const tplRow = (phaseOf(a.phase).tpl[a.tpl] || []).find(x => x[0] === id);
  const sy = window.scrollY; render(); window.scrollTo(0, sy);
  const allDone = (phaseOf(a.phase).tpl[a.tpl] || []).every(([x, s]) => (a.sets[x] || []).filter(Boolean).length >= s);
  if (allDone) { stopRest(); toast('Tout est fait. Termine ta séance.'); } else if (tplRow) startRest(tplRow[4]);
}
function finishSession() {
  const a = S.body.active; if (!a) return;
  const sets = {}; let n = 0;
  Object.keys(a.sets).forEach(id => { const arr = (a.sets[id] || []).filter(Boolean); if (arr.length) { sets[id] = arr; n += arr.length; } });
  stopRest();
  if (!n) { S.body.active = null; save(); render(); toast('Séance fermée : aucune série notée.'); return; }
  S.body.sessions.push({ id: uid(), date: iso(new Date(a.start)), phase: a.phase, tpl: a.tpl, sets, v: a.v || {}, min: Math.max(1, Math.round((Date.now() - a.start) / 60000)) });
  S.body.active = null; save(); askPersist(); checkUnlocks(); render(true); window.scrollTo(0, 0);
  const per = phaseOf(S.body.phase).perWeek, w = weekSessions().length;
  reward(8, { big: true, msg: [w >= per ? `Semaine bouclée · ${w}/${per}` : `Séance enregistrée · ${w}/${per}`, 'Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible.', 'Muslim'] });
}

/* Minuteur de repos (hors de #app pour survivre aux rendus) */
const RT = { end: 0, total: 0, iv: 0, hide: 0 };
let actx = null;
function audioUnlock() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch (e) {} }
function beep() {
  const c = actx; if (!c) return;
  try { [0, .24].forEach(t => { const o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.0001, c.currentTime + t); g.gain.exponentialRampToValueAtTime(.3, c.currentTime + t + .02); g.gain.exponentialRampToValueAtTime(.0001, c.currentTime + t + .2); o.connect(g).connect(c.destination); o.start(c.currentTime + t); o.stop(c.currentTime + t + .22); }); } catch (e) {}
}
function restEl() {
  let el = $('#rest');
  if (!el) {
    el = document.createElement('div'); el.id = 'rest'; el.className = 'rest'; el.setAttribute('role', 'timer'); el.setAttribute('aria-live', 'off');
    el.innerHTML = `<svg viewBox="-22 -22 44 44" aria-hidden="true"><circle r="18" class="trk"/><circle r="18" class="prg" transform="rotate(-90)"/></svg><span class="rl"><small>Repos</small><b class="num"></b></span><button data-rest="15">+15 s</button><button data-rest="0">Passer</button>`;
    document.body.appendChild(el);
  }
  return el;
}
function startRest(sec) {
  const el = restEl(); clearTimeout(RT.hide); clearInterval(RT.iv);
  RT.total = sec; RT.end = Date.now() + sec * 1000; el.classList.remove('end'); el.classList.add('on');
  const c = 2 * Math.PI * 18, prg = $('.prg', el); prg.style.strokeDasharray = c.toFixed(1);
  const tick = () => {
    const left = Math.max(0, RT.end - Date.now()), s = Math.ceil(left / 1000);
    $('b', el).textContent = `${Math.floor(s / 60)}:${pad(s % 60)}`; $('small', el).textContent = 'Repos';
    prg.style.strokeDashoffset = (c * (1 - left / (RT.total * 1000))).toFixed(1);
    if (left <= 0) {
      clearInterval(RT.iv); RT.iv = 0; el.classList.add('end'); $('small', el).textContent = 'À toi'; $('b', el).textContent = 'Go';
      beep(); try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch (e) {}
      RT.hide = setTimeout(() => el.classList.remove('on'), 3500);
    }
  };
  tick(); RT.iv = setInterval(tick, 250);
}
function stopRest() { clearInterval(RT.iv); RT.iv = 0; clearTimeout(RT.hide); const el = $('#rest'); if (el) el.classList.remove('on'); }

/* ----- Nutrition ----- */
function calibForm() {
  const pr = S.body.profile;
  return `<section style="margin-top:26px"><h2>${C.edit ? 'Mon profil' : 'Ton carburant'}</h2>
    ${C.edit ? '' : '<p class="small muted" style="margin:-6px 0 14px">Trois chiffres et l\'app calcule tes calories, tes protéines et ton rythme de prise de poids.</p>'}
    <div class="group">
      <div class="cell"><label for="cbW">Poids</label><input id="cbW" class="r" inputmode="decimal" value="${esc(bodyWeight() || '')}" placeholder="70"><span class="unit">kg</span></div>
      <div class="cell"><label for="cbH">Taille</label><input id="cbH" class="r" inputmode="numeric" value="${esc(pr.height)}" placeholder="178"><span class="unit">cm</span></div>
      <div class="cell"><label for="cbA">Âge</label><input id="cbA" class="r" inputmode="numeric" value="${esc(pr.age)}"><span class="unit">ans</span></div>
      <label class="cell tap"><span class="lbl">Je jeûne le lundi et le jeudi</span><span class="switch"><input type="checkbox" id="cbF" ${pr.fast ? 'checked' : ''}><span></span></span></label>
    </div>
    <button class="btn block" data-cbody style="margin-top:14px">${C.edit ? 'Enregistrer' : 'Calculer'}</button>
    ${C.edit ? '<button class="btn block quiet" data-cbodyx style="margin-top:10px">Annuler</button>' : ''}</section>`;
}
function weightChart(t) {
  const ws = sortedWeights().slice(-16); if (!ws.length) return '';
  const d0 = parseDate(ws[0].date), w0 = numv(ws[0].kg);
  const dx = w => (parseDate(w.date) - d0) / 864e5, lastX = Math.max(14, dx(ws[ws.length - 1]) + 7);
  const band = x => [w0 + t.lo * x / 7, w0 + t.hi * x / 7];
  const ys = ws.map(w => numv(w.kg)).concat([w0, band(lastX)[1]]);
  const mn = Math.floor(Math.min(...ys) - .5), mx = Math.ceil(Math.max(...ys) + .5);
  const W = 320, H = 150, L = 34, R = 8, T = 10, B = 24;
  const X = x => L + x / lastX * (W - L - R), Y = v => T + (mx - v) / (mx - mn) * (H - T - B);
  const poly = `${X(0)},${Y(band(0)[1])} ${X(lastX)},${Y(band(lastX)[1])} ${X(lastX)},${Y(band(lastX)[0])} ${X(0)},${Y(band(0)[0])}`;
  const pts = ws.map(w => `${X(dx(w)).toFixed(1)},${Y(numv(w.kg)).toFixed(1)}`);
  return `<div class="wchart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Courbe de poids">
    <polygon points="${poly}" fill="var(--gold-soft)" opacity=".9"/>
    <text x="${W - R}" y="${Y(band(lastX)[1]) - 4}" text-anchor="end" style="font-size:9px;font-weight:700;letter-spacing:.08em;fill:var(--gold)">COULOIR</text>
    <line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="var(--line)"/>
    <text x="${L - 6}" y="${Y(mx) + 4}" text-anchor="end" style="font-size:10px;fill:var(--muted)">${mx}</text>
    <text x="${L - 6}" y="${Y(mn) + 4}" text-anchor="end" style="font-size:10px;fill:var(--muted)">${mn}</text>
    <text x="${L}" y="${H - 8}" style="font-size:10px;fill:var(--muted)">${DAY_MONTH.format(d0)}</text>
    <text x="${X(dx(ws[ws.length - 1]))}" y="${H - 8}" text-anchor="middle" style="font-size:10px;fill:var(--muted)">${DAY_MONTH.format(parseDate(ws[ws.length - 1].date))}</text>
    ${pts.length > 1 ? `<polyline points="${pts.join(' ')}" fill="none" stroke="var(--gold)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>` : ''}
    ${pts.map((p, i) => { const [x, y] = p.split(','); return `<circle cx="${x}" cy="${y}" r="${i === pts.length - 1 ? 4.5 : 3}" fill="${i === pts.length - 1 ? 'var(--gold)' : 'var(--surface)'}" stroke="var(--gold)" stroke-width="2"/>`; }).join('')}
  </svg></div>`;
}
function vNutrition() {
  const t = bodyTargets();
  if (!t || C.edit) return `${corpsTop('nutrition')}${calibForm()}`;
  const day = foodDay(), p = day.p, pr = S.body.profile, R = 100, circ = 2 * Math.PI * R, full = p >= t.prot;
  const ticks = [1, 2, 3].map(q => { const [x0, y0] = polar(R - 13, q * 90), [x1, y1] = polar(R + 13, q * 90); return `<line x1="${x0.toFixed(1)}" y1="${y0.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y1.toFixed(1)}" stroke="var(--bg)" stroke-width="3"/>`; }).join('');
  const order = FOODS.map((f, i) => [f, i]).sort((a, b) => (S.body.fcount[b[0][0]] || 0) - (S.body.fcount[a[0][0]] || 0) || a[1] - b[1]).map(x => x[0]);
  const shown = C.allFoods ? order : order.slice(0, 8);
  const drops = Array.from({ length: t.water }, (_, i) => `<button class="drop ${i < day.water ? 'on' : ''}" data-water="${i + 1}" aria-label="${i + 1} verre${i ? 's' : ''}"><svg viewBox="0 0 24 28" aria-hidden="true"><path d="M12 2C8 8 4.5 12.5 4.5 17.5a7.5 7.5 0 0 0 15 0C19.5 12.5 16 8 12 2z"/></svg></button>`).join('');
  const v = weightVerdict(t), canAdj = !pr.adjAt || (parseDate(todayISO()) - parseDate(pr.adjAt)) / 864e5 >= 14;
  let verdict = '<p class="hint">Pèse-toi une fois par semaine, le même jour, le matin à jeun. Il faut 2 pesées à 10 jours d\'écart pour juger ton rythme.</p>';
  if (v && v.wait) verdict = '<p class="hint">Encore quelques jours : l\'app juge ton rythme sur au moins 10 jours de pesées.</p>';
  else if (v) {
    const r = `${v.rate >= 0 ? '+' : '−'}${String(Math.abs(Math.round(v.rate * 100) / 100)).replace('.', ',')} kg / semaine`;
    if (v.st === 'ok') verdict = `<div class="alert" style="background:var(--mint-soft);color:var(--mint)">${ICON.info}<span><b>${r}</b> : pile dans le couloir. Ne change rien.</span></div>`;
    else verdict = `<div class="alert">${ICON.warn}<span><b>${r}</b> : ${v.st === 'slow' ? 'trop lent pour construire. Ajoute environ 150 kcal par jour, par exemple une banane et une poignée d\'amandes.' : 'trop rapide, tu risques de stocker surtout du gras. Retire environ 150 kcal par jour, par exemple un peu de féculents au dîner.'}</span></div>
      ${canAdj ? `<button class="btn sm ghost" data-kadj="${v.st === 'slow' ? 150 : -150}" style="margin-top:10px">Appliquer ${v.st === 'slow' ? '+' : '−'}150 kcal à ma cible</button>` : '<p class="hint">Ajustement récent : laisse 2 semaines avant de juger à nouveau.</p>'}`;
  }
  const lastW = sortedWeights().slice(-1)[0];
  return `${corpsTop('nutrition')}
  ${isFastDay() ? `<div class="alert" style="background:var(--mint-soft);color:var(--mint)">${ICON.info}<span><b>Jour de jeûne.</b> Protéines en 3 temps : au suhoor (œufs, skyr, flocons ≈ 45 g), à l'iftar après les dattes et l'eau (un vrai repas ≈ 50 g), puis avant de dormir (fromage blanc).</span></div>` : ''}
  <div class="fuel">
    <svg viewBox="-130 -130 260 260" aria-hidden="true">
      <circle r="${R}" fill="none" stroke="var(--raise)" stroke-width="18"/>
      <circle r="${R}" fill="none" stroke="var(--${full ? 'mint' : 'gold'})" stroke-width="18" stroke-linecap="round" transform="rotate(-90)" ${ringDash(R, p / t.prot)} style="transition:stroke-dashoffset .7s var(--ease)"/>
      ${ticks}
    </svg>
    <div class="fuel-c"><div><b class="num" style="color:var(--${full ? 'mint' : 'ink'})">${p}</b><span>sur ${t.prot} g de protéines</span><br><span>4 prises de ${Math.round(t.prot / 4 / 5) * 5} g environ</span></div></div>
  </div>
  <div class="foods">${shown.map(([n, g]) => `<button class="food" data-food="${esc(n)}"><span>${esc(n)}</span><b>+${g}</b></button>`).join('')}</div>
  <div class="row" style="margin-top:10px;gap:8px">
    <button class="btn sm quiet" data-fall style="flex:1">${C.allFoods ? 'Moins' : 'Tout voir'}</button>
    <input id="fCustom" inputmode="numeric" class="famt num" placeholder="+ g" aria-label="Protéines en grammes" style="width:84px;text-align:center">
    <button class="btn sm" data-fcustom>Ajouter</button>
  </div>
  ${day.log.length ? `<div class="flog">${day.log.map((l, i) => `<button data-fdel="${i}" aria-label="Retirer ${esc(l[0])}">${esc(l[0])} · ${l[1]} g <span aria-hidden="true">×</span></button>`).join('')}</div>` : ''}
  <section>
    <div class="row between" style="align-items:flex-end"><h2 style="margin:0">Eau</h2><p class="small muted" style="margin:0">${day.water} / ${t.water} verres · ${String(t.water * .25).replace('.', ',')} L</p></div>
    <div class="drops">${drops}</div>
    <p class="hint">Un verre de plus par heure d'entraînement. À la gare, garde une gourde avec toi.</p>
  </section>
  <section>
    <div class="row between" style="margin-bottom:14px"><h2 style="margin:0">Ta cible</h2><button class="link-btn" data-cedit>Profil</button></div>
    <div class="kpis">
      <div class="kpi"><b class="num">${t.kcal.toLocaleString('fr-FR')}</b><span>kcal par jour${numv(pr.adj) ? ` (ajusté ${numv(pr.adj) > 0 ? '+' : ''}${pr.adj})` : ''}</span></div>
      <div class="kpi"><b class="num">${t.prot} g</b><span>protéines (1,8 g/kg)</span></div>
      <div class="kpi"><b class="num">${t.maint.toLocaleString('fr-FR')}</b><span>kcal pour maintenir ton poids</span></div>
      <div class="kpi"><b class="num">+${String(Math.round(t.lo * 4.3 * 10) / 10).replace('.', ',')} à ${String(Math.round(t.hi * 4.3 * 10) / 10).replace('.', ',')}</b><span>kg par mois visés</span></div>
    </div>
    <p class="hint">Les calories sont une estimation de départ. C'est la balance qui dit la vérité : l'app ajuste à partir de tes pesées.</p>
  </section>
  <section>
    <h2>Pesée</h2>
    ${weightChart(t)}
    <div class="row" style="margin-top:12px;gap:8px"><input id="wIn" inputmode="decimal" class="famt num" placeholder="${lastW ? String(lastW.kg).replace('.', ',') : 'kg'}" aria-label="Poids du jour en kg" style="flex:1;text-align:left"><button class="btn sm" data-wsave>Enregistrer</button></div>
    ${verdict}
    ${lastW ? `<button class="link-btn small" data-wdel style="color:var(--muted);min-width:0;padding:0;margin-top:6px">Supprimer la dernière pesée (${DAY_MONTH.format(parseDate(lastW.date))})</button>` : ''}
  </section>
  <section>
    <h2>L'assiette</h2>
    <div class="plate">
      <svg viewBox="-60 -60 120 120" aria-hidden="true">
        <circle r="56" fill="var(--surface)" stroke="var(--line)" stroke-width="2"/><circle r="44" fill="none" stroke="var(--line)" stroke-width="1"/>
        <path d="M0 0 L0 -44 A44 44 0 0 1 38.1 22 Z" fill="var(--gold)" opacity=".85"/>
        <path d="M0 0 L38.1 22 A44 44 0 0 1 -38.1 22 Z" fill="var(--mint)" opacity=".75"/>
        <path d="M0 0 L-38.1 22 A44 44 0 0 1 0 -44 Z" fill="var(--warn)" opacity=".55"/>
      </svg>
      <ul class="plate-l"><li><i style="background:var(--gold)"></i><span><b>Protéines</b> · une à deux paumes</span></li><li><i style="background:var(--mint)"></i><span><b>Légumes</b> · un à deux poings</span></li><li><i style="background:var(--warn);opacity:.7"></i><span><b>Féculents</b> · un à deux poings (riz, pâtes, pain, pommes de terre)</span></li><li><i style="background:var(--line)"></i><span>+ un pouce d'huile d'olive, d'avocat ou d'oléagineux</span></li></ul>
    </div>
    <p class="hint">« Un tiers pour la nourriture, un tiers pour la boisson, un tiers pour le souffle » (Tirmidhi). Pour prendre du muscle sans te gaver : 4 repas raisonnables plutôt que 3 énormes.</p>
  </section>`;
}
function addFood(label, g) {
  const k = todayISO(), d = S.body.food[k] = S.body.food[k] || { p: 0, water: 0, log: [] };
  d.log.push([label, g]); d.p = d.log.reduce((m, x) => m + x[1], 0);
  if (FOODS.some(f => f[0] === label)) S.body.fcount[label] = (S.body.fcount[label] || 0) + 1;
  save(); askPersist(); haptic(); const sy = window.scrollY; render(); window.scrollTo(0, sy);
  const t = bodyTargets();
  if (t && d.p >= t.prot && d.p - g < t.prot) reward(4, { big: true, msg: [`Protéines atteintes · ${d.p} g`, 'Ton corps a de quoi construire aujourd\'hui.'] });
  else toast(`+${g} g de protéines`, 'Annuler', () => { d.log.pop(); d.p = d.log.reduce((m, x) => m + x[1], 0); save(); render(); });
}

/* ----- Soin & sommeil ----- */
const sleepTot = k => (S.body.sleep[k] || 0) + ((S.body.nap || {})[k] || 0);
function sleepBars() {
  const W = 320, H = 150, T = 18, B = 26, max = 600, bw = 30, L0 = 26, gap = (W - L0 - 7 * bw) / 6;
  const Y = m => T + (1 - Math.min(m, max) / max) * (H - T - B);
  let h = `<line x1="${L0 - 4}" y1="${Y(420)}" x2="${W}" y2="${Y(420)}" stroke="var(--mint)" stroke-dasharray="4 4" stroke-width="1.2"/><text x="0" y="${Y(420) + 3.5}" style="font-size:10px;font-weight:700;fill:var(--mint)">7 h</text>`;
  for (let i = 6; i >= 0; i--) {
    const d = addDays(new Date(), -i), k = iso(d), n0 = S.body.sleep[k] || 0, nap = (S.body.nap || {})[k] || 0, m = n0 + nap, x = L0 + (6 - i) * (bw + gap);
    h += m ? `${n0 ? `<rect x="${x.toFixed(1)}" y="${Y(n0).toFixed(1)}" width="${bw}" height="${(H - B - Y(n0)).toFixed(1)}" rx="8" fill="var(--${m >= 420 ? 'gold' : 'warn'})" opacity="${i ? .75 : 1}"/>` : ''}${nap ? `<rect x="${x.toFixed(1)}" y="${Y(m).toFixed(1)}" width="${bw}" height="${(Y(n0) - Y(m) - (n0 ? 2 : 0)).toFixed(1)}" rx="8" fill="var(--mint)" opacity="${i ? .75 : 1}"/>` : ''}<text x="${(x + bw / 2).toFixed(1)}" y="${(Y(m) - 5).toFixed(1)}" text-anchor="middle" style="font-size:10px;font-weight:700;fill:var(--ink-2)">${Math.floor(m / 60)}h${m % 60 ? pad(m % 60) : ''}</text>`
      : `<circle cx="${(x + bw / 2).toFixed(1)}" cy="${H - B - 6}" r="3" fill="var(--line)"/>`;
    h += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle" style="font-size:10px;font-weight:${i ? 600 : 800};fill:var(--${i ? 'muted' : 'gold'})">${i ? DAY_SHORT.format(d).replace('.', '') : 'nuit'}</text>`;
  }
  return `<div class="sbars"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sommeil des 7 dernières nuits">${h}</svg></div>`;
}
function fitraRing(id, name) {
  const hist = S.body.fitra[id] || [], last = hist[hist.length - 1];
  const days = last ? Math.round((parseDate(todayISO()) - parseDate(last)) / 864e5) : null;
  const left = days == null ? 0 : Math.max(0, 1 - days / FITRA_MAX);
  const col = days == null || days >= FITRA_MAX ? 'danger' : days >= 30 ? 'warn' : 'gold';
  return `<button class="fit" data-fitra="${id}" aria-label="${name} : ${days == null ? 'jamais noté' : days === 0 ? 'fait aujourd\'hui' : `il y a ${days} jours`}. Toucher quand c'est fait.">
    <svg viewBox="-34 -34 68 68" aria-hidden="true"><circle r="28" fill="none" stroke="var(--${days != null && days >= FITRA_MAX ? 'danger-soft' : 'raise'})" stroke-width="6"/><circle r="28" fill="none" stroke="var(--${col})" stroke-width="6" stroke-linecap="round" transform="rotate(-90)" ${ringDash(28, left)}/>
      <text y="${days == null ? 5 : 2}" text-anchor="middle" style="font:400 ${days == null ? 18 : 20}px var(--serif);fill:var(--ink)">${days == null ? '—' : days}</text>${days == null ? '' : '<text y="14" text-anchor="middle" style="font-size:7.5px;font-weight:700;letter-spacing:.08em;fill:var(--muted)">JOURS</text>'}</svg>
    ${name}<small>${days == null ? 'à noter' : days >= FITRA_MAX ? 'à faire' : `reste ${FITRA_MAX - days} j`}</small></button>`;
}
function vSoin() {
  const k = todayISO(), m = S.body.sleep[k], nap = (S.body.nap || {})[k] || 0, tot = sleepTot(k), logged = Array.from({ length: 7 }, (_, i) => sleepTot(iso(addDays(new Date(), -i)))).filter(Boolean);
  const avg = logged.length ? Math.round(logged.reduce((a, b) => a + b) / logged.length) : 0;
  const wake = toMin(S.body.wake || '04:30'), bed5 = wake - 450 - 15, bed4 = wake - 360 - 15;
  const care = S.body.care, cl = care.log[k] || {}, cn = care.list.filter(c => cl[c.id]).length;
  const fri = iso(addDays(mondayOf(new Date()), 4));
  return `${corpsTop('soin')}
  <section style="margin-top:26px">
    <div class="row between" style="align-items:flex-end"><h2 style="margin:0">Sommeil</h2><p class="small muted" style="margin:0;text-align:right">${logged.length ? `moyenne ${fmtDur(avg)}` : 'objectif 7 à 9 h'}</p></div>
    ${sleepBars()}
    <p class="eyebrow" style="margin-top:14px">Cette nuit</p>
    <div class="row" style="margin-top:8px;gap:8px">
      <button class="icon-btn" data-sleep="-15" aria-label="Moins 15 minutes" style="background:var(--surface)">−</button>
      <p class="num" style="flex:1;text-align:center;margin:0;font:400 2.25rem/1 var(--serif);color:var(--${!m ? 'muted' : m >= 420 ? 'gold' : 'warn'})">${m ? fmtDur(m) : '—'}</p>
      <button class="icon-btn" data-sleep="15" aria-label="Plus 15 minutes" style="background:var(--surface)">+</button>
    </div>
    <div class="chips" style="justify-content:center">${[300, 360, 420, 480, 540].map(v => `<button class="chip" data-sleep="=${v}" aria-pressed="${m === v}">${v / 60} h</button>`).join('')}</div>
    <p class="eyebrow" style="margin-top:18px">Sieste aujourd'hui</p>
    <div class="chips">${[[0, 'Aucune'], [20, '20 min'], [30, '30 min'], [60, '1 h'], [90, '1 h 30']].map(([v, l]) => `<button class="chip" data-nap="${v}" aria-pressed="${nap === v}">${l}</button>`).join('')}</div>
    ${nap || m ? `<p class="small" style="margin:12px 0 0">Total sur la journée : <b class="num" style="color:var(--${tot >= 420 ? 'gold' : 'warn'})">${fmtDur(tot)}</b>${nap ? ` <span class="muted">(nuit ${m ? fmtDur(m) : '—'} + sieste ${fmtDur(nap)})</span>` : ''}</p>` : ''}
    <p class="hint">Le matin, note ta nuit. Si tu fais une sieste dans la journée, ajoute-la : elle s'empile en vert sur la barre du jour. Soir de Mister Pizza puis gare ? Une sieste de 20 à 30 min, ou de 90 min (un cycle complet), évite de te réveiller en plein sommeil profond.</p>
    ${avg && avg < 420 ? `<div class="alert">${ICON.warn}<span>Moins de 7 h en moyenne : le muscle se construit surtout la nuit. Une seule nuit blanche fait chuter d'environ 18 % la fabrication de muscle le lendemain. Après la gare, une sieste de 20 min aide.</span></div>` : ''}
  </section>
  <section>
    <h2>Heure de coucher</h2>
    <div class="bed">
      <div class="row between"><label for="bedWake" class="small muted">Lever demain</label><input type="time" id="bedWake" value="${esc(S.body.wake || '04:30')}" class="num" style="border:0;background:var(--raise);border-radius:12px;min-height:44px;padding:0 12px;color:var(--ink)"></div>
      <div class="chips"><button class="chip" data-wake="04:30" aria-pressed="${S.body.wake === '04:30'}">Gare · 4 h 30</button><button class="chip" data-wake="07:30" aria-pressed="${S.body.wake === '07:30'}">Repos · 7 h 30</button></div>
      <p class="eyebrow" style="margin-top:18px">Au lit à</p><b class="num">${fmtClock(bed5)}</b>
      <p class="small muted" style="margin:6px 0 0">5 cycles de 90 min (7 h 30) + 15 min pour t'endormir. Soir de Mister Pizza ? Vise au moins <b style="font:inherit;color:var(--ink)">${fmtClock(bed4)}</b> (4 cycles, 6 h) et fais une sieste le lendemain.</p>
    </div>
  </section>
  <section>
    <div class="row between" style="align-items:flex-end;margin-bottom:6px"><h2 style="margin:0">Hygiène du jour</h2><p class="small muted" style="margin:0">${cn}/${care.list.length}</p></div>
    <div class="checks">${care.list.map(c => checkbox(c.id, esc(c.name), 'data-care', !!cl[c.id])).join('')}${checkbox('ghusl', 'Ghusl du vendredi <span class="small muted">· cette semaine</span>', 'data-ghusl', !!S.body.ghusl[fri])}</div>
    <button class="btn sm ghost" data-caresetup style="margin-top:8px">Modifier la liste</button>
  </section>
  <section>
    <h2>La fitra</h2>
    <p class="small muted" style="margin:-8px 0 0">Ongles, moustache, aisselles, poils intimes : pas plus de 40 nuits (Muslim). Chaque jauge se vide avec le temps. Touche-la quand c'est fait.</p>
    <div class="fitra">${FITRA.map(([id, n]) => fitraRing(id, n)).join('')}</div>
  </section>`;
}
function openCareSetup() {
  $('#ideasBody').innerHTML = `<div class="grab"></div><div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Hygiène du jour</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    <p class="small muted">Ce que tu veux cocher chaque jour. La liste repart à zéro chaque matin.</p>
    <div style="margin-top:14px">${S.body.care.list.map(c => `<div class="srow"><input data-cset="${c.id}" value="${esc(c.name)}" aria-label="Nom" style="flex:1"><button class="icon-btn" data-cdel="${c.id}" aria-label="Supprimer"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`).join('')}</div>
    <div class="srow" style="margin-top:14px"><input id="cNew" placeholder="Ex. Siwak, parfum, crème solaire" aria-label="Nouvel élément" style="flex:1"><button class="btn sm" data-cadd>Ajouter</button></div>`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal(); d.dataset.mode = 'bsetup';
}

/* =====================================================================
   12 quinquies. LUMIÈRE — renforcement sur toute l'app
   - Chaque bonne action allume de la lumière (✦) : son doux, éclat doré, vibration.
   - Récompense variable : de temps en temps (≈ 1 fois sur 8), une « pépite » double la lumière
     et apporte une parole. L'imprévu est ce qui fait le plus réagir la dopamine
     (erreur de prédiction de la récompense, Schultz).
   - Tension avant : le soir, l'orbite montre ce qui s'éteint à minuit (aversion à la perte).
   - Poids après : le bilan de la veille s'assombrit quand la journée a été vide, et le soleil
     de l'orbite brille selon ta lumière du jour. Jamais d'humiliation : un cap, tout de suite.
   ===================================================================== */
const GEMS = [
  ['Les actes les plus aimés d\'Allah sont les plus réguliers, même s\'ils sont peu nombreux.', 'Bukhari, Muslim'],
  ['Certes, avec la difficulté vient la facilité.', 'Coran 94:6'],
  ['Allah ne change pas l\'état d\'un peuple tant qu\'il ne change pas ce qui est en lui-même.', 'Coran 13:11'],
  ['Le fort n\'est pas celui qui terrasse les autres. Le fort est celui qui se maîtrise.', 'Bukhari'],
  ['Ceux qui luttent pour Notre cause, Nous les guiderons sur Nos chemins.', 'Coran 29:69'],
  ['Quiconque craint Allah, Il lui donnera une issue, et le nourrira d\'où il ne s\'y attend pas.', 'Coran 65:2-3'],
  ['Profite de ta jeunesse avant ta vieillesse, de ta santé avant ta maladie, de ton temps libre avant ton occupation.', 'Hakim'],
  ['Allah aime, lorsque l\'un de vous accomplit une chose, qu\'il l\'accomplisse avec excellence.', 'Bayhaqi'],
  ['Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible.', 'Muslim'],
  ['Ce qui est planté avec patience finit par donner des fruits.', 'Ton jardin']
];
const NOTES5 = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
let lastPt = null;
document.addEventListener('pointerdown', e => { lastPt = { x: e.clientX, y: e.clientY }; }, true);
function tone(freq, t0, dur, gain, type = 'sine', glideTo) {
  const c = actx; if (!c) return;
  try {
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type; o.frequency.setValueAtTime(freq, t); if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .02);
  } catch (e) {}
}
function chime(big) {
  audioUnlock();
  const i = Math.floor(Math.random() * 3), n = big ? [NOTES5[i], NOTES5[i + 2], NOTES5[i + 3]] : [NOTES5[i + 1], NOTES5[i + 3]];
  n.forEach((f, k) => tone(f, k * .085, big ? .55 : .35, big ? .11 : .07));
}
function thud() { audioUnlock(); tone(130, 0, .9, .22, 'triangle', 55); tone(98, .05, 1.1, .12, 'sine', 49); }
function burst(n, label, big) {
  if (reduceMotion()) { if (label) floatTxt(label, big); return; }
  const p = lastPt || { x: innerWidth / 2, y: innerHeight / 2 };
  const layer = document.createElement('div'); layer.className = 'fx'; layer.style.left = p.x + 'px'; layer.style.top = p.y + 'px';
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, d = (big ? 70 : 38) + Math.random() * (big ? 90 : 40), s = document.createElement('i');
    s.style.setProperty('--dx', (Math.cos(a) * d).toFixed(0) + 'px'); s.style.setProperty('--dy', (Math.sin(a) * d - 20).toFixed(0) + 'px');
    s.style.setProperty('--s', (.5 + Math.random() * (big ? 1.1 : .7)).toFixed(2)); s.style.animationDelay = (Math.random() * 60).toFixed(0) + 'ms';
    layer.appendChild(s);
  }
  document.body.appendChild(layer); setTimeout(() => layer.remove(), 1100);
  if (label) floatTxt(label, big);
}
function floatTxt(label, big) {
  const p = lastPt || { x: innerWidth / 2, y: innerHeight / 2 }, t = document.createElement('b');
  t.className = 'fx-t' + (big ? ' big' : ''); t.textContent = label; t.style.left = Math.min(innerWidth - 40, Math.max(40, p.x)) + 'px'; t.style.top = p.y + 'px';
  document.body.appendChild(t); setTimeout(() => t.remove(), 1300);
}
function gemCard(title, text, src) {
  let el = $('#gem'); if (!el) { el = document.createElement('div'); el.id = 'gem'; el.className = 'gem'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.innerHTML = `<p class="gem-t">✦ ${title}</p><p class="gem-q">${text}</p>${src ? `<p class="gem-s">${src}</p>` : ''}`;
  el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
  clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 5200);
  el.onclick = () => el.classList.remove('on');
}
const nourDay = (k = todayISO()) => (S.nour.log[k] || 0);
function nourAdd(pts, k = todayISO()) { S.nour.log[k] = Math.max(0, nourDay(k) + pts); if (!S.nour.log[k]) delete S.nour.log[k]; }
function nourAvg(days = 14) { let t = 0, n = 0; for (let i = 1; i <= days; i++) { const v = S.nour.log[iso(addDays(new Date(), -i))]; if (v != null) { t += v; n++; } } return n ? t / n : 0; }
/* Récompense : pts de lumière. opts.big = moment fort, opts.msg = [titre, texte]. */
function reward(pts, opts = {}) {
  const bonus = !opts.big && !opts.noBonus && Math.random() < .125;
  const got = bonus ? pts * 2 : pts;
  nourAdd(got); save();
  try { navigator.vibrate && navigator.vibrate(opts.big || bonus ? [12, 40, 18] : 10); } catch (e) {}
  chime(opts.big || bonus); burst(opts.big ? 28 : bonus ? 20 : 11, `+${got} ✦`, opts.big || bonus);
  if (bonus) { const g = GEMS[Math.floor(Math.random() * GEMS.length)]; gemCard('Pépite · lumière doublée', g[0], g[1]); }
  else if (opts.msg) gemCard(opts.msg[0], opts.msg[1], opts.msg[2]);
  refreshSun();
}
function unreward(pts) { nourAdd(-pts); save(); refreshSun(); }
function refreshSun() {
  const g = $('#sunGlowC'); if (!g) return;
  const v = sunLevel(); g.setAttribute('r', (56 + 44 * v).toFixed(0)); g.style.opacity = (.35 + .65 * v).toFixed(2);
  const c = $('#sunCore'); if (c) c.style.opacity = (.55 + .45 * Math.min(1, v * 1.6)).toFixed(2);
  const n = $('#sunNour'); if (n) n.textContent = `✦ ${nourDay()}`;
}
function sunLevel() { const avg = Math.max(15, nourAvg()); return Math.min(1, nourDay() / avg); }

/* Bilan de la veille (orbite) : lumineux ou lourd. */
function yesterdayCard() {
  const y = iso(addDays(new Date(), -1));
  if (S.nour.seen === todayISO() || y < S.start) return '';
  const pts = nourDay(y), avg = nourAvg(14), d = S.faith.log[y] || {}, pr = PRAYERS.filter(p => d[p[0]]).length;
  const lost = [];
  const y2 = iso(addDays(new Date(), -2));

  const heavy = pts === 0 || (avg >= 10 && pts < avg * .35) || lost.length;
  const bits = [inPeriod(y) ? 'prières en pause (règles)' : `${pr}/5 prières`, `${dayDone(y)}/${needOf(y)} habitudes de foi`].join(' · ');
  return `<div class="yday ${heavy ? 'heavy' : ''}">
    <div class="row between"><p class="eyebrow">Hier</p><button class="link-btn small" data-ydone style="min-width:0;padding:0">OK</button></div>
    <p class="yday-n num">✦ ${pts}</p>
    <p class="small" style="margin:4px 0 0">${heavy
      ? `${pts === 0 ? 'Ta lumière est restée éteinte.' : 'Ta lumière est restée faible.'}${lost.length ? ' Et ' + lost.join(', ') + '.' : ''} Un jour vide rend le suivant plus facile à gâcher. Allume une seule chose maintenant.`
      : pts >= avg ? `Au-dessus de ta moyenne (✦ ${Math.round(avg)}). Garde ce rythme.` : `Moyenne des 14 derniers jours : ✦ ${Math.round(avg)}.`}</p>
    <p class="small muted" style="margin:6px 0 0">${bits}</p>
    ${heavy ? '<button class="btn sm" data-goto="habitudes" style="margin-top:12px">Allumer : une habitude de foi</button>' : ''}
  </div>`;
}
/* Tension du soir : ce qui s'éteint à minuit. */
function atStake() {
  const h = new Date().getHours(), k = todayISO(), items = [], st = streak();
  const pn = inPeriod(k) ? null : prayerNow(); if (pn && prayerTracked(pn.id) && !(S.faith.log[pn.k] || {})[pn.id] && pn.end - new Date() < 60 * 60000) items.push(['habitudes', `${PNAMES[pn.id]} se termine à ${hm(pn.end)}`, `${leftTxt(pn.end - new Date())}`]);
  if (h < 19) return items.length ? `<div class="stake"><p class="eyebrow" style="color:var(--warn)">Maintenant</p>${items.map(i => `<button class="stake-i" data-goto="${i[0]}"><span>${i[1]}</span><b class="num">${i[2]}</b></button>`).join('')}</div>` : '';
  const n = needOf(k), dn = dayDone(k); if (dn < n) items.push(['habitudes', `Journée de foi incomplète`, `${dn}/${n}`]);
  if (!items.length) return '';
  return `<div class="stake"><p class="eyebrow" style="color:var(--warn)">Avant minuit</p>${items.map(i => `<button class="stake-i" data-goto="${i[0]}"><span>${i[1]}</span><b class="num">${i[2]}</b></button>`).join('')}</div>`;
}

/* ----- Chiffrement local (AES-GCM, clé PBKDF2) ----- */
const Z_BOOT = '';
const b64 = u8 => btoa(String.fromCharCode(...u8)), ub64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function sha(txt) { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt)); return [...new Uint8Array(h)].map(x => x.toString(16).padStart(2, '0')).join(''); }
async function zKey(code, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 310000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function zSeal(key, salt, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
  return { s: b64(salt), i: b64(iv), c: b64(new Uint8Array(ct)) };
}
async function zOpen(key, z) { const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ub64(z.i) }, key, ub64(z.c)); return JSON.parse(new TextDecoder().decode(pt)); }
function zLoad() { if (!window.__z) (new Function(new TextDecoder().decode(ub64(Z_MOD))))(); return window.__z; }
/* Vérification d'un texte saisi. */
async function zTry(v) {
  return false; // Espace privé : pas dans cette version
  if (!v || v.length > 64 || /\n/.test(v) || !window.crypto || !crypto.subtle) return false;
  try {
    if (S.zc && S.zc.c) {
      const key = await zKey(v, ub64(S.zc.s)); const data = await zOpen(key, S.zc);
      zLoad().open(key, ub64(S.zc.s), data); return true;
    }
  } catch (e) { /* mauvais code : c'est une idée normale */ }
  try { if ((await sha('sdp·' + v)) === Z_BOOT) { zLoad().setup(); return true; } } catch (e) {}
  return false;
}
function zLock() { if (window.__z) window.__z.lock(); }

/* =====================================================================
   12 sexies. FLUX
   ===================================================================== */
/* ----- Contenu du Flux -----
   Coran : texte arabe othmani (quranenc, via le paquet quran-json), sens rendu en français par nos soins
   (ce n'est pas une traduction officielle), explication courte inspirée des commentaires classiques.
   Business : les idées clés des livres du parcours, reformulées (aucune citation longue).
   [id, ...] : les id ne changent jamais (historique des cartes vues et gardées). */
const FX_CORAN = [
  ['c1', '94:5-6', 'Ash-Sharh', 'Certes, avec la difficulté vient une facilité. Oui, avec la difficulté vient une facilité.', 'La répétition est voulue. Les commentateurs relèvent que « la difficulté » est dite avec l\'article (une seule), et « une facilité » sans article, deux fois : une seule épreuve ne vaincra pas deux facilités. La facilité n\'arrive pas après, elle est « avec ».'],
  ['c2', '2:286', 'Al-Baqara', 'Allah n\'impose à aucune âme plus que ce qu\'elle peut porter. À elle ce qu\'elle a acquis de bien, contre elle ce qu\'elle a acquis de mal…', 'Si une épreuve est devant toi, c\'est qu\'elle est à ta mesure. Le verset se termine par des invocations que le Prophète ﷺ recommandait de réciter le soir : les deux derniers versets d\'Al-Baqara suffisent à celui qui les lit la nuit (Bukhari).'],
  ['c3', '13:11', 'Ar-Ra\'d', 'Allah ne change pas l\'état d\'un peuple tant que ses membres ne changent pas ce qui est en eux-mêmes.', 'Le changement extérieur suit le changement intérieur. C\'est une loi divine : attendre que les circonstances changent sans rien changer en soi, c\'est inverser l\'ordre.'],
  ['c4', '13:28', 'Ar-Ra\'d', 'Ceux qui ont cru, et dont les cœurs se tranquillisent au rappel d\'Allah. N\'est-ce point par le rappel d\'Allah que les cœurs se tranquillisent ?', 'Le cœur cherche la paix partout : écrans, bruit, distractions. Le verset désigne la seule source qui l\'apaise vraiment. Le dhikr n\'est pas une formule vide, c\'est un retour.'],
  ['c5', '65:2-3', 'At-Talaq', '… Quiconque craint Allah, Il lui donnera une issue, et lui accordera sa subsistance par des voies qu\'il ne soupçonne pas. Et quiconque place sa confiance en Allah, Il lui suffit.', 'Deux promesses liées à la taqwa : une porte de sortie, et une subsistance inattendue. La confiance (tawakkul) n\'exclut pas l\'effort : elle vient après lui.'],
  ['c6', '29:69', 'Al-\'Ankabut', 'Et ceux qui luttent pour Notre cause, Nous les guiderons certes sur Nos chemins. Allah est vraiment avec les bienfaisants.', 'La guidance récompense l\'effort : on ne reçoit pas le chemin avant de marcher, on le reçoit en marchant. C\'est un verset de l\'effort sur soi-même.'],
  ['c7', '39:53', 'Az-Zumar', 'Dis : « Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d\'Allah. Allah pardonne tous les péchés. »', 'Plusieurs compagnons le considéraient comme l\'un des versets qui donnent le plus d\'espoir. Il s\'adresse précisément à ceux qui ont trop fauté : tant que la porte du repentir est ouverte, le désespoir est lui-même une erreur.'],
  ['c8', '2:152', 'Al-Baqara', 'Souvenez-vous de Moi, Je Me souviendrai de vous. Soyez-Moi reconnaissants et ne soyez pas ingrats.', 'Une relation, pas une transaction : ton rappel attire Son rappel. Un hadith qudsi le prolonge : « Si Mon serviteur Me mentionne en lui-même, Je le mentionne en Moi-même. »'],
  ['c9', '2:153', 'Al-Baqara', 'Ô vous qui avez cru, cherchez secours dans la patience et la prière. Allah est avec les patients.', 'Deux outils, pas un : la patience (tenir) et la prière (se ressourcer). Quand quelque chose le préoccupait, le Prophète ﷺ se hâtait vers la prière.'],
  ['c10', '3:139', 'Al \'Imran', 'Ne faiblissez pas et ne vous affligez pas, alors que vous êtes les supérieurs, si vous êtes croyants.', 'Révélé après la défaite d\'Uhud. Un échec n\'annule pas la valeur : il ne faut ni se laisser abattre ni s\'enfermer dans la tristesse.'],
  ['c11', '24:30', 'An-Nur', 'Dis aux croyants de baisser leurs regards et de préserver leur chasteté. C\'est plus pur pour eux. Allah est parfaitement informé de ce qu\'ils font.', 'Le regard vient en premier, avant la chasteté : c\'est la porte. Les savants notent que protéger ses yeux est une prévention, pas une punition : « plus pur pour eux ».'],
  ['c12', '49:13', 'Al-Hujurat', 'Ô hommes, Nous vous avons créés d\'un mâle et d\'une femelle, et Nous avons fait de vous des peuples et des tribus pour que vous vous connaissiez. Le plus noble d\'entre vous auprès d\'Allah est le plus pieux.', 'La diversité a un but : se connaître, pas se dominer. La seule hiérarchie qui compte est invisible : la piété, que seul Allah mesure.'],
  ['c13', '3:159', 'Al \'Imran', 'C\'est par une miséricorde d\'Allah que tu as été doux envers eux. Si tu avais été rude et dur de cœur, ils se seraient dispersés autour de toi. Pardonne-leur, demande pardon pour eux, et consulte-les dans les affaires…', 'Une leçon de leadership révélée juste après Uhud, où des compagnons avaient désobéi. Réponse : douceur, pardon, et consultation. Un chef dur fait fuir, même quand il a raison.'],
  ['c14', '16:125', 'An-Nahl', 'Appelle au sentier de ton Seigneur par la sagesse et la bonne exhortation, et discute avec eux de la meilleure manière.', 'Trois niveaux : la sagesse (le bon moment, le bon mot), l\'exhortation qui touche le cœur, et le débat courtois. Convaincre n\'est jamais écraser.'],
  ['c15', '17:36', 'Al-Isra\'', 'Ne poursuis pas ce dont tu n\'as aucune connaissance. L\'ouïe, la vue et le cœur : de tout cela, on sera interrogé.', 'L\'esprit critique est un devoir. Ce que tu écoutes, regardes et laisses entrer dans ton cœur, tu en répondras. Un verset à garder en tête avant chaque scroll.'],
  ['c16', '49:6', 'Al-Hujurat', 'Ô vous qui avez cru, si un pervers vous apporte une nouvelle, vérifiez-en la teneur, de crainte de porter atteinte à des gens par ignorance et de regretter ensuite ce que vous avez fait.', 'Le principe de la vérification, quatorze siècles avant les « fake news ». Une information non vérifiée peut détruire des gens, et le regret vient toujours après.'],
  ['c17', '2:275', 'Al-Baqara', '… Allah a rendu licite le commerce et illicite l\'usure (riba)…', 'Le verset répond à ceux qui disaient : « le commerce, c\'est comme l\'usure ». Non : le commerce partage le risque et crée de la valeur, l\'usure fait payer le temps sans risque. D\'où l\'importance de chercher des financements sans intérêt.'],
  ['c18', '83:1-3', 'Al-Mutaffifin', 'Malheur aux fraudeurs, qui, lorsqu\'ils achètent aux gens, exigent la pleine mesure, et qui, lorsqu\'eux-mêmes leur mesurent ou leur pèsent, leur causent perte.', 'Selon Ibn Abbas, révélé à l\'arrivée du Prophète ﷺ à Médine, où certains commerçants trichaient sur les poids. Deux poids, deux mesures : exigeant pour soi, léger pour les autres. En business, c\'est la ruine de la confiance.'],
  ['c19', '62:10', 'Al-Jumu\'a', 'Puis quand la prière est achevée, dispersez-vous sur terre, recherchez la grâce d\'Allah, et invoquez beaucoup Allah afin que vous réussissiez.', 'Après la prière du vendredi, retour au travail : l\'islam ne sépare pas la mosquée et le marché. Chercher sa subsistance est une « grâce » à rechercher, avec le rappel en fond.'],
  ['c20', '4:29', 'An-Nisa\'', 'Ô vous qui avez cru, ne dévorez pas mutuellement vos biens illicitement, sauf s\'il s\'agit d\'un commerce fait par consentement mutuel entre vous. Et ne vous tuez pas vous-mêmes…', 'La règle d\'or du commerce : le consentement réel des deux parties. Pas de pression, pas de tromperie, pas de clause cachée.'],
  ['c21', '25:67', 'Al-Furqan', 'Ceux qui, lorsqu\'ils dépensent, ne sont ni prodigues ni avares, mais se tiennent au juste milieu.', 'Le budget coranique en une phrase : ni gaspillage, ni avarice. Le juste milieu est une discipline, pas une moyenne tiède.'],
  ['c22', '103:1-3', 'Al-\'Asr', 'Par le temps ! L\'homme est certes en perdition, sauf ceux qui croient, font de bonnes œuvres, s\'enjoignent mutuellement la vérité et s\'enjoignent mutuellement l\'endurance.', 'L\'imam Ash-Shafi\'i disait que si les gens méditaient seulement cette sourate, elle leur suffirait. Le temps passe de toute façon : il est soit investi, soit perdu.'],
  ['c23', '20:114', 'Ta-Ha', '… Et dis : « Mon Seigneur, accroît ma science. »', 'La seule chose dont Allah ordonne au Prophète ﷺ de demander davantage : la science. Une invocation courte à faire avant chaque lecture.'],
  ['c24', '96:1-2', 'Al-\'Alaq', 'Lis, au nom de ton Seigneur qui a créé, qui a créé l\'homme d\'une adhérence.', 'Les tout premiers versets révélés, dans la grotte de Hira. Le premier mot adressé à l\'humanité par ce message est « Lis ». L\'islam commence par le savoir.'],
  ['c25', '39:9', 'Az-Zumar', '… Dis : « Sont-ils égaux, ceux qui savent et ceux qui ne savent pas ? » Seuls les doués d\'intelligence réfléchissent.', 'Une question qui n\'attend pas de réponse. Le savoir élève, et le verset lie l\'intelligence à la réflexion, pas à l\'accumulation.'],
  ['c26', '2:216', 'Al-Baqara', '… Il se peut que vous ayez de l\'aversion pour une chose alors qu\'elle est un bien pour vous, et il se peut que vous aimiez une chose alors qu\'elle est mauvaise pour vous. Allah sait, alors que vous ne savez pas.', 'Nos goûts ne sont pas des boussoles fiables. Ce qui coûte à court terme (l\'effort, la discipline) est souvent le bien, et ce qui plaît tout de suite, parfois le piège.'],
  ['c27', '3:200', 'Al \'Imran', 'Ô vous qui avez cru, soyez endurants, incitez-vous à l\'endurance, luttez constamment, et craignez Allah afin que vous réussissiez.', 'Dernier verset de la sourate : quatre étapes vers la réussite. La patience personnelle, puis la rivaliser en patience avec les autres, puis la constance sur la durée, et la piété comme socle.'],
  ['c28', '8:46', 'Al-Anfal', 'Obéissez à Allah et à Son messager, et ne vous disputez pas, sinon vous fléchirez et perdrez votre force. Et soyez endurants.', 'Une équipe divisée perd sa « force » (littéralement son vent). Valable pour une armée, une famille, une équipe en gare ou une entreprise.'],
  ['c29', '31:18-19', 'Luqman', 'Ne détourne pas ton visage des hommes par orgueil, et ne marche pas sur terre avec arrogance… Sois modeste dans ta démarche, et baisse ta voix.', 'Les conseils de Luqman à son fils touchent au langage du corps : le visage, la démarche, la voix. La noblesse se voit avant de s\'entendre.'],
  ['c30', '2:186', 'Al-Baqara', 'Et quand Mes serviteurs t\'interrogent sur Moi, Je suis tout proche : Je réponds à l\'appel de celui qui M\'invoque quand il M\'invoque…', 'Ailleurs dans le Coran, les questions reçoivent « Dis : … ». Ici, Allah répond directement, sans intermédiaire : même dans la forme, la proximité.'],
  ['c31', '50:16', 'Qaf', 'Nous avons effectivement créé l\'homme et Nous savons ce que son âme lui suggère, et Nous sommes plus près de lui que sa veine jugulaire.', 'Ce que tu te dis intérieurement est connu. Une conscience qui aide à la maîtrise de soi quand personne ne regarde.'],
  ['c32', '18:23-24', 'Al-Kahf', 'Et ne dis jamais à propos d\'une chose : « Je la ferai sûrement demain », sans ajouter : « Si Allah le veut. »', 'Planifier, oui ; se croire maître de demain, non. Le « in sha Allah » n\'est pas une excuse pour ne pas faire, c\'est l\'humilité de celui qui prévoit.'],
  ['c33', '53:39', 'An-Najm', 'Et qu\'en vérité, l\'homme n\'obtient que le fruit de ses efforts.', 'Personne ne portera le fardeau d\'un autre, et personne ne récoltera à ta place. Simple, et exigeant.'],
  ['c34', '61:2-3', 'As-Saff', 'Ô vous qui avez cru, pourquoi dites-vous ce que vous ne faites pas ? C\'est une grande abomination auprès d\'Allah que de dire ce que vous ne faites pas.', 'L\'écart entre la parole et l\'acte. Moins annoncer, plus faire : c\'est aussi le meilleur conseil de productivité qui soit.'],
  ['c35', '67:2', 'Al-Mulk', 'Celui qui a créé la mort et la vie afin de vous éprouver, pour savoir qui de vous est le meilleur en œuvre…', 'Le verset dit « le meilleur en œuvre », pas « le plus nombreux en œuvres ». Fudayl ibn \'Iyad l\'expliquait par : la plus sincère et la plus juste. La qualité avant la quantité.'],
  ['c36', '3:190-191', 'Al \'Imran', 'Dans la création des cieux et de la terre, et dans l\'alternance de la nuit et du jour, il y a certes des signes pour les doués d\'intelligence, qui, debout, assis ou couchés, invoquent Allah et méditent sur la création…', 'Aïcha raconte que le Prophète ﷺ pleura toute une nuit à la révélation de ces versets. Regarder le ciel, étudier la nature : une adoration quand le cœur y est.'],
  ['c37', '2:201', 'Al-Baqara', '… « Seigneur, accorde-nous une belle part ici-bas et une belle part dans l\'au-delà, et protège-nous du châtiment du Feu. »', 'L\'invocation que le Prophète ﷺ faisait le plus souvent (Bukhari). Elle ne rejette pas ce monde : elle demande le bien des deux.'],
  ['c38', '30:21', 'Ar-Rum', 'Parmi Ses signes, Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles, et Il a mis entre vous affection et miséricorde…', 'Deux mots pour le couple : mawadda (l\'affection, l\'amour actif) et rahma (la miséricorde, qui reste quand l\'élan faiblit). Le mariage est présenté comme un signe divin.'],
  ['c39', '14:7', 'Ibrahim', 'Et lorsque votre Seigneur proclama : « Si vous êtes reconnaissants, très certainement J\'augmenterai Mes bienfaits pour vous. »', 'La gratitude n\'est pas qu\'un sentiment : c\'est une cause d\'augmentation. Compter ce qu\'on a avant ce qui manque.'],
  ['c40', '93:3-5', 'Ad-Duha', 'Ton Seigneur ne t\'a ni abandonné ni détesté. La vie dernière t\'est certes meilleure que la vie présente. Ton Seigneur t\'accordera certes Ses faveurs, et alors tu seras satisfait.', 'Révélée après une pause de la révélation qui avait peiné le Prophète ﷺ, et dont ses ennemis se moquaient. Le silence n\'est pas l\'abandon.'],
  ['c41', '51:56', 'Adh-Dhariyat', 'Je n\'ai créé les djinns et les hommes que pour qu\'ils M\'adorent.', 'La raison d\'être en une phrase. L\'adoration, selon les savants, englobe tout acte fait pour Allah : le travail honnête, le sport, le soin de sa famille compris.'],
  ['c42', '88:17-20', 'Al-Ghashiya', 'Ne regardent-ils donc pas les chameaux, comment ils ont été créés, et le ciel, comment il est élevé, et les montagnes, comment elles sont dressées, et la terre, comment elle est nivelée ?', 'Quatre regards pour quelqu\'un du désert : l\'animal, le ciel, la montagne, la terre. La foi commence souvent par un regard attentif sur ce qu\'on croit déjà connaître.'],
  ['c43', '21:30', 'Al-Anbiya\'', 'Ceux qui ont mécru n\'ont-ils pas vu que les cieux et la terre formaient une masse compacte ? Ensuite Nous les avons séparés et avons fait de l\'eau toute chose vivante…', 'Un appel à observer l\'origine des choses et le rôle de l\'eau dans la vie. Les savants invitent à la prudence : le Coran est un livre de guidance, pas un manuel scientifique, même s\'il invite sans cesse à étudier la nature.'],
  ['c44', '25:74', 'Al-Furqan', '… « Seigneur, donne-nous, en nos épouses et nos descendants, la joie des yeux, et fais de nous un guide pour les pieux. »', 'Une invocation de couple : demander que son foyer soit une source de fraîcheur pour le regard, et viser haut, être un exemple.'],
  ['c45', '2:45', 'Al-Baqara', 'Et cherchez secours dans l\'endurance et la prière : certes, la prière est une lourde obligation, sauf pour les humbles.', 'La prière est lourde pour qui la vit comme une corvée, légère pour qui y trouve son repos. « Repose-nous par elle, ô Bilal », disait le Prophète ﷺ.']
];
const FX_HADITH = [
  ['h1', 'Les actes ne valent que par les intentions, et chacun n\'aura que ce qu\'il a eu l\'intention de faire.', 'Bukhari 1, Muslim 1907', 'Le premier hadith de Sahih Al-Bukhari. La même action peut être une adoration ou rien du tout, selon l\'intention. Renouvelle-la : même ta séance de sport peut compter.'],
  ['h2', 'Aucun de vous ne sera vraiment croyant tant qu\'il n\'aimera pas pour son frère ce qu\'il aime pour lui-même.', 'Bukhari 13, Muslim 45', 'Le test de l\'égo : se réjouir sincèrement de la réussite des autres. En business, c\'est aussi la base d\'une réputation qui dure.'],
  ['h3', 'Le fort n\'est pas celui qui terrasse les autres à la lutte. Le fort est celui qui se maîtrise lorsqu\'il est en colère.', 'Bukhari 6114, Muslim 2609', 'Pour un judoka, la leçon est claire : la vraie prise, c\'est sur soi-même.'],
  ['h4', 'Que celui qui croit en Allah et au Jour dernier dise du bien ou se taise.', 'Bukhari 6018, Muslim 47', 'Un filtre à trois secondes avant chaque parole, et chaque commentaire en ligne.'],
  ['h5', 'Fait partie de l\'excellence de l\'islam d\'une personne le fait de délaisser ce qui ne la concerne pas.', 'Tirmidhi 2317', 'Le hadith anti-scroll par excellence. Tout ce qui ne te concerne pas prend du temps à ce qui te concerne.'],
  ['h6', 'Il y a deux bienfaits dont beaucoup de gens sont lésés : la santé et le temps libre.', 'Bukhari 6412', 'Lésés, comme dans une mauvaise affaire : on les échange contre presque rien. Tu as les deux en ce moment.'],
  ['h7', 'Les actes les plus aimés d\'Allah sont ceux qui sont les plus réguliers, même s\'ils sont peu nombreux.', 'Bukhari 6464, Muslim 783', 'La constance bat l\'intensité. Tout le principe de cette app.'],
  ['h8', 'Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible, et en chacun il y a du bien. Attache-toi à ce qui t\'est profitable, demande l\'aide d\'Allah et ne baisse pas les bras.', 'Muslim 2664', 'Trois consignes : viser l\'utile, s\'appuyer sur Allah, ne pas abandonner. La suite du hadith met en garde contre le « si seulement j\'avais… ».'],
  ['h9', 'Allah ne regarde ni vos corps ni vos apparences, mais Il regarde vos cœurs et vos actes.', 'Muslim 2564', 'Le physique se travaille, mais ce qui est regardé, c\'est l\'intérieur et ce que tu en fais.'],
  ['h10', 'Ton sourire à ton frère est une aumône.', 'Tirmidhi 1956', 'L\'aumône la moins chère et la plus rapide. Dans un commentaire, une story, une rencontre : elle est à portée de main toute la journée.'],
  ['h11', 'Le commerçant véridique et digne de confiance sera avec les prophètes, les véridiques et les martyrs.', 'Tirmidhi 1209', 'Le rang le plus élevé promis à un commerçant, à deux conditions : dire vrai et respecter ce qu\'on lui confie.'],
  ['h12', 'Celui qui nous trompe n\'est pas des nôtres.', 'Muslim 102', 'Dit au marché, devant un tas de nourriture dont le dessus était sec et le dessous mouillé. Cacher un défaut, c\'est tromper.'],
  ['h13', 'Qu\'Allah fasse miséricorde à un homme facile lorsqu\'il vend, lorsqu\'il achète et lorsqu\'il réclame son dû.', 'Bukhari 2076', 'La souplesse en affaires attire la miséricorde. Être dur sur les principes, facile dans la manière.'],
  ['h14', 'Personne n\'a jamais mangé de meilleure nourriture que celle issue du travail de ses mains.', 'Bukhari 2072', 'Le hadith cite l\'exemple de Dawud, prophète et roi, qui vivait du travail de ses mains. Aucun travail honnête n\'est petit.'],
  ['h15', 'Attache-la, puis place ta confiance en Allah.', 'Tirmidhi 2517', 'Réponse à un homme qui demandait s\'il devait attacher sa chamelle ou s\'en remettre à Allah. Les deux : l\'effort, puis la confiance.'],
  ['h16', 'La purification est la moitié de la foi.', 'Muslim 223', 'La propreté du corps prépare celle du cœur. L\'hygiène fait partie de la religion, pas seulement du confort.'],
  ['h17', 'Profite de cinq choses avant cinq autres : ta jeunesse avant ta vieillesse, ta santé avant ta maladie, ta richesse avant ta pauvreté, ton temps libre avant ton occupation, et ta vie avant ta mort.', 'Rapporté par al-Hakim', 'Tu es dans la fenêtre des cinq. C\'est maintenant que tout se construit.'],
  ['h18', 'Le meilleur d\'entre vous est celui qui apprend le Coran et l\'enseigne.', 'Bukhari 5027', 'Apprendre ne suffit pas : transmettre fait partie de l\'excellence.'],
  ['h19', 'Quiconque emprunte un chemin à la recherche d\'une science, Allah lui facilite par cela un chemin vers le Paradis.', 'Muslim 2699', 'Chaque carte de savoir que tu lis ici peut être un pas sur ce chemin, avec la bonne intention.'],
  ['h20', 'Le meilleur d\'entre vous est le meilleur envers sa famille, et je suis le meilleur d\'entre vous envers ma famille.', 'Tirmidhi 3895', 'Le vrai caractère se voit à la maison, là où l\'on n\'a rien à prouver.'],
  ['h21', 'Un homme dit au Prophète ﷺ : « Conseille-moi. » Il répondit : « Ne te mets pas en colère. » L\'homme répéta sa demande plusieurs fois, et il répondait : « Ne te mets pas en colère. »', 'Bukhari 6116', 'Un seul conseil, répété : la colère ouvre la porte à la plupart des regrets.'],
  ['h22', 'La religion est facilité. Personne ne la rendra difficile sans qu\'elle ne le vainque. Visez la justesse, rapprochez-vous-en, et réjouissez-vous.', 'Bukhari 39', 'Contre le tout ou rien : mieux vaut un peu, juste et durable, qu\'un excès qui s\'effondre.'],
  ['h23', 'Sois dans ce monde comme un étranger, ou comme un voyageur de passage.', 'Bukhari 6416', 'Le voyageur ne s\'attache pas au lieu où il fait halte. Il sait où il va.'],
  ['h24', 'La bonté, c\'est le bon caractère. Et le péché, c\'est ce qui trouble ton âme et que tu détesterais que les gens découvrent.', 'Muslim 2553', 'Une boussole intérieure : si tu ne voudrais pas que ça se sache, c\'est un signal.'],
  ['h25', 'La pudeur fait partie de la foi.', 'Bukhari 24, Muslim 36', 'Al-haya\' : une retenue qui protège, devant les gens et devant Allah.'],
  ['h26', 'Le fils d\'Adam ne remplit pas de récipient pire que son ventre. Quelques bouchées suffisent pour tenir son dos droit. S\'il faut plus : un tiers pour sa nourriture, un tiers pour sa boisson, un tiers pour son souffle.', 'Tirmidhi 2380', 'Une règle de nutrition d\'une étonnante modernité : manger à sa faim, pas jusqu\'à l\'excès.'],
  ['h27', 'Craignez Allah où que vous soyez, faites suivre une mauvaise action d\'une bonne qui l\'effacera, et comportez-vous avec les gens avec un bon caractère.', 'Tirmidhi 1987', 'Trois directions : Allah, soi-même, les autres. Et une méthode après un faux pas : enchaîner tout de suite par un bien.']
];
/* Business : [id, livre ou thème, mois du parcours (0 = général), titre, texte, à appliquer] */
const FX_BIZ = [
['b1', 'Business et islam', 0, 'L\'intention d\'abord', 'Le même business peut être une adoration ou une simple course à l\'argent : tout dépend de l\'intention. Le Prophète ﷺ a dit : « Le commerçant véridique et digne de confiance sera avec les prophètes, les véridiques et les martyrs. » (Tirmidhi 1209)', 'Écris en une phrase pourquoi tu fais ton business, en dehors de l\'argent.'],
  ['b2', 'Business et islam', 0, 'Le commerce est licite, l\'usure non', '« Allah a rendu licite le commerce et interdit l\'usure. » (Coran 2:275). Emprunter avec intérêt pour lancer un produit est donc à éviter. Les alternatives existent : épargne, précommandes, associée, financement participatif sans intérêt.', 'Liste comment tu pourrais financer ta prochaine étape sans crédit à intérêt.'],
  ['b3', 'Business et islam', 0, 'Ne pas vendre ce qu\'on n\'a pas', 'Le Prophète ﷺ a dit : « Ne vends pas ce qui n\'est pas en ta possession. » (Abu Dawud 3503, Tirmidhi 1232). Pour lancer un produit sans stock, les savants proposent des formules claires, comme la précommande (salam) avec un prix, une description et un délai précis.', 'Si tu vends avant d\'avoir le produit, écris noir sur blanc le délai et ce que reçoit la cliente.'],
  ['b4', 'Business et islam', 0, 'Montrer le défaut', 'Le Prophète ﷺ passa près d\'un tas de grain, glissa la main dedans et trouva le dessous mouillé. Il dit : « Celui qui trompe n\'est pas des nôtres. » (Muslim 102). Une photo trop retouchée, un « stock limité » inventé : c\'est la même chose, version moderne.', 'Relis ta dernière présentation de produit : tout est-il exactement vrai ?'],
  ['b5', 'Business et islam', 0, 'Être facile en affaires', '« Qu\'Allah fasse miséricorde à un homme facile quand il vend, quand il achète et quand il réclame son dû. » (Bukhari 2076). La souplesse (un retour accepté, un délai laissé) coûte peu et construit une réputation.', 'Choisis un geste de souplesse que tu peux offrir à tes clientes.'],
  ['b6', 'Business et islam', 0, 'La transaction bénie', '« Le vendeur et l\'acheteur ont le choix tant qu\'ils ne se sont pas séparés. S\'ils sont sincères et clairs, leur vente est bénie ; s\'ils cachent et mentent, la bénédiction en est effacée. » (Bukhari 2079, Muslim 1532)', 'Ajoute sur ta page ce que ton produit ne fait pas.'],
  ['b7', 'Business et islam', 0, 'Khadija, femme d\'affaires', 'Avant la révélation, Khadija (qu\'Allah l\'agrée) dirigeait un commerce caravanier et engageait des hommes pour mener ses marchandises. C\'est en voyant l\'honnêteté de Muhammad ﷺ dans ses affaires qu\'elle le remarqua.', 'Ta réputation se construit dans les petites transactions. Laquelle soigner cette semaine ?'],
  ['b8', 'Contenu', 0, 'Une vidéo, une idée', 'Une vidéo qui dit trois choses n\'en fait retenir aucune. Une idée, un exemple, une fin claire. Si tu ne peux pas résumer ta vidéo en une phrase, elle n\'est pas prête.', 'Résume ta prochaine vidéo en une phrase avant de la tourner.'],
  ['b9', 'Contenu', 0, 'Les premières secondes', 'Sur les réseaux, on décide en un instant de rester ou de passer. Commence par la promesse ou la question, pas par « Salam, aujourd\'hui je vais vous parler de… ».', 'Écris trois accroches différentes pour la même vidéo et garde la plus forte.'],
  ['b10', 'Contenu', 0, 'La régularité bat la viralité', 'Une vidéo virale sans suite s\'oublie. Trois vidéos par semaine pendant trois mois apprennent à l\'algorithme et au public qui tu es, et t\'apprennent à toi ce qui marche.', 'Bloque tes trois créneaux de tournage de la semaine.'],
  ['b11', 'Communauté', 0, 'Les 1 000 vrais fans', 'L\'idée de Kevin Kelly (2008) : une créatrice n\'a pas besoin de millions d\'abonnés. Mille personnes qui aiment vraiment ce qu\'elle fait et achètent ce qu\'elle crée peuvent suffire à en vivre.', 'Qui sont tes dix premières vraies fans ? Parle-leur directement.'],
  ['b12', 'Communauté', 0, 'Répondre, c\'est construire', 'Chaque commentaire auquel tu réponds est une conversation, pas une statistique. Les premières communautés se construisent à la main, une personne à la fois.', 'Réponds à tous les commentaires de ta dernière vidéo.'],
  ['b13', 'Offre', 0, 'Tester avant de fabriquer', 'Avant de produire en quantité, vérifie que des gens veulent vraiment ton produit : sondage en story, liste d\'attente, petite précommande honnête. C\'est l\'esprit du « produit minimum viable » (Eric Ries, The Lean Startup).', 'Pose une question en story sur ton produit et note les réponses.'],
  ['b14', 'Offre', 0, 'La valeur perçue', 'On n\'achète pas ce qu\'une chose vaut, mais ce qu\'on croit qu\'elle vaut pour soi. La présentation, l\'histoire et la confiance changent le prix qu\'une cliente est prête à payer.', 'Raconte en trois phrases pourquoi tu as créé ton produit.'],
  ['b15', 'Chiffres', 0, 'Chiffre d\'affaires n\'est pas bénéfice', 'Si tu vends pour 1 000 € mais que produits, envois, publicités et frais coûtent 800 €, ton bénéfice est de 200 €, avant impôts et cotisations. Beaucoup de projets meurent en confondant les deux.', 'Calcule ce qu\'il te reste vraiment sur une vente.'],
  ['b16', 'Chiffres', 0, 'La zakat du commerce', 'Selon l\'avis de la majorité des savants, les marchandises destinées à la vente entrent dans le calcul de la zakat, à leur valeur, une fois par an lunaire, si le seuil (nisab) est atteint. Les détails se vérifient avec une personne de savoir.', 'Note la date de début de ton activité : elle servira de repère.']
];
/* Science & culture : [id, cat, accroche, texte] */
const FX_SCI = [
  ['s1', 'sci', 'Ton cerveau pèse 2 % de ton corps', 'Et il consomme environ 20 % de ton énergie au repos. Penser coûte cher : c\'est pour ça que le cerveau adore les automatismes.'],
  ['s2', 'sci', '86 milliards', 'C\'est l\'estimation du nombre de neurones dans un cerveau humain (Azevedo, 2009). Chacun peut former des milliers de connexions.'],
  ['s3', 'sci', 'Ce qui s\'active ensemble se relie', 'Quand deux neurones s\'activent en même temps, leur connexion se renforce (Hebb, 1949). Chaque répétition d\'une habitude, bonne ou mauvaise, la grave un peu plus.'],
  ['s4', 'sci', '8 minutes et 20 secondes', 'Le temps que met la lumière du Soleil pour arriver jusqu\'à toi. Le Soleil que tu vois est celui d\'il y a 8 minutes.'],
  ['s5', 'sci', 'Les 6 dernières secondes', 'Si l\'histoire de la Terre tenait en 24 heures, Homo sapiens n\'apparaîtrait qu\'aux 6 dernières secondes avant minuit.'],
  ['s6', 'sci', '2 mètres d\'ADN', 'Déroulé, l\'ADN d\'une seule de tes cellules mesurerait environ 2 mètres. Il tient dans un noyau de quelques millièmes de millimètre.'],
  ['s7', 'sci', 'Autant de bactéries que de cellules', 'On a longtemps dit « 10 bactéries pour 1 cellule humaine ». Une étude de 2016 (Sender et al.) a corrigé : le rapport est proche de 1 pour 1.'],
  ['s8', 'sci', '100 000 battements', 'Ton cœur bat environ 100 000 fois par jour, sans que tu y penses une seule fois.'],
  ['s9', 'sci', 'La dopamine, c\'est l\'envie', 'La dopamine est surtout liée à l\'anticipation et à l\'envie (« wanting »), plus qu\'au plaisir lui-même (Berridge). C\'est pourquoi on peut vouloir quelque chose sans l\'apprécier vraiment.'],
  ['s10', 'sci', '66 jours, en moyenne', 'Dans l\'étude de Lally (2010), une nouvelle habitude devenait automatique en 66 jours en moyenne, de 18 à 254 selon les gens et les habitudes. Rater un jour ne cassait pas le processus.'],
  ['s11', 'sci', 'Un jour plus long qu\'une année', 'Sur Vénus, un jour (243 jours terrestres) dure plus longtemps qu\'une année (225 jours terrestres).'],
  ['s12', 'sci', 'La Lune s\'éloigne', 'Environ 3,8 cm par an : c\'est ce que mesurent les lasers renvoyés par les réflecteurs posés par les missions Apollo.'],
  ['s13', 'sci', 'Une cuillère d\'étoile', 'Une cuillère à café de matière d\'étoile à neutrons pèserait environ un milliard de tonnes sur Terre.'],
  ['s14', 'sci', 'L\'eau bout à 70 °C', 'Au sommet de l\'Everest, la pression est si basse que l\'eau bout vers 70 °C. Impossible d\'y cuire correctement des pâtes.'],
  ['s15', 'sci', 'Se tester plutôt que relire', 'Se forcer à retrouver une information (comme dans un quiz) la fixe bien mieux que la relire (Roediger & Karpicke, 2006). C\'est l\'effet de test.'],
  ['s16', 'sci', 'La courbe de l\'oubli', 'Sans révision, on oublie une grande partie d\'une nouvelle information en quelques jours (Ebbinghaus, 1885). Chaque rappel espacé la ralentit.'],
  ['s17', 'sci', 'Le sommeil trie tes souvenirs', 'Pendant le sommeil, le cerveau rejoue et consolide ce que tu as appris dans la journée. Apprendre puis dormir, c\'est apprendre deux fois.'],
  ['s18', 'sci', '4 éléments à la fois', 'Ta mémoire de travail ne garde qu\'environ 4 éléments en même temps (Cowan). D\'où l\'intérêt de noter plutôt que de tout retenir.'],
  ['s19', 'sci', 'Marcher après manger', 'Quelques minutes de marche après un repas réduisent le pic de sucre dans le sang, selon plusieurs études. Une vieille habitude de digestion, validée.'],
  ['s20', 'sci', 'Les requins sont plus vieux que les arbres', 'Les premiers requins sont apparus il y a environ 450 millions d\'années ; les premiers arbres, vers 385 millions d\'années.'],
  ['s21', 'sci', 'La peau, ton plus grand organe', 'Elle couvre près de 2 m² chez l\'adulte et se renouvelle en permanence.'],
  ['s22', 'sci', 'Trois cœurs et du sang bleu', 'La pieuvre a trois cœurs, et son sang est bleu grâce à une protéine à base de cuivre (l\'hémocyanine).'],
  ['s23', 'sci', 'La bonne fatigue', 'Le muscle ne grandit pas pendant l\'effort mais pendant la récupération, à condition de manger assez de protéines et de dormir.'],
  ['s24', 'sci', 'Le téléphone posé à côté', 'Une étude de 2017 (Ward et al.) suggère que la simple présence du smartphone sur la table réduit la capacité d\'attention disponible, même éteint. Mets-le dans une autre pièce pour travailler.'],
  ['k1', 'cult', 'La plus ancienne université', 'Al-Qarawiyyin, à Fès, fondée en 859 par une femme, Fatima al-Fihri, est considérée comme la plus ancienne université encore en activité.'],
  ['k2', 'cult', 'Algorithme', 'Le mot vient du nom d\'al-Khwarizmi, mathématicien de Bagdad (IXe siècle). Et « algèbre » vient d\'al-jabr, dans le titre de son traité.'],
  ['k3', 'cult', 'Le père de la méthode expérimentale', 'Ibn al-Haytham (Alhazen), au XIe siècle, expliqua que la vision vient de la lumière qui entre dans l\'œil, et vérifia ses idées par l\'expérience. Son Livre d\'optique a influencé la science européenne.'],
  ['k4', 'cult', 'Ibn Khaldun, avant la sociologie', 'Dans sa Muqaddima (1377), il analyse la naissance et la chute des dynasties par la cohésion sociale (\'asabiyya). Beaucoup le voient comme un précurseur de la sociologie et de l\'économie.'],
  ['k5', 'cult', 'Le Canon d\'Avicenne', 'Le Canon de la médecine d\'Ibn Sina a servi de manuel dans les universités européennes pendant des siècles.'],
  ['k6', 'cult', 'Des chiffres indiens', 'Nos chiffres « arabes » sont nés en Inde. Ils ont été transmis à l\'Europe par le monde arabe, notamment grâce à al-Khwarizmi.'],
  ['k7', 'cult', 'Le café des soufis', 'Les premières traces fiables du café comme boisson viennent des monastères soufis du Yémen, au XVe siècle, où il aidait à veiller pour les prières de nuit.'],
  ['k8', 'cult', 'L\'homme qui fit chuter l\'or', 'En 1324, Mansa Musa, roi du Mali, passa par Le Caire en pèlerinage avec tant d\'or qu\'il en fit chuter le cours pendant des années.'],
  ['k9', 'cult', 'Des mots arabes en français', 'Sucre (sukkar), magasin (makhazin), chiffre (sifr), hasard (az-zahr, le dé), café (qahwa), algèbre (al-jabr)… Des centaines de mots français viennent de l\'arabe.'],
  ['k10', 'cult', 'Cléopâtre et la Lune', 'Cléopâtre a vécu plus près de nous (premier pas sur la Lune en 1969) que de la construction de la grande pyramide de Gizeh.'],
  ['k11', 'cult', 'Oxford et les Aztèques', 'On enseignait déjà à Oxford vers 1096. Tenochtitlan, capitale aztèque, n\'a été fondée qu\'en 1325.'],
  ['k12', 'cult', 'Napoléon n\'était pas petit', 'Il mesurait environ 1,69 m, dans la moyenne de son époque. La légende vient de la propagande britannique et d\'une confusion entre pouces français et anglais.'],
  ['k13', 'cult', 'La tour Eiffel grandit l\'été', 'Avec la chaleur, le fer se dilate : son sommet peut gagner une quinzaine de centimètres.'],
  ['k14', 'cult', '12 fuseaux horaires', 'Grâce à ses territoires d\'outre-mer, la France est le pays qui compte le plus de fuseaux horaires au monde.'],
  ['k15', 'cult', 'Cannes, 1939', 'Le premier Festival de Cannes devait se tenir en septembre 1939. La guerre l\'annula : la première édition eut lieu en 1946.'],
  ['k16', 'cult', 'Nice, française depuis 1860', 'Nice et la Savoie ont été rattachées à la France en 1860, par le traité de Turin.'],
  ['k17', 'cult', 'Ibn Battuta, 120 000 km', 'Au XIVe siècle, ce voyageur de Tanger a parcouru environ 120 000 km en près de 30 ans, du Maroc à la Chine.'],
  ['k18', 'cult', 'Saladin à Jérusalem', 'En 1187, Salah ad-Din reprit Jérusalem et épargna la population, un contraste frappant avec le massacre de 1099. Même ses ennemis louaient sa générosité.'],
  ['k19', 'cult', 'Le zéro', 'Le mathématicien indien Brahmagupta a donné des règles de calcul avec le zéro dès 628. Le mot « zéro » vient de l\'arabe sifr, le vide.'],
  ['k20', 'cult', 'L\'écriture a 5 000 ans', 'L\'écriture cunéiforme est apparue à Sumer (Irak actuel) vers 3200 av. J.-C., d\'abord pour tenir… des comptes.'],
  ['k21', 'cult', 'Pas visible depuis l\'espace', 'La Grande Muraille de Chine ne se voit pas à l\'œil nu depuis l\'orbite : elle est très longue mais trop étroite.'],
  ['k22', 'cult', 'Cordoue, capitale du savoir', 'Au Xe siècle, Cordoue était l\'une des plus grandes villes d\'Europe, avec des rues éclairées et, selon les chroniques, une bibliothèque de centaines de milliers de volumes.']
];
/* Psychologie : [id, titre, texte, à observer] */
const FX_PSY = [
['p1', 'La comparaison sociale', 'Le psychologue Leon Festinger (1954) a montré qu\'on s\'évalue en se comparant aux autres. Sur les réseaux, on compare ses coulisses aux meilleurs moments des autres : le match est perdu d\'avance.', 'Après un scroll, note si tu te sens mieux ou moins bien. C\'est un bon indicateur.'],
  ['p2', 'Le syndrome de l\'imposteur', 'Décrit par Clance et Imes (1978) chez des femmes brillantes qui attribuaient leur réussite à la chance. Se sentir imposteur ne veut pas dire l\'être : c\'est souvent le signe qu\'on grandit.', 'Écris trois choses que tu as réussies grâce à ton travail.'],
  ['p3', 'L\'effet Zeigarnik', 'On se souvient mieux des tâches inachevées que des terminées (Zeigarnik, 1927). C\'est pour ça qu\'une liste à moitié faite tourne dans la tête le soir.', 'Avant de dormir, écris la prochaine étape de ce qui est en cours : ton esprit peut lâcher.'],
  ['p4', 'Si… alors…', 'Les « intentions de mise en œuvre » (Gollwitzer) : décider à l\'avance « quand X arrive, je fais Y » augmente fortement les chances de passer à l\'action.', 'Écris une phrase : « Après la prière de Dhuhr, je… »'],
  ['p5', 'L\'autocompassion', 'Les travaux de Kristin Neff montrent que se parler avec douceur après un échec aide à recommencer, bien plus que la dureté. On progresse mieux en coach qu\'en juge.', 'Parle-toi comme tu parlerais à ta meilleure amie.'],
  ['p6', 'Le flow', 'Mihaly Csikszentmihalyi a décrit cet état où l\'on oublie le temps, absorbé par une tâche ni trop facile ni trop difficile. Les notifications le cassent en une seconde.', 'Pour ton prochain montage, téléphone en mode avion pendant 30 minutes.'],
  ['p7', 'La gratitude écrite', 'Dans une étude d\'Emmons et McCullough (2003), noter chaque semaine ce pour quoi on est reconnaissant améliorait le bien-être et l\'optimisme.', 'Ce soir, écris trois bienfaits de ta journée.'],
  ['p8', 'Psychologie islamique', 'Les trois états de l\'âme', 'Le Coran décrit l\'âme qui incite au mal (12:53), l\'âme qui se reproche (75:2) et l\'âme apaisée (89:27). Se reprocher ses fautes n\'est pas un échec : c\'est le signe d\'une âme vivante, en chemin.', 'Quand tu te reproches quelque chose, transforme-le en une action concrète.'],
  ['p9', 'Psychologie islamique', 'Regarder en dessous de soi', '« Regardez ceux qui sont en dessous de vous et ne regardez pas ceux qui sont au-dessus : c\'est plus digne pour ne pas mépriser les bienfaits d\'Allah sur vous. » (Muslim 2963). Un remède à la comparaison, 14 siècles avant les réseaux sociaux.', 'Pense à trois bienfaits que tu as et que d\'autres n\'ont pas.'],
  ['p10', 'Psychologie islamique', 'Attache ta chamelle', 'Un homme demanda s\'il devait attacher sa chamelle ou s\'en remettre à Allah. Le Prophète ﷺ répondit : « Attache-la et remets-t\'en à Allah. » (Tirmidhi 2517). Faire sa part, puis lâcher l\'anxiété du résultat.', 'Sur ce qui t\'inquiète : qu\'est-ce qui dépend de toi aujourd\'hui ?'],
  ['p11', 'Psychologie islamique', 'Les cœurs s\'apaisent', '« N\'est-ce point par l\'évocation d\'Allah que les cœurs se tranquillisent ? » (Coran 13:28). La répétition calme d\'une formule ralentit aussi la respiration, ce qui apaise le corps.', 'Trois minutes de dhikr lent, en expirant doucement.'],
  ['p12', 'Psychologie islamique', 'Al-Balkhi, précurseur', 'Au IXe siècle, le savant Abu Zayd al-Balkhi distinguait déjà la tristesse qui a une cause de celle qui n\'en a pas d\'apparente, et proposait de corriger les pensées par des pensées plus justes, une idée proche des thérapies cognitives modernes.', 'Prends une pensée qui te pèse et écris une version plus juste.'],
  ['p13', 'Psychologie islamique', 'Au premier choc', '« La patience, c\'est au premier choc. » (Bukhari 1283, Muslim 926). La première réaction est celle qui compte le plus, et elle se prépare avant l\'épreuve.', 'Choisis une phrase à te dire la prochaine fois que quelque chose te contrarie.']
];
/* Quiz : [id, question, [choix], index de la bonne réponse, explication] */
const FX_QUIZ = [
  ['q1', 'Combien de sourates compte le Coran ?', ['99', '114', '124'], 1, '114 sourates, de longueurs très différentes.'],
  ['q2', 'Quelle est la plus longue sourate du Coran ?', ['Al-Baqara', 'Al \'Imran', 'Yusuf'], 0, 'Al-Baqara, avec 286 versets. La plus courte est Al-Kawthar, 3 versets.'],
  ['q3', 'Quel est le premier mot révélé du Coran ?', ['Bismillah', 'Qul (Dis)', 'Iqra (Lis)'], 2, '« Iqra », dans la grotte de Hira : sourate Al-\'Alaq.'],
  ['q4', 'D\'où vient le mot « algorithme » ?', ['Du grec algos', 'D\'al-Khwarizmi', 'Du latin algor'], 1, 'Du nom du mathématicien al-Khwarizmi, à Bagdad au IXe siècle.'],
  ['q5', 'Qui a fondé l\'université al-Qarawiyyin ?', ['Fatima al-Fihri', 'Harun ar-Rashid', 'Ibn Rushd'], 0, 'Fatima al-Fihri, à Fès, en 859.'],
  ['q6', 'Sur quelle planète un jour dure-t-il plus qu\'une année ?', ['Mars', 'Vénus', 'Jupiter'], 1, 'Vénus : 243 jours terrestres pour tourner sur elle-même, 225 pour faire le tour du Soleil.'],
  ['q7', 'Combien d\'os compte le squelette d\'un adulte ?', ['186', '206', '256'], 1, '206. Un bébé en a davantage : certains fusionnent en grandissant.'],
  ['q8', 'Marge brute =', ['Prix − coût direct du produit', 'Bénéfice après impôts', 'Chiffre d\'affaires total'], 0, 'La marge nette, elle, retire aussi toutes les autres charges.'],
  ['q9', 'Dans SPIN Selling, le « I » signifie :', ['Information', 'Implication', 'Intérêt'], 1, 'Implication : faire mesurer au client ce que son problème lui coûte.'],
  ['q10', '« Plus que 2 en stock ! » joue sur quel principe de Cialdini ?', ['La réciprocité', 'La rareté', 'L\'autorité'], 1, 'La rareté : ce qui risque de manquer paraît plus précieux.'],
  ['q11', 'Répéter les derniers mots de l\'autre s\'appelle, chez Chris Voss :', ['Le miroir', 'L\'ancrage', 'Le recadrage'], 0, 'Le miroir. L\'autre développe, et se sent écouté.'],
  ['q12', 'La MESORE, en négociation, c\'est :', ['Ton prix de départ', 'Ta meilleure solution si l\'accord échoue', 'La concession finale'], 1, 'Meilleure Solution de Rechange. Plus elle est bonne, plus tu es fort.'],
  ['q13', 'Selon The Mom Test, quelle réponse vaut le plus ?', ['« Super idée ! »', '« Je l\'achèterais sûrement »', '« Je te paie un acompte maintenant »'], 2, 'Un engagement (argent, temps, réputation) vaut plus que tous les compliments.'],
  ['q14', 'Un vrai sourire se reconnaît surtout :', ['Aux dents visibles', 'Au plissement des yeux', 'À sa durée'], 1, 'Le sourire de Duchenne mobilise les muscles autour des yeux.'],
  ['q15', 'Combien de temps en moyenne pour qu\'une habitude devienne automatique (Lally, 2010) ?', ['21 jours', '66 jours', '6 mois'], 1, '66 jours en moyenne, de 18 à 254 selon les personnes. Les « 21 jours » sont un mythe.'],
  ['q16', 'Qui a écrit la Muqaddima ?', ['Ibn Battuta', 'Ibn Khaldun', 'Ibn Sina'], 1, 'Ibn Khaldun, en 1377.'],
  ['q17', 'En quelle année Salah ad-Din reprend-il Jérusalem ?', ['1099', '1187', '1492'], 1, '1187. 1099 est l\'année de la prise par les croisés, 1492 celle de la chute de Grenade.'],
  ['q18', 'Où le café est-il devenu une boisson ?', ['En Italie', 'Au Brésil', 'Au Yémen'], 2, 'Au Yémen, au XVe siècle, dans les cercles soufis.'],
  ['q19', 'Quelle part de ton énergie ton cerveau consomme-t-il au repos ?', ['5 %', '20 %', '50 %'], 1, 'Environ 20 %, pour 2 % du poids du corps.'],
  ['q20', 'Le point mort, c\'est :', ['Le mois le plus calme', 'Le chiffre d\'affaires qui couvre toutes les charges', 'La faillite'], 1, 'Au-dessus du point mort, chaque vente rapporte vraiment.'],
  ['q21', 'Combien de temps met la lumière du Soleil pour nous atteindre ?', ['8 secondes', '8 minutes', '8 heures'], 1, 'Environ 8 minutes et 20 secondes.'],
  ['q22', 'Quel verset parle de « l\'homme n\'obtient que le fruit de ses efforts » ?', ['An-Najm 53:39', 'Al-Fatiha 1:5', 'Al-Ikhlas 112:1'], 0, 'Sourate An-Najm, verset 39.'],
  ['q23', 'Selon le hadith, quels sont les deux bienfaits dont beaucoup sont lésés ?', ['L\'argent et la famille', 'La santé et le temps libre', 'La jeunesse et la beauté'], 1, 'La santé et le temps libre (Bukhari).'],
  ['q24', 'L\'équation de la valeur d\'Hormozi augmente quand…', ['Le délai augmente', 'L\'effort diminue', 'Le prix baisse'], 1, 'Moins d\'effort et moins de délai, plus de résultat et plus de certitude.']
];
/* Vrai ou faux : [id, affirmation, vrai ?, explication] */
const FX_VF = [
  ['v1', 'La Grande Muraille de Chine est visible à l\'œil nu depuis l\'espace.', false, 'Faux : trop étroite pour être vue à l\'œil nu depuis l\'orbite.'],
  ['v2', 'On n\'utilise que 10 % de son cerveau.', false, 'Faux : l\'imagerie montre que toutes les zones servent, à des moments différents.'],
  ['v3', 'Les requins existaient avant les arbres.', true, 'Vrai : environ 450 millions d\'années contre 385 millions.'],
  ['v4', 'On enseignait à Oxford avant la fondation de la capitale aztèque.', true, 'Vrai : vers 1096 contre 1325.'],
  ['v5', 'Regarder en haut à gauche trahit un mensonge.', false, 'Faux : aucune étude ne confirme ce signe. Aucun geste unique ne trahit le mensonge.'],
  ['v6', 'Le poisson rouge a une mémoire de 3 secondes.', false, 'Faux : il peut retenir des informations pendant des mois.'],
  ['v7', 'Le mot « sucre » vient de l\'arabe.', true, 'Vrai : de sukkar.'],
  ['v8', 'Chiffre d\'affaires et bénéfice, c\'est la même chose.', false, 'Faux : le bénéfice, c\'est ce qui reste après toutes les charges.'],
  ['v9', 'Le sucre rend les enfants hyperactifs.', false, 'Faux : les études en double aveugle ne montrent pas d\'effet. Ce sont surtout les attentes des parents qui changent.'],
  ['v10', 'Ton cœur bat environ 100 000 fois par jour.', true, 'Vrai : environ 70 battements par minute × 1 440 minutes.'],
  ['v11', 'Napoléon était petit pour son époque.', false, 'Faux : environ 1,69 m, dans la moyenne.'],
  ['v12', 'La France est le pays qui compte le plus de fuseaux horaires.', true, 'Vrai : 12, grâce à ses territoires d\'outre-mer.'],
  ['v13', 'Il faut 21 jours pour prendre une habitude.', false, 'Faux : 66 jours en moyenne dans l\'étude de Lally, avec de grandes différences selon les gens.'],
  ['v14', 'Rater un jour ruine la formation d\'une habitude.', false, 'Faux : dans l\'étude de Lally, un oubli ponctuel ne changeait presque rien. Ce qui compte, c\'est de reprendre.']
];

const FX_AR = {"c1": "فَإِنَّ مَعَ ٱلۡعُسۡرِ يُسۡرًا ﴿٥﴾ إِنَّ مَعَ ٱلۡعُسۡرِ يُسۡرٗا ﴿٦﴾", "c2": "لَا يُكَلِّفُ ٱللَّهُ نَفۡسًا إِلَّا وُسۡعَهَاۚ لَهَا مَا كَسَبَتۡ وَعَلَيۡهَا مَا ٱكۡتَسَبَتۡۗ رَبَّنَا لَا تُؤَاخِذۡنَآ إِن نَّسِينَآ أَوۡ أَخۡطَأۡنَاۚ رَبَّنَا وَلَا تَحۡمِلۡ عَلَيۡنَآ إِصۡرٗا كَمَا حَمَلۡتَهُۥ عَلَى ٱلَّذِينَ مِن قَبۡلِنَاۚ رَبَّنَا وَلَا تُحَمِّلۡنَا مَا لَا طَاقَةَ لَنَا بِهِۦۖ وَٱعۡفُ عَنَّا وَٱغۡفِرۡ لَنَا وَٱرۡحَمۡنَآۚ أَنتَ مَوۡلَىٰنَا فَٱنصُرۡنَا عَلَى ٱلۡقَوۡمِ ٱلۡكَٰفِرِينَ ﴿٢٨٦﴾", "c3": "لَهُۥ مُعَقِّبَٰتٞ مِّنۢ بَيۡنِ يَدَيۡهِ وَمِنۡ خَلۡفِهِۦ يَحۡفَظُونَهُۥ مِنۡ أَمۡرِ ٱللَّهِۗ إِنَّ ٱللَّهَ لَا يُغَيِّرُ مَا بِقَوۡمٍ حَتَّىٰ يُغَيِّرُواْ مَا بِأَنفُسِهِمۡۗ وَإِذَآ أَرَادَ ٱللَّهُ بِقَوۡمٖ سُوٓءٗا فَلَا مَرَدَّ لَهُۥۚ وَمَا لَهُم مِّن دُونِهِۦ مِن وَالٍ ﴿١١﴾", "c4": "ٱلَّذِينَ ءَامَنُواْ وَتَطۡمَئِنُّ قُلُوبُهُم بِذِكۡرِ ٱللَّهِۗ أَلَا بِذِكۡرِ ٱللَّهِ تَطۡمَئِنُّ ٱلۡقُلُوبُ ﴿٢٨﴾", "c5": "فَإِذَا بَلَغۡنَ أَجَلَهُنَّ فَأَمۡسِكُوهُنَّ بِمَعۡرُوفٍ أَوۡ فَارِقُوهُنَّ بِمَعۡرُوفٖ وَأَشۡهِدُواْ ذَوَيۡ عَدۡلٖ مِّنكُمۡ وَأَقِيمُواْ ٱلشَّهَٰدَةَ لِلَّهِۚ ذَٰلِكُمۡ يُوعَظُ بِهِۦ مَن كَانَ يُؤۡمِنُ بِٱللَّهِ وَٱلۡيَوۡمِ ٱلۡأٓخِرِۚ وَمَن يَتَّقِ ٱللَّهَ يَجۡعَل لَّهُۥ مَخۡرَجٗا ﴿٢﴾ وَيَرۡزُقۡهُ مِنۡ حَيۡثُ لَا يَحۡتَسِبُۚ وَمَن يَتَوَكَّلۡ عَلَى ٱللَّهِ فَهُوَ حَسۡبُهُۥٓۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمۡرِهِۦۚ قَدۡ جَعَلَ ٱللَّهُ لِكُلِّ شَيۡءٖ قَدۡرٗا ﴿٣﴾", "c6": "وَٱلَّذِينَ جَٰهَدُواْ فِينَا لَنَهۡدِيَنَّهُمۡ سُبُلَنَاۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلۡمُحۡسِنِينَ ﴿٦٩﴾", "c7": "۞قُلۡ يَٰعِبَادِيَ ٱلَّذِينَ أَسۡرَفُواْ عَلَىٰٓ أَنفُسِهِمۡ لَا تَقۡنَطُواْ مِن رَّحۡمَةِ ٱللَّهِۚ إِنَّ ٱللَّهَ يَغۡفِرُ ٱلذُّنُوبَ جَمِيعًاۚ إِنَّهُۥ هُوَ ٱلۡغَفُورُ ٱلرَّحِيمُ ﴿٥٣﴾", "c8": "فَٱذۡكُرُونِيٓ أَذۡكُرۡكُمۡ وَٱشۡكُرُواْ لِي وَلَا تَكۡفُرُونِ ﴿١٥٢﴾", "c9": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ ٱسۡتَعِينُواْ بِٱلصَّبۡرِ وَٱلصَّلَوٰةِۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ ﴿١٥٣﴾", "c10": "وَلَا تَهِنُواْ وَلَا تَحۡزَنُواْ وَأَنتُمُ ٱلۡأَعۡلَوۡنَ إِن كُنتُم مُّؤۡمِنِينَ ﴿١٣٩﴾", "c11": "قُل لِّلۡمُؤۡمِنِينَ يَغُضُّواْ مِنۡ أَبۡصَٰرِهِمۡ وَيَحۡفَظُواْ فُرُوجَهُمۡۚ ذَٰلِكَ أَزۡكَىٰ لَهُمۡۚ إِنَّ ٱللَّهَ خَبِيرُۢ بِمَا يَصۡنَعُونَ ﴿٣٠﴾", "c12": "يَـٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقۡنَٰكُم مِّن ذَكَرٖ وَأُنثَىٰ وَجَعَلۡنَٰكُمۡ شُعُوبٗا وَقَبَآئِلَ لِتَعَارَفُوٓاْۚ إِنَّ أَكۡرَمَكُمۡ عِندَ ٱللَّهِ أَتۡقَىٰكُمۡۚ إِنَّ ٱللَّهَ عَلِيمٌ خَبِيرٞ ﴿١٣﴾", "c13": "فَبِمَا رَحۡمَةٖ مِّنَ ٱللَّهِ لِنتَ لَهُمۡۖ وَلَوۡ كُنتَ فَظًّا غَلِيظَ ٱلۡقَلۡبِ لَٱنفَضُّواْ مِنۡ حَوۡلِكَۖ فَٱعۡفُ عَنۡهُمۡ وَٱسۡتَغۡفِرۡ لَهُمۡ وَشَاوِرۡهُمۡ فِي ٱلۡأَمۡرِۖ فَإِذَا عَزَمۡتَ فَتَوَكَّلۡ عَلَى ٱللَّهِۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلۡمُتَوَكِّلِينَ ﴿١٥٩﴾", "c14": "ٱدۡعُ إِلَىٰ سَبِيلِ رَبِّكَ بِٱلۡحِكۡمَةِ وَٱلۡمَوۡعِظَةِ ٱلۡحَسَنَةِۖ وَجَٰدِلۡهُم بِٱلَّتِي هِيَ أَحۡسَنُۚ إِنَّ رَبَّكَ هُوَ أَعۡلَمُ بِمَن ضَلَّ عَن سَبِيلِهِۦ وَهُوَ أَعۡلَمُ بِٱلۡمُهۡتَدِينَ ﴿١٢٥﴾", "c15": "وَلَا تَقۡفُ مَا لَيۡسَ لَكَ بِهِۦ عِلۡمٌۚ إِنَّ ٱلسَّمۡعَ وَٱلۡبَصَرَ وَٱلۡفُؤَادَ كُلُّ أُوْلَـٰٓئِكَ كَانَ عَنۡهُ مَسۡـُٔولٗا ﴿٣٦﴾", "c16": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓاْ إِن جَآءَكُمۡ فَاسِقُۢ بِنَبَإٖ فَتَبَيَّنُوٓاْ أَن تُصِيبُواْ قَوۡمَۢا بِجَهَٰلَةٖ فَتُصۡبِحُواْ عَلَىٰ مَا فَعَلۡتُمۡ نَٰدِمِينَ ﴿٦﴾", "c17": "ٱلَّذِينَ يَأۡكُلُونَ ٱلرِّبَوٰاْ لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ ٱلَّذِي يَتَخَبَّطُهُ ٱلشَّيۡطَٰنُ مِنَ ٱلۡمَسِّۚ ذَٰلِكَ بِأَنَّهُمۡ قَالُوٓاْ إِنَّمَا ٱلۡبَيۡعُ مِثۡلُ ٱلرِّبَوٰاْۗ وَأَحَلَّ ٱللَّهُ ٱلۡبَيۡعَ وَحَرَّمَ ٱلرِّبَوٰاْۚ فَمَن جَآءَهُۥ مَوۡعِظَةٞ مِّن رَّبِّهِۦ فَٱنتَهَىٰ فَلَهُۥ مَا سَلَفَ وَأَمۡرُهُۥٓ إِلَى ٱللَّهِۖ وَمَنۡ عَادَ فَأُوْلَـٰٓئِكَ أَصۡحَٰبُ ٱلنَّارِۖ هُمۡ فِيهَا خَٰلِدُونَ ﴿٢٧٥﴾", "c18": "وَيۡلٞ لِّلۡمُطَفِّفِينَ ﴿١﴾ ٱلَّذِينَ إِذَا ٱكۡتَالُواْ عَلَى ٱلنَّاسِ يَسۡتَوۡفُونَ ﴿٢﴾ وَإِذَا كَالُوهُمۡ أَو وَّزَنُوهُمۡ يُخۡسِرُونَ ﴿٣﴾", "c19": "فَإِذَا قُضِيَتِ ٱلصَّلَوٰةُ فَٱنتَشِرُواْ فِي ٱلۡأَرۡضِ وَٱبۡتَغُواْ مِن فَضۡلِ ٱللَّهِ وَٱذۡكُرُواْ ٱللَّهَ كَثِيرٗا لَّعَلَّكُمۡ تُفۡلِحُونَ ﴿١٠﴾", "c20": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ لَا تَأۡكُلُوٓاْ أَمۡوَٰلَكُم بَيۡنَكُم بِٱلۡبَٰطِلِ إِلَّآ أَن تَكُونَ تِجَٰرَةً عَن تَرَاضٖ مِّنكُمۡۚ وَلَا تَقۡتُلُوٓاْ أَنفُسَكُمۡۚ إِنَّ ٱللَّهَ كَانَ بِكُمۡ رَحِيمٗا ﴿٢٩﴾", "c21": "وَٱلَّذِينَ إِذَآ أَنفَقُواْ لَمۡ يُسۡرِفُواْ وَلَمۡ يَقۡتُرُواْ وَكَانَ بَيۡنَ ذَٰلِكَ قَوَامٗا ﴿٦٧﴾", "c22": "وَٱلۡعَصۡرِ ﴿١﴾ إِنَّ ٱلۡإِنسَٰنَ لَفِي خُسۡرٍ ﴿٢﴾ إِلَّا ٱلَّذِينَ ءَامَنُواْ وَعَمِلُواْ ٱلصَّـٰلِحَٰتِ وَتَوَاصَوۡاْ بِٱلۡحَقِّ وَتَوَاصَوۡاْ بِٱلصَّبۡرِ ﴿٣﴾", "c23": "فَتَعَٰلَى ٱللَّهُ ٱلۡمَلِكُ ٱلۡحَقُّۗ وَلَا تَعۡجَلۡ بِٱلۡقُرۡءَانِ مِن قَبۡلِ أَن يُقۡضَىٰٓ إِلَيۡكَ وَحۡيُهُۥۖ وَقُل رَّبِّ زِدۡنِي عِلۡمٗا ﴿١١٤﴾", "c24": "ٱقۡرَأۡ بِٱسۡمِ رَبِّكَ ٱلَّذِي خَلَقَ ﴿١﴾ خَلَقَ ٱلۡإِنسَٰنَ مِنۡ عَلَقٍ ﴿٢﴾", "c25": "أَمَّنۡ هُوَ قَٰنِتٌ ءَانَآءَ ٱلَّيۡلِ سَاجِدٗا وَقَآئِمٗا يَحۡذَرُ ٱلۡأٓخِرَةَ وَيَرۡجُواْ رَحۡمَةَ رَبِّهِۦۗ قُلۡ هَلۡ يَسۡتَوِي ٱلَّذِينَ يَعۡلَمُونَ وَٱلَّذِينَ لَا يَعۡلَمُونَۗ إِنَّمَا يَتَذَكَّرُ أُوْلُواْ ٱلۡأَلۡبَٰبِ ﴿٩﴾", "c26": "كُتِبَ عَلَيۡكُمُ ٱلۡقِتَالُ وَهُوَ كُرۡهٞ لَّكُمۡۖ وَعَسَىٰٓ أَن تَكۡرَهُواْ شَيۡـٔٗا وَهُوَ خَيۡرٞ لَّكُمۡۖ وَعَسَىٰٓ أَن تُحِبُّواْ شَيۡـٔٗا وَهُوَ شَرّٞ لَّكُمۡۚ وَٱللَّهُ يَعۡلَمُ وَأَنتُمۡ لَا تَعۡلَمُونَ ﴿٢١٦﴾", "c27": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ ٱصۡبِرُواْ وَصَابِرُواْ وَرَابِطُواْ وَٱتَّقُواْ ٱللَّهَ لَعَلَّكُمۡ تُفۡلِحُونَ ﴿٢٠٠﴾", "c28": "وَأَطِيعُواْ ٱللَّهَ وَرَسُولَهُۥ وَلَا تَنَٰزَعُواْ فَتَفۡشَلُواْ وَتَذۡهَبَ رِيحُكُمۡۖ وَٱصۡبِرُوٓاْۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ ﴿٤٦﴾", "c29": "وَلَا تُصَعِّرۡ خَدَّكَ لِلنَّاسِ وَلَا تَمۡشِ فِي ٱلۡأَرۡضِ مَرَحًاۖ إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ مُخۡتَالٖ فَخُورٖ ﴿١٨﴾ وَٱقۡصِدۡ فِي مَشۡيِكَ وَٱغۡضُضۡ مِن صَوۡتِكَۚ إِنَّ أَنكَرَ ٱلۡأَصۡوَٰتِ لَصَوۡتُ ٱلۡحَمِيرِ ﴿١٩﴾", "c30": "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌۖ أُجِيبُ دَعۡوَةَ ٱلدَّاعِ إِذَا دَعَانِۖ فَلۡيَسۡتَجِيبُواْ لِي وَلۡيُؤۡمِنُواْ بِي لَعَلَّهُمۡ يَرۡشُدُونَ ﴿١٨٦﴾", "c31": "وَلَقَدۡ خَلَقۡنَا ٱلۡإِنسَٰنَ وَنَعۡلَمُ مَا تُوَسۡوِسُ بِهِۦ نَفۡسُهُۥۖ وَنَحۡنُ أَقۡرَبُ إِلَيۡهِ مِنۡ حَبۡلِ ٱلۡوَرِيدِ ﴿١٦﴾", "c32": "وَلَا تَقُولَنَّ لِشَاْيۡءٍ إِنِّي فَاعِلٞ ذَٰلِكَ غَدًا ﴿٢٣﴾ إِلَّآ أَن يَشَآءَ ٱللَّهُۚ وَٱذۡكُر رَّبَّكَ إِذَا نَسِيتَ وَقُلۡ عَسَىٰٓ أَن يَهۡدِيَنِ رَبِّي لِأَقۡرَبَ مِنۡ هَٰذَا رَشَدٗا ﴿٢٤﴾", "c33": "وَأَن لَّيۡسَ لِلۡإِنسَٰنِ إِلَّا مَا سَعَىٰ ﴿٣٩﴾", "c34": "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ لِمَ تَقُولُونَ مَا لَا تَفۡعَلُونَ ﴿٢﴾ كَبُرَ مَقۡتًا عِندَ ٱللَّهِ أَن تَقُولُواْ مَا لَا تَفۡعَلُونَ ﴿٣﴾", "c35": "ٱلَّذِي خَلَقَ ٱلۡمَوۡتَ وَٱلۡحَيَوٰةَ لِيَبۡلُوَكُمۡ أَيُّكُمۡ أَحۡسَنُ عَمَلٗاۚ وَهُوَ ٱلۡعَزِيزُ ٱلۡغَفُورُ ﴿٢﴾", "c36": "إِنَّ فِي خَلۡقِ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ وَٱخۡتِلَٰفِ ٱلَّيۡلِ وَٱلنَّهَارِ لَأٓيَٰتٖ لِّأُوْلِي ٱلۡأَلۡبَٰبِ ﴿١٩٠﴾ ٱلَّذِينَ يَذۡكُرُونَ ٱللَّهَ قِيَٰمٗا وَقُعُودٗا وَعَلَىٰ جُنُوبِهِمۡ وَيَتَفَكَّرُونَ فِي خَلۡقِ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضِ رَبَّنَا مَا خَلَقۡتَ هَٰذَا بَٰطِلٗا سُبۡحَٰنَكَ فَقِنَا عَذَابَ ٱلنَّارِ ﴿١٩١﴾", "c37": "وَمِنۡهُم مَّن يَقُولُ رَبَّنَآ ءَاتِنَا فِي ٱلدُّنۡيَا حَسَنَةٗ وَفِي ٱلۡأٓخِرَةِ حَسَنَةٗ وَقِنَا عَذَابَ ٱلنَّارِ ﴿٢٠١﴾", "c38": "وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ أَزۡوَٰجٗا لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم مَّوَدَّةٗ وَرَحۡمَةًۚ إِنَّ فِي ذَٰلِكَ لَأٓيَٰتٖ لِّقَوۡمٖ يَتَفَكَّرُونَ ﴿٢١﴾", "c39": "وَإِذۡ تَأَذَّنَ رَبُّكُمۡ لَئِن شَكَرۡتُمۡ لَأَزِيدَنَّكُمۡۖ وَلَئِن كَفَرۡتُمۡ إِنَّ عَذَابِي لَشَدِيدٞ ﴿٧﴾", "c40": "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ﴿٣﴾ وَلَلۡأٓخِرَةُ خَيۡرٞ لَّكَ مِنَ ٱلۡأُولَىٰ ﴿٤﴾ وَلَسَوۡفَ يُعۡطِيكَ رَبُّكَ فَتَرۡضَىٰٓ ﴿٥﴾", "c41": "وَمَا خَلَقۡتُ ٱلۡجِنَّ وَٱلۡإِنسَ إِلَّا لِيَعۡبُدُونِ ﴿٥٦﴾", "c42": "أَفَلَا يَنظُرُونَ إِلَى ٱلۡإِبِلِ كَيۡفَ خُلِقَتۡ ﴿١٧﴾ وَإِلَى ٱلسَّمَآءِ كَيۡفَ رُفِعَتۡ ﴿١٨﴾ وَإِلَى ٱلۡجِبَالِ كَيۡفَ نُصِبَتۡ ﴿١٩﴾ وَإِلَى ٱلۡأَرۡضِ كَيۡفَ سُطِحَتۡ ﴿٢٠﴾", "c43": "أَوَلَمۡ يَرَ ٱلَّذِينَ كَفَرُوٓاْ أَنَّ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَ كَانَتَا رَتۡقٗا فَفَتَقۡنَٰهُمَاۖ وَجَعَلۡنَا مِنَ ٱلۡمَآءِ كُلَّ شَيۡءٍ حَيٍّۚ أَفَلَا يُؤۡمِنُونَ ﴿٣٠﴾", "c44": "وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبۡ لَنَا مِنۡ أَزۡوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعۡيُنٖ وَٱجۡعَلۡنَا لِلۡمُتَّقِينَ إِمَامًا ﴿٧٤﴾", "c45": "وَٱسۡتَعِينُواْ بِٱلصَّبۡرِ وَٱلصَّلَوٰةِۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى ٱلۡخَٰشِعِينَ ﴿٤٥﴾"};
/* ----- Récits & sagesse (pilier Foi) ----- */
/* Récits des prophètes et de la sîra : [id, personnage, titre, récit, leçon, source] */
const FX_RECIT = [
  ['r1', 'Yusuf', '« Pas de reproche contre vous aujourd\'hui »', 'Ses frères l\'avaient jeté dans un puits. Des années plus tard, devenu ministre d\'Égypte, il les voit arriver affamés, à sa merci. Il se fait reconnaître, et ses premiers mots sont : « Pas de reproche contre vous aujourd\'hui. Qu\'Allah vous pardonne. »', 'Le pardon au moment où l\'on a tout pouvoir est la forme la plus haute de la force.', 'Coran 12:92'],
  ['r2', 'Ibrahim', 'Le feu devint fraîcheur', 'Pour avoir brisé les idoles, Ibrahim est jeté dans un immense brasier. Allah ordonne : « Ô feu, sois fraîcheur et salut pour Ibrahim. » Il en ressort indemne.', 'Celui qui se tient à la vérité quand tout le monde s\'y oppose n\'est jamais seul.', 'Coran 21:68-69'],
  ['r3', 'Musa', '« Mon Seigneur est avec moi »', 'Devant eux la mer, derrière eux l\'armée de Pharaon. Ses compagnons s\'écrient : « Nous allons être rattrapés ! » Musa répond : « Jamais ! Mon Seigneur est avec moi, Il va me guider. » La mer s\'ouvre.', 'La certitude parle avant de voir la solution.', 'Coran 26:61-63'],
  ['r4', 'Yunus', 'L\'invocation dans les ténèbres', 'Avalé par le poisson, dans trois ténèbres (la nuit, la mer, le ventre), Yunus invoque : « Il n\'y a de divinité que Toi. Gloire à Toi. J\'ai été parmi les injustes. » Il est sauvé.', 'Le Prophète ﷺ a dit qu\'aucun musulman n\'invoque par ces mots sans être exaucé (Tirmidhi 3505). Reconnaître sa faute ouvre la porte.', 'Coran 21:87-88'],
  ['r5', 'Ayyub', 'La patience d\'Ayyub', 'Il perd ses biens, ses enfants, sa santé, pendant des années. Sa plainte tient en une phrase : « Le mal m\'a touché, et Tu es le plus miséricordieux des miséricordieux. » Allah lui rend tout, et le double.', 'Se plaindre à Allah n\'est pas un manque de patience. Se plaindre d\'Allah, si.', 'Coran 21:83-84'],
  ['r6', 'Le Prophète ﷺ', 'À Taïf', 'Chassé de Taïf à coups de pierres, les pieds en sang, il reçoit la visite de l\'ange des montagnes, prêt à écraser la ville. Il refuse : « J\'espère qu\'Allah fera sortir de leurs descendants des gens qui adoreront Allah seul. »', 'Même blessé, il pense à l\'avenir de ceux qui l\'ont blessé.', 'Bukhari 3231'],
  ['r7', 'Le Prophète ﷺ et Abu Bakr', 'La grotte de Thawr', 'Pendant l\'Hégire, les poursuivants arrivent devant la grotte. Abu Bakr murmure : « S\'ils regardent à leurs pieds, ils nous verront. » Le Prophète ﷺ répond : « Que penses-tu de deux dont Allah est le troisième ? »', 'La peur regarde les pieds de l\'ennemi. La foi regarde plus haut.', 'Bukhari 3653, Coran 9:40'],
  ['r8', 'Le Prophète ﷺ', 'La Pierre noire et le manteau', 'Avant la prophétie, les tribus de La Mecque manquent de s\'entretuer pour l\'honneur de replacer la Pierre noire. Muhammad ﷺ, surnommé « al-Amin », pose la pierre sur un manteau et fait porter chaque coin par un chef de tribu.', 'Une solution où chacun gagne vaut mieux qu\'une victoire. De la négociation de haut niveau.', 'Sîra d\'Ibn Hisham'],
  ['r9', 'Khadija', 'Une femme d\'affaires', 'Khadija dirigeait un commerce prospère entre La Mecque et le Cham. Elle confia une caravane à Muhammad ﷺ, et son honnêteté et ses résultats la convainquirent de lui proposer le mariage.', 'Sa réputation l\'a précédé : l\'honnêteté est le meilleur des CV.', 'Sîra d\'Ibn Hisham'],
  ['r10', 'Sulayman', 'La fourmi qui prévient les siennes', 'Une fourmi voit arriver l\'armée de Sulayman : « Ô fourmis, entrez dans vos demeures, que Sulayman et ses armées ne vous écrasent pas sans s\'en rendre compte. » Sulayman sourit, et remercie Allah.', 'Une fourmi pense à son groupe et excuse d\'avance ceux qui pourraient l\'écraser. Et un roi l\'écoute.', 'Coran 27:18-19'],
  ['r11', 'Nuh', '950 ans', 'Nuh appela son peuple pendant 950 ans, de jour comme de nuit, en public et en privé. Très peu le suivirent. Il ne cessa jamais.', 'On ne juge pas un effort à ses résultats immédiats. On te demande d\'appeler, pas de convaincre.', 'Coran 29:14, 71:5-9'],
  ['r12', 'Maryam', 'Secoue le tronc', 'Seule, épuisée, en plein accouchement, Maryam reçoit cet ordre : « Secoue vers toi le tronc du palmier, il fera tomber sur toi des dattes fraîches. » Une femme épuisée ne peut pas secouer un palmier.', 'Les savants en tirent une leçon : Allah pouvait faire tomber les dattes sans elle, mais Il lui demande un geste. L\'effort, même symbolique, précède le secours.', 'Coran 19:25'],
  ['r13', 'Musa et al-Khidr', 'Ce que tu ne comprends pas encore', 'Al-Khidr perce une barque, tue un garçon, répare un mur sans salaire. Musa proteste à chaque fois. Puis vient l\'explication : chaque acte cachait un bien que Musa ne pouvait pas voir.', 'Ce qui te semble une perte aujourd\'hui peut être une protection. La patience avec ce qu\'on ne comprend pas encore.', 'Coran 18:65-82'],
  ['r14', 'Bilal', '« Ahad, Ahad »', 'Esclave torturé sous une pierre brûlante en plein soleil de La Mecque pour renier sa foi, Bilal ne répétait qu\'un mot : « Ahad, Ahad » (Un, Un). Il devint le premier muezzin de l\'islam.', 'Celui qu\'on voulait écraser est devenu la voix qui appelle à la prière depuis quatorze siècles.', 'Sîra'],
  ['r15', 'Abd ar-Rahman ibn \'Awf', '« Indique-moi le marché »', 'Arrivé à Médine sans rien, on lui propose la moitié des biens d\'un Ansar. Il répond : « Qu\'Allah bénisse tes biens et ta famille. Indique-moi plutôt le marché. » Il devint l\'un des plus riches compagnons, et l\'un des plus généreux.', 'Refuser la facilité pour construire soi-même. L\'esprit d\'entreprise au cœur de la sunna.', 'Bukhari 2048'],
  ['r16', '\'Uthman ibn \'Affan', 'Le puits de Ruma', 'À Médine, un puits appartenait à un homme qui vendait son eau. \'Uthman l\'acheta et le rendit gratuit pour tous les musulmans, après que le Prophète ﷺ eut promis le Paradis à celui qui le ferait.', 'L\'argent bien placé ne dort pas : il sert, et son effet continue après toi (sadaqa jariya).', 'Tirmidhi 3703'],
  ['r17', 'Le Prophète ﷺ', 'Au service des siens', 'On demanda à Aïcha ce que faisait le Prophète ﷺ chez lui. Elle répondit : « Il était au service de sa famille, et quand venait l\'heure de la prière, il sortait prier. »', 'Le plus grand des hommes recousait ses vêtements et aidait à la maison.', 'Bukhari 676'],
  ['r18', 'Le Prophète ﷺ', 'La conquête de La Mecque', 'Il entre victorieux dans la ville qui l\'avait chassé et persécuté, la tête baissée d\'humilité. Face à ses anciens ennemis, la sîra rapporte qu\'il déclara une amnistie générale.', 'Le vrai triomphe se fait sans revanche.', 'Sîra d\'Ibn Hisham']
];
/* Faits du Coran : [id, titre, texte] */
const FX_FAIT = [
  ['f1', 'La seule femme nommée', 'Maryam est la seule femme citée par son nom dans le Coran, plus souvent que dans l\'Évangile, et une sourate entière porte son nom.'],
  ['f2', 'Sans basmala', 'At-Tawba est la seule sourate qui ne commence pas par « Bismillah ». Mais An-Naml en contient deux : au début, et dans la lettre de Sulayman (27:30). Le compte reste à 114.'],
  ['f3', '23 ans', 'Le Coran n\'a pas été révélé d\'un coup, mais par passages, sur environ 23 ans, souvent en réponse à des événements précis.'],
  ['f4', 'Le plus grand verset', 'Le Prophète ﷺ a désigné Ayat al-Kursi (2:255) comme le plus grand verset du Coran (Muslim 810).'],
  ['f5', 'Le plus long verset parle… de contrats', 'Le plus long verset du Coran (2:282) explique comment mettre par écrit une dette, avec des témoins. La mise par écrit des engagements est un ordre divin.'],
  ['f6', 'Un tiers du Coran', 'Le Prophète ﷺ a dit que la sourate Al-Ikhlas équivaut à un tiers du Coran (Bukhari 5013), car elle résume l\'unicité d\'Allah.'],
  ['f7', 'Le prophète le plus cité', 'Musa est le prophète dont le nom revient le plus souvent dans le Coran, plus de 130 fois. Son histoire sert de modèle au Prophète ﷺ face aux épreuves.'],
  ['f8', 'Muhammad, 4 fois', 'Le nom « Muhammad » n\'apparaît que 4 fois dans le Coran, et « Ahmad » une fois. Allah s\'adresse surtout à lui par « Ô Prophète » ou « Ô Messager ».'],
  ['f9', 'De la mémoire au livre', 'Le Coran était mémorisé par des centaines de compagnons. Après la mort de nombreux mémorisateurs, Abu Bakr le fit réunir en un seul recueil ; \'Uthman en fit ensuite diffuser des copies de référence.'],
  ['f10', '17 fois par jour, au minimum', 'Al-Fatiha est récitée au moins 17 fois par jour : une fois par rak\'a des cinq prières obligatoires.'],
  ['f11', '30 parties pour 30 jours', 'Le Coran est divisé en 30 juz\', pour pouvoir le lire en entier en un mois, à raison d\'un juz\' par jour.'],
  ['f12', 'Le premier et le dernier', 'Les premiers versets révélés sont « Lis ! » (96:1-5). Selon Ibn Abbas, le dernier est « Et craignez un jour où vous serez ramenés vers Allah… » (2:281).']
];
/* Paroles de savants : [id, auteur, parole, contexte] */
const FX_SAVANT = [
  ['w1', 'Ibn al-Qayyim', 'Repousse la pensée. Si tu ne le fais pas, elle deviendra une idée. Repousse l\'idée, sinon elle deviendra un désir. Combats le désir, sinon il deviendra une résolution. Si tu ne l\'arrêtes pas, elle deviendra un acte, et si tu ne le compenses pas par son contraire, il deviendra une habitude.', 'Tiré d\'al-Fawa\'id. Il décrit, sept siècles avant les neurosciences, comment une habitude se construit : il est plus facile de couper au début de la chaîne.'],
  ['w2', 'Ibn al-Qayyim', 'Perdre son temps est pire que la mort, car la perte de temps te coupe d\'Allah et de l\'au-delà, tandis que la mort ne te coupe que de ce monde et de ses gens.', 'Al-Fawa\'id. À relire avant de se lancer dans un scroll sans fin.'],
  ['w3', 'Hasan al-Basri', 'Ô fils d\'Adam, tu n\'es qu\'un ensemble de jours. Chaque fois qu\'un jour s\'en va, une partie de toi s\'en va.', 'Grand savant de Bassora, élevé dans la maison d\'Umm Salama, épouse du Prophète ﷺ.'],
  ['w4', '\'Umar ibn al-Khattab', 'Faites votre propre bilan avant qu\'on ne vous le demande, et pesez vos actes avant qu\'ils ne soient pesés.', 'L\'origine du bilan quotidien (muhasaba). Ton bilan d\'hier, sur l\'orbite, en est une forme.'],
  ['w5', '\'Ali ibn Abi Talib', 'Ce monde s\'en va en tournant le dos, et l\'au-delà arrive en faisant face. Chacun a ses enfants : soyez des enfants de l\'au-delà. Aujourd\'hui il y a des actes sans jugement, et demain un jugement sans actes.', 'Rapporté par Al-Bukhari, livre des cœurs attendris (ar-Riqaq).'],
  ['w6', 'Ibn Taymiyya', 'Que peuvent me faire mes ennemis ? Mon paradis et mon jardin sont dans ma poitrine. Ma prison est une retraite, ma mise à mort un martyre, et mon exil un voyage.', 'Dit en prison, où il mourut. Rapporté par son élève Ibn al-Qayyim. La liberté intérieure ne dépend pas des murs.'],
  ['w7', 'Ibn Taymiyya', 'Il y a dans ce monde un paradis : celui qui n\'y entre pas n\'entrera pas au paradis de l\'au-delà.', 'Il parlait de la douceur de la foi et du rappel d\'Allah, que l\'on goûte dès cette vie.'],
  ['w8', 'Yahya ibn Abi Kathir', 'La science ne s\'acquiert pas avec le repos du corps.', 'Cité par l\'imam Muslim dans son Sahih, au milieu des hadiths sur les horaires de prière, comme pour s\'excuser de l\'effort demandé au lecteur.'],
  ['w9', 'Imam Ahmad', 'Avec l\'encrier, jusqu\'à la tombe.', 'Réponse de l\'imam Ahmad, déjà célèbre et âgé, à qui l\'on demandait pourquoi il continuait à étudier. Apprendre ne s\'arrête jamais.'],
  ['w10', 'Al-Ghazali', 'La science sans action est folie, et l\'action sans science est vaine.', 'Tiré de sa lettre « Ô mon enfant » (Ayyuha al-walad), écrite à un élève.'],
  ['w11', 'Sufyan ath-Thawri', 'Je n\'ai jamais rien traité de plus difficile que mon intention, car elle se retourne sans cesse contre moi.', 'Même les plus grands savants devaient renouveler leur intention encore et encore.'],
  ['w12', 'Abdullah ibn al-Mubarak', 'Combien de petites actions deviennent grandes par l\'intention, et combien de grandes actions deviennent petites par l\'intention.', 'Savant, commerçant et combattant, il finançait les études de nombreux savants avec ses bénéfices.'],
  ['w13', '\'Umar ibn \'Abd al-\'Aziz', 'La nuit et le jour agissent sur toi : agis donc en eux.', 'Calife réputé pour sa justice, il réforma l\'État en deux ans et demi seulement.'],
  ['w14', 'Fudayl ibn \'Iyad', 'Délaisser une action à cause des gens, c\'est de l\'ostentation. Agir pour les gens, c\'est de l\'association. La sincérité, c\'est qu\'Allah te préserve des deux.', 'Ancien brigand devenu l\'un des plus grands ascètes, après avoir entendu un verset en escaladant un mur.'],
  ['w15', '\'Abdullah ibn Mas\'ud', 'Je déteste voir un homme oisif, qui ne travaille ni pour ce monde ni pour l\'au-delà.', 'L\'un des plus grands savants du Coran parmi les compagnons.']
];
/* Poèmes classiques : [id, auteur, arabe (vers séparés par |), sens, contexte] */
const FX_POEME = [
  ['o1', 'Imam Ash-Shafi\'i', 'شَكَوْتُ إِلَى وَكِيعٍ سُوءَ حِفْظِي … فَأَرْشَدَنِي إِلَى تَرْكِ المَعَاصِي|وَأَخْبَرَنِي بِأَنَّ العِلْمَ نُورٌ … وَنُورُ اللهِ لَا يُهْدَى لِعَاصِي', 'Je me suis plaint à Waki\' de ma mauvaise mémoire : il m\'a conseillé de délaisser les péchés. Il m\'a appris que la science est une lumière, et que la lumière d\'Allah n\'est pas offerte à celui qui désobéit.', 'Waki\' ibn al-Jarrah était l\'un de ses maîtres. La clarté de l\'esprit est liée à la pureté du cœur.'],
  ['o2', 'Imam Ash-Shafi\'i', 'نَعِيبُ زَمَانَنَا وَالعَيْبُ فِينَا … وَمَا لِزَمَانِنَا عَيْبٌ سِوَانَا', 'Nous accusons notre époque, alors que le défaut est en nous. Notre époque n\'a d\'autre défaut que nous-mêmes.', 'Avant de blâmer les circonstances, regarder ce qu\'on peut changer en soi.'],
  ['o3', 'Imam Ash-Shafi\'i', 'وَلَرُبَّ نَازِلَةٍ يَضِيقُ لَهَا الفَتَى … ذَرْعًا وَعِنْدَ اللهِ مِنْهَا المَخْرَجُ|ضَاقَتْ فَلَمَّا اسْتَحْكَمَتْ حَلَقَاتُهَا … فُرِجَتْ وَكُنْتُ أَظُنُّهَا لَا تُفْرَجُ', 'Que de malheurs face auxquels un jeune homme se sent à bout, alors qu\'auprès d\'Allah se trouve l\'issue. La situation s\'est resserrée, et quand ses anneaux se sont serrés au maximum, elle s\'est dénouée, alors que je la croyais sans issue.', 'Le moment le plus serré précède souvent le déblocage.'],
  ['o4', 'Imam Ash-Shafi\'i', 'دَعِ الأَيَّامَ تَفْعَلُ مَا تَشَاءُ … وَطِبْ نَفْسًا إِذَا حَكَمَ القَضَاءُ', 'Laisse les jours faire ce qu\'ils veulent, et garde l\'âme sereine quand le décret s\'accomplit.', 'Début d\'un de ses poèmes les plus célèbres sur l\'acceptation du destin.'],
  ['o5', 'Imam Ash-Shafi\'i', 'تَغَرَّبْ عَنِ الأَوْطَانِ فِي طَلَبِ العُلَا … وَسَافِرْ فَفِي الأَسْفَارِ خَمْسُ فَوَائِدِ', 'Éloigne-toi de ta terre natale en quête d\'élévation, et voyage : les voyages ont cinq bienfaits.', 'Il les énumère ensuite : chasser le souci, gagner sa vie, la science, les bonnes manières, et la compagnie d\'hommes de valeur.'],
  ['o6', 'Al-Busiri, la Burda', 'وَالنَّفْسُ كَالطِّفْلِ إِنْ تُهْمِلْهُ شَبَّ عَلَى … حُبِّ الرَّضَاعِ وَإِنْ تَفْطِمْهُ يَنْفَطِمِ', 'L\'âme est comme l\'enfant : si tu la laisses faire, elle grandit en aimant la tétée ; mais si tu la sèvres, elle se sèvre.', 'Tiré du poème le plus récité à la louange du Prophète ﷺ (XIIIe siècle). Une habitude n\'est pas une fatalité : l\'âme s\'habitue aussi au sevrage.'],
  ['o7', 'Attribué à \'Ali ibn Abi Talib', 'دَوَاؤُكَ فِيكَ وَمَا تُبْصِرُ … وَدَاؤُكَ مِنْكَ وَمَا تَشْعُرُ', 'Ton remède est en toi, et tu ne le vois pas. Ton mal vient de toi, et tu ne le sens pas.', 'Vers du diwan attribué à \'Ali. L\'attribution est discutée, le sens reste juste.'],
  ['o8', 'Ibn al-Wardi', 'اطْلُبِ العِلْمَ وَلَا تَكْسَلْ فَمَا … أَبْعَدَ الخَيْرَ عَلَى أَهْلِ الكَسَلْ', 'Recherche la science et ne sois pas paresseux : que le bien est loin des gens de la paresse !', 'Tiré de sa Lamiyya, un long poème de conseils à son fils (XIVe siècle).']
];
/* Le Coran invite à observer : [id, référence, sourate, sens, ce qu'on sait aujourd'hui] */
const FX_OBS = [
  ['x1', '23:12-14', 'Al-Mu\'minun', 'Nous avons créé l\'homme d\'un extrait d\'argile, puis Nous en avons fait une goutte dans un reposoir solide, puis Nous avons fait de la goutte une adhérence, de l\'adhérence un morceau de chair, du morceau de chair des os, et Nous avons revêtu les os de chair…', 'L\'embryologie décrit elle aussi un développement par étapes successives. Beaucoup de lecteurs y voient une correspondance ; d\'autres rappellent que le verset parle d\'abord de la puissance créatrice, pas de manuel médical.'],
  ['x2', '78:6-7', 'An-Naba\'', 'N\'avons-Nous pas fait de la terre une couche, et des montagnes des piquets ?', 'Les géologues savent que les montagnes ont des « racines » : la croûte y est plus épaisse et s\'enfonce profondément sous le relief (l\'isostasie). L\'image du piquet reste une invitation à observer, pas une thèse géologique.'],
  ['x3', '24:45', 'An-Nur', 'Et Allah a créé d\'eau tout animal. Certains rampent sur le ventre, d\'autres marchent sur deux pattes, d\'autres sur quatre…', 'Toute vie connue dépend de l\'eau, qui compose la majeure partie des cellules. C\'est pour cela qu\'on cherche d\'abord de l\'eau quand on cherche la vie ailleurs.'],
  ['x4', '51:47', 'Adh-Dhariyat', 'Le ciel, Nous l\'avons construit par Notre puissance, et Nous l\'étendons constamment.', 'Depuis les travaux de Hubble (1929), on sait que l\'univers est en expansion. Des savants anciens comprenaient le verset autrement (« Nous sommes largement capables »). Les deux lectures existent.'],
  ['x5', '55:19-20', 'Ar-Rahman', 'Il a laissé les deux mers se rencontrer ; entre elles, une barrière qu\'elles ne dépassent pas.', 'Là où des eaux de salinité ou de température différentes se rencontrent (comme au détroit de Gibraltar), elles se mélangent très lentement et forment des zones de transition visibles.'],
  ['x6', '36:40', 'Ya-Sin', 'Le soleil ne peut rattraper la lune, ni la nuit devancer le jour ; et chacun vogue dans une orbite.', 'Chaque astre suit une trajectoire précise, calculable des siècles à l\'avance : c\'est ce qui permet de prévoir les éclipses et les horaires de prière.'],
  ['x7', '16:68-69', 'An-Nahl', 'Ton Seigneur a inspiré aux abeilles : « Prenez des demeures dans les montagnes, les arbres et ce que les hommes construisent… » De leur ventre sort une boisson aux couleurs variées, dans laquelle il y a une guérison pour les gens.', 'Le miel a des propriétés antibactériennes reconnues, et des miels médicaux sont utilisés à l\'hôpital pour soigner certaines plaies.'],
  ['x8', '57:25', 'Al-Hadid', '… Et Nous avons fait descendre le fer, dans lequel il y a une force redoutable et des utilités pour les gens…', 'Le fer ne se forme pas sur Terre : il est fabriqué au cœur des étoiles massives et dispersé lors de leur explosion, avant d\'arriver sur les planètes. Le verset emploie le verbe « faire descendre ».']
];
FX_QUIZ.push(
  ['q25', 'Quelle est la seule femme nommée dans le Coran ?', ['Khadija', 'Maryam', 'Asiya'], 1, 'Maryam, qui a même une sourate à son nom.'],
  ['q26', 'Quelle sourate ne commence pas par « Bismillah » ?', ['At-Tawba', 'Al-Fatiha', 'Al-Kahf'], 0, 'At-Tawba. An-Naml, elle, en contient deux.'],
  ['q27', 'Qui a dit « Indique-moi le marché » en arrivant à Médine ?', ['Abu Bakr', 'Abd ar-Rahman ibn \'Awf', 'Bilal'], 1, 'Abd ar-Rahman ibn \'Awf, qui refusa la moitié des biens qu\'on lui offrait pour commercer lui-même.'],
  ['q28', 'Quel prophète est le plus cité dans le Coran ?', ['Ibrahim', 'Isa', 'Musa'], 2, 'Musa, plus de 130 fois.'],
  ['q29', 'Que dit Yunus dans le ventre du poisson ?', ['« Hasbiya Allah »', '« Il n\'y a de divinité que Toi, gloire à Toi, j\'ai été parmi les injustes »', '« Rabbi zidni \'ilma »'], 1, 'L\'invocation de Yunus (21:87), qui ne laisse jamais sans réponse.'],
  ['q30', 'Combien de fois au minimum récites-tu Al-Fatiha par jour ?', ['5', '17', '34'], 1, '17 : une fois par rak\'a des prières obligatoires.']
);
Object.assign(FX_AR, {"x1": "وَلَقَدۡ خَلَقۡنَا ٱلۡإِنسَٰنَ مِن سُلَٰلَةٖ مِّن طِينٖ ﴿١٢﴾ ثُمَّ جَعَلۡنَٰهُ نُطۡفَةٗ فِي قَرَارٖ مَّكِينٖ ﴿١٣﴾ ثُمَّ خَلَقۡنَا ٱلنُّطۡفَةَ عَلَقَةٗ فَخَلَقۡنَا ٱلۡعَلَقَةَ مُضۡغَةٗ فَخَلَقۡنَا ٱلۡمُضۡغَةَ عِظَٰمٗا فَكَسَوۡنَا ٱلۡعِظَٰمَ لَحۡمٗا ثُمَّ أَنشَأۡنَٰهُ خَلۡقًا ءَاخَرَۚ فَتَبَارَكَ ٱللَّهُ أَحۡسَنُ ٱلۡخَٰلِقِينَ ﴿١٤﴾", "x2": "أَلَمۡ نَجۡعَلِ ٱلۡأَرۡضَ مِهَٰدٗا ﴿٦﴾ وَٱلۡجِبَالَ أَوۡتَادٗا ﴿٧﴾", "x3": "وَٱللَّهُ خَلَقَ كُلَّ دَآبَّةٖ مِّن مَّآءٖۖ فَمِنۡهُم مَّن يَمۡشِي عَلَىٰ بَطۡنِهِۦ وَمِنۡهُم مَّن يَمۡشِي عَلَىٰ رِجۡلَيۡنِ وَمِنۡهُم مَّن يَمۡشِي عَلَىٰٓ أَرۡبَعٖۚ يَخۡلُقُ ٱللَّهُ مَا يَشَآءُۚ إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ ﴿٤٥﴾", "x4": "وَٱلسَّمَآءَ بَنَيۡنَٰهَا بِأَيۡيْدٖ وَإِنَّا لَمُوسِعُونَ ﴿٤٧﴾", "x5": "مَرَجَ ٱلۡبَحۡرَيۡنِ يَلۡتَقِيَانِ ﴿١٩﴾ بَيۡنَهُمَا بَرۡزَخٞ لَّا يَبۡغِيَانِ ﴿٢٠﴾", "x6": "لَا ٱلشَّمۡسُ يَنۢبَغِي لَهَآ أَن تُدۡرِكَ ٱلۡقَمَرَ وَلَا ٱلَّيۡلُ سَابِقُ ٱلنَّهَارِۚ وَكُلّٞ فِي فَلَكٖ يَسۡبَحُونَ ﴿٤٠﴾", "x7": "وَأَوۡحَىٰ رَبُّكَ إِلَى ٱلنَّحۡلِ أَنِ ٱتَّخِذِي مِنَ ٱلۡجِبَالِ بُيُوتٗا وَمِنَ ٱلشَّجَرِ وَمِمَّا يَعۡرِشُونَ ﴿٦٨﴾ ثُمَّ كُلِي مِن كُلِّ ٱلثَّمَرَٰتِ فَٱسۡلُكِي سُبُلَ رَبِّكِ ذُلُلٗاۚ يَخۡرُجُ مِنۢ بُطُونِهَا شَرَابٞ مُّخۡتَلِفٌ أَلۡوَٰنُهُۥ فِيهِ شِفَآءٞ لِّلنَّاسِۚ إِنَّ فِي ذَٰلِكَ لَأٓيَةٗ لِّقَوۡمٖ يَتَفَكَّرُونَ ﴿٦٩﴾", "x8": "لَقَدۡ أَرۡسَلۡنَا رُسُلَنَا بِٱلۡبَيِّنَٰتِ وَأَنزَلۡنَا مَعَهُمُ ٱلۡكِتَٰبَ وَٱلۡمِيزَانَ لِيَقُومَ ٱلنَّاسُ بِٱلۡقِسۡطِۖ وَأَنزَلۡنَا ٱلۡحَدِيدَ فِيهِ بَأۡسٞ شَدِيدٞ وَمَنَٰفِعُ لِلنَّاسِ وَلِيَعۡلَمَ ٱللَّهُ مَن يَنصُرُهُۥ وَرُسُلَهُۥ بِٱلۡغَيۡبِۚ إِنَّ ٱللَّهَ قَوِيٌّ عَزِيزٞ ﴿٢٥﴾"});

/* ----- Flux : le fil qui remplace le scroll -----
   Défilement plein écran aimanté, une carte à la fois. 4 piliers équilibrés (foi, business, savoir, psychologie),
   une carte interactive toutes les 4 (quiz, vrai/faux, mot arabe), une carte « pause » toutes les 15.
   Les cartes jamais vues passent en premier ; le business du mois en cours est favorisé. */
const FX_SANTE = [
  ['sa1', 'La lumière du matin', 'Quelques minutes dehors à la lumière du jour, le matin, aident ton horloge interne à se régler : on s\'endort plus facilement le soir.', 'Après Fajr ou au réveil, 10 minutes près d\'une fenêtre ou dehors.'],
  ['sa2', 'Marcher après le repas', 'Une marche de 10 à 15 minutes après un repas réduit le pic de sucre dans le sang et le coup de fatigue qui suit.', 'Après le déjeuner, marche le temps d\'un appel.'],
  ['sa3', 'L\'eau et la concentration', 'Une légère déshydratation suffit à baisser l\'attention et l\'humeur. La fatigue de l\'après-midi est parfois une simple soif.', 'Garde une bouteille d\'eau visible sur ton espace de travail.'],
  ['sa4', 'Expirer plus longtemps', 'Expirer plus longtemps qu\'on inspire active le système nerveux qui calme le corps. Quatre secondes pour inspirer, six pour expirer.', 'Cinq respirations comme ça, avant de tourner une vidéo.'],
  ['sa5', 'Les écrans du soir', 'La lumière des écrans le soir retarde la mélatonine, l\'hormone du sommeil. Se coucher à heure régulière compte autant que la durée.', 'Pose le téléphone loin du lit 30 minutes avant de dormir.'],
  ['sa6', 'Bouger un peu, souvent', 'L\'OMS recommande au moins 150 minutes d\'activité modérée par semaine pour les adultes. Trois séances et un peu de marche suffisent à y arriver.', 'Compte tes minutes de marche aujourd\'hui.'],
  ['sa7', 'Le fer et la fatigue', 'Le manque de fer est fréquent chez les femmes, surtout avec des règles abondantes, et il fatigue. Seule une prise de sang permet de le savoir.', 'Si tu es souvent épuisée, parles-en à ton médecin.'],
  ['sa8', 'La règle 20-20-20', 'Toutes les 20 minutes d\'écran, regarder à 20 pieds (environ 6 mètres) pendant 20 secondes repose les yeux.', 'Pendant ton prochain montage, fais la pause à chaque export.'],
  ['sa9', 'La qaylula', 'La courte sieste de midi, la qaylula, était une habitude des Compagnons. La science confirme qu\'une sieste de 10 à 20 minutes relance la vigilance sans alourdir.', 'Essaie 15 minutes allongée, un minuteur à côté.'],
  ['sa10', 'Le bain chaud du soir', 'Un bain ou une douche chaude une à deux heures avant le coucher aide le corps à baisser sa température ensuite, ce qui favorise l\'endormissement.', 'Garde ton bain de sidr pour le soir du dimanche.']
];
const FX_FOOD = [
  ['fo1', 'Les dattes', 'Le Prophète ﷺ rompait le jeûne avec des dattes fraîches, sinon sèches, sinon de l\'eau (Abu Dawud, Tirmidhi). Elles apportent des fibres, du potassium et une énergie rapide.', 'Deux dattes et un verre d\'eau avant ta séance de sport.'],
  ['fo2', 'Un tiers, un tiers, un tiers', '« Un tiers pour la nourriture, un tiers pour la boisson, un tiers pour la respiration. » (Tirmidhi 2380). Manger sans remplir l\'estomac garde l\'énergie de l\'après-repas.', 'À ton prochain repas, arrête-toi avant d\'être pleine.'],
  ['fo3', 'Légumineuses et céréales', 'Lentilles avec du riz, pois chiches avec du pain, haricots avec de la semoule : ensemble, ils apportent des protéines complètes, sans viande.', 'Prévois un plat lentilles et riz cette semaine.'],
  ['fo4', 'Fer et vitamine C', 'Le fer des végétaux s\'absorbe mal seul. Avec de la vitamine C (citron, kiwi, poivron), il passe beaucoup mieux. Le thé et le café au même moment le freinent.', 'Un filet de citron sur tes lentilles, le thé une heure après.'],
  ['fo5', 'La talbina', 'Aïcha (qu\'Allah l\'agrée) recommandait la talbina, une bouillie d\'orge au lait, et rapportait que le Prophète ﷺ disait qu\'elle apaise le cœur du malade et enlève une part de la tristesse (Bukhari 5417, Muslim 2216).', 'Essaie une talbina un matin : orge, lait, un peu de miel.'],
  ['fo6', 'Le miel', '« De leur ventre sort une boisson aux couleurs variées, dans laquelle il y a une guérison pour les gens. » (Coran 16:69). Des pots de miel retrouvés dans des tombes égyptiennes étaient encore comestibles.', 'Une cuillère de miel dans une tisane plutôt que du sucre.'],
  ['fo7', 'L\'huile d\'olive', '« Mangez de l\'huile d\'olive et enduisez-vous-en, car elle vient d\'un arbre béni. » (Tirmidhi 1851). Le régime méditerranéen, riche en huile d\'olive, est associé à moins de maladies du cœur.', 'Remplace une cuisson au beurre par l\'huile d\'olive.'],
  ['fo8', 'La grenade', 'Citée parmi les fruits des jardins du Paradis (Coran 55:68), la grenade est riche en polyphénols, des antioxydants, et en vitamines C et K.', 'Ajoute des grains de grenade sur une salade ou un yaourt.'],
  ['fo9', 'La nigelle', '« La graine de nigelle est un remède à tout mal, sauf la mort. » (Bukhari 5688, Muslim 2215). Elle s\'utilise en petite quantité, et ne remplace pas un traitement prescrit.', 'Quelques graines sur ton pain ou tes légumes rôtis.'],
  ['fo10', 'Manger lentement', 'Le signal de satiété met une vingtaine de minutes à arriver au cerveau. Manger vite, c\'est souvent manger plus que sa faim.', 'Pose ta fourchette entre deux bouchées pendant un repas.'],
  ['fo11', 'Le fruit entier', 'Un fruit entier nourrit mieux que son jus : les fibres ralentissent le sucre et rassasient. Un verre de jus contient le sucre de plusieurs fruits sans leurs fibres.', 'Remplace un jus par le fruit entier demain.']
];
const FX_ANIMAL = [
  ['an1', 'L\'abeille', 'Une sourate entière porte son nom (An-Nahl, 16:68). Une butineuse produit environ un douzième de cuillère à café de miel dans toute sa vie. Ton pot de miel, c\'est le travail de milliers d\'abeilles.'],
  ['an2', 'La fourmi', 'Dans la sourate An-Naml, une fourmi avertit les autres de l\'arrivée de l\'armée de Sulayman (27:18). Les fourmis communiquent réellement entre elles, par des signaux chimiques appelés phéromones.'],
  ['an3', 'La pieuvre', 'Elle a trois cœurs et un sang bleu : son sang transporte l\'oxygène grâce au cuivre et non au fer comme le nôtre.'],
  ['an4', 'Le corbeau', 'Dans le Coran, un corbeau montre au fils d\'Adam comment enterrer son frère (5:31). Les corbeaux reconnaissent les visages humains et s\'en souviennent pendant des années, selon les études de l\'université de Washington.'],
  ['an5', 'L\'araignée', '« La maison la plus fragile est celle de l\'araignée. » (Coran 29:41). Pourtant, à poids égal, sa soie est plus résistante que l\'acier. C\'est la toile, comme abri, qui est fragile, pas le fil.'],
  ['an6', 'L\'éléphant', 'Une sourate porte son nom (Al-Fil). Les éléphants se reconnaissent dans un miroir, ce que très peu d\'animaux savent faire (Plotnik, 2006).'],
  ['an7', 'La huppe', 'La huppe de Sulayman lui rapporta l\'existence du royaume de Saba (27:20-22). La huppe fasciée migre chaque année d\'Europe vers l\'Afrique pour passer l\'hiver.'],
  ['an8', 'Le chat', 'Le Compagnon Abu Hurayra doit son surnom, « le père du petit chat », à l\'affection qu\'il leur portait. Le ronronnement d\'un chat vibre à des fréquences basses, que certains chercheurs associent à la réparation des os.'],
  ['an9', 'Le dauphin', 'Il dort avec une moitié de cerveau à la fois : l\'autre reste éveillée pour respirer et surveiller.'],
  ['an10', 'Le chameau', '« Ne regardent-ils pas les chameaux, comment ils ont été créés ? » (Coran 88:17). Sa bosse stocke de la graisse, pas de l\'eau, et il peut boire plus de 100 litres en une dizaine de minutes.'],
  ['an11', 'La loutre de mer', 'Pour dormir sans dériver, les loutres de mer se tiennent par la patte à la surface de l\'eau.'],
  ['an12', 'La chienne assoiffée', 'Le Prophète ﷺ raconta qu\'une femme fut pardonnée pour avoir donné à boire à un chien assoiffé (Bukhari 3467, Muslim 2245). La miséricorde envers les animaux compte auprès d\'Allah.'],
  ['an13', 'Le colibri', 'C\'est le seul oiseau capable de voler en arrière, et ses ailes battent des dizaines de fois par seconde.']
];
const FXC = {
  coran: { bg: ['#14402F', '#06110D'], ac: '#E9C46A', lbl: 'Coran', shape: 'star' },
  hadith: { bg: ['#2A2A17', '#080C08'], ac: '#F0D9A0', lbl: 'Hadith', shape: 'orb' },
  biz: { bg: ['#10263A', '#050A10'], ac: '#8CC4FF', lbl: 'Business', shape: 'node' },
  sci: { bg: ['#141C3C', '#04060E'], ac: '#9DB8FF', lbl: 'Science', shape: 'atom' },
  cult: { bg: ['#34230F', '#0B0805'], ac: '#EBB978', lbl: 'Culture', shape: 'spark' },
  psy: { bg: ['#2B1734', '#09050B'], ac: '#D6A8F2', lbl: 'Psychologie', shape: 'ring' },
  quiz: { bg: ['#0F3029', '#040C0A'], ac: '#5ED3A8', lbl: 'Quiz', shape: 'spark' },
  vf: { bg: ['#12302E', '#040C0B'], ac: '#5ED3A8', lbl: 'Vrai ou faux', shape: 'ring' },
  ar: { bg: ['#1C2E14', '#070B05'], ac: '#C9E08A', lbl: 'Arabe du Coran', shape: 'star' },
  me: { bg: ['#123A2E', '#050F0B'], ac: '#E9C46A', lbl: 'Toi', shape: 'orb' },
  pause: { bg: ['#33290E', '#0B0904'], ac: '#F5D98E', lbl: 'Pause', shape: 'orb' },
  recit: { bg: ['#3A2912', '#0C0805'], ac: '#F2C98A', lbl: 'Récit', shape: 'spark' },
  fait: { bg: ['#0F3A33', '#040D0B'], ac: '#7FE0C8', lbl: 'Le savais-tu ?', shape: 'star' },
  savant: { bg: ['#1B2336', '#05070C'], ac: '#E6D3A3', lbl: 'Parole de savant', shape: 'orb' },
  poeme: { bg: ['#381423', '#0C0508'], ac: '#F0B7C4', lbl: 'Poésie', shape: 'star' },
  obs: { bg: ['#0E2E3A', '#03090C'], ac: '#8FD8E8', lbl: 'Le Coran invite à observer', shape: 'atom' },
  psyi: { bg: ['#1E1A3E', '#06050E'], ac: '#C9B8FF', lbl: 'Psychologie islamique', shape: 'ring' },
  sante: { bg: ['#0E2A3A', '#03090D'], ac: '#9CD8F0', lbl: 'Bien-être et santé', shape: 'orb' },
  food: { bg: ['#2E1426', '#0B0509'], ac: '#F59AAE', lbl: 'Alimentation', shape: 'spark' },
  animal: { bg: ['#1C2A16', '#070B05'], ac: '#B8E0A0', lbl: 'Animaux', shape: 'star' }
};
const FX_ALL = {};
FX_CORAN.forEach(([id, ref, sura, fr, ex]) => { FX_ALL[id] = { id, t: 'coran', ref, sura, fr, ex, ar: FX_AR[id] }; });
FX_HADITH.forEach(([id, fr, src, ex]) => { FX_ALL[id] = { id, t: 'hadith', fr, src, ex }; });
FX_BIZ.forEach(([id, book, m, title, text, act]) => { FX_ALL[id] = { id, t: 'biz', book, m, title, text, act }; });
FX_SCI.forEach(([id, cat, title, text]) => { FX_ALL[id] = { id, t: cat, title, text }; });
FX_PSY.forEach(r => { const isl = r.length === 5; const [id, title, text, act] = isl ? [r[0], r[2], r[3], r[4]] : r; FX_ALL[id] = { id, t: isl ? 'psyi' : 'psy', title, text, act }; });
FX_SANTE.forEach(([id, title, text, act]) => { FX_ALL[id] = { id, t: 'sante', title, text: text + (act ? ' ' + act : '') }; });
FX_FOOD.forEach(([id, title, text, act]) => { FX_ALL[id] = { id, t: 'food', title, text: text + (act ? ' ' + act : '') }; });
FX_ANIMAL.forEach(([id, title, text]) => { FX_ALL[id] = { id, t: 'animal', title, text }; });
FX_QUIZ.forEach(([id, q, opts, ok, ex]) => { FX_ALL[id] = { id, t: 'quiz', q, opts, ok, ex }; });
FX_VF.forEach(([id, q, ok, ex]) => { FX_ALL[id] = { id, t: 'vf', q, ok, ex }; });
FX_RECIT.forEach(([id, who, title, text, lesson, src]) => { FX_ALL[id] = { id, t: 'recit', who, title, text, lesson, src }; });
FX_FAIT.forEach(([id, title, text]) => { FX_ALL[id] = { id, t: 'fait', title, text }; });
FX_SAVANT.forEach(([id, by, q, ex]) => { FX_ALL[id] = { id, t: 'savant', by, q, ex }; });
FX_POEME.forEach(([id, by, ar, fr, ex]) => { FX_ALL[id] = { id, t: 'poeme', by, ar, fr, ex }; });
FX_OBS.forEach(([id, ref, sura, fr, sci]) => { FX_ALL[id] = { id, t: 'obs', ref, sura, fr, sci, ar: FX_AR[id] }; });
const FOI_W = [['coran', .24], ['hadith', .18], ['recit', .2], ['savant', .14], ['fait', .1], ['poeme', .07], ['obs', .07]];
function foiType() { let r = Math.random(); for (const [t, w] of FOI_W) { if ((r -= w) < 0) return t; } return 'coran'; }
const FX_POOL = t => Object.values(FX_ALL).filter(c => c.t === t);
const FXS = { n: 0, cards: [], order: [], io: null, cur: null, t0: 0, read: new Set(), tap: 0 };

function fluxDay() { const k = todayISO(); if (S.flux.day.d !== k) S.flux.day = { d: k, n: 0, q: 0, r: 0 }; return S.flux.day; }
function fxPick(type) {
  const inSess = new Set(FXS.cards.map(c => c.id));
  let pool = FX_POOL(type).filter(c => !inSess.has(c.id));
  if (!pool.length) pool = FX_POOL(type);
  const unseen = pool.filter(c => !S.flux.seen[c.id]);
  let cands = unseen.length ? unseen : pool.slice().sort((a, b) => S.flux.seen[a.id] - S.flux.seen[b.id]).slice(0, Math.max(3, Math.ceil(pool.length * .3)));
  return cands[Math.floor(Math.random() * cands.length)];
}
function fxMe() {
  const opts = [], k = todayISO(), sc = faithScore(), ci = cycleInfo();
  opts.push({ title: `${Math.round(sc.pct * 100)} % de régularité`, text: sc.pct >= FAITH_GOAL ? 'Tu tiens ton cap de 90 % sur 30 jours. Ce qui est régulier, même petit, est ce qu\'Allah aime le plus.' : `Il te manque ${sc.need} coche${sc.need > 1 ? 's' : ''} pour atteindre 90 % sur 30 jours.`, go: 'habitudes', btn: 'Ouvrir ma Foi' });
  if (ci && ci.cur) opts.push({ title: 'Tes prières sont en pause', text: 'Ta série ne bouge pas. Une adoration de plus aujourd\'hui : dhikr, istighfar, écouter le Coran ?', go: 'cycle', btn: 'Mes adorations' });
  const f = growth('foi'); if (f.st < 4) opts.push({ title: `Ta Foi · ${GSTAGES[f.st]}`, text: `Encore ${f.next} action${f.next > 1 ? 's' : ''} et elle passe au palier ${GSTAGES[f.st + 1]}.`, go: 'orbite', btn: 'Voir mon jardin' });
  const pts = nourDay(); opts.push({ title: `✦ ${pts} de lumière aujourd'hui`, text: pts >= nourAvg() ? 'Tu es au-dessus de ta moyenne. Continue sur cette lancée.' : `Ta moyenne est de ✦ ${Math.round(nourAvg())}. Il reste de la journée pour allumer quelque chose.`, go: 'orbite', btn: 'Revenir au jardin' });
  const o = opts[Math.floor(Math.random() * opts.length)];
  return { id: 'me' + uid(), t: 'me', ...o };
}
function fxPause() {
  const k = todayISO(), n = needOf(k), dn = dayDone(k);
  let a;
  if (dn < n) a = { text: `Tu as coché ${dn} habitude${dn > 1 ? 's' : ''} de foi sur ${n} aujourd'hui.`, go: 'habitudes', btn: 'Ouvrir mes habitudes' };
  else if (inPeriod(k) && Object.keys(S.cycle.ad[k] || {}).length < 3) a = { text: 'Une adoration, maintenant ? Quelques minutes de dhikr valent mieux que dix minutes de scroll.', go: 'cycle', btn: 'Mes adorations' };
  else a = { text: 'Tout est fait pour aujourd\'hui. Pose le téléphone, marche 10 minutes ou appelle quelqu\'un que tu aimes.', go: 'orbite', btn: 'Retour au jardin' };
  return { id: 'pz' + uid(), t: 'pause', ...a };
}
function fxNext() {
  FXS.n++;
  const i = FXS.n;
  if (i % 15 === 0) return fxPause();
  if (i % 4 === 0) { const r = Math.random(); if (r < .25) { const w = Math.floor(Math.random() * WORDS.length); return { id: 'ar' + w + '-' + uid(), t: 'ar', w }; } return fxPick(r < .65 ? 'quiz' : 'vf'); }
  if (i % 11 === 0) return fxMe();
  if (!FXS.order.length) FXS.order = ['foi', 'foi', 'biz', 'savoir', 'psy', 'soin', 'animal'].sort(() => Math.random() - .5);
  const p = FXS.order.shift();
  if (p === 'foi') return fxPick(foiType());
  if (p === 'savoir') return fxPick(Math.random() < .5 ? 'sci' : 'cult');
  if (p === 'psy') return fxPick(Math.random() < .5 ? 'psy' : 'psyi');
  if (p === 'soin') return fxPick(Math.random() < .5 ? 'sante' : 'food');
  return fxPick(p);
}
/* Éléments flottants, positions déterministes par carte */
function fxFloat(c) {
  const conf = FXC[c.t]; let seed = [...c.id].reduce((a, ch) => a + ch.charCodeAt(0) * 7, 13);
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const SH = {
    star: '<svg viewBox="-10 -10 20 20"><rect x="-6" y="-6" width="12" height="12"/><rect x="-6" y="-6" width="12" height="12" transform="rotate(45)"/></svg>',
    orb: '<i class="orb"></i>',
    node: '<svg viewBox="-10 -10 20 20"><circle r="2.2"/><path d="M0 0L8 -5M0 0L-6 7"/><circle cx="8" cy="-5" r="1.4"/><circle cx="-6" cy="7" r="1.4"/></svg>',
    atom: '<svg viewBox="-10 -10 20 20"><circle r="1.8"/><ellipse rx="8.5" ry="3.2"/><ellipse rx="8.5" ry="3.2" transform="rotate(60)"/><ellipse rx="8.5" ry="3.2" transform="rotate(-60)"/></svg>',
    spark: '<svg viewBox="-10 -10 20 20"><path d="M0-9C.8-2 2-.8 9 0 2 .8.8 2 0 9-.8 2-2 .8-9 0-2-.8-.8-2 0-9Z"/></svg>',
    ring: '<svg viewBox="-10 -10 20 20"><circle r="8"/><circle r="4.5"/></svg>'
  };
  let h = '';
  for (let k = 0; k < 9; k++) {
    const s = 14 + rnd() * 46, x = rnd() * 100, y = rnd() * 100, d = 14 + rnd() * 16, dl = -rnd() * 20, o = .1 + rnd() * .22, dx = (rnd() - .5) * 60, dy = -20 - rnd() * 50, rot = (rnd() - .5) * 180;
    h += `<span style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${s.toFixed(0)}px;height:${s.toFixed(0)}px;opacity:${o.toFixed(2)};--dx:${dx.toFixed(0)}px;--dy:${dy.toFixed(0)}px;--r:${rot.toFixed(0)}deg;animation-duration:${d.toFixed(1)}s;animation-delay:${dl.toFixed(1)}s">${SH[conf.shape]}</span>`;
  }
  return `<div class="fl" aria-hidden="true">${h}</div>`;
}
const fxWords = (txt, base = 0, cap = 36) => esc(txt).split(/(\s+)/).map((w, i) => /^\s+$/.test(w) ? w : `<span class="fw" style="--i:${Math.min(cap, base + i / 2)}">${w}</span>`).join('');
function fxCard(c) {
  const conf = FXC[c.t], saved = S.flux.saved.includes(c.id), savable = !['me', 'pause', 'ar'].includes(c.t) && !/^(me|pz)/.test(c.id);
  let body = '';
  if (c.t === 'coran') {
    const len = (c.ar || '').length, sz = len > 330 ? 's' : len > 180 ? 'm' : 'l';
    body = `<p class="fk">Coran · ${esc(c.sura)} ${c.ref}</p>
      <p class="far ${sz}" lang="ar" dir="rtl">${fxWords(c.ar || '', 0, 30)}</p>
      <p class="ffr">${fxWords(c.fr, 8)}</p>
      <button class="fexp" data-fexp>Comprendre</button><div class="fex"><p>${esc(c.ex)}</p></div>
      <p class="fnote">Sens rendu en français, pas une traduction officielle.</p>`;
  } else if (c.t === 'hadith') {
    body = `<p class="fk">Hadith</p><p class="fq">« ${fxWords(c.fr)} »</p><p class="fsrc">${esc(c.src)}</p>
      <button class="fexp" data-fexp>Méditer</button><div class="fex"><p>${esc(c.ex)}</p></div>`;
  } else if (c.t === 'recit') {
    body = `<p class="fk">Récit · ${esc(c.who)}</p><h2 class="ft">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p>
      <div class="fdo"><small>Leçon</small>${esc(c.lesson)}</div><p class="fsrc">${esc(c.src)}</p>`;
  } else if (c.t === 'fait') {
    body = `<p class="fk">Le savais-tu ? · Coran</p><h2 class="ft big">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p>`;
  } else if (c.t === 'savant') {
    body = `<p class="fk">Parole de savant</p><p class="fq">« ${fxWords(c.q)} »</p><p class="fsrc">${esc(c.by)}</p>
      <button class="fexp" data-fexp>Contexte</button><div class="fex"><p>${esc(c.ex)}</p></div>`;
  } else if (c.t === 'poeme') {
    body = `<p class="fk">Poésie · ${esc(c.by)}</p><div class="fpoem" lang="ar" dir="rtl">${c.ar.split('|').map(l => `<p>${l.split(' … ').map(h => `<span>${fxWords(h, 0, 20)}</span>`).join('')}</p>`).join('')}</div>
      <p class="ffr">${fxWords(c.fr, 6)}</p><button class="fexp" data-fexp>Contexte</button><div class="fex"><p>${esc(c.ex)}</p></div>`;
  } else if (c.t === 'obs') {
    const len = (c.ar || '').length, sz = len > 330 ? 's' : len > 180 ? 'm' : 'l';
    body = `<p class="fk">Le Coran invite à observer · ${esc(c.sura)} ${c.ref}</p><p class="far ${sz}" lang="ar" dir="rtl">${fxWords(c.ar || '', 0, 30)}</p>
      <p class="ffr">${fxWords(c.fr, 8)}</p><div class="fdo"><small>Ce qu'on sait aujourd'hui</small>${esc(c.sci)}</div>
      <p class="fnote">Le Coran est un livre de guidance : ces rapprochements sont des pistes de réflexion, pas des preuves.</p>`;
  } else if (c.t === 'biz') {
    body = `<p class="fk">Business · ${esc(c.book)}${c.m ? ` · mois ${c.m}` : ''}</p><h2 class="ft">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p>
      <div class="fdo"><small>À faire</small>${esc(c.act)}</div>`;
  } else if (c.t === 'sci' || c.t === 'cult' || c.t === 'sante' || c.t === 'food' || c.t === 'animal') {
    body = `<p class="fk">${conf.lbl}</p><h2 class="ft big">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p>`;
  } else if (c.t === 'psy' || c.t === 'psyi') {
    body = `<p class="fk">Psychologie humaine</p><h2 class="ft">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p><div class="fdo"><small>Observe</small>${esc(c.act)}</div>`;
  } else if (c.t === 'quiz') {
    body = `<p class="fk">Quiz</p><h2 class="ft">${fxWords(c.q)}</h2><div class="fopts">${c.opts.map((o, i) => `<button class="fopt" data-fq="${i}">${esc(o)}</button>`).join('')}</div><div class="fans"></div>`;
  } else if (c.t === 'vf') {
    body = `<p class="fk">Vrai ou faux ?</p><h2 class="ft">${fxWords(c.q)}</h2><div class="fvf"><button class="fopt" data-fv="1">Vrai</button><button class="fopt" data-fv="0">Faux</button></div><div class="fans"></div>`;
  } else if (c.t === 'ar') {
    const w = WORDS[c.w], sc = Math.min(3, S.words[c.w] || 0);
    body = `<p class="fk">Arabe du Coran · ${sc}/3</p><p class="farw" lang="ar" dir="rtl">${w[0]}</p><p class="fb" style="text-align:center">Tu connais le sens de ce mot ?</p>
      <div class="fans ar" hidden><p class="ft" style="text-align:center">${esc(w[1])}</p><p class="fb" style="text-align:center">Racine <span lang="ar" dir="rtl" style="font-family:var(--ar);font-size:1.3em">${w[2]}</span></p></div>
      <div class="fvf" data-fars><button class="fopt" data-far="reveal">Révéler</button></div>`;
  } else if (c.t === 'me') {
    body = `<p class="fk">Toi</p><h2 class="ft">${fxWords(c.title)}</h2><p class="fb">${esc(c.text)}</p><button class="btn" data-goto="${c.go}" style="margin-top:22px">${c.btn}</button>`;
  } else if (c.t === 'pause') {
    body = `<p class="fk">Pause · ${FXS.n} cartes</p><h2 class="ft big">${fxWords('Ton esprit est nourri. Et maintenant ?')}</h2><p class="fb">${esc(c.text)}</p>
      <button class="btn block" data-goto="${c.go}" style="margin-top:22px">${c.btn}</button><button class="btn block fcont" data-fnext style="margin-top:10px">Continuer le fil</button>`;
  }
  return `<article class="fc fc-${c.t}" data-fid="${c.id}" style="--bg1:${conf.bg[0]};--bg2:${conf.bg[1]};--ac:${conf.ac}">
    ${fxFloat(c)}<div class="fcin">${body}</div>
    ${savable ? `<div class="frail"><button data-fsave aria-pressed="${saved}" aria-label="Garder">${ICON.fstar}<span>${saved ? 'Gardé' : 'Garder'}</span></button><button data-fcopy aria-label="Copier">${ICON.fcopy}<span>Copier</span></button></div>` : ''}
  </article>`;
}
function vFlux() {
  FXS.n = 0; FXS.cards = []; FXS.order = []; FXS.read = new Set();
  for (let i = 0; i < 6; i++) FXS.cards.push(fxNext());
  const first = !S.flux.used;
  return `<div class="feed" id="feed">${FXS.cards.map(fxCard).join('')}</div>
    <div class="fhead"><div><p class="fh-t">Flux</p><div class="fprog" id="fprog">${Array.from({ length: 15 }, () => '<i></i>').join('')}</div></div>
      <div class="row" style="gap:2px"><button class="icon-btn" data-fsaved aria-label="Mes cartes gardées">${ICON.fstar}</button><button class="icon-btn" data-goto="orbite" aria-label="Fermer">${ICON.fclose}</button></div></div>
    ${first ? '<div class="fhint" id="fhint"><span>Glisse vers le haut</span><small>Touche deux fois une carte pour la garder</small></div>' : ''}`;
}
function fxCardOf(el) { return FXS.cards.find(c => c.id === el.dataset.fid); }
function bindFlux() {
  const feed = $('#feed'); if (!feed) return;
  if (FXS.io) FXS.io.disconnect();
  FXS.io = new IntersectionObserver(ents => ents.forEach(en => {
    const el = en.target;
    if (en.isIntersecting && en.intersectionRatio >= .6) {
      el.classList.add('in'); FXS.cur = el; FXS.t0 = performance.now();
      const c = fxCardOf(el); if (c && FX_ALL[c.id]) { S.flux.seen[c.id] = Date.now(); }
      const idx = [...feed.children].indexOf(el);
      $$('#fprog i').forEach((b, k) => b.classList.toggle('on', k <= (idx % 15)));
      if (idx >= feed.children.length - 3) fxAppend(5);
      if (idx > 0) { const h = $('#fhint'); if (h) { h.remove(); S.flux.used = true; } }
    } else if (!en.isIntersecting || en.intersectionRatio < .3) {
      if (el === FXS.cur && performance.now() - FXS.t0 > 2500 && !FXS.read.has(el.dataset.fid)) fxRead(el.dataset.fid);
      el.classList.remove('in');
    }
  }), { root: feed, threshold: [0, .3, .6] });
  [...feed.children].forEach(el => FXS.io.observe(el));
}
function fxAppend(n) {
  const feed = $('#feed'); if (!feed) return;
  for (let i = 0; i < n; i++) { const c = fxNext(); FXS.cards.push(c); feed.insertAdjacentHTML('beforeend', fxCard(c)); FXS.io.observe(feed.lastElementChild); }
}
function fxRead(id) {
  FXS.read.add(id); const d = fluxDay(); d.n++; save();
  if (d.n === 5 && !d.r) { d.r = 1; lastPt = { x: innerWidth / 2, y: innerHeight * .3 }; reward(3, { noBonus: true, msg: ['Rituel du jour', '5 cartes pour nourrir ton esprit plutôt que le vider.'] }); }
}
function fxSave(el) {
  const art = el.closest('.fc'), id = art.dataset.fid; if (!FX_ALL[id]) return;
  const i = S.flux.saved.indexOf(id), b = $('[data-fsave]', art);
  if (i >= 0) { S.flux.saved.splice(i, 1); if (b) { b.setAttribute('aria-pressed', 'false'); $('span', b).textContent = 'Garder'; } toast('Retiré de tes cartes'); }
  else { S.flux.saved.push(id); if (b) { b.setAttribute('aria-pressed', 'true'); $('span', b).textContent = 'Gardé'; } burst(14, '✦', false); chime(false); haptic(); }
  save();
}
function fxText(c) {
  if (c.t === 'coran') return `${c.ar}\n\n${c.fr}\n— Coran, ${c.sura} ${c.ref}`;
  if (c.t === 'hadith') return `« ${c.fr} »\n— ${c.src}`;
  if (c.t === 'quiz' || c.t === 'vf') return `${c.q}\n${c.ex}`;
  if (c.t === 'savant') return `« ${c.q} »\n— ${c.by}`;
  if (c.t === 'poeme') return `${c.ar.replace(/\|/g, '\n')}\n\n${c.fr}\n— ${c.by}`;
  if (c.t === 'obs') return `${c.ar}\n\n${c.fr}\n— Coran, ${c.sura} ${c.ref}\n\n${c.sci}`;
  if (c.t === 'recit') return `${c.title}\n\n${c.text}\n\n${c.lesson}\n— ${c.src}`;
  return `${c.title}\n\n${c.text}${c.book ? `\n— ${c.book}` : ''}`;
}
function openSaved() {
  const list = S.flux.saved.map(id => FX_ALL[id]).filter(Boolean).reverse();
  $('#ideasBody').innerHTML = `<div class="grab"></div><div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Gardées</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    ${list.length ? list.map(c => `<div class="idea"><p><span class="eyebrow" style="display:block;margin-bottom:4px">${FXC[c.t].lbl}${c.ref ? ' · ' + c.ref : c.src ? ' · ' + esc(c.src) : c.book ? ' · ' + esc(c.book) : c.by ? ' · ' + esc(c.by) : ''}</span>${esc(c.title || c.fr || c.q)}${c.text ? `<time>${esc(c.text)}</time>` : c.ex && c.t !== 'coran' && c.t !== 'hadith' ? '' : ''}</p><button class="icon-btn" data-funsave="${c.id}" aria-label="Retirer"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`).join('') : '<p class="empty">Touche deux fois une carte, ou ✦, pour la garder ici.</p>'}`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal();
}
function fxAnswer(btn) {
  const art = btn.closest('.fc'), c = fxCardOf(art); if (!c || art.dataset.done) return;
  art.dataset.done = '1';
  const ok = c.t === 'quiz' ? Number(btn.dataset.fq) === c.ok : (btn.dataset.fv === '1') === c.ok;
  $$('.fopt', art).forEach(b => { const good = c.t === 'quiz' ? Number(b.dataset.fq) === c.ok : (b.dataset.fv === '1') === c.ok; b.classList.add(good ? 'good' : b === btn ? 'bad' : 'dim'); b.disabled = true; });
  const ans = $('.fans', art); ans.innerHTML = `<p class="fres">${ok ? 'Bien vu.' : 'Raté.'}</p><p class="fb">${esc(c.ex)}</p>`; ans.classList.add('on');
  if (ok) { const d = fluxDay(); if (d.q < 6) { d.q++; reward(1, { noBonus: true }); } else { haptic(); burst(10, '', false); } }
  else if (!reduceMotion()) btn.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(0)' }], { duration: 280 });
}
function fxArabic(btn) {
  const art = btn.closest('.fc'), c = fxCardOf(art); if (!c) return;
  const act = btn.dataset.far;
  if (act === 'reveal') { $('.fans', art).hidden = false; $('.fans', art).classList.add('on'); $('[data-fars]', art).innerHTML = '<button class="fopt" data-far="knew">Je savais</button><button class="fopt" data-far="again">À revoir</button>'; return; }
  const knew = act === 'knew';
  S.words[c.w] = knew ? (S.words[c.w] || 0) + 1 : Math.max(0, (S.words[c.w] || 0) - 1); save();
  $('[data-fars]', art).innerHTML = `<p class="fres" style="width:100%;text-align:center">${knew ? `Maîtrise ${Math.min(3, S.words[c.w])}/3` : 'Il reviendra bientôt.'}</p>`;
  if (knew) { if (S.words[c.w] === 3) reward(2, { msg: ['Mot maîtrisé', `${WORDS[c.w][0]} · ${WORDS[c.w][1]}`] }); else { const d = fluxDay(); if (d.q < 6) { d.q++; reward(1, { noBonus: true }); } } }
}

/* =====================================================================
   13. RÉGLAGES, SAUVEGARDE, IMPORT
   ===================================================================== */
function getPath(o, p) { return p.split('.').reduce((a, k) => (a == null ? a : a[k]), o); }
function setPath(o, p, v) { const ks = p.split('.'), last = ks.pop(); ks.reduce((a, k) => (a[k] = a[k] || {}), o)[last] = v; }
const numCell = (path, label, unit, ph = '') => `<div class="cell"><label for="set-${path}">${label}</label><input class="r" type="text" inputmode="decimal" id="set-${path}" data-set="${path}" value="${esc(String(getPath(S.settings, path) ?? '').replace('.', ','))}" placeholder="${ph}"><span class="unit">${unit}</span></div>`;
function openSettings() {
  const backup = S.lastExport ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(S.lastExport)) : 'jamais';
  $('#settingsBody').innerHTML = `<div class="grab"></div>
    <div class="sheet-top"><span style="width:60px"></span><h2 id="settingsTitle">Réglages</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    <p class="gt">Sauvegarde</p>
    <div class="group">
      <button class="cell tap" data-export><span class="lbl">Exporter mes données</span><span class="small muted">${backup}</span>${ICON.chev}</button>
      <button class="cell tap" id="importBtn"><span class="lbl">Importer une sauvegarde</span>${ICON.chev}</button>
    </div>
    <p class="hint">Tout reste sur ce téléphone, y compris ton cycle. Exporte une fois par semaine et range le fichier dans Fichiers ou iCloud Drive. <span id="persistInfo"></span></p>
    <div id="importConfirm"></div>
    <p class="gt">Prières</p>
    <div class="group"><button class="cell tap" data-fsetup><span class="lbl">Habitudes et horaires de la mosquée</span>${ICON.chev}</button></div>
    <p class="gt">Tes retours</p>
    <p class="hint" style="margin-top:0">Tu es la première à tester cette app. Note chaque chose qui gêne ou chaque idée dans Idées (l'ampoule en haut), en commençant par « Faille : » ou « Idée : ».</p>
    <p class="hint" style="margin-top:30px;text-align:center">Zia · v2.0 · fonctionne hors ligne</p>`;
  $('#settingsSheet').showModal();
  if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(p => { const el = $('#persistInfo'); if (el && p) el.textContent = 'Stockage protégé contre le nettoyage automatique.'; }).catch(() => {});
}
async function exportData() {
  const payload = { app: 'zia', version: 1, exportedAt: new Date().toISOString(), data: S };
  const ok = await deliverFile(`zia-${todayISO()}.json`, JSON.stringify(payload, null, 2), 'application/json');
  if (ok) { S.lastExport = Date.now(); save(true); toast('Sauvegarde exportée'); if (tab === 'argent') render(); if ($('#settingsSheet').open) openSettings(); }
}
let pendingImport = null;
function handleImport(text) {
  let j; try { j = JSON.parse(text); } catch (e) { showImport(null, 'Ce fichier n\'est pas un JSON lisible.'); return; }
  if (j && j.app === 'zia' && j.data) {
    const d = normalize(j.data); pendingImport = { mode: 'replace', data: d };
    showImport(`Sauvegarde du ${new Date(j.exportedAt).toLocaleDateString('fr-FR')} : ${Object.keys(d.faith.log).length} jours de foi, ${d.cycle.periods.length} cycles, ${d.ideas.length} idées. Elle remplacera les données actuelles.`);
  } else if (j && typeof j === 'object' && ('checks' in j || 'days' in j) && 'start' in j) {
    pendingImport = { mode: 'prepa', data: j };
    showImport(`Données de « Prépa Sayko » : ${Object.keys(j.checks || {}).length} acquis cochés, ${Object.keys(j.days || {}).length} jours de routine. Elles seront ajoutées à tes données actuelles (tes heures ne sont pas touchées).`);
  } else showImport(null, "Format non reconnu. Si c'est un export de l'ancienne Sayko de poche, garde ce fichier : la conversion sera ajoutée quand ton PC sera relié.");
}
function showImport(msg, err) {
  const el = $('#importConfirm'); if (!el) return;
  el.innerHTML = err ? `<div class="alert danger">${ICON.warn}<span>${esc(err)}</span></div>`
    : `<div class="confirm"><p class="small">${esc(msg)}</p><div class="row" style="margin-top:12px"><button class="btn sm grow" id="impYes">Importer</button><button class="btn sm quiet" id="impNo">Annuler</button></div></div>`;
}
async function applyImport() {
  if (!pendingImport) return;
  const before = JSON.parse(JSON.stringify(S));
  try { await idbSet('backup-before-import', before); } catch (e) {}
  if (pendingImport.mode === 'replace') S = pendingImport.data;
  else {
    const j = pendingImport.data;
    Object.assign(S.checks, j.checks || {});
    Object.keys(j.notes || {}).forEach(k => { if (j.notes[k] && !S.notes[k]) S.notes[k] = j.notes[k]; });
    Object.assign(S.days, j.days || {});
    Object.keys(j.words || {}).forEach(k => { S.words[k] = Math.max(S.words[k] || 0, j.words[k] || 0); });
    Object.keys(j.sourates || {}).forEach(k => { const name = OLD_SOURATES[Number(k)]; if (name && j.sourates[k]) S.sourates[name] = true; });
    if (j.tajwid) S.tajwid = { done: Math.max(S.tajwid.done, j.tajwid.done || 0), total: S.tajwid.total || j.tajwid.total || 0 };
    if (j.start) S.start = j.start;
  }
  pendingImport = null; save(true);
  $('#settingsSheet').close(); H.form = null; P.sel = null; render();
  toast('Import terminé', 'Annuler', () => { S = normalize(before); save(true); render(); }, 8000);
}

/* =====================================================================
   14. IDÉES
   ===================================================================== */
function openIdeas() {
  const list = S.ideas.slice().sort((a, b) => b.created - a.created);
  $('#ideasBody').innerHTML = `<div class="grab"></div>
    <div class="sheet-top"><span style="width:60px"></span><h2 id="ideasTitle">Idées</h2><button class="link-btn" data-close style="text-align:right">OK</button></div>
    <textarea id="ideaText" placeholder="Note une idée, tu la trieras plus tard…" style="min-height:90px"></textarea>
    <div class="row" style="margin-top:10px"><button class="btn grow" id="ideaAdd">Ajouter</button>${list.length ? '<button class="btn quiet" id="ideaCopy">Tout copier</button>' : ''}</div>
    <div style="margin-top:18px">${list.map(i => `<div class="idea"><p>${esc(i.text)}<time>${new Date(i.created).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</time></p><button class="icon-btn" data-idel="${i.id}" aria-label="Supprimer cette idée"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`).join('') || '<p class="empty">Aucune idée pour l\'instant.</p>'}</div>`;
  const d = $('#ideasSheet'); if (!d.open) d.showModal();
}

/* =====================================================================
   ZIA · ALPHABET — lire avant de comprendre
   Niveau 1 : les 28 lettres seules · Niveau 2 : leurs formes dans le mot
   Niveau 3 : les voyelles courtes. Une lettre est acquise après 3 bonnes
   réponses ; 22 lettres acquises ouvrent le niveau suivant.
   ===================================================================== */
const LETTERS = [
  ['ا', 'Alif', 'أَلِف', 'a', 'Le « â » long, ou le support d\'une voyelle. Ne s\'attache jamais à la lettre qui suit.', 1],
  ['ب', 'Ba', 'بَاء', 'b', 'Comme le « b » français. Un point en dessous.'],
  ['ت', 'Ta', 'تَاء', 't', 'Comme le « t » français. Deux points au-dessus.'],
  ['ث', 'Tha', 'ثَاء', 'th', 'Le « th » anglais de « think », langue entre les dents. Trois points.'],
  ['ج', 'Jim', 'جِيم', 'dj', 'Comme « dj » dans « djinn ». Un point dans le creux.'],
  ['ح', 'Ḥa', 'حَاء', 'ḥ', 'Un « h » soufflé du milieu de la gorge, comme pour embuer une vitre. Sans point.'],
  ['خ', 'Kha', 'خَاء', 'kh', 'Comme la « jota » espagnole. Un point au-dessus.'],
  ['د', 'Dal', 'دَال', 'd', 'Comme le « d » français. Ne s\'attache pas à la lettre qui suit.', 1],
  ['ذ', 'Dhal', 'ذَال', 'dh', 'Le « th » anglais de « this ». Un point au-dessus.', 1],
  ['ر', 'Ra', 'رَاء', 'r', 'Un « r » roulé du bout de la langue. Ne s\'attache pas à la lettre qui suit.', 1],
  ['ز', 'Zay', 'زَاي', 'z', 'Comme le « z » français. Un point au-dessus.', 1],
  ['س', 'Sin', 'سِين', 's', 'Comme le « s » français. Trois petites dents.'],
  ['ش', 'Shin', 'شِين', 'ch', 'Comme « ch » dans « chat ». Trois points au-dessus.'],
  ['ص', 'Ṣad', 'صَاد', 'ṣ', 'Un « s » emphatique : la langue s\'abaisse, le son devient plus grave.'],
  ['ض', 'Ḍad', 'ضَاد', 'ḍ', 'Un « d » emphatique, propre à l\'arabe. Un point au-dessus.'],
  ['ط', 'Ṭa', 'طَاء', 'ṭ', 'Un « t » emphatique, plus grave.'],
  ['ظ', 'Ẓa', 'ظَاء', 'ẓ', 'Un « dh » emphatique. Un point au-dessus.'],
  ['ع', 'ʿAyn', 'عَيْن', 'ʿ', 'Un son serré au fond de la gorge, sans équivalent en français. À écouter plusieurs fois.'],
  ['غ', 'Ghayn', 'غَيْن', 'gh', 'Comme le « r » français grasseyé. Un point au-dessus.'],
  ['ف', 'Fa', 'فَاء', 'f', 'Comme le « f » français. Un point au-dessus.'],
  ['ق', 'Qaf', 'قَاف', 'q', 'Un « k » prononcé tout au fond de la gorge. Deux points.'],
  ['ك', 'Kaf', 'كَاف', 'k', 'Comme le « k » français.'],
  ['ل', 'Lam', 'لَام', 'l', 'Comme le « l » français.'],
  ['م', 'Mim', 'مِيم', 'm', 'Comme le « m » français.'],
  ['ن', 'Nun', 'نُون', 'n', 'Comme le « n » français. Un point au-dessus.'],
  ['ه', 'Ha', 'هَاء', 'h', 'Un « h » léger, simplement expiré.'],
  ['و', 'Waw', 'وَاو', 'w', 'Le « w » de « wagon », ou un « ou » long. Ne s\'attache pas à la lettre qui suit.', 1],
  ['ي', 'Ya', 'يَاء', 'y', 'Le « y » de « yaourt », ou un « i » long. Deux points en dessous.']
];
const LGROUPS = [[1, 2, 3, 24, 27], [4, 5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20], [21, 22]];
const ALV = [
  { k: 1, t: 'Les lettres', s: 'Reconnaître chacune des 28 lettres' },
  { k: 2, t: 'Dans le mot', s: 'Ses formes au début, au milieu, à la fin' },
  { k: 3, t: 'Les voyelles', s: 'a, i, ou : tes premières syllabes' },
  { k: 4, t: 'Lire des mots', s: 'Voyelles longues et premiers mots du Coran' }
];
const RWORDS = [['اللَّه', 'Allāh', 'Allah'], ['رَبّ', 'rabb', 'Seigneur'], ['كِتَاب', 'kitāb', 'livre'], ['قَلْب', 'qalb', 'cœur'], ['نُور', 'nūr', 'lumière'], ['رَحْمَة', 'raḥma', 'miséricorde'], ['سَلَام', 'salām', 'paix'], ['جَنَّة', 'janna', 'jardin, paradis'], ['نَار', 'nār', 'feu'], ['يَوْم', 'yawm', 'jour'], ['عِلْم', 'ʿilm', 'savoir'], ['صَبْر', 'ṣabr', 'patience'], ['حَقّ', 'ḥaqq', 'vérité'], ['أَرْض', 'arḍ', 'terre'], ['سَمَاء', 'samāʾ', 'ciel'], ['عَبْد', 'ʿabd', 'serviteur'], ['دِين', 'dīn', 'religion'], ['نَاس', 'nās', 'les gens'], ['رَسُول', 'rasūl', 'messager'], ['بَيْت', 'bayt', 'maison'], ['مَاء', 'māʾ', 'eau'], ['شَمْس', 'shams', 'soleil'], ['قَمَر', 'qamar', 'lune'], ['شُكْر', 'shukr', 'gratitude'], ['ذِكْر', 'dhikr', 'rappel, évocation'], ['صَلَاة', 'ṣalāh', 'prière'], ['هُدًى', 'hudā', 'guidée'], ['رُمَّان', 'rummān', 'grenade'], ['نَخْل', 'nakhl', 'palmiers'], ['قَلَم', 'qalam', 'calame']];
const alGoal = lv => lv === 4 ? 20 : AL_GOAL;
const VOW = [['َ', 'a', 'fatḥa'], ['ِ', 'i', 'kasra'], ['ُ', 'ou', 'ḍamma']];
const AL_GOAL = 22;
const FORM_LBL = ['Seule', 'Au début', 'Au milieu', 'À la fin'];
let AV = (() => { try { return localStorage.getItem('zia-ar-view') || 'lettres'; } catch (e) { return 'lettres'; } })();
const AL = { lv: 1, open: null, q: null, ok: 0, n: 0 };
function alif() { if (!S.alif || typeof S.alif !== 'object') S.alif = { 1: {}, 2: {}, 3: {}, 4: {} }; [1, 2, 3, 4].forEach(l => { if (!S.alif[l]) S.alif[l] = {}; }); return S.alif; }
const alPool = lv => lv === 4 ? RWORDS.map((_, i) => i) : LETTERS.map((_, i) => i).filter(i => lv !== 3 || i !== 0);
const alScore = (lv, i) => Math.min(3, alif()[lv][i] || 0);
const alKnown = lv => alPool(lv).filter(i => alScore(lv, i) >= 3).length;
const alOpen = lv => lv === 1 || alKnown(lv - 1) >= alGoal(lv - 1);
const alPoints = () => [1, 2, 3, 4].reduce((m, l) => m + alPool(l).reduce((a, i) => a + alScore(l, i), 0), 0);
function formsOf(i) { const [c, , , , , nc] = LETTERS[i]; return nc ? [c, c, 'ـ' + c, 'ـ' + c] : [c, c + 'ـ', 'ـ' + c + 'ـ', 'ـ' + c]; }
const syl = (i, v) => (LETTERS[i][3] === 'ʿ' ? 'ʿ' : LETTERS[i][3]) + VOW[v][1];
function sayAr(txt) {
  try {
    if (!('speechSynthesis' in window)) { toast('La lecture à voix haute n\'est pas disponible sur cet appareil.'); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(txt); u.lang = 'ar-SA'; u.rate = .75;
    const v = speechSynthesis.getVoices().find(x => /^ar/i.test(x.lang)); if (v) u.voice = v;
    speechSynthesis.speak(u);
  } catch (e) {}
}
function alNext() {
  const lv = AL.lv, pool = alPool(lv), prev = AL.q && AL.q.i;
  const w = pool.map(i => { const s = alScore(lv, i); return s >= 3 ? .35 : 4 - s; });
  let r = Math.random() * w.reduce((a, b) => a + b, 0), k = 0; for (; k < pool.length; k++) { r -= w[k]; if (r <= 0) break; }
  let i = pool[Math.min(k, pool.length - 1)]; if (i === prev && pool.length > 1) i = pool[(pool.indexOf(i) + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length];
  const g = LGROUPS.find(x => x.includes(i)) || [], near = g.filter(x => x !== i && pool.includes(x)).sort(() => Math.random() - .5).slice(0, 2);
  const others = pool.filter(x => x !== i && !near.includes(x)).sort(() => Math.random() - .5);
  if (lv === 4) {
    const d = pool.filter(x => x !== i).sort(() => Math.random() - .5).slice(0, 3);
    AL.q = { lv, i, shown: RWORDS[i][0], opts: [i, ...d].sort(() => Math.random() - .5).map(x => ({ t: RWORDS[x][1], ok: x === i })), answered: false };
    drawLQ(); return;
  }
  if (lv === 3) {
    const v = Math.floor(Math.random() * 3), o = (near[0] != null ? near[0] : others[0]);
    const opts = [0, 1, 2].map(x => ({ t: syl(i, x), ok: x === v })).concat([{ t: syl(o, v), ok: false }]).sort(() => Math.random() - .5);
    AL.q = { lv, i, v, shown: LETTERS[i][0] + VOW[v][0], opts, answered: false };
  } else {
    const d = near.concat(others).slice(0, 3), f = lv === 2 ? 1 + Math.floor(Math.random() * 3) : 0;
    const opts = [i, ...d].sort(() => Math.random() - .5).map(x => ({ t: `${LETTERS[x][1]} · ${LETTERS[x][3]}`, ok: x === i }));
    AL.q = { lv, i, f, shown: formsOf(i)[f], opts, answered: false };
  }
  drawLQ();
}
function drawLQ() {
  const el = $('#lquiz'); if (!el) return;
  if (!AL.q || AL.q.lv !== AL.lv) { alNext(); return; }
  const q = AL.q, sc = alScore(q.lv, q.i);
  el.innerHTML = `<p class="small muted" style="margin:0">${q.lv === 4 ? 'Comment se lit ce mot ?' : q.lv === 3 ? 'Comment se lit cette syllabe ?' : q.lv === 2 ? `Quelle lettre, écrite ${FORM_LBL[q.f].toLowerCase()} d'un mot ?` : 'Quelle est cette lettre ?'}</p>
    <div class="word" lang="ar">${q.shown}</div>
    <div class="opts">${q.opts.map((o, k) => `<button class="opt" data-la="${k}">${esc(o.t)}</button>`).join('')}</div>
    <div class="quiz-foot"><span class="num">Session ${AL.ok}/${AL.n}</span>
      <span class="mastery" aria-label="Maîtrise : ${sc} sur 3">${[0, 1, 2].map(k => `<i class="${k < sc ? 'on' : ''}"></i>`).join('')}</span>
      <span id="lnext" style="min-width:96px;text-align:right"></span></div>
    <p class="small ltip" id="ltip"></p>`;
}
function alAnswer(btn) {
  const q = AL.q; if (!q || q.answered) return; q.answered = true;
  const o = q.opts[Number(btn.dataset.la)], lv = q.lv, sc = alif()[lv], before = alKnown(lv);
  AL.n++;
  if (o.ok) { AL.ok++; sc[q.i] = Math.min(3, (sc[q.i] || 0) + 1); haptic(); }
  else sc[q.i] = Math.max(0, (sc[q.i] || 0) - 1);
  save();
  $$('#lquiz .opt').forEach((b, k) => { b.classList.add(q.opts[k].ok ? 'good' : b === btn ? 'bad' : 'dim'); b.disabled = true; });
  if (!o.ok && !reduceMotion()) btn.classList.add('shake');
  const s = alScore(lv, q.i); $$('#lquiz .mastery i').forEach((x, k) => x.classList.toggle('on', k < s));
  const L = lv === 4 ? ['', '', RWORDS[q.i][0]] : LETTERS[q.i];
  if (lv === 4) $('#ltip').innerHTML = `<b lang="ar" class="ar" style="font-size:1.35rem">${q.shown}</b> se lit « ${RWORDS[q.i][1]} » et veut dire « ${RWORDS[q.i][2]} ». <button class="link-btn small" data-lsay="${esc(q.shown)}">Écouter</button>`;
  else $('#ltip').innerHTML = `<b lang="ar" class="ar" style="font-size:1.35rem">${q.shown}</b> ${lv === 3 ? `se lit « ${syl(q.i, q.v)} » : ${L[1]} avec une ${VOW[q.v][2]}.` : `c'est ${L[1]} (${L[3]}). ${esc(L[4])}`} <button class="link-btn small" data-lsay="${esc(lv === 3 ? q.shown : L[2])}">Écouter</button>`;
  $('#lnext').innerHTML = '<button class="btn sm" data-lgo>Suivant</button>';
  const g = $('#lgrid'); if (g) g.innerHTML = alGrid();
  const p = $('#lprog'); if (p) p.innerHTML = alProg();
  if (o.ok && s === 3 && (sc[q.i] === 3)) {
    const after = alKnown(lv);
    const g = alGoal(lv), MSG = { 1: ['Palier 2 ouvert', 'Tu reconnais les lettres. Voyons comment elles changent dans un mot.'], 2: ['Palier 3 ouvert', 'Tu lis les lettres dans un mot. Place aux voyelles : tes premières syllabes.'], 3: ['Palier 4 ouvert', 'Celui qui lit le Coran avec difficulté a une double récompense.', 'Bukhari 4937, Muslim 798'], 4: ['Le sens s\'ouvre', 'Tu sais lire des mots. L\'onglet « Mots du Coran » est ouvert : place à leur sens.'] };
    if (before < g && after >= g) reward(12, { big: true, msg: MSG[lv] });
    else reward(2, { msg: lv === 4 ? ['Mot lu', `${RWORDS[q.i][0]} · ${RWORDS[q.i][1]}`] : ['Lettre acquise', `${L[0]} · ${L[1]}`] });
  }
  if (o.ok && (lv === 1 || lv === 2)) sayAr(L[2]); else if (o.ok) sayAr(q.shown);
}
function alGrid() {
  if (AL.lv === 4) return RWORDS.map((w, i) => { const s = alScore(4, i); return `<button class="ltile lw s${s} ${AL.open === i ? 'sel' : ''}" data-lt="${i}" aria-label="${w[1]} : ${s} sur 3"><span lang="ar">${w[0]}</span></button>`; }).join('');
  return LETTERS.map((L, i) => { const off = AL.lv === 3 && i === 0, s = off ? 0 : alScore(AL.lv, i);
    return `<button class="ltile s${s} ${AL.open === i ? 'sel' : ''} ${off ? 'off' : ''}" data-lt="${i}" aria-label="${L[1]} : ${s} sur 3"><span lang="ar">${L[0]}</span></button>`; }).join('');
}
function alProg() { const n = alKnown(AL.lv), t = alPool(AL.lv).length, g = alGoal(AL.lv); return `<div class="row between"><span class="small"><b class="num" style="font:400 1.6rem var(--serif);color:var(--mint)">${n}</b><span class="muted"> / ${t} ${AL.lv === 4 ? 'mots lus' : 'acquises'}</span></span><span class="small muted">${n >= g ? 'Palier suivant ouvert' : `Palier suivant à ${g}`}</span></div><div class="bar" style="margin-top:8px"><i style="width:${n / t * 100}%;background:var(--mint)"></i></div>`; }
function alCard(i) {
  if (AL.lv === 4) { const w = RWORDS[i]; return `<div class="lcard"><div class="row between" style="align-items:flex-start"><p class="lbig" lang="ar" style="font-size:3rem">${w[0]}</p><div style="flex:1;margin-left:14px"><h3 style="margin:10px 0 0">${w[1]}</h3><p class="small" style="margin:4px 0 0">${alScore(4, i) >= 3 ? `Sens : ${w[2]}` : 'Le sens s\'affiche quand tu sais lire le mot.'}</p></div><button class="icon-btn" data-lclose aria-label="Fermer">${delX}</button></div><button class="btn sm" data-lsay="${esc(w[0])}" style="margin-top:12px">Écouter</button></div>`; }
  const L = LETTERS[i], f = formsOf(i);
  return `<div class="lcard"><div class="row between" style="align-items:flex-start"><div><p class="lbig" lang="ar">${L[0]}</p></div>
      <div style="flex:1;margin-left:14px"><h3 style="margin:6px 0 0">${L[1]} <span class="ar" lang="ar" style="font-size:1.3rem;color:var(--muted)">${L[2]}</span></h3><p class="small" style="margin:4px 0 0">${esc(L[4])}</p></div>
      <button class="icon-btn" data-lclose aria-label="Fermer"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="lforms">${f.map((x, k) => `<div><span lang="ar">${x}</span><small>${FORM_LBL[k]}</small></div>`).join('')}</div>
    ${i ? `<div class="lsyl">${VOW.map((v, k) => `<button data-lsay="${L[0] + v[0]}"><span lang="ar">${L[0] + v[0]}</span><small>${syl(i, k)}</small></button>`).join('')}</div>` : ''}
    <button class="btn sm" data-lsay="${esc(L[2])}" style="margin-top:12px">Écouter son nom</button></div>`;
}
function vLettres() {
  alif(); if (!alOpen(AL.lv)) AL.lv = 1;
  return `<div class="lvls">${ALV.map(l => { const op = alOpen(l.k); return `<button data-alv="${l.k}" aria-pressed="${AL.lv === l.k}" ${op ? '' : 'disabled'}><b>${op ? l.k : '·'} ${l.t}</b><small>${op ? l.s : `Après ${alGoal(l.k - 1)} ${l.k - 1 === 4 ? 'mots' : 'acquis'} au palier ${l.k - 1}`}</small></button>`; }).join('')}</div>
  ${AL.lv === 4 ? '<p class="small ltip4">ا après une fatḥa allonge le « a » (ā), و après une ḍamma donne « ū », ي après une kasra donne « ī ». La chadda ّ double la lettre.</p>' : ''}
  <div id="lprog" style="margin-top:16px">${alProg()}</div>
  <div class="lgrid ${AL.lv === 4 ? 'words' : ''}" id="lgrid" dir="rtl">${alGrid()}</div>
  <p class="hint" style="margin-top:8px">Touche une lettre pour voir ses formes et l'écouter.</p>
  ${AL.open != null ? alCard(AL.open) : ''}
  <section style="margin-top:22px"><div class="quiz"><div class="qcard" id="lquiz" aria-live="polite"></div></div>
  <p class="hint">Les lettres que tu connais le moins reviennent plus souvent.</p></section>`;
}
function alifClick(t) {
  const c = s => t.closest(s); let el;
  if ((el = c('[data-arv]'))) { AV = el.dataset.arv; try { localStorage.setItem('zia-ar-view', AV); } catch (e) {} render(); return true; }
  if ((el = c('[data-alv]'))) { AL.lv = Number(el.dataset.alv); AL.q = null; AL.open = null; render(); return true; }
  if ((el = c('[data-lt]'))) { const i = Number(el.dataset.lt); if (AL.lv === 3 && i === 0) return true; AL.open = AL.open === i ? null : i; render(); if (AL.open != null) { sayAr(AL.lv === 4 ? RWORDS[i][0] : LETTERS[i][2]); setTimeout(() => { const k = $('.lcard'); k && k.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'nearest' }); }, 40); } return true; }
  if (c('[data-lclose]')) { AL.open = null; render(); return true; }
  if ((el = c('[data-lsay]'))) { sayAr(el.dataset.lsay); return true; }
  if ((el = c('[data-la]'))) { alAnswer(el); return true; }
  if (c('[data-lgo]')) { alNext(); const k = $('#lquiz'); if (k && !reduceMotion()) { k.classList.remove('in'); void k.offsetWidth; k.classList.add('in'); } return true; }
  return false;
}

/* =====================================================================
   ZIA · MODULES — Corps, Routine du soir, Reset du dimanche, Hizya, Apprendre
   Toutes les données dans S.z (normalizeZ).
   ===================================================================== */
function defaultZ() {
  return {
    corps: { sessions: [], food: {} },
    routine: { items: [['tel', 'Poser le téléphone loin du lit', 1], ['demain', 'Préparer demain : tenue, sac, 3 priorités', 5], ['range', 'Ranger un coin', 5], ['soin', 'Soin du soir : visage, cheveux', 3], ['bilan', 'Noter une chose réussie aujourd\'hui', 1]], log: {}, notes: {} },
    reset: { w: {} },
    hizya: { videos: [], stories: {}, subs: [], product: [['p1', 'Idée claire du produit'], ['p2', 'Fabrication ou fournisseur trouvé'], ['p3', 'Premier échantillon'], ['p4', 'Prix et marge calculés'], ['p5', 'Photos et présentation'], ['p6', 'Page de vente prête'], ['p7', 'Lancement']].map(([id, t]) => ({ id, t, done: false })), sales: [], notes: [], goal: 2000, wk: 3 },
    biz: { done: {}, notes: {}, study: {} }
  };
}
function normalizeZ(z) {
  const d = defaultZ(); z = z && typeof z === 'object' ? z : {};
  const o = {};
  Object.keys(d).forEach(k => { o[k] = Object.assign({}, d[k], z[k] && typeof z[k] === 'object' ? z[k] : {}); });
  if (!Array.isArray(o.corps.sessions)) o.corps.sessions = [];
  if (!Array.isArray(o.routine.items) || !o.routine.items.length) o.routine.items = d.routine.items;
  ['videos', 'subs', 'sales', 'notes', 'product'].forEach(k => { if (!Array.isArray(o.hizya[k])) o.hizya[k] = d.hizya[k]; });
  return o;
}
const Z = () => (S.z = S.z || defaultZ());
const weekStart = (d = new Date()) => { const x = new Date(d); const w = (x.getDay() + 6) % 7; x.setDate(x.getDate() - w); return iso(x); };
const inWeek = k => k >= weekStart() && k <= todayISO();
const delX = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
function ring(p, big, small, col = 'gold') {
  return `<div class="zring"><svg viewBox="-60 -60 120 120"><circle r="50" fill="none" stroke="var(--raise)" stroke-width="7"/><circle r="50" fill="none" stroke="var(--${col})" stroke-width="7" stroke-linecap="round" transform="rotate(-90)" ${ringDash(50, p)} style="transition:stroke-dashoffset .6s var(--ease)"/></svg><div><b>${big}</b><span>${small}</span></div></div>`;
}

/* ----- Corps : à la maison, sans matériel, pour l'énergie ----- */
const CPH = [
  { k: 'eveil', n: 'Éveil', from: 0, min: 20, s: 'Réveiller le corps en douceur' },
  { k: 'elan', n: 'Élan', from: 12, min: 25, s: 'Plus de répétitions, plus de souffle' },
  { k: 'rayonne', n: 'Rayonne', from: 30, min: 30, s: 'Des séances complètes, pleines d\'énergie' }
];
const WARM = ['Échauffement', '3 min', 'Marche sur place, cercles des bras et des hanches.'];
const COOL = ['Étirements', '3 min', 'Cuisses, dos, épaules. Respire lentement.'];
const CPROG = {
  eveil: [[['Squats', '3 × 8', 'Pieds largeur d\'épaules, descends comme pour t\'asseoir.'], ['Pompes contre un mur', '3 × 8', 'Corps droit, mains à hauteur d\'épaules.'], ['Pont fessier', '3 × 10', 'Allongée, pieds au sol, monte le bassin.'], ['Gainage sur les genoux', '3 × 15 s', 'Coudes sous les épaules, ventre rentré.']],
    [['Fentes arrière, main au mur', '3 × 6 par jambe', 'Le genou arrière descend vers le sol.'], ['Superman au sol', '3 × 8', 'Sur le ventre, lève bras et jambes 2 secondes.'], ['Montées de genoux', '3 × 20 s', 'Sur place, à ton rythme.'], ['Chaise contre le mur', '3 × 15 s', 'Dos au mur, cuisses presque parallèles au sol.']]],
  elan: [[['Squats', '3 × 12', 'Descends lentement, remonte plus vite.'], ['Pompes sur les genoux', '3 × 8', 'Poitrine vers le sol, coudes à 45°.'], ['Pont fessier', '3 × 15', 'Serre les fessiers en haut une seconde.'], ['Gainage', '3 × 20 s', 'Sur les avant-bras et les pointes de pieds, ou les genoux.'], ['Jumping jacks', '3 × 30 s', 'Version sans saut si besoin : un pas de côté.']],
    [['Fentes arrière', '3 × 10 par jambe', 'Buste droit.'], ['Pompes, mains sur une chaise stable', '3 × 10', 'Plus la surface est haute, plus c\'est facile.'], ['Bird-dog', '3 × 8 par côté', 'À quatre pattes, bras et jambe opposés.'], ['Mountain climbers', '3 × 20 s', 'Mains au sol, genoux vers la poitrine.'], ['Chaise contre le mur', '3 × 30 s', 'Respire, tiens.']]],
  rayonne: [[['Squats lents', '3 × 15', '3 secondes pour descendre.'], ['Pompes sur les genoux', '3 × 12', 'Ou quelques pompes complètes.'], ['Fentes marchées', '3 × 12', 'Dans le couloir ou sur place.'], ['Gainage', '3 × 30 s', 'Corps aligné.'], ['Burpees sans saut', '3 × 8', 'Descends, pieds en arrière, reviens, relève-toi.']],
    [['Squat sumo', '3 × 15', 'Pieds écartés, pointes vers l\'extérieur.'], ['Dips sur une chaise', '3 × 10', 'Chaise stable, contre un mur.'], ['Pont fessier sur une jambe', '3 × 10 par jambe', 'Le bassin reste droit.'], ['Gainage latéral', '3 × 20 s par côté', 'Sur l\'avant-bras, genoux au sol si besoin.'], ['Jumping jacks', '3 × 45 s', 'Termine fort.']]]
};
const CSOFT = [['Marche tranquille', '15 min', 'Dehors si possible.'], ['Chat-vache', '1 min', 'À quatre pattes, arrondis puis creuse le dos.'], ['Posture de l\'enfant', '1 min', 'Assise sur les talons, bras devant, front au sol.'], ['Étirement des cuisses', '1 min', 'Assise, jambes tendues, penche-toi doucement.'], ['Respiration lente', '3 min', '4 secondes pour inspirer, 6 pour expirer.']];
const FOOD = [['eau', 'Boire environ 1,5 L d\'eau'], ['prot', 'Des protéines à chaque repas : légumineuses, œufs, laitages, tofu, poisson si tu en manges'], ['fer', 'Du fer avec de la vitamine C (lentilles et citron, épinards et poivron…)'], ['fl', 'Des fruits et légumes variés, au moins 5 portions']];
const CZ = { soft: false, done: {} };
const cSessions = () => Z().corps.sessions;
const cPhase = () => { const n = cSessions().length; return CPH.slice().reverse().find(p => n >= p.from); };
const cWeek = () => cSessions().filter(s => inWeek(s.date)).length;
function vCorpsZ() {
  const ph = cPhase(), ni = CPH.indexOf(ph), next = CPH[ni + 1], n = cSessions().length, wk = cWeek(), k = todayISO();
  const doneToday = cSessions().some(s => s.date === k), per = inPeriod(k);
  const tpl = CPROG[ph.k][n % 2], list = CZ.soft ? CSOFT : [WARM, ...tpl, COOL];
  const fd = Z().corps.food[k] || {}, fn = FOOD.filter(f => fd[f[0]]).length;
  return `${pageHead('Corps', 'Chez toi, sans matériel. Pour l\'énergie.', 'corpsz')}
  <div class="zhero">${ring(wk / 3, `${wk}<small>/3</small>`, 'séances cette semaine', 'mint')}
    <div class="zph">${CPH.map((p, i) => `<div class="${i < ni ? 'ok' : i === ni ? 'cur' : ''}"><b>${p.n}</b><span>${i < ni ? 'Acquis' : i === ni ? (next ? `${n - p.from}/${next.from - p.from} séances` : `${n} séances`) : `dès ${p.from} séances`}</span></div>`).join('')}</div></div>
  <section>
    <div class="row between" style="align-items:baseline"><h2 style="margin:0">${doneToday ? 'Séance faite aujourd\'hui' : CZ.soft ? 'Séance douce' : `Séance ${n % 2 ? 'B' : 'A'} · ${ph.n}`}</h2><span class="small muted">${CZ.soft ? '20 min' : `${ph.min} min`}</span></div>
    ${per ? `<p class="small" style="margin:6px 0 0;color:var(--rose)">Pendant tes règles, écoute ton corps : la séance douce compte tout autant.</p>` : ''}
    <div class="seg" style="margin-top:12px"><button data-csoft="0" aria-pressed="${!CZ.soft}"><span class="dot"></span>Séance du jour</button><button data-csoft="1" aria-pressed="${CZ.soft}"><span class="dot"></span>Séance douce</button></div>
    <div class="checks" style="margin-top:10px">${list.map((e, i) => `<label class="check"><input type="checkbox" data-cex="${i}" ${CZ.done[i] ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${e[0]} <b class="num" style="color:var(--gold)">${e[1]}</b><span class="small muted" style="display:block">${e[2]}</span></span></label>`).join('')}</div>
    <button class="btn" data-csdone style="margin-top:14px;width:100%" ${doneToday ? 'disabled' : ''}>${doneToday ? 'Bravo, repose-toi' : 'Séance terminée'}</button>
    <p class="hint">${wk >= 3 ? 'Tes 3 séances de la semaine sont faites. Le reste, c\'est du bonus.' : 'Laisse un jour de repos entre deux séances si tu peux.'}</p>
  </section>
  <section>
    <div class="row between" style="align-items:baseline"><h2 style="margin:0">L'énergie dans l'assiette</h2><span class="small muted num">${fn} / ${FOOD.length}</span></div>
    <div class="checks" style="margin-top:8px">${FOOD.map(([id, t]) => checkbox('fd-' + id, esc(t), 'data-cfood', !!fd[id])).join('')}</div>
    <p class="hint">Sans viande, pense au fer et aux protéines à chaque repas. Les cartes Alimentation du Flux t'en donnent des idées.</p>
  </section>`;
}

/* ----- Routine du soir : 15 minutes ----- */
const RZ = { t: 0, end: 0 };
const rItems = () => Z().routine.items;
const rDone = k => { const l = Z().routine.log[k] || {}; return rItems().filter(i => l[i[0]]).length; };
const rFull = k => rDone(k) >= rItems().length;
function rStreak() { let n = 0; for (let i = rFull(todayISO()) ? 0 : 1; i < 400; i++) { if (rFull(iso(addDays(new Date(), -i)))) n++; else break; } return n; }
function vRoutineZ() {
  const k = todayISO(), l = Z().routine.log[k] || {}, n = rDone(k), t = rItems().length, st = rStreak();
  const mins = rItems().reduce((m, i) => m + (Number(i[2]) || 0), 0);
  const left = RZ.end ? Math.max(0, RZ.end - Date.now()) : 0;
  const days = Array.from({ length: 14 }, (_, i) => iso(addDays(new Date(), i - 13)));
  return `${pageHead('Routine', 'Ton quart d\'heure du soir, pour finir la journée en douceur.', 'routinez')}
  <div class="zhero">${ring(t ? n / t : 0, `${n}<small>/${t}</small>`, n === t ? 'soirée bouclée' : 'ce soir')}
    <div class="zside"><p class="num" style="font:400 2.4rem/1 var(--serif);color:var(--gold);margin:0">${st}</p><p class="small muted" style="margin:4px 0 12px">soir${st > 1 ? 's' : ''} d'affilée</p>
    <button class="btn sm" data-rtimer id="rtimer">${left ? `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}` : `Minuteur ${mins} min`}</button></div></div>
  <div class="zdays">${days.map(d => `<i class="${rFull(d) ? 'on' : rDone(d) ? 'half' : ''} ${d === k ? 'today' : ''}" title="${d}"></i>`).join('')}</div>
  <div class="checks" style="margin-top:14px">${rItems().map(([id, txt, m]) => `<label class="check"><input type="checkbox" data-rit="${id}" ${l[id] ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${esc(txt)} <span class="small muted">· ${m} min</span></span></label>`).join('')}</div>
  <div class="srow" style="margin-top:12px"><input id="rNote" value="${esc(Z().routine.notes[k] || '')}" placeholder="Ma réussite du jour, en une phrase" style="flex:1"></div>
  <details class="adv" style="margin-top:14px"><summary>Modifier ma routine</summary>
    ${rItems().map(([id, txt, m]) => `<div class="srow"><input data-redit="${id}" value="${esc(txt)}" style="flex:1" aria-label="Étape"><input data-rmin="${id}" value="${m}" inputmode="numeric" style="width:54px;text-align:center" aria-label="Minutes"><button class="icon-btn" data-rdel="${id}" aria-label="Supprimer">${delX}</button></div>`).join('')}
    <div class="srow"><input id="rNew" placeholder="Nouvelle étape" style="flex:1"><button class="btn sm" data-radd>Ajouter</button></div></details>`;
}

/* ----- Reset du dimanche ----- */
const RSET = [
  ['Esprit', [['plan', 'Préparer la semaine à venir'], ['nophone', '1 h sans téléphone'], ['bilan', 'Faire le bilan de la semaine']]],
  ['Corps', [['sport', 'Sport doux ou étirements'], ['soin', 'Soin : visage, cheveux, ongles'], ['repas', 'Préparer mes repas de la semaine']]],
  ['Foi', [['istighfar', 'Istighfar et invocations'], ['rappel', 'Un rappel ou une conférence']]],
  ['Maison', [['range', 'Ranger et nettoyer mon espace'], ['lessive', 'Lessive'], ['draps', 'Changer les draps']]],
  ['Mes rituels', [['sidr', 'Bain de sidr'], ['baqara', 'Écouter sourate Al-Baqara'], ['tadabbur', 'Méditer un passage du Coran'], ['nuit', 'Prière de la nuit', 'pause']]]
];
const sundayOf = (d = new Date()) => { const x = new Date(d); x.setDate(x.getDate() + (7 - x.getDay()) % 7); return iso(x); };
function resetW(k = sundayOf()) { const w = Z().reset.w; return (w[k] = w[k] || { c: {}, b: {}, done: false }); }
const rsItems = k => RSET.flatMap(g => g[1]).filter(i => !(i[2] === 'pause' && inPeriod(k)));
const rsDone = k => { const w = Z().reset.w[k]; return w ? rsItems(k).filter(i => w.c[i[0]]).length : 0; };
function vResetZ() {
  const k = sundayOf(), w = resetW(k), n = rsDone(k), t = rsItems(k).length, isSun = new Date().getDay() === 0;
  const hist = Object.keys(Z().reset.w).filter(x => Z().reset.w[x].done).length;
  return `${pageHead('Reset', isSun ? 'C\'est dimanche : ton après-midi pour repartir à neuf.' : `Dimanche ${parseDate(k).getDate()}, l'après-midi : une demi-journée pour toi.`, 'resetz')}
  <div class="zhero">${ring(t ? n / t : 0, `${n}<small>/${t}</small>`, w.done ? 'reset complet' : 'cette semaine', 'rose')}
    <div class="zside"><p class="num" style="font:400 2.4rem/1 var(--serif);color:var(--rose);margin:0">${hist}</p><p class="small muted" style="margin:4px 0 0">reset${hist > 1 ? 's' : ''} complet${hist > 1 ? 's' : ''}</p></div></div>
  ${RSET.map(([g, items]) => `<p class="gt">${g}</p><div class="checks">${items.map(([id, txt, f]) => { const off = f === 'pause' && inPeriod(k); return `<label class="check ${off ? 'off' : ''}"><input type="checkbox" data-rs="${id}" ${w.c[id] ? 'checked' : ''} ${off ? 'disabled' : ''}><span class="box">${ICON.tick}</span><span class="txt">${txt}${off ? ' <span class="small muted">· en pause pendant les règles</span>' : ''}</span></label>`; }).join('')}</div>`).join('')}
  <section><h2>Bilan de la semaine</h2>
    ${[['ok', 'Ce qui a marché'], ['ko', 'Ce qui a coincé'], ['prio', 'Ma priorité pour la semaine']].map(([id, l]) => `<label class="zlbl" for="rb-${id}">${l}</label><textarea id="rb-${id}" data-rb="${id}" rows="2">${esc(w.b[id] || '')}</textarea>`).join('')}
  </section>`;
}

/* ----- Hizya : contenu, communauté, produit ----- */
const H2 = { add: null };
const hz = () => Z().hizya;
const hWeekVid = () => hz().videos.filter(v => inWeek(v.date)).length;
const hSubs = () => { const s = hz().subs; return s.length ? s[s.length - 1].n : 0; };
function hChart() {
  const s = hz().subs.slice(-20); if (s.length < 2) return '<p class="small muted" style="margin:10px 0 0">La courbe apparaîtra dès ta deuxième mise à jour.</p>';
  const mx = Math.max(hz().goal, ...s.map(x => x.n)), W = 300, H = 90;
  const pts = s.map((x, i) => `${(i / (s.length - 1) * W).toFixed(1)},${(H - x.n / mx * H).toFixed(1)}`).join(' ');
  return `<svg viewBox="0 -8 ${W} ${H + 16}" class="hchart" aria-label="Courbe des abonnés"><line x1="0" x2="${W}" y1="${(H - hz().goal / mx * H).toFixed(1)}" y2="${(H - hz().goal / mx * H).toFixed(1)}" stroke="var(--rose)" stroke-dasharray="3 5"/><polyline points="${pts}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${s.map((x, i) => i === s.length - 1 ? `<circle cx="${(i / (s.length - 1) * W).toFixed(1)}" cy="${(H - x.n / mx * H).toFixed(1)}" r="4" fill="var(--gold)"/>` : '').join('')}</svg>`;
}
function vHizyaZ() {
  const h = hz(), wv = hWeekVid(), subs = hSubs(), k = todayISO();
  const wks = Math.max(1, Math.ceil(dBetween(k, '2026-12-31') / 7)), need = Math.max(0, h.goal - subs);
  const ws = weekStart(), days = Array.from({ length: 7 }, (_, i) => iso(addDays(parseDate(ws), i)));
  const mo = k.slice(0, 7), sales = h.sales.filter(x => x.date.slice(0, 7) === mo).reduce((m, x) => m + (Number(x.n) || 1), 0);
  const pd = h.product.filter(p => p.done).length;
  return `${pageHead('Hizya', 'Ta création de contenu, ta communauté et ton produit.', 'hizyaz')}
  <div class="zhero">${ring(wv / h.wk, `${wv}<small>/${h.wk}</small>`, 'vidéos cette semaine')}
    <div class="zside"><button class="btn sm" data-hvid>+ Vidéo publiée</button></div></div>
  ${H2.add === 'vid' ? `<div class="srow" style="margin-top:10px"><input id="hVidT" placeholder="Titre ou sujet (facultatif)" style="flex:1"><button class="btn sm" data-hvidok>Ajouter</button></div>` : ''}
  <section><div class="row between" style="align-items:baseline"><h2 style="margin:0">Stories</h2><span class="small muted">${days.filter(d => h.stories[d]).length} jour${days.filter(d => h.stories[d]).length > 1 ? 's' : ''} cette semaine</span></div>
    <div class="hstory">${days.map(d => `<button data-hst="${d}" aria-pressed="${!!h.stories[d]}" ${d > k ? 'disabled' : ''}><span>${DAY_SHORT.format(parseDate(d)).replace('.', '').slice(0, 3)}</span></button>`).join('')}</div></section>
  <section><div class="row between" style="align-items:baseline"><h2 style="margin:0">Abonnés</h2><span class="small muted">objectif ${h.goal.toLocaleString('fr-FR')} avant 2027</span></div>
    <p class="num" style="font:400 3rem/1.1 var(--serif);margin:8px 0 0">${subs.toLocaleString('fr-FR')}</p>
    <p class="small muted" style="margin:2px 0 0">${need ? `Encore ${need.toLocaleString('fr-FR')}, soit environ ${Math.ceil(need / wks).toLocaleString('fr-FR')} par semaine d'ici la fin de l'année.` : 'Objectif atteint. Place au suivant.'}</p>
    ${hChart()}
    <div class="srow" style="margin-top:12px"><input id="hSubs" inputmode="numeric" placeholder="Nombre d'abonnés aujourd'hui" style="flex:1"><button class="btn sm" data-hsubs>Mettre à jour</button></div></section>
  <section><div class="row between" style="align-items:baseline"><h2 style="margin:0">Mon produit</h2><span class="small muted num">${pd} / ${h.product.length}</span></div>
    <div class="bar" style="margin-top:10px"><i style="width:${h.product.length ? pd / h.product.length * 100 : 0}%;background:var(--rose)"></i></div>
    <div class="checks" style="margin-top:8px">${h.product.map(p => `<label class="check"><input type="checkbox" data-hpr="${p.id}" ${p.done ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${esc(p.t)}</span></label>`).join('')}</div>
    <details class="adv"><summary>Modifier les étapes</summary>${h.product.map(p => `<div class="srow"><input data-hpe="${p.id}" value="${esc(p.t)}" style="flex:1" aria-label="Étape"><button class="icon-btn" data-hpd="${p.id}" aria-label="Supprimer">${delX}</button></div>`).join('')}<div class="srow"><input id="hPNew" placeholder="Nouvelle étape" style="flex:1"><button class="btn sm" data-hpa>Ajouter</button></div></details></section>
  <section><div class="row between" style="align-items:baseline"><h2 style="margin:0">Ventes</h2><span class="small muted">${sales} ce mois-ci</span></div>
    <div class="srow" style="margin-top:10px"><input id="hSaleN" inputmode="numeric" placeholder="Nombre" style="width:84px"><input id="hSaleT" placeholder="Note (facultatif)" style="flex:1"><button class="btn sm" data-hsale>Noter</button></div></section>
  <section><h2>Journal</h2>
    <textarea id="hNote" rows="3" placeholder="Une idée de vidéo, ce que tu as appris, ce qui a plu…"></textarea><button class="btn sm" data-hnote style="margin-top:8px">Garder</button>
    ${h.notes.slice().reverse().slice(0, 8).map(n => `<div class="idea"><p>${esc(n.t)}<time>${DAY_LONG.format(parseDate(n.date))}</time></p><button class="icon-btn" data-hnd="${n.id}" aria-label="Supprimer">${delX}</button></div>`).join('')}</section>
  <section><h2>Cette semaine</h2>${h.videos.filter(v => inWeek(v.date)).map(v => `<div class="idea"><p>${esc(v.t || 'Vidéo')}<time>${DAY_LONG.format(parseDate(v.date))}</time></p><button class="icon-btn" data-hvd="${v.id}" aria-label="Supprimer">${delX}</button></div>`).join('') || '<p class="small muted">Tes vidéos publiées apparaîtront ici.</p>'}</section>`;
}

/* ----- Apprendre : lire l'arabe + business selon les règles islamiques ----- */
const BIZP = [
  ['L\'intention et les bases', ['Ton intention transforme ton travail en adoration.', 'Le commerce est licite, l\'usure (riba) ne l\'est pas.', 'L\'honnêteté est la base de tout le reste.'], '« Le commerçant véridique et digne de confiance sera avec les prophètes, les véridiques et les martyrs. » (Tirmidhi 1209)', 'Écris en 3 phrases pourquoi tu fais ce business et ce que tu refuses d\'y faire.'],
  ['Ce qui est interdit', ['Le riba : prêter ou emprunter avec intérêt.', 'Le gharar : une vente trop floue (on ne sait pas vraiment ce qu\'on achète).', 'Vendre ce qu\'on ne possède pas encore, sans cadre clair.', 'Tromper sur le produit, et les produits illicites.'], '« Celui qui trompe n\'est pas des nôtres. » (Muslim 102)', 'Passe ton projet au crible de ces 4 points et note ce qui doit changer.'],
  ['Ta cliente idéale', ['Pas « tout le monde » : une personne précise.', 'Son âge, ses journées, ce qui la bloque, ce qu\'elle rêve d\'avoir.', 'Tu crées tes vidéos pour elle, pas pour l\'algorithme.'], '', 'Décris ta cliente idéale en 5 lignes, comme si tu la présentais à une amie.'],
  ['Ton offre en une phrase', ['Le problème de ta cliente.', 'Ce que ton produit change pour elle.', 'Pourquoi te faire confiance à toi.'], '', 'Écris : « J\'aide … à … grâce à … ».'],
  ['Tester avant de fabriquer', ['Un sondage en story.', 'Une liste d\'attente.', 'Une précommande claire : prix, description, délai (le salam).'], '« Ne vends pas ce qui n\'est pas en ta possession. » (Abu Dawud 3503) : d\'où l\'importance d\'un cadre clair comme le salam.', 'Pose ta question à 10 personnes de ta cible et note leurs réponses.'],
  ['Le prix juste', ['Coût du produit + envoi + ton temps + ta marge.', 'Pas de faux prix barré ni de fausse rareté.', 'La souplesse avec la cliente est une bénédiction.'], '« Qu\'Allah fasse miséricorde à un homme facile quand il vend et quand il achète. » (Bukhari 2076)', 'Calcule ton prix ligne par ligne.'],
  ['Créer du contenu utile', ['Une vidéo = une idée.', 'La promesse dans les premières secondes.', 'La régularité : tes 3 vidéos par semaine.'], '« Allah aime, lorsque l\'un de vous fait un travail, qu\'il le fasse avec excellence. » (Bayhaqi)', 'Note 9 idées de vidéos : 3 conseils, 3 coulisses, 3 histoires.'],
  ['Construire une communauté', ['Répondre aux commentaires et aux messages.', 'Montrer les coulisses en story.', 'Mille vraies fans valent mieux qu\'un million de passantes.'], '', 'Pendant une semaine, réponds à chaque commentaire.'],
  ['Vendre sans pression', ['Vendre, c\'est aider quelqu\'un à résoudre son problème.', 'Dire aussi ce que le produit ne fait pas.', 'Pas de manipulation par l\'urgence.'], '« S\'ils sont sincères et clairs, leur vente est bénie. » (Bukhari 2079, Muslim 1532)', 'Écris ta page de vente, avec une ligne « Ce produit n\'est pas pour toi si… ».'],
  ['Servir et garder la confiance', ['Le délai annoncé est un engagement (amana).', 'Une politique de retour claire.', 'Répondre vite aux clientes mécontentes.'], '', 'Écris ta politique de retour en 5 lignes.'],
  ['Les chiffres et la zakat', ['Chiffre d\'affaires, charges, bénéfice : trois choses différentes.', 'Un tableau simple chaque mois suffit.', 'La zakat du commerce : à vérifier avec une personne de savoir.'], '', 'Crée ton tableau du mois : ventes, dépenses, ce qui reste.'],
  ['Le cadre en France', ['Déclarer son activité (souvent en micro-entreprise).', 'Déclarer son chiffre d\'affaires et payer ses cotisations.', 'Les seuils et les règles changent : vérifie-les sur autoentrepreneur.urssaf.fr.'], '', 'Vérifie que ton statut correspond bien à ce que tu vends.']
];
const bz = () => Z().biz;
const bizDone = () => BIZP.filter((_, i) => bz().done[i]).length;
const bizOpen = i => i === 0 || !!bz().done[i - 1];
const AP = { open: null };
function vApprZ() {
  const k = todayISO(), st = bz().study, sd = !!st[k];
  let streak = 0; for (let i = sd ? 0 : 1; i < 400; i++) { if (st[iso(addDays(new Date(), -i))]) streak++; else break; }
  const lv = alOpen(4) ? 4 : alOpen(3) ? 3 : alOpen(2) ? 2 : 1;
  const cur = BIZP.findIndex((_, i) => !bz().done[i]);
  return `${pageHead('Apprendre', 'Trente minutes par jour, palier après palier.', 'apprz')}
  <div class="zhero">${ring(sd ? 1 : 0, sd ? '✓' : '30', sd ? 'fait aujourd\'hui' : 'minutes aujourd\'hui', 'mint')}
    <div class="zside"><p class="num" style="font:400 2.4rem/1 var(--serif);color:var(--mint);margin:0">${streak}</p><p class="small muted" style="margin:4px 0 12px">jour${streak > 1 ? 's' : ''} d'affilée</p>
    <button class="btn sm" data-study ${sd ? 'disabled' : ''}>${sd ? 'Bravo' : 'J\'ai étudié 30 min'}</button></div></div>
  <button class="today-item" data-goto="arabe" style="margin-top:18px">${miniOrb(alKnown(lv) / alPool(lv).length, 'arabe', true)}<span><b>Lire l'arabe · palier ${lv}</b><span class="s">${ALV[lv - 1].t} : ${alKnown(lv)} acquis sur ${alPool(lv).length}</span></span>${ICON.chev}</button>
  <section><div class="row between" style="align-items:baseline"><h2 style="margin:0">Business et règles islamiques</h2><span class="small muted num">${bizDone()} / ${BIZP.length}</span></div>
    <div class="bar" style="margin-top:10px"><i style="width:${bizDone() / BIZP.length * 100}%;background:var(--mint)"></i></div>
    <div class="bpal">${BIZP.map((p, i) => { const op = bizOpen(i), dn = !!bz().done[i], show = AP.open === i || (AP.open == null && i === cur);
      return `<div class="bp ${dn ? 'ok' : ''} ${op ? '' : 'lock'} ${show ? 'open' : ''}"><button class="bph" data-bpo="${i}" ${op ? '' : 'disabled'}><i>${dn ? ICON.tick : i + 1}</i><b>${p[0]}</b>${op ? '' : '<span class="small muted">après le palier ' + i + '</span>'}</button>
      ${show && op ? `<div class="bpb"><ul>${p[1].map(x => `<li>${x}</li>`).join('')}</ul>${p[2] ? `<p class="bps">${p[2]}</p>` : ''}<p class="small"><b>À appliquer :</b> ${p[3]}</p>
        <textarea data-bpn="${i}" rows="3" placeholder="Ce que tu as fait, ce que tu retiens">${esc(bz().notes[i] || '')}</textarea>
        <button class="btn sm" data-bpd="${i}" style="margin-top:8px">${dn ? 'Marquer comme non fait' : 'Je l\'ai appliqué'}</button></div>` : ''}</div>`; }).join('')}</div>
  </section>`;
}

/* ----- Clics, saisies ----- */
function zClick(t) {
  const c = s => t.closest(s); let el; const z = Z();
  if ((el = c('[data-csoft]'))) { CZ.soft = el.dataset.csoft === '1'; CZ.done = {}; render(); return true; }
  if (c('[data-csdone]')) {
    const k = todayISO(); if (z.corps.sessions.some(s => s.date === k)) return true;
    const before = cPhase(); z.corps.sessions.push({ date: k, soft: CZ.soft }); CZ.done = {}; save(); render();
    const wk = cWeek(), ph = cPhase();
    if (ph !== before) reward(15, { big: true, msg: [`Palier ${ph.n}`, ph.s + '. Ton corps a changé, ton programme aussi.'] });
    else reward(8, { big: wk === 3, msg: wk === 3 ? ['3 séances cette semaine', 'Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible, et en chacun il y a du bien.', 'Muslim 2664'] : null });
    return true;
  }
  if ((el = c('[data-rtimer]'))) {
    if (RZ.end) { clearInterval(RZ.t); RZ.end = 0; render(); return true; }
    RZ.end = Date.now() + rItems().reduce((m, i) => m + (Number(i[2]) || 0), 0) * 60000;
    RZ.t = setInterval(() => { const b = $('#rtimer'), left = RZ.end - Date.now(); if (left <= 0) { clearInterval(RZ.t); RZ.end = 0; chime(true); toast('Ton quart d\'heure est fini. Belle nuit.'); if (b) b.textContent = 'Terminé'; return; } if (b) b.textContent = `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; }, 1000);
    render(); return true;
  }
  if ((el = c('[data-rdel]'))) { z.routine.items = z.routine.items.filter(i => i[0] !== el.dataset.rdel); save(); render(); return true; }
  if (c('[data-radd]')) { const v = ($('#rNew').value || '').trim(); if (!v) return true; z.routine.items.push(['r' + uid(), v, 2]); save(); render(); return true; }
  if (c('[data-hvid]')) { H2.add = H2.add === 'vid' ? null : 'vid'; render(); setTimeout(() => { const i = $('#hVidT'); i && i.focus(); }, 50); return true; }
  if (c('[data-hvidok]')) { z.hizya.videos.push({ id: uid(), date: todayISO(), t: ($('#hVidT').value || '').trim() }); H2.add = null; save(); render(); const n = hWeekVid(); reward(5, { big: n === z.hizya.wk, msg: n === z.hizya.wk ? ['Objectif de la semaine atteint', `${n} vidéos publiées. La régularité construit la communauté.`] : null }); return true; }
  if ((el = c('[data-hvd]'))) { z.hizya.videos = z.hizya.videos.filter(v => v.id !== el.dataset.hvd); save(); render(); unreward(5); return true; }
  if ((el = c('[data-hst]'))) { const d = el.dataset.hst, on = !z.hizya.stories[d]; if (on) z.hizya.stories[d] = true; else delete z.hizya.stories[d]; save(); render(); on ? reward(1) : unreward(1); return true; }
  if (c('[data-hsubs]')) { const n = parseInt(($('#hSubs').value || '').replace(/\D/g, ''), 10); if (!n && n !== 0) { toast('Écris le nombre d\'abonnés.'); return true; } const prev = hSubs(), s = z.hizya.subs, k = todayISO(); if (s.length && s[s.length - 1].date === k) s[s.length - 1].n = n; else s.push({ date: k, n }); save(); render();
    const mile = [100, 250, 500, 1000, 1500, 2000].find(m => prev < m && n >= m); reward(mile ? 10 : 1, { big: !!mile, msg: mile ? [`${mile.toLocaleString('fr-FR')} abonnés`, mile >= 2000 ? 'Ton objectif de l\'année est atteint. Alhamdulillah.' : 'Chaque personne qui te suit a choisi de t\'écouter. Continue de lui donner de la valeur.'] : null }); return true; }
  if ((el = c('[data-hpd]'))) { z.hizya.product = z.hizya.product.filter(p => p.id !== el.dataset.hpd); save(); render(); return true; }
  if (c('[data-hpa]')) { const v = ($('#hPNew').value || '').trim(); if (!v) return true; z.hizya.product.push({ id: 'p' + uid(), t: v, done: false }); save(); render(); return true; }
  if (c('[data-hsale]')) { const n = parseInt($('#hSaleN').value, 10) || 1; z.hizya.sales.push({ date: todayISO(), n, t: ($('#hSaleT').value || '').trim() }); save(); render(); reward(3, { msg: ['Vente notée', 'Qu\'Allah y mette la baraka.'] }); return true; }
  if (c('[data-hnote]')) { const v = ($('#hNote').value || '').trim(); if (!v) return true; z.hizya.notes.push({ id: uid(), date: todayISO(), t: v }); save(); render(); reward(1); return true; }
  if ((el = c('[data-hnd]'))) { z.hizya.notes = z.hizya.notes.filter(n => n.id !== el.dataset.hnd); save(); render(); return true; }
  if (c('[data-study]')) { z.biz.study[todayISO()] = true; save(); render(); reward(4, { msg: ['30 minutes d\'apprentissage', 'Celui qui emprunte un chemin pour chercher une science, Allah lui facilite un chemin vers le Paradis.', 'Muslim 2699'] }); return true; }
  if ((el = c('[data-bpo]'))) { const i = Number(el.dataset.bpo); AP.open = AP.open === i ? -1 : i; render(); return true; }
  if ((el = c('[data-bpd]'))) { const i = Number(el.dataset.bpd); if (z.biz.done[i]) { delete z.biz.done[i]; save(); render(); unreward(10); return true; } z.biz.done[i] = todayISO(); AP.open = null; save(); render(); reward(10, { big: true, msg: [`Palier ${i + 1} validé`, i + 1 < BIZP.length ? `Prochain palier : ${BIZP[i + 1][0]}.` : 'Tu as terminé tout le parcours. Qu\'Allah bénisse ton business.'] }); return true; }
  return false;
}
function zChange(t) {
  const z = Z();
  if (t.dataset.cex != null) { CZ.done[t.dataset.cex] = t.checked; haptic(); return true; }
  if (t.dataset.cfood) { const id = t.dataset.cfood.slice(3), k = todayISO(), d = z.corps.food[k] = z.corps.food[k] || {}; if (t.checked) d[id] = true; else delete d[id]; save(); const all = FOOD.every(f => d[f[0]]); if (t.checked) reward(all ? 4 : 1, { msg: all ? ['Assiette complète', 'Ton corps a un droit sur toi.', 'Bukhari 1975'] : null }); else unreward(1); render(); return true; }
  if (t.dataset.rit) { const k = todayISO(), l = z.routine.log[k] = z.routine.log[k] || {}, was = rFull(k); if (t.checked) l[t.dataset.rit] = true; else delete l[t.dataset.rit]; save(); const full = rFull(k); if (t.checked) reward(full && !was ? 6 : 1, { big: full && !was, msg: full && !was ? ['Soirée bouclée', 'Bonne nuit. Demain commence ce soir.'] : null }); else unreward(1); render(); return true; }
  if (t.id === 'rNote') { z.routine.notes[todayISO()] = t.value.trim(); save(); return true; }
  if (t.dataset.redit) { const it = z.routine.items.find(i => i[0] === t.dataset.redit); if (it && t.value.trim()) { it[1] = t.value.trim(); save(); } return true; }
  if (t.dataset.rmin) { const it = z.routine.items.find(i => i[0] === t.dataset.rmin); if (it) { it[2] = Math.max(1, Math.min(60, parseInt(t.value, 10) || 1)); save(); render(); } return true; }
  if (t.dataset.rs) { const k = sundayOf(), w = resetW(k); if (t.checked) w.c[t.dataset.rs] = true; else delete w.c[t.dataset.rs]; const full = rsDone(k) >= rsItems(k).length, was = w.done; w.done = full; save(); if (t.checked) reward(full && !was ? 20 : 2, { big: full && !was, msg: full && !was ? ['Reset complet', 'Ta semaine peut commencer, légère et en ordre.'] : null }); else unreward(2); render(); return true; }
  if (t.dataset.rb) { resetW().b[t.dataset.rb] = t.value; save(); return true; }
  if (t.dataset.hpr) { const p = z.hizya.product.find(x => x.id === t.dataset.hpr); if (p) { p.done = t.checked; save(); t.checked ? reward(4, { msg: ['Étape du produit', esc(p.t)] }) : unreward(4); render(); } return true; }
  if (t.dataset.hpe) { const p = z.hizya.product.find(x => x.id === t.dataset.hpe); if (p && t.value.trim()) { p.t = t.value.trim(); save(); } return true; }
  if (t.dataset.bpn != null) { z.biz.notes[t.dataset.bpn] = t.value; save(); return true; }
  return false;
}

/* =====================================================================
   ZIA · CYCLE
   Début et fin des règles, symptômes, adorations de remplacement,
   jeûnes à rattraper. Pendant les règles, les prières sont en pause
   (reqOf) : ni la série ni la régularité ne bougent.
   ===================================================================== */
const dBetween = (a, b) => Math.round((parseDate(b) - parseDate(a)) / 86400000);
function defaultCycle() { return { periods: [], sym: {}, ad: {}, fast: { owed: 0, made: 0 }, len: 28, dur: 6, ghusl: {} }; }
function normalizeCycle(c) {
  const d = defaultCycle(); c = c && typeof c === 'object' ? c : {};
  const o = Object.assign(d, c);
  if (!Array.isArray(o.periods)) o.periods = [];
  ['sym', 'ad', 'ghusl'].forEach(k => { if (!o[k] || typeof o[k] !== 'object' || Array.isArray(o[k])) o[k] = {}; });
  o.fast = Object.assign({ owed: 0, made: 0 }, c.fast || {});
  return o;
}
const cyclePeriods = () => ((S.cycle && S.cycle.periods) || []).slice().sort((a, b) => (a.start < b.start ? -1 : 1));
/* p.end = jour où les règles se sont arrêtées (la prière reprend ce jour-là).
   periodEnd = dernier jour de règles : la veille de p.end, ou aujourd'hui si elles sont en cours (au plus 14 jours). */
function periodEnd(p) {
  if (p.end) return iso(addDays(parseDate(p.end), -1));
  const t = todayISO();
  return dBetween(p.start, t) <= 14 ? t : iso(addDays(parseDate(p.start), avgDur() - 1));
}
const pStart = p => p.startAt || +parseDate(p.start);
function pStop(p) {
  if (p.end) return p.endAt || +addDays(parseDate(p.end), 1) - 1;
  return dBetween(p.start, todayISO()) <= 14 ? Infinity : +addDays(parseDate(p.start), avgDur());
}
function pausedAt(ts) { return !!(S.cycle && S.cycle.periods.some(p => ts >= pStart(p) && ts < pStop(p))); }
function inPeriod(k) { return !!(S.cycle && S.cycle.periods.some(p => p.start <= k && k <= periodEnd(p))); }
function openPeriod() { const p = cyclePeriods().filter(x => !x.end).pop(); return p && dBetween(p.start, todayISO()) <= 14 ? p : null; }
function avgCycle() {
  const st = cyclePeriods().map(p => p.start), ds = [];
  for (let i = 1; i < st.length; i++) { const d = dBetween(st[i - 1], st[i]); if (d >= 18 && d <= 45) ds.push(d); }
  const last = ds.slice(-6);
  return last.length ? Math.round(last.reduce((a, b) => a + b, 0) / last.length) : (numv(S.cycle.len) || 28);
}
function avgDur() {
  const ds = cyclePeriods().filter(p => p.end).map(p => dBetween(p.start, p.end)).filter(d => d >= 2 && d <= 12).slice(-6);
  return ds.length ? Math.round(ds.reduce((a, b) => a + b, 0) / ds.length) : (numv(S.cycle.dur) || 6);
}
function cycleInfo() {
  const ps = cyclePeriods(), last = ps[ps.length - 1], k = todayISO();
  if (!last) return null;
  const len = avgCycle(), day = dBetween(last.start, k) + 1, next = iso(addDays(parseDate(last.start), len));
  return { last, len, day, next, left: dBetween(k, next), cur: inPeriod(k), dur: avgDur() };
}
/* Ghusl à rappeler : règles finies depuis moins de 3 jours, ghusl pas encore coché. */
function ghuslDue() {
  if (!S.cycle || inPeriod(todayISO())) return null;
  const p = cyclePeriods().filter(x => x.end).pop();
  const d = p ? dBetween(p.end, todayISO()) : -1;
  return p && d >= 0 && d <= 2 && !S.cycle.ghusl[p.end] ? p : null;
}
function startPeriod(k) {
  if (inPeriod(k)) { toast('Ce jour fait déjà partie de tes règles.'); return; }
  S.cycle.periods.forEach(p => { if (!p.end && p.start < k) p.end = iso(addDays(parseDate(p.start), Math.min(avgDur(), dBetween(p.start, k)))); });
  S.cycle.periods.push(k === todayISO() ? { id: uid(), start: k, end: null, startAt: Date.now() } : { id: uid(), start: k, end: null });
  CY.pick = null; save(); render();
  toast('Règles notées. Tes prières sont en pause, ta série ne bouge pas.', null, null, 5000);
}
function endPeriod(k) {
  const p = openPeriod() || cyclePeriods().filter(x => x.start <= k).pop();
  if (!p) return;
  p.end = k < p.start ? p.start : k;
  if (p.end === todayISO()) p.endAt = Date.now(); else delete p.endAt;
  CY.pick = null; save(); render();
  window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' });
}
const SYM = [['pain', 'Douleurs'], ['fatigue', 'Fatigue'], ['mood', 'Humeur basse'], ['sleep', 'Sommeil difficile'], ['flow', 'Abondance', true]];
const SYM_LV = ['Rien', 'Léger', 'Moyen', 'Fort'];
const ADOR = [
  ['dhikr', 'Dhikr', 'SubhanAllah, Alhamdulillah, Allahu akbar'],
  ['istighfar', 'Istighfar', 'Astaghfirullah, au calme'],
  ['ecoute', 'Écouter le Coran', 'Une sourate, ou Al-Baqara en fond'],
  ['salawat', 'Prier sur le Prophète ﷺ', 'Allahumma salli ʿala Muhammad'],
  ['sadaqa', 'Une aumône', 'Même petite, même un sourire'],
  ['savoir', 'Apprendre', 'Un rappel, une conférence, ou 5 cartes du Flux']
];
/* Signal d'alerte : douleurs fortes 2 jours ou plus, ou abondance forte 3 jours ou plus, sur les dernières règles. */
function cycleAlert() {
  const p = cyclePeriods().pop(); if (!p) return false;
  let pain = 0, flow = 0;
  for (let k = p.start, i = 0; k <= periodEnd(p) && i < 15; k = iso(addDays(parseDate(k), 1)), i++) { const s = S.cycle.sym[k] || {}; if (s.pain === 3) pain++; if (s.flow === 3) flow++; }
  return pain >= 2 || flow >= 3;
}
const CY = { pick: null };
function cycleRing(ci) {
  const N = ci ? Math.max(ci.len, Math.min(45, ci.day)) : 28, R = 98;
  const today = ci ? ci.day - 1 : -1, perDays = ci ? (ci.cur ? dBetween(ci.last.start, todayISO()) + 1 : ci.last.end ? dBetween(ci.last.start, ci.last.end) : ci.dur) : 0;
  let dots = '';
  for (let i = 0; i < N; i++) {
    const [x, y] = polar(R, i / N * 360), per = i < perDays, past = i < today, now = i === today;
    const r = now ? 7 : per ? 5 : 3.2;
    const fill = per ? 'var(--rose)' : past ? 'var(--muted)' : 'transparent';
    const stroke = per ? 'var(--rose)' : past ? 'none' : 'var(--orbit)';
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.2" ${past && !per ? 'opacity=".45"' : ''}/>`;
    if (now) dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="none" stroke="var(--gold)" stroke-width="1.5"/>`;
  }
  let big, small;
  if (!ci) { big = '·'; small = 'Aucune donnée'; }
  else if (ci.cur) { big = `J${dBetween(ci.last.start, todayISO()) + 1}`; small = 'de tes règles'; }
  else if (ci.left >= 0) { big = `J${ci.day}`; small = ci.left === 0 ? 'règles attendues aujourd\'hui' : `règles dans ${ci.left} j`; }
  else { big = `J${ci.day}`; small = `règles attendues depuis ${-ci.left} j`; }
  return `<svg viewBox="-125 -125 250 250" class="cring" role="img" aria-label="Jour ${ci ? ci.day : 0} du cycle">${dots}
    <text y="6" text-anchor="middle" style="font:400 50px var(--serif);fill:var(--ink)">${big}</text>
    <text y="30" text-anchor="middle" style="font-size:11px;font-weight:600;fill:var(--muted)">${small}</text></svg>`;
}
function vCycle() {
  const ci = cycleInfo(), k = todayISO(), cur = ci && ci.cur, open = openPeriod(), sy = S.cycle.sym[k] || {}, ad = S.cycle.ad[k] || {};
  const gh = ghuslDue();
  const pick = CY.pick ? `<div class="confirm" style="margin-top:12px"><p class="small">${CY.pick === 'start' ? 'Premier jour de tes règles' : 'Jour où tes règles se sont arrêtées'}</p>
      <div class="row" style="margin-top:10px"><input type="date" id="cyDate" value="${k}" max="${k}" class="famt" style="flex:1;text-align:left"><button class="btn sm" data-cycok>Valider</button></div></div>` : '';
  const hist = cyclePeriods().slice(-6).reverse().map((p, i, arr) => {
    const prev = arr[i + 1], len = prev ? dBetween(prev.start, p.start) : null;
    return `<div class="cell"><span class="lbl">${DAY_LONG.format(parseDate(p.start)).replace(/^./, c => c.toUpperCase())}</span><span class="small muted num">${p.end ? `${dBetween(p.start, p.end)} j` : 'en cours'}${len ? ` · cycle ${len} j` : ''}</span><button class="icon-btn" data-cdel="${p.id}" aria-label="Supprimer"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>`;
  }).join('');
  const nAd = Object.keys(ad).length;
  return `${pageHead('Cycle', ci ? (cur ? 'Règles en cours. Tes prières sont en pause.' : `Prochaines règles vers le ${DAY_LONG.format(parseDate(ci.next))}.`) : 'Note le début de tes règles pour commencer.', 'cycle')}
  <div class="cring-wrap">${cycleRing(ci)}</div>
  <div class="row" style="justify-content:center;margin-top:4px">
    ${open ? '<button class="btn" data-cyc="end">Mes règles sont terminées</button>' : '<button class="btn" data-cyc="start">Mes règles ont commencé</button>'}
  </div>
  ${pick || `<p class="hint" style="text-align:center"><button class="link-btn small" data-cyc="${open ? 'end' : 'start'}" data-pickdate>Pas aujourd'hui ? Choisir la date</button></p>`}
  ${gh ? `<section class="cend"><h2>Fin des règles</h2>
    <p class="small">Pense au ghusl, puis reprends la prière. Si tes règles se sont arrêtées pendant le temps d'une prière, cette prière est à rattraper après le ghusl. Pour Asr et Isha, certains savants demandent aussi de rattraper Dhuhr et Maghrib. Le plus sûr : demander à une personne de savoir de confiance.</p>
    <button class="btn sm" data-ghusl style="margin-top:12px">Ghusl fait</button></section>` : ''}
  ${cur ? `<section>
    <div class="row between" style="align-items:baseline"><h2 style="margin:0">Adorations du jour</h2><span class="small muted num">${nAd} / ${ADOR.length}</span></div>
    <p class="hint" style="margin:4px 0 10px">La prière et le jeûne sont suspendus pendant les règles. Ces actes-là restent ouverts, et chacun allume de la lumière.</p>
    <div class="checks">${ADOR.map(([id, t, s]) => `<label class="check"><input type="checkbox" data-cad="${id}" ${ad[id] ? 'checked' : ''}><span class="box">${ICON.tick}</span><span class="txt">${t}<span class="small muted" style="display:block">${s}</span></span></label>`).join('')}</div>
    <details class="adv"><summary>Et la lecture du Coran ?</summary><p class="small">Les savants ont des avis différents. Certains autorisent la femme en règles à réciter, surtout de mémoire ou pour ne pas oublier ce qu'elle a appris ; d'autres ne l'autorisent pas. L'app ne tranche pas : demande à une personne de savoir en qui tu as confiance. L'écoute du Coran, elle, ne pose pas de question.</p></details>
  </section>` : ''}
  <section>
    <h2>Aujourd'hui, je ressens</h2>
    ${SYM.filter(s => !s[2] || cur).map(([id, t]) => `<div class="symrow"><span>${t}</span><div class="symlv" role="group" aria-label="${t}">${SYM_LV.map((l, v) => `<button data-sym="${id}.${v}" aria-pressed="${sy[id] === v}" aria-label="${t} : ${l}">${l}</button>`).join('')}</div></div>`).join('')}
    ${cycleAlert() ? `<div class="alert">${ICON.warn}<span>Des douleurs qui empêchent la vie normale, ou des règles très abondantes, méritent d'en parler à un médecin ou une sage-femme (par exemple pour écarter une endométriose ou un manque de fer).</span></div>` : ''}
  </section>
  <section>
    <h2>Jeûnes à rattraper</h2>
    <div class="counter"><div><p class="big num">${S.cycle.fast.owed}<small> jour${S.cycle.fast.owed > 1 ? 's' : ''}</small></p><p class="small muted">${S.cycle.fast.made ? `${S.cycle.fast.made} déjà rattrapé${S.cycle.fast.made > 1 ? 's' : ''}` : 'jours de Ramadan manqués pendant les règles'}</p></div>
      <div class="stepper"><button data-fast="-1" aria-label="Retirer un jour">−</button><button data-fast="1" aria-label="Ajouter un jour à rattraper">+</button></div></div>
    ${S.cycle.fast.owed ? '<button class="btn sm" data-fast="made" style="margin-top:12px">J\'ai rattrapé un jour</button>' : ''}
    <p class="hint">À rattraper avant le prochain Ramadan, attendu vers le 8 février 2027 selon l'observation du croissant (dans ${Math.max(0, dBetween(k, '2027-02-08'))} jours).</p>
  </section>
  <section>
    <h2>Douleurs et alimentation</h2>
    <details class="adv"><summary>Soulager les douleurs</summary><p class="small">Une bouillotte ou de la chaleur sur le bas du ventre, une activité douce (marche, étirements), bien boire. Pour un médicament contre la douleur, demande à ton pharmacien ou ton médecin : l'app ne donne pas de dose.</p></details>
    <details class="adv"><summary>Manger pour compenser le fer</summary><p class="small">Sans viande, le fer vient des lentilles, pois chiches, haricots, tofu, épinards, graines de courge et céréales complètes. Associe-les à de la vitamine C (agrumes, kiwi, poivron) pour mieux l'absorber, et garde le thé ou le café à distance des repas : ils freinent l'absorption du fer.</p></details>
    <details class="adv"><summary>Quand consulter</summary><p class="small">Des douleurs qui t'empêchent de vivre normalement, des règles qui durent plus de 7 jours ou qui obligent à changer de protection toutes les heures, une grande fatigue : parles-en à un médecin ou une sage-femme.</p></details>
  </section>
  <section>
    <h2>Tes derniers cycles</h2>
    ${hist ? `<div class="group">${hist}</div>` : '<p class="small muted">Tes cycles apparaîtront ici.</p>'}
    <p class="gt">Tant qu'il y a peu d'historique</p>
    <div class="group">
      <div class="cell"><span class="lbl">Durée d'un cycle</span><button class="icon-btn" data-cset="len.-1" aria-label="Moins">−</button><b class="num" style="min-width:3.2em;text-align:center">${S.cycle.len} j</b><button class="icon-btn" data-cset="len.1" aria-label="Plus">+</button></div>
      <div class="cell"><span class="lbl">Durée des règles</span><button class="icon-btn" data-cset="dur.-1" aria-label="Moins">−</button><b class="num" style="min-width:3.2em;text-align:center">${S.cycle.dur} j</b><button class="icon-btn" data-cset="dur.1" aria-label="Plus">+</button></div>
    </div>
    <p class="hint">Dès 2 cycles notés, l'app utilise tes vraies moyennes. Ces données restent sur ton téléphone. Ce suivi n'est pas une méthode de contraception.</p>
  </section>`;
}
function cycleClick(t) {
  const c = sel => t.closest(sel); let el;
  if ((el = c('[data-cyc]'))) { if (el.hasAttribute('data-pickdate')) { CY.pick = el.dataset.cyc; render(); setTimeout(() => { const i = $('#cyDate'); if (i) i.focus(); }, 60); return true; } el.dataset.cyc === 'start' ? startPeriod(todayISO()) : endPeriod(todayISO()); return true; }
  if (c('[data-cycok]')) { const v = ($('#cyDate') || {}).value; if (!v || v > todayISO()) { toast('Choisis une date passée ou aujourd\'hui.'); return true; } CY.pick === 'start' ? startPeriod(v) : endPeriod(v); return true; }
  if (c('[data-ghusl]')) { const p = ghuslDue(); if (p) { S.cycle.ghusl[p.end] = true; save(); render(); reward(3, { msg: ['Ghusl fait', 'Allah aime ceux qui se repentent et ceux qui se purifient.', 'Coran 2:222'] }); } return true; }
  if ((el = c('[data-sym]'))) {
    const [id, v] = el.dataset.sym.split('.'), k = todayISO(), d = S.cycle.sym[k] = S.cycle.sym[k] || {}, first = !d._r;
    d[id] = d[id] === Number(v) ? undefined : Number(v); if (d[id] === undefined) delete d[id];
    if (first && Object.keys(d).length) d._r = 1;
    save(); render(); if (first && d._r) reward(1); else haptic(); return true;
  }
  if ((el = c('[data-cdel]'))) { const id = el.dataset.cdel, before = JSON.stringify(S.cycle.periods); S.cycle.periods = S.cycle.periods.filter(p => p.id !== id); save(); render(); toast('Cycle supprimé', 'Annuler', () => { S.cycle.periods = JSON.parse(before); save(); render(); }, 6000); return true; }
  if ((el = c('[data-cset]'))) { const [f, dl] = el.dataset.cset.split('.'), lim = f === 'len' ? [21, 40] : [2, 10]; S.cycle[f] = Math.max(lim[0], Math.min(lim[1], numv(S.cycle[f]) + (dl === '-1' ? -1 : 1))); save(); render(); return true; }
  if ((el = c('[data-fast]'))) {
    const f = S.cycle.fast, v = el.dataset.fast;
    if (v === 'made') { if (f.owed > 0) { f.owed--; f.made++; save(); render(); reward(5, { msg: f.owed ? ['Un jour rattrapé', `Plus que ${f.owed}. Le jeûne est pour Moi, et c'est Moi qui en donne la récompense.`, 'Hadith qudsi, Bukhari'] : ['Tout est rattrapé', 'Qu\'Allah l\'accepte de toi.'] }); } return true; }
    f.owed = Math.max(0, f.owed + Number(v === '-1' ? -1 : 1)); save(); render(); haptic(); return true;
  }
  return false;
}
function cycleChange(t) {
  if (t.matches && t.matches('[data-cad]')) {
    const id = t.dataset.cad, k = todayISO(), d = S.cycle.ad[k] = S.cycle.ad[k] || {};
    if (t.checked) { d[id] = true; save(); reward(2); } else { delete d[id]; if (!Object.keys(d).length) delete S.cycle.ad[k]; unreward(2); }
    render(); return true;
  }
  return false;
}

/* =====================================================================
   ZIA · JARDIN (accueil)
   Chaque module est une plante : graine, pousse, arbuste, arbre en fleurs,
   grenadier. Elle grandit avec ce qui est fait dans le module. La source
   au centre ouvre le Flux et brille selon la lumière du jour.
   ===================================================================== */
const GARDEN = [
  { k: 'foi', name: 'Foi', a: 0 },
  { k: 'cycle', name: 'Cycle', a: -52 },
  { k: 'corps', name: 'Corps', a: 52 },
  { k: 'routine', name: 'Routine', a: -110 },
  { k: 'reset', name: 'Reset', a: 110 },
  { k: 'hizya', name: 'Hizya', a: -154 },
  { k: 'appr', name: 'Apprendre', a: 154 }
];
const GSTAGES = ['Graine', 'Pousse', 'Arbuste', 'Arbre en fleurs', 'Grenadier'];
const GROW = { foi: [9, 90, 300, 800], cycle: [2, 12, 35, 80], appr: [3, 40, 120, 240], corps: [1, 8, 24, 48], routine: [2, 20, 70, 160], reset: [3, 20, 60, 130], hizya: [2, 20, 60, 140] };
const LEVEL_TXT = ['', 'La graine a percé la terre. Ce qui est petit et régulier finit par grandir.', 'Ta pousse est devenue un arbuste. Les racines se forment dans la constance.', 'Ton arbre est en fleurs. Continue : les fruits viennent après les fleurs.', 'Ton grenadier donne ses premiers fruits. La grenade est citée parmi les fruits des jardins du Paradis (Coran 55:68).'];
function growValue(k) {
  if (k === 'foi') {
    let n = 0;
    Object.values(S.faith.log).forEach(d => Object.values(d).forEach(v => { if (v && v !== 'x') n++; }));
    Object.values(S.cycle.ad).forEach(d => { n += Object.keys(d).length; });
    return n;
  }
  const z = Z();
  if (k === 'appr') return alPoints() + wordsKnown() * 2 + bizDone() * 10 + Object.keys(z.biz.study).length * 2;
  if (k === 'corps') return z.corps.sessions.length + Math.floor(Object.values(z.corps.food).reduce((m, d) => m + Object.keys(d).length, 0) / 6);
  if (k === 'routine') return Object.values(z.routine.log).reduce((m, d) => m + Object.keys(d).length, 0);
  if (k === 'reset') return Object.values(z.reset.w).reduce((m, w) => m + Object.keys(w.c || {}).length + (w.done ? 5 : 0), 0);
  if (k === 'hizya') { const h = z.hizya; return h.videos.length * 3 + Object.keys(h.stories).length + h.product.filter(p => p.done).length * 4 + h.sales.length + h.notes.length; }
  if (k === 'cycle') { const days = new Set([...Object.keys(S.cycle.sym), ...Object.keys(S.cycle.ad)]); return days.size + S.cycle.periods.length * 3 + S.cycle.fast.made * 2; }
  return 0;
}
function growth(k) {
  const t = GROW[k]; if (!t) return { st: 0, p: 0, v: 0, next: 0, fruits: 0 };
  const v = growValue(k); let st = 0; while (st < 4 && v >= t[st]) st++;
  const lo = st ? t[st - 1] : 0, hi = st < 4 ? t[st] : null;
  return { st, v, p: hi ? (v - lo) / (hi - lo) : 1, next: hi ? hi - v : 0, fruits: st === 4 ? Math.min(9, 1 + Math.floor((v - t[3]) / Math.max(10, Math.round(t[3] * .25)))) : 0 };
}
function checkGarden() {
  const g = S.garden = S.garden || { st: {} }; let up = null;
  GARDEN.forEach(p => {
    if (p.soon) return;
    const st = growth(p.k).st;
    if (g.st[p.k] == null) { g.st[p.k] = st; save(); return; }
    if (st > g.st[p.k]) { g.st[p.k] = st; up = [p, st]; save(); } else if (st < g.st[p.k]) { g.st[p.k] = st; save(); }
  });
  if (up) setTimeout(() => { chime(true); burst(28, GSTAGES[up[1]], true); gemCard(`${up[0].name} · ${GSTAGES[up[1]]}`, LEVEL_TXT[up[1]], ''); try { navigator.vibrate && navigator.vibrate([14, 50, 20, 50, 30]); } catch (e) {} }, 700);
}
function plantSvg(st, fruits, soon) {
  const L = 'var(--leaf)', L2 = 'var(--leaf-2)', T = 'var(--trunk)';
  const leaf = (y, rot, s = 1, x = 0) => `<path d="M0 0C-3.2 -5 -3.2 -11 0 -15C3.2 -11 3.2 -5 0 0Z" transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" fill="${L}"/>`;
  let g = '<ellipse cx="0" cy="0" rx="22" ry="5.5" fill="var(--soil)"/>';
  if (soon || st === 0) return g + `<g ${soon ? 'opacity=".5"' : ''}><ellipse cx="0" cy="-3" rx="4.8" ry="3.5" fill="${T}"/><path d="M-1.6 -5.8q1.6 -2.4 3.2 0" stroke="${L}" stroke-width="1.3" fill="none" stroke-linecap="round"/></g>`;
  if (st === 1) return g + `<path d="M0 -1C0 -8 1 -14 0 -21" stroke="${L2}" stroke-width="2" fill="none" stroke-linecap="round"/>${leaf(-13, -58, .85)}${leaf(-17, 52, .75)}${leaf(-21, 4, .62)}`;
  if (st === 2) return g + `<path d="M0 -1C0 -12 1.5 -24 0 -36" stroke="${L2}" stroke-width="2.4" fill="none" stroke-linecap="round"/>${[[-9, -55, 1], [-15, 58, 1], [-22, -48, .95], [-27, 46, .9], [-32, -30, .8], [-34, 30, .8], [-36, 2, .75]].map(([y, r, s]) => leaf(y, r, s)).join('')}`;
  const trunk = `<path d="M-3.4 0C-2.2 -12 -3 -22 -.6 -33L.6 -33C3 -22 2.2 -12 3.4 0Z" fill="${T}"/><path d="M-.5 -21C-6 -26 -9 -30 -12 -37M.5 -25C5 -29 8 -33 11 -39" stroke="${T}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  const C = [[0, -50, 17], [-14, -43, 12], [14, -43, 12], [-8, -59, 11], [9, -59, 11]];
  const canopy = C.map(([x, y, r]) => `<circle cx="${x}" cy="${y + 2}" r="${r}" fill="${L2}"/>`).join('') + C.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r - 1}" fill="${L}"/>`).join('');
  const bloom = (x, y) => `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${(Math.sin(a * Math.PI / 180) * 1.8).toFixed(2)}" cy="${(-Math.cos(a * Math.PI / 180) * 1.8).toFixed(2)}" r="1.5" fill="var(--bloom)"/>`).join('')}<circle r=".9" fill="var(--gold-hi)"/></g>`;
  if (st === 3) return g + trunk + canopy + [[-12, -47], [6, -61], [13, -44], [-3, -40], [-9, -58], [2, -52], [16, -52]].map(([x, y]) => bloom(x, y)).join('');
  const F = [[-9, -42], [8, -46], [-2, -56], [13, -54], [-14, -53], [3, -38], [-6, -48], [11, -38], [0, -47]];
  const fruit = ([x, y]) => `<g transform="translate(${x} ${y})"><circle r="4.3" fill="var(--fruit)"/><path d="M-1.7 -3.7l.6 -1.9.9 1.1.9 -1.1.6 1.9z" fill="var(--fruit)"/><circle cx="-1.4" cy="-1.4" r="1.1" fill="#fff" opacity=".35"/></g>`;
  return g + trunk + canopy + bloom(-12, -60) + bloom(15, -48) + F.slice(0, Math.max(1, fruits)).map(fruit).join('');
}
function vOrbite() {
  const now = new Date(), h = now.getHours();
  const hello = h < 5 ? 'Bonne nuit' : h < 18 ? 'Bonjour' : 'Bonsoir';
  let seed = 11, stars = '';
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 34; i++) { const x = rnd() * 400 - 200, y = rnd() * 150 - 205, r = rnd() * 1 + .3; stars += `<circle class="gstar" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" opacity="${(rnd() * .45 + .15).toFixed(2)}"/>`; }
  const RX = 150, RY = 110;
  const plants = GARDEN.map((p, i) => {
    const a = p.a * Math.PI / 180, x = RX * Math.sin(a), y = -RY * Math.cos(a), sc = .8 + .32 * ((y + RY) / (2 * RY));
    const g = growth(p.k), lbl = p.soon ? 'Bientôt' : GSTAGES[g.st];
    const aria = p.soon ? `${p.name} : bientôt` : `${p.name} : ${lbl}${g.st < 4 ? `, prochain palier dans ${g.next}` : ''}`;
    return `<g class="plant ${p.soon ? 'soon' : ''}" ${p.soon ? `data-soon="${p.name}"` : `data-goto="${p.go || p.k}"`} role="button" tabindex="0" aria-label="${aria}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
      <rect x="-32" y="-78" width="64" height="112" fill="transparent"/>
      <g transform="scale(${sc.toFixed(3)})"><g class="sway" style="animation-delay:${(-i * .7).toFixed(1)}s">${plantSvg(g.st, g.fruits, p.soon)}</g></g>
      <text class="pl-n" y="${(15 * sc + 4).toFixed(1)}">${p.name}</text>
      <text class="pl-s" y="${(15 * sc + 17).toFixed(1)}">${lbl}</text>
      ${!p.soon && g.st < 4 ? `<rect class="pl-trk" x="-14" y="${(15 * sc + 23).toFixed(1)}" width="28" height="2.4" rx="1.2"/><rect class="pl-bar" x="-14" y="${(15 * sc + 23).toFixed(1)}" width="${(28 * g.p).toFixed(1)}" height="2.4" rx="1.2"/>` : ''}
    </g>`;
  }).join('');
  const ci = cycleInfo(), k = todayISO();
  return `${pageHead(`${hello}, <em>Zia</em>`, DAY_LONG.format(now).replace(/^./, c => c.toUpperCase()), 'orbite')}
  <div class="garden" id="stage">
    <svg viewBox="-200 -205 400 355" aria-label="Ton jardin : un module par plante">
      <defs><radialGradient id="srcGlow"><stop offset="0" stop-color="var(--water)" stop-opacity=".5"/><stop offset=".5" stop-color="var(--water)" stop-opacity=".12"/><stop offset="1" stop-color="var(--water)" stop-opacity="0"/></radialGradient></defs>
      ${stars}
      <path class="gmoon" d="M168 -186a16 16 0 1 0 12 26 13 13 0 1 1 -12 -26z"/>
      <g class="flies">${Array.from({ length: Math.min(9, Math.floor(nourDay() / 4)) }, (_, i) => { const a = i * 137.5 * Math.PI / 180, r = 60 + (i * 23) % 90; return `<circle cx="${(Math.cos(a) * r * 1.3).toFixed(0)}" cy="${(Math.sin(a) * r * .75 - 10).toFixed(0)}" r="1.8" style="animation-delay:${(-i * 1.3).toFixed(1)}s"/>`; }).join('')}</g>
      <ellipse class="allee" rx="${RX}" ry="${RY}"/>
      <circle id="sunGlowC" r="${(56 + 44 * sunLevel()).toFixed(0)}" fill="url(#srcGlow)" style="opacity:${(.35 + .65 * sunLevel()).toFixed(2)};transition:r .8s,opacity .8s"/>
      <ellipse rx="44" ry="15" fill="var(--water)" opacity=".13"/>
      <ellipse class="rip" rx="30" ry="10.5"/><ellipse class="rip r2" rx="30" ry="10.5"/>
      <ellipse id="sunCore" rx="24" ry="8.4" fill="var(--water)" style="opacity:${(.55 + .45 * Math.min(1, sunLevel() * 1.6)).toFixed(2)};transition:opacity .8s"/>
      <g class="drops"><circle cx="-5" cy="-12" r="2"/><circle cx="0" cy="-12" r="1.6"/><circle cx="5" cy="-12" r="1.3"/></g>
      <text id="sunNour" y="30" text-anchor="middle" style="font-size:10.5px;font-weight:700;letter-spacing:.06em;fill:var(--gold)">✦ ${nourDay()}</text>
      <ellipse data-sun rx="48" ry="30" fill="transparent" role="button" tabindex="0" aria-label="Ouvrir le Flux" style="cursor:pointer"/>
      ${plants}
    </svg>
  </div>
  ${yesterdayCard()}${atStake()}
  <section style="margin-top:18px">
    <h2>Aujourd'hui</h2>
    <div class="today-list">
      ${(() => { const d = S.flux.day.d === todayISO() ? S.flux.day.n : 0; return `<button class="today-item" data-goto="flux">${miniOrb(Math.min(1, d / 5), 'flux')}<span><b>${d >= 5 ? 'Esprit nourri aujourd\'hui' : 'Flux · 5 cartes pour ton esprit'}</b><span class="s">${d ? `${d} carte${d > 1 ? 's' : ''} lue${d > 1 ? 's' : ''} aujourd'hui` : 'Coran, récits, savoir, psychologie'}</span></span>${ICON.chev}</button>`; })()}
      ${(() => { const n = needOf(k), dn = dayDone(k), paused = inPeriod(k); return `<button class="today-item" data-goto="habitudes">${miniOrb(n ? dn / n : 0, 'foi', true)}<span><b>${dn === n ? 'Habitudes du jour complètes' : `${dn} habitude${dn > 1 ? 's' : ''} sur ${n} aujourd'hui`}</b><span class="s">${paused ? 'Prières en pause pendant tes règles' : (() => { const pn = prayerNow(), nx = nextPrayer(); return pn && !(S.faith.log[pn.k] || {})[pn.id] ? `${PNAMES[pn.id]} en cours · reste ${leftTxt(pn.end - new Date())}` : nx ? `Prochaine : ${PNAMES[nx.id]} à ${hm(nx.start)}` : `Régularité ${Math.round(faithScore().pct * 100)} % sur 30 jours`; })()}</span></span>${ICON.chev}</button>`; })()}
      ${(() => { const wk = cWeek(); return `<button class="today-item" data-goto="corps">${miniOrb(wk / 3, 'corps')}<span><b>${cSessions().some(s => s.date === k) ? 'Séance faite aujourd\'hui' : `Séance ${cPhase().n}`}</b><span class="s">${wk}/3 séances cette semaine</span></span>${ICON.chev}</button>`; })()}
      ${(() => { const n = rDone(k), t = rItems().length; return `<button class="today-item" data-goto="routine">${miniOrb(t ? n / t : 0, 'routine')}<span><b>${n === t ? 'Soirée bouclée' : 'Ta routine du soir'}</b><span class="s">${n}/${t} étapes · ${rStreak()} soir${rStreak() > 1 ? 's' : ''} d'affilée</span></span>${ICON.chev}</button>`; })()}
      ${new Date().getDay() === 0 || new Date().getDay() === 6 ? (() => { const s = sundayOf(), n = rsDone(s), t = rsItems(s).length; return `<button class="today-item" data-goto="reset">${miniOrb(t ? n / t : 0, 'reset')}<span><b>${new Date().getDay() === 0 ? 'Ton reset, cet après-midi' : 'Demain, ton reset'}</b><span class="s">${n}/${t} cases</span></span>${ICON.chev}</button>`; })() : ''}
      <button class="today-item" data-goto="cycle">${miniOrb(ci ? Math.min(1, ci.day / ci.len) : 0, 'cycle')}<span><b>${!ci ? 'Commencer le suivi du cycle' : ci.cur ? `Règles · jour ${dBetween(ci.last.start, k) + 1}` : `Jour ${ci.day} du cycle`}</b><span class="s">${!ci ? 'Note le début de tes prochaines règles' : ci.cur ? `${Object.keys(S.cycle.ad[k] || {}).length} adoration${Object.keys(S.cycle.ad[k] || {}).length > 1 ? 's' : ''} aujourd'hui` : ci.left >= 0 ? `Règles dans ${ci.left} jour${ci.left > 1 ? 's' : ''}` : `Règles attendues depuis ${-ci.left} j`}</span></span>${ICON.chev}</button>
      ${(() => { const lv = alOpen(3) ? 3 : alOpen(2) ? 2 : 1, n = alKnown(lv), t = alPool(lv).length; return `<button class="today-item" data-goto="arabe">${miniOrb(n / t, 'arabe', true)}<span><b>Lire l'arabe · ${ALV[lv - 1].t.toLowerCase()}</b><span class="s">${n} lettre${n > 1 ? 's' : ''} acquise${n > 1 ? 's' : ''} sur ${t}</span></span>${ICON.chev}</button>`; })()}
    </div>
  </section>`;
}
function startGarden() {
  const st = $('#stage'); if (!st) return;
  st.addEventListener('click', e => {
    const s = e.target.closest('[data-soon]'); if (s) { e.stopPropagation(); toast(`${s.dataset.soon} pousse dans la prochaine mise à jour, in sha Allah.`); return; }
    if (e.target.closest('[data-sun]')) { e.stopPropagation(); go('flux'); }
  });
  st.addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const g = e.target.closest('[data-goto],[data-soon],[data-sun]'); if (g) { e.preventDefault(); g.dispatchEvent(new MouseEvent('click', { bubbles: true })); } });
}

/* =====================================================================
   15. RENDU & NAVIGATION
   ===================================================================== */
const TABS = ['orbite', 'flux', 'foi', 'cycle', 'corps', 'routine', 'reset', 'hizya', 'appr', 'parcours', 'argent', 'business'];
const CVIEWS = ['entrainement', 'nutrition', 'soin'];
let tab = 'orbite', missedDismissed = false;
function render(animate) {
  const app = $('#app');
  stopOrbit();
  app.className = animate ? 'view' : '';
  checkUnlocks();
  document.documentElement.classList.toggle('flux-on', tab === 'flux');
  if (tab !== 'flux' && FXS.io) { FXS.io.disconnect(); FXS.io = null; }
  app.innerHTML = { orbite: vOrbite, cycle: vCycle, reset: vResetZ, hizya: vHizyaZ, appr: vApprZ, flux: vFlux, parcours: vParcours, foi: () => F.view === 'arabe' ? vArabe() : vHabits(), corps: vCorpsZ, routine: vRoutineZ, argent: () => A.view === 'heures' ? vHeures() : vBudget(), business: vBusiness, z: () => window.__z ? window.__z.view() : vOrbite() }[tab]();
  coreGlyph();
  if (tab === 'orbite') startGarden();
  checkGarden();
  if ((tab === 'orbite' || tab === 'foi') && !missedDismissed) setTimeout(missedOverlay, 700);
  if (tab === 'flux') bindFlux();
  if (tab === 'parcours') bindParcours();
  if (tab === 'foi' && F.view === 'arabe') { if (AV !== 'mots' || !alOpen(5)) drawLQ(); else if (quiz && !quiz.answered) drawQuiz(); else nextQuiz(); }
  if (tab === 'argent' && A.view === 'heures') bindDial();
}
function setAView(v) { A.view = v; try { localStorage.setItem('zia-argent-view', v); } catch (e) {} }
function setFView(v) { F.view = v; try { localStorage.setItem('zia-foi-view', v); } catch (e) {} }
function go(t) {
  if (tab === 'z') zLock();
  if (CVIEWS.includes(t)) t = 'corps';
  if (t === 'arabe' || t === 'habitudes') { setFView(t); if (tab === 'foi') { render(); window.scrollTo(0, 0); return; } t = 'foi'; }
  if (t === 'heures' || t === 'budget') { if (tab === 'argent' && A.view === 'heures' && $('#fDate')) readForm(); setAView(t); if (tab === 'argent') { render(); window.scrollTo(0, 0); return; } t = 'argent'; }
  if (!TABS.includes(t)) return;
  if (t === tab) { window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' }); return; }
  if (tab === 'argent' && A.view === 'heures' && $('#fDate')) readForm();
  tab = t;
  try { localStorage.setItem('zia-tab', t); } catch (e) {}
  history.replaceState(null, '', '#' + t);
  const swap = () => { render(true); window.scrollTo(0, 0); };
  if (document.startViewTransition && !reduceMotion()) document.startViewTransition(swap); else swap();
}

/* ----- Navigation : le noyau et sa roue -----
   Toucher le noyau : la roue s'ouvre, on touche un module.
   Appuyer et glisser : on vise un module et on relâche pour y aller.
   Appui long, ou toucher le noyau quand la roue est ouverte : retour à l'orbite. */
const NAV = [['foi', 'Foi'], ['cycle', 'Cycle'], ['corps', 'Corps'], ['routine', 'Routine'], ['flux', 'Flux'], ['reset', 'Reset'], ['hizya', 'Hizya'], ['appr', 'Apprendre']];
const NAV_A0 = -80, NAV_SPAN = 160;
const W8 = { open: false, hi: null, press: null, lp: 0 };
const navAngle = i => NAV_A0 + NAV_SPAN / (NAV.length - 1) * i;
function coreGlyph() { $('#coreIc').innerHTML = GLYPH[tab === 'orbite' ? 'orbite' : tab] || GLYPH.orbite; }
function buildWheel() {
  const R = Math.max(112, Math.min(150, innerWidth / 2 - 38));
  $('#wheelItems').innerHTML = NAV.map(([k, n], i) => {
    const [x, y] = polar(R, navAngle(i)), locked = k === 'business' && !S.unlocks.business;
    return `<button class="w-item ${k === tab ? 'cur' : ''} ${locked ? 'locked' : ''}" data-nav="${k}" style="--x:${x.toFixed(1)}px;--y:${y.toFixed(1)}px;--i:${i}" aria-label="${n}${locked ? ', verrouillé' : ''}${k === tab ? ', ouvert' : ''}"><svg viewBox="0 0 24 24" aria-hidden="true">${locked ? GLYPH.lock : GLYPH[k]}</svg><span class="w-lbl">${n}</span></button>`;
  }).join('');
  $('#wheelHint').textContent = tab === 'orbite' ? 'Où va-t-on ?' : 'Noyau : jardin';
}
function openWheel() {
  if (W8.open) return;
  buildWheel(); const w = $('#wheel'); w.hidden = false; W8.open = true;
  requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('open')));
  $('#core').setAttribute('aria-expanded', 'true'); haptic();
}
function closeWheel() {
  if (!W8.open) return;
  const w = $('#wheel'); w.classList.remove('open'); W8.open = false; W8.hi = null;
  $('#core').setAttribute('aria-expanded', 'false');
  setTimeout(() => { if (!W8.open) w.hidden = true; }, reduceMotion() ? 0 : 280);
}
function highlight(k) {
  if (W8.hi === k) return; W8.hi = k;
  $$('.w-item').forEach(b => b.classList.toggle('hi', b.dataset.nav === k));
  $('#wheelHint').textContent = k ? NAV.find(n => n[0] === k)[1] : (tab === 'orbite' ? 'Où va-t-on ?' : 'Noyau : jardin');
  if (k) haptic();
}
(function bindCore() {
  const core = $('#core');
  core.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    e.preventDefault();
    const r = core.getBoundingClientRect();
    W8.press = { x: e.clientX, y: e.clientY, cx: r.left + r.width / 2, cy: r.top + r.height / 2, moved: false, wasOpen: W8.open };
    try { core.setPointerCapture(e.pointerId); } catch (err) {}
    if (!W8.open) openWheel();
    clearTimeout(W8.lp);
    W8.lp = setTimeout(() => { const p = W8.press; if (p && !p.moved) { W8.press = null; closeWheel(); go('orbite'); } }, 520);
  });
  core.addEventListener('pointermove', e => {
    const p = W8.press; if (!p) return;
    if (!p.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 12) { p.moved = true; clearTimeout(W8.lp); }
    if (!p.moved) return;
    const dx = e.clientX - p.cx, dy = e.clientY - p.cy;
    if (Math.hypot(dx, dy) < 56) { highlight(null); return; }
    const ang = Math.atan2(dx, -dy) * 180 / Math.PI;
    let best = null, bd = 999;
    NAV.forEach(([k], i) => { const d = Math.abs(navAngle(i) - ang); if (d < bd) { bd = d; best = k; } });
    highlight(bd < 28 ? best : null);
  });
  core.addEventListener('pointerup', () => {
    clearTimeout(W8.lp); const p = W8.press; W8.press = null; if (!p) return;
    if (p.moved) { const k = W8.hi; if (k) { closeWheel(); go(k); } return; }
    if (p.wasOpen) { closeWheel(); go('orbite'); }
  });
  core.addEventListener('pointercancel', () => { clearTimeout(W8.lp); W8.press = null; });
  core.addEventListener('contextmenu', e => e.preventDefault());
  // Clavier et lecteurs d'écran (pas de pointeur)
  core.addEventListener('click', e => { if (e.detail !== 0) return; if (W8.open) closeWheel(); else { openWheel(); const f = $('.w-item'); if (f) setTimeout(() => f.focus(), 60); } });
  $('#wheel').addEventListener('click', e => {
    const b = e.target.closest('[data-nav]');
    if (b) { const k = b.dataset.nav; closeWheel(); go(k); return; }
    if (!e.target.closest('#core')) closeWheel();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && W8.open) { closeWheel(); core.focus(); } });
})();
setInterval(() => { const el = $('#sessEl'); if (el && S.body.active) el.textContent = sessLine(); }, 15000);

document.addEventListener('click', e => {
  const t = e.target, c = sel => t.closest(sel);
  let el;
  if (cycleClick(t)) return;
  if (alifClick(t)) return;
  if (zClick(t)) return;
  if ((el = c('[data-open]'))) { el.dataset.open === 'settings' ? openSettings() : openIdeas(); return; }
  // Foi
  if ((el = c('[data-fview]'))) { go(el.dataset.fview); return; }
  if ((el = c('[data-fstep]'))) { F.day = iso(addDays(parseDate(F.day), Number(el.dataset.fstep))); render(); return; }
  if ((el = c('[data-fday]'))) { F.day = el.dataset.fday; render(); return; }
  if ((el = c('[data-habit]'))) { toggleHabit(el.dataset.habit); return; }
  if ((el = c('[data-prayer]'))) { if (c('.ppick')) return; openPrayerPick(el); return; }
  if ((el = c('[data-pway]'))) { const id = el.dataset.pid, v = el.dataset.pway; closePrayerPick(); setPrayer(F.day, id, v || null); return; }
  if (!c('.ppick') && $('.ppick')) closePrayerPick();
  if ((el = c('[data-mway]'))) {
    const row = el.closest('.mrow'), v = el.dataset.mway; if (row.dataset.done) return;
    row.dataset.done = '1'; $$('button', row).forEach(b => { b.disabled = true; b.classList.toggle('on', b === el); });
    setPrayer(row.dataset.mk, row.dataset.mid, v);
    if ($$('.mrow').every(r => r.dataset.done)) { const b = $('[data-mdone]'); if (b) b.textContent = 'Continuer'; }
    return;
  }
  if (c('[data-mdone]')) { const m = $('#missed'); if (m) { m.classList.add('out'); setTimeout(() => m.remove(), 300); } if ($$('.mrow').some(r => !r.dataset.done)) missedDismissed = true; return; }
  if ((el = c('[data-poff]'))) { const [id, dlt] = el.dataset.poff.split('.'), o = ptConf().off; o[id] = (o[id] || 0) + Number(dlt === '-1' ? -1 : 1); save(); openFaithSetup(); return; }
  if (c('[data-fsetup]')) { openFaithSetup(); return; }
  if (c('[data-hadd]')) { const v = $('#hNew').value.trim(); if (!v) return; S.faith.habits.push({ id: 'h-' + uid(), name: v }); save(); openFaithSetup(); return; }
  if ((el = c('[data-hdel]'))) { S.faith.habits = S.faith.habits.filter(h => h.id !== el.dataset.hdel); save(); openFaithSetup(); return; }
  // Fondations & investissement
  if (c('[data-debtpay]')) {
    const b = budgetOf(A.month), left = b.debt.plan - b.debt.done;
    if (left > 0) { commitKind('debt', left); return; }
    $('#debtCustom').innerHTML = `<div class="confirm"><p class="small">Combien rembourses-tu ?</p><div class="row" style="margin-top:10px"><input id="debtAmt" inputmode="decimal" class="famt num" style="flex:1;text-align:left" placeholder="Montant"><button class="btn sm" data-debtok>Valider</button></div></div>`; $('#debtAmt').focus(); return;
  }
  if (c('[data-openinc]')) { const d = $('#incDetails'); if (d) { d.open = true; A.open.add('inc'); d.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }); const f = d.querySelector('[data-incval]'); if (f) setTimeout(() => f.focus(), 350); } return; }
  if (c('[data-debtcustom]')) { $('#debtCustom').innerHTML = `<div class="confirm"><p class="small">Combien as-tu remboursé ?</p><div class="row" style="margin-top:10px"><input id="debtAmt" inputmode="decimal" class="famt num" style="flex:1;text-align:left" placeholder="Montant"><button class="btn sm" data-debtok>Valider</button></div></div>`; $('#debtAmt').focus(); return; }
  if (c('[data-planedit]')) {
    const b = budgetOf(A.month);
    $('#planEdit').innerHTML = `<div class="srow" style="margin-top:12px"><input id="plDebt" inputmode="decimal" value="${b.plan.debt}" placeholder="Dette €" aria-label="Dette ce mois" style="flex:1"><input id="plSafe" inputmode="decimal" value="${b.plan.safety}" placeholder="Épargne €" aria-label="Épargne ce mois" style="flex:1"><button class="btn sm" data-plansave>OK</button></div><p class="hint" style="margin-top:0">Ne vaut que pour ${monthLabel(A.month)}. Le mois prochain, l'app recalcule en tenant compte de ce que tu as vraiment versé.</p>`;
    $('#plDebt').focus(); return;
  }
  if (c('[data-plansave]')) {
    const st = S.money.months[A.month] = S.money.months[A.month] || {};
    st.plan = { debt: $('#plDebt').value.trim().replace(/\s/g, '').replace(',', '.'), safety: $('#plSafe').value.trim().replace(/\s/g, '').replace(',', '.') };
    save(); render(); toast('Plan du mois modifié'); return;
  }
  if (c('[data-planreset]')) { const st = S.money.months[A.month]; if (st) delete st.plan; save(); render(); toast('Retour au calcul automatique'); return; }
  if (c('[data-debtok]')) { commitKind('debt', numv($('#debtAmt').value.replace(/\s/g, ''))); return; }
  if ((el = c('[data-invest]'))) { $('#invCustom').innerHTML = `<div class="confirm"><p class="small">Montant investi aujourd'hui</p><div class="row" style="margin-top:10px"><input id="invAmt" inputmode="decimal" class="famt num" style="flex:1;text-align:left" placeholder="Montant"><button class="btn sm" data-invok="${el.dataset.invest}">Valider</button></div></div>`; $('#invAmt').focus(); return; }
  if ((el = c('[data-invok]'))) { commitKind('invest', numv($('#invAmt').value.replace(/\s/g, '')), el.dataset.invok); return; }
  if (c('[data-invsetup]')) { openInvestSetup(); return; }
  if (c('[data-invadd]')) { S.money.investments.push({ id: 'inv-' + uid(), name: '', type: 'etf', start: '', value: '' }); save(); openInvestSetup(); return; }
  if ((el = c('[data-invdel]'))) { S.money.investments = S.money.investments.filter(i => i.id !== el.dataset.invdel); save(); openInvestSetup(); return; }
  // Flux
  if (tab === 'flux') {
    if ((el = c('[data-fexp]'))) { const x = el.nextElementSibling; x.classList.toggle('on'); el.textContent = x.classList.contains('on') ? 'Refermer' : (el.closest('.fc-hadith') ? 'Méditer' : 'Comprendre'); return; }
    if ((el = c('[data-fsave]'))) { lastPt = lastPt || null; fxSave(el); return; }
    if ((el = c('[data-fcopy]'))) { const cc = fxCardOf(el.closest('.fc')); if (cc) (navigator.clipboard ? navigator.clipboard.writeText(fxText(cc)) : Promise.reject()).then(() => toast('Copié')).catch(() => toast('Copie impossible sur cet appareil.')); return; }
    if (c('[data-fsaved]')) { openSaved(); return; }
    if ((el = c('[data-fq],[data-fv]'))) { fxAnswer(el); return; }
    if ((el = c('[data-far]'))) { fxArabic(el); return; }
    if (c('[data-fnext]')) { const f = $('#feed'); f.scrollBy({ top: f.clientHeight, behavior: reduceMotion() ? 'auto' : 'smooth' }); return; }
    if ((el = c('.fc')) && !c('button,a,input')) { const now = Date.now(); if (FXS.tap && now - FXS.tap < 330 && FXS.tapEl === el) { FXS.tap = 0; fxSave(el); } else { FXS.tap = now; FXS.tapEl = el; } return; }
  }
  if ((el = c('[data-funsave]'))) { S.flux.saved = S.flux.saved.filter(x => x !== el.dataset.funsave); save(); openSaved(); const b = $(`.fc[data-fid="${el.dataset.funsave}"] [data-fsave]`); if (b) { b.setAttribute('aria-pressed', 'false'); $('span', b).textContent = 'Garder'; } return; }
  // Corps
  if ((el = c('[data-cview]'))) { go(el.dataset.cview); return; }
  if ((el = c('[data-phase]'))) {
    const id = Number(el.dataset.phase), st = phaseStatus(id);
    if (st.open) { if (S.body.phase !== id) { S.body.phase = id; save(); haptic(); render(); toast(`Étape ${phaseOf(id).name} choisie`); } return; }
    toast(`${phaseOf(id).name} : ${st.need - st.n > 0 ? `encore ${st.need - st.n} séance${st.need - st.n > 1 ? 's' : ''} de ${phaseOf(UNLOCK[id].from).name}` : ''}${id === 2 && !S.body.gym ? `${st.need - st.n > 0 ? ' et ' : ''}l'inscription à la salle` : ''}.`); return;
  }
  if (c('[data-cstart]')) { startSession(); return; }
  if ((el = c('[data-set]'))) { const [id, i] = el.dataset.set.split('.'); doSet(id, Number(i)); return; }
  if ((el = c('[data-lvl]'))) { const [id, d] = el.dataset.lvl.split('.'), e = EX[id]; S.body.level[id] = Math.max(0, Math.min(e.v.length - 1, (S.body.level[id] || 0) + Number(d))); save(); haptic(); const sy = window.scrollY; render(); window.scrollTo(0, sy); return; }
  if (c('[data-cfinish]')) { finishSession(); return; }
  if (c('[data-cabort]')) { toast('Abandonner cette séance ?', 'Oui', () => { stopRest(); S.body.active = null; save(); render(); window.scrollTo(0, 0); }, 6000); return; }
  if ((el = c('[data-rest]'))) { const v = Number(el.dataset.rest); if (!v) stopRest(); else { RT.end += v * 1000; RT.total += v; } return; }
  if (c('[data-cbody]')) {
    const w = numv($('#cbW').value.replace(/\s/g, '')), h = numv($('#cbH').value.replace(/\s/g, '')), a = numv($('#cbA').value);
    if (!(w > 30 && w < 250) || !(h > 120 && h < 230)) { toast('Indique un poids et une taille valides.'); return; }
    const pr = S.body.profile; pr.height = String(h); pr.age = String(a || 24); pr.fast = $('#cbF').checked;
    if (!S.body.weights.length || Math.abs(bodyWeight() - w) > .01) { const k = todayISO(); S.body.weights = S.body.weights.filter(x => x.date !== k); S.body.weights.push({ date: k, kg: w }); }
    pr.weight = String(w); C.edit = false; save(); askPersist(); render(); window.scrollTo(0, 0); toast('Cible calculée'); return;
  }
  if (c('[data-cbodyx]')) { C.edit = false; render(); return; }
  if (c('[data-cedit]')) { C.edit = true; render(); window.scrollTo(0, 0); return; }
  if ((el = c('[data-food]'))) { const f = FOODS.find(x => x[0] === el.dataset.food); if (f) addFood(f[0], f[1]); return; }
  if (c('[data-fcustom]')) { const g = Math.round(numv($('#fCustom').value.replace(/\s/g, ''))); if (!(g > 0 && g < 300)) { toast('Indique des grammes de protéines.'); return; } addFood('Autre', g); return; }
  if (c('[data-fall]')) { C.allFoods = !C.allFoods; const sy = window.scrollY; render(); window.scrollTo(0, sy); return; }
  if ((el = c('[data-fdel]'))) { const d = S.body.food[todayISO()]; if (!d) return; const i = Number(el.dataset.fdel), [r] = d.log.splice(i, 1); d.p = d.log.reduce((m, x) => m + x[1], 0); save(); const sy = window.scrollY; render(); window.scrollTo(0, sy); toast(`${r[0]} retiré`, 'Annuler', () => { d.log.splice(i, 0, r); d.p = d.log.reduce((m, x) => m + x[1], 0); save(); render(); }); return; }
  if ((el = c('[data-water]'))) { const k = todayISO(), d = S.body.food[k] = S.body.food[k] || { p: 0, water: 0, log: [] }, n = Number(el.dataset.water); const before = d.water; d.water = d.water === n ? n - 1 : n; save(); haptic(); const sy = window.scrollY; render(); window.scrollTo(0, sy); const tw = (bodyTargets() || { water: 8 }).water; if (before < tw && d.water >= tw) reward(2, { msg: ['Hydratation complète', 'Bien joué.'] }); else if (before >= tw && d.water < tw) unreward(2); return; }
  if (c('[data-wsave]')) {
    const w = numv($('#wIn').value.replace(/\s/g, '')); if (!(w > 30 && w < 250)) { toast('Indique ton poids en kg.'); return; }
    const k = todayISO(); S.body.weights = S.body.weights.filter(x => x.date !== k); S.body.weights.push({ date: k, kg: w }); S.body.profile.weight = String(w);
    save(); askPersist(); haptic(); render(); toast('Pesée enregistrée'); return;
  }
  if (c('[data-wdel]')) { const ws = sortedWeights(), l = ws[ws.length - 1]; if (!l) return; S.body.weights = S.body.weights.filter(x => x !== l); save(); render(); toast('Pesée supprimée', 'Annuler', () => { S.body.weights.push(l); save(); render(); }); return; }
  if ((el = c('[data-kadj]'))) { const pr = S.body.profile; pr.adj = numv(pr.adj) + Number(el.dataset.kadj); pr.adjAt = todayISO(); save(); render(); toast(`Cible ajustée : ${bodyTargets().kcal.toLocaleString('fr-FR')} kcal`); return; }
  if ((el = c('[data-sleep]'))) {
    const k = todayISO(), v = el.dataset.sleep, cur = S.body.sleep[k] || 420;
    const was = sleepTot(k);
    S.body.sleep[k] = v[0] === '=' ? Number(v.slice(1)) : Math.max(60, Math.min(720, cur + (S.body.sleep[k] ? Number(v) : 0)));
    save(); haptic();
    const now = sleepTot(k); if (was < 420 && now >= 420) reward(2); else if (was >= 420 && now < 420) unreward(2); const sy = window.scrollY; render(); window.scrollTo(0, sy); return;
  }
  if ((el = c('[data-nap]'))) {
    const k = todayISO(), was = sleepTot(k), v = Number(el.dataset.nap);
    S.body.nap = S.body.nap || {}; if (v) S.body.nap[k] = v; else delete S.body.nap[k];
    save(); haptic();
    const now = sleepTot(k); if (was < 420 && now >= 420) reward(2); else if (was >= 420 && now < 420) unreward(2); const sy = window.scrollY; render(); window.scrollTo(0, sy); return;
  }
  if ((el = c('[data-wake]'))) { S.body.wake = el.dataset.wake; save(); const sy = window.scrollY; render(); window.scrollTo(0, sy); return; }
  if ((el = c('[data-fitra]'))) {
    const id = el.dataset.fitra, h = S.body.fitra[id] = S.body.fitra[id] || [], k = todayISO();
    if (h[h.length - 1] === k) { h.pop(); save(); render(); unreward(2); toast('Annulé'); return; }
    h.push(k); if (h.length > 8) h.shift(); save(); const sy = window.scrollY; render(); window.scrollTo(0, sy);
    reward(2); return;
  }
  if (c('[data-caresetup]')) { openCareSetup(); return; }
  if (c('[data-cadd]')) { const v = $('#cNew').value.trim(); if (!v) return; S.body.care.list.push({ id: 'c-' + uid(), name: v }); save(); openCareSetup(); return; }
  if ((el = c('[data-cdel]'))) { S.body.care.list = S.body.care.list.filter(x => x.id !== el.dataset.cdel); save(); openCareSetup(); return; }
  // Business
  if (c('[data-padd]')) { S.biz.projects.push({ id: 'p-' + uid(), name: '', stage: 0, next: '' }); save(); render(); const ins = $$('.proj-name'); if (ins.length) ins[ins.length - 1].focus(); return; }
  if ((el = c('[data-pdel]'))) { const i = S.biz.projects.findIndex(p => p.id === el.dataset.pdel); const [r] = S.biz.projects.splice(i, 1); save(); render(); toast('Projet supprimé', 'Annuler', () => { S.biz.projects.splice(i, 0, r); save(); render(); }); return; }
  if ((el = c('[data-pstage]'))) { const [id, st] = el.dataset.pstage.split('.'); const p = S.biz.projects.find(x => x.id === id); if (p) { p.stage = Number(st); save(); haptic(); render(); } return; }
  // Argent · budget
  if ((el = c('[data-aview]'))) { go(el.dataset.aview); return; }
  if (c('[data-bsetup]')) { openBudgetSetup(); return; }
  if ((el = c('[data-bnav]'))) { const d = parseDate(A.month + '-01'); d.setMonth(d.getMonth() + Number(el.dataset.bnav)); A.month = iso(d).slice(0, 7); A.catFilter = 'all'; render(); return; }
  if ((el = c('[data-bkind]'))) { A.kind = el.dataset.bkind; A.cat = A.kind === 'exp' ? 'courses' : 'virement'; const v = $('#bAmount').value; render(); $('#bAmount').value = v; return; }
  if ((el = c('[data-bcat]'))) { A.cat = el.dataset.bcat; $$('[data-bcat]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); haptic(); return; }
  if (c('#bAdd')) { addTx(); return; }
  if ((el = c('[data-psave]'))) { potSave(el.dataset.psave, !!el.dataset.custom); return; }
  if ((el = c('[data-potok]'))) { commitPot(el.dataset.potok, numv($('#potAmt').value.replace(/\s/g, '')), 'save'); return; }
  if ((el = c('[data-potwd]'))) { commitPot(el.dataset.potwd, numv($('#potAmt').value.replace(/\s/g, '')), 'withdraw'); return; }
  if ((el = c('[data-tx]'))) { openTx(el.dataset.tx); return; }
  if ((el = c('[data-txcat]'))) { $$('[data-txcat]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); return; }
  if (c('#txSave')) {
    const t = S.money.tx.find(x => x.id === $('#shiftSheetBody').dataset.tx); if (!t) return;
    const a = numv($('#txAmt').value.replace(/\s/g, '')); if (!(a > 0)) { toast('Entre un montant.'); return; }
    t.amount = Math.round(a * 100) / 100; const cb = $('[data-txcat][aria-pressed="true"]'); if (cb) t.cat = cb.dataset.txcat;
    t.note = $('#txNote').value.trim(); t.date = $('#txDate').value || t.date; save(); $('#shiftSheet').close(); render(); toast('Mouvement modifié'); return;
  }
  if (c('#txDel')) {
    const i = S.money.tx.findIndex(x => x.id === $('#shiftSheetBody').dataset.tx); if (i < 0) return;
    const [r] = S.money.tx.splice(i, 1); save(); $('#shiftSheet').close(); render();
    toast('Mouvement supprimé', 'Annuler', () => { S.money.tx.push(r); save(); render(); }, 6000); return;
  }
  if (c('#bCsv')) { exportBudgetCSV(); return; }
  if ((el = c('[data-bfilter]'))) { A.catFilter = el.dataset.bfilter; render(); return; }
  if ((el = c('[data-madd]'))) {
    const l = el.dataset.madd, id = l.slice(0, 3) + '-' + uid();
    S.money[l].push(l === 'incomes' ? { id, label: '', amount: '', day: 1, src: '' } : l === 'fixed' ? { id, label: '', amount: '', day: 1 } : l === 'pots' ? { id, name: '', target: '', start: '', monthly: '', deadline: '' } : { id, cat: 'sorties', limit: '' });
    save(); openBudgetSetup(); const inputs = $$(`[data-mset^="${l}.${id}."]`); if (inputs[0]) inputs[0].focus(); return;
  }
  if ((el = c('[data-mdel]'))) { const [l, id] = el.dataset.mdel.split('.'); S.money[l] = S.money[l].filter(x => x.id !== id); save(); openBudgetSetup(); return; }
  if (c('[data-close]')) { c('dialog').close(); return; }
  if (c('[data-export]')) { exportData(); return; }
  if (c('#importBtn')) { $('#importFile').click(); return; }
  if (c('#impYes')) { applyImport(); return; }
  if (c('#impNo')) { pendingImport = null; $('#importConfirm').innerHTML = ''; return; }
  if ((el = c('[data-seen]'))) { S.seen[el.dataset.seen] = true; save(); const box = c('.coach'); box.style.transition = 'opacity .25s,transform .25s'; box.style.opacity = 0; box.style.transform = 'translateY(-6px)'; setTimeout(() => render(), reduceMotion() ? 0 : 250); return; }
  if ((el = c('[data-unseen]'))) { delete S.seen[el.dataset.unseen]; save(); render(); return; }
  if (c('[data-ydone]')) { S.nour.seen = todayISO(); save(); const y = c('.yday'); y.style.transition = 'opacity .25s'; y.style.opacity = 0; setTimeout(() => render(), reduceMotion() ? 0 : 250); return; }
  if ((el = c('[data-goto]'))) { go(el.dataset.goto); return; }
  if ((el = c('[data-calib]'))) {
    const k = el.dataset.calib, b = numv($(`#cb-${k}`).value.replace(/\s/g, '')), n = numv($(`#cn-${k}`).value.replace(/\s/g, ''));
    if (!b || !n || n >= b) { toast('Indique un brut et un net valides.'); return; }
    S.settings.cotis[k] = Math.round((1 - n / b) * 1000) / 10; save(); openSettings(); if (tab === 'argent') render();
    toast(`Cotisations ${EMP[k]} : ${String(S.settings.cotis[k]).replace('.', ',')} %`); return;
  }
  // Parcours
  if ((el = c('[data-pstep]'))) { selectMonth(P.sel + Number(el.dataset.pstep)); return; }
  if (c('#pnow')) { selectMonth(currentMonth()); return; }
  // Arabe
  if ((el = c('[data-q]'))) { answerQuiz(el); return; }
  if (c('#qgo')) { nextQuiz(true); return; }
  if ((el = c('[data-star]'))) { showStar(Number(el.dataset.star)); return; }
  if ((el = c('[data-fw]'))) { if ($('#fatiha').classList.contains('hide')) { el.classList.toggle('shown'); haptic(); } return; }
  if (c('#toggleFat')) { S.hideFatiha = !S.hideFatiha; save(); $('#fatiha').classList.toggle('hide', S.hideFatiha); $$('.w.shown').forEach(w => w.classList.remove('shown')); const b = $('#toggleFat'); b.textContent = S.hideFatiha ? 'Montrer le sens' : 'Cacher le sens'; b.setAttribute('aria-pressed', S.hideFatiha); $('#fatHint').textContent = S.hideFatiha ? 'Touche un mot pour révéler sa traduction.' : 'Mot à mot. Cache le sens pour te tester.'; return; }
  if ((el = c('[data-taj]'))) {
    const tj = S.tajwid; tj.done = Math.max(0, tj.done + Number(el.dataset.taj)); if (tj.total) tj.done = Math.min(tj.done, tj.total);
    save(); haptic(); $('#tajDone').innerHTML = `${tj.done}<small> / ${tj.total || '—'}</small>`; $('#tajBar').style.width = `${tj.total ? Math.min(100, tj.done / tj.total * 100) : 0}%`; return;
  }
  // Routine
  if ((el = c('[data-block]'))) { toggleBlock(Number(el.dataset.block)); return; }
  if ((el = c('[data-day]'))) { const k = el.dataset.day; if (S.days[k]) { delete S.days[k]; S.blocks[k] = [0, 0, 0, 0]; } else { S.days[k] = true; S.blocks[k] = [1, 1, 1, 1]; haptic(); } save(); render(); return; }
  // Heures
  if ((el = c('[data-emp]'))) { readForm(); const l = lastShift(el.dataset.emp); H.form.emp = el.dataset.emp; if (l) { H.form.start = l.start; H.form.end = l.end; H.form.pause = Number(l.pause) || 0; } else { const fr = freshForm(el.dataset.emp); H.form.start = fr.start; H.form.end = fr.end; } $$('[data-emp]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); updateDial(); $('#fPause').textContent = `${H.form.pause} min`; haptic(); return; }
  if ((el = c('[data-pause]'))) { H.form.pause = Math.max(0, (Number(H.form.pause) || 0) + Number(el.dataset.pause)); $('#fPause').textContent = `${H.form.pause} min`; updateDial(); return; }
  if (c('#saveShift')) { saveShift(); return; }
  if (c('#dupShift')) { dupLast(); return; }
  if ((el = c('[data-arch]'))) { H.month = el.dataset.arch; $('#month').innerHTML = vMonth(); $('#month').scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }); return; }
  if ((el = c('[data-mnav]'))) { const d = parseDate(H.month + '-01'); d.setMonth(d.getMonth() + Number(el.dataset.mnav)); H.month = iso(d).slice(0, 7); $('#month').innerHTML = vMonth(); return; }
  if ((el = c('[data-filter]'))) { H.filter = el.dataset.filter; $('#month').innerHTML = vMonth(); return; }
  if (c('#csv')) { exportCSV(); return; }
  if ((el = c('[data-edit]'))) { openShift(el.dataset.edit); return; }
  if ((el = c('[data-eemp]'))) { $$('[data-eemp]').forEach(b => b.setAttribute('aria-pressed', String(b === el))); return; }
  if (c('#eSave')) { commitShiftEdit(); return; }
  if (c('#eDel')) { deleteShift(); return; }
  // Idées
  if (c('#ideaAdd')) {
    const v = $('#ideaText').value.trim(); if (!v) return;
    const btn = $('#ideaAdd'); btn.disabled = true;
    (/\s/.test(v) ? Promise.resolve(false) : zTry(v)).then(ok => {
      btn.disabled = false;
      if (ok) { $('#ideaText').value = ''; if ($('#ideasSheet').open && $('#ideasSheet').dataset.mode !== 'z') $('#ideasSheet').close(); return; }
      S.ideas.push({ id: uid(), text: v, created: Date.now() }); save(); haptic(); openIdeas(); $('#ideaText').focus();
    });
    return;
  }
  if ((el = c('[data-idel]'))) { const i = S.ideas.findIndex(x => x.id === el.dataset.idel); const [r] = S.ideas.splice(i, 1); save(); openIdeas(); toast('Idée supprimée', 'Annuler', () => { S.ideas.push(r); save(); if ($('#ideasSheet').open) openIdeas(); }); return; }
  if (c('#ideaCopy')) {
    const txt = S.ideas.slice().sort((a, b) => a.created - b.created).map(i => `- ${i.text}`).join('\n');
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast('Idées copiées')).catch(() => toast('Copie impossible sur cet appareil.'));
  }
});
document.addEventListener('keydown', e => {
  const t = e.target;
  if ((e.key === 'Enter' || e.key === ' ') && t.matches && t.matches('[data-planet],[data-moon],.seg-arc,[data-phase],[data-sun]')) {
    e.preventDefault();
    if (t.hasAttribute('data-sun')) { go('flux'); return; }
    if (t.dataset.phase) { t.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
    if (t.dataset.planet) go(t.dataset.planet); else if (t.dataset.moon) selectMonth(Number(t.dataset.moon)); else toggleBlock(Number(t.dataset.block));
  }
  if (e.key === 'Enter' && t.id === 'fNote') { e.preventDefault(); saveShift(); }
  if (e.key === 'Enter' && (t.id === 'bAmount' || t.id === 'bNote')) { e.preventDefault(); addTx(); }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (cycleChange(t)) return;
  if (zChange(t)) return;
  if (t.dataset.chk) {
    if (t.checked) S.checks[t.dataset.chk] = true; else delete S.checks[t.dataset.chk];
    save(); askPersist(); refreshParcours(); if (t.checked) reward(3); else unreward(3); return;
  }
  if (t.dataset.increc) {
    const ym = A.month, st = S.money.months[ym] = S.money.months[ym] || {}; st.inc = st.inc || {};
    if (t.checked) { const i = S.money.incomes.find(x => x.id === t.dataset.increc), e = expectedIncome(i).v; if (!e) { t.checked = false; const inp = $('#inc-' + i.id); if (inp) inp.focus(); toast('Tape le montant reçu à droite.'); return; } st.inc[i.id] = Math.round(e * 100) / 100; haptic(); } else delete st.inc[t.dataset.increc];
    save(); render(); return;
  }
  if (t.hasAttribute && (t.hasAttribute('data-carry') || t.hasAttribute('data-carryneg'))) {
    const st = S.money.months[A.month] = S.money.months[A.month] || {};
    const neg = $('[data-carryneg]').checked, v = numv(($('#carryAmt').value || '').replace(/\s/g, '').replace('-', ''));
    st.carryNeg = neg; st.carry = v ? String(neg ? -v : v) : '';
    save(); render(); return;
  }
  if (t.dataset.incval) {
    const ym = A.month, st = S.money.months[ym] = S.money.months[ym] || {}; st.inc = st.inc || {};
    const v = t.value.trim(); if (v === '') delete st.inc[t.dataset.incval]; else st.inc[t.dataset.incval] = numv(v.replace(/\s/g, ''));
    save(); render(); return;
  }
  if (t.dataset.fpaid) { const st = S.money.months[A.month] = S.money.months[A.month] || {}; st.paid = st.paid || {}; if (t.checked) { st.paid[t.dataset.fpaid] = true; haptic(); } else delete st.paid[t.dataset.fpaid]; save(); render(); return; }
  if (t.dataset.mset) { mset(t.dataset.mset, t.value); return; }
  if (t.id === 'mAuto') { S.money.auto = t.checked; save(); openBudgetSetup(); return; }
  if (t.id === 'mLife') { S.money.life = t.value.trim().replace(/\s/g, '').replace(',', '.'); save(); openBudgetSetup(); return; }
  if (t.dataset.habitc) { toggleHabit(t.dataset.habitc); return; }
  if (t.dataset.care) {
    const k = todayISO(), l = S.body.care.log[k] = S.body.care.log[k] || {}, wasAll = S.body.care.list.every(x => l[x.id]);
    if (t.checked) l[t.dataset.care] = true; else delete l[t.dataset.care];
    if (!Object.keys(l).length) delete S.body.care.log[k]; save(); render();
    const cl = S.body.care.log[k] || {}, all = S.body.care.list.every(x => cl[x.id]);
    if (t.checked) { if (all) reward(4, { msg: ['Hygiène du jour complète', 'La propreté est la moitié de la foi. (Muslim)'] }); else reward(1); } else unreward(1 + (wasAll ? 3 : 0));
    return;
  }
  if (t.dataset.ghusl) { const fri = iso(addDays(mondayOf(new Date()), 4)); if (t.checked) { S.body.ghusl[fri] = true; } else delete S.body.ghusl[fri]; save(); render(); if (t.checked) reward(3); else unreward(3); return; }
  if (t.dataset.cset) { const x = S.body.care.list.find(y => y.id === t.dataset.cset); if (x && t.value.trim()) { x.name = t.value.trim(); save(); } return; }
  if (t.id === 'gymSw') { S.body.gym = t.checked; save(); render(); if (t.checked) toast('Noté. La salle s\'ouvre après tes 12 séances de Réveil.'); return; }
  if (t.id === 'bedWake' && t.value) { S.body.wake = t.value; save(); const sy = window.scrollY; render(); window.scrollTo(0, sy); return; }
  if (t.dataset.hset) { const h = S.faith.habits.find(x => x.id === t.dataset.hset); if (h && t.value.trim()) { h.name = t.value.trim(); save(); } return; }
  if (t.dataset.dset) { S.money.debt[t.dataset.dset] = t.value.trim().replace(/\s/g, '').replace(',', '.'); save(); return; }
  if (t.hasAttribute && t.hasAttribute('data-sgoal')) { S.money.safetyGoal = t.value.trim().replace(/\s/g, '').replace(',', '.') || '4000'; const p = S.money.pots.find(x => x.safety); if (p) p.target = S.money.safetyGoal; save(); return; }
  if (t.dataset.iset) { const [id, k] = t.dataset.iset.split('.'), i = S.money.investments.find(x => x.id === id); if (i) { i[k] = k === 'name' || k === 'type' ? t.value : t.value.trim().replace(/\s/g, '').replace(',', '.'); save(); } return; }
  if (t.dataset.pset) { const [id, k] = t.dataset.pset.split('.'), p = S.biz.projects.find(x => x.id === id); if (p) { p[k] = t.value; save(); } return; }
  if (t.dataset.sour) { if (t.checked) S.sourates[t.dataset.sour] = true; else delete S.sourates[t.dataset.sour]; save(); if (t.checked) haptic(); $('#sourN').textContent = `${SOURATES.filter(s => S.sourates[s[1]]).length} / ${SOURATES.length}`; return; }
  if (t.id === 'tajTotal') { S.tajwid.total = Math.max(0, parseInt(t.value, 10) || 0); if (S.tajwid.total) S.tajwid.done = Math.min(S.tajwid.done, S.tajwid.total); save(); render(); return; }
  if (t.id === 'fDate') { const h = holidayName(t.value); $('#fFerie').checked = !!h; $('#ferieName').textContent = h || ''; readForm(); updateDial(); return; }
  if (t.id === 'fStart' || t.id === 'fEnd') { if (t.value) { H.form[t.id === 'fStart' ? 'start' : 'end'] = t.value; updateDial(); } return; }
  if (t.dataset.slip) {
    const k = `${H.month}|${t.dataset.slip}`, v = t.value.trim();
    if (v && parseHours(v) == null) { toast('Écris les heures comme 151,67 ou 151h40.'); return; }
    if (v) S.payslips[k] = v; else delete S.payslips[k];
    save(); $('#month').innerHTML = vMonth(); return;
  }
  if (t.dataset.set) { const raw = t.value.trim(); setPath(S.settings, t.dataset.set, /^counter/.test(t.dataset.set) ? raw : raw.replace(',', '.')); save(); if (tab === 'argent' || tab === 'orbite') render(); return; }
  if (t.id === 'sNs' && t.value) { S.settings.nightStart = t.value; save(); if (tab === 'argent') render(); return; }
  if (t.id === 'sNe' && t.value) { S.settings.nightEnd = t.value; save(); if (tab === 'argent') render(); return; }
  if (t.id === 'sStart' && t.value) { S.start = t.value; P.sel = null; save(); render(); return; }
  if (t.id === 'importFile' && t.files[0]) { const r = new FileReader(); r.onload = () => handleImport(r.result); r.readAsText(t.files[0]); t.value = ''; }
});
let noteTimer = null;
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.note) { S.notes[t.dataset.note] = t.value; clearTimeout(noteTimer); noteTimer = setTimeout(save, 400); const s4 = $('#step4'); if (s4) s4.classList.toggle('ok', !!t.value.trim()); return; }
  if ((t.id === 'fStart' || t.id === 'fEnd') && t.value) { H.form[t.id === 'fStart' ? 'start' : 'end'] = t.value; updateDial(); }
});
$$('dialog.sheet').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));
document.addEventListener('toggle', e => { const d = e.target; if (d.dataset && d.dataset.flow) { if (d.open) A.open.add(d.dataset.flow); else A.open.delete(d.dataset.flow); } }, true);
$('#ideasSheet').addEventListener('close', () => { if ($('#ideasSheet').dataset.mode === 'bsetup') { delete $('#ideasSheet').dataset.mode; render(); } });
let lastDay = todayISO();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') { stopOrbit(); if (tab === 'z') { zLock(); tab = 'orbite'; render(); } return; }
  missedDismissed = false; if (tab === 'orbite' || tab === 'foi') setTimeout(missedOverlay, 700);
  if (todayISO() !== lastDay) { lastDay = todayISO(); H.form = null; H.month = todayISO().slice(0, 7); A.month = H.month; P.sel = null; render(); }
  else if (tab === 'orbite') startOrbit();
});
window.addEventListener('resize', () => { if (W8.open) buildWheel(); });

/* =====================================================================
   16. DÉMARRAGE
   ===================================================================== */
(function intro() {
  const el = document.getElementById('intro'); if (!el) return;
  const done = () => { if (el.parentNode) el.remove(); };
  el.addEventListener('click', () => { el.classList.add('skip'); setTimeout(done, 320); });
  el.addEventListener('animationend', e => { if (e.animationName === 'iout') done(); });
  setTimeout(done, 3200);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
})();
(async function boot() {
  S = await loadState();
  save(true);
  let t = location.hash.slice(1);
  if (t === 'arabe' || t === 'habitudes') { setFView(t); t = 'foi'; }
  if (t === 'heures' || t === 'budget') { setAView(t); t = 'argent'; }
  if (CVIEWS.includes(t)) { setCView(t); t = 'corps'; }
  if (!TABS.includes(t)) { try { t = localStorage.getItem('zia-tab'); } catch (e) {} }
  if (t === 'heures' || t === 'budget') { setAView(t); t = 'argent'; }
  tab = TABS.includes(t) ? t : 'orbite';
  render(true);
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw && nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) toast('Nouvelle version disponible', 'Recharger', () => nw.postMessage('skipWaiting'), 15000);
        });
      });
    }).catch(() => {});
    let reloaded = false; const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; save(true); location.reload(); } });
  }
})();
window.__sdp = { bodyTargets, weightVerdict, suggest, weekSessions, phaseStatus, calc, sumShifts, money, gareCounter, budgetOf, autoPlan, A, faithScore, bizStatus, investStatus, parseHours, fmtH, holidayName, save, get S() { return S; } };
const Z_MOD = '';
