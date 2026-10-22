import type { CourseDef, ModuleDef } from "../types";

/**
 * INVESTING 101: YOUR FIRST STEP TO FINANCIAL KNOWLEDGE
 * Required demonstration course. Seven modules, fourteen lessons, knowledge checks and a final assessment.
 * All rates mentioned in lessons are hypothetical assumptions used for teaching, never forecasts.
 */

const module1: ModuleDef = {
  title: { en: "Why Understanding Money Matters", fr: "Pourquoi comprendre l'argent est essentiel" },
  lessons: [
    {
      slug: "money-as-a-tool",
      title: { en: "Money is a tool, not a mystery", fr: "L'argent est un outil, pas un mystère" },
      kind: "reading",
      durationMinutes: 7,
      videoSlug: "why-financial-literacy-matters",
      keyTakeaways: {
        en: ["Money has three jobs: paying for today, protecting against tomorrow, and building for later.", "Financial decisions are made every day whether or not you understand them.", "Literacy is not about being rich; it is about choosing deliberately."],
        fr: ["L'argent remplit trois fonctions : payer aujourd'hui, se protéger pour demain et bâtir pour plus tard.", "Des décisions financières se prennent chaque jour, que l'on les comprenne ou non.", "La littératie financière n'est pas une question de richesse, mais de choix délibérés."],
      },
      body: {
        en: `## Three jobs for every franc

Think about the last 50,000 FCFA that passed through your hands. Some of it paid for transport, airtime and food. Some may have gone into a tontine, a mobile money wallet, or an envelope at home. Perhaps a part was lent to a relative. Each of those choices gave the money a job.

Every franc you earn can only do one of three things:

- **Pay for today**: rent, school fees, food, transport, the things that cannot wait.
- **Protect against tomorrow**: an emergency reserve for illness, a lost job, a broken phone, a funeral.
- **Build for later**: capital that is put to work so it can be worth more in three, five or twenty years.

Most people handle the first job well because the bills arrive on their own. The second job is handled unevenly. The third job is where the real difference between households is made, and it is the job most of us were never taught.

## Decisions you are already making

You do not need a bank account to make financial decisions. Choosing to keep cash at home rather than in a mobile wallet is a decision about safety and access. Joining a tontine is a decision about discipline and trust. Lending 100,000 FCFA to a cousin's business is an investment decision, with a risk of loss and an expected return, even if nobody called it that.

:::
The question is never whether you will make financial decisions. It is whether you will make them with understanding or by habit.
:::

## What financial literacy actually means

Financial literacy is not knowing the price of every share on the BVMAC. It is being able to answer four practical questions:

1. Where does my money go each month?
2. What happens to its value if I simply hold it?
3. What options exist to put it to work, and what are their risks?
4. Who regulates the people who offer me those options?

Each of these questions has a clear answer in the CEMAC region. The BEAC issues the currency. COSUMAF licenses and supervises the companies that manage other people's money. The BVMAC is where listed securities trade. Over this course you will learn how these pieces fit together, so that a brochure, a bank adviser or a WhatsApp investment offer no longer feels like a foreign language.

## Why it matters more now

Investment products are arriving in Central Africa faster than financial education is. Mutual funds licensed by COSUMAF, government bonds sold to the public, mobile savings products: all of these are real, and all of them require a basic vocabulary to use well. The same vocabulary is what protects you from offers that promise a guaranteed 20% a month. Understanding money is less about getting rich and more about never being the easiest person in the room to mislead.`,
        fr: `## Trois missions pour chaque franc

Pensez aux derniers 50 000 FCFA qui sont passés entre vos mains. Une partie a payé le transport, le crédit téléphonique et la nourriture. Une autre est peut-être allée dans une tontine, un portefeuille mobile money ou une enveloppe à la maison. Une part a peut-être été prêtée à un proche. Chacun de ces choix a donné une mission à l'argent.

Chaque franc gagné ne peut faire qu'une de ces trois choses :

- **Payer aujourd'hui** : le loyer, la scolarité, l'alimentation, le transport, ce qui ne peut pas attendre.
- **Se protéger pour demain** : une réserve d'urgence pour la maladie, la perte d'un emploi, un téléphone cassé, un deuil.
- **Bâtir pour plus tard** : un capital mis au travail pour qu'il vaille davantage dans trois, cinq ou vingt ans.

La plupart des gens gèrent bien la première mission, parce que les factures arrivent d'elles-mêmes. La deuxième est traitée de façon inégale. La troisième est celle qui fait la vraie différence entre les ménages, et c'est celle qu'on ne nous a presque jamais enseignée.

## Des décisions que vous prenez déjà

Il n'est pas nécessaire d'avoir un compte bancaire pour prendre des décisions financières. Garder du liquide à la maison plutôt que dans un portefeuille mobile est une décision sur la sécurité et l'accès. Rejoindre une tontine est une décision sur la discipline et la confiance. Prêter 100 000 FCFA à l'entreprise d'un cousin est une décision d'investissement, avec un risque de perte et un rendement espéré, même si personne ne l'a formulé ainsi.

:::
La question n'est jamais de savoir si vous prendrez des décisions financières. C'est de savoir si vous les prendrez en comprenant, ou par habitude.
:::

## Ce que signifie vraiment la littératie financière

La littératie financière, ce n'est pas connaître le cours de chaque action à la BVMAC. C'est pouvoir répondre à quatre questions pratiques :

1. Où va mon argent chaque mois ?
2. Que devient sa valeur si je me contente de le conserver ?
3. Quelles options existent pour le faire travailler, et quels sont leurs risques ?
4. Qui contrôle les personnes qui me proposent ces options ?

Chacune de ces questions a une réponse claire dans la zone CEMAC. La BEAC émet la monnaie. La COSUMAF agrée et supervise les sociétés qui gèrent l'argent des autres. La BVMAC est le lieu où s'échangent les titres cotés. Au fil de ce cours, vous verrez comment ces pièces s'assemblent, pour qu'une brochure, un conseiller bancaire ou une offre d'investissement reçue sur WhatsApp ne ressemble plus à une langue étrangère.

## Pourquoi c'est plus important aujourd'hui

Les produits d'investissement arrivent en Afrique centrale plus vite que l'éducation financière. Fonds communs de placement agréés par la COSUMAF, obligations d'État proposées au public, produits d'épargne mobile : tout cela est réel, et tout cela demande un vocabulaire de base pour être bien utilisé. Ce même vocabulaire vous protège des offres qui promettent 20 % garantis par mois. Comprendre l'argent, c'est moins une affaire d'enrichissement qu'une façon de ne jamais être la personne la plus facile à tromper dans la pièce.`,
      },
    },
    {
      slug: "the-cost-of-not-knowing",
      title: { en: "The cost of not knowing", fr: "Le coût de l'ignorance financière" },
      kind: "reading",
      durationMinutes: 7,
      keyTakeaways: {
        en: ["Idle money has a cost even when nothing visibly goes wrong.", "The most expensive financial mistakes come from not asking who regulates an offer.", "Small, informed decisions repeated over years matter more than one brilliant move."],
        fr: ["L'argent inactif a un coût, même quand rien ne semble mal tourner.", "Les erreurs financières les plus coûteuses viennent de ne pas demander qui réglemente une offre.", "De petites décisions éclairées, répétées pendant des années, comptent plus qu'un seul coup brillant."],
      },
      quiz: {
        title: { en: "Knowledge check: money matters", fr: "Vérification : l'argent, un outil" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "Which of the following is an investment decision, even if nobody calls it one?", fr: "Laquelle de ces situations est une décision d'investissement, même si personne ne la nomme ainsi ?" },
            options: { en: ["Paying this month's rent", "Lending 100,000 FCFA to a relative's shop expecting a share of profits", "Buying airtime", "Paying school fees"], fr: ["Payer le loyer du mois", "Prêter 100 000 FCFA à la boutique d'un proche en attendant une part des bénéfices", "Acheter du crédit téléphonique", "Payer les frais de scolarité"] },
            correctIndex: 1,
            explanation: { en: "An investment is money committed today in exchange for an uncertain future return. The loan to the shop has both an expected return and a real risk of loss, which makes it an investment decision whatever it is called.", fr: "Un investissement est de l'argent engagé aujourd'hui en échange d'un rendement futur incertain. Le prêt à la boutique comporte à la fois un rendement espéré et un risque réel de perte : c'est donc une décision d'investissement, quel que soit son nom." },
          },
          {
            prompt: { en: "Which institution licenses and supervises companies that manage other people's money in the CEMAC region?", fr: "Quelle institution agrée et supervise les sociétés qui gèrent l'argent des autres dans la zone CEMAC ?" },
            options: { en: ["BEAC", "BVMAC", "COSUMAF", "The Ministry of Finance of Cameroon"], fr: ["La BEAC", "La BVMAC", "La COSUMAF", "Le ministère des Finances du Cameroun"] },
            correctIndex: 2,
            explanation: { en: "COSUMAF is the regional financial market regulator. The BEAC is the central bank that issues the currency, and the BVMAC is the exchange where listed securities trade. Knowing which is which is the first defence against unregulated offers.", fr: "La COSUMAF est le régulateur régional du marché financier. La BEAC est la banque centrale qui émet la monnaie, et la BVMAC est la bourse où s'échangent les titres cotés. Savoir qui fait quoi est la première défense contre les offres non réglementées." },
          },
          {
            prompt: { en: "Why does cash kept in an envelope at home have a cost, even if none of it is lost or stolen?", fr: "Pourquoi l'argent gardé dans une enveloppe à la maison a-t-il un coût, même si rien n'est perdu ni volé ?" },
            options: { en: ["Because banks charge a fee on cash held at home", "Because rising prices reduce what the same notes can buy over time", "Because the BEAC withdraws old banknotes every year", "It has no cost at all"], fr: ["Parce que les banques facturent des frais sur l'argent gardé à domicile", "Parce que la hausse des prix réduit ce que les mêmes billets permettent d'acheter avec le temps", "Parce que la BEAC retire les anciens billets chaque année", "Il n'a aucun coût"] },
            correctIndex: 1,
            explanation: { en: "The number on the note does not change, but prices do. If prices rise, the same 10,000 FCFA buys less next year than this year. That loss of purchasing power is the silent cost of idle money, and it is the subject of the next module.", fr: "Le chiffre sur le billet ne change pas, mais les prix, si. Si les prix montent, les mêmes 10 000 FCFA achètent moins l'an prochain que cette année. Cette perte de pouvoir d'achat est le coût silencieux de l'argent inactif, et c'est le sujet du module suivant." },
          },
        ],
      },
      body: {
        en: `## The mistake that does not look like one

The most common financial mistake in Central Africa is not a bad investment. It is no investment at all. Money sits in a drawer, in a dormant mobile wallet, or in a current account paying nothing, for years. Nothing dramatic happens. No one steals it. And yet it quietly loses value, because the price of rice, fuel, school fees and rent does not stand still.

Consider a simple, hypothetical case. Someone sets aside 250,000 FCFA in 2020 for a future project and leaves it untouched. If the general price level rises by a few percent a year, by 2026 that same 250,000 FCFA buys noticeably less than it did. The notes are intact. The purchasing power is not. You will measure this precisely in the Inflation Lab later in the course.

## The mistake that looks like a windfall

The opposite error is just as common: putting money into something that promises far more than any regulated product can. A WhatsApp group offering 15% a month. A cousin of a friend running a "forex programme". A savings scheme with no licence, no documents and no named custodian.

A simple test removes most of the danger. Before you give anyone money to invest, ask:

- Who regulates you, and what is your licence number?
- Where is the money actually held, and by whom?
- What document describes the risks, and can I read it before I pay?
- How do I get my money back, and how long does it take?

A legitimate asset manager in the CEMAC region can answer all four questions. It will carry a COSUMAF licence reference, name a depositary bank that holds client assets separately, and provide an information document that describes risks and redemption conditions. An offer that cannot answer these questions is not an investment. It is a bet on someone else's honesty.

| Question | Regulated fund | Unregulated scheme |
| --- | --- | --- |
| Who supervises it? | COSUMAF | Nobody |
| Who holds the money? | An independent depositary | The promoter |
| Is there a risk document? | Yes, before subscription | Usually none |
| How do you exit? | Written redemption rules | At the promoter's discretion |

## Small decisions, repeated

Financial outcomes are rarely decided by one spectacular move. They are the sum of ordinary decisions repeated for years: whether a surplus of 20,000 FCFA a month is spent, kept idle, or put to work; whether you read the document before you sign; whether you panic when a value drops for a month or wait as planned.

:::
Understanding money will not make every decision correct. It makes your mistakes smaller, rarer and recoverable.
:::

The rest of this course gives you the vocabulary for these ordinary decisions: what saving and investing actually do, which vehicles exist, what risk means in practice, how a mutual fund is built and supervised, and how the CEMAC market works. By the final module you will have a decision framework you can apply to any offer that reaches you.`,
        fr: `## L'erreur qui n'en a pas l'air

L'erreur financière la plus répandue en Afrique centrale n'est pas un mauvais investissement. C'est l'absence totale d'investissement. L'argent dort dans un tiroir, dans un portefeuille mobile inactif ou sur un compte courant qui ne rapporte rien, pendant des années. Rien de spectaculaire ne se produit. Personne ne le vole. Et pourtant il perd discrètement de la valeur, parce que le prix du riz, du carburant, de la scolarité et du loyer ne reste pas immobile.

Prenons un cas simple et hypothétique. Une personne met de côté 250 000 FCFA en 2020 pour un projet futur et n'y touche plus. Si le niveau général des prix augmente de quelques pour cent par an, en 2026 ces mêmes 250 000 FCFA achètent sensiblement moins qu'au départ. Les billets sont intacts. Le pouvoir d'achat ne l'est pas. Vous mesurerez cela précisément dans le Laboratoire sur l'inflation, plus loin dans le cours.

## L'erreur qui ressemble à une aubaine

L'erreur inverse est tout aussi fréquente : placer son argent dans quelque chose qui promet bien plus que n'importe quel produit réglementé. Un groupe WhatsApp qui offre 15 % par mois. Le cousin d'un ami qui gère un « programme forex ». Un système d'épargne sans agrément, sans documents et sans dépositaire identifié.

Un test simple élimine l'essentiel du danger. Avant de confier de l'argent à quiconque pour l'investir, demandez :

- Qui vous réglemente, et quel est votre numéro d'agrément ?
- Où l'argent est-il réellement conservé, et par qui ?
- Quel document décrit les risques, et puis-je le lire avant de payer ?
- Comment récupérer mon argent, et en combien de temps ?

Une société de gestion légitime dans la zone CEMAC peut répondre à ces quatre questions. Elle porte une référence d'agrément COSUMAF, désigne une banque dépositaire qui conserve les actifs des clients séparément, et fournit un document d'information qui décrit les risques et les conditions de rachat. Une offre incapable de répondre n'est pas un investissement. C'est un pari sur l'honnêteté de quelqu'un d'autre.

| Question | Fonds réglementé | Système non réglementé |
| --- | --- | --- |
| Qui le supervise ? | La COSUMAF | Personne |
| Qui conserve l'argent ? | Un dépositaire indépendant | Le promoteur |
| Existe-t-il un document sur les risques ? | Oui, avant la souscription | Généralement aucun |
| Comment sortir ? | Règles de rachat écrites | À la discrétion du promoteur |

## De petites décisions, répétées

Les résultats financiers se décident rarement sur un coup d'éclat. Ils sont la somme de décisions ordinaires répétées pendant des années : si un surplus de 20 000 FCFA par mois est dépensé, laissé inactif ou mis au travail ; si vous lisez le document avant de signer ; si vous paniquez quand une valeur baisse pendant un mois ou si vous attendez comme prévu.

:::
Comprendre l'argent ne rendra pas chaque décision juste. Cela rend vos erreurs plus petites, plus rares et rattrapables.
:::

La suite de ce cours vous donne le vocabulaire de ces décisions ordinaires : ce que font réellement l'épargne et l'investissement, quels véhicules existent, ce que signifie le risque en pratique, comment un fonds commun de placement est construit et supervisé, et comment fonctionne le marché de la CEMAC. Au dernier module, vous disposerez d'une grille de décision applicable à toute offre qui vous parvient.`,
      },
    },
  ],
};

