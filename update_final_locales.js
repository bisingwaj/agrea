const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, 'src/locales/fr.ts');
const enPath = path.join(__dirname, 'src/locales/en.ts');
const zhPath = path.join(__dirname, 'src/locales/zh.ts');

const frData = `
    about: {
        badge: "Notre Mission",
        h1_1: "En RDC, avoir un bon projet ne suffit pas.",
        h1_2: "Il faut aussi avoir les bons papiers.",
        hero_desc: "Agréa existe pour que les entrepreneurs congolais puissent se concentrer sur leur activité, pendant que nous prenons en charge l'administratif.",
        main_desc: "Notre équipe accompagne les entreprises de la République Démocratique du Congo dans leurs démarches administratives, réglementaires et de conformité — des agréments jusqu'aux marchés publics.",
        values_badge: "Fondements",
        values_title: "Nos principes d'intervention",
        v1_title: "Clarté absolue",
        v1_desc: "Zéro jargon administratif non expliqué. Chaque terme est accompagné d'une définition en langage simple.",
        v2_title: "Confiance visible",
        v2_desc: "Les sources officielles sont citées. Les délais et coûts sont présentés comme des fourchettes réalistes.",
        v3_title: "Rapidité de valeur",
        v3_desc: "Une information utile en moins de 2 minutes, sans obligation d'inscription.",
        v4_title: "Résultats garantis",
        v4_desc: "Un réseau d'experts certifiés pour des dossiers constitués et suivis jusqu'à l'obtention.",
        contact_badge: "Contact",
        kin: "Kinshasa, République Démocratique du Congo"
    },
    contact_page: {
        success_title: "Demande confirmée",
        success_hello: "Bonjour",
        success_msg1: ", votre demande de rappel a bien été enregistrée.",
        success_msg2: "Un conseiller Agréa vous contacte sur WhatsApp (",
        success_msg3: ") entre",
        success_guarantee: "Délai de rappel garanti :",
        success_time: "sous 4 heures ouvrées",
        badge: "Rappel gratuit",
        title: "Parler à un conseiller",
        desc: "Laissez-nous vos coordonnées. Un expert Agréa vous rappelle sur WhatsApp dans les 4 heures ouvrées pour analyser votre situation.",
        fname_lbl: "Prénom",
        fname_ph: "Ex: Jean",
        fname_err: "Votre prénom est requis.",
        wa_lbl: "Numéro WhatsApp",
        wa_ph: "+243 8X XXX XXXX",
        wa_err1: "Votre numéro WhatsApp est requis.",
        wa_err2: "Numéro invalide.",
        time_lbl: "Plage horaire préférée",
        time_err: "Sélectionnez une plage horaire.",
        btn_idle: "Demander mon rappel gratuit",
        btn_loading: "Envoi en cours...",
        footer_note: "Sans engagement · Rappel sous 4 heures ouvrées · Gratuit"
    },
    guides: {
        badge: "Ressources gratuites",
        title: "Guides & Ressources",
        desc: "Téléchargez la liste complète des documents requis pour vos démarches. Gratuit, sans inscription.",
        g1_title: "Les documents requis pour les marchés publics en RDC (2025)",
        g2_title: "Obtenir votre agrément BTP : guide complet 2025",
        g3_title: "Créer une entreprise en RDC en 10 étapes",
        g4_title: "Importation et conformité douanière à Kinshasa",
        g5_title: "Ouvrir une pharmacie en RDC : dossier complet",
        free: "Gratuit",
        on_demand: "Sur demande",
        pages: "pages"
    },
    veille: {
        badge: "Veille réglementaire",
        title: "Ne manquez aucun changement réglementaire en RDC",
        desc: "Chaque semaine, notre équipe analyse les textes officiels, ordonnances et décrets qui impactent votre secteur. Vous recevez uniquement ce qui vous concerne.",
        popular: "LE PLUS POPULAIRE",
        month: "/ mois",
        cta_idle: "Commencer",
        cta_contact: "Nous contacter",
        how_badge: "Comment ça fonctionne",
        how_1_title: "Sélectionnez vos secteurs",
        how_1_desc: "Choisissez les domaines d'activité à surveiller selon votre situation.",
        how_2_title: "Notre équipe analyse",
        how_2_desc: "Chaque semaine, nous décryptons les journaux officiels et textes réglementaires de la RDC.",
        how_3_title: "Vous recevez l'essentiel",
        how_3_desc: "Un bulletin clair et actionnable, directement par email ou WhatsApp.",
        plans: {
            starter: { name: "Starter", price: "25", sectors: "1 secteur", frequency: "Hebdomadaire" },
            pro: { name: "Pro", price: "50", sectors: "3 secteurs", frequency: "Hebdomadaire" },
            business: { name: "Business", price: "100", sectors: "Tous les secteurs", frequency: "Bi-hebdomadaire" },
            enterprise: { name: "Enterprise", price: "Sur devis", sectors: "Sur mesure", frequency: "Temps réel" }
        }
    },
    report: {
        loading: "Chargement du rapport...",
        redo: "Refaire le diagnostic",
        badge: "Rapport de conformité — Agréa",
        hello: "Bonjour",
        subtitle: "Voici votre diagnostic de conformité administrative. Ce rapport est confidentiel.",
        score_label: "Score de conformité",
        levels: {
            "non-conforme": "Non conforme",
            "partiel": "Partiellement conforme",
            "conforme": "Conforme",
            "excellent": "Excellent"
        },
        feedback: {
            excellent: "Votre entreprise est en excellente conformité. Continuez à maintenir vos documents à jour.",
            conforme: "Bonne situation globale avec quelques lacunes à combler pour être pleinement conforme.",
            partiel: "Votre conformité est partielle. Des actions prioritaires sont nécessaires.",
            non: "Des démarches urgentes sont requises pour régulariser votre situation administrative."
        },
        strengths: "Points forts",
        gaps: "Lacunes détectées",
        action_plan: "Plan d'action prioritaire",
        cost: "Coût estimé de mise en conformité",
        priority: "Priorité",
        action: "Action",
        delay: "Délai",
        days: "j.",
        cta_title: "Agréa prend en charge votre mise en conformité",
        cta_desc: "Un expert vous rappelle dans les 4 heures avec une feuille de route sur mesure.",
        cta_btn: "Être rappelé gratuitement"
    }
`;

