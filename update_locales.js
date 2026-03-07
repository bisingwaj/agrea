const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, 'src/locales/fr.ts');
const enPath = path.join(__dirname, 'src/locales/en.ts');
const zhPath = path.join(__dirname, 'src/locales/zh.ts');

const sectorsFr = `
    sectors: {
        "creation-entreprise": { name: "Création d'Entreprise", desc: "Immatriculation au RCCM, identification nationale et enregistrements fiscaux initiaux." },
        "btp": { name: "BTP & Construction", desc: "Permis de construire, agréments techniques, études d'impact et conformités environnementales." },
        "marches-publics": { name: "Marchés Publics", desc: "Attestations fiscales, certificats ARMP, DGI, CNSS et qualification de soumissionnaire." },
        "import-export": { name: "Import & Export", desc: "Licences d'importation, certificats d'origine, numéros import-export et dédouanement." },
        "sante": { name: "Santé & Pharmacie", desc: "Ouverture de cliniques, licences d'officine, enregistrement de médicaments et autorisations d'exercice." },
        "transport": { name: "Transport & Logistique", desc: "Licences de transport routier, fluvial, immatriculation de flottes et permis de conduire professionnels." },
        "mines": { name: "Mines & Carrières", desc: "Permis de recherches, cartes d'exploitant artisanal, conformité environnementale et sociale minérale." },
        "telecoms": { name: "Télécoms & Médias", desc: "Agréments ARPTC, fréquences radio, licences de fournisseur d'accès et autorisation d'exploitation." },
        "education": { name: "Éducation & Formation", desc: "Agréments EPSP, ouverture d'écoles privées, universités et centres de formation professionnelle." },
        "agriculture": { name: "Agriculture & Élevage", desc: "Concessions agricoles, certificats phytosanitaires et homologations d'intrants." },
        "securite": { name: "Sécurité Privée", desc: "Agréments gardiennage, licences port d'armes, agrément matériel de communication et télésurveillance." },
        "finance": { name: "Finances & Assurances", desc: "Agréments BCC, agréments ARCA, transfert d'argent, microfinance et courtage en assurance." }
    },
    footer: {
        brand_desc: "Vos projets méritent d'être en règle. La plateforme de référence pour les démarches administratives en RDC.",
        secteurs: "SECTEURS",
        plateforme: "PLATEFORME",
        diag: "Diagnostic de conformité",
        guides: "Guides & Ressources",
        veille: "Veille réglementaire",
        appels: "Appels d'offres",
        demarrer: "Démarrer un dossier",
        contact: "CONTACT",
        rappel: "Être rappelé",
        apropos: "À propos d'Agréa",
        whatsapp: "WhatsApp direct",
        rights: "Tous droits réservés."
    }
`;

const sectorsEn = `
    sectors: {
        "creation-entreprise": { name: "Business Creation", desc: "RCCM registration, national identification and initial tax recordings." },
        "btp": { name: "Construction & Public Works", desc: "Building permits, technical approvals, impact studies and environmental compliance." },
        "marches-publics": { name: "Public Procurement", desc: "Tax clearances, ARMP certificates, DGI, CNSS and bidder qualification." },
        "import-export": { name: "Import & Export", desc: "Import licenses, certificates of origin, import-export numbers and customs clearance." },
        "sante": { name: "Health & Pharmacy", desc: "Opening clinics, pharmacy licenses, drug registration and practice authorizations." },
        "transport": { name: "Transport & Logistics", desc: "Road and river transport licenses, fleet registration and professional driving licenses." },
        "mines": { name: "Mining & Quarries", desc: "Research permits, artisanal mining cards, environmental and social compliance." },
        "telecoms": { name: "Telecoms & Media", desc: "ARPTC approvals, radio frequencies, ISP licenses and operating authorization." },
        "education": { name: "Education & Training", desc: "EPSP approvals, opening private schools, universities and professional training centers." },
        "agriculture": { name: "Agriculture & Livestock", desc: "Agricultural concessions, phytosanitary certificates and agricultural input approvals." },
        "securite": { name: "Private Security", desc: "Guarding approvals, weapon carrying licenses, communication equipment and surveillance approvals." },
        "finance": { name: "Finance & Insurance", desc: "BCC approvals, ARCA approvals, money transfer, microfinance and insurance brokerage." }
    },
    footer: {
        brand_desc: "Your projects deserve to be compliant. The reference platform for administrative procedures in the DRC.",
        secteurs: "SECTORS",
        plateforme: "PLATFORM",
        diag: "Compliance diagnostic",
        guides: "Guides & Resources",
        veille: "Regulatory watch",
        appels: "Calls for tenders",
        demarrer: "Start a file",
        contact: "CONTACT",
        rappel: "Request a callback",
        apropos: "About Agréa",
        whatsapp: "Direct WhatsApp",
        rights: "All rights reserved."
    }
`;

const sectorsZh = `
    sectors: {
        "creation-entreprise": { name: "公司注册与设立", desc: "RCCM商事登记、全国统一识别码以及初始税务登记全流程。" },
        "btp": { name: "建筑与工程 (BTP)", desc: "建筑许可申请、技术审批、环境影响评估报告与环境合规。" },
        "marches-publics": { name: "公共采购审批", desc: "税务清关证明、ARMP证书、工商总局/社保登记及投标资质预审。" },
        "import-export": { name: "进出口贸易", desc: "进口许可证、原产地证明申请、进出口经营权及清关咨询。" },
        "sante": { name: "医疗与制药", desc: "诊所设立审批、药房执照、药品注册及医疗执业许可。" },
        "transport": { name: "物流与运输", desc: "公路及水运许可证、车队注册登记及专业驾驶人员资质办理。" },
        "mines": { name: "矿业开采", desc: "探矿许可、手工采矿证、矿业开采环境及社会合规审查。" },
        "telecoms": { name: "电信与媒体", desc: "ARPTC认证、无线电频率申请、ISP网络服务执照及运营许可。" },
        "education": { name: "教育与培训", desc: "初级/中级教育审批、私立学校设立、大学资质认证及职业培训中心审批。" },
        "agriculture": { name: "农业与畜牧业", desc: "农业特许经营权申请、植物检疫证书及各类农业投入品许可。" },
        "securite": { name: "私人安保业务", desc: "安保公司营业许可、佩戴武器许可、通讯设备及安防监控资质。" },
        "finance": { name: "金融与保险", desc: "中央银行(BCC)牌照申请、ARCA核准、跨境转账、小额贷款及保险经纪牌照。" }
    },
    footer: {
        brand_desc: "让您的投资项目始终合规无忧。刚果（金）首屈一指的行政审批在线服务平台。",
        secteurs: "核心行业",
        plateforme: "平台服务",
        diag: "合规风险诊断",
        guides: "投资指南与资源",
        veille: "法规监管动态",
        appels: "公共招标信息",
        demarrer: "启动申请流程",
        contact: "联系我们",
        rappel: "预约顾问回电",
        apropos: "关于 Agréa",
        whatsapp: "WhatsApp 直联专家",
        rights: "版权所有。"
    }
`;

function inject(pathStr, injection) {
    let content = fs.readFileSync(pathStr, 'utf8');
    // find last closing brace in the object (usually `    }\n};\n`)
    const regex = /    \}\n\};\n?$/;
    content = content.replace(regex, '    },\n' + injection + '\n};\n');
    fs.writeFileSync(pathStr, content);
}

inject(frPath, sectorsFr);
inject(enPath, sectorsEn);
inject(zhPath, sectorsZh);
console.log('Done mapping.');