const module2: ModuleDef = {
  title: { en: "Saving Versus Investing", fr: "Épargner ou investir" },
  lessons: [
    {
      slug: "what-saving-does-well",
      title: { en: "What saving does well, and what it cannot do", fr: "Ce que l'épargne fait bien, et ce qu'elle ne peut pas faire" },
      kind: "reading",
      durationMinutes: 7,
      videoSlug: "saving-vs-investing",
      keyTakeaways: {
        en: ["Saving keeps money safe and available; its job is protection, not growth.", "An emergency reserve of three to six months of expenses comes before any investment.", "Tontines and mobile wallets are saving tools with different trade-offs in access and discipline."],
        fr: ["L'épargne garde l'argent en sécurité et disponible ; sa mission est la protection, pas la croissance.", "Une réserve d'urgence de trois à six mois de dépenses passe avant tout investissement.", "Tontines et portefeuilles mobiles sont des outils d'épargne aux compromis différents entre accès et discipline."],
      },
      body: {
        en: `## Two words that are not synonyms

In everyday speech, "saving" and "investing" are used interchangeably. In finance they describe different actions with different purposes.

**Saving** means setting money aside where it is safe and reachable. The amount you put in is the amount you expect to get back, perhaps with a small interest payment. The priority is availability.

**Investing** means committing money to an asset whose value can rise or fall, in the expectation that over time it will be worth more. The priority is growth, and the price of that growth is uncertainty.

Neither is better. They answer different questions. Saving answers "will the money be there when I need it?" Investing answers "will the money be worth more when I finally use it?"

## What saving is for

Saving has three legitimate jobs, and it does them better than any investment can:

- **Emergencies**: a hospital bill, a lost phone, a month without salary. This money must be reachable within a day, without loss.
- **Near-term goals**: rent due in two months, a laptop in six, a wedding contribution next year. Money needed within about two years should not be exposed to price swings.
- **Discipline**: a tontine that collects 25,000 FCFA from you every month does something valuable even if it pays no interest. It converts intention into habit.

A widely used rule of thumb is to hold three to six months of essential expenses in a reserve before investing anything. If your essential monthly outgoings are 150,000 FCFA, that reserve is 450,000 to 900,000 FCFA. It will take time to build. That is normal.

## Where people in Cameroon actually save

| Tool | Safety | Access | Discipline | Growth |
| --- | --- | --- | --- | --- |
| Cash at home | Low (theft, fire) | Immediate | Weak | None |
| Mobile money wallet | Good | Immediate | Weak | Little or none |
| Bank savings account | Good | Same day | Moderate | Low interest |
| Tontine / njangi | Depends on members | On your turn | Strong | None, sometimes a pot bonus |

None of these grow money meaningfully. That is not a flaw. They are designed to hold value and keep it close, and they do so.

## What saving cannot do

A savings tool cannot protect you from rising prices. If a bank account pays a modest interest rate and prices rise faster, the real value of the balance falls even as the number grows. Saving also cannot build capital for goals that are ten or twenty years away, because the amounts involved would have to come entirely from your own contributions, with no help from growth.

:::
Saving protects what you have. Investing is what you do with money you will not need for several years, once the protection is in place.
:::

The next lesson looks at the force that makes this distinction matter: inflation. You will use the Inflation Lab to see what it does to a fixed sum over time, and why that pushes money that is not needed soon towards investment.`,
        fr: `## Deux mots qui ne sont pas synonymes

Dans le langage courant, « épargner » et « investir » s'emploient l'un pour l'autre. En finance, ils désignent des actions différentes, aux objectifs différents.

**Épargner**, c'est mettre de l'argent de côté dans un endroit sûr et accessible. Le montant déposé est celui que l'on s'attend à récupérer, parfois avec un petit intérêt. La priorité est la disponibilité.

**Investir**, c'est engager de l'argent dans un actif dont la valeur peut monter ou baisser, en espérant qu'avec le temps il vaudra davantage. La priorité est la croissance, et le prix de cette croissance est l'incertitude.

Aucun n'est meilleur que l'autre. Ils répondent à des questions différentes. L'épargne répond à « l'argent sera-t-il là quand j'en aurai besoin ? ». L'investissement répond à « l'argent vaudra-t-il plus quand je l'utiliserai enfin ? ».

## À quoi sert l'épargne

L'épargne a trois missions légitimes, qu'elle remplit mieux que n'importe quel investissement :

- **Les urgences** : une facture d'hôpital, un téléphone perdu, un mois sans salaire. Cet argent doit être accessible en une journée, sans perte.
- **Les objectifs proches** : un loyer dans deux mois, un ordinateur dans six, une contribution à un mariage l'an prochain. L'argent nécessaire d'ici environ deux ans ne doit pas être exposé aux fluctuations de prix.
- **La discipline** : une tontine qui vous prélève 25 000 FCFA chaque mois fait quelque chose de précieux même sans intérêt. Elle transforme l'intention en habitude.

Une règle courante consiste à détenir trois à six mois de dépenses essentielles en réserve avant d'investir quoi que ce soit. Si vos charges mensuelles essentielles sont de 150 000 FCFA, cette réserve représente 450 000 à 900 000 FCFA. Elle prendra du temps à constituer. C'est normal.

## Où les Camerounais épargnent réellement

| Outil | Sécurité | Accès | Discipline | Croissance |
| --- | --- | --- | --- | --- |
| Liquide à la maison | Faible (vol, incendie) | Immédiat | Faible | Aucune |
| Portefeuille mobile money | Bonne | Immédiat | Faible | Faible ou nulle |
| Compte d'épargne bancaire | Bonne | Le jour même | Moyenne | Intérêt faible |
| Tontine / njangi | Dépend des membres | À votre tour | Forte | Aucune, parfois un bonus de caisse |

Aucun de ces outils ne fait croître l'argent de manière significative. Ce n'est pas un défaut. Ils sont conçus pour conserver la valeur et la garder à portée de main, et ils le font.

## Ce que l'épargne ne peut pas faire

Un outil d'épargne ne peut pas vous protéger de la hausse des prix. Si un compte bancaire verse un intérêt modeste et que les prix montent plus vite, la valeur réelle du solde diminue alors même que le chiffre augmente. L'épargne ne peut pas non plus constituer un capital pour des objectifs à dix ou vingt ans, car les montants devraient provenir entièrement de vos propres versements, sans aucune aide de la croissance.

:::
L'épargne protège ce que vous avez. L'investissement, c'est ce que vous faites de l'argent dont vous n'aurez pas besoin avant plusieurs années, une fois la protection en place.
:::

La leçon suivante examine la force qui rend cette distinction importante : l'inflation. Vous utiliserez le Laboratoire sur l'inflation pour voir ce qu'elle fait à une somme fixe dans le temps, et pourquoi cela pousse l'argent dont on n'a pas besoin bientôt vers l'investissement.`,
      },
    },
    {
      slug: "inflation-and-the-case-for-investing",
      title: { en: "Inflation and the case for investing", fr: "L'inflation et la raison d'investir" },
      kind: "reading",
      durationMinutes: 8,
      labSlug: "inflation",
      keyTakeaways: {
        en: ["Inflation is a rise in the general level of prices; it erodes the purchasing power of a fixed sum.", "The real return is the nominal return minus inflation, and it is the number that matters.", "Money not needed for three years or more is the natural candidate for investment."],
        fr: ["L'inflation est une hausse du niveau général des prix ; elle érode le pouvoir d'achat d'une somme fixe.", "Le rendement réel est le rendement nominal moins l'inflation, et c'est le chiffre qui compte.", "L'argent dont on n'a pas besoin avant trois ans ou plus est le candidat naturel à l'investissement."],
      },
      quiz: {
        title: { en: "Knowledge check: saving versus investing", fr: "Vérification : épargner ou investir" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "A savings account pays 2.5% a year. Prices rise by 4% over the same year. What happened to the real value of the money?", fr: "Un compte d'épargne verse 2,5 % par an. Les prix augmentent de 4 % sur la même année. Qu'est-il arrivé à la valeur réelle de l'argent ?" },
            options: { en: ["It grew by 2.5%", "It grew by 6.5%", "It fell by roughly 1.5%", "It stayed exactly the same"], fr: ["Elle a augmenté de 2,5 %", "Elle a augmenté de 6,5 %", "Elle a baissé d'environ 1,5 %", "Elle est restée exactement la même"] },
            correctIndex: 2,
            explanation: { en: "The balance grew by 2.5% in francs, but each franc buys 4% less. The real return is approximately 2.5% minus 4%, so about minus 1.5%. This is why the nominal interest rate on its own tells you very little.", fr: "Le solde a augmenté de 2,5 % en francs, mais chaque franc achète 4 % de moins. Le rendement réel est d'environ 2,5 % moins 4 %, soit près de moins 1,5 %. C'est pourquoi le taux d'intérêt nominal, à lui seul, dit très peu de choses." },
          },
          {
            prompt: { en: "Which sum is the best candidate for investing rather than saving?", fr: "Quelle somme est la meilleure candidate à l'investissement plutôt qu'à l'épargne ?" },
            options: { en: ["Rent due in six weeks", "An emergency reserve", "Money set aside for a child's university fees in twelve years", "A wedding contribution due next month"], fr: ["Un loyer dû dans six semaines", "Une réserve d'urgence", "De l'argent mis de côté pour les frais universitaires d'un enfant dans douze ans", "Une contribution à un mariage le mois prochain"] },
            correctIndex: 2,
            explanation: { en: "Investing makes sense for money with a long horizon, because time gives value the chance to recover from downturns and lets growth accumulate. The other three sums are needed soon or must stay fully available, so they belong in savings tools.", fr: "Investir a du sens pour l'argent à horizon long, parce que le temps permet à la valeur de se remettre des baisses et laisse la croissance s'accumuler. Les trois autres sommes sont nécessaires bientôt ou doivent rester entièrement disponibles : elles relèvent des outils d'épargne." },
          },
          {
            prompt: { en: "What does a tontine do well that a bank account does not?", fr: "Que fait bien une tontine, que ne fait pas un compte bancaire ?" },
            options: { en: ["It protects against inflation", "It enforces a regular saving habit through social commitment", "It is regulated by COSUMAF", "It pays a guaranteed return"], fr: ["Elle protège contre l'inflation", "Elle impose une habitude d'épargne régulière par l'engagement social", "Elle est réglementée par la COSUMAF", "Elle verse un rendement garanti"] },
            correctIndex: 1,
            explanation: { en: "A tontine's strength is discipline: the group expects your contribution and you expect theirs. It does not grow money, protect it from rising prices, or fall under financial market regulation. Recognising what each tool is for prevents using it for the wrong job.", fr: "La force d'une tontine est la discipline : le groupe attend votre contribution et vous attendez la sienne. Elle ne fait pas croître l'argent, ne le protège pas de la hausse des prix et ne relève pas de la réglementation du marché financier. Reconnaître la fonction de chaque outil évite de l'utiliser pour la mauvaise mission." },
          },
        ],
      },
      body: {
        en: `## A quiet tax on standing still

Inflation is the rise in the general level of prices over time. It is measured by national statistics offices and watched closely by the BEAC, whose mandate includes keeping it low and stable across the CEMAC zone. Some years it is modest; some years, as many households felt after 2022, it bites.

Whatever the number in a given year, the mechanism is the same. If prices rise by 3% and you hold 100,000 FCFA in cash, a year later that cash buys what 97,000 FCFA would have bought before. Hold it for ten years at the same rate and it buys what roughly 74,000 FCFA bought at the start. Nothing was taken from you. The money simply stood still while everything around it moved.

Open the Inflation Lab linked to this lesson and try it yourself. Enter 250,000 FCFA, an inflation assumption, and a number of years. Watch the purchasing-power line fall away from the flat nominal line. These are hypothetical assumptions, not forecasts, but the shape of the curve is always the same.

## Nominal versus real

Two numbers describe any return:

- The **nominal return** is the percentage by which the amount of money grew.
- The **real return** is the nominal return minus inflation. It tells you whether you can buy more or less than before.

A simple hypothetical: a product pays 5% in a year when prices rise 3%. The real return is about 2%. The same product in a year when prices rise 6% delivers a real return of about minus 1%. Same product, same nominal rate, opposite outcome in what matters.

:::
When someone quotes you a rate, always ask the silent second question: compared to what? A return only has meaning next to inflation.
:::

## Why this pushes long-term money towards investment

If money is going to be held for a long time, the goal changes from "keep it intact" to "keep it ahead of prices". Savings tools are built for the first goal. Investments are built for the second, and they charge a price for it: the value will move, sometimes down, along the way.

That is why the time horizon decides the tool. A useful hypothetical split:

1. Needed within two years: save it. Accept low or no growth in exchange for certainty.
2. Needed in two to three years: a cautious middle ground; short-term debt instruments such as treasury bills exist for this range.
3. Not needed for three years or more: this is investment money. Time gives it room to absorb ups and downs.

The three-year marker is not arbitrary. Many collective investment products in the region, including bond-oriented funds, state a recommended holding period of around three years precisely because that is the window over which short-term price movements tend to matter less than accumulated income.

## What this does not mean

It does not mean every franc beyond your reserve must be invested at once, nor that any investment beats inflation. Some do not. It means that the decision to leave long-term money idle is itself a decision, and it is one with a cost you can now measure. The next module introduces the vehicles available to you and what each one actually does with your money.`,
        fr: `## Un impôt silencieux sur l'immobilité

L'inflation est la hausse du niveau général des prix dans le temps. Elle est mesurée par les instituts nationaux de statistique et surveillée de près par la BEAC, dont le mandat comprend son maintien à un niveau bas et stable dans la zone CEMAC. Certaines années, elle est modérée ; d'autres, comme beaucoup de ménages l'ont ressenti après 2022, elle mord.

Quel que soit le chiffre d'une année donnée, le mécanisme est le même. Si les prix augmentent de 3 % et que vous détenez 100 000 FCFA en liquide, un an plus tard ce liquide achète ce que 97 000 FCFA auraient acheté avant. Gardez-le dix ans au même rythme et il achète ce qu'environ 74 000 FCFA achetaient au départ. On ne vous a rien pris. L'argent est simplement resté immobile pendant que tout bougeait autour de lui.

Ouvrez le Laboratoire sur l'inflation lié à cette leçon et faites l'essai. Saisissez 250 000 FCFA, une hypothèse d'inflation et un nombre d'années. Regardez la courbe du pouvoir d'achat s'éloigner de la ligne plate du montant nominal. Ce sont des hypothèses, pas des prévisions, mais la forme de la courbe est toujours la même.

## Nominal et réel

Deux chiffres décrivent tout rendement :

- Le **rendement nominal** est le pourcentage de croissance de la somme d'argent.
- Le **rendement réel** est le rendement nominal moins l'inflation. Il indique si vous pouvez acheter plus ou moins qu'avant.

Un exemple hypothétique simple : un produit verse 5 % une année où les prix montent de 3 %. Le rendement réel est d'environ 2 %. Le même produit, une année où les prix montent de 6 %, donne un rendement réel d'environ moins 1 %. Même produit, même taux nominal, résultat opposé sur ce qui compte.

:::
Quand on vous cite un taux, posez toujours la seconde question silencieuse : par rapport à quoi ? Un rendement n'a de sens qu'à côté de l'inflation.
:::

## Pourquoi cela pousse l'argent à long terme vers l'investissement

Si l'argent doit être conservé longtemps, l'objectif passe de « le garder intact » à « le garder devant les prix ». Les outils d'épargne sont construits pour le premier objectif. Les investissements sont construits pour le second, et ils en font payer le prix : la valeur bougera, parfois à la baisse, en chemin.

C'est pourquoi l'horizon de temps décide de l'outil. Une répartition hypothétique utile :

1. Nécessaire d'ici deux ans : épargnez. Acceptez une croissance faible ou nulle en échange de la certitude.
2. Nécessaire dans deux à trois ans : un entre-deux prudent ; des instruments de dette à court terme comme les bons du Trésor existent pour cette plage.
3. Pas nécessaire avant trois ans ou plus : c'est de l'argent d'investissement. Le temps lui laisse de la marge pour absorber les hauts et les bas.

Le repère des trois ans n'est pas arbitraire. De nombreux produits de placement collectif de la région, y compris les fonds à orientation obligataire, indiquent une durée de détention recommandée d'environ trois ans, précisément parce que c'est la fenêtre sur laquelle les mouvements de prix à court terme tendent à peser moins que les revenus accumulés.

## Ce que cela ne signifie pas

Cela ne signifie pas que chaque franc au-delà de votre réserve doit être investi immédiatement, ni que tout investissement bat l'inflation. Certains n'y parviennent pas. Cela signifie que la décision de laisser l'argent à long terme inactif est elle-même une décision, et qu'elle a un coût que vous savez désormais mesurer. Le module suivant présente les véhicules à votre disposition et ce que chacun fait réellement de votre argent.`,
      },
    },
  ],
};