const enData = `
    about: {
        badge: "Our Mission",
        h1_1: "In the DRC, having a good project is not enough.",
        h1_2: "You also need the right papers.",
        hero_desc: "Agréa exists so that Congolese entrepreneurs can focus on their business, while we handle the paperwork.",
        main_desc: "Our team supports companies in the Democratic Republic of the Congo in their administrative, regulatory and compliance procedures — from approvals to public contracts.",
        values_badge: "Foundations",
        values_title: "Our intervention principles",
        v1_title: "Absolute clarity",
        v1_desc: "Zero unexplained administrative jargon. Each term is accompanied by a definition in plain language.",
        v2_title: "Visible trust",
        v2_desc: "Official sources are cited. Deadlines and costs are presented as realistic ranges.",
        v3_title: "Speed of value",
        v3_desc: "Useful information in less than 2 minutes, no registration required.",
        v4_title: "Guaranteed results",
        v4_desc: "A network of certified experts for files put together and followed up until obtaining.",
        contact_badge: "Contact",
        kin: "Kinshasa, Democratic Republic of the Congo"
    },
    contact_page: {
        success_title: "Request confirmed",
        success_hello: "Hello",
        success_msg1: ", your callback request has been recorded.",
        success_msg2: "An Agréa advisor will contact you on WhatsApp (",
        success_msg3: ") between",
        success_guarantee: "Guaranteed callback time:",
        success_time: "within 4 business hours",
        badge: "Free callback",
        title: "Talk to an advisor",
        desc: "Leave us your contact details. An Agréa expert will call you back on WhatsApp within 4 business hours to analyze your situation.",
        fname_lbl: "First Name",
        fname_ph: "Ex: John",
        fname_err: "Your first name is required.",
        wa_lbl: "WhatsApp Number",
        wa_ph: "+243 8X XXX XXXX",
        wa_err1: "Your WhatsApp number is required.",
        wa_err2: "Invalid number.",
        time_lbl: "Preferred time slot",
        time_err: "Select a time slot.",
        btn_idle: "Request my free callback",
        btn_loading: "Sending...",
        footer_note: "No obligation · Callback within 4 business hours · Free"
    },
    guides: {
        badge: "Free Resources",
        title: "Guides & Resources",
        desc: "Download the complete list of documents required for your procedures. Free, no registration required.",
        g1_title: "Documents required for public procurement in the DRC (2025)",
        g2_title: "Obtaining your BTP approval: complete guide 2025",
        g3_title: "Start a business in the DRC in 10 steps",
        g4_title: "Import and customs compliance in Kinshasa",
        g5_title: "Opening a pharmacy in the DRC: complete file",
        free: "Free",
        on_demand: "On request",
        pages: "pages"
    },
    veille: {
        badge: "Regulatory Watch",
        title: "Never miss a regulatory change in the DRC",
        desc: "Every week, our team analyzes official texts, ordinances and decrees that impact your sector. You only receive what concerns you.",
        popular: "MOST POPULAR",
        month: "/ month",
        cta_idle: "Start",
        cta_contact: "Contact us",
        how_badge: "How it works",
        how_1_title: "Select your sectors",
        how_1_desc: "Choose the areas of activity to monitor according to your situation.",
        how_2_title: "Our team analyzes",
        how_2_desc: "Each week, we decipher the official journals and regulatory texts of the DRC.",
        how_3_title: "You receive the essentials",
        how_3_desc: "A clear and actionable bulletin, directly by email or WhatsApp.",
        plans: {
            starter: { name: "Starter", price: "25", sectors: "1 sector", frequency: "Weekly" },
            pro: { name: "Pro", price: "50", sectors: "3 sectors", frequency: "Weekly" },
            business: { name: "Business", price: "100", sectors: "All sectors", frequency: "Bi-weekly" },
            enterprise: { name: "Enterprise", price: "Custom", sectors: "Tailor-made", frequency: "Real-time" }
        }
    },
    report: {
        loading: "Loading report...",
        redo: "Redo diagnosis",
        badge: "Compliance Report — Agréa",
        hello: "Hello",
        subtitle: "Here is your administrative compliance diagnosis. This report is confidential.",
        score_label: "Compliance Score",
        levels: {
            "non-conforme": "Non-compliant",
            "partiel": "Partially compliant",
            "conforme": "Compliant",
            "excellent": "Excellent"
        },
        feedback: {
            excellent: "Your company is in excellent compliance. Keep keeping your documents up to date.",
            conforme: "Good overall situation with some gaps to fill to be fully compliant.",
            partiel: "Your compliance is partial. Priority actions are required.",
            non: "Urgent steps are required to regularize your administrative situation."
        },
        strengths: "Strengths",
        gaps: "Gaps detected",
        action_plan: "Priority action plan",
        cost: "Estimated cost of compliance",
        priority: "Priority",
        action: "Action",
        delay: "Deadline",
        days: "d.",
        cta_title: "Agréa handles your compliance",
        cta_desc: "An expert will call you back within 4 hours with a custom roadmap.",
        cta_btn: "Request a free callback"
    }
`;

