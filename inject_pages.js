const fs = require('fs');
const path = require('path');

const frPath = path.join(__dirname, 'src/locales/fr.ts');
const enPath = path.join(__dirname, 'src/locales/en.ts');
const zhPath = path.join(__dirname, 'src/locales/zh.ts');

const dataFr = `
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
    }
`;

const dataEn = `
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
    }
`;

const dataZh = `
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
    }
`;

function inject(pathStr, injection) {
    let content = fs.readFileSync(pathStr, 'utf8');
    const regex = /    \}\n\};\n?$/;
    content = content.replace(regex, '    },\n' + injection + '\n};\n');
    fs.writeFileSync(pathStr, content);
}

inject(frPath, dataFr);
inject(enPath, dataEn);
inject(zhPath, dataZh);
console.log('Pages injected.');