const module3: ModuleDef = {
  title: { en: "Understanding Investment Vehicles", fr: "Comprendre les véhicules d'investissement" },
  lessons: [
    {
      slug: "the-main-investment-vehicles",
      title: { en: "The main investment vehicles", fr: "Les principaux véhicules d'investissement" },
      kind: "reading",
      durationMinutes: 8,
      videoSlug: "invest-without-starting-a-business",
      keyTakeaways: {
        en: ["A vehicle is the legal form through which your money reaches an asset: a deposit, a bond, a share, a fund, property or a business.", "You can invest without running a business; lending to a government through a bond is one of the oldest ways.", "Each vehicle trades off expected return, risk, liquidity and the effort it demands from you."],
        fr: ["Un véhicule est la forme juridique par laquelle votre argent atteint un actif : un dépôt, une obligation, une action, un fonds, un bien immobilier ou une entreprise.", "On peut investir sans gérer une entreprise ; prêter à un État via une obligation est l'une des façons les plus anciennes.", "Chaque véhicule arbitre entre rendement espéré, risque, liquidité et effort demandé."],
      },
      body: {
        en: `## "Investing" is not one thing

When people in Douala or Yaoundé say they want to invest, they often mean starting a business: a shop, a taxi, a plot of land to build on. Those are investments. They are also demanding ones: they need your time, management skill, and usually a large sum concentrated in a single venture.

There is another family of investments that asks less of you. These are financial instruments: you provide capital, someone else does the work, and you receive a share of the result. Understanding the main ones lets you compare them honestly with the business option, rather than assuming business is the only road.

## The six vehicles you will meet

**Term deposits.** You lend money to a bank for a fixed period at a fixed rate. Low risk, low return, limited access before maturity.

**Bonds and treasury securities.** You lend to a government or a company. In the CEMAC region, member states regularly issue treasury bills (BTA) for short periods and treasury bonds (OTA) for several years, often in units of 10,000 FCFA, through the BEAC's auction system and the regional market. You receive interest (the coupon) and the principal at maturity. The main risks are that the issuer fails to pay and that the bond's market value falls if interest rates rise.

**Shares (equities).** You buy a piece of a company listed on the BVMAC. If the company grows and pays dividends, you share in it. If it struggles, your shares lose value. Equities are the most volatile of the common vehicles.

**Mutual funds (FCP).** Many investors pool their money; a licensed management company invests it according to a stated strategy, under COSUMAF supervision. You hold units whose value tracks the fund's portfolio. This is the vehicle that lets someone with 10,000 FCFA access a diversified bond portfolio they could never assemble alone. Module 5 covers funds in depth.

**Property.** Land and buildings. Tangible, familiar, and potentially rewarding, but expensive to enter, slow to sell, and far more concentrated than most people realise: one plot in one neighbourhood is a single bet.

**Private business.** The highest potential return and the highest risk, requiring your time and skill. Also the hardest to exit.

| Vehicle | Typical risk | Liquidity | Minimum effort | Minimum amount |
| --- | --- | --- | --- | --- |
| Term deposit | Low | Low until maturity | Very low | Varies by bank |
| Treasury bond | Low to moderate | Moderate | Low | Often 10,000 FCFA units |
| Listed share | High | Moderate (BVMAC volumes are thin) | Moderate | One share |
| Mutual fund | Depends on strategy | Per the fund's rules | Very low | From 10,000 FCFA for some funds |
| Property | Moderate to high | Very low | High | Millions of FCFA |
| Own business | Very high | Very low | Very high | Varies widely |

## Can you invest without starting a business?

Yes, and for many people it is the better first step. Lending to the state through a treasury bond, or joining a regulated fund that does so on your behalf, lets you earn a return without running anything, with a documented risk profile and a defined way to get your money back. It also spreads your capital instead of concentrating it in one shop on one street.

:::
Starting a business and buying a bond are both investments. One asks for your life; the other asks for your patience.
:::

The next lesson looks at the ingredient that makes all of these vehicles work over time: compounding, and why starting early matters more than starting big.`,
        fr: `## « Investir » n'est pas une seule chose

Quand on dit à Douala ou à Yaoundé qu'on veut investir, on pense souvent à créer une entreprise : une boutique, un taxi, un terrain à bâtir. Ce sont des investissements. Ce sont aussi des investissements exigeants : ils demandent du temps, des compétences de gestion et, le plus souvent, une somme importante concentrée dans une seule affaire.

Il existe une autre famille d'investissements qui demande moins. Ce sont les instruments financiers : vous apportez le capital, quelqu'un d'autre fait le travail, et vous recevez une part du résultat. Comprendre les principaux permet de les comparer honnêtement à l'option entrepreneuriale, au lieu de supposer que l'entreprise est la seule voie.

## Les six véhicules que vous rencontrerez

**Les dépôts à terme.** Vous prêtez de l'argent à une banque pour une durée fixe à un taux fixe. Risque faible, rendement faible, accès limité avant l'échéance.

**Les obligations et titres publics.** Vous prêtez à un État ou à une entreprise. Dans la zone CEMAC, les États membres émettent régulièrement des bons du Trésor assimilables (BTA) à court terme et des obligations du Trésor assimilables (OTA) sur plusieurs années, souvent par coupures de 10 000 FCFA, via le système d'adjudication de la BEAC et le marché régional. Vous recevez des intérêts (le coupon) puis le capital à l'échéance. Les principaux risques : que l'émetteur ne paie pas, et que la valeur de marché de l'obligation baisse si les taux montent.

**Les actions.** Vous achetez une fraction d'une entreprise cotée à la BVMAC. Si l'entreprise se développe et verse des dividendes, vous en profitez. Si elle peine, vos actions perdent de la valeur. Les actions sont le plus volatil des véhicules courants.

**Les fonds communs de placement (FCP).** De nombreux investisseurs mettent leur argent en commun ; une société de gestion agréée l'investit selon une stratégie définie, sous la supervision de la COSUMAF. Vous détenez des parts dont la valeur suit le portefeuille du fonds. C'est le véhicule qui permet à une personne disposant de 10 000 FCFA d'accéder à un portefeuille obligataire diversifié qu'elle ne pourrait jamais constituer seule. Le module 5 traite des fonds en détail.

**L'immobilier.** Terrains et bâtiments. Tangible, familier et potentiellement rémunérateur, mais coûteux à l'entrée, lent à revendre et bien plus concentré qu'on ne le croit : un terrain dans un quartier est un pari unique.

**L'entreprise privée.** Le potentiel de rendement le plus élevé et le risque le plus élevé, exigeant votre temps et vos compétences. C'est aussi le plus difficile à quitter.

| Véhicule | Risque typique | Liquidité | Effort minimal | Montant minimal |
| --- | --- | --- | --- | --- |
| Dépôt à terme | Faible | Faible avant l'échéance | Très faible | Selon la banque |
| Obligation du Trésor | Faible à modéré | Modérée | Faible | Souvent par coupures de 10 000 FCFA |
| Action cotée | Élevé | Modérée (les volumes à la BVMAC sont réduits) | Modéré | Une action |
| Fonds commun de placement | Selon la stratégie | Selon les règles du fonds | Très faible | À partir de 10 000 FCFA pour certains fonds |
| Immobilier | Modéré à élevé | Très faible | Élevé | Plusieurs millions de FCFA |
| Entreprise propre | Très élevé | Très faible | Très élevé | Très variable |

## Peut-on investir sans créer d'entreprise ?

Oui, et pour beaucoup c'est la meilleure première étape. Prêter à l'État via une obligation du Trésor, ou rejoindre un fonds réglementé qui le fait pour vous, permet de percevoir un rendement sans rien gérer, avec un profil de risque documenté et un mode de sortie défini. Cela répartit aussi votre capital au lieu de le concentrer dans une boutique d'une seule rue.

:::
Créer une entreprise et acheter une obligation sont deux investissements. L'un demande votre vie ; l'autre demande votre patience.
:::

La leçon suivante s'intéresse à l'ingrédient qui fait fonctionner tous ces véhicules dans le temps : la capitalisation, et pourquoi commencer tôt compte plus que commencer gros.`,
      },
    },
    {
      slug: "compounding-and-time",
      title: { en: "Compounding and the value of time", fr: "La capitalisation et la valeur du temps" },
      kind: "reading",
      durationMinutes: 7,
      labSlug: "growth",
      videoSlug: "compound-growth-explained",
      keyTakeaways: {
        en: ["Compounding means earning a return on previous returns, not only on the original capital.", "Time is the most powerful input: an earlier start usually beats a larger later contribution.", "Regular contributions matter as much as the rate, and the rate is never guaranteed."],
        fr: ["Capitaliser, c'est percevoir un rendement sur les rendements précédents, pas seulement sur le capital initial.", "Le temps est l'ingrédient le plus puissant : commencer tôt vaut généralement mieux qu'un versement plus important plus tard.", "Les versements réguliers comptent autant que le taux, et le taux n'est jamais garanti."],
      },
      quiz: {
        title: { en: "Knowledge check: vehicles and compounding", fr: "Vérification : véhicules et capitalisation" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "When you buy a treasury bond (OTA) issued by a CEMAC member state, what are you doing?", fr: "Lorsque vous achetez une obligation du Trésor (OTA) émise par un État de la CEMAC, que faites-vous ?" },
            options: { en: ["Buying a share of the government", "Lending money to the state in exchange for interest and repayment at maturity", "Opening a savings account at the BEAC", "Buying units in a mutual fund"], fr: ["Vous achetez une part de l'État", "Vous prêtez de l'argent à l'État en échange d'intérêts et d'un remboursement à l'échéance", "Vous ouvrez un compte d'épargne à la BEAC", "Vous achetez des parts d'un fonds commun de placement"] },
            correctIndex: 1,
            explanation: { en: "A bond is a loan. The state borrows from investors, pays a coupon during the life of the bond, and repays the principal at maturity. Shares represent ownership; bonds represent credit. The distinction drives everything about how each one behaves.", fr: "Une obligation est un prêt. L'État emprunte auprès des investisseurs, verse un coupon pendant la durée de vie de l'obligation et rembourse le capital à l'échéance. Les actions représentent la propriété ; les obligations représentent le crédit. Cette distinction explique tout le comportement de chacun." },
          },
          {
            prompt: { en: "Two people invest under the same hypothetical 6% annual assumption. Amina invests 20,000 FCFA a month from age 25 to 35, then stops. Boris invests 20,000 FCFA a month from 35 to 55. At 55, who is likely to have more?", fr: "Deux personnes investissent sous la même hypothèse de 6 % par an. Amina verse 20 000 FCFA par mois de 25 à 35 ans, puis s'arrête. Boris verse 20 000 FCFA par mois de 35 à 55 ans. À 55 ans, qui est susceptible d'avoir le plus ?" },
            options: { en: ["Boris, because he contributed twice as much", "Amina, because her money compounded for twenty extra years", "They will have exactly the same", "It cannot be estimated"], fr: ["Boris, parce qu'il a versé deux fois plus", "Amina, parce que son argent a capitalisé pendant vingt années supplémentaires", "Ils auront exactement la même somme", "C'est impossible à estimer"] },
            correctIndex: 1,
            explanation: { en: "Under that hypothetical assumption, Amina's ten years of contributions have thirty years to compound, while Boris's twenty years have at most twenty. Run both cases in the Growth Lab: the early starter typically finishes ahead despite contributing half as much. The rate is an assumption; the effect of time is structural.", fr: "Sous cette hypothèse, les dix années de versements d'Amina ont trente ans pour capitaliser, tandis que les vingt années de Boris en ont au plus vingt. Testez les deux cas dans le Laboratoire de croissance : celle qui commence tôt termine généralement devant, malgré des versements deux fois moindres. Le taux est une hypothèse ; l'effet du temps est structurel." },
          },
          {
            prompt: { en: "Which statement about compounding is correct?", fr: "Quelle affirmation sur la capitalisation est exacte ?" },
            options: { en: ["Compounding guarantees that an investment will grow", "Compounding only works for amounts above one million FCFA", "Compounding means returns are earned on past returns as well as on the original capital", "Compounding is another word for inflation"], fr: ["La capitalisation garantit qu'un investissement va croître", "La capitalisation ne fonctionne que pour les montants supérieurs à un million de FCFA", "La capitalisation signifie que les rendements sont perçus sur les rendements passés comme sur le capital initial", "La capitalisation est un autre mot pour l'inflation"] },
            correctIndex: 2,
            explanation: { en: "Compounding is a mechanism, not a promise. It describes what happens when earnings stay invested and themselves earn. It works on any amount, and it works in reverse too: losses that are not recovered reduce the base on which future returns are earned.", fr: "La capitalisation est un mécanisme, pas une promesse. Elle décrit ce qui se passe quand les gains restent investis et produisent à leur tour. Elle fonctionne sur tout montant, et aussi en sens inverse : les pertes non rattrapées réduisent la base sur laquelle les rendements futurs sont perçus." },
          },
        ],
      },
      body: {
        en: `## Interest on interest

Suppose, purely as an assumption, that an investment of 100,000 FCFA earns 6% in a year. At the end of year one you have 106,000 FCFA. If you leave everything in place, year two's 6% is earned on 106,000, not on 100,000. You end year two with 112,360 FCFA: the extra 360 FCFA is the return on last year's return.

That is compounding. In a single year it looks trivial. Over twenty years, under the same hypothetical rate, the 100,000 FCFA becomes roughly 320,000 FCFA, and more than two-thirds of the gain comes from returns on returns rather than from the original sum.

## Why time beats size

Open the Growth Lab linked to this lesson and run two scenarios with the same assumed rate:

- Scenario A: 20,000 FCFA a month for 30 years.
- Scenario B: 40,000 FCFA a month for 15 years.

Both people contribute the same total, 7.2 million FCFA. Under a hypothetical 6% assumption, A finishes far ahead, because the early contributions spent decades compounding. Doubling the monthly amount did not make up for halving the time.

This is the single most practical lesson in investing: the best moment to start is when the amount is small and the horizon is long. Waiting until you "have enough to make it worthwhile" is the most expensive form of patience.

:::
Every assumption in this lesson is hypothetical. Real investments do not deliver a smooth rate every year. Some years are negative. The arithmetic of compounding still holds over long periods, but the path is never a straight line.
:::

## The three levers

Only three inputs determine where a simple compounding scenario ends:

1. **How much** you put in, and how regularly.
2. **How long** it stays invested.
3. **What rate** it earns, after fees and inflation.

You fully control the first two. You do not control the third; you can only choose vehicles whose risk you understand and whose fees are reasonable. Many beginners obsess over the rate and neglect the first two levers, which are the ones in their hands.

## Compounding in reverse

The mechanism cuts both ways. If a value falls 20%, it must then rise 25% just to return to where it was, because the recovery is earned on a smaller base. This is why large losses are so costly and why the next module, on risk, matters as much as this one. Growth and loss use the same arithmetic.

## Reinvesting versus taking income

Compounding only happens if returns stay invested. A fund that reinvests its income (a capitalisation fund) compounds automatically. A fund that pays income out (a distribution fund) gives you cash each year, which you may need, but which no longer compounds inside the fund unless you reinvest it yourself. Neither choice is wrong. They suit different lives, and you will compare them directly in Module 5 and in the Capitalisation versus Distribution Lab.`,
        fr: `## Des intérêts sur les intérêts

Supposons, par pure hypothèse, qu'un investissement de 100 000 FCFA rapporte 6 % en un an. À la fin de la première année, vous avez 106 000 FCFA. Si vous laissez tout en place, les 6 % de la deuxième année sont calculés sur 106 000, pas sur 100 000. Vous terminez la deuxième année avec 112 360 FCFA : les 360 FCFA supplémentaires sont le rendement du rendement de l'année précédente.

C'est la capitalisation. Sur une seule année, elle paraît dérisoire. Sur vingt ans, sous la même hypothèse de taux, les 100 000 FCFA deviennent environ 320 000 FCFA, et plus des deux tiers du gain proviennent des rendements sur rendements plutôt que de la somme initiale.

## Pourquoi le temps bat le montant

Ouvrez le Laboratoire de croissance lié à cette leçon et lancez deux scénarios avec le même taux supposé :

- Scénario A : 20 000 FCFA par mois pendant 30 ans.
- Scénario B : 40 000 FCFA par mois pendant 15 ans.

Les deux personnes versent le même total, 7,2 millions de FCFA. Sous une hypothèse de 6 %, A termine loin devant, parce que les premiers versements ont passé des décennies à capitaliser. Doubler le montant mensuel n'a pas compensé la moitié du temps perdu.

C'est la leçon la plus pratique de tout l'investissement : le meilleur moment pour commencer, c'est quand le montant est petit et l'horizon long. Attendre d'« avoir assez pour que ça en vaille la peine » est la forme de patience la plus coûteuse.

:::
Chaque hypothèse de cette leçon est fictive. Les investissements réels ne délivrent pas un taux régulier chaque année. Certaines années sont négatives. L'arithmétique de la capitalisation reste valable sur de longues périodes, mais le chemin n'est jamais une ligne droite.
:::

## Les trois leviers

Seules trois variables déterminent l'issue d'un scénario simple de capitalisation :

1. **Combien** vous versez, et à quelle régularité.
2. **Combien de temps** l'argent reste investi.
3. **Quel taux** il perçoit, après frais et après inflation.

Vous contrôlez entièrement les deux premiers. Vous ne contrôlez pas le troisième ; vous pouvez seulement choisir des véhicules dont vous comprenez le risque et dont les frais sont raisonnables. Beaucoup de débutants se focalisent sur le taux et négligent les deux premiers leviers, qui sont précisément ceux entre leurs mains.

## La capitalisation à l'envers

Le mécanisme joue dans les deux sens. Si une valeur chute de 20 %, elle doit ensuite remonter de 25 % simplement pour revenir à son niveau, parce que la remontée se calcule sur une base plus petite. C'est pourquoi les grosses pertes coûtent si cher, et pourquoi le module suivant, sur le risque, compte autant que celui-ci. Croissance et perte utilisent la même arithmétique.

## Réinvestir ou percevoir les revenus

La capitalisation n'a lieu que si les rendements restent investis. Un fonds qui réinvestit ses revenus (un fonds de capitalisation) capitalise automatiquement. Un fonds qui verse ses revenus (un fonds de distribution) vous donne du liquide chaque année, dont vous pouvez avoir besoin, mais qui ne capitalise plus dans le fonds, sauf si vous le réinvestissez vous-même. Aucun des deux choix n'est faux. Ils conviennent à des vies différentes, et vous les comparerez directement au module 5 et dans le Laboratoire capitalisation contre distribution.`,
      },
    },
  ],
};