const zhData = `
    about: {
        badge: "我们的使命",
        h1_1: "在刚果（金），仅有一个好项目是不够的。",
        h1_2: "您还需要完备的合规文件。",
        hero_desc: "Agréa 致力于包揽繁杂的行政审批程序，让在刚企业家能够全神贯注于核心业务发展。",
        main_desc: "我们的资深团队协助刚果（金）的企业妥善处理各项行政、监管及合规事务——从各类资质审批到公共采购投标许可，提供全方位护航。",
        values_badge: "核心理念",
        values_title: "我们的服务准则",
        v1_title: "绝对清晰透明",
        v1_desc: "拒绝艰涩难懂的官僚术语。我们将每一个专业词汇转化为清晰易懂的商业语言。",
        v2_title: "可靠性背书",
        v2_desc: "所有信息均标明官方出处。办理周期与成本预估均基于真实市场数据。绝对避免隐性收费。",
        v3_title: "极速响应",
        v3_desc: "无需繁杂注册，2分钟内即可获取最高价值的合规关键信息。",
        v4_title: "结果导向保障",
        v4_desc: "由认证资深专家组成的网络，全面接管您的案卷并全程追踪，直到资质顺利获批。",
        contact_badge: "联系方式",
        kin: "刚果民主共和国 · 金沙萨"
    },
    contact_page: {
        success_title: "请求已确认",
        success_hello: "您好",
        success_msg1: "，您的回电请求已成功记录。",
        success_msg2: "Agréa 专属顾问将通过 WhatsApp 联系您 (",
        success_msg3: ")，时间段为 ",
        success_guarantee: "回电时效承诺：",
        success_time: "4个工作小时内",
        badge: "免费顾问回电",
        title: "与专属顾问对话",
        desc: "请留下您的联系方式。Agréa 资深专家将在4个工作小时内通过 WhatsApp 与您联系并深入分析您的投资及合规需求。",
        fname_lbl: "您的名字",
        fname_ph: "例如：王先生",
        fname_err: "请填写您的名字。",
        wa_lbl: "WhatsApp 电话号码",
        wa_ph: "+243 8X XXX XXXX",
        wa_err1: "请填写您的 WhatsApp 号码。",
        wa_err2: "号码格式无效。",
        time_lbl: "期望联系时间段",
        time_err: "请选择一个时间段。",
        btn_idle: "免费申请顾问回电",
        btn_loading: "发送中...",
        footer_note: "无需绑定承诺 · 4工作小时内必回 · 完全免费"
    },
    guides: {
        badge: "免费资源",
        title: "合规指南与资源",
        desc: "下载您所在行业所需的完整文件清单。完全免费，无需注册。",
        g1_title: "2025年刚果（金）公共采购所需文件清单",
        g2_title: "获得 BTP 资质认证：2025年完整指南",
        g3_title: "在刚果（金）创建公司的10个步骤",
        g4_title: "金沙萨进口与海关合规指南",
        g5_title: "在刚果（金）开设药店：完整申请流程",
        free: "免费下载",
        on_demand: "应要求提供",
        pages: "页"
    },
    veille: {
        badge: "法规监控",
        title: "绝不错过刚果（金）任何法规变动",
        desc: "我们的专业团队每周分析官方公报、法令和法令，确保您第一时间获知与其业务相关的核心变动。精准推送，杜绝干扰。",
        popular: "最受欢迎方案",
        month: "/ 月",
        cta_idle: "立即开始",
        cta_contact: "联系我们",
        how_badge: "运作流程",
        how_1_title: "选择关注行业",
        how_1_desc: "根据您的实际业务领域，选择需要监控的垂直行业。",
        how_2_title: "专业团队深度分析",
        how_2_desc: "我们每周深度解读刚果（金）政府的最新公报与法律文本。",
        how_3_title: "获取核心简报",
        how_3_desc: "通过邮件或 WhatsApp 直接接收清晰、可落地的专业简报。",
        plans: {
            starter: { name: "入门版", price: "25", sectors: "1个行业", frequency: "每周推送" },
            pro: { name: "专业版", price: "50", sectors: "3个行业", frequency: "每周推送" },
            business: { name: "商业版", price: "100", sectors: "全行业覆盖", frequency: "每周两次推送" },
            enterprise: { name: "企业定制版", price: "按需报价", sectors: "深度定制", frequency: "实时推送" }
        }
    },
    report: {
        loading: "正在生成报告...",
        redo: "重新评估",
        badge: "合规评估报告 — Agréa",
        hello: "您好",
        subtitle: "这是您的行政合规诊断结果。本报告内容严格保密。",
        score_label: "合规评分",
        levels: {
            "non-conforme": "不合规",
            "partiel": "部分合规",
            "conforme": "合规",
            "excellent": "优秀"
        },
        feedback: {
            excellent: "您的公司具有极佳的合规性。请继续保持文件更新。",
            conforme: "整体情况良好，仍有部分细节需完善以达到完全合规。",
            partiel: "合规性尚不完整，需立即采取优先补救行动。",
            non: "情况紧急，需立即启动行政整改程序以合法化经营。"
        },
        strengths: "合规亮点",
        gaps: "检测到的缺陷",
        action_plan: "优先行动计划",
        cost: "预计补齐成本",
        priority: "优先级",
        action: "应对行动",
        delay: "预计周期",
        days: "天",
        cta_title: "Agréa 为您的合规保驾护航",
        cta_desc: "资深专家将在4小时内回电，为您提供量身定制的合规路线图。",
        cta_btn: "立即申请免费回电"
    }
`;

function updateLocales(p, d) {
    let content = fs.readFileSync(p, 'utf8');
    // On remplace tout ce qui se trouve après 'footer: {' par le nouveau contenu,
    // ou plutôt on injecte proprement si on trouve la fin du footer.
    const footerRegex = /footer: \{[\s\S]*?\}\n\s*\}/;
    const newContent = 'footer: {' + content.match(/footer: \{([\s\S]*?)\}/)[1] + '},\n' + d + '\n}';
    content = content.replace(footerRegex, newContent);
    fs.writeFileSync(p, content);
}

updateLocales(frPath, frData);
updateLocales(enPath, enData);
updateLocales(zhPath, zhData);
console.log('All locales updated.');
