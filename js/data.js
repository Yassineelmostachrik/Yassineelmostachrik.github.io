/*
  Données du portfolio — c'est le seul fichier à modifier pour ajouter un projet.

  Pour ajouter un projet : copie un bloc { ... } dans PROJECTS et change les valeurs.
    - category : un mot court (SOC, IA, Blockchain, CTF…). Les filtres sont créés automatiquement.
    - links    : optionnel. Exemple : [{ label: "Code source", url: "https://github.com/..." }]
    - bullets  : 2 à 4 phrases, ce que TU as fait (pas ce que fait l'outil).
*/

window.SITE = {
  github: "https://github.com/Yassineelmostachrik",
  linkedin: "", // colle ici l'adresse complète de ton profil LinkedIn ; le lien apparaît tout seul
  email: "yassineelmostachrik6@gmail.com",
};

window.PROJECTS = [
  {
    title: "SIEM Lab : détection d'attaques réseau",
    year: "2025",
    category: "SOC",
    stack: ["Wazuh", "Kali Linux", "Ubuntu", "MITRE ATT&CK"],
    bullets: [
      "Lab Kali / Ubuntu : attaques Hydra SSH, Nmap et escalade de privilèges.",
      "Corrélation des alertes dans Wazuh et cartographie sur MITRE ATT&CK.",
    ],
    links: [],
  },
  {
    title: "AI Cyber Shield : système anti-spam intelligent",
    year: "2026",
    category: "IA",
    stack: ["Python", "BERT", "PyTorch", "FastAPI", "SMTP", "Sendmail", "React", "PostgreSQL", "Docker"],
    bullets: [
      "Plateforme anti-spam basée sur le fine-tuning de BERT : 97,8 % de précision, F1-score de 0,976.",
      "Pipeline SMTP avec un filtre Milter Python, une API FastAPI et Sendmail pour détecter et bloquer les e-mails indésirables.",
      "Déploiement avec Docker Compose et tableau de bord React/TypeScript pour suivre les e-mails et les statistiques en temps réel.",
    ],
    links: [],
  },
  {
    title: "MedChain : rendez-vous médicaux sur la blockchain",
    year: "2026",
    category: "Blockchain",
    stack: ["Solidity", "React.js", "Web3.js", "MetaMask", "Ganache", "EVM"],
    bullets: [
      "Application décentralisée (dApp) pour gérer les rendez-vous médicaux.",
      "Smart contract Solidity avec gestion des rôles (médecin, patient, administrateur), statuts de rendez-vous et modificateurs de sécurité.",
      "Intégration de MetaMask via Web3.js, tests sur une blockchain locale Ganache.",
    ],
    links: [],
  },
  {
    title: "CTF et serious games",
    year: "2025–2026",
    category: "CTF",
    stack: ["ctf.cyber.ma", "CTF ENSI 2026", "KASBAH EMSI"],
    bullets: [
      "10 challenges résolus (web, reverse, forensic) : SQLi, IDOR, tokens Flask, désérialisation Pickle, RCE, bypass de sandbox AST.",
      "KASBAH EMSI : serious game de gestion de crise cyber, organisé avec Cybersup.",
    ],
    links: [],
  },
];

/* Tactiques MITRE ATT&CK (matrice Enterprise). `lit` = couvert par une règle que j'ai écrite. */
window.ATTACK = [
  { id: "TA0043", name: "Recon­naissance" }, // ­ = coupure possible pour tenir dans la colonne
  { id: "TA0042", name: "Resource Development" },
  { id: "TA0001", name: "Initial Access" },
  { id: "TA0002", name: "Execution" },
  { id: "TA0003", name: "Persistence" },
  { id: "TA0004", name: "Privilege Escalation" },
  { id: "TA0005", name: "Defense Evasion" },
  { id: "TA0006", name: "Credential Access", lit: { id: "T1110", name: "Brute Force", note: "brute-force SSH" } },
  { id: "TA0007", name: "Discovery", lit: { id: "T1046", name: "Network Service Discovery", note: "scans réseau" } },
  { id: "TA0008", name: "Lateral Movement" },
  { id: "TA0009", name: "Collection" },
  { id: "TA0011", name: "Command and Control" },
  { id: "TA0010", name: "Exfiltration" },
  { id: "TA0040", name: "Impact" },
];