const module4: ModuleDef = {
  title: { en: "Introduction to Risk and Return", fr: "Introduction au risque et au rendement" },
  lessons: [
    {
      slug: "what-risk-really-means",
      title: { en: "What risk really means", fr: "Ce que signifie vraiment le risque" },
      kind: "reading",
      durationMinutes: 7,
      videoSlug: "what-is-investment-risk",
      keyTakeaways: {
        en: ["Risk is the possibility that an outcome differs from what you expected, including losing money.", "There are several distinct risks: market, credit, interest rate, liquidity, currency and concentration.", "Risk cannot be removed, only understood, measured and matched to your horizon."],
        fr: ["Le risque est la possibilité qu'un résultat diffère de ce que vous attendiez, y compris une perte.", "Il existe plusieurs risques distincts : de marché, de crédit, de taux, de liquidité, de change et de concentration.", "Le risque ne s'élimine pas ; il se comprend, se mesure et s'adapte à votre horizon."],
      },
      body: {
        en: `## A word that is used too loosely

"Risky" is used in everyday speech to mean "likely to fail". In investing, risk has a more precise meaning: the possibility that what actually happens differs from what you expected. A bond that was supposed to pay 5% and pays 5% carried risk; it simply did not materialise. A bond whose issuer missed a payment is the same risk, materialised.

Risk is therefore not a property you can switch off. Every vehicle in the previous module carries it, in different forms and amounts. What you can do is name the forms, understand which ones apply to a given investment, and decide whether you can live with them for the time you plan to stay invested.

## Six risks worth naming

- **Market risk.** The value of investments moves with overall conditions. Even a well-run bond fund's unit value can fall when yields rise across the whole market.
- **Credit risk.** The borrower may not pay. A state and a small company do not carry the same credit risk, and the interest they pay reflects that difference.
- **Interest rate risk.** When rates rise, existing bonds that pay the old, lower rate become less attractive, and their market price falls. Longer bonds are more sensitive.
- **Liquidity risk.** Some assets cannot be sold quickly at a fair price. A plot of land can take a year to sell. A fund with redemption rules protects remaining investors, which is why holding periods exist.
- **Currency risk.** Assets in another currency change value as exchange rates move. The FCFA's fixed parity with the euro reduces this for euro-linked assets, but a diaspora investor earning in dollars or pounds still carries it.
- **Concentration risk.** Holding most of your wealth in one thing, whether a single business, one plot or one issuer, means a single bad event can hurt everything you own.

Open the Risk Explorer linked to the next lesson. Each risk comes with a hypothetical scenario you can step through.

## The risk nobody lists: yourself

The investor's own behaviour is a risk factor. Selling in a panic after a fall, buying because a neighbour did, or abandoning a plan after one disappointing year are decisions that turn temporary movements into permanent losses. The remedy is not willpower. It is having decided in advance, in writing if necessary, what you will do when values fall.

:::
A fall in value is not a loss until you sell. It becomes a loss when the fall is permanent, or when you convert it into one by exiting at the bottom.
:::

## Risk and the regulated fund

A licensed fund does not eliminate these risks, and any document that claims otherwise should alarm you. What a regulated structure does is make them visible and bounded: the information document lists them, the management company must follow stated limits, the depositary holds the assets separately, and the regulator supervises. Reading the risk section of a fund's information document before subscribing is the single most useful ten minutes in the entire process.

The next lesson turns to the other side of the coin: why higher expected return and higher risk travel together, and what a reasonable relationship between them looks like.`,
        fr: `## Un mot employé trop librement

« Risqué », dans le langage courant, signifie « susceptible d'échouer ». En investissement, le risque a un sens plus précis : la possibilité que ce qui se produit réellement diffère de ce que vous attendiez. Une obligation censée verser 5 % et qui verse 5 % portait un risque ; il ne s'est simplement pas matérialisé. Une obligation dont l'émetteur a manqué un paiement porte le même risque, matérialisé.

Le risque n'est donc pas une propriété que l'on peut désactiver. Chaque véhicule du module précédent en porte, sous des formes et dans des proportions différentes. Ce que vous pouvez faire, c'est nommer ces formes, comprendre lesquelles s'appliquent à un investissement donné, et décider si vous pouvez vivre avec pendant la durée prévue de votre placement.

## Six risques à nommer

- **Le risque de marché.** La valeur des investissements évolue avec les conditions générales. Même la valeur de la part d'un fonds obligataire bien géré peut baisser quand les taux montent sur l'ensemble du marché.
- **Le risque de crédit.** L'emprunteur peut ne pas payer. Un État et une petite entreprise ne portent pas le même risque de crédit, et l'intérêt qu'ils versent reflète cette différence.
- **Le risque de taux.** Quand les taux montent, les obligations existantes qui versent l'ancien taux, plus bas, deviennent moins attractives et leur prix de marché baisse. Les obligations longues sont plus sensibles.
- **Le risque de liquidité.** Certains actifs ne peuvent pas être vendus rapidement à un prix juste. Un terrain peut mettre un an à se vendre. Un fonds doté de règles de rachat protège les investisseurs restants : c'est la raison d'être des durées de détention.
- **Le risque de change.** Les actifs libellés dans une autre devise changent de valeur avec les taux de change. La parité fixe du FCFA avec l'euro réduit ce risque pour les actifs liés à l'euro, mais un investisseur de la diaspora qui gagne en dollars ou en livres le porte toujours.
- **Le risque de concentration.** Détenir l'essentiel de son patrimoine dans une seule chose, qu'il s'agisse d'une entreprise, d'un terrain ou d'un émetteur, signifie qu'un seul événement défavorable peut toucher tout ce que vous possédez.

Ouvrez l'Explorateur de risques lié à la leçon suivante. Chaque risque y est accompagné d'un scénario hypothétique à parcourir.

## Le risque que personne ne cite : vous-même

Le comportement de l'investisseur est lui-même un facteur de risque. Vendre dans la panique après une baisse, acheter parce que le voisin l'a fait, ou abandonner un plan après une année décevante sont des décisions qui transforment des mouvements temporaires en pertes définitives. Le remède n'est pas la volonté. C'est d'avoir décidé à l'avance, par écrit si nécessaire, ce que vous ferez quand les valeurs baisseront.

:::
Une baisse de valeur n'est pas une perte tant que vous ne vendez pas. Elle devient une perte quand la baisse est définitive, ou quand vous la rendez définitive en sortant au plus bas.
:::

## Le risque et le fonds réglementé

Un fonds agréé n'élimine pas ces risques, et tout document qui prétend le contraire devrait vous alarmer. Ce qu'une structure réglementée fait, c'est les rendre visibles et encadrés : le document d'information les énumère, la société de gestion doit respecter des limites définies, le dépositaire conserve les actifs séparément, et le régulateur supervise. Lire la section « risques » du document d'information d'un fonds avant de souscrire est le quart d'heure le plus utile de tout le processus.

La leçon suivante aborde l'autre face de la médaille : pourquoi un rendement espéré plus élevé et un risque plus élevé vont de pair, et à quoi ressemble une relation raisonnable entre les deux.`,
      },
    },
    {
      slug: "the-risk-return-relationship",
      title: { en: "The risk–return relationship", fr: "La relation entre risque et rendement" },
      kind: "reading",
      durationMinutes: 8,
      labSlug: "risk",
      keyTakeaways: {
        en: ["Higher expected return is the compensation investors demand for accepting more uncertainty.", "An offer of high return with no risk is a contradiction, and usually a warning sign.", "Diversification reduces the risk you are not paid for; it does not remove market risk."],
        fr: ["Un rendement espéré plus élevé est la compensation que les investisseurs exigent pour accepter plus d'incertitude.", "Une offre de rendement élevé sans risque est une contradiction, et généralement un signal d'alerte.", "La diversification réduit le risque pour lequel on n'est pas rémunéré ; elle ne supprime pas le risque de marché."],
      },
      quiz: {
        title: { en: "Knowledge check: risk and return", fr: "Vérification : risque et rendement" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "A bond from a small private company offers a higher interest rate than a treasury bond of the same maturity. Why?", fr: "Une obligation d'une petite entreprise privée offre un taux plus élevé qu'une obligation du Trésor de même maturité. Pourquoi ?" },
            options: { en: ["Private companies are more generous", "Investors demand extra return to compensate for the higher credit risk", "Treasury bonds are not allowed to pay high rates", "The private bond is always a better investment"], fr: ["Les entreprises privées sont plus généreuses", "Les investisseurs exigent un rendement supplémentaire pour compenser le risque de crédit plus élevé", "Les obligations du Trésor n'ont pas le droit de verser des taux élevés", "L'obligation privée est toujours un meilleur investissement"] },
            correctIndex: 1,
            explanation: { en: "The extra interest is the price of extra uncertainty about repayment. It is not a bonus; it is compensation. Whether it is enough compensation depends on how likely the company is to default, which is exactly the judgement a fund manager is paid to make.", fr: "L'intérêt supplémentaire est le prix de l'incertitude supplémentaire sur le remboursement. Ce n'est pas un bonus ; c'est une compensation. Savoir si elle est suffisante dépend de la probabilité de défaut de l'entreprise, et c'est précisément le jugement pour lequel un gérant de fonds est rémunéré." },
          },
          {
            prompt: { en: "Interest rates in the region rise. What happens to the market value of a bond already held in a portfolio?", fr: "Les taux d'intérêt de la région montent. Qu'arrive-t-il à la valeur de marché d'une obligation déjà détenue en portefeuille ?" },
            options: { en: ["It rises, because rates are higher", "It falls, because new bonds now pay more than the old one", "Nothing changes until maturity", "It becomes impossible to sell"], fr: ["Elle monte, parce que les taux sont plus élevés", "Elle baisse, parce que les nouvelles obligations versent désormais plus que l'ancienne", "Rien ne change avant l'échéance", "Elle devient impossible à vendre"] },
            correctIndex: 1,
            explanation: { en: "An existing bond keeps paying its old coupon. If new bonds pay more, a buyer will only take the old one at a discount. That discount is the interest-rate risk you studied. If you hold the bond to maturity and the issuer pays, you still receive the face value; the fall only matters if you must sell early or if the value is marked daily, as in a fund.", fr: "Une obligation existante continue de verser son ancien coupon. Si les nouvelles versent davantage, un acheteur ne reprendra l'ancienne qu'avec une décote. Cette décote est le risque de taux étudié. Si vous conservez l'obligation jusqu'à l'échéance et que l'émetteur paie, vous recevez tout de même la valeur nominale ; la baisse ne compte que si vous devez vendre avant, ou si la valeur est évaluée régulièrement, comme dans un fonds." },
          },
          {
            prompt: { en: "What does diversification do?", fr: "Que fait la diversification ?" },
            options: { en: ["Removes all risk from a portfolio", "Guarantees a positive return", "Reduces the impact of any single holding's bad outcome on the whole portfolio", "Increases expected return without any trade-off"], fr: ["Elle supprime tout risque d'un portefeuille", "Elle garantit un rendement positif", "Elle réduit l'impact du mauvais résultat d'une seule ligne sur l'ensemble du portefeuille", "Elle augmente le rendement espéré sans aucune contrepartie"] },
            correctIndex: 2,
            explanation: { en: "Spreading capital across many issuers, sectors or asset types means no single failure dominates. It addresses concentration risk specifically. It does nothing against risks that hit everything at once, such as a general rise in rates, which is why a diversified bond fund can still see its unit value fall.", fr: "Répartir le capital entre de nombreux émetteurs, secteurs ou types d'actifs évite qu'une seule défaillance domine. Cela traite spécifiquement le risque de concentration. Cela ne protège pas des risques qui frappent tout en même temps, comme une hausse générale des taux : c'est pourquoi la valeur de la part d'un fonds obligataire diversifié peut tout de même baisser." },
          },
        ],
      },
      body: {
        en: `## Why return and risk travel together

Imagine two borrowers approach you for a loan of 500,000 FCFA. One is the state, which collects taxes and has repaid its bills for decades. The other is a friend's new transport company with two cars and no track record. Would you lend to both at the same rate? Of course not. You would ask the transport company for more interest, because the chance of not being repaid is higher.

That instinct is the entire risk–return relationship. Investors, taken together, demand more expected return for more uncertainty. A higher advertised return is therefore not good news on its own. It is information: it tells you the market considers the investment riskier, or that something is wrong with the offer.

:::
"High return, no risk" is not an opportunity. It is either a misunderstanding or a fraud. In regulated markets, the two move together, always.
:::

## Expected versus realised

The word "expected" matters. A riskier investment has a higher expected return, meaning a higher average over many possible outcomes. It does not have a higher guaranteed return. A diversified portfolio of equities may be expected to outperform treasury bonds over twenty years and still underperform them over any given three. The compensation for risk is paid on average and over time, not every year.

This is why horizon keeps returning as the central idea of this course. Risk that is unbearable over one year can be perfectly tolerable over ten, because time gives the average a chance to assert itself.

## What diversification does and does not do

Risk comes in two broad kinds:

| Kind | Example | Can diversification reduce it? |
| --- | --- | --- |
| Specific to one holding | One company defaults; one plot floods | Yes, substantially |
| Common to the whole market | Rates rise across CEMAC; inflation spikes | No |

Spreading capital across many bonds, issuers and maturities removes most of the first kind. A single default in a portfolio of forty bonds hurts; a single default in a portfolio of one bond is catastrophic. This is the core service a mutual fund provides: a diversification that a 10,000 FCFA investor could never build alone.

Diversification does nothing against the second kind. When yields rise across the whole region, every bond is repriced. The fund's unit value falls regardless of how many bonds it holds. That is market risk, and the only defence against it is horizon: if you can wait, the bonds mature, coupons keep arriving, and new bonds are bought at the higher rates.

## Putting a number on it

The Risk Explorer linked to this lesson lets you step through hypothetical scenarios: a one-point rise in rates, a single issuer delaying payment, a liquidity squeeze. Each shows an illustrative impact on a bond portfolio. None of them is a forecast. Their purpose is to make the abstract concrete: a 4% fall in value, for example, is a number you can look at and ask yourself whether you could hold through it without selling.

That question, asked honestly before you invest, is the beginning of a real risk tolerance. Not "do I like risk?" but "what fall could I watch without acting?" Your answer decides how much of your long-term money belongs in which vehicle. The next module examines the vehicle designed for people who want professional diversification without large sums: the mutual fund.`,
        fr: `## Pourquoi rendement et risque vont de pair

Imaginez que deux emprunteurs vous sollicitent pour un prêt de 500 000 FCFA. L'un est l'État, qui perçoit des impôts et rembourse ses titres depuis des décennies. L'autre est la nouvelle société de transport d'un ami, avec deux voitures et aucun historique. Leur prêteriez-vous au même taux ? Évidemment non. Vous demanderiez plus d'intérêts à la société de transport, parce que la probabilité de ne pas être remboursé est plus élevée.

Cet instinct résume toute la relation entre risque et rendement. Les investisseurs, pris ensemble, exigent plus de rendement espéré pour plus d'incertitude. Un rendement affiché plus élevé n'est donc pas une bonne nouvelle en soi. C'est une information : elle indique que le marché considère l'investissement comme plus risqué, ou que quelque chose cloche dans l'offre.

:::
« Rendement élevé, aucun risque » n'est pas une opportunité. C'est soit une incompréhension, soit une fraude. Sur les marchés réglementés, les deux évoluent ensemble, toujours.
:::

## Espéré et réalisé

Le mot « espéré » compte. Un investissement plus risqué a un rendement espéré plus élevé, c'est-à-dire une moyenne plus élevée sur l'ensemble des résultats possibles. Il n'a pas un rendement garanti plus élevé. Un portefeuille d'actions diversifié peut être attendu au-dessus des obligations du Trésor sur vingt ans et rester en dessous sur n'importe quelle période de trois ans. La compensation du risque se paie en moyenne et dans la durée, pas chaque année.

C'est pourquoi l'horizon revient sans cesse comme l'idée centrale de ce cours. Un risque insupportable sur un an peut être parfaitement tolérable sur dix, parce que le temps donne à la moyenne une chance de s'imposer.

## Ce que la diversification fait, et ne fait pas

Le risque se présente sous deux grandes formes :

| Forme | Exemple | La diversification peut-elle la réduire ? |
| --- | --- | --- |
| Propre à une ligne | Une entreprise fait défaut ; un terrain est inondé | Oui, largement |
| Commune à tout le marché | Les taux montent dans toute la CEMAC ; l'inflation s'envole | Non |

Répartir le capital entre de nombreuses obligations, émetteurs et échéances supprime l'essentiel de la première forme. Un défaut dans un portefeuille de quarante obligations fait mal ; un défaut dans un portefeuille d'une seule obligation est une catastrophe. C'est le service fondamental que rend un fonds commun de placement : une diversification qu'un investisseur de 10 000 FCFA ne pourrait jamais construire seul.

La diversification ne peut rien contre la seconde forme. Quand les taux montent dans toute la région, chaque obligation est réévaluée. La valeur de la part du fonds baisse, quel que soit le nombre d'obligations détenues. C'est le risque de marché, et la seule défense est l'horizon : si vous pouvez attendre, les obligations arrivent à échéance, les coupons continuent d'être versés et de nouvelles obligations sont achetées aux taux plus élevés.

## Mettre un chiffre dessus

L'Explorateur de risques lié à cette leçon vous permet de parcourir des scénarios hypothétiques : une hausse d'un point des taux, un émetteur qui retarde un paiement, un assèchement de la liquidité. Chacun montre un impact illustratif sur un portefeuille obligataire. Aucun n'est une prévision. Leur but est de rendre l'abstrait concret : une baisse de 4 % de la valeur, par exemple, est un chiffre que vous pouvez regarder en vous demandant si vous pourriez la traverser sans vendre.

Cette question, posée honnêtement avant d'investir, est le début d'une vraie tolérance au risque. Non pas « est-ce que j'aime le risque ? », mais « quelle baisse pourrais-je observer sans agir ? ». Votre réponse décide quelle part de votre argent à long terme appartient à quel véhicule. Le module suivant examine le véhicule conçu pour ceux qui veulent une diversification professionnelle sans grosses sommes : le fonds commun de placement.`,
      },
    },
  ],
};

const module5: ModuleDef = {
  title: { en: "What Is a Mutual Fund?", fr: "Qu'est-ce qu'un fonds commun de placement ?" },
  lessons: [
    {
      slug: "how-a-mutual-fund-works",
      title: { en: "How a mutual fund works", fr: "Comment fonctionne un fonds commun de placement" },
      kind: "reading",
      durationMinutes: 8,
      videoSlug: "what-is-a-mutual-fund",
      labSlug: "fund-mechanics",
      keyTakeaways: {
        en: ["A mutual fund (FCP) pools money from many investors into one professionally managed portfolio.", "You own units; the fund owns the assets; a depositary holds them and an auditor checks the accounts.", "Capitalisation funds reinvest income; distribution funds pay it out. Same mechanism, different treatment of income."],
        fr: ["Un fonds commun de placement (FCP) met en commun l'argent de nombreux investisseurs dans un portefeuille géré professionnellement.", "Vous détenez des parts ; le fonds détient les actifs ; un dépositaire les conserve et un commissaire aux comptes vérifie les comptes.", "Les fonds de capitalisation réinvestissent les revenus ; les fonds de distribution les versent. Même mécanisme, traitement différent des revenus."],
      },
      body: {
        en: `## The problem a fund solves

Suppose you have 50,000 FCFA and you now understand that a diversified portfolio of treasury bonds from several CEMAC states, with different maturities, would suit your three-year horizon. You cannot build it. Each bond comes in units of 10,000 FCFA, auctions have minimum sizes, and you would need time, accounts and knowledge to manage the whole thing.

A mutual fund, called a *fonds commun de placement* or FCP in the region, exists for exactly this situation. Thousands of investors each contribute what they can. The pooled money becomes one large portfolio, managed by a licensed company. Each investor holds units whose value rises and falls with the portfolio. Your 50,000 FCFA buys you a proportional slice of everything the fund owns.

## Who does what

A regulated fund is not one company. It is a structure with separated roles, and the separation is the point.

| Role | What they do | Why it matters to you |
| --- | --- | --- |
| Investors (unitholders) | Subscribe units with money; redeem units for money | You own units, not the underlying bonds |
| Management company | Decides what the fund buys and sells, within the stated strategy | Licensed and supervised by COSUMAF |
| Depositary | Holds the fund's assets in safekeeping, separate from the manager | The manager cannot touch the money directly |
| Auditor | Certifies the fund's accounts | Independent check on the valuation |
| Regulator (COSUMAF) | Licenses the manager, approves the fund, supervises conduct | Rules and recourse exist |

Walk through the animated Fund Mechanics Lab linked to this lesson. It shows money flowing from many investors into the fund, through the manager, into investments, and value flowing back as units.

## Units and the net asset value

The fund's total assets, minus its liabilities, divided by the number of units in circulation, gives the **net asset value per unit**, or NAV. If the fund holds 1 billion FCFA of bonds and cash and has issued 100,000 units, the NAV is 10,000 FCFA. When you subscribe, you pay the NAV (plus any entry fee); when you redeem, you receive the NAV (minus any exit fee). The next lesson covers NAV and fees in detail.

## Two ways of treating income

A bond portfolio earns coupons. The fund must do one of two things with them:

- A **capitalisation fund** keeps the income inside the fund and reinvests it. The NAV grows to reflect it. You see the result when you redeem.
- A **distribution fund** pays the income out to unitholders, typically once a year. The NAV does not include the paid-out amount; you receive it as cash.

In the CEMAC market, Stoneshed Asset Management manages one fund of each kind: FCP Stoneshed Classic reinvests income, and FCP Stoneshed Gold distributes income annually. Both are oriented towards bonds and other debt securities, both state a minimum initial subscription of 10,000 FCFA and a recommended holding period of three years, and both use Ecobank Cameroon as depositary and Moore Stephens CA as auditor. They are mentioned here as a concrete, regulated illustration of the two structures, not as a recommendation. Which structure suits a person depends on whether they need income now or growth later, a choice explored in the Capitalisation versus Distribution Lab.

:::
A fund does not promise a return. A bond-oriented fund's value can fall when rates rise. What it promises is a structure: professional management, diversification, independent custody, and rules you can read before you commit.
:::

## Why this is a beginner's vehicle

A fund asks nothing of you after subscription except patience. There are no auctions to follow, no coupons to collect, no maturities to track. For a first-time investor with a three-year horizon and a modest sum, that simplicity, combined with the supervision above, is why funds appear so early in this course.`,
        fr: `## Le problème qu'un fonds résout

Supposons que vous ayez 50 000 FCFA et que vous compreniez désormais qu'un portefeuille diversifié d'obligations du Trésor de plusieurs États de la CEMAC, à différentes échéances, conviendrait à votre horizon de trois ans. Vous ne pouvez pas le constituer. Chaque obligation se présente par coupures de 10 000 FCFA, les adjudications ont des montants minimaux, et il vous faudrait du temps, des comptes et des connaissances pour gérer l'ensemble.

Un fonds commun de placement, ou FCP, existe précisément pour cette situation. Des milliers d'investisseurs apportent chacun ce qu'ils peuvent. L'argent mis en commun devient un grand portefeuille, géré par une société agréée. Chaque investisseur détient des parts dont la valeur monte et baisse avec le portefeuille. Vos 50 000 FCFA vous achètent une fraction proportionnelle de tout ce que le fonds possède.

## Qui fait quoi

Un fonds réglementé n'est pas une seule société. C'est une structure aux rôles séparés, et cette séparation est l'essentiel.

| Rôle | Ce qu'il fait | Pourquoi cela compte pour vous |
| --- | --- | --- |
| Investisseurs (porteurs de parts) | Souscrivent des parts contre de l'argent ; demandent le rachat des parts contre de l'argent | Vous détenez des parts, pas les obligations sous-jacentes |
| Société de gestion | Décide des achats et ventes du fonds, dans le cadre de la stratégie définie | Agréée et supervisée par la COSUMAF |
| Dépositaire | Conserve les actifs du fonds, séparément du gérant | Le gérant ne peut pas toucher directement l'argent |
| Commissaire aux comptes | Certifie les comptes du fonds | Contrôle indépendant de la valorisation |
| Régulateur (COSUMAF) | Agrée la société de gestion, approuve le fonds, supervise la conduite | Des règles et des recours existent |

Parcourez le Laboratoire animé sur le mécanisme des fonds lié à cette leçon. Il montre l'argent qui circule de nombreux investisseurs vers le fonds, via le gérant, vers les investissements, et la valeur qui revient sous forme de parts.

## Les parts et la valeur liquidative

L'actif total du fonds, moins ses dettes, divisé par le nombre de parts en circulation, donne la **valeur liquidative** par part. Si le fonds détient 1 milliard de FCFA d'obligations et de liquidités et a émis 100 000 parts, la valeur liquidative est de 10 000 FCFA. À la souscription, vous payez la valeur liquidative (plus d'éventuels frais d'entrée) ; au rachat, vous recevez la valeur liquidative (moins d'éventuels frais de sortie). La leçon suivante traite en détail de la valeur liquidative et des frais.

## Deux façons de traiter les revenus

Un portefeuille obligataire perçoit des coupons. Le fonds doit en faire l'une de ces deux choses :

- Un **fonds de capitalisation** conserve les revenus dans le fonds et les réinvestit. La valeur liquidative augmente pour en tenir compte. Vous en voyez le résultat au rachat.
- Un **fonds de distribution** verse les revenus aux porteurs de parts, généralement une fois par an. La valeur liquidative n'inclut pas le montant versé ; vous le recevez en espèces.

Sur le marché de la CEMAC, Stoneshed Asset Management gère un fonds de chaque type : le FCP Stoneshed Classic réinvestit les revenus, et le FCP Stoneshed Gold distribue les revenus chaque année. Tous deux sont orientés vers les obligations et autres titres de créance, tous deux indiquent une souscription initiale minimale de 10 000 FCFA et une durée de détention recommandée de trois ans, et tous deux ont Ecobank Cameroun pour dépositaire et Moore Stephens CA pour commissaire aux comptes. Ils sont cités ici comme illustration concrète et réglementée des deux structures, non comme une recommandation. La structure qui convient à une personne dépend de son besoin de revenus aujourd'hui ou de croissance demain, un choix exploré dans le Laboratoire capitalisation contre distribution.

:::
Un fonds ne promet pas de rendement. La valeur d'un fonds à orientation obligataire peut baisser quand les taux montent. Ce qu'il promet, c'est une structure : gestion professionnelle, diversification, conservation indépendante, et des règles lisibles avant de s'engager.
:::

## Pourquoi c'est un véhicule pour débutants

Un fonds ne vous demande rien après la souscription, sinon de la patience. Aucune adjudication à suivre, aucun coupon à encaisser, aucune échéance à surveiller. Pour un investisseur débutant avec un horizon de trois ans et une somme modeste, cette simplicité, combinée à la supervision décrite ci-dessus, explique pourquoi les fonds apparaissent si tôt dans ce cours.`,
      },
    },
    {
      slug: "nav-fees-and-who-protects-you",
      title: { en: "NAV, fees, and who protects you", fr: "Valeur liquidative, frais et protections" },
      kind: "reading",
      durationMinutes: 8,
      videoSlug: "how-does-nav-work",
      keyTakeaways: {
        en: ["NAV per unit is the fund's net assets divided by units outstanding; it is the price at which you enter and exit.", "Fees are the manager's income and your cost; they are stated in the fund's documents and reduce your return.", "A 'target yield' is an objective, never a guarantee, a historical result or a regulator-approved forecast."],
        fr: ["La valeur liquidative par part est l'actif net du fonds divisé par le nombre de parts ; c'est le prix d'entrée et de sortie.", "Les frais sont le revenu du gérant et votre coût ; ils figurent dans les documents du fonds et réduisent votre rendement.", "Un « rendement cible » est un objectif, jamais une garantie, un résultat passé ou une prévision approuvée par le régulateur."],
      },
      quiz: {
        title: { en: "Knowledge check: mutual funds", fr: "Vérification : fonds communs de placement" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "A fund has net assets of 500 million FCFA and 40,000 units in circulation. What is the NAV per unit?", fr: "Un fonds a un actif net de 500 millions de FCFA et 40 000 parts en circulation. Quelle est la valeur liquidative par part ?" },
            options: { en: ["10,000 FCFA", "12,500 FCFA", "20,000 FCFA", "It cannot be calculated without the fee rate"], fr: ["10 000 FCFA", "12 500 FCFA", "20 000 FCFA", "Impossible à calculer sans le taux de frais"] },
            correctIndex: 1,
            explanation: { en: "500,000,000 divided by 40,000 equals 12,500 FCFA. The NAV is the net assets per unit; fees already deducted from assets are reflected in the net figure, so no further adjustment is needed for this calculation.", fr: "500 000 000 divisé par 40 000 donne 12 500 FCFA. La valeur liquidative est l'actif net par part ; les frais déjà prélevés sur l'actif sont reflétés dans le chiffre net, aucun ajustement supplémentaire n'est donc nécessaire pour ce calcul." },
          },
          {
            prompt: { en: "Which role in a regulated fund holds the fund's assets in safekeeping, separately from the management company?", fr: "Quel acteur d'un fonds réglementé conserve les actifs du fonds, séparément de la société de gestion ?" },
            options: { en: ["The auditor", "The regulator", "The depositary", "The unitholders"], fr: ["Le commissaire aux comptes", "Le régulateur", "Le dépositaire", "Les porteurs de parts"] },
            correctIndex: 2,
            explanation: { en: "The depositary, usually a bank, keeps the assets. This separation means the manager decides but does not hold, which is a central safeguard against misuse. The auditor checks the accounts and the regulator supervises; neither holds the assets.", fr: "Le dépositaire, généralement une banque, conserve les actifs. Cette séparation signifie que le gérant décide mais ne détient pas, ce qui est une protection centrale contre les abus. Le commissaire aux comptes vérifie les comptes et le régulateur supervise ; aucun des deux ne conserve les actifs." },
          },
          {
            prompt: { en: "A fund brochure mentions a target yield of 6%. What does that mean?", fr: "La brochure d'un fonds mentionne un rendement cible de 6 %. Qu'est-ce que cela signifie ?" },
            options: { en: ["The fund guarantees 6% a year", "The fund earned 6% last year", "The manager aims for that level; the actual result may be higher, lower or negative", "COSUMAF has approved a 6% forecast"], fr: ["Le fonds garantit 6 % par an", "Le fonds a rapporté 6 % l'an dernier", "La société de gestion vise ce niveau ; le résultat réel peut être supérieur, inférieur ou négatif", "La COSUMAF a approuvé une prévision de 6 %"] },
            correctIndex: 2,
            explanation: { en: "A target is a management objective, nothing more. It is not a promise, not a past performance figure, not the current yield of the NAV, and the regulator does not approve forecasts. Reading the word 'target' correctly is one of the most protective habits an investor can build.", fr: "Une cible est un objectif de gestion, rien de plus. Ce n'est ni une promesse, ni une performance passée, ni le rendement actuel de la valeur liquidative, et le régulateur n'approuve pas de prévisions. Lire correctement le mot « cible » est l'une des habitudes les plus protectrices qu'un investisseur puisse acquérir." },
          },
        ],
      },
      body: {
        en: `## The one number you will see most

Every fund publishes a net asset value per unit, the NAV. It is calculated by taking everything the fund owns at current market value, subtracting what it owes (including accrued fees), and dividing by the number of units outstanding. The fund's documents state how often this happens: for some funds daily, for others weekly or at another stated frequency. The valuation frequency and the exact calculation rules are set out in the fund's regulations and information document, and you should check them there rather than assume.

Three things follow from the definition:

- The NAV moves every time it is calculated, because bond prices and accrued interest change.
- In a capitalisation fund, income earned stays in the assets, so the NAV reflects it.
- In a distribution fund, the NAV drops by the amount distributed on the payment date, because that cash has left the fund and gone to you.

A falling NAV after a distribution is not a loss. A falling NAV because yields rose is a market movement. Being able to tell the two apart is a real skill.

## Fees: how the manager is paid

A management company is a business. It is paid through fees charged to the fund or to you, and every fee is described in the fund's documents. The usual categories:

| Fee | Charged when | Who receives it |
| --- | --- | --- |
| Entry (subscription) fee | When you subscribe, as a percentage of the amount | Manager or distributor |
| Management fee | Continuously, as an annual percentage of assets, deducted from the NAV | Management company |
| Exit (redemption) fee | When you redeem, sometimes reduced or waived after a minimum holding period | Manager; sometimes retained by the fund |
| Other charges | Depositary, audit, regulatory costs, deducted from assets | Service providers |

Fees are not a scandal; they pay for the structure you learned about in the previous lesson. But they are a certainty, while returns are not, so a difference of one percentage point in annual fees compounds against you in exactly the way the Growth Lab showed. Always ask for the total annual cost, and always read whether an exit fee applies if you redeem early. For the Stoneshed funds, the precise fee levels are set out in the official documents, which the Academy's fund pages reference; this course deliberately does not restate them, because figures of that kind must come from the approved source.

## Reading "target yield" correctly

Fund brochures sometimes state a target yield. In the Stoneshed brochure, for example, a 6% figure appears as a target. Read the word with care. A target is:

- not a guarantee;
- not a historical performance;
- not the current yield of the NAV;
- not a forecast approved by COSUMAF, which does not approve forecasts.

It is an objective the manager works towards. The actual outcome can be above it, below it or negative in a given period. Any communication that turns a target into a promise is a problem, and a well-governed manager will never do it.

## Who protects you, and how

The protections are layered. The information document discloses risks, fees and redemption conditions before you commit. The depositary keeps the assets out of the manager's hands. The auditor certifies the accounts. COSUMAF licenses the manager, approves the fund and its visa, and can act if rules are broken. None of this removes market risk. All of it removes the risk that someone simply walks away with the money, which in unregulated schemes is the risk that actually materialises.

:::
Before subscribing to any fund, locate four things in its documents: the COSUMAF references, the name of the depositary, the fee table, and the redemption conditions. If you cannot find them, do not proceed.
:::`,
        fr: `## Le chiffre que vous verrez le plus

Chaque fonds publie une valeur liquidative par part. Elle se calcule en prenant tout ce que le fonds possède à la valeur de marché, en retranchant ce qu'il doit (y compris les frais courus), et en divisant par le nombre de parts en circulation. Les documents du fonds précisent la fréquence de ce calcul : quotidienne pour certains fonds, hebdomadaire ou selon une autre périodicité définie pour d'autres. La fréquence de valorisation et les règles exactes de calcul figurent dans le règlement et le document d'information du fonds, et c'est là qu'il faut les vérifier plutôt que les supposer.

Trois conséquences découlent de la définition :

- La valeur liquidative bouge à chaque calcul, parce que les prix des obligations et les intérêts courus changent.
- Dans un fonds de capitalisation, les revenus perçus restent dans l'actif, la valeur liquidative les reflète donc.
- Dans un fonds de distribution, la valeur liquidative baisse du montant distribué à la date de paiement, parce que cet argent a quitté le fonds pour vous rejoindre.

Une valeur liquidative qui baisse après une distribution n'est pas une perte. Une valeur liquidative qui baisse parce que les taux ont monté est un mouvement de marché. Savoir distinguer les deux est une vraie compétence.

## Les frais : comment le gérant est rémunéré

Une société de gestion est une entreprise. Elle est rémunérée par des frais facturés au fonds ou à vous, et chaque frais est décrit dans les documents du fonds. Les catégories habituelles :

| Frais | Prélevés quand | Bénéficiaire |
| --- | --- | --- |
| Frais d'entrée (souscription) | À la souscription, en pourcentage du montant | Société de gestion ou distributeur |
| Frais de gestion | En continu, en pourcentage annuel de l'actif, déduits de la valeur liquidative | Société de gestion |
| Frais de sortie (rachat) | Au rachat, parfois réduits ou supprimés après une durée minimale de détention | Société de gestion ; parfois conservés par le fonds |
| Autres charges | Dépositaire, audit, coûts réglementaires, déduits de l'actif | Prestataires |

Les frais ne sont pas un scandale ; ils paient la structure décrite à la leçon précédente. Mais ils sont certains, alors que les rendements ne le sont pas : un écart d'un point de pourcentage de frais annuels capitalise contre vous exactement comme le Laboratoire de croissance l'a montré. Demandez toujours le coût annuel total, et vérifiez toujours si des frais de sortie s'appliquent en cas de rachat anticipé. Pour les fonds Stoneshed, les niveaux précis de frais figurent dans les documents officiels, auxquels les pages « fonds » de l'Academy renvoient ; ce cours s'abstient délibérément de les reproduire, parce que des chiffres de cette nature doivent provenir de la source approuvée.

## Bien lire « rendement cible »

Les brochures de fonds mentionnent parfois un rendement cible. Dans la brochure Stoneshed, par exemple, un chiffre de 6 % apparaît à titre de cible. Lisez ce mot avec attention. Une cible n'est :

- ni une garantie ;
- ni une performance passée ;
- ni le rendement actuel de la valeur liquidative ;
- ni une prévision approuvée par la COSUMAF, qui n'approuve pas de prévisions.

C'est un objectif vers lequel la société de gestion travaille. Le résultat réel peut lui être supérieur, inférieur ou négatif sur une période donnée. Toute communication qui transforme une cible en promesse pose problème, et une société de gestion bien gouvernée ne le fera jamais.

## Qui vous protège, et comment

Les protections se superposent. Le document d'information expose les risques, les frais et les conditions de rachat avant votre engagement. Le dépositaire garde les actifs hors des mains du gérant. Le commissaire aux comptes certifie les comptes. La COSUMAF agrée la société de gestion, approuve le fonds et son visa, et peut intervenir si les règles sont enfreintes. Rien de tout cela ne supprime le risque de marché. Tout cela supprime le risque que quelqu'un parte simplement avec l'argent, qui est, dans les systèmes non réglementés, le risque qui se matérialise réellement.

:::
Avant de souscrire à un fonds, repérez quatre éléments dans ses documents : les références COSUMAF, le nom du dépositaire, le tableau des frais et les conditions de rachat. Si vous ne les trouvez pas, n'allez pas plus loin.
:::`,
      },
    },
  ],
};

const module6: ModuleDef = {
  title: { en: "Understanding the CEMAC Investment Market", fr: "Comprendre le marché de l'investissement de la CEMAC" },
  lessons: [
    {
      slug: "the-cemac-financial-system",
      title: { en: "The CEMAC financial system: who does what", fr: "Le système financier de la CEMAC : qui fait quoi" },
      kind: "reading",
      durationMinutes: 8,
      videoSlug: "understanding-the-bvmac",
      keyTakeaways: {
        en: ["CEMAC is a six-country monetary union sharing the FCFA, the BEAC and a single regional financial market.", "The BEAC is the central bank, COSUMAF the market regulator, the BVMAC the exchange, and COBAC the banking supervisor.", "Knowing which institution is responsible for what tells you where rules and recourse come from."],
        fr: ["La CEMAC est une union monétaire de six pays partageant le FCFA, la BEAC et un marché financier régional unique.", "La BEAC est la banque centrale, la COSUMAF le régulateur du marché, la BVMAC la bourse et la COBAC le superviseur bancaire.", "Savoir quelle institution est responsable de quoi indique d'où viennent les règles et les recours."],
      },
      body: {
        en: `## One currency, six countries

The Central African Economic and Monetary Community, CEMAC, brings together Cameroon, the Central African Republic, Chad, the Republic of Congo, Equatorial Guinea and Gabon. The six share a currency, the Central African CFA franc (FCFA), whose value is fixed against the euro. They also share the institutions that issue, supervise and regulate money and securities. For an investor in Douala, this means that a bond issued by Gabon or a fund licensed in the regional market is as accessible, in principle, as a Cameroonian one.

## The four institutions you need to know

**BEAC, the Bank of Central African States.** The central bank. It issues the FCFA, sets monetary policy, manages the region's reserves and runs the auction system through which member states issue treasury bills and bonds. When you hear that "rates have risen", it is often BEAC policy that moved first.

**COSUMAF, the Central African Financial Market Supervisory Commission.** The regulator of the regional financial market. It licenses management companies, approves funds and the documents through which they are offered to the public (the visa you see on fund documentation), authorises public offerings, and supervises conduct. If a management company tells you it holds a COSUMAF licence, that reference is verifiable.

**BVMAC, the Central African Stock Exchange.** The regional exchange, headquartered in Douala following the 2019 merger of the former Libreville and Douala exchanges. Listed shares and bonds trade here. Volumes are modest compared with large international markets, which has consequences for liquidity that you learned about in Module 4.

**COBAC, the Central African Banking Commission.** The supervisor of banks and microfinance institutions. It is not a securities regulator, but it matters because your depositary and your savings account sit under its watch.

| Question | Institution |
| --- | --- |
| Who issues the FCFA and sets policy rates? | BEAC |
| Who licenses an asset manager and approves a fund? | COSUMAF |
| Where do listed securities trade? | BVMAC |
| Who supervises the bank holding my deposits? | COBAC |

## Why the structure matters to a small investor

Regulation is not an abstraction. It is the reason you can read a fund's documents before paying, the reason a depositary stands between the manager and the assets, and the reason a licence number can be checked. When an offer comes from outside this structure, none of those protections exist, however polished the presentation.

:::
A simple habit: before considering any investment offer in the region, ask which of these four institutions it falls under. If the answer is "none", you have your answer.
:::

## A young market, growing

The regional market is still developing. The number of listed companies is small, the fund industry is young, and public participation is low. That is not a reason to stay away; it is the context in which education like this course exists. The next lesson looks at the instrument that currently dominates the regional market, government securities, and how they reach ordinary investors.`,
        fr: `## Une monnaie, six pays

La Communauté économique et monétaire de l'Afrique centrale, la CEMAC, réunit le Cameroun, la République centrafricaine, le Tchad, la République du Congo, la Guinée équatoriale et le Gabon. Les six partagent une monnaie, le franc CFA d'Afrique centrale (FCFA), dont la valeur est fixée par rapport à l'euro. Ils partagent aussi les institutions qui émettent, supervisent et réglementent la monnaie et les titres. Pour un investisseur de Douala, cela signifie qu'une obligation émise par le Gabon ou un fonds agréé sur le marché régional est, en principe, aussi accessible qu'un produit camerounais.

## Les quatre institutions à connaître

**La BEAC, Banque des États de l'Afrique centrale.** La banque centrale. Elle émet le FCFA, conduit la politique monétaire, gère les réserves de la région et opère le système d'adjudication par lequel les États membres émettent bons et obligations du Trésor. Quand on entend que « les taux ont monté », c'est souvent la politique de la BEAC qui a bougé en premier.

**La COSUMAF, Commission de surveillance du marché financier de l'Afrique centrale.** Le régulateur du marché financier régional. Elle agrée les sociétés de gestion, approuve les fonds et les documents par lesquels ils sont proposés au public (le visa que vous voyez sur la documentation des fonds), autorise les offres publiques et supervise les comportements. Si une société de gestion vous dit détenir un agrément COSUMAF, cette référence est vérifiable.

**La BVMAC, Bourse des valeurs mobilières de l'Afrique centrale.** La bourse régionale, dont le siège est à Douala depuis la fusion en 2019 des anciennes bourses de Libreville et de Douala. Les actions et obligations cotées s'y échangent. Les volumes sont modestes comparés aux grands marchés internationaux, ce qui a des conséquences sur la liquidité, vues au module 4.

**La COBAC, Commission bancaire de l'Afrique centrale.** Le superviseur des banques et des établissements de microfinance. Ce n'est pas un régulateur des titres, mais elle compte parce que votre dépositaire et votre compte d'épargne sont sous sa surveillance.

| Question | Institution |
| --- | --- |
| Qui émet le FCFA et fixe les taux directeurs ? | La BEAC |
| Qui agrée une société de gestion et approuve un fonds ? | La COSUMAF |
| Où s'échangent les titres cotés ? | La BVMAC |
| Qui supervise la banque qui détient mes dépôts ? | La COBAC |

## Pourquoi cette structure compte pour un petit investisseur

La réglementation n'est pas une abstraction. C'est la raison pour laquelle vous pouvez lire les documents d'un fonds avant de payer, la raison pour laquelle un dépositaire s'interpose entre le gérant et les actifs, et la raison pour laquelle un numéro d'agrément peut être vérifié. Quand une offre vient de l'extérieur de cette structure, aucune de ces protections n'existe, aussi soignée soit la présentation.

:::
Une habitude simple : avant d'envisager une offre d'investissement dans la région, demandez-vous de laquelle de ces quatre institutions elle relève. Si la réponse est « aucune », vous avez votre réponse.
:::

## Un marché jeune, en croissance

Le marché régional est encore en développement. Le nombre de sociétés cotées est réduit, l'industrie des fonds est jeune et la participation du public est faible. Ce n'est pas une raison de s'en tenir à l'écart ; c'est le contexte dans lequel une formation comme ce cours existe. La leçon suivante s'intéresse à l'instrument qui domine actuellement le marché régional, les titres publics, et à la façon dont ils parviennent aux investisseurs ordinaires.`,
      },
    },
    {
      slug: "treasury-securities-and-the-regional-market",
      title: { en: "Treasury securities and how they reach you", fr: "Les titres publics et comment ils vous parviennent" },
      kind: "reading",
      durationMinutes: 7,
      keyTakeaways: {
        en: ["CEMAC states borrow through treasury bills (BTA, short term) and treasury bonds (OTA, multi-year) issued by auction via the BEAC.", "Banks and licensed intermediaries buy at auction; individuals typically access these securities through those intermediaries or through funds.", "Sovereign debt is lower-risk than corporate debt but not risk-free; states can face payment pressure."],
        fr: ["Les États de la CEMAC empruntent via des bons du Trésor assimilables (BTA, court terme) et des obligations du Trésor assimilables (OTA, pluriannuelles) émis par adjudication via la BEAC.", "Les banques et intermédiaires agréés achètent à l'adjudication ; les particuliers accèdent généralement à ces titres via ces intermédiaires ou via des fonds.", "La dette souveraine est moins risquée que la dette d'entreprise, mais pas sans risque ; les États peuvent subir des tensions de paiement."],
      },
      quiz: {
        title: { en: "Knowledge check: the CEMAC market", fr: "Vérification : le marché de la CEMAC" },
        kind: "knowledge_check",
        questions: [
          {
            prompt: { en: "Which institution approves a mutual fund and grants the visa on its public documentation in the CEMAC region?", fr: "Quelle institution approuve un fonds commun de placement et délivre le visa sur sa documentation publique dans la zone CEMAC ?" },
            options: { en: ["BEAC", "COBAC", "BVMAC", "COSUMAF"], fr: ["La BEAC", "La COBAC", "La BVMAC", "La COSUMAF"] },
            correctIndex: 3,
            explanation: { en: "COSUMAF regulates the regional financial market, including the licensing of management companies and the approval of funds offered to the public. The BEAC handles currency and monetary policy, COBAC supervises banks, and the BVMAC is the exchange.", fr: "La COSUMAF réglemente le marché financier régional, y compris l'agrément des sociétés de gestion et l'approbation des fonds proposés au public. La BEAC s'occupe de la monnaie et de la politique monétaire, la COBAC supervise les banques et la BVMAC est la bourse." },
          },
          {
            prompt: { en: "What is the main difference between a BTA and an OTA?", fr: "Quelle est la principale différence entre un BTA et une OTA ?" },
            options: { en: ["A BTA is issued by companies, an OTA by states", "A BTA is short term (typically under a year); an OTA runs for several years", "An OTA pays no interest", "There is no difference"], fr: ["Un BTA est émis par des entreprises, une OTA par des États", "Un BTA est à court terme (généralement moins d'un an) ; une OTA court sur plusieurs années", "Une OTA ne verse pas d'intérêts", "Il n'y a aucune différence"] },
            correctIndex: 1,
            explanation: { en: "Both are issued by CEMAC member states. Treasury bills (BTA) are short-term instruments for managing the state's cash needs; treasury bonds (OTA) are multi-year instruments that pay regular coupons. Maturity is what separates them, and it drives their sensitivity to interest-rate changes.", fr: "Les deux sont émis par les États membres de la CEMAC. Les bons du Trésor (BTA) sont des instruments à court terme pour gérer les besoins de trésorerie de l'État ; les obligations du Trésor (OTA) sont des instruments pluriannuels versant des coupons réguliers. La maturité les distingue, et elle détermine leur sensibilité aux variations de taux." },
          },
          {
            prompt: { en: "Is a bond issued by a CEMAC member state risk-free?", fr: "Une obligation émise par un État membre de la CEMAC est-elle sans risque ?" },
            options: { en: ["Yes, governments always pay", "No; sovereign risk is generally lower than corporate risk, but payment pressure and market price movements remain", "Yes, because the BEAC guarantees all bonds", "No, because bonds never pay interest"], fr: ["Oui, les États paient toujours", "Non ; le risque souverain est généralement plus faible que le risque d'entreprise, mais des tensions de paiement et des mouvements de prix subsistent", "Oui, parce que la BEAC garantit toutes les obligations", "Non, parce que les obligations ne versent jamais d'intérêts"] },
            correctIndex: 1,
            explanation: { en: "Sovereign bonds sit at the lower end of the credit-risk scale but not at zero. States can face fiscal strain, and even a bond that is repaid in full can lose market value in between if rates rise. The BEAC does not guarantee member states' debt. 'Lower risk' and 'no risk' are different claims.", fr: "Les obligations souveraines se situent au bas de l'échelle du risque de crédit, mais pas à zéro. Les États peuvent connaître des tensions budgétaires, et même une obligation intégralement remboursée peut perdre de la valeur de marché entre-temps si les taux montent. La BEAC ne garantit pas la dette des États membres. « Moins risqué » et « sans risque » sont deux affirmations différentes." },
          },
        ],
      },
      body: {
        en: `## How a state borrows

Governments spend before they collect. To bridge the gap and to finance longer projects, CEMAC member states borrow from investors by issuing securities. Two families exist in the regional market:

- **Treasury bills, BTA** (*bons du Trésor assimilables*): short-term, typically weeks to a year, sold at a discount and repaid at face value. The difference is the investor's return.
- **Treasury bonds, OTA** (*obligations du Trésor assimilables*): multi-year instruments that pay a fixed coupon, usually annually, and repay the principal at maturity.

Both are issued through auctions organised by the BEAC. Both are commonly denominated in units of 10,000 FCFA, which is one reason that figure recurs throughout regional investment products. States also occasionally issue bonds directly to the public through the BVMAC, with COSUMAF approval.

## How they reach an individual

Auctions are open to approved participants, mainly banks and licensed intermediaries, rather than to the public directly. An individual reaches treasury securities in one of three ways:

1. Through a bank or licensed broker that buys at auction and sells on to clients, in amounts the individual can afford.
2. Through the secondary market, where existing securities change hands.
3. Through a mutual fund, which buys at scale and lets each unitholder hold a diversified slice.

The third route is the simplest for small sums and the one that handles maturities, reinvestment and record-keeping on your behalf. It is why bond-oriented funds appear so prominently in regional investment education. The trade-off is fees, covered in Module 5, and the fund's own redemption rules.

## What makes sovereign debt attractive, and what does not

Lending to a state is generally safer than lending to a company, because a state has taxation power and a long record. That is why sovereign securities pay less interest than corporate ones of the same maturity: lower risk, lower compensation. It is not, however, zero risk. States can experience fiscal pressure, delayed payments and refinancing difficulties, and the market price of a long bond can fall sharply if rates rise, as you saw in Module 4.

| Feature | BTA | OTA |
| --- | --- | --- |
| Typical maturity | Weeks to one year | Two years and beyond |
| Return mechanism | Discount to face value | Annual coupon plus repayment |
| Rate sensitivity | Low | Higher, increasing with maturity |
| Suits | Cash held for months | Money held for years |

## Reading the market

Three pieces of public information help you understand the regional bond market without expert tools:

- The BEAC's auction calendar and results, which show what states are borrowing and at what rates.
- The BVMAC's listings, which show what is tradable on the exchange.
- COSUMAF's register of licensed operators and approved funds.

:::
You do not need to buy a treasury bond directly to benefit from understanding one. Every bond-oriented fund in the region is built from these instruments. Knowing what the fund holds is knowing what you own.
:::

With the vehicles, the risks and the market now in view, the final module brings everything together into a decision framework you can use the next time an opportunity, or a sales pitch, reaches you.`,
        fr: `## Comment un État emprunte

Les États dépensent avant d'encaisser. Pour combler l'écart et financer des projets longs, les États membres de la CEMAC empruntent auprès des investisseurs en émettant des titres. Deux familles existent sur le marché régional :

- **Les bons du Trésor assimilables, BTA** : court terme, de quelques semaines à un an, vendus avec une décote et remboursés à leur valeur nominale. La différence constitue le rendement de l'investisseur.
- **Les obligations du Trésor assimilables, OTA** : instruments pluriannuels qui versent un coupon fixe, généralement annuel, et remboursent le capital à l'échéance.

Les deux sont émis par adjudications organisées par la BEAC. Les deux sont couramment libellés par coupures de 10 000 FCFA, ce qui explique en partie la récurrence de ce chiffre dans les produits d'investissement régionaux. Les États émettent aussi parfois des obligations directement auprès du public via la BVMAC, avec l'approbation de la COSUMAF.

## Comment ils parviennent à un particulier

Les adjudications sont ouvertes aux participants agréés, principalement les banques et les intermédiaires agréés, plutôt qu'au public directement. Un particulier accède aux titres publics de trois façons :

1. Par une banque ou un courtier agréé qui achète à l'adjudication et revend à ses clients, pour des montants à leur portée.
2. Par le marché secondaire, où les titres existants changent de mains.
3. Par un fonds commun de placement, qui achète en volume et permet à chaque porteur de détenir une fraction diversifiée.

La troisième voie est la plus simple pour les petites sommes et celle qui gère pour vous les échéances, le réinvestissement et la tenue des comptes. C'est pourquoi les fonds à orientation obligataire occupent une place si importante dans l'éducation à l'investissement dans la région. La contrepartie, ce sont les frais, vus au module 5, et les règles de rachat propres au fonds.

## Ce qui rend la dette souveraine attractive, et ce qui ne l'est pas

Prêter à un État est généralement plus sûr que prêter à une entreprise, parce qu'un État dispose du pouvoir fiscal et d'un long historique. C'est pourquoi les titres souverains versent moins d'intérêts que les titres d'entreprise de même maturité : risque plus faible, compensation plus faible. Ce n'est toutefois pas un risque nul. Les États peuvent connaître des tensions budgétaires, des retards de paiement et des difficultés de refinancement, et le prix de marché d'une obligation longue peut chuter fortement si les taux montent, comme vu au module 4.

| Caractéristique | BTA | OTA |
| --- | --- | --- |
| Maturité typique | De quelques semaines à un an | Deux ans et plus |
| Mécanisme de rendement | Décote sur la valeur nominale | Coupon annuel plus remboursement |
| Sensibilité aux taux | Faible | Plus élevée, croissante avec la maturité |
| Convient à | De la trésorerie conservée quelques mois | De l'argent conservé plusieurs années |

## Lire le marché

Trois sources d'information publiques aident à comprendre le marché obligataire régional sans outils d'expert :

- Le calendrier et les résultats des adjudications de la BEAC, qui montrent ce que les États empruntent et à quels taux.
- Les cotations de la BVMAC, qui montrent ce qui est négociable en bourse.
- Le registre de la COSUMAF des opérateurs agréés et des fonds approuvés.

:::
Il n'est pas nécessaire d'acheter directement une obligation du Trésor pour tirer profit de sa compréhension. Chaque fonds à orientation obligataire de la région est construit à partir de ces instruments. Savoir ce que le fonds détient, c'est savoir ce que vous possédez.
:::

Les véhicules, les risques et le marché étant désormais en vue, le dernier module rassemble tout cela dans une grille de décision utilisable la prochaine fois qu'une opportunité, ou un argumentaire de vente, vous parviendra.`,
      },
    },
  ],
};

const module7: ModuleDef = {
  title: { en: "Making Informed Investment Decisions", fr: "Prendre des décisions d'investissement éclairées" },
  lessons: [
    {
      slug: "a-decision-framework",
      title: { en: "A decision framework for any offer", fr: "Une grille de décision pour toute offre" },
      kind: "reading",
      durationMinutes: 8,
      videoSlug: "what-happens-to-10000-fcfa",
      keyTakeaways: {
        en: ["Decide the purpose and horizon of the money before looking at any product.", "Check the structure: regulator, depositary, documents, exit rules, total fees.", "Match the product's risks to the fall you could watch without selling; then write the plan down."],
        fr: ["Décidez de l'objectif et de l'horizon de l'argent avant de regarder un produit.", "Vérifiez la structure : régulateur, dépositaire, documents, règles de sortie, frais totaux.", "Faites correspondre les risques du produit à la baisse que vous pourriez observer sans vendre ; puis écrivez le plan."],
      },
      body: {
        en: `## Start with the money, not the product

Most poor decisions begin with a product: a brochure, a colleague's tip, a message in a group. The product then goes looking for a reason. A sound decision runs the other way. It begins with a sum of money and two questions: what is this money for, and when will I need it?

If the answer is "emergencies" or "within two years", you already know the tool: a savings instrument. The rest of this framework applies only to money with a horizon of three years or more, held after an emergency reserve is in place.

## Step one: the purpose and horizon

Write a sentence. "This 300,000 FCFA is for my daughter's university fees in nine years." "This 20,000 FCFA a month is for a house deposit in six years." The sentence fixes the horizon, which decides how much movement in value you can tolerate, and it fixes the purpose, which stops you raiding the money for something else.

## Step two: the structure test

Before reading about returns, read about structure. Four questions, each with a verifiable answer:

1. Who regulates this? Look for a COSUMAF licence and visa reference, or the equivalent for a bank product.
2. Who holds the assets? A named depositary, separate from the manager.
3. What document describes risks, fees and exit conditions, and can I read it before paying?
4. How and when do I get my money back, and at what cost if I leave early?

A product that fails any of these is not a candidate, regardless of the return it quotes.

## Step three: the risk match

From the information document, list the risks that apply: market, credit, interest rate, liquidity, currency, concentration. Then ask the question from Module 4: what fall in value could I watch without selling? If the honest answer is "none", the money belongs in savings, however long the horizon. If it is "a few percent for a year or two", a bond-oriented fund with a three-year recommended holding period is the kind of vehicle whose documents you should now read in detail. If it is "much more", other vehicles enter the conversation.

## Step four: the cost

Find the total annual cost and any entry or exit fee. Put the fee into the Growth Lab as a reduction in the assumed rate and look at the difference over your horizon. Fees are certain; returns are not.

## Step five: the plan, in writing

Decide now what you will do when the value falls, because it will. "I will not redeem before year three unless I need the money for its purpose." "I will review once a year, not once a week." A plan written in calm is the only reliable defence against decisions made in fear.

:::
Follow the 10,000 FCFA in the linked video: subscription at the NAV, pooling, investment in treasury securities, valuation, and redemption. Every step of that journey has a document, a role and a rule behind it. That is what "informed" means.
:::

## When to ask for help, and whom

This course gives you a framework, not personal advice. It cannot know your income, your family obligations or your tax position. When a decision involves a specific product and a specific sum, speak to a licensed adviser, and ask the same structure questions of the adviser that you would of the product. The Academy itself does not sell, subscribe or advise; it teaches. The final assessment that follows checks whether the vocabulary of this course is now yours.`,
        fr: `## Partez de l'argent, pas du produit

La plupart des mauvaises décisions commencent par un produit : une brochure, le conseil d'un collègue, un message dans un groupe. Le produit part ensuite en quête d'une raison. Une décision saine suit le chemin inverse. Elle commence par une somme d'argent et deux questions : à quoi sert cet argent, et quand en aurai-je besoin ?

Si la réponse est « aux urgences » ou « d'ici deux ans », vous connaissez déjà l'outil : un instrument d'épargne. Le reste de cette grille ne s'applique qu'à l'argent dont l'horizon est de trois ans ou plus, détenu une fois la réserve d'urgence constituée.

## Étape un : l'objectif et l'horizon

Écrivez une phrase. « Ces 300 000 FCFA sont pour les frais universitaires de ma fille dans neuf ans. » « Ces 20 000 FCFA par mois sont pour l'apport d'une maison dans six ans. » La phrase fixe l'horizon, qui décide de l'ampleur des mouvements de valeur tolérables, et elle fixe l'objectif, ce qui vous empêche de puiser dans cet argent pour autre chose.

## Étape deux : le test de structure

Avant de lire les rendements, lisez la structure. Quatre questions, chacune avec une réponse vérifiable :

1. Qui réglemente ceci ? Cherchez un agrément COSUMAF et une référence de visa, ou l'équivalent pour un produit bancaire.
2. Qui conserve les actifs ? Un dépositaire nommé, distinct du gérant.
3. Quel document décrit les risques, les frais et les conditions de sortie, et puis-je le lire avant de payer ?
4. Comment et quand récupérer mon argent, et à quel coût en cas de sortie anticipée ?

Un produit qui échoue à l'une de ces questions n'est pas un candidat, quel que soit le rendement affiché.

## Étape trois : l'adéquation au risque

À partir du document d'information, listez les risques applicables : marché, crédit, taux, liquidité, change, concentration. Puis posez la question du module 4 : quelle baisse de valeur pourrais-je observer sans vendre ? Si la réponse honnête est « aucune », l'argent relève de l'épargne, quel que soit l'horizon. Si c'est « quelques pour cent pendant un an ou deux », un fonds à orientation obligataire avec une durée de détention recommandée de trois ans est le type de véhicule dont vous devriez maintenant lire les documents en détail. Si c'est « bien davantage », d'autres véhicules entrent dans la discussion.

## Étape quatre : le coût

Trouvez le coût annuel total et tout frais d'entrée ou de sortie. Saisissez ces frais dans le Laboratoire de croissance comme une réduction du taux supposé et observez la différence sur votre horizon. Les frais sont certains ; les rendements ne le sont pas.

## Étape cinq : le plan, par écrit

Décidez dès maintenant ce que vous ferez quand la valeur baissera, car elle baissera. « Je ne demanderai pas de rachat avant la troisième année, sauf besoin lié à l'objectif. » « Je ferai le point une fois par an, pas une fois par semaine. » Un plan écrit à tête reposée est la seule défense fiable contre les décisions prises dans la peur.

:::
Suivez les 10 000 FCFA dans la vidéo associée : souscription à la valeur liquidative, mise en commun, investissement en titres publics, valorisation, rachat. Chaque étape de ce parcours repose sur un document, un rôle et une règle. C'est cela, être « éclairé ».
:::

## Quand demander de l'aide, et à qui

Ce cours vous donne une grille, pas un conseil personnel. Il ne connaît ni vos revenus, ni vos obligations familiales, ni votre situation fiscale. Quand une décision concerne un produit précis et une somme précise, adressez-vous à un conseiller agréé, et posez-lui les mêmes questions de structure que vous poseriez au produit. L'Academy elle-même ne vend pas, ne souscrit pas et ne conseille pas ; elle enseigne. L'évaluation finale qui suit vérifie si le vocabulaire de ce cours est désormais le vôtre.`,
      },
    },
    {
      slug: "final-assessment",
      title: { en: "Final assessment", fr: "Évaluation finale" },
      kind: "quiz",
      durationMinutes: 15,
      keyTakeaways: {
        en: ["Ten questions across all seven modules.", "A score of 70% or more completes the course and issues your Academy certificate.", "You can retake the assessment after reviewing the lessons."],
        fr: ["Dix questions couvrant les sept modules.", "Un score de 70 % ou plus valide le cours et délivre votre certificat de l'Academy.", "Vous pouvez repasser l'évaluation après avoir relu les leçons."],
      },
      body: {
        en: `## Before you begin

This assessment covers the whole course: the role of money, saving versus investing, investment vehicles, risk and return, mutual funds, the CEMAC market and the decision framework. There are ten questions. A score of 70% or more completes the course.

Take your time. Each explanation, whether you answered correctly or not, is written to teach, so read them all.

:::
The certificate recognises completion of an educational course. It is not a professional qualification and does not constitute investment advice.
:::`,
        fr: `## Avant de commencer

Cette évaluation couvre l'ensemble du cours : le rôle de l'argent, épargner ou investir, les véhicules d'investissement, risque et rendement, les fonds communs de placement, le marché de la CEMAC et la grille de décision. Elle comporte dix questions. Un score de 70 % ou plus valide le cours.

Prenez votre temps. Chaque explication, que votre réponse soit juste ou non, est écrite pour enseigner : lisez-les toutes.

:::
Le certificat atteste de la réussite d'un cours pédagogique. Il ne constitue ni une qualification professionnelle ni un conseil en investissement.
:::`,
      },
      quiz: {
        title: { en: "Investing 101 — final assessment", fr: "Investissement 101 — évaluation finale" },
        kind: "assessment",
        passMark: 70,
        questions: [
          {
            prompt: { en: "Which of these should normally be in place before any money is invested?", fr: "Lequel de ces éléments doit normalement être en place avant d'investir le moindre franc ?" },
            options: { en: ["A BVMAC trading account", "An emergency reserve of several months of essential expenses", "A property", "A COSUMAF licence"], fr: ["Un compte de négociation à la BVMAC", "Une réserve d'urgence de plusieurs mois de dépenses essentielles", "Un bien immobilier", "Un agrément COSUMAF"] },
            correctIndex: 1,
            explanation: { en: "Investing exposes money to movements in value. If an emergency forces you to sell during a downturn, a temporary fall becomes a permanent loss. The reserve is what lets invested money stay invested.", fr: "Investir expose l'argent à des variations de valeur. Si une urgence vous force à vendre pendant une baisse, une baisse temporaire devient une perte définitive. La réserve est ce qui permet à l'argent investi de le rester." },
          },
          {
            prompt: { en: "Prices rise 5% in a year. A product paid 3% nominally. The real return was approximately:", fr: "Les prix montent de 5 % en un an. Un produit a versé 3 % en nominal. Le rendement réel a été d'environ :" },
            options: { en: ["+8%", "+3%", "−2%", "+5%"], fr: ["+8 %", "+3 %", "−2 %", "+5 %"] },
            correctIndex: 2,
            explanation: { en: "Real return is roughly nominal return minus inflation: 3% minus 5% is about minus 2%. The balance grew in francs but shrank in what it can buy.", fr: "Le rendement réel est approximativement le rendement nominal moins l'inflation : 3 % moins 5 % donne environ moins 2 %. Le solde a augmenté en francs mais diminué en pouvoir d'achat." },
          },
          {
            prompt: { en: "Under a hypothetical constant rate, which matters most to the final value of regular contributions?", fr: "Sous un taux constant hypothétique, qu'est-ce qui pèse le plus sur la valeur finale de versements réguliers ?" },
            options: { en: ["The brand of the bank", "The number of years the money stays invested", "Whether contributions are made on a Monday", "The colour of the brochure"], fr: ["La marque de la banque", "Le nombre d'années pendant lesquelles l'argent reste investi", "Le fait de verser un lundi", "La couleur de la brochure"] },
            correctIndex: 1,
            explanation: { en: "Compounding rewards time above all. Early contributions earn returns on returns for decades, which is why a smaller amount started earlier typically ends ahead of a larger amount started later.", fr: "La capitalisation récompense le temps avant tout. Les premiers versements perçoivent des rendements sur rendements pendant des décennies, c'est pourquoi un montant plus petit commencé plus tôt termine généralement devant un montant plus grand commencé plus tard." },
          },
          {
            prompt: { en: "A share and a bond differ mainly in that:", fr: "Une action et une obligation diffèrent principalement en ce que :" },
            options: { en: ["A share is a loan; a bond is ownership", "A share is ownership of a company; a bond is a loan to an issuer", "Both are loans", "Both represent ownership"], fr: ["Une action est un prêt ; une obligation, une part de propriété", "Une action est une part de propriété d'une entreprise ; une obligation, un prêt à un émetteur", "Les deux sont des prêts", "Les deux représentent une propriété"] },
            correctIndex: 1,
            explanation: { en: "Ownership shares in profits and losses without limit; a loan has a defined coupon and repayment. This is why equities are more volatile and bonds are the backbone of cautious, income-oriented portfolios.", fr: "La propriété partage les profits et les pertes sans limite ; un prêt a un coupon et un remboursement définis. C'est pourquoi les actions sont plus volatiles et les obligations forment l'ossature des portefeuilles prudents orientés vers le revenu." },
          },
          {
            prompt: { en: "A fund holds forty different bonds. One issuer defaults. Which risk did diversification reduce?", fr: "Un fonds détient quarante obligations différentes. Un émetteur fait défaut. Quel risque la diversification a-t-elle réduit ?" },
            options: { en: ["Market risk", "Interest rate risk", "Concentration risk", "Currency risk"], fr: ["Le risque de marché", "Le risque de taux", "Le risque de concentration", "Le risque de change"] },
            correctIndex: 2,
            explanation: { en: "One default among forty holdings hurts a little; one default in a single-bond portfolio is catastrophic. Diversification works on risks specific to individual holdings. It does not protect against a rise in rates that reprices every bond at once.", fr: "Un défaut parmi quarante lignes fait un peu mal ; un défaut dans un portefeuille d'une seule obligation est catastrophique. La diversification agit sur les risques propres aux lignes individuelles. Elle ne protège pas d'une hausse des taux qui réévalue toutes les obligations à la fois." },
          },
          {
            prompt: { en: "In a mutual fund, who holds the assets in safekeeping?", fr: "Dans un fonds commun de placement, qui conserve les actifs ?" },
            options: { en: ["The management company", "The depositary", "The unitholders directly", "COSUMAF"], fr: ["La société de gestion", "Le dépositaire", "Les porteurs de parts directement", "La COSUMAF"] },
            correctIndex: 1,
            explanation: { en: "The depositary, typically a bank, holds the assets separately from the manager. The manager decides; the depositary holds; the auditor checks; the regulator supervises. The separation is the safeguard.", fr: "Le dépositaire, généralement une banque, conserve les actifs séparément du gérant. Le gérant décide ; le dépositaire conserve ; le commissaire aux comptes vérifie ; le régulateur supervise. La séparation est la protection." },
          },
          {
            prompt: { en: "A distribution fund pays out its annual income. On the payment date, its NAV:", fr: "Un fonds de distribution verse ses revenus annuels. À la date de paiement, sa valeur liquidative :" },
            options: { en: ["Rises by the amount paid", "Falls by the amount paid, because that cash has left the fund", "Is unaffected", "Is frozen for a year"], fr: ["Monte du montant versé", "Baisse du montant versé, parce que cet argent a quitté le fonds", "N'est pas affectée", "Est gelée pendant un an"] },
            correctIndex: 1,
            explanation: { en: "The NAV is net assets per unit. When cash leaves the fund as a distribution, net assets fall by that amount. The unitholder is not poorer: the value moved from the unit to their account. Confusing this with a loss is a common beginner's error.", fr: "La valeur liquidative est l'actif net par part. Quand de l'argent quitte le fonds sous forme de distribution, l'actif net baisse d'autant. Le porteur n'est pas appauvri : la valeur est passée de la part à son compte. Confondre cela avec une perte est une erreur fréquente de débutant." },
          },
          {
            prompt: { en: "A brochure states a 6% target yield. The correct reading is:", fr: "Une brochure indique un rendement cible de 6 %. La bonne lecture est :" },
            options: { en: ["A guaranteed annual return", "The manager's objective, with no guarantee and no regulator-approved forecast", "Last year's performance", "The current NAV yield"], fr: ["Un rendement annuel garanti", "L'objectif de la société de gestion, sans garantie ni prévision approuvée par le régulateur", "La performance de l'an dernier", "Le rendement actuel de la valeur liquidative"] },
            correctIndex: 1,
            explanation: { en: "A target is an aim, nothing more. Results may exceed it, fall short, or be negative. COSUMAF does not approve forecasts. Treating a target as a promise is precisely the misreading that regulation and education exist to prevent.", fr: "Une cible est un but, rien de plus. Les résultats peuvent la dépasser, lui être inférieurs ou être négatifs. La COSUMAF n'approuve pas de prévisions. Prendre une cible pour une promesse est précisément la mauvaise lecture que la réglementation et l'éducation visent à prévenir." },
          },
          {
            prompt: { en: "Which institution runs the auctions through which CEMAC states issue treasury securities?", fr: "Quelle institution organise les adjudications par lesquelles les États de la CEMAC émettent leurs titres publics ?" },
            options: { en: ["BVMAC", "COSUMAF", "BEAC", "COBAC"], fr: ["La BVMAC", "La COSUMAF", "La BEAC", "La COBAC"] },
            correctIndex: 2,
            explanation: { en: "The central bank, BEAC, organises the primary auctions of BTA and OTA. The BVMAC is where securities trade, COSUMAF regulates the market, and COBAC supervises banks. Each has a distinct role.", fr: "La banque centrale, la BEAC, organise les adjudications primaires de BTA et d'OTA. La BVMAC est le lieu de négociation des titres, la COSUMAF réglemente le marché et la COBAC supervise les banques. Chacune a un rôle distinct." },
          },
          {
            prompt: { en: "An offer promises 12% per month with no risk and no documents. Applying the decision framework, you should:", fr: "Une offre promet 12 % par mois sans risque et sans documents. En appliquant la grille de décision, vous devez :" },
            options: { en: ["Invest a small amount to test it", "Decline, because it fails the structure test and contradicts the risk–return relationship", "Ask for a higher rate", "Invest only money you need soon"], fr: ["Investir une petite somme pour tester", "Refuser, car l'offre échoue au test de structure et contredit la relation risque-rendement", "Demander un taux plus élevé", "Investir uniquement l'argent dont vous avez besoin bientôt"] },
            correctIndex: 1,
            explanation: { en: "No regulator, no depositary, no document and a return far beyond anything a regulated instrument pays: every signal from this course points the same way. 'Testing with a small amount' is how such schemes recruit; the small amount is the bait.", fr: "Aucun régulateur, aucun dépositaire, aucun document et un rendement très au-delà de ce que verse un instrument réglementé : tous les signaux de ce cours pointent dans la même direction. « Tester avec une petite somme » est précisément la méthode de recrutement de ces systèmes ; la petite somme est l'appât." },
          },
        ],
      },
    },
  ],
};

const modules = [module1, module2, module3, module4, module5, module6, module7];

export const INVESTING_101: CourseDef = {
  slug: "investing-101",
  category: "investment",
  title: { en: "Investing 101: Your First Step to Financial Knowledge", fr: "Investissement 101 : votre premier pas vers la connaissance financière" },
  summary: {
    en: "A complete beginner's course on money, saving, investing, risk, mutual funds and the CEMAC market, ending with a practical decision framework.",
    fr: "Un cours complet pour débutants sur l'argent, l'épargne, l'investissement, le risque, les fonds communs de placement et le marché de la CEMAC, conclu par une grille de décision pratique.",
  },
  description: {
    en: "Investing 101 is the Academy's foundational pathway. It assumes no prior financial training and builds, module by module, the vocabulary and judgement needed to understand any investment offer that reaches you in Cameroon or the wider CEMAC region.\n\nYou will learn what money is for, where saving ends and investing begins, which vehicles exist and what each one does with your capital, what risk actually means and how it is compensated, how a regulated mutual fund is built and supervised, and how the regional market's institutions fit together. Every example is priced in FCFA and every rate is a stated hypothetical assumption, never a forecast.\n\nThe course ends with a five-step decision framework and a ten-question assessment. Passing it issues a Stoneshed Academy completion certificate.",
    fr: "Investissement 101 est le parcours fondamental de l'Academy. Il ne suppose aucune formation financière préalable et construit, module après module, le vocabulaire et le jugement nécessaires pour comprendre toute offre d'investissement qui vous parvient au Cameroun ou dans la zone CEMAC.\n\nVous apprendrez à quoi sert l'argent, où s'arrête l'épargne et où commence l'investissement, quels véhicules existent et ce que chacun fait de votre capital, ce que signifie réellement le risque et comment il est rémunéré, comment un fonds commun de placement réglementé est construit et supervisé, et comment s'articulent les institutions du marché régional. Chaque exemple est exprimé en FCFA et chaque taux est une hypothèse explicite, jamais une prévision.\n\nLe cours se termine par une grille de décision en cinq étapes et une évaluation de dix questions. Sa réussite délivre un certificat de fin de cours Stoneshed Academy.",
  },
  level: "beginner",
  durationMinutes: modules.reduce((n, m) => n + m.lessons.reduce((k, l) => k + l.durationMinutes, 0), 0),
  instructor: "aminata-ndong",
  isFree: true,
  outcomes: {
    en: [
      "Distinguish saving from investing and know which horizon each one serves.",
      "Explain inflation, nominal and real returns, and compounding with FCFA examples.",
      "Describe the main investment vehicles available in the CEMAC region and their trade-offs.",
      "Name six types of investment risk and explain why return and risk move together.",
      "Explain how a mutual fund works: units, NAV, fees, and the roles of manager, depositary, auditor and regulator.",
      "Apply a five-step framework to evaluate any investment offer, including recognising unregulated schemes.",
    ],
    fr: [
      "Distinguer l'épargne de l'investissement et savoir à quel horizon chacun répond.",
      "Expliquer l'inflation, les rendements nominal et réel et la capitalisation avec des exemples en FCFA.",
      "Décrire les principaux véhicules d'investissement disponibles dans la zone CEMAC et leurs compromis.",
      "Nommer six types de risque d'investissement et expliquer pourquoi rendement et risque évoluent ensemble.",
      "Expliquer le fonctionnement d'un fonds commun de placement : parts, valeur liquidative, frais, et les rôles du gérant, du dépositaire, du commissaire aux comptes et du régulateur.",
      "Appliquer une grille en cinq étapes pour évaluer toute offre d'investissement, y compris reconnaître les systèmes non réglementés.",
    ],
  },
  prerequisites: { en: "None. This course is designed for complete beginners.", fr: "Aucun. Ce cours est conçu pour les grands débutants." },
  coverTheme: "blue",
  featured: true,
  certificateEligible: true,
  modules,
};
