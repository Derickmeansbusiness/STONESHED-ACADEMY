import type { CourseDef, LessonDef, QuizDef } from "../types";

/**
 * Course catalog (41 courses across seven categories). Investing 101 lives in ./investing-101.ts.
 * Five courses carry full sample modules; the rest are catalog entries whose lessons are being written.
 */

const kc = (title: { en: string; fr: string }, questions: QuizDef["questions"]): QuizDef => ({ title, kind: "knowledge_check", passMark: 70, questions });

// ---------------------------------------------------------------------------
// Lessons — Understanding Money
// ---------------------------------------------------------------------------

const UM_L1: LessonDef = {
  slug: "what-money-does",
  title: { en: "What money actually does", fr: "Ce que l'argent fait vraiment" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "why-financial-literacy-matters",
  keyTakeaways: {
    en: ["Money has three jobs: a means of exchange, a unit of account and a store of value.", "The store-of-value job is the weakest one, because prices rise over time.", "The FCFA is pegged to the euro, which shapes how money behaves in CEMAC."],
    fr: ["L'argent remplit trois fonctions : moyen d'échange, unité de compte et réserve de valeur.", "La fonction de réserve de valeur est la plus fragile, car les prix montent avec le temps.", "Le FCFA est arrimé à l'euro, ce qui influence le comportement de la monnaie dans la CEMAC."],
  },
  body: {
    en: `## Three jobs, one note

Take a 10,000 FCFA note out of your pocket. It is doing three jobs at once, and they are not equally reliable.

First, it is a **means of exchange**. The market woman in Mokolo accepts it for tomatoes because she knows the taxi driver will accept it from her later. Nobody has to barter. This job works almost perfectly.

Second, it is a **unit of account**. Rents, salaries, school fees and the price of a bag of cement are all expressed in FCFA. That shared yardstick lets you compare a job offer in Douala with one in Yaoundé without converting goats into sacks of rice.

Third, it is a **store of value**. You can keep the note in a drawer and spend it next year. This is the job money does worst, and it is the reason this course exists.

## Why the store of value leaks

A note kept in a drawer does not change. Prices do. If a bag of rice costs 25,000 FCFA today and 26,000 FCFA next year, your stored 25,000 FCFA no longer buys a full bag. Nothing was stolen; the purchasing power simply drained away. Economists call this inflation, and we will measure it carefully in a later course.

- Cash in a drawer: fixed in number, falling in what it buys.
- Cash in a tontine: still cash, but with discipline and sometimes a small return.
- Money placed in an interest-paying instrument: the number itself can grow.

:::
The FCFA used in Cameroon, Chad, the Central African Republic, Congo, Gabon and Equatorial Guinea is issued by the BEAC, the regional central bank, and holds a fixed parity with the euro. That peg gives the currency unusual stability for the region, but it does not stop local prices from rising.
:::

## What this means for you

Understanding money is not about memorising definitions. It is about noticing which job your money is doing right now. Money you need next week should sit where it is safe and instantly available. Money you will not touch for years is quietly losing value in a drawer, and that is where saving, and eventually investing, come in.`,
    fr: `## Trois fonctions, un seul billet

Sortez un billet de 10 000 FCFA de votre poche. Il remplit trois fonctions en même temps, et elles ne sont pas toutes aussi fiables.

D'abord, il est un **moyen d'échange**. La commerçante du marché Mokolo l'accepte contre des tomates parce qu'elle sait que le chauffeur de taxi l'acceptera à son tour. Personne n'a besoin de troquer. Cette fonction marche presque parfaitement.

Ensuite, il est une **unité de compte**. Loyers, salaires, frais de scolarité et prix d'un sac de ciment s'expriment tous en FCFA. Cette mesure commune vous permet de comparer une offre d'emploi à Douala avec une autre à Yaoundé sans convertir des chèvres en sacs de riz.

Enfin, il est une **réserve de valeur**. Vous pouvez garder le billet dans un tiroir et le dépenser l'an prochain. C'est la fonction que l'argent remplit le moins bien, et c'est la raison d'être de ce cours.

## Pourquoi la réserve de valeur fuit

Un billet gardé dans un tiroir ne change pas. Les prix, eux, changent. Si un sac de riz coûte 25 000 FCFA aujourd'hui et 26 000 FCFA l'an prochain, vos 25 000 FCFA ne suffisent plus pour un sac entier. Rien n'a été volé ; le pouvoir d'achat s'est simplement évaporé. Les économistes appellent cela l'inflation, et nous la mesurerons avec soin dans un autre cours.

- L'argent liquide dans un tiroir : fixe en nombre, en baisse dans ce qu'il achète.
- L'argent dans une tontine : toujours du liquide, mais avec de la discipline et parfois un petit rendement.
- L'argent placé dans un instrument rémunéré : le nombre lui-même peut croître.

:::
Le FCFA utilisé au Cameroun, au Tchad, en Centrafrique, au Congo, au Gabon et en Guinée équatoriale est émis par la BEAC, la banque centrale régionale, et conserve une parité fixe avec l'euro. Cet arrimage donne à la monnaie une stabilité inhabituelle pour la région, mais il n'empêche pas les prix locaux de monter.
:::

## Ce que cela signifie pour vous

Comprendre l'argent, ce n'est pas mémoriser des définitions. C'est remarquer quelle fonction votre argent remplit en ce moment. L'argent dont vous aurez besoin la semaine prochaine doit rester là où il est sûr et disponible immédiatement. L'argent que vous ne toucherez pas pendant des années perd discrètement de la valeur dans un tiroir, et c'est là qu'interviennent l'épargne, puis l'investissement.`,
  },
};

const UM_L2: LessonDef = {
  slug: "income-expenses-and-the-gap",
  title: { en: "Income, expenses and the gap between them", fr: "Revenus, dépenses et l'écart entre les deux" },
  kind: "reading",
  durationMinutes: 7,
  keyTakeaways: {
    en: ["Wealth is built from the gap between what comes in and what goes out, not from income alone.", "Irregular income needs a different plan from a monthly salary.", "Track for one month before changing anything."],
    fr: ["Le patrimoine se construit à partir de l'écart entre ce qui entre et ce qui sort, pas à partir du seul revenu.", "Un revenu irrégulier exige un plan différent d'un salaire mensuel.", "Suivez vos flux pendant un mois avant de changer quoi que ce soit."],
  },
  body: {
    en: `## The only number that matters at first

People assume that wealth comes from a high salary. Spend a week with a bank teller and you will see otherwise. Some customers earning 150,000 FCFA a month put money aside every single month. Some earning 900,000 FCFA are overdrawn by the 20th.

The difference is the **gap**: income minus expenses. A positive gap, repeated, becomes savings. Savings, placed well, become investments. A negative gap, repeated, becomes debt. Everything else in personal finance sits on top of this arithmetic.

## Two kinds of income

A salaried employee knows what arrives on the 28th. A trader at the Marché Central or a freelance designer does not. Both can build wealth, but they need different plans.

| Situation | Main challenge | Practical response |
| --- | --- | --- |
| Monthly salary | Spending rises to meet income | Move savings out on payday, before spending |
| Irregular income | Good months hide bad months | Pay yourself a fixed "salary" from a buffer account |
| Mixed (salary plus side business) | Business and household money blur | Separate accounts, even if both are mobile money |

## Where the money goes

Expenses come in three layers. The first is **fixed**: rent, school fees, loan repayments. They are hard to move quickly. The second is **variable but necessary**: food, transport, electricity, data. They can be trimmed but not removed. The third is **discretionary**: outings, gifts, the new phone. This layer is where most gaps are won or lost.

A family in Bonabéri with 400,000 FCFA of monthly income might see 180,000 FCFA in fixed costs, 150,000 FCFA in necessary variable costs and 70,000 FCFA in discretionary spending. Their gap is zero. Cutting discretionary spending by half creates a 35,000 FCFA monthly gap, which is 420,000 FCFA a year. That is not a fortune, but it is the first brick.

:::
Do not change anything in month one. Write down every outflow for thirty days, including the 100 FCFA for the moto-taxi and the 500 FCFA airtime top-up. Most people discover that their small, frequent expenses add up to more than one large one. You cannot manage a gap you have never measured.
:::

## The role of obligations

In Central Africa the gap is often shared. Support for parents, contributions to a njangi, a cousin's school fees: these are real commitments and they belong in the plan rather than outside it. Writing them down does not make you less generous. It makes you reliable, because the money is there when it is promised.`,
    fr: `## Le seul chiffre qui compte au début

On suppose souvent que la richesse vient d'un salaire élevé. Passez une semaine aux côtés d'un guichetier de banque et vous verrez autre chose. Certains clients qui gagnent 150 000 FCFA par mois mettent de l'argent de côté chaque mois. D'autres qui gagnent 900 000 FCFA sont à découvert dès le 20.

La différence, c'est l'**écart** : revenus moins dépenses. Un écart positif, répété, devient de l'épargne. Une épargne bien placée devient un investissement. Un écart négatif, répété, devient une dette. Tout le reste de la finance personnelle repose sur cette arithmétique.

## Deux types de revenus

Un salarié sait ce qui arrive le 28. Une commerçante du Marché Central ou un graphiste indépendant ne le sait pas. Les deux peuvent bâtir un patrimoine, mais ils ont besoin de plans différents.

| Situation | Difficulté principale | Réponse pratique |
| --- | --- | --- |
| Salaire mensuel | Les dépenses montent au niveau du revenu | Sortir l'épargne le jour de la paie, avant de dépenser |
| Revenu irrégulier | Les bons mois cachent les mauvais | Se verser un « salaire » fixe depuis un compte tampon |
| Mixte (salaire plus activité) | L'argent de l'activité et du ménage se mélangent | Des comptes séparés, même s'il s'agit de deux comptes mobile money |

## Où va l'argent

Les dépenses se répartissent en trois couches. La première est **fixe** : loyer, frais de scolarité, remboursements de prêt. Elles sont difficiles à bouger rapidement. La deuxième est **variable mais nécessaire** : nourriture, transport, électricité, forfait internet. On peut la réduire, pas la supprimer. La troisième est **discrétionnaire** : sorties, cadeaux, le nouveau téléphone. C'est dans cette couche que la plupart des écarts se gagnent ou se perdent.

Une famille de Bonabéri disposant de 400 000 FCFA de revenus mensuels peut avoir 180 000 FCFA de charges fixes, 150 000 FCFA de dépenses variables nécessaires et 70 000 FCFA de dépenses discrétionnaires. Son écart est nul. Réduire de moitié les dépenses discrétionnaires crée un écart mensuel de 35 000 FCFA, soit 420 000 FCFA par an. Ce n'est pas une fortune, mais c'est la première brique.

:::
Ne changez rien le premier mois. Notez chaque sortie pendant trente jours, y compris les 100 FCFA de moto-taxi et la recharge de crédit de 500 FCFA. La plupart des gens découvrent que leurs petites dépenses fréquentes pèsent plus qu'une seule grosse dépense. On ne peut pas gérer un écart qu'on n'a jamais mesuré.
:::

## La place des obligations

En Afrique centrale, l'écart est souvent partagé. Le soutien aux parents, la cotisation au njangi, les frais de scolarité d'un cousin : ce sont de vrais engagements et ils ont leur place dans le plan, pas en dehors. Les écrire ne vous rend pas moins généreux. Cela vous rend fiable, parce que l'argent est là quand il a été promis.`,
  },
  quiz: kc({ en: "Knowledge check: money and the gap", fr: "Vérification : l'argent et l'écart" }, [
    { prompt: { en: "Which function of money is weakened by inflation?", fr: "Quelle fonction de l'argent est affaiblie par l'inflation ?" }, options: { en: ["Means of exchange", "Unit of account", "Store of value", "None of them"], fr: ["Moyen d'échange", "Unité de compte", "Réserve de valeur", "Aucune"] }, correctIndex: 2, explanation: { en: "Rising prices mean a fixed sum buys less over time. Money still works for exchange and accounting, but it stores value poorly.", fr: "La hausse des prix signifie qu'une somme fixe achète moins avec le temps. L'argent sert toujours à échanger et à compter, mais il conserve mal la valeur." } },
    { prompt: { en: "A household earns 400,000 FCFA and spends 400,000 FCFA each month. What is its gap?", fr: "Un ménage gagne 400 000 FCFA et dépense 400 000 FCFA chaque mois. Quel est son écart ?" }, options: { en: ["400,000 FCFA", "Zero", "Negative", "It depends on the salary"], fr: ["400 000 FCFA", "Zéro", "Négatif", "Cela dépend du salaire"] }, correctIndex: 1, explanation: { en: "The gap is income minus expenses. Equal amounts leave nothing to save, however large the income.", fr: "L'écart est le revenu moins les dépenses. Des montants égaux ne laissent rien à épargner, quel que soit le revenu." } },
    { prompt: { en: "What is the recommended first step before changing spending habits?", fr: "Quelle est la première étape recommandée avant de modifier ses habitudes de dépense ?" }, options: { en: ["Open an investment account", "Cut all discretionary spending immediately", "Track every outflow for one month", "Ask for a salary increase"], fr: ["Ouvrir un compte d'investissement", "Supprimer immédiatement toute dépense discrétionnaire", "Noter chaque sortie pendant un mois", "Demander une augmentation"] }, correctIndex: 2, explanation: { en: "You cannot manage what you have not measured. A thirty-day record shows where the money really goes, which is often different from where you think it goes.", fr: "On ne gère pas ce qu'on n'a pas mesuré. Un relevé de trente jours montre où va réellement l'argent, souvent ailleurs que là où on le croit." } },
  ]),
};

const UM_L3: LessonDef = {
  slug: "where-money-can-live",
  title: { en: "Where money can live: cash, bank, mobile, tontine", fr: "Où l'argent peut vivre : espèces, banque, mobile, tontine" },
  kind: "reading",
  durationMinutes: 7,
  keyTakeaways: {
    en: ["Each place money lives trades off safety, access and growth.", "Tontines and mobile money solve access and discipline, not growth.", "A bank account is the gateway to regulated investment products."],
    fr: ["Chaque lieu où vit l'argent arbitre entre sécurité, accès et croissance.", "Tontines et mobile money résolvent l'accès et la discipline, pas la croissance.", "Un compte bancaire est la porte d'entrée vers les produits d'investissement réglementés."],
  },
  body: {
    en: `## Four homes for the same 100,000 FCFA

Imagine four neighbours in Yaoundé, each with 100,000 FCFA they do not need this month.

The first keeps cash at home. Access is instant. Safety depends on the lock on the door. Growth is zero, and inflation slowly eats the value.

The second puts it in a mobile money wallet. Access is instant from anywhere with network. Safety is reasonable, with a PIN and a regulated operator behind it, though fraud through fake calls remains a real risk. Growth is usually zero.

The third contributes to a tontine. Every month the group pools contributions and one member takes the pot. Access is on a schedule, not on demand. Safety rests on trust and social pressure, which in a well-run group is strong. Growth is modest at best, and the real benefit is discipline.

The fourth opens a savings account at a bank. Access takes a visit or an app. Safety is backed by banking regulation and supervision from COBAC. Growth is a small interest rate. More importantly, the account is the doorway to everything else: Treasury securities, mutual funds, bonds.

## Judging a home for money

Three questions sort every option:

- **How quickly can I get it back, and at what cost?** This is liquidity.
- **What could go wrong, and who is responsible if it does?** This is risk and regulation.
- **Does the amount grow, and does it grow faster than prices?** This is return.

No single home wins on all three. That is not a flaw; it is the reason people spread money across several.

:::
A tontine is not a bad idea. For many families it is the most reliable savings tool they have ever used. The point is to see clearly what it does and does not do. It enforces saving. It does not make money grow, and it cannot protect the pot if the organiser disappears.
:::

## The ladder

Think of these homes as rungs on a ladder. Cash and mobile money handle this week. The tontine and savings account handle this year. Regulated investment products handle the years after that. Later courses in this category climb the ladder one rung at a time, starting with the difference between saving and investing.`,
    fr: `## Quatre foyers pour les mêmes 100 000 FCFA

Imaginez quatre voisins à Yaoundé, chacun avec 100 000 FCFA dont il n'a pas besoin ce mois-ci.

Le premier garde l'argent à la maison. L'accès est immédiat. La sécurité dépend de la serrure de la porte. La croissance est nulle, et l'inflation ronge lentement la valeur.

Le deuxième le dépose dans un portefeuille mobile money. L'accès est immédiat partout où il y a du réseau. La sécurité est correcte, avec un code PIN et un opérateur réglementé, même si la fraude par faux appels reste un risque réel. La croissance est généralement nulle.

Le troisième cotise à une tontine. Chaque mois, le groupe met les cotisations en commun et un membre reçoit la cagnotte. L'accès suit un calendrier, pas la demande. La sécurité repose sur la confiance et la pression sociale, très fortes dans un groupe bien tenu. La croissance est modeste au mieux ; le vrai bénéfice est la discipline.

Le quatrième ouvre un compte d'épargne dans une banque. L'accès demande une visite ou une application. La sécurité est garantie par la réglementation bancaire et la supervision de la COBAC. La croissance est un petit taux d'intérêt. Surtout, le compte est la porte vers tout le reste : titres publics, fonds communs de placement, obligations.

## Juger un foyer pour l'argent

Trois questions classent toutes les options :

- **À quelle vitesse puis-je le récupérer, et à quel coût ?** C'est la liquidité.
- **Que peut-il arriver de mal, et qui est responsable si cela arrive ?** C'est le risque et la réglementation.
- **Le montant croît-il, et plus vite que les prix ?** C'est le rendement.

Aucun foyer ne gagne sur les trois. Ce n'est pas un défaut ; c'est la raison pour laquelle on répartit l'argent entre plusieurs.

:::
Une tontine n'est pas une mauvaise idée. Pour beaucoup de familles, c'est l'outil d'épargne le plus fiable qu'elles aient jamais utilisé. L'important est de voir clairement ce qu'elle fait et ne fait pas. Elle impose l'épargne. Elle ne fait pas fructifier l'argent, et elle ne protège pas la cagnotte si l'organisateur disparaît.
:::

## L'échelle

Voyez ces foyers comme les barreaux d'une échelle. Les espèces et le mobile money gèrent cette semaine. La tontine et le compte d'épargne gèrent cette année. Les produits d'investissement réglementés gèrent les années suivantes. Les cours suivants de cette catégorie gravissent l'échelle un barreau à la fois, en commençant par la différence entre épargner et investir.`,
  },
};

const UM_L4: LessonDef = {
  slug: "the-cost-of-waiting",
  title: { en: "The cost of waiting", fr: "Le coût de l'attente" },
  kind: "reading",
  durationMinutes: 6,
  labSlug: "inflation",
  keyTakeaways: {
    en: ["Doing nothing with money is a decision with a measurable cost.", "Inflation compounds against you the same way interest compounds for you.", "Small amounts started early beat large amounts started late."],
    fr: ["Ne rien faire de son argent est une décision au coût mesurable.", "L'inflation se compose contre vous comme l'intérêt se compose pour vous.", "De petits montants commencés tôt battent de gros montants commencés tard."],
  },
  body: {
    en: `## Nothing is also a choice

Ask a room of adults what they did with last year's savings and a surprising number will say "nothing yet, I'm still deciding." Waiting feels safe. It is not free.

Suppose prices rise by 3% a year, a purely hypothetical figure for illustration. A drawer holding 500,000 FCFA still holds 500,000 FCFA after five years, but it buys roughly what 431,000 FCFA buys today. The loss is invisible because the number never changed. That is what makes it dangerous.

## Compounding runs both ways

Most people meet compounding as a friend: interest on interest, growth building on growth. Inflation is the same mechanism pointed the other way. Each year's price rise sits on top of the last year's. Over ten years at a hypothetical 3%, prices are not 30% higher; they are about 34% higher, because the increases stack.

| Years waited | Purchasing power of 500,000 FCFA (3% hypothetical inflation) |
| --- | --- |
| 0 | 500,000 FCFA |
| 5 | about 431,000 FCFA |
| 10 | about 372,000 FCFA |
| 20 | about 277,000 FCFA |

These are illustrations, not forecasts. Real inflation in CEMAC varies year by year and the BEAC publishes the actual figures. The shape of the curve is what matters.

## Starting small, starting now

Two cousins decide to put money aside. One starts at 25 with 20,000 FCFA a month and stops after ten years. The other waits until 35, then contributes 20,000 FCFA a month for twenty years. At a hypothetical growth rate of 5% a year, the first cousin, who contributed half as much, ends up with a comparable amount at 55, because her money had more years to work. Change the assumed rate and the exact figures move, but the pattern holds: time is the ingredient you cannot buy back.

:::
Open the Inflation and Purchasing Power lab and enter an amount you actually hold in cash. Set the inflation assumption to a few different values. The chart will show how long that money keeps its usefulness if left untouched. Then decide whether "still deciding" is a position you want to hold.
:::

## What waiting is good for

Waiting is the right choice when you have not yet understood what you are buying. Rushing into a product you cannot explain is worse than holding cash. The goal of this course is to shorten that period of necessary waiting by giving you the understanding, so the decision to act is yours, informed and unhurried.`,
    fr: `## Ne rien faire est aussi un choix

Demandez à une salle d'adultes ce qu'ils ont fait de l'épargne de l'an dernier et un nombre surprenant répondra « rien encore, je réfléchis ». Attendre paraît sûr. Ce n'est pas gratuit.

Supposons que les prix montent de 3 % par an, un chiffre purement hypothétique à titre d'illustration. Un tiroir contenant 500 000 FCFA contient toujours 500 000 FCFA après cinq ans, mais ils achètent à peu près ce que 431 000 FCFA achètent aujourd'hui. La perte est invisible parce que le nombre n'a jamais changé. C'est ce qui la rend dangereuse.

## La composition joue dans les deux sens

La plupart des gens rencontrent la capitalisation comme une amie : des intérêts sur les intérêts, une croissance qui s'appuie sur la croissance. L'inflation est le même mécanisme pointé dans l'autre sens. La hausse des prix de chaque année s'ajoute à celle de l'année précédente. Sur dix ans à 3 % hypothétiques, les prix ne sont pas 30 % plus élevés ; ils le sont d'environ 34 %, parce que les hausses s'empilent.

| Années d'attente | Pouvoir d'achat de 500 000 FCFA (inflation hypothétique de 3 %) |
| --- | --- |
| 0 | 500 000 FCFA |
| 5 | environ 431 000 FCFA |
| 10 | environ 372 000 FCFA |
| 20 | environ 277 000 FCFA |

Ce sont des illustrations, pas des prévisions. L'inflation réelle dans la CEMAC varie d'une année à l'autre et la BEAC publie les chiffres effectifs. C'est la forme de la courbe qui compte.

## Commencer petit, commencer maintenant

Deux cousines décident de mettre de l'argent de côté. L'une commence à 25 ans avec 20 000 FCFA par mois et s'arrête après dix ans. L'autre attend 35 ans, puis verse 20 000 FCFA par mois pendant vingt ans. À un taux de croissance hypothétique de 5 % par an, la première, qui a versé deux fois moins, se retrouve à 55 ans avec un montant comparable, parce que son argent a travaillé plus longtemps. Changez le taux supposé et les chiffres exacts bougent, mais le schéma tient : le temps est l'ingrédient qu'on ne peut pas racheter.

:::
Ouvrez le laboratoire Inflation et pouvoir d'achat et saisissez un montant que vous détenez réellement en espèces. Testez plusieurs hypothèses d'inflation. Le graphique montrera combien de temps cet argent conserve son utilité s'il reste intouché. Puis décidez si « je réfléchis encore » est une position que vous voulez tenir.
:::

## À quoi sert l'attente

Attendre est le bon choix quand on n'a pas encore compris ce qu'on achète. Se précipiter sur un produit qu'on ne sait pas expliquer est pire que garder du liquide. L'objectif de ce cours est de raccourcir cette période d'attente nécessaire en vous donnant la compréhension, pour que la décision d'agir soit la vôtre, informée et sans précipitation.`,
  },
  quiz: kc({ en: "Knowledge check: homes for money and the cost of waiting", fr: "Vérification : les foyers de l'argent et le coût de l'attente" }, [
    { prompt: { en: "What is the main benefit a tontine reliably provides?", fr: "Quel est le principal avantage qu'une tontine apporte de façon fiable ?" }, options: { en: ["Growth above inflation", "Saving discipline", "Regulatory protection", "Instant access"], fr: ["Une croissance supérieure à l'inflation", "La discipline d'épargne", "Une protection réglementaire", "Un accès immédiat"] }, correctIndex: 1, explanation: { en: "A tontine enforces regular contributions through social commitment. It does not grow money meaningfully and offers no regulatory guarantee.", fr: "Une tontine impose des cotisations régulières par l'engagement social. Elle ne fait pas fructifier l'argent de façon significative et n'offre aucune garantie réglementaire." } },
    { prompt: { en: "At a hypothetical 3% annual inflation, what happens to 500,000 FCFA kept as cash for ten years?", fr: "Avec une inflation hypothétique de 3 % par an, qu'arrive-t-il à 500 000 FCFA gardés en espèces pendant dix ans ?" }, options: { en: ["The amount falls to 372,000 FCFA", "The amount stays 500,000 FCFA but buys about what 372,000 FCFA buys today", "The amount grows with the economy", "Nothing changes"], fr: ["Le montant tombe à 372 000 FCFA", "Le montant reste 500 000 FCFA mais achète à peu près ce que 372 000 FCFA achètent aujourd'hui", "Le montant croît avec l'économie", "Rien ne change"] }, correctIndex: 1, explanation: { en: "The nominal figure never changes; purchasing power does. The loss is real but invisible on the note itself.", fr: "Le chiffre nominal ne change jamais ; le pouvoir d'achat, si. La perte est réelle mais invisible sur le billet." } },
    { prompt: { en: "Which option is the gateway to regulated investment products such as mutual funds?", fr: "Quelle option est la porte d'entrée vers les produits d'investissement réglementés comme les FCP ?" }, options: { en: ["Cash at home", "A mobile money wallet", "A bank account", "A tontine"], fr: ["Les espèces à la maison", "Un portefeuille mobile money", "Un compte bancaire", "Une tontine"] }, correctIndex: 2, explanation: { en: "Subscriptions to regulated products are settled through the banking system, which is why a bank account comes first on the ladder.", fr: "Les souscriptions aux produits réglementés se règlent par le système bancaire, d'où la place du compte bancaire comme premier barreau de l'échelle." } },
  ]),
};

// ---------------------------------------------------------------------------
// Lessons — Saving Versus Investing
// ---------------------------------------------------------------------------

const SVI_L1: LessonDef = {
  slug: "two-different-jobs",
  title: { en: "Saving and investing are two different jobs", fr: "Épargner et investir sont deux métiers différents" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "saving-vs-investing",
  keyTakeaways: {
    en: ["Saving protects money you will need soon; investing grows money you will not need for years.", "The dividing line is time, not the amount.", "Both are necessary; neither replaces the other."],
    fr: ["L'épargne protège l'argent dont vous aurez bientôt besoin ; l'investissement fait croître l'argent dont vous n'aurez pas besoin avant des années.", "La frontière, c'est le temps, pas le montant.", "Les deux sont nécessaires ; aucun ne remplace l'autre."],
  },
  body: {
    en: `## Same money, different purpose

A teacher in Bafoussam puts 30,000 FCFA aside each month. In January she calls it savings. In March she wonders if it should be "invested". The money has not changed. What has to change is her question: when will I need this?

**Saving** is setting money aside so that it is there, intact, when you need it. The priority is certainty. You accept little or no growth in exchange for knowing the full amount will be available on the day.

**Investing** is placing money into something whose value can change, in the expectation that over time it will grow faster than prices. The priority is growth. You accept uncertainty in exchange for the possibility of ending up with more.

## Time draws the line

The amount does not decide. 10,000 FCFA can be invested; 10 million FCFA can be saved. What decides is the horizon.

- Money needed within a year: save it. Rent, school fees, a planned trip, an emergency buffer.
- Money needed in one to three years: mostly save, perhaps with a cautious, liquid placement.
- Money not needed for three years or more: this is where investing earns its place.

The reason is simple. Investment values fluctuate. Over a few months, a fall can arrive at exactly the wrong moment. Over several years, there is time for fluctuations to average out, although nothing guarantees that they will.

| Question | Saving | Investing |
| --- | --- | --- |
| Main goal | Keep the amount intact | Grow the amount |
| Typical horizon | Days to a couple of years | Three years and beyond |
| Can the value fall? | Normally no | Yes |
| Example | Savings account, deposit | Treasury bond, mutual fund |

:::
A common mistake is to invest the emergency fund because the savings account "pays nothing". Then the car breaks down in a month when the investment is down, and the loss becomes real because the money has to be withdrawn. The emergency fund is boring on purpose.
:::

## Both, in order

Most financial planners suggest the same sequence: first build a savings buffer of three to six months of expenses, then begin investing with money beyond that buffer. The order matters because it means you never have to sell an investment at a bad time to cover an ordinary emergency. Saving makes investing survivable.`,
    fr: `## Même argent, autre objectif

Une enseignante de Bafoussam met 30 000 FCFA de côté chaque mois. En janvier, elle appelle cela de l'épargne. En mars, elle se demande si elle devrait « investir ». L'argent n'a pas changé. Ce qui doit changer, c'est sa question : quand en aurai-je besoin ?

**Épargner**, c'est mettre de l'argent de côté pour qu'il soit là, intact, quand vous en aurez besoin. La priorité est la certitude. Vous acceptez peu ou pas de croissance en échange de la garantie que le montant complet sera disponible le jour venu.

**Investir**, c'est placer de l'argent dans quelque chose dont la valeur peut varier, dans l'attente qu'avec le temps elle croisse plus vite que les prix. La priorité est la croissance. Vous acceptez l'incertitude en échange de la possibilité de finir avec davantage.

## Le temps trace la frontière

Le montant ne décide pas. 10 000 FCFA peuvent être investis ; 10 millions de FCFA peuvent être épargnés. Ce qui décide, c'est l'horizon.

- Argent nécessaire dans l'année : épargnez-le. Loyer, frais de scolarité, voyage prévu, réserve d'urgence.
- Argent nécessaire dans un à trois ans : surtout de l'épargne, peut-être avec un placement prudent et liquide.
- Argent dont vous n'avez pas besoin avant trois ans ou plus : c'est là que l'investissement prend sa place.

La raison est simple. La valeur des investissements fluctue. Sur quelques mois, une baisse peut survenir exactement au mauvais moment. Sur plusieurs années, les fluctuations ont le temps de se lisser, même si rien ne garantit qu'elles le feront.

| Question | Épargne | Investissement |
| --- | --- | --- |
| Objectif principal | Conserver le montant intact | Faire croître le montant |
| Horizon typique | De quelques jours à deux ans | Trois ans et plus |
| La valeur peut-elle baisser ? | Normalement non | Oui |
| Exemple | Compte d'épargne, dépôt | Obligation du Trésor, FCP |

:::
Une erreur fréquente consiste à investir le fonds d'urgence parce que le compte d'épargne « ne rapporte rien ». Puis la voiture tombe en panne un mois où l'investissement est en baisse, et la perte devient réelle parce qu'il faut retirer l'argent. Le fonds d'urgence est ennuyeux exprès.
:::

## Les deux, dans l'ordre

La plupart des planificateurs financiers suggèrent la même séquence : d'abord constituer une réserve d'épargne de trois à six mois de dépenses, puis commencer à investir avec l'argent au-delà de cette réserve. L'ordre compte, car il signifie que vous n'aurez jamais à vendre un investissement au mauvais moment pour couvrir une urgence ordinaire. L'épargne rend l'investissement supportable.`,
  },
};

const SVI_L2: LessonDef = {
  slug: "building-the-buffer",
  title: { en: "Building the buffer first", fr: "Constituer d'abord la réserve" },
  kind: "reading",
  durationMinutes: 6,
  labSlug: "goals",
  keyTakeaways: {
    en: ["An emergency fund of three to six months of expenses comes before any investment.", "Keep it liquid, separate and slightly inconvenient to touch.", "Automate the transfer so willpower is not required."],
    fr: ["Un fonds d'urgence de trois à six mois de dépenses précède tout investissement.", "Gardez-le liquide, séparé et légèrement difficile à toucher.", "Automatisez le virement pour que la volonté ne soit pas nécessaire."],
  },
  body: {
    en: `## What the buffer is for

The buffer, or emergency fund, exists for the events you cannot schedule: a hospital bill, a month without contracts, a roof after the rainy season. Its job is to stop a bad week from becoming a bad year. Without it, every surprise is paid for with debt or with the forced sale of something you intended to keep.

## How much

The usual guidance is three to six months of essential expenses, not income. If your fixed and necessary costs come to 250,000 FCFA a month, the target sits between 750,000 and 1,500,000 FCFA. People with irregular income, or with family members who depend on them, lean toward the higher end.

That figure can look discouraging. Treat it as a direction rather than a gate. A buffer of one month already changes how you sleep.

## Where to keep it

Three rules:

1. **Liquid.** You must be able to reach it within a day or two without penalty. A savings account or a dedicated mobile money wallet qualifies. A bond that matures in five years does not.
2. **Separate.** Money mixed with daily spending leaks. Give it its own account, ideally at a different institution from your current account.
3. **Slightly inconvenient.** No card linked to it. A transfer that takes an hour is enough friction to stop impulse withdrawals, and not enough to matter in a real emergency.

:::
Automate it. Set a standing order from your salary account on payday, even for 10,000 FCFA. Saving that depends on remembering, or on feeling motivated at the end of the month, fails in the months that matter most.
:::

## A worked example

Pauline runs a small pharmacy in Limbe and takes 350,000 FCFA a month from the business. Her essential household costs are 220,000 FCFA. She sets a six-month target of 1,320,000 FCFA. Starting with 100,000 FCFA already in a savings account and adding 40,000 FCFA a month, she reaches it in about thirty months if the account pays no interest. At that point, every franc she sets aside beyond the buffer is free to be invested with a long horizon, and a temporary fall in value will not force her hand.

Use the Personal Financial Goals lab to run your own version. Enter your essential monthly costs, choose a number of months, and see how long the buffer takes to build at different contribution levels. The numbers are hypothetical; the habit is not.`,
    fr: `## À quoi sert la réserve

La réserve, ou fonds d'urgence, existe pour les événements qu'on ne peut pas programmer : une facture d'hôpital, un mois sans contrat, une toiture après la saison des pluies. Son rôle est d'empêcher une mauvaise semaine de devenir une mauvaise année. Sans elle, chaque surprise se paie par une dette ou par la vente forcée de quelque chose qu'on comptait garder.

## Combien

La recommandation habituelle est de trois à six mois de dépenses essentielles, pas de revenus. Si vos charges fixes et nécessaires s'élèvent à 250 000 FCFA par mois, l'objectif se situe entre 750 000 et 1 500 000 FCFA. Les personnes aux revenus irréguliers, ou dont des proches dépendent, visent plutôt le haut de la fourchette.

Ce chiffre peut décourager. Prenez-le comme une direction plutôt qu'une barrière. Une réserve d'un mois change déjà la qualité de votre sommeil.

## Où la garder

Trois règles :

1. **Liquide.** Vous devez pouvoir y accéder en un ou deux jours sans pénalité. Un compte d'épargne ou un portefeuille mobile money dédié convient. Une obligation qui arrive à échéance dans cinq ans, non.
2. **Séparée.** L'argent mélangé aux dépenses quotidiennes fuit. Donnez-lui son propre compte, idéalement dans un autre établissement que votre compte courant.
3. **Légèrement difficile d'accès.** Pas de carte liée. Un virement qui prend une heure est une friction suffisante pour arrêter les retraits impulsifs, et insuffisante pour gêner en cas de vraie urgence.

:::
Automatisez. Mettez en place un virement permanent depuis votre compte salaire le jour de la paie, même de 10 000 FCFA. L'épargne qui dépend de la mémoire, ou de la motivation en fin de mois, échoue dans les mois qui comptent le plus.
:::

## Un exemple chiffré

Pauline tient une petite pharmacie à Limbe et se verse 350 000 FCFA par mois. Ses charges essentielles du ménage sont de 220 000 FCFA. Elle fixe un objectif de six mois, soit 1 320 000 FCFA. Avec 100 000 FCFA déjà sur un compte d'épargne et 40 000 FCFA ajoutés chaque mois, elle l'atteint en une trentaine de mois si le compte ne verse aucun intérêt. À partir de là, chaque franc mis de côté au-delà de la réserve est libre d'être investi sur un horizon long, et une baisse temporaire de valeur ne la forcera pas à vendre.

Utilisez le laboratoire Objectifs financiers personnels pour faire votre propre simulation. Saisissez vos charges mensuelles essentielles, choisissez un nombre de mois et voyez combien de temps la réserve met à se constituer selon le niveau de versement. Les chiffres sont hypothétiques ; l'habitude ne l'est pas.`,
  },
  quiz: kc({ en: "Knowledge check: saving before investing", fr: "Vérification : épargner avant d'investir" }, [
    { prompt: { en: "What mainly separates saving from investing?", fr: "Qu'est-ce qui distingue principalement l'épargne de l'investissement ?" }, options: { en: ["The amount of money", "The time horizon and the purpose", "The bank you use", "Whether it is in FCFA"], fr: ["Le montant", "L'horizon de temps et l'objectif", "La banque utilisée", "Le fait que ce soit en FCFA"] }, correctIndex: 1, explanation: { en: "Saving protects money needed soon; investing grows money not needed for years. The amount is irrelevant to the distinction.", fr: "L'épargne protège l'argent nécessaire bientôt ; l'investissement fait croître l'argent dont on n'a pas besoin avant des années. Le montant n'entre pas dans la distinction." } },
    { prompt: { en: "An emergency fund should be measured against which figure?", fr: "Un fonds d'urgence se mesure par rapport à quel chiffre ?" }, options: { en: ["Monthly income", "Essential monthly expenses", "Annual savings", "The price of a car"], fr: ["Le revenu mensuel", "Les dépenses mensuelles essentielles", "L'épargne annuelle", "Le prix d'une voiture"] }, correctIndex: 1, explanation: { en: "The fund covers what you must pay if income stops, so it is sized on essential costs, typically three to six months of them.", fr: "Le fonds couvre ce que vous devez payer si le revenu s'arrête ; il se dimensionne donc sur les charges essentielles, généralement trois à six mois." } },
    { prompt: { en: "Why is it a mistake to invest the emergency fund?", fr: "Pourquoi est-ce une erreur d'investir le fonds d'urgence ?" }, options: { en: ["Investments are illegal for small amounts", "An emergency may force a withdrawal when the value is down, making the loss real", "Banks do not allow it", "Emergency funds earn more in cash"], fr: ["Les investissements sont interdits pour les petits montants", "Une urgence peut forcer un retrait quand la valeur est en baisse, rendant la perte réelle", "Les banques ne le permettent pas", "Les fonds d'urgence rapportent plus en espèces"] }, correctIndex: 1, explanation: { en: "Investment values fluctuate. If you must sell during a dip to cover an emergency, a paper loss becomes a cash loss. The buffer stays boring on purpose.", fr: "La valeur des investissements fluctue. Si vous devez vendre pendant une baisse pour couvrir une urgence, une perte latente devient une perte réelle. La réserve reste ennuyeuse exprès." } },
  ]),
};

const SVI_L3: LessonDef = {
  slug: "what-growth-looks-like",
  title: { en: "What growth looks like over time", fr: "À quoi ressemble la croissance dans le temps" },
  kind: "reading",
  durationMinutes: 7,
  labSlug: "growth",
  videoSlug: "compound-growth-explained",
  keyTakeaways: {
    en: ["Growth comes from returns earned on returns, which needs time to show.", "Regular contributions matter more than the starting amount.", "Any rate used in a projection is an assumption, not a promise."],
    fr: ["La croissance vient des rendements gagnés sur les rendements, ce qui demande du temps pour se voir.", "Les versements réguliers comptent plus que le montant de départ.", "Tout taux utilisé dans une projection est une hypothèse, pas une promesse."],
  },
  body: {
    en: `## The slow start

Growth charts are frustrating in the first years. Put 100,000 FCFA into something earning a hypothetical 5% a year and after twelve months you have 105,000 FCFA. Hardly worth the paperwork. After two years, 110,250 FCFA. The extra 250 FCFA is interest on last year's interest, and it is the whole story in miniature.

Keep going. After ten years the balance is roughly 163,000 FCFA. After twenty, about 265,000 FCFA. The curve bends upward not because the rate changed but because the base it applies to keeps getting bigger. That bending is compounding, and it rewards patience more than cleverness.

## Contributions do the heavy lifting

A single deposit left alone is a slow way to build anything. Regular contributions change the picture.

| Scenario (hypothetical 5% a year) | After 10 years | After 20 years |
| --- | --- | --- |
| 100,000 FCFA once, nothing added | about 163,000 FCFA | about 265,000 FCFA |
| 100,000 FCFA plus 20,000 FCFA a month | about 3.3 million FCFA | about 8.5 million FCFA |

In the second row, most of the final figure is simply money you put in. The growth on top is meaningful but secondary. That is the honest message: investing amplifies a saving habit; it does not replace one.

## Rates are assumptions

Every projection in this course and in the Investment Lab uses an assumed rate. The number is chosen to illustrate a mechanism, not to predict any product. Real returns vary from year to year, can be negative, and depend on fees, taxes and the specific instrument. A regulated fund's documentation will describe its objective and risks; it will not promise a rate, and neither should anyone else.

:::
When someone shows you a projection, ask three questions. What rate did you assume? What happens to this chart if the rate is lower? What fees were deducted? A presenter who cannot answer all three is selling, not educating.
:::

## See it move

Open the Investment Growth Simulator. Start with an amount you could realistically set aside, add a monthly contribution, and drag the duration from five years to twenty. Watch where the growth line separates from the contributions line. Then lower the assumed rate and watch it narrow. Understanding that sensitivity is worth more than any single projection.`,
    fr: `## Le démarrage lent

Les courbes de croissance sont frustrantes les premières années. Placez 100 000 FCFA dans un instrument rapportant un hypothétique 5 % par an et, après douze mois, vous avez 105 000 FCFA. À peine de quoi justifier la paperasse. Après deux ans, 110 250 FCFA. Les 250 FCFA supplémentaires sont des intérêts sur les intérêts de l'an dernier, et c'est toute l'histoire en miniature.

Continuez. Après dix ans, le solde est d'environ 163 000 FCFA. Après vingt ans, environ 265 000 FCFA. La courbe s'incurve vers le haut non parce que le taux a changé, mais parce que la base à laquelle il s'applique ne cesse de grossir. Cette incurvation, c'est la capitalisation, et elle récompense la patience plus que l'habileté.

## Les versements font le gros du travail

Un dépôt unique laissé seul est une façon lente de bâtir quoi que ce soit. Des versements réguliers changent le tableau.

| Scénario (5 % hypothétique par an) | Après 10 ans | Après 20 ans |
| --- | --- | --- |
| 100 000 FCFA une fois, rien d'ajouté | environ 163 000 FCFA | environ 265 000 FCFA |
| 100 000 FCFA plus 20 000 FCFA par mois | environ 3,3 millions FCFA | environ 8,5 millions FCFA |

Dans la deuxième ligne, l'essentiel du montant final est simplement l'argent que vous avez versé. La croissance par-dessus est significative mais secondaire. C'est le message honnête : l'investissement amplifie une habitude d'épargne ; il ne la remplace pas.

## Les taux sont des hypothèses

Chaque projection de ce cours et du Laboratoire d'investissement utilise un taux supposé. Le chiffre est choisi pour illustrer un mécanisme, pas pour prédire un produit. Les rendements réels varient d'une année à l'autre, peuvent être négatifs et dépendent des frais, de la fiscalité et de l'instrument précis. La documentation d'un fonds réglementé décrit son objectif et ses risques ; elle ne promet pas de taux, et personne d'autre ne devrait le faire.

:::
Quand quelqu'un vous montre une projection, posez trois questions. Quel taux avez-vous supposé ? Que devient ce graphique si le taux est plus bas ? Quels frais ont été déduits ? Un présentateur qui ne peut pas répondre aux trois vend, il n'éduque pas.
:::

## Voyez-la bouger

Ouvrez le Simulateur de croissance. Commencez avec un montant que vous pourriez réellement mettre de côté, ajoutez un versement mensuel et faites glisser la durée de cinq à vingt ans. Observez où la ligne de croissance se sépare de celle des versements. Puis baissez le taux supposé et regardez l'écart se réduire. Comprendre cette sensibilité vaut plus que n'importe quelle projection isolée.`,
  },
};

const SVI_L4: LessonDef = {
  slug: "choosing-what-to-invest-in",
  title: { en: "Choosing what to invest in, step by step", fr: "Choisir dans quoi investir, étape par étape" },
  kind: "reading",
  durationMinutes: 7,
  videoSlug: "what-is-a-mutual-fund",
  keyTakeaways: {
    en: ["Start from your horizon and your tolerance for fluctuation, then look at instruments.", "Regulated products come with documentation that describes objectives, risks and fees.", "If you cannot explain an investment in two sentences, you are not ready to buy it."],
    fr: ["Partez de votre horizon et de votre tolérance aux fluctuations, puis regardez les instruments.", "Les produits réglementés s'accompagnent d'une documentation qui décrit objectifs, risques et frais.", "Si vous ne pouvez pas expliquer un investissement en deux phrases, vous n'êtes pas prêt à l'acheter."],
  },
  body: {
    en: `## Start with yourself, not with the product

Most people begin by asking "what should I buy?" The better first question is "what am I able to hold?" Two things define that.

Your **horizon**: when will you need the money back? Three years is a reasonable minimum for most investments, and longer is better.

Your **tolerance for fluctuation**: if the value dropped by a tenth next month, would you sell in alarm, or wait? Be honest. Plenty of sound investments have been ruined by their owners selling at the bottom.

## The menu in CEMAC

Once you know yourself, the menu is shorter than it looks.

- **Bank deposits and savings accounts.** Low fluctuation, low growth, high liquidity. The buffer lives here.
- **Treasury securities.** CEMAC states issue short-term bills (BTA) and longer-term bonds (OTA) through the BEAC market. The state promises interest and repayment; the main risk is the state's ability to pay, and prices move with interest rates if you sell early.
- **Listed shares.** Companies listed on the BVMAC, the regional exchange. Ownership of a slice of a business, with higher potential and higher fluctuation.
- **Mutual funds (FCP).** A pooled fund managed by a licensed company, regulated by COSUMAF. One subscription gives you a share of a diversified portfolio chosen by professionals.
- **Property and private business.** Real, tangible, often illiquid, and demanding of time and expertise.

:::
For a first investment, a bond-oriented mutual fund is often where beginners start, because the minimum is small, the portfolio is diversified from day one, and the regulator requires clear documentation. In Cameroon, for example, FCP subscriptions can start from 10,000 FCFA with a recommended holding period of about three years. The fund's own documents, not this lesson, define its terms.
:::

## Read before you sign

Every regulated product comes with documents: an information document, management regulations, sometimes a brochure. They will tell you the objective, the type of assets, the risks, the fees, how to subscribe and how to get your money back. Reading them takes an hour. Not reading them can cost years.

## The two-sentence test

Before buying anything, say out loud what it is and how it could lose money. "This is a fund that mostly holds government and corporate bonds; its value can fall if interest rates rise or an issuer fails to pay." If you can do that, you are ready to decide. If you cannot, you are not buying an investment; you are buying a story.`,
    fr: `## Commencez par vous, pas par le produit

La plupart des gens commencent par demander « qu'est-ce que je dois acheter ? ». La meilleure première question est « qu'est-ce que je suis capable de conserver ? ». Deux éléments la définissent.

Votre **horizon** : quand aurez-vous besoin de récupérer l'argent ? Trois ans est un minimum raisonnable pour la plupart des investissements, et plus long est préférable.

Votre **tolérance aux fluctuations** : si la valeur baissait d'un dixième le mois prochain, vendriez-vous par panique, ou attendriez-vous ? Soyez honnête. Beaucoup d'investissements sains ont été ruinés par des propriétaires qui ont vendu au plus bas.

## Le menu dans la CEMAC

Une fois que vous vous connaissez, le menu est plus court qu'il n'y paraît.

- **Dépôts bancaires et comptes d'épargne.** Faible fluctuation, faible croissance, forte liquidité. La réserve vit ici.
- **Titres publics.** Les États de la CEMAC émettent des bons à court terme (BTA) et des obligations à plus long terme (OTA) sur le marché de la BEAC. L'État promet des intérêts et un remboursement ; le risque principal est sa capacité à payer, et les prix bougent avec les taux d'intérêt si vous vendez avant l'échéance.
- **Actions cotées.** Des entreprises cotées à la BVMAC, la bourse régionale. La propriété d'une part d'une entreprise, avec un potentiel plus élevé et des fluctuations plus fortes.
- **Fonds communs de placement (FCP).** Un fonds mutualisé géré par une société agréée, réglementé par la COSUMAF. Une seule souscription vous donne une part d'un portefeuille diversifié choisi par des professionnels.
- **Immobilier et entreprise privée.** Réels, tangibles, souvent peu liquides, et exigeants en temps et en expertise.

:::
Pour un premier investissement, un FCP orienté obligations est souvent le point de départ des débutants, parce que le minimum est faible, le portefeuille est diversifié dès le premier jour et le régulateur exige une documentation claire. Au Cameroun, par exemple, les souscriptions à un FCP peuvent commencer à partir de 10 000 FCFA avec une durée de détention recommandée d'environ trois ans. Ce sont les documents du fonds, et non cette leçon, qui en définissent les conditions.
:::

## Lisez avant de signer

Tout produit réglementé s'accompagne de documents : une notice d'information, un règlement de gestion, parfois une brochure. Ils vous indiqueront l'objectif, le type d'actifs, les risques, les frais, comment souscrire et comment récupérer votre argent. Les lire prend une heure. Ne pas les lire peut coûter des années.

## Le test des deux phrases

Avant d'acheter quoi que ce soit, dites à voix haute ce que c'est et comment cela pourrait perdre de l'argent. « C'est un fonds qui détient surtout des obligations d'État et d'entreprise ; sa valeur peut baisser si les taux montent ou si un émetteur ne paie pas. » Si vous y arrivez, vous êtes prêt à décider. Sinon, vous n'achetez pas un investissement ; vous achetez une histoire.`,
  },
  quiz: kc({ en: "Knowledge check: from saving to investing", fr: "Vérification : de l'épargne à l'investissement" }, [
    { prompt: { en: "In a long-term projection with monthly contributions, where does most of the final amount usually come from?", fr: "Dans une projection à long terme avec des versements mensuels, d'où vient généralement l'essentiel du montant final ?" }, options: { en: ["Growth on the initial deposit", "The contributions themselves", "Fees refunded", "Inflation"], fr: ["La croissance du dépôt initial", "Les versements eux-mêmes", "Les frais remboursés", "L'inflation"] }, correctIndex: 1, explanation: { en: "Investing amplifies a saving habit but does not replace it. The contributions form the bulk; growth adds to them over time.", fr: "L'investissement amplifie une habitude d'épargne mais ne la remplace pas. Les versements forment l'essentiel ; la croissance s'y ajoute avec le temps." } },
    { prompt: { en: "What should you determine before looking at any investment product?", fr: "Que devez-vous déterminer avant de regarder un produit d'investissement ?" }, options: { en: ["The best-performing fund last year", "Your horizon and your tolerance for fluctuation", "The name of the fund manager", "The exchange rate"], fr: ["Le fonds le plus performant l'an dernier", "Votre horizon et votre tolérance aux fluctuations", "Le nom du gérant", "Le taux de change"] }, correctIndex: 1, explanation: { en: "The right instrument depends on when you need the money and how you would react to a fall. Products come second.", fr: "Le bon instrument dépend du moment où vous aurez besoin de l'argent et de votre réaction à une baisse. Les produits viennent ensuite." } },
    { prompt: { en: "Which statement about rates in projections is correct?", fr: "Quelle affirmation sur les taux dans les projections est correcte ?" }, options: { en: ["They are guaranteed by the regulator", "They are assumptions used to illustrate a mechanism", "They reflect the fund's future performance", "They include all fees automatically"], fr: ["Ils sont garantis par le régulateur", "Ce sont des hypothèses servant à illustrer un mécanisme", "Ils reflètent la performance future du fonds", "Ils incluent automatiquement tous les frais"] }, correctIndex: 1, explanation: { en: "An assumed rate shows how compounding behaves. Real returns vary, can be negative, and depend on fees and the instrument chosen.", fr: "Un taux supposé montre comment se comporte la capitalisation. Les rendements réels varient, peuvent être négatifs et dépendent des frais et de l'instrument choisi." } },
  ]),
};

// ---------------------------------------------------------------------------
// Lessons — What Is a Mutual Fund?
// ---------------------------------------------------------------------------

const MF_L1: LessonDef = {
  slug: "pooling-money",
  title: { en: "Pooling money: the idea behind a fund", fr: "Mettre l'argent en commun : l'idée derrière un fonds" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "what-is-a-mutual-fund",
  labSlug: "fund-mechanics",
  keyTakeaways: {
    en: ["A mutual fund pools many investors' money into one professionally managed portfolio.", "Each investor holds units, not the underlying bonds or shares directly.", "Pooling gives small investors diversification and access they could not get alone."],
    fr: ["Un fonds commun de placement met en commun l'argent de nombreux investisseurs dans un seul portefeuille géré par des professionnels.", "Chaque investisseur détient des parts, pas directement les obligations ou actions sous-jacentes.", "La mise en commun donne aux petits investisseurs une diversification et un accès qu'ils n'auraient pas seuls."],
  },
  body: {
    en: `## The tontine that buys bonds

You already understand pooling. A njangi collects contributions from thirty members and hands the pot to one of them each month. A mutual fund collects contributions from thousands of members and, instead of handing the pot to anyone, uses it to buy a portfolio of investments on everyone's behalf.

In the CEMAC market this vehicle is called an FCP, a *fonds commun de placement*. It has no legal personality of its own; it is a co-ownership of assets, managed by a licensed management company and overseen by the regulator, COSUMAF.

## Why pool at all

Suppose you have 50,000 FCFA and want to own government bonds, a few corporate bonds and some bank deposits, spread across several issuers so that one problem does not sink you. Alone, you cannot. A single Treasury bond unit in the regional market is typically 10,000 FCFA, and building a spread of ten issuers would take far more than you have, plus the time to follow each one.

Pooled with 5,000 other investors, the same 50,000 FCFA buys a proportional slice of a portfolio worth hundreds of millions. You own a small piece of everything the fund holds.

- **Diversification** from day one, even with the minimum subscription.
- **Professional selection** by people whose full-time job is to analyse issuers and rates.
- **Administration handled**: coupons collected, maturities reinvested, valuations computed.
- **Regulatory oversight** of the manager, the depositary and the documents.

## Units, not bonds

When you subscribe, you do not receive bonds. You receive **units** (*parts*) of the fund. If the fund is worth 500 million FCFA and has issued 50,000 units, each unit is worth 10,000 FCFA. Your 50,000 FCFA buys five units. As the portfolio earns interest or changes in value, the worth of each unit moves with it. That unit value is the **net asset value**, which has its own course.

:::
Pooling does not remove risk. If the bonds in the portfolio fall in value, every unit falls with them. What pooling removes is the risk of having everything in one place, and the practical barrier of needing large sums to spread your money sensibly.
:::

## Who does what

Four parties surround the pool. The **management company** decides what to buy and sell. The **depositary**, a bank, holds the assets and checks that the manager follows the rules. The **auditor** certifies the accounts. The **regulator** licenses all of them and approves the fund's documents. The next lesson walks through each role, because knowing who watches whom is what makes a fund trustworthy rather than merely convenient.`,
    fr: `## La tontine qui achète des obligations

Vous comprenez déjà la mise en commun. Un njangi collecte les cotisations de trente membres et remet la cagnotte à l'un d'eux chaque mois. Un fonds commun de placement collecte les apports de milliers de membres et, au lieu de remettre la cagnotte à quelqu'un, l'utilise pour acheter un portefeuille d'investissements au nom de tous.

Sur le marché de la CEMAC, ce véhicule s'appelle un FCP, un fonds commun de placement. Il n'a pas de personnalité juridique propre ; c'est une copropriété d'actifs, gérée par une société de gestion agréée et surveillée par le régulateur, la COSUMAF.

## Pourquoi mettre en commun

Supposons que vous ayez 50 000 FCFA et que vous souhaitiez détenir des obligations d'État, quelques obligations d'entreprise et des dépôts bancaires, répartis entre plusieurs émetteurs pour qu'un seul problème ne vous coule pas. Seul, c'est impossible. Une obligation du Trésor sur le marché régional vaut typiquement 10 000 FCFA l'unité, et constituer une répartition sur dix émetteurs demanderait bien plus que ce que vous avez, sans compter le temps pour suivre chacun.

Mis en commun avec 5 000 autres investisseurs, les mêmes 50 000 FCFA achètent une fraction proportionnelle d'un portefeuille de plusieurs centaines de millions. Vous possédez un petit morceau de tout ce que le fonds détient.

- **Une diversification** dès le premier jour, même avec la souscription minimale.
- **Une sélection professionnelle** par des personnes dont le métier à plein temps est d'analyser émetteurs et taux.
- **Une administration prise en charge** : coupons encaissés, échéances réinvesties, valorisations calculées.
- **Une surveillance réglementaire** du gérant, du dépositaire et des documents.

## Des parts, pas des obligations

Quand vous souscrivez, vous ne recevez pas d'obligations. Vous recevez des **parts** du fonds. Si le fonds vaut 500 millions de FCFA et a émis 50 000 parts, chaque part vaut 10 000 FCFA. Vos 50 000 FCFA achètent cinq parts. À mesure que le portefeuille encaisse des intérêts ou change de valeur, la valeur de chaque part évolue avec lui. Cette valeur de la part, c'est la **valeur liquidative**, qui a son propre cours.

:::
La mise en commun ne supprime pas le risque. Si les obligations du portefeuille perdent de la valeur, chaque part baisse avec elles. Ce que la mise en commun supprime, c'est le risque d'avoir tout au même endroit, et l'obstacle pratique d'avoir besoin de grosses sommes pour répartir son argent raisonnablement.
:::

## Qui fait quoi

Quatre acteurs entourent le pool. La **société de gestion** décide quoi acheter et vendre. Le **dépositaire**, une banque, conserve les actifs et vérifie que le gérant respecte les règles. Le **commissaire aux comptes** certifie les comptes. Le **régulateur** agrée tous ces acteurs et approuve les documents du fonds. La leçon suivante détaille chaque rôle, car savoir qui surveille qui est ce qui rend un fonds digne de confiance plutôt que simplement pratique.`,
  },
};

const MF_L2: LessonDef = {
  slug: "who-watches-the-fund",
  title: { en: "Who watches the fund: manager, depositary, auditor, regulator", fr: "Qui surveille le fonds : gérant, dépositaire, commissaire aux comptes, régulateur" },
  kind: "reading",
  durationMinutes: 7,
  videoSlug: "how-does-a-fund-manager-work",
  keyTakeaways: {
    en: ["The manager decides; the depositary holds and checks; the auditor certifies; the regulator licenses and supervises.", "Separation of roles is what protects investors from a single point of failure.", "Always verify a fund's COSUMAF references before subscribing."],
    fr: ["Le gérant décide ; le dépositaire conserve et contrôle ; le commissaire aux comptes certifie ; le régulateur agrée et supervise.", "La séparation des rôles protège les investisseurs contre un point de défaillance unique.", "Vérifiez toujours les références COSUMAF d'un fonds avant de souscrire."],
  },
  body: {
    en: `## Four pairs of eyes

The strength of a regulated fund is not that any one party is honest. It is that no single party can act alone.

**The management company** (*société de gestion*) runs the portfolio. It analyses issuers, decides what to buy and sell, and must stay within the limits written in the fund's management regulations: what proportion in government bonds, what maximum in any single issuer, how much must stay liquid. It earns a management fee, usually a percentage of assets per year, deducted from the fund. It must hold a COSUMAF licence as a management company; in Cameroon, Stoneshed Asset Management holds licence COSUMAF-SGP-03/2023, to give a concrete example of what such a reference looks like.

**The depositary** (*dépositaire*) is a bank that physically holds the fund's assets and cash. The manager cannot move money without the depositary executing the instruction, and the depositary is obliged to refuse instructions that breach the regulations. It also checks the NAV calculation. For the Stoneshed funds, the depositary named in the brochure is Ecobank Cameroon.

**The auditor** (*commissaire aux comptes*) is an independent firm that certifies the fund's annual accounts and reports irregularities. For the Stoneshed funds, the brochure names Moore Stephens CA.

**The regulator**, COSUMAF, licenses the manager, approves the fund's creation and its documents, and supervises all of the above. Each approved fund carries references: a fund reference and a visa number for its public offering.

| Party | Can decide investments? | Holds the money? | Independent of the manager? |
| --- | --- | --- | --- |
| Management company | Yes | No | — |
| Depositary | No | Yes | Yes |
| Auditor | No | No | Yes |
| Regulator | No | No | Yes |

## Why the separation matters

Imagine the roles collapsed into one. A single company would decide, hold, value and certify. Nothing would stop it reporting a flattering unit value, or moving cash somewhere it should not go. History in many markets shows that is how pooled savings get lost. The separation is boring by design.

:::
Before subscribing to any fund, find its COSUMAF fund reference and visa number in the information document, then confirm them with the regulator or on its publications. A product that cannot show these references is not a regulated fund, whatever it calls itself.
:::

## What this does not guarantee

Oversight protects you from fraud and from breaches of the rules. It does not protect you from the market. A perfectly supervised bond fund still loses value when interest rates rise or an issuer defaults. The next course in this category, on net asset value, shows exactly how those movements reach your units.`,
    fr: `## Quatre paires d'yeux

La force d'un fonds réglementé ne tient pas à l'honnêteté d'un acteur en particulier. Elle tient au fait qu'aucun acteur ne peut agir seul.

**La société de gestion** gère le portefeuille. Elle analyse les émetteurs, décide quoi acheter et vendre, et doit respecter les limites inscrites dans le règlement de gestion du fonds : quelle proportion en obligations d'État, quel maximum sur un même émetteur, quelle part doit rester liquide. Elle perçoit des frais de gestion, généralement un pourcentage des actifs par an, prélevés sur le fonds. Elle doit détenir un agrément de société de gestion délivré par la COSUMAF ; au Cameroun, Stoneshed Asset Management détient l'agrément COSUMAF-SGP-03/2023, pour donner un exemple concret de ce à quoi ressemble une telle référence.

**Le dépositaire** est une banque qui conserve matériellement les actifs et la trésorerie du fonds. Le gérant ne peut pas déplacer d'argent sans que le dépositaire exécute l'instruction, et le dépositaire a l'obligation de refuser les instructions contraires au règlement. Il contrôle aussi le calcul de la valeur liquidative. Pour les fonds Stoneshed, le dépositaire nommé dans la brochure est Ecobank Cameroun.

**Le commissaire aux comptes** est un cabinet indépendant qui certifie les comptes annuels du fonds et signale les irrégularités. Pour les fonds Stoneshed, la brochure nomme Moore Stephens CA.

**Le régulateur**, la COSUMAF, agrée la société de gestion, approuve la création du fonds et ses documents, et supervise tous les acteurs ci-dessus. Chaque fonds approuvé porte des références : une référence de fonds et un numéro de visa pour son offre au public.

| Acteur | Décide des investissements ? | Détient l'argent ? | Indépendant du gérant ? |
| --- | --- | --- | --- |
| Société de gestion | Oui | Non | — |
| Dépositaire | Non | Oui | Oui |
| Commissaire aux comptes | Non | Non | Oui |
| Régulateur | Non | Non | Oui |

## Pourquoi la séparation compte

Imaginez les rôles fusionnés en un seul. Une seule société déciderait, conserverait, valoriserait et certifierait. Rien ne l'empêcherait de publier une valeur de part flatteuse, ou de déplacer la trésorerie là où elle ne devrait pas aller. L'histoire de nombreux marchés montre que c'est ainsi que l'épargne mutualisée se perd. La séparation est ennuyeuse à dessein.

:::
Avant de souscrire à un fonds, trouvez sa référence COSUMAF et son numéro de visa dans la notice d'information, puis confirmez-les auprès du régulateur ou dans ses publications. Un produit qui ne peut pas présenter ces références n'est pas un fonds réglementé, quel que soit le nom qu'il se donne.
:::

## Ce que cela ne garantit pas

La surveillance vous protège de la fraude et des manquements aux règles. Elle ne vous protège pas du marché. Un fonds obligataire parfaitement supervisé perd quand même de la valeur quand les taux montent ou qu'un émetteur fait défaut. Le cours suivant de cette catégorie, sur la valeur liquidative, montre exactement comment ces mouvements atteignent vos parts.`,
  },
  quiz: kc({ en: "Knowledge check: the fund and its guardians", fr: "Vérification : le fonds et ses gardiens" }, [
    { prompt: { en: "When you subscribe to an FCP, what do you receive?", fr: "Quand vous souscrivez à un FCP, que recevez-vous ?" }, options: { en: ["The bonds the fund buys, in your name", "Units of the fund", "A fixed interest certificate", "Shares in the management company"], fr: ["Les obligations achetées par le fonds, à votre nom", "Des parts du fonds", "Un certificat d'intérêt fixe", "Des actions de la société de gestion"] }, correctIndex: 1, explanation: { en: "Investors own units representing a proportional share of the whole portfolio; the fund, not the investor, holds the underlying assets.", fr: "Les investisseurs détiennent des parts représentant une fraction proportionnelle de l'ensemble du portefeuille ; c'est le fonds, et non l'investisseur, qui détient les actifs sous-jacents." } },
    { prompt: { en: "Which party holds the fund's assets and must refuse instructions that breach the regulations?", fr: "Quel acteur conserve les actifs du fonds et doit refuser les instructions contraires au règlement ?" }, options: { en: ["The management company", "The depositary", "The auditor", "The investors"], fr: ["La société de gestion", "Le dépositaire", "Le commissaire aux comptes", "Les investisseurs"] }, correctIndex: 1, explanation: { en: "The depositary bank holds assets and cash and acts as a check on the manager. The manager decides but cannot move money alone.", fr: "La banque dépositaire conserve actifs et trésorerie et sert de contrôle sur le gérant. Le gérant décide mais ne peut pas déplacer l'argent seul." } },
    { prompt: { en: "Does regulatory oversight protect a bond fund from losing value when interest rates rise?", fr: "La surveillance réglementaire protège-t-elle un fonds obligataire contre une perte de valeur quand les taux montent ?" }, options: { en: ["Yes, COSUMAF guarantees the unit value", "No, oversight addresses fraud and rule-breaking, not market risk", "Yes, the depositary compensates losses", "Only for government bonds"], fr: ["Oui, la COSUMAF garantit la valeur de la part", "Non, la surveillance traite la fraude et les manquements, pas le risque de marché", "Oui, le dépositaire compense les pertes", "Seulement pour les obligations d'État"] }, correctIndex: 1, explanation: { en: "Supervision protects the integrity of the process. The market can still move against the portfolio, and the unit value follows.", fr: "La supervision protège l'intégrité du processus. Le marché peut toujours évoluer contre le portefeuille, et la valeur de la part suit." } },
  ]),
};

const MF_L3: LessonDef = {
  slug: "reinvest-or-distribute",
  title: { en: "Reinvest or distribute: two ways to treat income", fr: "Réinvestir ou distribuer : deux façons de traiter les revenus" },
  kind: "reading",
  durationMinutes: 7,
  labSlug: "cap-vs-dist",
  keyTakeaways: {
    en: ["A capitalisation fund keeps income inside the fund; a distribution fund pays it out, typically once a year.", "Neither is better in the abstract; the right one depends on whether you need income now.", "Distributions reduce the unit value by the amount paid; nothing is created or lost in the payout itself."],
    fr: ["Un fonds de capitalisation conserve les revenus dans le fonds ; un fonds de distribution les verse, généralement une fois par an.", "Aucun n'est meilleur dans l'absolu ; le bon choix dépend de votre besoin de revenus immédiats.", "Les distributions réduisent la valeur de la part du montant versé ; rien n'est créé ni perdu dans le versement lui-même."],
  },
  body: {
    en: `## The portfolio earns; then what?

A bond fund collects coupons. Deposits pay interest. Over a year, those payments accumulate inside the fund. The manager has two options for what to do with them, and the choice is fixed in the fund's regulations before anyone subscribes.

A **capitalisation fund** (*fonds de capitalisation*) keeps the income. It is reinvested in more bonds and deposits, so the portfolio grows, and the growth shows up in a rising unit value. Investors see nothing arrive in their bank account; their units simply become worth more.

A **distribution fund** (*fonds de distribution*) pays the income out to unitholders, usually once a year. The unit value does not carry the accumulated income; instead investors receive cash in proportion to their units.

## Same engine, different exhaust

The portfolio inside both funds can be identical. What differs is the route the income takes to you.

| | Capitalisation | Distribution |
| --- | --- | --- |
| Where income goes | Reinvested in the fund | Paid to unitholders |
| What you see | Unit value rises over time | Cash arrives, unit value resets lower after payout |
| Suits | Building a sum for the future | Supplementing current income |
| Compounding | Automatic | Only if you reinvest the payout yourself |

Stoneshed's two public funds illustrate the pair: FCP Stoneshed Classic is a capitalisation fund that reinvests income, and FCP Stoneshed Gold is a distribution fund that distributes income annually. Both are oriented toward bonds and other debt securities. The names are brand labels; "Gold" says nothing about precious metals.

## The payout is not free money

On distribution day, suppose a unit is worth 10,400 FCFA and the fund pays 400 FCFA per unit. The next morning the unit is worth about 10,000 FCFA. You have 400 FCFA in cash and a unit worth 400 FCFA less. Your total is unchanged. A distribution is a transfer from the fund to your pocket, not a gift on top.

:::
Open the Compounding Versus Distribution lab. Set the same hypothetical rate for both columns and watch the capitalisation column pull ahead over ten years, while the distribution column shows cash accumulating outside the fund. Then ask which pattern fits your life right now: do you need the cash, or can you let it work?
:::

## Choosing

A retiree in Kribi who relies on investment income may prefer distribution. A 28-year-old in Douala saving for a home in a decade has no use for annual cash and would rather it compound. Neither is wrong. The fund's documents, and the fees and taxes that apply to each route, decide the fine detail; your horizon decides the direction.`,
    fr: `## Le portefeuille gagne ; et ensuite ?

Un fonds obligataire encaisse des coupons. Les dépôts versent des intérêts. Sur une année, ces paiements s'accumulent dans le fonds. Le gérant a deux options pour les traiter, et le choix est fixé dans le règlement du fonds avant toute souscription.

Un **fonds de capitalisation** conserve les revenus. Ils sont réinvestis dans d'autres obligations et dépôts, le portefeuille grossit, et cette croissance apparaît dans une valeur de part qui monte. Les investisseurs ne voient rien arriver sur leur compte bancaire ; leurs parts valent simplement davantage.

Un **fonds de distribution** verse les revenus aux porteurs de parts, généralement une fois par an. La valeur de la part ne porte pas les revenus accumulés ; les investisseurs reçoivent à la place de l'argent proportionnellement à leurs parts.

## Même moteur, autre sortie

Le portefeuille à l'intérieur des deux fonds peut être identique. Ce qui diffère, c'est le chemin que prennent les revenus pour vous atteindre.

| | Capitalisation | Distribution |
| --- | --- | --- |
| Où vont les revenus | Réinvestis dans le fonds | Versés aux porteurs |
| Ce que vous voyez | La valeur de la part monte avec le temps | De l'argent arrive, la part se réajuste à la baisse après le versement |
| Convient à | Constituer une somme pour l'avenir | Compléter un revenu courant |
| Capitalisation des revenus | Automatique | Seulement si vous réinvestissez vous-même le versement |

Les deux fonds publics de Stoneshed illustrent la paire : le FCP Stoneshed Classic est un fonds de capitalisation qui réinvestit les revenus, et le FCP Stoneshed Gold un fonds de distribution qui distribue les revenus chaque année. Tous deux sont orientés vers les obligations et autres titres de créance. Les noms sont des appellations de marque ; « Gold » ne dit rien des métaux précieux.

## Le versement n'est pas de l'argent gratuit

Le jour de la distribution, supposons qu'une part vaille 10 400 FCFA et que le fonds verse 400 FCFA par part. Le lendemain matin, la part vaut environ 10 000 FCFA. Vous avez 400 FCFA en espèces et une part qui vaut 400 FCFA de moins. Votre total est inchangé. Une distribution est un transfert du fonds vers votre poche, pas un cadeau en plus.

:::
Ouvrez le laboratoire Capitalisation contre distribution. Fixez le même taux hypothétique pour les deux colonnes et observez la colonne capitalisation prendre l'avantage sur dix ans, tandis que la colonne distribution montre l'argent s'accumuler en dehors du fonds. Puis demandez-vous quel schéma correspond à votre vie en ce moment : avez-vous besoin de l'argent, ou pouvez-vous le laisser travailler ?
:::

## Choisir

Un retraité de Kribi qui compte sur les revenus de ses placements préférera sans doute la distribution. Une personne de 28 ans à Douala qui épargne pour un logement dans dix ans n'a aucun usage d'un versement annuel et préférera le voir se capitaliser. Aucun des deux n'a tort. Les documents du fonds, ainsi que les frais et la fiscalité propres à chaque voie, règlent le détail ; votre horizon décide de la direction.`,
  },
};

const MF_L4: LessonDef = {
  slug: "getting-in-and-out",
  title: { en: "Getting in and getting out: subscription and redemption", fr: "Entrer et sortir : souscription et rachat" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "what-happens-to-10000-fcfa",
  keyTakeaways: {
    en: ["You buy units at the next computed NAV, plus any entry fee; you sell them back to the fund at the next NAV, minus any exit fee.", "Redemption takes time; the fund's documents state the notice period and settlement delay.", "The recommended holding period is a signal about liquidity and fluctuation, not a lock."],
    fr: ["Vous achetez des parts à la prochaine valeur liquidative calculée, plus d'éventuels frais d'entrée ; vous les revendez au fonds à la prochaine valeur liquidative, moins d'éventuels frais de sortie.", "Le rachat prend du temps ; les documents du fonds précisent le préavis et le délai de règlement.", "La durée de détention recommandée est un signal sur la liquidité et les fluctuations, pas un verrou."],
  },
  body: {
    en: `## Subscription: joining the pool

You decide to invest 100,000 FCFA in a bond fund. You complete a subscription form with the management company or its distributor, provide identification as required by anti-money-laundering rules, and transfer the money to the fund's account at the depositary bank. You do not choose a price. Your units are issued at the **next net asset value** calculated after your order is received, which keeps everyone on equal terms. If the NAV comes out at 10,250 FCFA and the fund charges no entry fee, you receive about 9.76 units. Fractional units are normal.

Some funds charge an **entry fee** (*droit d'entrée*), a percentage deducted before units are issued. The information document states it. Minimums also apply; in the Cameroonian market, FCP subscriptions can start at 10,000 FCFA, which is what makes them accessible.

## Redemption: leaving the pool

When you want your money back, you do not sell to another investor. You ask the fund to **redeem** (*racheter*) your units. The fund pays you the next NAV per unit, minus any **exit fee**, and cancels those units. The portfolio shrinks slightly to pay you out.

Two timing details matter.

- **Notice period.** The regulations may require your redemption order to be lodged a certain number of days before the NAV date that will apply.
- **Settlement delay.** After the NAV is computed, the fund has a stated number of days to pay the cash to your account.

Together these mean a redemption is not instant like a mobile money withdrawal. Plan for days, sometimes a couple of weeks, depending on the fund.

:::
The information document may also mention circumstances in which redemptions can be suspended or limited, typically in exceptional market conditions, and whether early redemption carries a higher fee. Read that section before you subscribe, not when you need the money.
:::

## The recommended holding period

Funds state a recommended minimum holding period. Stoneshed's brochure, for instance, recommends three years for its FCPs. This is not a lock; you may redeem earlier, subject to the fees and delays above. It is a message: the portfolio's value fluctuates, and three years gives those fluctuations time to average out. Money you may need next quarter does not belong in a fund with a three-year horizon.

## The full cycle in one picture

Cash leaves your bank account, becomes units at the next NAV, sits in a diversified bond portfolio that earns coupons and moves with rates, and returns to your account at a later NAV when you redeem. Open the How a Mutual Fund Works lab and run the cycle step by step with your own figures.`,
    fr: `## La souscription : rejoindre le pool

Vous décidez d'investir 100 000 FCFA dans un fonds obligataire. Vous remplissez un bulletin de souscription auprès de la société de gestion ou de son distributeur, fournissez une pièce d'identité comme l'exigent les règles de lutte contre le blanchiment, et virez l'argent sur le compte du fonds auprès de la banque dépositaire. Vous ne choisissez pas de prix. Vos parts sont émises à la **prochaine valeur liquidative** calculée après réception de votre ordre, ce qui met tout le monde sur un pied d'égalité. Si la valeur liquidative ressort à 10 250 FCFA et que le fonds ne prélève pas de frais d'entrée, vous recevez environ 9,76 parts. Les fractions de part sont normales.

Certains fonds prélèvent des **droits d'entrée**, un pourcentage déduit avant l'émission des parts. La notice d'information les précise. Des minimums s'appliquent aussi ; sur le marché camerounais, les souscriptions à un FCP peuvent commencer à 10 000 FCFA, ce qui les rend accessibles.

## Le rachat : quitter le pool

Quand vous voulez récupérer votre argent, vous ne vendez pas à un autre investisseur. Vous demandez au fonds de **racheter** vos parts. Le fonds vous paie la prochaine valeur liquidative par part, moins d'éventuels **droits de sortie**, et annule ces parts. Le portefeuille se réduit légèrement pour vous payer.

Deux détails de calendrier comptent.

- **Le préavis.** Le règlement peut exiger que votre ordre de rachat soit déposé un certain nombre de jours avant la date de valeur liquidative qui s'appliquera.
- **Le délai de règlement.** Une fois la valeur liquidative calculée, le fonds dispose d'un nombre de jours défini pour verser l'argent sur votre compte.

Ensemble, cela signifie qu'un rachat n'est pas instantané comme un retrait mobile money. Prévoyez des jours, parfois deux semaines, selon le fonds.

:::
La notice d'information peut aussi mentionner les circonstances dans lesquelles les rachats peuvent être suspendus ou limités, typiquement dans des conditions de marché exceptionnelles, et si un rachat anticipé entraîne des frais plus élevés. Lisez cette section avant de souscrire, pas au moment où vous avez besoin de l'argent.
:::

## La durée de détention recommandée

Les fonds indiquent une durée de détention minimale recommandée. La brochure de Stoneshed, par exemple, recommande trois ans pour ses FCP. Ce n'est pas un verrou ; vous pouvez racheter plus tôt, sous réserve des frais et délais ci-dessus. C'est un message : la valeur du portefeuille fluctue, et trois ans donnent à ces fluctuations le temps de se lisser. L'argent dont vous pourriez avoir besoin le trimestre prochain n'a pas sa place dans un fonds à horizon de trois ans.

## Le cycle complet en une image

L'argent quitte votre compte bancaire, devient des parts à la prochaine valeur liquidative, repose dans un portefeuille obligataire diversifié qui encaisse des coupons et bouge avec les taux, puis revient sur votre compte à une valeur liquidative ultérieure quand vous rachetez. Ouvrez le laboratoire Comment fonctionne un FCP et parcourez le cycle étape par étape avec vos propres chiffres.`,
  },
  quiz: kc({ en: "Knowledge check: income treatment and the subscription cycle", fr: "Vérification : traitement des revenus et cycle de souscription" }, [
    { prompt: { en: "A unit is worth 10,400 FCFA and the fund distributes 400 FCFA per unit. What is the unit worth the next morning, all else equal?", fr: "Une part vaut 10 400 FCFA et le fonds distribue 400 FCFA par part. Que vaut la part le lendemain matin, toutes choses égales par ailleurs ?" }, options: { en: ["10,400 FCFA", "10,800 FCFA", "About 10,000 FCFA", "It depends on the manager"], fr: ["10 400 FCFA", "10 800 FCFA", "Environ 10 000 FCFA", "Cela dépend du gérant"] }, correctIndex: 2, explanation: { en: "The distribution moves value from the fund to your pocket. Your total holding is unchanged; the unit value falls by the amount paid.", fr: "La distribution déplace de la valeur du fonds vers votre poche. Votre avoir total est inchangé ; la valeur de la part baisse du montant versé." } },
    { prompt: { en: "At what price are your units issued when you subscribe?", fr: "À quel prix vos parts sont-elles émises lors de la souscription ?" }, options: { en: ["The price you negotiate", "The last published NAV", "The next NAV computed after your order", "Always 10,000 FCFA"], fr: ["Le prix que vous négociez", "La dernière valeur liquidative publiée", "La prochaine valeur liquidative calculée après votre ordre", "Toujours 10 000 FCFA"] }, correctIndex: 2, explanation: { en: "Forward pricing at the next NAV ensures that no investor benefits from knowing a price before placing an order.", fr: "La tarification à la prochaine valeur liquidative garantit qu'aucun investisseur ne profite de la connaissance d'un prix avant de passer son ordre." } },
    { prompt: { en: "What does a three-year recommended holding period mean?", fr: "Que signifie une durée de détention recommandée de trois ans ?" }, options: { en: ["Money is locked for three years", "The fund guarantees a return after three years", "The value fluctuates and three years gives it time to average out; earlier redemption is possible subject to the fund's terms", "Fees are waived after three years"], fr: ["L'argent est bloqué pendant trois ans", "Le fonds garantit un rendement après trois ans", "La valeur fluctue et trois ans lui donnent le temps de se lisser ; un rachat anticipé reste possible selon les conditions du fonds", "Les frais sont supprimés après trois ans"] }, correctIndex: 2, explanation: { en: "The recommendation is about matching the fund to your horizon. It is neither a lock nor a guarantee.", fr: "La recommandation vise à faire correspondre le fonds à votre horizon. Ce n'est ni un verrou ni une garantie." } },
  ]),
};

// ---------------------------------------------------------------------------
// Lessons — Understanding Net Asset Value
// ---------------------------------------------------------------------------

const NAV_L1: LessonDef = {
  slug: "what-a-unit-is-worth",
  title: { en: "What a unit is worth", fr: "Ce que vaut une part" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "how-does-nav-work",
  keyTakeaways: {
    en: ["NAV per unit = (assets minus liabilities) divided by units in issue.", "The NAV is a snapshot at a point in time, computed on a schedule set by the fund.", "A higher NAV is not 'more expensive'; it reflects what each unit already holds."],
    fr: ["Valeur liquidative par part = (actifs moins passifs) divisé par le nombre de parts en circulation.", "La valeur liquidative est une photographie à un instant donné, calculée selon un calendrier fixé par le fonds.", "Une valeur liquidative plus élevée n'est pas « plus chère » ; elle reflète ce que chaque part détient déjà."],
  },
  body: {
    en: `## One division

Everything about net asset value fits in one line:

**NAV per unit = (total assets − total liabilities) ÷ number of units in issue**

Suppose a fund holds bonds and deposits worth 520 million FCFA, owes 4 million FCFA in accrued fees and expenses, and has 50,000 units outstanding. Net assets are 516 million FCFA. Divided by 50,000, the NAV is 10,320 FCFA per unit. If you hold 10 units, your holding is worth 103,200 FCFA at that valuation.

## Where the numbers come from

**Assets** are valued at the valuation date. Bonds are marked at a market price or, where no active market exists, at a model price derived from current yields. Accrued interest, the coupon earned but not yet paid, is added. Cash is cash.

**Liabilities** include the management fee accrued since the last payment, depositary and audit fees, and any amounts owed for pending redemptions.

**Units in issue** change every time someone subscribes or redeems. New subscriptions create units at the NAV; redemptions cancel them. Because both happen at NAV, existing holders are neither diluted nor enriched by the movement of others.

| Item | Amount (hypothetical) |
| --- | --- |
| Bonds at market value | 460,000,000 FCFA |
| Accrued coupon interest | 12,000,000 FCFA |
| Deposits and cash | 48,000,000 FCFA |
| Total assets | 520,000,000 FCFA |
| Accrued fees and expenses | 4,000,000 FCFA |
| Net assets | 516,000,000 FCFA |
| Units in issue | 50,000 |
| NAV per unit | 10,320 FCFA |

## A snapshot, on a schedule

The NAV is computed at intervals stated in the fund's regulations: daily, weekly or at another frequency. Between two computations, the value you see is the last one published. Your subscription or redemption will be executed at the next one. Always check the frequency in the information document; it tells you how quickly you can act and how fresh the price you see really is.

:::
A NAV of 12,000 FCFA is not "more expensive" than a NAV of 10,000 FCFA in another fund. Each unit simply represents a different slice of a different portfolio. What matters is how the NAV moves over time relative to what you paid, not its absolute level.
:::

## Why this matters to you

Your entire relationship with a fund runs through this number. It sets what you pay on the way in, what you receive on the way out, and how your holding is reported in between. The next lesson follows a day in the life of a NAV to show what makes it move.`,
    fr: `## Une seule division

Tout ce qui concerne la valeur liquidative tient en une ligne :

**Valeur liquidative par part = (total des actifs − total des passifs) ÷ nombre de parts en circulation**

Supposons qu'un fonds détienne des obligations et des dépôts d'une valeur de 520 millions de FCFA, doive 4 millions de FCFA de frais et charges courus, et compte 50 000 parts en circulation. L'actif net est de 516 millions de FCFA. Divisé par 50 000, la valeur liquidative est de 10 320 FCFA par part. Si vous détenez 10 parts, votre avoir vaut 103 200 FCFA à cette valorisation.

## D'où viennent les chiffres

Les **actifs** sont valorisés à la date de valorisation. Les obligations sont évaluées au prix de marché ou, en l'absence de marché actif, à un prix de modèle dérivé des taux en vigueur. Les intérêts courus, le coupon gagné mais pas encore payé, s'ajoutent. La trésorerie est la trésorerie.

Les **passifs** comprennent les frais de gestion courus depuis le dernier paiement, les frais de dépositaire et d'audit, et les montants dus au titre des rachats en attente.

Le **nombre de parts** change à chaque souscription ou rachat. Les nouvelles souscriptions créent des parts à la valeur liquidative ; les rachats les annulent. Comme les deux se font à la valeur liquidative, les porteurs existants ne sont ni dilués ni enrichis par les mouvements des autres.

| Poste | Montant (hypothétique) |
| --- | --- |
| Obligations à la valeur de marché | 460 000 000 FCFA |
| Intérêts courus sur coupons | 12 000 000 FCFA |
| Dépôts et trésorerie | 48 000 000 FCFA |
| Total des actifs | 520 000 000 FCFA |
| Frais et charges courus | 4 000 000 FCFA |
| Actif net | 516 000 000 FCFA |
| Parts en circulation | 50 000 |
| Valeur liquidative par part | 10 320 FCFA |

## Une photographie, selon un calendrier

La valeur liquidative est calculée à des intervalles fixés par le règlement du fonds : quotidiennement, chaque semaine ou à une autre fréquence. Entre deux calculs, la valeur que vous voyez est la dernière publiée. Votre souscription ou votre rachat sera exécuté à la prochaine. Vérifiez toujours la fréquence dans la notice d'information ; elle vous dit à quelle vitesse vous pouvez agir et à quel point le prix affiché est récent.

:::
Une valeur liquidative de 12 000 FCFA n'est pas « plus chère » qu'une valeur liquidative de 10 000 FCFA dans un autre fonds. Chaque part représente simplement une fraction différente d'un portefeuille différent. Ce qui compte, c'est l'évolution de la valeur liquidative dans le temps par rapport à ce que vous avez payé, pas son niveau absolu.
:::

## Pourquoi cela vous concerne

Toute votre relation avec un fonds passe par ce chiffre. Il fixe ce que vous payez à l'entrée, ce que vous recevez à la sortie et la façon dont votre avoir est présenté entre les deux. La leçon suivante suit une journée dans la vie d'une valeur liquidative pour montrer ce qui la fait bouger.`,
  },
};

const NAV_L2: LessonDef = {
  slug: "what-makes-nav-move",
  title: { en: "What makes the NAV move", fr: "Ce qui fait bouger la valeur liquidative" },
  kind: "reading",
  durationMinutes: 7,
  labSlug: "bonds",
  keyTakeaways: {
    en: ["Accrued interest pushes a bond fund's NAV up a little every day.", "Changes in market interest rates move bond prices, and therefore the NAV, in the opposite direction.", "Fees are deducted inside the NAV; an issuer's difficulties are reflected through a markdown."],
    fr: ["Les intérêts courus font monter un peu chaque jour la valeur liquidative d'un fonds obligataire.", "Les variations des taux d'intérêt de marché font bouger le prix des obligations, et donc la valeur liquidative, dans le sens inverse.", "Les frais sont déduits à l'intérieur de la valeur liquidative ; les difficultés d'un émetteur se traduisent par une dépréciation."],
  },
  body: {
    en: `## Four forces

Watch a bond fund's NAV over a year and you will see a line that drifts upward most days, occasionally steps down, and sometimes jumps. Four forces produce that shape.

**1. Accrued interest.** A bond paying a 6% annual coupon, used here as a hypothetical figure, earns roughly one three-hundred-and-sixty-fifth of that every day. The fund books it as it accrues. This is the gentle daily upward drift, and it is why a bond fund's NAV rarely stands still.

**2. Interest rate movements.** This is the big one. Bond prices move opposite to market rates. If new bonds start paying 7% and the fund holds bonds paying 6%, nobody will pay full price for the fund's bonds any more; they are marked down. The NAV falls, even though every coupon is still being paid. If rates fall instead, the fund's older, higher-paying bonds become more valuable and the NAV rises. The longer the bonds' remaining life, the bigger the move. The Bond and Interest Rate Explorer lab lets you feel this with a slider.

**3. Fees.** The management fee, depositary fee and audit fee accrue every day and are deducted in the NAV calculation. They are small per day but they are always there, which is why fee levels matter over years.

**4. Credit events.** If an issuer the fund holds runs into difficulty, the manager must mark that bond down to a prudent value. A holding representing 4% of the fund marked down by half removes 2% from the NAV in one step.

## A worked year

| Event (hypothetical) | Effect on NAV |
| --- | --- |
| Coupons accrue through the year | + about 5.5% gradually |
| Market rates rise 1 point in June | − about 3% in one step |
| Fees deducted through the year | − about 1% gradually |
| Rates ease back in November | + about 1.5% |
| Year-end result | roughly + 3% |

The figures are illustrative. The lesson is that a fund can collect every coupon it is owed and still show a flat or negative year if rates rise sharply, and the reverse.

:::
A falling NAV in a bond fund is usually a valuation effect, not a default. If you hold the units until the bonds mature, the markdown unwinds as each bond repays at face value. This is why the recommended holding period exists: it gives valuation effects time to reverse. It does not, however, protect against a genuine default.
:::

## Reading your statement

When your statement shows a NAV lower than last quarter, ask which force did it. Rates up? Expect recovery over time if you can wait. Credit event? Read the manager's report. Fees? They are known in advance. Understanding the cause turns a worrying number into information you can act on, or calmly ignore.`,
    fr: `## Quatre forces

Observez la valeur liquidative d'un fonds obligataire sur une année et vous verrez une ligne qui dérive vers le haut la plupart des jours, recule parfois d'un cran, et saute de temps en temps. Quatre forces produisent cette forme.

**1. Les intérêts courus.** Une obligation versant un coupon annuel de 6 %, chiffre pris ici à titre hypothétique, gagne chaque jour environ un trois cent soixante-cinquième de ce montant. Le fonds le comptabilise au fur et à mesure. C'est la douce dérive quotidienne vers le haut, et c'est pourquoi la valeur liquidative d'un fonds obligataire reste rarement immobile.

**2. Les mouvements de taux d'intérêt.** C'est la force principale. Le prix des obligations évolue à l'inverse des taux de marché. Si les nouvelles obligations se mettent à payer 7 % et que le fonds détient des obligations à 6 %, plus personne ne paiera le prix plein pour celles du fonds ; elles sont dépréciées. La valeur liquidative baisse, alors même que chaque coupon continue d'être payé. Si les taux baissent au contraire, les obligations plus anciennes et mieux rémunérées du fonds prennent de la valeur et la valeur liquidative monte. Plus la durée de vie restante des obligations est longue, plus le mouvement est ample. Le laboratoire Obligations et taux d'intérêt vous le fait ressentir avec un curseur.

**3. Les frais.** Les frais de gestion, de dépositaire et d'audit courent chaque jour et sont déduits dans le calcul de la valeur liquidative. Ils sont faibles par jour mais toujours présents, ce qui explique pourquoi le niveau des frais compte sur plusieurs années.

**4. Les événements de crédit.** Si un émetteur détenu par le fonds rencontre des difficultés, le gérant doit déprécier cette obligation à une valeur prudente. Une ligne représentant 4 % du fonds dépréciée de moitié retire 2 % à la valeur liquidative d'un coup.

## Une année chiffrée

| Événement (hypothétique) | Effet sur la valeur liquidative |
| --- | --- |
| Les coupons courent toute l'année | + environ 5,5 % progressivement |
| Les taux de marché montent d'un point en juin | − environ 3 % d'un coup |
| Les frais sont déduits toute l'année | − environ 1 % progressivement |
| Les taux se détendent en novembre | + environ 1,5 % |
| Résultat en fin d'année | environ + 3 % |

Les chiffres sont illustratifs. La leçon est qu'un fonds peut encaisser chaque coupon qui lui est dû et afficher quand même une année plate ou négative si les taux montent fortement, et inversement.

:::
Une baisse de valeur liquidative dans un fonds obligataire est généralement un effet de valorisation, pas un défaut. Si vous conservez vos parts jusqu'à l'échéance des obligations, la dépréciation se résorbe à mesure que chaque obligation rembourse sa valeur nominale. C'est la raison d'être de la durée de détention recommandée : elle donne aux effets de valorisation le temps de s'inverser. Elle ne protège toutefois pas contre un véritable défaut.
:::

## Lire votre relevé

Quand votre relevé affiche une valeur liquidative inférieure à celle du trimestre précédent, demandez-vous quelle force en est responsable. Taux en hausse ? Attendez-vous à une récupération avec le temps si vous pouvez patienter. Événement de crédit ? Lisez le rapport du gérant. Frais ? Ils sont connus d'avance. Comprendre la cause transforme un chiffre inquiétant en une information sur laquelle agir, ou que l'on peut ignorer sereinement.`,
  },
  quiz: kc({ en: "Knowledge check: NAV mechanics", fr: "Vérification : mécanique de la valeur liquidative" }, [
    { prompt: { en: "A fund has net assets of 516 million FCFA and 50,000 units. What is the NAV per unit?", fr: "Un fonds a un actif net de 516 millions de FCFA et 50 000 parts. Quelle est la valeur liquidative par part ?" }, options: { en: ["10,000 FCFA", "10,320 FCFA", "51,600 FCFA", "5,160 FCFA"], fr: ["10 000 FCFA", "10 320 FCFA", "51 600 FCFA", "5 160 FCFA"] }, correctIndex: 1, explanation: { en: "516,000,000 ÷ 50,000 = 10,320. Net assets, not gross assets, are divided by the units in issue.", fr: "516 000 000 ÷ 50 000 = 10 320. C'est l'actif net, et non l'actif brut, qui est divisé par les parts en circulation." } },
    { prompt: { en: "Market interest rates rise sharply. What happens to the NAV of a bond fund, all else equal?", fr: "Les taux d'intérêt de marché montent fortement. Qu'arrive-t-il à la valeur liquidative d'un fonds obligataire, toutes choses égales par ailleurs ?" }, options: { en: ["It rises, because coupons are higher", "It falls, because existing bonds are marked down", "It stays the same", "It depends on the depositary"], fr: ["Elle monte, car les coupons sont plus élevés", "Elle baisse, car les obligations existantes sont dépréciées", "Elle reste identique", "Cela dépend du dépositaire"] }, correctIndex: 1, explanation: { en: "Bond prices move inversely to rates. The fund's older bonds pay less than new issues, so they are valued lower, pulling the NAV down.", fr: "Le prix des obligations évolue à l'inverse des taux. Les obligations plus anciennes du fonds paient moins que les nouvelles émissions ; elles sont donc valorisées plus bas, ce qui tire la valeur liquidative vers le bas." } },
    { prompt: { en: "Is a NAV of 12,000 FCFA 'more expensive' than a NAV of 10,000 FCFA in a different fund?", fr: "Une valeur liquidative de 12 000 FCFA est-elle « plus chère » qu'une valeur liquidative de 10 000 FCFA dans un autre fonds ?" }, options: { en: ["Yes, always", "No; each unit represents a different slice of a different portfolio", "Yes, if the funds hold bonds", "Only if fees are the same"], fr: ["Oui, toujours", "Non ; chaque part représente une fraction différente d'un portefeuille différent", "Oui, si les fonds détiennent des obligations", "Seulement si les frais sont identiques"] }, correctIndex: 1, explanation: { en: "The absolute NAV level says nothing about value for money. What matters is how the NAV moves relative to what you paid.", fr: "Le niveau absolu de la valeur liquidative ne dit rien du rapport qualité-prix. Ce qui compte, c'est son évolution par rapport à ce que vous avez payé." } },
  ]),
};

const NAV_L3: LessonDef = {
  slug: "nav-and-your-money",
  title: { en: "NAV and your money: entry, exit and statements", fr: "Valeur liquidative et votre argent : entrée, sortie et relevés" },
  kind: "reading",
  durationMinutes: 6,
  keyTakeaways: {
    en: ["Your gain or loss is the difference between the NAV at redemption and at subscription, adjusted for fees and any distributions.", "Forward pricing means you never know the exact NAV at which your order will execute.", "Compare NAV over time, not between funds."],
    fr: ["Votre gain ou votre perte est la différence entre la valeur liquidative au rachat et à la souscription, ajustée des frais et des éventuelles distributions.", "La tarification à la prochaine valeur liquidative signifie que vous ne connaissez jamais exactement la valeur à laquelle votre ordre sera exécuté.", "Comparez la valeur liquidative dans le temps, pas entre fonds."],
  },
  body: {
    en: `## From order to units

You send 200,000 FCFA to subscribe. The fund's next NAV is computed at 10,320 FCFA. An entry fee of 1%, hypothetically, takes 2,000 FCFA, leaving 198,000 FCFA to convert: 19.186 units. Your confirmation shows the NAV applied, the fee, the number of units and the date.

Two years later you redeem all your units. The next NAV is 11,150 FCFA. Gross proceeds are 19.186 × 11,150 = 213,924 FCFA. A hypothetical 0.5% exit fee takes 1,070 FCFA. You receive 212,854 FCFA. Your gain over two years is 12,854 FCFA, or about 6.4% on the 200,000 FCFA you sent, before any tax.

That arithmetic is the whole investment. Everything in between was the NAV moving.

## What you never control

Because orders execute at the **next** NAV, you cannot time a purchase to a price you have seen. By the time you act, that price is history. This feels uncomfortable to newcomers. It is a protection: it stops anyone with early knowledge of the valuation from trading against other unitholders.

## Distributions and the NAV

If your fund distributes income, part of your return arrives as cash rather than as a higher NAV. A distribution fund whose NAV went from 10,000 to 10,050 FCFA while paying 450 FCFA per unit has delivered about the same total as a capitalisation fund whose NAV went from 10,000 to 10,500 FCFA. Always add distributions back when judging a distribution fund, or you will undercount its result.

:::
Keep every confirmation. Subscription date and NAV, redemption date and NAV, distributions received and fees paid are the inputs to your real return and to any tax declaration. A simple spreadsheet with those columns outperforms memory every time.
:::

## Reading performance claims

Someone shows you a fund whose NAV rose from 10,000 to 10,600 FCFA over a year and calls it "6% performance". Three checks:

- Over what period exactly, and is it annualised?
- Before or after fees? NAV is already net of fund fees, but not of entry and exit fees.
- Were there distributions?

And one reminder: a past NAV movement describes what happened. It says nothing about what will happen. Funds state a **target** or an **objective** in their documents; a target is an aim the manager works toward, not a promise, not a historical result and not a forecast approved by the regulator.`,
    fr: `## De l'ordre aux parts

Vous envoyez 200 000 FCFA pour souscrire. La prochaine valeur liquidative du fonds est calculée à 10 320 FCFA. Des droits d'entrée hypothétiques de 1 % prélèvent 2 000 FCFA, laissant 198 000 FCFA à convertir : 19,186 parts. Votre confirmation indique la valeur liquidative appliquée, les frais, le nombre de parts et la date.

Deux ans plus tard, vous rachetez toutes vos parts. La prochaine valeur liquidative est de 11 150 FCFA. Le produit brut est de 19,186 × 11 150 = 213 924 FCFA. Des droits de sortie hypothétiques de 0,5 % prélèvent 1 070 FCFA. Vous recevez 212 854 FCFA. Votre gain sur deux ans est de 12 854 FCFA, soit environ 6,4 % des 200 000 FCFA envoyés, avant toute fiscalité.

Cette arithmétique, c'est tout l'investissement. Tout ce qui s'est passé entre les deux, c'est la valeur liquidative qui bougeait.

## Ce que vous ne contrôlez jamais

Parce que les ordres s'exécutent à la **prochaine** valeur liquidative, vous ne pouvez pas caler un achat sur un prix que vous avez vu. Au moment où vous agissez, ce prix appartient au passé. Cela met mal à l'aise les nouveaux venus. C'est une protection : cela empêche quiconque disposant d'une connaissance anticipée de la valorisation de négocier au détriment des autres porteurs.

## Distributions et valeur liquidative

Si votre fonds distribue des revenus, une partie de votre rendement arrive en espèces plutôt que sous forme de valeur liquidative plus élevée. Un fonds de distribution dont la valeur liquidative est passée de 10 000 à 10 050 FCFA tout en versant 450 FCFA par part a délivré à peu près le même total qu'un fonds de capitalisation dont la valeur liquidative est passée de 10 000 à 10 500 FCFA. Réintégrez toujours les distributions pour juger un fonds de distribution, sinon vous sous-estimerez son résultat.

:::
Conservez chaque confirmation. Date et valeur liquidative de souscription, date et valeur liquidative de rachat, distributions reçues et frais payés sont les données de votre rendement réel et de toute déclaration fiscale. Un simple tableur avec ces colonnes bat la mémoire à chaque fois.
:::

## Lire les affirmations de performance

Quelqu'un vous montre un fonds dont la valeur liquidative est passée de 10 000 à 10 600 FCFA en un an et parle de « 6 % de performance ». Trois vérifications :

- Sur quelle période exactement, et est-ce annualisé ?
- Avant ou après frais ? La valeur liquidative est déjà nette des frais du fonds, mais pas des droits d'entrée et de sortie.
- Y a-t-il eu des distributions ?

Et un rappel : un mouvement passé de valeur liquidative décrit ce qui s'est produit. Il ne dit rien de ce qui se produira. Les fonds énoncent un **objectif** ou une **cible** dans leurs documents ; une cible est un but vers lequel le gérant travaille, pas une promesse, pas un résultat historique et pas une prévision approuvée par le régulateur.`,
  },
};

const NAV_L4: LessonDef = {
  slug: "nav-frequency-and-transparency",
  title: { en: "Frequency, publication and what to check", fr: "Fréquence, publication et points à vérifier" },
  kind: "reading",
  durationMinutes: 5,
  keyTakeaways: {
    en: ["The fund's documents state how often the NAV is computed and where it is published.", "Less frequent valuation means slower entry and exit, not lower risk.", "Cross-check the NAV frequency in the regulations against what you are told verbally."],
    fr: ["Les documents du fonds indiquent la fréquence de calcul de la valeur liquidative et son lieu de publication.", "Une valorisation moins fréquente signifie une entrée et une sortie plus lentes, pas un risque plus faible.", "Recoupez la fréquence de valorisation du règlement avec ce qu'on vous dit oralement."],
  },
  body: {
    en: `## How often is the number refreshed?

Every fund fixes a valuation calendar in its management regulations. Some compute the NAV every business day; others weekly, fortnightly or monthly. There is no universally right answer. A fund holding instruments that do not trade every day may sensibly value less often, because a daily price would be an estimate dressed up as a fact.

What the frequency changes for you:

- **Speed of entry and exit.** With weekly valuation, an order placed on Tuesday waits for the next valuation day before it is executed, and settlement runs from there.
- **Freshness of the price you see.** Between valuations, the published NAV is history. A market move on Wednesday will not appear until the next valuation.
- **Nothing about risk.** A fund valued monthly is not calmer than one valued daily. Its assets move just the same; you simply see the movement in larger, less frequent steps.

## Where to look

The regulations and the information document should state three things together: the valuation frequency, the publication channel (the manager's website, the depositary, a regulator bulletin) and the cut-off time for orders. If the three documents you hold disagree with each other, or with what a salesperson tells you, stop and ask for clarification in writing. Document inconsistencies are not unusual when a fund is new, and a careful manager will resolve them before you subscribe.

:::
Questions worth asking any manager: How often is the NAV computed? Where is it published and how soon after the valuation date? Who checks the computation? What is the order cut-off? What happens if a valuation date falls on a public holiday? Clear answers to all five are a sign of a well-run fund.
:::

## A short checklist

| Check | Why it matters |
| --- | --- |
| Valuation frequency in the regulations | Governs how fast you can act |
| Publication channel and delay | Governs how current your information is |
| Independent check of the NAV by the depositary | Protects against calculation error |
| Order cut-off time | Determines which NAV applies to you |
| Consistency across all documents | Flags issues to resolve before subscribing |

You now hold the whole NAV story: what it is, what moves it, how it reaches your money and how to verify it. Put it to work in the How a Mutual Fund Works lab, where every step of the cycle is shown with the NAV recomputed in front of you.`,
    fr: `## À quelle fréquence le chiffre est-il actualisé ?

Chaque fonds fixe un calendrier de valorisation dans son règlement de gestion. Certains calculent la valeur liquidative chaque jour ouvré ; d'autres chaque semaine, tous les quinze jours ou chaque mois. Il n'y a pas de réponse universellement juste. Un fonds détenant des instruments qui ne se négocient pas tous les jours peut raisonnablement valoriser moins souvent, car un prix quotidien serait une estimation déguisée en fait.

Ce que la fréquence change pour vous :

- **La vitesse d'entrée et de sortie.** Avec une valorisation hebdomadaire, un ordre passé le mardi attend le prochain jour de valorisation avant d'être exécuté, et le règlement court à partir de là.
- **La fraîcheur du prix que vous voyez.** Entre deux valorisations, la valeur liquidative publiée est du passé. Un mouvement de marché le mercredi n'apparaîtra qu'à la valorisation suivante.
- **Rien sur le risque.** Un fonds valorisé mensuellement n'est pas plus calme qu'un fonds valorisé quotidiennement. Ses actifs bougent tout autant ; vous voyez simplement le mouvement par paliers plus grands et moins fréquents.

## Où regarder

Le règlement et la notice d'information doivent indiquer trois choses ensemble : la fréquence de valorisation, le canal de publication (site de la société de gestion, dépositaire, bulletin du régulateur) et l'heure limite de réception des ordres. Si les documents que vous détenez se contredisent, ou contredisent ce qu'un commercial vous dit, arrêtez-vous et demandez une clarification écrite. Les incohérences documentaires ne sont pas rares quand un fonds est récent, et un gérant soigneux les résout avant votre souscription.

:::
Questions à poser à toute société de gestion : À quelle fréquence la valeur liquidative est-elle calculée ? Où est-elle publiée et combien de temps après la date de valorisation ? Qui contrôle le calcul ? Quelle est l'heure limite des ordres ? Que se passe-t-il si une date de valorisation tombe un jour férié ? Des réponses claires aux cinq questions sont le signe d'un fonds bien géré.
:::

## Une courte liste de contrôle

| Vérification | Pourquoi c'est important |
| --- | --- |
| Fréquence de valorisation dans le règlement | Détermine la vitesse à laquelle vous pouvez agir |
| Canal et délai de publication | Détermine l'actualité de votre information |
| Contrôle indépendant de la valeur liquidative par le dépositaire | Protège contre les erreurs de calcul |
| Heure limite des ordres | Détermine quelle valeur liquidative s'applique à vous |
| Cohérence entre tous les documents | Signale les points à résoudre avant de souscrire |

Vous tenez maintenant toute l'histoire de la valeur liquidative : ce qu'elle est, ce qui la fait bouger, comment elle atteint votre argent et comment la vérifier. Mettez-la en pratique dans le laboratoire Comment fonctionne un FCP, où chaque étape du cycle est montrée avec la valeur liquidative recalculée sous vos yeux.`,
  },
  quiz: kc({ en: "Knowledge check: NAV in practice", fr: "Vérification : la valeur liquidative en pratique" }, [
    { prompt: { en: "A distribution fund's NAV moved from 10,000 to 10,050 FCFA and it paid 450 FCFA per unit. What was the approximate total return per unit?", fr: "La valeur liquidative d'un fonds de distribution est passée de 10 000 à 10 050 FCFA et il a versé 450 FCFA par part. Quel est le rendement total approximatif par part ?" }, options: { en: ["50 FCFA", "450 FCFA", "500 FCFA", "It cannot be known"], fr: ["50 FCFA", "450 FCFA", "500 FCFA", "On ne peut pas le savoir"] }, correctIndex: 2, explanation: { en: "Add the distribution back to the NAV change: 50 + 450 = 500 FCFA. Ignoring distributions undercounts a distribution fund's result.", fr: "Réintégrez la distribution dans la variation de valeur liquidative : 50 + 450 = 500 FCFA. Ignorer les distributions sous-estime le résultat d'un fonds de distribution." } },
    { prompt: { en: "Does a monthly valuation make a fund less risky than a daily one?", fr: "Une valorisation mensuelle rend-elle un fonds moins risqué qu'une valorisation quotidienne ?" }, options: { en: ["Yes, fewer price changes mean less risk", "No; the assets move the same, you just see it in larger steps", "Yes, because the regulator requires it", "Only for distribution funds"], fr: ["Oui, moins de variations de prix signifie moins de risque", "Non ; les actifs bougent autant, vous le voyez simplement par paliers plus grands", "Oui, parce que le régulateur l'exige", "Seulement pour les fonds de distribution"] }, correctIndex: 1, explanation: { en: "Valuation frequency affects how fast you can act and how fresh the published price is. It does not change what the portfolio does.", fr: "La fréquence de valorisation influe sur la vitesse à laquelle vous pouvez agir et sur la fraîcheur du prix publié. Elle ne change pas ce que fait le portefeuille." } },
    { prompt: { en: "A fund's documents describe a 'target yield'. What is it?", fr: "Les documents d'un fonds mentionnent un « rendement cible ». De quoi s'agit-il ?" }, options: { en: ["A guaranteed return", "A historical performance figure", "An objective the manager works toward, with no guarantee", "A forecast approved by COSUMAF"], fr: ["Un rendement garanti", "Une performance passée", "Un objectif vers lequel le gérant travaille, sans garantie", "Une prévision approuvée par la COSUMAF"] }, correctIndex: 2, explanation: { en: "A target is an aim, not a promise. Actual results depend on rates, credit events and fees, and may be lower or negative.", fr: "Une cible est un but, pas une promesse. Les résultats réels dépendent des taux, des événements de crédit et des frais, et peuvent être inférieurs ou négatifs." } },
  ]),
};

// ---------------------------------------------------------------------------
// Lessons — Introduction to the CEMAC Financial System
// ---------------------------------------------------------------------------

const CEMAC_L1: LessonDef = {
  slug: "the-map-of-the-system",
  title: { en: "The map: six countries, one currency, one market", fr: "La carte : six pays, une monnaie, un marché" },
  kind: "reading",
  durationMinutes: 7,
  keyTakeaways: {
    en: ["CEMAC groups six Central African states sharing the FCFA and a central bank, the BEAC.", "Banks are supervised by COBAC; the financial market is regulated by COSUMAF.", "The BVMAC is the single regional stock exchange, based in Douala."],
    fr: ["La CEMAC regroupe six États d'Afrique centrale partageant le FCFA et une banque centrale, la BEAC.", "Les banques sont supervisées par la COBAC ; le marché financier est régulé par la COSUMAF.", "La BVMAC est l'unique bourse régionale, basée à Douala."],
  },
  body: {
    en: `## Who is in the room

The Economic and Monetary Community of Central Africa, CEMAC, brings together Cameroon, the Central African Republic, Chad, the Republic of Congo, Equatorial Guinea and Gabon. The six share one currency, the Central African CFA franc, and one central bank. For an investor, that means a bond issued in Libreville and a fund managed in Douala are priced in the same money and governed by the same regional rules.

## The institutions, one by one

**BEAC**, the Bank of Central African States, is the central bank. It issues the FCFA, manages the peg to the euro, sets policy interest rates and runs the market where CEMAC governments issue Treasury bills and bonds. When you hear that "rates have moved", it is usually a BEAC decision or a shift on the BEAC-run public securities market.

**COBAC**, the Central African Banking Commission, supervises banks and microfinance institutions. If you hold a savings account, COBAC is the body watching the bank that holds it.

**COSUMAF**, the Central African Financial Market Supervisory Commission, regulates the financial market: the exchange, the brokers, the management companies and the collective investment funds. It licenses managers, approves funds and their documents, and polices public offerings. Every regulated fund carries COSUMAF references, which is how you verify it.

**BVMAC**, the Central African Stock Exchange in Douala, is the single regional exchange, the product of a 2019 merger of the former Douala and Libreville exchanges. Shares and listed bonds trade there.

| Institution | Role | What it means for you |
| --- | --- | --- |
| BEAC | Central bank, public securities market | Sets the rate environment; issues the Treasury bills and bonds funds buy |
| COBAC | Bank supervisor | Oversees the bank holding your deposits |
| COSUMAF | Market regulator | Licenses the manager and approves the fund you may buy |
| BVMAC | Regional exchange | Where listed shares and bonds change hands |

## Two markets, not one

Investors often picture "the market" as the stock exchange. In CEMAC, most investable volume is elsewhere: in the public securities market run by the BEAC, where states borrow by issuing Treasury bills (BTA, short term) and Treasury bonds (OTA, longer term). Banks and funds are the main buyers. A bond-oriented FCP lives largely in this market. The BVMAC, by contrast, is small in listings and in turnover, though it is where corporate bonds and equities are listed.

:::
Why a monetary union matters for your savings: the FCFA's fixed parity with the euro, guaranteed by arrangements with the French Treasury, has kept the exchange rate stable for decades. That stability does not stop domestic inflation, and it does not make any investment safe; it simply removes one source of volatility that investors in many other African currencies must carry.
:::

## Where this course goes next

With the map in hand, the following lessons look at the regulator's role in detail, at how states borrow through the BEAC market, and at what a licensed management company is allowed and required to do. Each piece makes the next one easier to read.`,
    fr: `## Qui est dans la pièce

La Communauté économique et monétaire de l'Afrique centrale, la CEMAC, réunit le Cameroun, la Centrafrique, le Tchad, la République du Congo, la Guinée équatoriale et le Gabon. Les six partagent une monnaie, le franc CFA d'Afrique centrale, et une banque centrale. Pour un investisseur, cela signifie qu'une obligation émise à Libreville et un fonds géré à Douala sont libellés dans la même monnaie et régis par les mêmes règles régionales.

## Les institutions, une par une

La **BEAC**, Banque des États de l'Afrique centrale, est la banque centrale. Elle émet le FCFA, gère l'arrimage à l'euro, fixe les taux directeurs et organise le marché sur lequel les États de la CEMAC émettent bons et obligations du Trésor. Quand vous entendez que « les taux ont bougé », il s'agit généralement d'une décision de la BEAC ou d'un mouvement sur le marché des titres publics qu'elle organise.

La **COBAC**, Commission bancaire de l'Afrique centrale, supervise les banques et les établissements de microfinance. Si vous détenez un compte d'épargne, la COBAC est l'organe qui surveille la banque qui le tient.

La **COSUMAF**, Commission de surveillance du marché financier de l'Afrique centrale, régule le marché financier : la bourse, les intermédiaires, les sociétés de gestion et les organismes de placement collectif. Elle agrée les gérants, approuve les fonds et leurs documents, et contrôle les offres au public. Tout fonds réglementé porte des références COSUMAF, c'est ainsi qu'on le vérifie.

La **BVMAC**, Bourse des valeurs mobilières de l'Afrique centrale, à Douala, est l'unique bourse régionale, issue de la fusion en 2019 des anciennes bourses de Douala et de Libreville. Les actions et les obligations cotées s'y négocient.

| Institution | Rôle | Ce que cela signifie pour vous |
| --- | --- | --- |
| BEAC | Banque centrale, marché des titres publics | Fixe l'environnement de taux ; émet les bons et obligations du Trésor que les fonds achètent |
| COBAC | Superviseur bancaire | Surveille la banque qui détient vos dépôts |
| COSUMAF | Régulateur du marché | Agrée le gérant et approuve le fonds que vous pourriez acheter |
| BVMAC | Bourse régionale | Lieu d'échange des actions et obligations cotées |

## Deux marchés, pas un seul

Les investisseurs imaginent souvent « le marché » comme la bourse. Dans la CEMAC, l'essentiel du volume investissable est ailleurs : sur le marché des titres publics organisé par la BEAC, où les États empruntent en émettant des bons du Trésor assimilables (BTA, court terme) et des obligations du Trésor assimilables (OTA, plus long terme). Les banques et les fonds en sont les principaux acheteurs. Un FCP orienté obligations vit largement sur ce marché. La BVMAC, en revanche, reste modeste en nombre de cotations et en volumes, même si c'est là que les obligations d'entreprise et les actions sont cotées.

:::
Pourquoi une union monétaire compte pour votre épargne : la parité fixe du FCFA avec l'euro, garantie par des accords avec le Trésor français, a maintenu le taux de change stable pendant des décennies. Cette stabilité n'empêche pas l'inflation intérieure et ne rend aucun investissement sûr ; elle supprime simplement une source de volatilité que les investisseurs de nombreuses autres monnaies africaines doivent supporter.
:::

## La suite du cours

Avec la carte en main, les leçons suivantes examinent en détail le rôle du régulateur, la façon dont les États empruntent sur le marché de la BEAC, et ce qu'une société de gestion agréée a le droit et l'obligation de faire. Chaque pièce rend la suivante plus facile à lire.`,
  },
};

const CEMAC_L2: LessonDef = {
  slug: "the-regulator-and-you",
  title: { en: "The regulator and you: what COSUMAF approval means", fr: "Le régulateur et vous : ce que signifie l'approbation de la COSUMAF" },
  kind: "reading",
  durationMinutes: 6,
  keyTakeaways: {
    en: ["COSUMAF licenses management companies and approves funds and their public-offering documents.", "A visa on a public offering means the documents met regulatory requirements; it is not a recommendation or a performance guarantee.", "Verify references yourself; do not rely on a salesperson's word."],
    fr: ["La COSUMAF agrée les sociétés de gestion et approuve les fonds et leurs documents d'offre au public.", "Un visa sur une offre au public signifie que les documents ont satisfait aux exigences réglementaires ; ce n'est ni une recommandation ni une garantie de performance.", "Vérifiez vous-même les références ; ne vous fiez pas à la parole d'un commercial."],
  },
  body: {
    en: `## Three things the regulator does

**It licenses the people.** A company that wants to manage other people's money in the CEMAC market must obtain a management company licence (*agrément de société de gestion de portefeuille*) from COSUMAF. The process examines shareholders, capital, managers' competence and internal controls. The licence carries a reference, such as COSUMAF-SGP-03/2023 in the case of Stoneshed Asset Management.

**It approves the products.** Before a fund can be offered to the public, COSUMAF reviews its management regulations and information document and, if satisfied, issues an approval and a visa number. The visa confirms that the required information is present and consistent with the rules. Each fund then carries its own references: a fund reference and a visa reference.

**It supervises.** Licensed firms report to COSUMAF, which can inspect, sanction and, in serious cases, withdraw licences. The depositary and auditor requirements described in the mutual fund course flow from this supervisory framework.

## What a visa is not

This is the part most often misunderstood, so read it twice.

- A visa is **not** a recommendation to buy.
- A visa is **not** a judgement that the fund is a good investment.
- A visa is **not** a guarantee of any return or of the capital.
- A visa does **not** mean the regulator has verified the target yield or forecasts in a brochure.

It means the documents were complete and compliant on the day they were approved. The investment risk stays entirely with you.

:::
Educational materials, including this Academy, are not approved or endorsed by COSUMAF unless a specific document says so. If someone describes a course, a video or a presentation as "regulator-approved", ask to see the approval.
:::

## Verifying a fund in five minutes

1. Ask for the information document and management regulations.
2. Find the fund reference and the visa reference on the cover or first pages.
3. Confirm the management company's licence reference.
4. Check these references against COSUMAF's official publications or by contacting the Commission.
5. Confirm the depositary is a licensed bank and the auditor is named.

A legitimate manager will welcome the questions. A reluctant one has told you what you need to know.

## When something is wrong

If you believe a product is being offered without approval, or a licensed firm is behaving improperly, COSUMAF is the body to contact. Keep your documents, note dates and names, and write rather than call. Regulators act on records.`,
    fr: `## Trois choses que fait le régulateur

**Il agrée les personnes.** Une société qui veut gérer l'argent d'autrui sur le marché de la CEMAC doit obtenir un agrément de société de gestion de portefeuille auprès de la COSUMAF. La procédure examine les actionnaires, le capital, la compétence des dirigeants et les contrôles internes. L'agrément porte une référence, comme COSUMAF-SGP-03/2023 dans le cas de Stoneshed Asset Management.

**Il approuve les produits.** Avant qu'un fonds puisse être proposé au public, la COSUMAF examine son règlement de gestion et sa notice d'information et, si elle est satisfaite, délivre une approbation et un numéro de visa. Le visa confirme que les informations requises sont présentes et conformes aux règles. Chaque fonds porte ensuite ses propres références : une référence de fonds et une référence de visa.

**Il supervise.** Les sociétés agréées rendent compte à la COSUMAF, qui peut inspecter, sanctionner et, dans les cas graves, retirer les agréments. Les exigences relatives au dépositaire et au commissaire aux comptes décrites dans le cours sur les FCP découlent de ce cadre de supervision.

## Ce qu'un visa n'est pas

C'est la partie la plus souvent mal comprise, alors lisez-la deux fois.

- Un visa n'est **pas** une recommandation d'achat.
- Un visa n'est **pas** un jugement selon lequel le fonds est un bon investissement.
- Un visa n'est **pas** une garantie de rendement ni de capital.
- Un visa ne signifie **pas** que le régulateur a vérifié le rendement cible ou les projections d'une brochure.

Il signifie que les documents étaient complets et conformes le jour de leur approbation. Le risque d'investissement reste entièrement le vôtre.

:::
Les supports pédagogiques, y compris cette Academy, ne sont ni approuvés ni avalisés par la COSUMAF, sauf si un document précis l'indique. Si quelqu'un présente un cours, une vidéo ou une présentation comme « approuvée par le régulateur », demandez à voir l'approbation.
:::

## Vérifier un fonds en cinq minutes

1. Demandez la notice d'information et le règlement de gestion.
2. Repérez la référence du fonds et la référence du visa en couverture ou dans les premières pages.
3. Confirmez la référence d'agrément de la société de gestion.
4. Vérifiez ces références dans les publications officielles de la COSUMAF ou en contactant la Commission.
5. Confirmez que le dépositaire est une banque agréée et que le commissaire aux comptes est nommé.

Un gérant légitime accueillera ces questions avec bienveillance. Un gérant réticent vous a déjà dit ce que vous deviez savoir.

## Quand quelque chose ne va pas

Si vous pensez qu'un produit est proposé sans approbation, ou qu'une société agréée se comporte de façon irrégulière, la COSUMAF est l'organe à contacter. Conservez vos documents, notez dates et noms, et écrivez plutôt que d'appeler. Les régulateurs agissent sur la base d'écrits.`,
  },
  quiz: kc({ en: "Knowledge check: the CEMAC map and the regulator", fr: "Vérification : la carte de la CEMAC et le régulateur" }, [
    { prompt: { en: "Which institution regulates management companies and approves collective investment funds in CEMAC?", fr: "Quelle institution régule les sociétés de gestion et approuve les organismes de placement collectif dans la CEMAC ?" }, options: { en: ["BEAC", "COBAC", "COSUMAF", "BVMAC"], fr: ["BEAC", "COBAC", "COSUMAF", "BVMAC"] }, correctIndex: 2, explanation: { en: "COSUMAF is the financial market regulator. BEAC is the central bank, COBAC supervises banks and BVMAC is the exchange.", fr: "La COSUMAF est le régulateur du marché financier. La BEAC est la banque centrale, la COBAC supervise les banques et la BVMAC est la bourse." } },
    { prompt: { en: "Where do CEMAC governments mainly issue Treasury bills and bonds?", fr: "Où les États de la CEMAC émettent-ils principalement bons et obligations du Trésor ?" }, options: { en: ["On the BVMAC", "On the public securities market run by the BEAC", "Through COSUMAF", "Through mobile money operators"], fr: ["Sur la BVMAC", "Sur le marché des titres publics organisé par la BEAC", "Via la COSUMAF", "Via les opérateurs de mobile money"] }, correctIndex: 1, explanation: { en: "The BEAC-run public securities market is where states borrow and where bond-oriented funds do much of their investing. The BVMAC lists shares and corporate bonds.", fr: "Le marché des titres publics organisé par la BEAC est le lieu où les États empruntent et où les fonds orientés obligations réalisent une grande part de leurs investissements. La BVMAC cote actions et obligations d'entreprise." } },
    { prompt: { en: "A fund's public offering has received a COSUMAF visa. What does this mean?", fr: "L'offre au public d'un fonds a reçu un visa de la COSUMAF. Qu'est-ce que cela signifie ?" }, options: { en: ["The regulator recommends the fund", "The capital is guaranteed", "The documents were complete and compliant when approved; the investment risk remains yours", "The target yield has been verified"], fr: ["Le régulateur recommande le fonds", "Le capital est garanti", "Les documents étaient complets et conformes lors de l'approbation ; le risque d'investissement reste le vôtre", "Le rendement cible a été vérifié"] }, correctIndex: 2, explanation: { en: "A visa confirms regulatory compliance of the documentation. It is neither an endorsement nor a guarantee of any outcome.", fr: "Un visa confirme la conformité réglementaire de la documentation. Ce n'est ni une recommandation ni une garantie de résultat." } },
  ]),
};

const CEMAC_L3: LessonDef = {
  slug: "how-states-borrow",
  title: { en: "How states borrow: Treasury bills and bonds", fr: "Comment les États empruntent : bons et obligations du Trésor" },
  kind: "reading",
  durationMinutes: 7,
  labSlug: "bonds",
  videoSlug: "bonds-in-60-seconds",
  keyTakeaways: {
    en: ["BTAs are short-term bills sold at a discount; OTAs are longer bonds paying periodic coupons.", "Issues are sold by auction through the BEAC to primary dealers, mainly banks; funds and individuals access them through those dealers.", "Sovereign risk differs by state; a fund's regulations limit how much it may hold in any issuer."],
    fr: ["Les BTA sont des bons à court terme vendus à escompte ; les OTA sont des obligations plus longues versant des coupons périodiques.", "Les émissions sont adjugées via la BEAC auprès de spécialistes en valeurs du Trésor, principalement des banques ; fonds et particuliers y accèdent par ces intermédiaires.", "Le risque souverain diffère selon l'État ; le règlement d'un fonds limite la part détenue sur un même émetteur."],
  },
  body: {
    en: `## Why a state borrows

A government's tax receipts arrive unevenly; its spending does not. To bridge the gap, and to finance roads, hospitals and ports over years rather than from one year's budget, CEMAC states borrow from investors in their own currency. They do this on the public securities market organised by the BEAC.

## Two instruments

**Treasury bills (BTA, *bons du Trésor assimilables*)** are short-term, typically from a few weeks up to two years. They pay no coupon. Instead they are sold at a discount and repaid at face value. Buy a 13-week bill at 9,850 FCFA and receive 10,000 FCFA at maturity; the 150 FCFA difference is your interest.

**Treasury bonds (OTA, *obligations du Trésor assimilables*)** are longer, commonly two to ten years. They pay a fixed coupon, usually annually, and repay the face value at maturity. Face value in this market is typically 10,000 FCFA per unit, which is why the Academy's examples use that figure.

| | Treasury bill (BTA) | Treasury bond (OTA) |
| --- | --- | --- |
| Maturity | Weeks to 2 years | 2 to 10 years or more |
| Income | Discount to face value | Periodic coupon |
| Price sensitivity to rates | Low | Rises with maturity |
| Typical buyers | Banks, money market funds | Banks, bond funds, insurers |

"Assimilable" means that new issues can be attached to an existing line with the same terms, which builds larger, more liquid lines over time.

## How an auction works

The issuing state announces an amount and a maturity. On auction day, primary dealers (*spécialistes en valeurs du Trésor*), mostly banks, submit bids stating the quantity they want and the yield they require. The state accepts bids from the lowest yield upward until the amount is filled. Funds, companies and individuals do not bid directly; they buy through a dealer, either in the auction or afterward on the secondary market.

A bond fund's manager spends much of the week doing exactly this: reading the auction calendar, judging which maturities offer sensible value, and placing orders through dealers within the fund's limits.

:::
Not every CEMAC state carries the same credit risk, and the market prices that difference through the yield each state must pay. A fund's management regulations cap exposure to any single issuer. When you read a fund's information document, look for those caps; they tell you how much one state's difficulty could affect your units.
:::

## Where risk sits

A Treasury security is the state's promise. The main risks are that the state pays late or restructures (credit risk), that rates rise after you buy so the price falls if you sell early (interest rate risk), and that you cannot find a buyer at a fair price when you need one (liquidity risk). Holding to maturity removes the second and third but never the first. Try the Bond and Interest Rate Explorer to see how a 1-point rate change affects a two-year bond compared with a ten-year one.`,
    fr: `## Pourquoi un État emprunte

Les recettes fiscales d'un gouvernement arrivent de façon irrégulière ; ses dépenses, non. Pour combler l'écart, et pour financer routes, hôpitaux et ports sur plusieurs années plutôt que sur le budget d'une seule, les États de la CEMAC empruntent auprès des investisseurs dans leur propre monnaie. Ils le font sur le marché des titres publics organisé par la BEAC.

## Deux instruments

Les **bons du Trésor assimilables (BTA)** sont à court terme, typiquement de quelques semaines à deux ans. Ils ne versent pas de coupon. Ils sont vendus à escompte et remboursés à leur valeur nominale. Achetez un bon à 13 semaines à 9 850 FCFA et recevez 10 000 FCFA à l'échéance ; les 150 FCFA de différence sont vos intérêts.

Les **obligations du Trésor assimilables (OTA)** sont plus longues, généralement de deux à dix ans. Elles versent un coupon fixe, le plus souvent annuel, et remboursent la valeur nominale à l'échéance. La valeur nominale sur ce marché est typiquement de 10 000 FCFA par titre, raison pour laquelle les exemples de l'Academy utilisent ce chiffre.

| | Bon du Trésor (BTA) | Obligation du Trésor (OTA) |
| --- | --- | --- |
| Maturité | De quelques semaines à 2 ans | De 2 à 10 ans ou plus |
| Revenu | Escompte sur la valeur nominale | Coupon périodique |
| Sensibilité du prix aux taux | Faible | Croît avec la maturité |
| Acheteurs typiques | Banques, fonds monétaires | Banques, fonds obligataires, assureurs |

« Assimilable » signifie que de nouvelles émissions peuvent être rattachées à une ligne existante aux mêmes conditions, ce qui construit avec le temps des lignes plus grandes et plus liquides.

## Comment fonctionne une adjudication

L'État émetteur annonce un montant et une maturité. Le jour de l'adjudication, les spécialistes en valeurs du Trésor, surtout des banques, soumettent des offres précisant la quantité souhaitée et le taux exigé. L'État retient les offres du taux le plus bas vers le plus haut jusqu'à couvrir le montant. Fonds, entreprises et particuliers ne soumissionnent pas directement ; ils achètent par l'intermédiaire d'un spécialiste, lors de l'adjudication ou ensuite sur le marché secondaire.

Le gérant d'un fonds obligataire passe une bonne partie de sa semaine à faire exactement cela : lire le calendrier des adjudications, juger quelles maturités offrent une valeur raisonnable, et passer des ordres via les spécialistes dans les limites du fonds.

:::
Tous les États de la CEMAC ne présentent pas le même risque de crédit, et le marché valorise cette différence par le taux que chaque État doit payer. Le règlement de gestion d'un fonds plafonne l'exposition à un même émetteur. Quand vous lisez la notice d'information d'un fonds, cherchez ces plafonds ; ils vous disent dans quelle mesure les difficultés d'un État pourraient affecter vos parts.
:::

## Où se loge le risque

Un titre du Trésor est la promesse d'un État. Les principaux risques sont que l'État paie en retard ou restructure (risque de crédit), que les taux montent après votre achat de sorte que le prix baisse si vous vendez avant l'échéance (risque de taux), et que vous ne trouviez pas d'acheteur à un prix juste quand vous en avez besoin (risque de liquidité). Conserver jusqu'à l'échéance supprime les deuxième et troisième risques, jamais le premier. Essayez le laboratoire Obligations et taux d'intérêt pour voir comment une variation d'un point de taux affecte une obligation à deux ans comparée à une obligation à dix ans.`,
  },
};

const CEMAC_L4: LessonDef = {
  slug: "the-management-company",
  title: { en: "What a licensed management company does all day", fr: "Ce qu'une société de gestion agréée fait toute la journée" },
  kind: "reading",
  durationMinutes: 6,
  videoSlug: "how-does-a-fund-manager-work",
  keyTakeaways: {
    en: ["A management company analyses, selects, executes, monitors and reports, within limits set by each fund's regulations.", "It is paid a management fee from the fund, disclosed in the documents.", "Its licence is the investor's first line of protection; its reporting is the second."],
    fr: ["Une société de gestion analyse, sélectionne, exécute, surveille et rend compte, dans les limites fixées par le règlement de chaque fonds.", "Elle est rémunérée par des frais de gestion prélevés sur le fonds, précisés dans les documents.", "Son agrément est la première ligne de protection de l'investisseur ; son reporting est la seconde."],
  },
  body: {
    en: `## Inside the building

A management company (*société de gestion de portefeuille*) is a firm whose only business is managing money that belongs to other people. In CEMAC, it must be licensed by COSUMAF, hold minimum capital, and keep its own money strictly separate from the funds it manages. Its activities range from running collective funds such as FCPs, to managing individual portfolios under mandate, to advising institutions on investment policy.

## A week in the life of a bond fund

**Monday: analysis.** The team reviews the BEAC auction calendar for the week, re-reads the latest fiscal data for each issuing state, and checks the yields at which existing lines traded. An analyst updates the internal view on each issuer.

**Tuesday: committee.** An investment committee decides what the fund should bid for and at what yield, within the fund's limits: minimum share in government paper, maximum in any single issuer, minimum liquidity buffer.

**Wednesday: execution.** Orders go to primary dealers. Fills come back. The depositary settles the trades and the positions appear in the fund's records.

**Thursday: valuation and control.** The NAV is computed on its scheduled frequency. The depositary verifies the calculation and confirms that the portfolio respects every limit. Any breach must be corrected and reported.

**Friday: reporting.** Investor statements, regulatory filings and the manager's commentary are prepared. Subscriptions and redemptions received during the week are processed at the applicable NAV.

| Activity | Who inside the firm | Who checks |
| --- | --- | --- |
| Issuer analysis | Research analysts | Investment committee |
| Buy and sell decisions | Portfolio manager | Risk and compliance function |
| Trade settlement | Operations | Depositary |
| NAV computation | Fund administration | Depositary, auditor |
| Investor reporting | Client service | Regulator, auditor |

## How it is paid

The manager earns a **management fee**, expressed as an annual percentage of the fund's assets and accrued daily inside the NAV. The rate is disclosed in the information document. Some funds also carry entry or exit fees, part of which may go to distributors. Because the fee is a percentage of assets, the manager's income grows when the fund grows, which aligns its interest with attracting and keeping investors, though not necessarily with taking the risks you would choose. That is why the limits in the regulations matter.

:::
Stoneshed Asset Management, to take the Academy's parent as an example, is licensed under COSUMAF-SGP-03/2023 and manages, among other activities, the two public FCPs described elsewhere on this platform. The point of naming it here is not promotion; it is to show what a licence reference looks like so you can check any manager the same way.
:::

## Questions to ask any manager

Who sits on the investment committee? What are the fund's concentration limits? How is the NAV verified? What did the fund hold at the last reporting date? How are you paid? A manager comfortable with those five questions is doing its job in the open.`,
    fr: `## À l'intérieur de l'entreprise

Une société de gestion de portefeuille est une entreprise dont l'unique métier est de gérer de l'argent qui appartient à d'autres. Dans la CEMAC, elle doit être agréée par la COSUMAF, détenir un capital minimum et séparer strictement ses propres fonds de ceux qu'elle gère. Ses activités vont de la gestion de fonds collectifs tels que les FCP à la gestion de portefeuilles individuels sous mandat, en passant par le conseil aux institutions sur leur politique d'investissement.

## Une semaine dans la vie d'un fonds obligataire

**Lundi : analyse.** L'équipe passe en revue le calendrier des adjudications de la BEAC pour la semaine, relit les dernières données budgétaires de chaque État émetteur et vérifie les taux auxquels les lignes existantes se sont échangées. Un analyste actualise l'opinion interne sur chaque émetteur.

**Mardi : comité.** Un comité d'investissement décide de ce que le fonds doit demander et à quel taux, dans les limites du fonds : part minimale en titres publics, maximum sur un même émetteur, réserve de liquidité minimale.

**Mercredi : exécution.** Les ordres partent vers les spécialistes en valeurs du Trésor. Les exécutions reviennent. Le dépositaire règle les opérations et les positions apparaissent dans les livres du fonds.

**Jeudi : valorisation et contrôle.** La valeur liquidative est calculée à la fréquence prévue. Le dépositaire vérifie le calcul et confirme que le portefeuille respecte chaque limite. Tout dépassement doit être corrigé et signalé.

**Vendredi : reporting.** Relevés des investisseurs, déclarations réglementaires et commentaire du gérant sont préparés. Les souscriptions et rachats reçus dans la semaine sont traités à la valeur liquidative applicable.

| Activité | Qui dans l'entreprise | Qui contrôle |
| --- | --- | --- |
| Analyse des émetteurs | Analystes | Comité d'investissement |
| Décisions d'achat et de vente | Gérant de portefeuille | Fonction risques et conformité |
| Règlement des opérations | Opérations | Dépositaire |
| Calcul de la valeur liquidative | Administration du fonds | Dépositaire, commissaire aux comptes |
| Reporting aux investisseurs | Service client | Régulateur, commissaire aux comptes |

## Comment elle est rémunérée

La société de gestion perçoit des **frais de gestion**, exprimés en pourcentage annuel des actifs du fonds et courus quotidiennement dans la valeur liquidative. Le taux est indiqué dans la notice d'information. Certains fonds prévoient aussi des droits d'entrée ou de sortie, dont une partie peut revenir aux distributeurs. Comme les frais sont un pourcentage des actifs, le revenu du gérant croît quand le fonds grossit, ce qui aligne son intérêt sur l'attraction et la fidélisation des investisseurs, mais pas nécessairement sur la prise des risques que vous choisiriez. C'est pourquoi les limites du règlement comptent.

:::
Stoneshed Asset Management, pour prendre l'exemple de la maison mère de l'Academy, est agréée sous la référence COSUMAF-SGP-03/2023 et gère, parmi d'autres activités, les deux FCP publics décrits ailleurs sur cette plateforme. La nommer ici n'a rien de promotionnel ; il s'agit de montrer à quoi ressemble une référence d'agrément pour que vous puissiez vérifier n'importe quel gérant de la même façon.
:::

## Questions à poser à toute société de gestion

Qui siège au comité d'investissement ? Quelles sont les limites de concentration du fonds ? Comment la valeur liquidative est-elle vérifiée ? Que détenait le fonds à la dernière date de reporting ? Comment êtes-vous rémunérés ? Un gérant à l'aise avec ces cinq questions fait son travail au grand jour.`,
  },
  quiz: kc({ en: "Knowledge check: borrowing states and licensed managers", fr: "Vérification : États emprunteurs et gérants agréés" }, [
    { prompt: { en: "How does a Treasury bill (BTA) pay its investor?", fr: "Comment un bon du Trésor (BTA) rémunère-t-il son investisseur ?" }, options: { en: ["Through annual coupons", "Through a discount to face value, repaid in full at maturity", "Through dividends", "Through a share of tax revenue"], fr: ["Par des coupons annuels", "Par un escompte sur la valeur nominale, remboursée intégralement à l'échéance", "Par des dividendes", "Par une part des recettes fiscales"] }, correctIndex: 1, explanation: { en: "Bills carry no coupon. Buying below face value and receiving face value at maturity is the whole return.", fr: "Les bons ne portent pas de coupon. Acheter sous la valeur nominale et recevoir la valeur nominale à l'échéance constitue tout le rendement." } },
    { prompt: { en: "Who submits bids directly at a BEAC Treasury auction?", fr: "Qui soumissionne directement lors d'une adjudication du Trésor à la BEAC ?" }, options: { en: ["Any individual with a bank account", "Primary dealers, mostly banks", "COSUMAF", "The BVMAC"], fr: ["Tout particulier disposant d'un compte bancaire", "Les spécialistes en valeurs du Trésor, surtout des banques", "La COSUMAF", "La BVMAC"] }, correctIndex: 1, explanation: { en: "Funds, companies and individuals access the auction and the secondary market through primary dealers.", fr: "Fonds, entreprises et particuliers accèdent à l'adjudication et au marché secondaire par l'intermédiaire des spécialistes en valeurs du Trésor." } },
    { prompt: { en: "How is a management company typically paid for running an FCP?", fr: "Comment une société de gestion est-elle généralement rémunérée pour gérer un FCP ?" }, options: { en: ["A fixed salary from the regulator", "A share of each investor's gains only", "A management fee as a percentage of the fund's assets, accrued inside the NAV", "A commission from the BEAC"], fr: ["Un salaire fixe versé par le régulateur", "Une part des gains de chaque investisseur uniquement", "Des frais de gestion en pourcentage des actifs du fonds, courus dans la valeur liquidative", "Une commission de la BEAC"] }, correctIndex: 2, explanation: { en: "The management fee is disclosed in the information document and deducted daily within the NAV, so what you see is already net of it.", fr: "Les frais de gestion sont indiqués dans la notice d'information et déduits quotidiennement dans la valeur liquidative ; ce que vous voyez en est déjà net." } },
  ]),
};

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export const CATALOG: CourseDef[] = [
  // ---- Financial Literacy Foundations ----
  {
    slug: "understanding-money",
    category: "foundations",
    title: { en: "Understanding Money", fr: "Comprendre l'argent" },
    summary: { en: "What money is, what it does, where it can live, and why leaving it idle has a cost.", fr: "Ce qu'est l'argent, ce qu'il fait, où il peut vivre, et pourquoi le laisser dormir a un coût." },
    description: {
      en: "This course starts where every financial decision starts: with a clear view of what money does and does not do. You will see the three jobs a 10,000 FCFA note performs, why the store-of-value job leaks over time, and how the FCFA's peg to the euro shapes the environment in which Central African savers operate.\n\nFrom there we move to the one number that drives personal wealth, the gap between income and expenses, and compare the places money can live: cash, mobile money, tontines and bank accounts. The final lesson puts a figure on the cost of waiting, so that doing nothing is recognised as a decision like any other.",
      fr: "Ce cours commence là où commence toute décision financière : par une vision claire de ce que l'argent fait et ne fait pas. Vous verrez les trois fonctions qu'un billet de 10 000 FCFA remplit, pourquoi la fonction de réserve de valeur fuit avec le temps, et comment l'arrimage du FCFA à l'euro façonne l'environnement des épargnants d'Afrique centrale.\n\nNous passons ensuite au chiffre qui conditionne le patrimoine personnel, l'écart entre revenus et dépenses, et comparons les lieux où l'argent peut vivre : espèces, mobile money, tontines et comptes bancaires. La dernière leçon chiffre le coût de l'attente, pour que ne rien faire soit reconnu comme une décision à part entière.",
    },
    level: "beginner",
    durationMinutes: 26,
    instructor: "aminata-ndong",
    isFree: true,
    featured: true,
    certificateEligible: true,
    coverTheme: "blue",
    outcomes: {
      en: ["Explain the three functions of money and why one of them weakens over time", "Measure your own income-expense gap and know what to do with it", "Compare cash, mobile money, tontines and bank accounts on liquidity, risk and return", "Quantify the cost of leaving money idle under a hypothetical inflation rate", "Describe where the FCFA comes from and what its peg to the euro means"],
      fr: ["Expliquer les trois fonctions de l'argent et pourquoi l'une d'elles s'affaiblit avec le temps", "Mesurer votre propre écart revenus-dépenses et savoir quoi en faire", "Comparer espèces, mobile money, tontines et comptes bancaires selon la liquidité, le risque et le rendement", "Chiffrer le coût de l'argent laissé inactif sous une hypothèse d'inflation", "Décrire d'où vient le FCFA et ce que signifie son arrimage à l'euro"],
    },
    modules: [
      { title: { en: "What money is", fr: "Ce qu'est l'argent" }, lessons: [UM_L1, UM_L2] },
      { title: { en: "Where money lives", fr: "Où vit l'argent" }, lessons: [UM_L3, UM_L4] },
    ],
  },
  {
    slug: "budgeting-and-cash-flow",
    category: "foundations",
    title: { en: "Budgeting and Cash Flow", fr: "Budget et flux de trésorerie" },
    summary: { en: "A practical method for planning monthly money, built for salaried and irregular incomes alike.", fr: "Une méthode pratique pour planifier l'argent du mois, conçue pour les revenus salariés comme irréguliers." },
    description: {
      en: "A budget is not a punishment; it is a map of where your money already goes, redrawn so that it goes where you want. This course builds that map in four steps: recording, classifying, deciding and reviewing. Examples cover a salaried employee in Yaoundé, a market trader with daily takings and a freelancer paid per contract.\n\nYou will learn to separate fixed, necessary and discretionary spending, to handle family obligations and njangi contributions inside the plan rather than outside it, and to run a simple cash-flow calendar so that school fees in September never arrive as a surprise.",
      fr: "Un budget n'est pas une punition ; c'est une carte de là où va déjà votre argent, redessinée pour qu'il aille là où vous le voulez. Ce cours construit cette carte en quatre étapes : noter, classer, décider et réviser. Les exemples couvrent un salarié de Yaoundé, une commerçante aux recettes quotidiennes et un indépendant payé au contrat.\n\nVous apprendrez à séparer dépenses fixes, nécessaires et discrétionnaires, à intégrer les obligations familiales et les cotisations de njangi dans le plan plutôt qu'en dehors, et à tenir un calendrier de trésorerie simple pour que les frais de scolarité de septembre n'arrivent jamais par surprise.",
    },
    level: "beginner",
    durationMinutes: 60,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "sky",
    outcomes: {
      en: ["Build a monthly budget from thirty days of real records", "Classify spending into fixed, necessary and discretionary layers", "Plan for irregular income using a buffer-and-salary method", "Anticipate large annual expenses with a cash-flow calendar", "Review and adjust a budget without abandoning it"],
      fr: ["Construire un budget mensuel à partir de trente jours de relevés réels", "Classer les dépenses en couches fixes, nécessaires et discrétionnaires", "Planifier un revenu irrégulier avec la méthode réserve-et-salaire", "Anticiper les grosses dépenses annuelles grâce à un calendrier de trésorerie", "Réviser et ajuster un budget sans l'abandonner"],
    },
  },
  {
    slug: "saving-versus-investing",
    category: "foundations",
    title: { en: "Saving Versus Investing", fr: "Épargner ou investir" },
    summary: { en: "Why saving and investing are different jobs, how to build the buffer first, and how to choose a first investment.", fr: "Pourquoi épargner et investir sont deux métiers différents, comment constituer d'abord la réserve, et comment choisir un premier investissement." },
    description: {
      en: "People use 'saving' and 'investing' interchangeably, then make decisions that suit neither. This course draws the line clearly: saving protects money you will need soon, investing grows money you will not need for years, and the dividing factor is time rather than amount.\n\nYou will size and place an emergency buffer, see what compound growth looks like over realistic horizons with hypothetical rates, and walk through the menu of CEMAC investment options, from Treasury securities to mutual funds, with a simple test for whether you are ready to buy any of them.",
      fr: "On emploie « épargner » et « investir » comme des synonymes, puis on prend des décisions qui ne conviennent à aucun des deux. Ce cours trace la frontière clairement : l'épargne protège l'argent dont vous aurez bientôt besoin, l'investissement fait croître celui dont vous n'aurez pas besoin avant des années, et le facteur déterminant est le temps, pas le montant.\n\nVous dimensionnerez et placerez une réserve d'urgence, verrez à quoi ressemble la croissance composée sur des horizons réalistes avec des taux hypothétiques, et parcourrez le menu des options d'investissement de la CEMAC, des titres du Trésor aux fonds communs de placement, avec un test simple pour savoir si vous êtes prêt à en acheter un.",
    },
    level: "beginner",
    durationMinutes: 26,
    instructor: "aminata-ndong",
    isFree: true,
    certificateEligible: true,
    coverTheme: "teal",
    prerequisites: { en: "Understanding Money, or equivalent familiarity with basic budgeting.", fr: "Comprendre l'argent, ou une familiarité équivalente avec les bases du budget." },
    outcomes: {
      en: ["Distinguish saving from investing by purpose and horizon", "Size and place an emergency fund correctly", "Read a growth projection and identify its assumptions", "List the main investment instruments available in CEMAC", "Apply a two-sentence readiness test before any purchase"],
      fr: ["Distinguer épargne et investissement par l'objectif et l'horizon", "Dimensionner et placer correctement un fonds d'urgence", "Lire une projection de croissance et en identifier les hypothèses", "Énumérer les principaux instruments d'investissement disponibles dans la CEMAC", "Appliquer le test des deux phrases avant tout achat"],
    },
    modules: [
      { title: { en: "Two jobs, one order", fr: "Deux métiers, un ordre" }, lessons: [SVI_L1, SVI_L2] },
      { title: { en: "Moving toward investing", fr: "Vers l'investissement" }, lessons: [SVI_L3, SVI_L4] },
    ],
  },
  {
    slug: "inflation-and-purchasing-power",
    category: "foundations",
    title: { en: "Inflation and Purchasing Power", fr: "Inflation et pouvoir d'achat" },
    summary: { en: "How rising prices quietly reduce what your money buys, how inflation is measured in CEMAC, and what savers can do about it.", fr: "Comment la hausse des prix réduit discrètement ce que votre argent achète, comment l'inflation est mesurée dans la CEMAC, et ce que les épargnants peuvent y faire." },
    description: {
      en: "Inflation is the tax nobody votes for. This course explains how a general rise in prices is measured, why it compounds, and why a fixed sum of FCFA buys less each year even though the number on the note never changes. We look at how the BEAC and national statistics offices publish price indices and what a headline inflation figure does and does not tell you.\n\nThe second half turns to defence: the difference between nominal and real returns, why a savings rate below inflation is a loss in disguise, and how different asset types have historically related to inflation, without pretending any of them is a guaranteed hedge.",
      fr: "L'inflation est l'impôt que personne ne vote. Ce cours explique comment une hausse générale des prix est mesurée, pourquoi elle se compose, et pourquoi une somme fixe en FCFA achète moins chaque année alors que le chiffre sur le billet ne change jamais. Nous examinons comment la BEAC et les instituts nationaux de statistique publient les indices de prix et ce qu'un chiffre d'inflation dit ou ne dit pas.\n\nLa seconde moitié passe à la défense : la différence entre rendement nominal et réel, pourquoi un taux d'épargne inférieur à l'inflation est une perte déguisée, et comment différents types d'actifs ont historiquement réagi à l'inflation, sans prétendre qu'aucun d'eux soit une couverture garantie.",
    },
    level: "beginner",
    durationMinutes: 55,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "slate",
    outcomes: {
      en: ["Explain how a consumer price index is built and read", "Convert a nominal return into a real return", "Project purchasing power over time under different inflation assumptions", "Describe the relationship between the FCFA peg and domestic inflation", "Evaluate whether a savings product keeps pace with prices"],
      fr: ["Expliquer comment un indice des prix à la consommation est construit et lu", "Convertir un rendement nominal en rendement réel", "Projeter le pouvoir d'achat dans le temps selon différentes hypothèses d'inflation", "Décrire la relation entre l'arrimage du FCFA et l'inflation intérieure", "Évaluer si un produit d'épargne suit le rythme des prix"],
    },
  },
  {
    slug: "financial-goal-setting",
    category: "foundations",
    title: { en: "Financial Goal Setting", fr: "Fixer des objectifs financiers" },
    summary: { en: "Turning vague wishes into dated, costed goals with a plan to reach them.", fr: "Transformer des souhaits vagues en objectifs datés et chiffrés, avec un plan pour les atteindre." },
    description: {
      en: "'I want to be comfortable' is a wish. 'I want 3 million FCFA for a plot in Kribi within five years' is a goal, and goals can be planned for. This course teaches a method for writing goals that survive contact with real life: specific amount, specific date, specific priority, and an honest look at what the goal costs in monthly contributions.\n\nWe sort goals by horizon, match each horizon to a suitable type of saving or investment, handle competing goals such as a child's school fees against a business expansion, and build the habit of reviewing goals once a year without rewriting them every month.",
      fr: "« Je veux être à l'aise » est un souhait. « Je veux 3 millions de FCFA pour un terrain à Kribi d'ici cinq ans » est un objectif, et un objectif se planifie. Ce cours enseigne une méthode pour rédiger des objectifs qui résistent à la vie réelle : montant précis, date précise, priorité précise, et un regard honnête sur ce que l'objectif coûte en versements mensuels.\n\nNous classons les objectifs par horizon, associons chaque horizon à un type d'épargne ou d'investissement adapté, gérons les objectifs concurrents comme les frais de scolarité d'un enfant face à l'extension d'une activité, et installons l'habitude de réviser les objectifs une fois par an sans les réécrire chaque mois.",
    },
    level: "beginner",
    durationMinutes: 50,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "green",
    outcomes: {
      en: ["Write goals that are specific, dated and costed", "Classify goals by horizon and match them to instruments", "Compute the monthly contribution a goal requires under a hypothetical rate", "Prioritise competing goals without abandoning any", "Set up an annual review routine"],
      fr: ["Rédiger des objectifs précis, datés et chiffrés", "Classer les objectifs par horizon et les associer à des instruments", "Calculer le versement mensuel qu'un objectif exige sous un taux hypothétique", "Hiérarchiser des objectifs concurrents sans en abandonner aucun", "Mettre en place une routine de révision annuelle"],
    },
  },
  {
    slug: "building-financial-discipline",
    category: "foundations",
    title: { en: "Building Financial Discipline", fr: "Construire la discipline financière" },
    summary: { en: "The habits, systems and small design choices that make saving automatic instead of heroic.", fr: "Les habitudes, systèmes et petits choix de conception qui rendent l'épargne automatique plutôt qu'héroïque." },
    description: {
      en: "Willpower is a poor foundation for a financial plan. It is strongest on payday and weakest at the end of the month, which is exactly backward. This course replaces willpower with systems: automatic transfers, separate accounts, friction in the right places and none in the wrong ones.\n\nWe borrow what works from tontines, the social commitment and the fixed calendar, and apply it to individual saving. We look at the psychology of spending in a mobile-money world, where a purchase is two taps away, and finish with a thirty-day plan to install one new habit at a time.",
      fr: "La volonté est une mauvaise fondation pour un plan financier. Elle est la plus forte le jour de la paie et la plus faible en fin de mois, soit exactement l'inverse de ce qu'il faudrait. Ce cours remplace la volonté par des systèmes : virements automatiques, comptes séparés, friction aux bons endroits et aucune aux mauvais.\n\nNous empruntons ce qui marche dans les tontines, l'engagement social et le calendrier fixe, pour l'appliquer à l'épargne individuelle. Nous examinons la psychologie de la dépense dans un monde de mobile money, où un achat est à deux clics, et terminons par un plan de trente jours pour installer une nouvelle habitude à la fois.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "violet",
    outcomes: {
      en: ["Automate saving so it does not depend on motivation", "Design account structures that reduce impulse spending", "Apply the commitment mechanics of tontines to personal saving", "Recognise common spending triggers in a mobile-money environment", "Install one durable habit in thirty days"],
      fr: ["Automatiser l'épargne pour qu'elle ne dépende pas de la motivation", "Concevoir une structure de comptes qui réduit les dépenses impulsives", "Appliquer les mécanismes d'engagement des tontines à l'épargne personnelle", "Reconnaître les déclencheurs de dépense courants dans un environnement mobile money", "Installer une habitude durable en trente jours"],
    },
  },

  // ---- Investment Fundamentals ----
  {
    slug: "understanding-risk-and-return",
    category: "investment",
    title: { en: "Understanding Risk and Return", fr: "Comprendre le risque et le rendement" },
    summary: { en: "Why higher expected returns always come with more uncertainty, and how to tell the kinds of risk apart.", fr: "Pourquoi un rendement attendu plus élevé s'accompagne toujours de plus d'incertitude, et comment distinguer les types de risque." },
    description: {
      en: "Every investment is a trade: you give up certainty to gain the possibility of growth. This course makes that trade visible. We define return properly, including income and value change, and define risk not as 'danger' but as the range of outcomes you might experience.\n\nYou will meet the six risks every investor should be able to name, market, credit, interest rate, liquidity, currency and concentration, with a CEMAC example for each, and learn why 'high return, no risk' is the sentence that should end any conversation.",
      fr: "Tout investissement est un échange : vous renoncez à la certitude pour gagner une possibilité de croissance. Ce cours rend cet échange visible. Nous définissons correctement le rendement, revenus et variation de valeur compris, et définissons le risque non comme un « danger » mais comme l'éventail des résultats possibles.\n\nVous rencontrerez les six risques que tout investisseur doit savoir nommer, marché, crédit, taux, liquidité, change et concentration, avec un exemple de la CEMAC pour chacun, et apprendrez pourquoi « rendement élevé, aucun risque » est la phrase qui devrait clore toute conversation.",
    },
    level: "beginner",
    durationMinutes: 65,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "midnight",
    outcomes: {
      en: ["Define return as income plus change in value", "Describe risk as a range of outcomes rather than a single danger", "Name and illustrate six types of investment risk", "Explain why risk and expected return move together", "Spot the warning signs of an offer that denies risk"],
      fr: ["Définir le rendement comme revenus plus variation de valeur", "Décrire le risque comme un éventail de résultats plutôt qu'un danger unique", "Nommer et illustrer six types de risque d'investissement", "Expliquer pourquoi risque et rendement attendu évoluent ensemble", "Repérer les signes d'alerte d'une offre qui nie le risque"],
    },
  },
  {
    slug: "the-power-of-compounding",
    category: "investment",
    title: { en: "The Power of Compounding", fr: "La puissance de la capitalisation" },
    summary: { en: "Returns on returns: the arithmetic that rewards time, and the fees and inflation that work against it.", fr: "Des rendements sur les rendements : l'arithmétique qui récompense le temps, et les frais et l'inflation qui jouent contre elle." },
    description: {
      en: "Compounding is simple to state and hard to feel. This course makes it tangible with worked FCFA examples, year-by-year tables and the Investment Growth Simulator. You will see why the curve bends, why early years look disappointing, and why regular contributions matter more than a large starting sum.\n\nWe then turn the lens around. Fees compound too, against you. So does inflation. The course closes by comparing a hypothetical gross return with the real, after-fee, after-inflation result over twenty years, so you can read any projection with the right scepticism.",
      fr: "La capitalisation est simple à énoncer et difficile à ressentir. Ce cours la rend tangible avec des exemples chiffrés en FCFA, des tableaux année par année et le Simulateur de croissance. Vous verrez pourquoi la courbe s'incurve, pourquoi les premières années semblent décevantes, et pourquoi les versements réguliers comptent plus qu'une grosse somme de départ.\n\nNous retournons ensuite la lentille. Les frais se composent aussi, contre vous. L'inflation également. Le cours se termine en comparant un rendement brut hypothétique avec le résultat réel, après frais et après inflation, sur vingt ans, pour que vous lisiez toute projection avec le scepticisme qui convient.",
    },
    level: "beginner",
    durationMinutes: 50,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "sky",
    outcomes: {
      en: ["Compute compound growth by hand for small cases", "Explain why time matters more than the starting amount", "Show how fees and inflation compound against the investor", "Convert a gross projection into a real, after-fee estimate", "Use the Investment Growth Simulator to test assumptions"],
      fr: ["Calculer une croissance composée à la main pour des cas simples", "Expliquer pourquoi le temps compte plus que le montant de départ", "Montrer comment frais et inflation se composent contre l'investisseur", "Convertir une projection brute en estimation réelle, après frais", "Utiliser le Simulateur de croissance pour tester des hypothèses"],
    },
  },
  {
    slug: "asset-allocation-and-diversification",
    category: "investment",
    title: { en: "Asset Allocation and Diversification", fr: "Allocation d'actifs et diversification" },
    summary: { en: "How spreading money across asset types changes the range of outcomes, and why allocation matters more than selection.", fr: "Comment répartir l'argent entre types d'actifs modifie l'éventail des résultats, et pourquoi l'allocation compte plus que la sélection." },
    description: {
      en: "Diversification is the only free lunch in investing, and it is widely misunderstood. Holding five bonds from the same issuer is not diversified. Holding a business, a plot of land and a bank deposit may be. This course explains what actually reduces risk: assets that do not move together.\n\nUsing the Asset Allocation Studio, you will build educational portfolios from generic asset classes, measure concentration, and run scenarios such as a rate rise or an equity fall to see how each mix behaves. Nothing here is a recommendation; the goal is to understand the mechanics so that any allocation you later adopt is a choice rather than an accident.",
      fr: "La diversification est le seul repas gratuit de l'investissement, et elle est largement mal comprise. Détenir cinq obligations du même émetteur n'est pas diversifié. Détenir une entreprise, un terrain et un dépôt bancaire peut l'être. Ce cours explique ce qui réduit réellement le risque : des actifs qui n'évoluent pas ensemble.\n\nAvec le Studio d'allocation d'actifs, vous construirez des portefeuilles pédagogiques à partir de classes d'actifs génériques, mesurerez la concentration et simulerez des scénarios comme une hausse des taux ou une chute des actions pour voir comment chaque combinaison se comporte. Rien ici n'est une recommandation ; l'objectif est de comprendre la mécanique pour que toute allocation adoptée plus tard soit un choix et non un accident.",
    },
    level: "intermediate",
    durationMinutes: 70,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "teal",
    prerequisites: { en: "Understanding Risk and Return.", fr: "Comprendre le risque et le rendement." },
    outcomes: {
      en: ["Explain why diversification depends on assets moving differently", "Measure concentration in a simple portfolio", "Describe the main asset classes available to a CEMAC investor", "Run scenario shocks against an educational allocation", "Separate allocation decisions from product selection"],
      fr: ["Expliquer pourquoi la diversification dépend d'actifs qui évoluent différemment", "Mesurer la concentration d'un portefeuille simple", "Décrire les principales classes d'actifs accessibles à un investisseur de la CEMAC", "Appliquer des chocs de scénario à une allocation pédagogique", "Séparer les décisions d'allocation de la sélection de produits"],
    },
  },
  {
    slug: "stocks-versus-bonds",
    category: "investment",
    title: { en: "Stocks Versus Bonds", fr: "Actions ou obligations" },
    summary: { en: "Owning a slice of a company versus lending it money: two instruments, two risk profiles, two roles in a portfolio.", fr: "Détenir une part d'une entreprise ou lui prêter de l'argent : deux instruments, deux profils de risque, deux rôles dans un portefeuille." },
    description: {
      en: "A share makes you a part-owner; a bond makes you a lender. That single difference explains almost everything else: who gets paid first if things go wrong, why share prices swing more, why bond prices move with interest rates, and why most long-term portfolios hold some of each.\n\nThe course uses the BVMAC and the BEAC public securities market as its setting, walks through how each instrument is issued, traded and valued, and finishes with the question that matters for a beginner: which of these do I actually understand well enough to hold?",
      fr: "Une action fait de vous un copropriétaire ; une obligation fait de vous un prêteur. Cette seule différence explique presque tout le reste : qui est payé en premier si les choses tournent mal, pourquoi les cours des actions oscillent davantage, pourquoi les prix des obligations bougent avec les taux d'intérêt, et pourquoi la plupart des portefeuilles de long terme détiennent un peu des deux.\n\nLe cours prend pour cadre la BVMAC et le marché des titres publics de la BEAC, parcourt l'émission, la négociation et la valorisation de chaque instrument, et se termine par la question qui compte pour un débutant : lequel de ces instruments est-ce que je comprends assez bien pour le détenir ?",
    },
    level: "beginner",
    durationMinutes: 55,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "blue",
    outcomes: {
      en: ["Explain ownership versus lending and its consequences", "Describe how shares and bonds are issued and traded in CEMAC", "Compare the risk and income profiles of each", "Explain the inverse relationship between bond prices and rates", "Decide which instrument you understand well enough to hold"],
      fr: ["Expliquer propriété contre prêt et ses conséquences", "Décrire l'émission et la négociation des actions et obligations dans la CEMAC", "Comparer le profil de risque et de revenu de chacune", "Expliquer la relation inverse entre prix des obligations et taux", "Décider quel instrument vous comprenez assez bien pour le détenir"],
    },
  },
  {
    slug: "understanding-investment-time-horizons",
    category: "investment",
    title: { en: "Understanding Investment Time Horizons", fr: "Comprendre les horizons d'investissement" },
    summary: { en: "Matching each sum of money to the length of time it can stay invested, and why mismatches are the commonest beginner error.", fr: "Associer chaque somme d'argent à la durée pendant laquelle elle peut rester investie, et pourquoi les décalages sont l'erreur la plus courante des débutants." },
    description: {
      en: "The right investment for money you need in six months is wrong for money you need in ten years, and vice versa. This course teaches you to sort your money by horizon before choosing anything, then shows what fluctuation looks like over one, three, five and ten years using hypothetical scenarios.\n\nWe look closely at what a fund's 'recommended holding period' is telling you, why early redemption can turn a temporary fall into a permanent loss, and how to handle a horizon that changes, for instance when a planned purchase is brought forward.",
      fr: "Le bon investissement pour l'argent dont vous avez besoin dans six mois est mauvais pour celui dont vous avez besoin dans dix ans, et inversement. Ce cours vous apprend à trier votre argent par horizon avant de choisir quoi que ce soit, puis montre à quoi ressemblent les fluctuations sur un, trois, cinq et dix ans à l'aide de scénarios hypothétiques.\n\nNous examinons de près ce que la « durée de détention recommandée » d'un fonds vous dit, pourquoi un rachat anticipé peut transformer une baisse temporaire en perte définitive, et comment gérer un horizon qui change, par exemple lorsqu'un achat prévu est avancé.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "slate",
    outcomes: {
      en: ["Sort money into horizon buckets before choosing instruments", "Interpret a recommended holding period correctly", "Explain how fluctuation behaves over different horizons", "Avoid turning temporary falls into permanent losses", "Adjust a plan when a horizon changes"],
      fr: ["Trier l'argent par horizon avant de choisir des instruments", "Interpréter correctement une durée de détention recommandée", "Expliquer le comportement des fluctuations selon l'horizon", "Éviter de transformer des baisses temporaires en pertes définitives", "Ajuster un plan lorsqu'un horizon change"],
    },
  },

  // ---- Mutual Funds & Asset Management ----
  {
    slug: "what-is-a-mutual-fund",
    category: "funds",
    title: { en: "What Is a Mutual Fund?", fr: "Qu'est-ce qu'un fonds commun de placement ?" },
    summary: { en: "Pooled money, professional management, independent oversight: how an FCP works from subscription to redemption.", fr: "Argent mutualisé, gestion professionnelle, contrôle indépendant : comment fonctionne un FCP de la souscription au rachat." },
    description: {
      en: "A mutual fund is the vehicle most first-time investors in CEMAC will meet first, because the minimum is small and the regulator requires clear documentation. This course explains it from the ground up: why pooling helps, what a unit is, who the manager, depositary, auditor and regulator are, and why their separation protects you.\n\nThe second module covers the two ways a fund treats income, capitalisation and distribution, using Stoneshed's Classic and Gold funds as published examples, and then follows the full cycle of subscription, valuation and redemption, including the fees and delays you must plan for.",
      fr: "Le fonds commun de placement est le véhicule que la plupart des primo-investisseurs de la CEMAC rencontrent en premier, parce que le minimum est faible et que le régulateur exige une documentation claire. Ce cours l'explique depuis la base : pourquoi la mise en commun aide, ce qu'est une part, qui sont le gérant, le dépositaire, le commissaire aux comptes et le régulateur, et pourquoi leur séparation vous protège.\n\nLe second module couvre les deux façons dont un fonds traite les revenus, capitalisation et distribution, en prenant les fonds Classic et Gold de Stoneshed comme exemples publiés, puis suit le cycle complet de souscription, valorisation et rachat, y compris les frais et délais à anticiper.",
    },
    level: "beginner",
    durationMinutes: 26,
    instructor: "thierry-mbarga",
    isFree: true,
    featured: true,
    certificateEligible: true,
    coverTheme: "midnight",
    outcomes: {
      en: ["Explain pooling and what a unit represents", "Name the four parties around a fund and what each one does", "Distinguish capitalisation from distribution funds", "Describe the subscription and redemption cycle with its fees and delays", "Verify a fund's regulatory references before subscribing"],
      fr: ["Expliquer la mise en commun et ce que représente une part", "Nommer les quatre acteurs autour d'un fonds et le rôle de chacun", "Distinguer fonds de capitalisation et fonds de distribution", "Décrire le cycle de souscription et de rachat avec ses frais et délais", "Vérifier les références réglementaires d'un fonds avant de souscrire"],
    },
    modules: [
      { title: { en: "The pool and its guardians", fr: "Le pool et ses gardiens" }, lessons: [MF_L1, MF_L2] },
      { title: { en: "Income, entry and exit", fr: "Revenus, entrée et sortie" }, lessons: [MF_L3, MF_L4] },
    ],
  },
  {
    slug: "how-fund-managers-invest-money",
    category: "funds",
    title: { en: "How Fund Managers Invest Money", fr: "Comment les gérants de fonds investissent l'argent" },
    summary: { en: "Inside the investment process: analysis, committee, execution, control and reporting in a bond-oriented fund.", fr: "Au cœur du processus d'investissement : analyse, comité, exécution, contrôle et reporting dans un fonds orienté obligations." },
    description: {
      en: "What does a fund manager actually do between your subscription and your redemption? This course opens the door. You will follow a bond fund through an auction week on the BEAC market, sit in on an investment committee, see how a trade settles through the depositary and how the NAV is checked.\n\nWe pay special attention to the limits in a fund's management regulations, concentration caps, liquidity buffers and eligible assets, because they define what the manager may do with your money. The course ends with the questions a well-informed investor asks a manager, and what good answers sound like.",
      fr: "Que fait réellement un gérant de fonds entre votre souscription et votre rachat ? Ce cours ouvre la porte. Vous suivrez un fonds obligataire pendant une semaine d'adjudications sur le marché de la BEAC, assisterez à un comité d'investissement, verrez comment une opération se règle via le dépositaire et comment la valeur liquidative est contrôlée.\n\nNous accordons une attention particulière aux limites du règlement de gestion, plafonds de concentration, réserves de liquidité et actifs éligibles, parce qu'elles définissent ce que le gérant peut faire de votre argent. Le cours se termine par les questions qu'un investisseur averti pose à un gérant, et par ce à quoi ressemblent de bonnes réponses.",
    },
    level: "intermediate",
    durationMinutes: 60,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "blue",
    prerequisites: { en: "What Is a Mutual Fund?", fr: "Qu'est-ce qu'un fonds commun de placement ?" },
    outcomes: {
      en: ["Describe the stages of a fund's investment process", "Read the limits in a fund's management regulations", "Explain how trades settle and how the NAV is verified", "Understand how a manager is paid and the incentives that creates", "Ask a manager the right questions"],
      fr: ["Décrire les étapes du processus d'investissement d'un fonds", "Lire les limites du règlement de gestion d'un fonds", "Expliquer le règlement des opérations et la vérification de la valeur liquidative", "Comprendre la rémunération d'un gérant et les incitations qu'elle crée", "Poser les bonnes questions à un gérant"],
    },
  },
  {
    slug: "understanding-net-asset-value",
    category: "funds",
    title: { en: "Understanding Net Asset Value", fr: "Comprendre la valeur liquidative" },
    summary: { en: "The one number your whole relationship with a fund runs through: what it is, what moves it, and how to verify it.", fr: "Le chiffre par lequel passe toute votre relation avec un fonds : ce qu'il est, ce qui le fait bouger, et comment le vérifier." },
    description: {
      en: "Net asset value sets what you pay to join a fund, what you receive when you leave, and how your holding is reported in between. This course takes the formula apart, assets minus liabilities divided by units, with a worked valuation of a hypothetical bond fund, then shows the four forces that move it: accrued interest, interest rate changes, fees and credit events.\n\nThe second module connects the NAV to your own money through entry and exit arithmetic, distributions, and performance claims, and ends with a checklist on valuation frequency, publication and document consistency.",
      fr: "La valeur liquidative fixe ce que vous payez pour entrer dans un fonds, ce que vous recevez en sortant, et la façon dont votre avoir est présenté entre les deux. Ce cours démonte la formule, actifs moins passifs divisés par les parts, avec une valorisation chiffrée d'un fonds obligataire hypothétique, puis montre les quatre forces qui la font bouger : intérêts courus, variations de taux, frais et événements de crédit.\n\nLe second module relie la valeur liquidative à votre propre argent à travers l'arithmétique d'entrée et de sortie, les distributions et les affirmations de performance, et se termine par une liste de contrôle sur la fréquence de valorisation, la publication et la cohérence des documents.",
    },
    level: "beginner",
    durationMinutes: 24,
    instructor: "thierry-mbarga",
    isFree: true,
    featured: true,
    certificateEligible: true,
    coverTheme: "sky",
    prerequisites: { en: "What Is a Mutual Fund?, or familiarity with the idea of fund units.", fr: "Qu'est-ce qu'un fonds commun de placement ?, ou une familiarité avec la notion de part de fonds." },
    outcomes: {
      en: ["Compute a NAV per unit from a simple balance sheet", "Explain the four forces that move a bond fund's NAV", "Calculate your gain or loss from subscription and redemption NAVs", "Add distributions back when assessing a distribution fund", "Check valuation frequency and publication in a fund's documents"],
      fr: ["Calculer une valeur liquidative par part à partir d'un bilan simple", "Expliquer les quatre forces qui font bouger la valeur liquidative d'un fonds obligataire", "Calculer votre gain ou votre perte à partir des valeurs liquidatives de souscription et de rachat", "Réintégrer les distributions pour évaluer un fonds de distribution", "Vérifier la fréquence de valorisation et la publication dans les documents d'un fonds"],
    },
    modules: [
      { title: { en: "The number and its moves", fr: "Le chiffre et ses mouvements" }, lessons: [NAV_L1, NAV_L2] },
      { title: { en: "The NAV and your money", fr: "La valeur liquidative et votre argent" }, lessons: [NAV_L3, NAV_L4] },
    ],
  },
  {
    slug: "capitalization-versus-distribution-funds",
    category: "funds",
    title: { en: "Capitalization Versus Distribution Funds", fr: "Fonds de capitalisation ou de distribution" },
    summary: { en: "Two ways a fund can treat the income it earns, and how to choose the one that fits your situation.", fr: "Deux façons pour un fonds de traiter les revenus qu'il gagne, et comment choisir celle qui convient à votre situation." },
    description: {
      en: "The same portfolio can feed two very different investor experiences. A capitalisation fund reinvests income so the unit value grows; a distribution fund pays it out, typically once a year. This course compares the two through worked examples, the Compounding Versus Distribution lab, and the published structures of FCP Stoneshed Classic and FCP Stoneshed Gold.\n\nWe cover what happens to the NAV on a distribution date, why a payout is not extra money, how taxation can differ between the routes, and a decision framework based on whether you need income now or growth later.",
      fr: "Un même portefeuille peut nourrir deux expériences d'investisseur très différentes. Un fonds de capitalisation réinvestit les revenus, de sorte que la valeur de la part croît ; un fonds de distribution les verse, généralement une fois par an. Ce cours compare les deux par des exemples chiffrés, le laboratoire Capitalisation contre distribution et les structures publiées du FCP Stoneshed Classic et du FCP Stoneshed Gold.\n\nNous abordons ce qui arrive à la valeur liquidative le jour d'une distribution, pourquoi un versement n'est pas de l'argent en plus, comment la fiscalité peut différer selon la voie, et un cadre de décision fondé sur votre besoin de revenus immédiats ou de croissance future.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "amber",
    outcomes: {
      en: ["Explain how each structure handles income", "Describe what happens to the NAV on a distribution date", "Compare long-term outcomes under identical hypothetical rates", "Identify tax and reinvestment considerations to check", "Choose a structure based on income need and horizon"],
      fr: ["Expliquer comment chaque structure traite les revenus", "Décrire ce qui arrive à la valeur liquidative le jour d'une distribution", "Comparer les résultats à long terme sous des taux hypothétiques identiques", "Identifier les points fiscaux et de réinvestissement à vérifier", "Choisir une structure selon le besoin de revenus et l'horizon"],
    },
  },
  {
    slug: "understanding-fund-fees",
    category: "funds",
    title: { en: "Understanding Fund Fees", fr: "Comprendre les frais d'un fonds" },
    summary: { en: "Entry, exit, management and operating fees: where they are disclosed, how they are deducted, and what they cost over time.", fr: "Droits d'entrée, de sortie, frais de gestion et de fonctionnement : où ils sont indiqués, comment ils sont prélevés, et ce qu'ils coûtent dans le temps." },
    description: {
      en: "Fees are the one component of your return that is known in advance, which makes them the one you can manage. This course lists every fee a CEMAC fund may charge, shows exactly where each appears in the information document and how it is deducted, inside the NAV or at the point of subscription and redemption.\n\nUsing the Investment Growth Simulator, you will see how a one-point difference in annual fees compounds over fifteen years, learn to compute a simple total cost of ownership, and understand why low fees do not by themselves make a good fund, nor high fees a bad one.",
      fr: "Les frais sont la seule composante de votre rendement connue d'avance, ce qui en fait celle que vous pouvez gérer. Ce cours recense chaque frais qu'un fonds de la CEMAC peut prélever, montre précisément où chacun apparaît dans la notice d'information et comment il est déduit, dans la valeur liquidative ou au moment de la souscription et du rachat.\n\nAvec le Simulateur de croissance, vous verrez comment un point d'écart de frais annuels se compose sur quinze ans, apprendrez à calculer un coût total de détention simple, et comprendrez pourquoi des frais bas ne font pas à eux seuls un bon fonds, ni des frais élevés un mauvais.",
    },
    level: "beginner",
    durationMinutes: 40,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "slate",
    outcomes: {
      en: ["List the fee types a fund may charge", "Locate each fee in the information document", "Explain which fees are inside the NAV and which are not", "Quantify the long-term effect of a fee difference", "Weigh fees against what the fund delivers"],
      fr: ["Énumérer les types de frais qu'un fonds peut prélever", "Localiser chaque frais dans la notice d'information", "Expliquer quels frais sont inclus dans la valeur liquidative et lesquels ne le sont pas", "Chiffrer l'effet à long terme d'un écart de frais", "Mettre les frais en balance avec ce que le fonds apporte"],
    },
  },
  {
    slug: "liquidity-redemptions-and-investment-risk",
    category: "funds",
    title: { en: "Liquidity, Redemptions and Investment Risk", fr: "Liquidité, rachats et risque d'investissement" },
    summary: { en: "Why getting money out of a fund takes time, how redemption rules protect all investors, and what can go wrong.", fr: "Pourquoi sortir l'argent d'un fonds prend du temps, comment les règles de rachat protègent tous les investisseurs, et ce qui peut mal tourner." },
    description: {
      en: "A fund promises to buy back your units, but the assets it holds cannot always be sold at once. This course explains how notice periods, settlement delays, liquidity buffers and, in extreme cases, suspension of redemptions reconcile that tension, and why those rules protect the investors who stay as much as those who leave.\n\nWe walk through a hypothetical stress scenario in a thin market, show how the manager meets redemptions, and connect the discussion to the recommended holding period and to the liquidity risk you are accepting when you subscribe.",
      fr: "Un fonds promet de racheter vos parts, mais les actifs qu'il détient ne peuvent pas toujours être vendus immédiatement. Ce cours explique comment préavis, délais de règlement, réserves de liquidité et, dans les cas extrêmes, suspension des rachats concilient cette tension, et pourquoi ces règles protègent autant les investisseurs qui restent que ceux qui partent.\n\nNous parcourons un scénario de tension hypothétique sur un marché étroit, montrons comment le gérant honore les rachats, et relions la discussion à la durée de détention recommandée et au risque de liquidité que vous acceptez en souscrivant.",
    },
    level: "intermediate",
    durationMinutes: 50,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "violet",
    prerequisites: { en: "What Is a Mutual Fund? and Understanding Net Asset Value.", fr: "Qu'est-ce qu'un fonds commun de placement ? et Comprendre la valeur liquidative." },
    outcomes: {
      en: ["Explain notice periods, settlement delays and liquidity buffers", "Describe when and why redemptions may be limited", "Walk through a liquidity stress scenario", "Relate the recommended holding period to liquidity risk", "Read the redemption section of a fund's documents with confidence"],
      fr: ["Expliquer préavis, délais de règlement et réserves de liquidité", "Décrire quand et pourquoi les rachats peuvent être limités", "Parcourir un scénario de tension de liquidité", "Relier la durée de détention recommandée au risque de liquidité", "Lire avec assurance la section rachats des documents d'un fonds"],
    },
  },

  // ---- The CEMAC Financial Market ----
  {
    slug: "introduction-to-the-cemac-financial-system",
    category: "cemac",
    title: { en: "Introduction to the CEMAC Financial System", fr: "Introduction au système financier de la CEMAC" },
    summary: { en: "Six countries, one currency, one regulator, one exchange: the institutions and markets every Central African investor should know.", fr: "Six pays, une monnaie, un régulateur, une bourse : les institutions et marchés que tout investisseur d'Afrique centrale doit connaître." },
    description: {
      en: "Before investing in a market, know its map. This course introduces the CEMAC monetary union and its institutions, the BEAC as central bank and operator of the public securities market, COBAC as bank supervisor, COSUMAF as financial market regulator and the BVMAC as the regional exchange, and explains what each one means for a saver in Douala or Libreville.\n\nThe second module goes deeper into the two pillars of the investable market: how states borrow through Treasury bills and bonds, and what a licensed management company does, is paid for, and must report. Each lesson ends with practical verification steps you can use on any product you are offered.",
      fr: "Avant d'investir sur un marché, connaissez sa carte. Ce cours présente l'union monétaire de la CEMAC et ses institutions, la BEAC comme banque centrale et opérateur du marché des titres publics, la COBAC comme superviseur bancaire, la COSUMAF comme régulateur du marché financier et la BVMAC comme bourse régionale, et explique ce que chacune signifie pour un épargnant de Douala ou de Libreville.\n\nLe second module approfondit les deux piliers du marché investissable : comment les États empruntent par bons et obligations du Trésor, et ce qu'une société de gestion agréée fait, perçoit et doit déclarer. Chaque leçon se termine par des étapes de vérification pratiques applicables à tout produit qu'on vous propose.",
    },
    level: "beginner",
    durationMinutes: 26,
    instructor: "nadege-tchoumi",
    isFree: true,
    featured: true,
    certificateEligible: true,
    coverTheme: "green",
    outcomes: {
      en: ["Name the six CEMAC states and the role of the BEAC, COBAC, COSUMAF and BVMAC", "Explain what a COSUMAF licence and visa do and do not mean", "Describe how Treasury bills and bonds are issued and bought", "Outline a management company's weekly process and how it is paid", "Verify any fund or manager in five minutes"],
      fr: ["Nommer les six États de la CEMAC et le rôle de la BEAC, de la COBAC, de la COSUMAF et de la BVMAC", "Expliquer ce qu'un agrément et un visa de la COSUMAF signifient et ne signifient pas", "Décrire l'émission et l'achat des bons et obligations du Trésor", "Exposer le processus hebdomadaire d'une société de gestion et sa rémunération", "Vérifier tout fonds ou gérant en cinq minutes"],
    },
    modules: [
      { title: { en: "The map and the regulator", fr: "La carte et le régulateur" }, lessons: [CEMAC_L1, CEMAC_L2] },
      { title: { en: "States and managers", fr: "États et gérants" }, lessons: [CEMAC_L3, CEMAC_L4] },
    ],
  },
  {
    slug: "understanding-cosumaf",
    category: "cemac",
    title: { en: "Understanding COSUMAF", fr: "Comprendre la COSUMAF" },
    summary: { en: "The regional market regulator: its mandate, the licences and approvals it grants, and how investors can use it.", fr: "Le régulateur régional du marché : son mandat, les agréments et approbations qu'il délivre, et comment les investisseurs peuvent y recourir." },
    description: {
      en: "The Central African Financial Market Supervisory Commission is the body standing between you and any firm that wants to manage your money in the CEMAC market. This course explains its mandate, how it licenses management companies, approves funds and public offerings, supervises intermediaries and handles complaints.\n\nYou will learn to read COSUMAF references on a document, to understand what an approval does and does not guarantee, and to recognise unregulated offers that borrow regulatory language without the substance.",
      fr: "La Commission de surveillance du marché financier de l'Afrique centrale est l'organe qui se tient entre vous et toute société souhaitant gérer votre argent sur le marché de la CEMAC. Ce cours explique son mandat, la façon dont elle agrée les sociétés de gestion, approuve les fonds et les offres au public, supervise les intermédiaires et traite les réclamations.\n\nVous apprendrez à lire les références COSUMAF sur un document, à comprendre ce qu'une approbation garantit ou non, et à reconnaître les offres non réglementées qui empruntent le vocabulaire réglementaire sans la substance.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "nadege-tchoumi",
    isFree: true,
    coverTheme: "blue",
    outcomes: {
      en: ["Describe COSUMAF's mandate and powers", "Explain the licensing and approval process for managers and funds", "Interpret the references printed on fund documents", "State what an approval does not guarantee", "Know how to raise a concern with the regulator"],
      fr: ["Décrire le mandat et les pouvoirs de la COSUMAF", "Expliquer le processus d'agrément et d'approbation des gérants et des fonds", "Interpréter les références imprimées sur les documents d'un fonds", "Énoncer ce qu'une approbation ne garantit pas", "Savoir comment saisir le régulateur d'une préoccupation"],
    },
  },
  {
    slug: "understanding-the-bvmac",
    category: "cemac",
    title: { en: "Understanding the BVMAC", fr: "Comprendre la BVMAC" },
    summary: { en: "The regional stock exchange in Douala: what is listed, how trading works, and what role it plays next to the BEAC securities market.", fr: "La bourse régionale de Douala : ce qui y est coté, comment se déroule la négociation, et son rôle aux côtés du marché des titres de la BEAC." },
    description: {
      en: "The Bourse des Valeurs Mobilières de l'Afrique Centrale is the single regional exchange, formed in 2019 from the former Douala and Libreville exchanges. This course explains what is listed there, shares and bonds, how orders are placed through licensed brokers, how prices are formed in a market with limited turnover, and how settlement works through the central depositary.\n\nWe set the BVMAC in context next to the much larger BEAC public securities market, discuss why listings are few and what that means for liquidity, and look at how a fund may use listed instruments within its regulations.",
      fr: "La Bourse des valeurs mobilières de l'Afrique centrale est l'unique bourse régionale, née en 2019 de la fusion des anciennes bourses de Douala et de Libreville. Ce cours explique ce qui y est coté, actions et obligations, comment les ordres sont passés via des intermédiaires agréés, comment les prix se forment sur un marché aux volumes limités, et comment le règlement-livraison fonctionne via le dépositaire central.\n\nNous situons la BVMAC par rapport au marché des titres publics de la BEAC, bien plus vaste, expliquons pourquoi les cotations sont peu nombreuses et ce que cela implique pour la liquidité, et examinons comment un fonds peut utiliser des instruments cotés dans le cadre de son règlement.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "nadege-tchoumi",
    isFree: true,
    coverTheme: "midnight",
    outcomes: {
      en: ["Describe what the BVMAC lists and how trading is organised", "Explain price formation in a low-turnover market", "Outline the role of brokers and the central depositary", "Compare the BVMAC with the BEAC public securities market", "Assess the liquidity of a listed instrument before buying"],
      fr: ["Décrire ce que la BVMAC cote et comment la négociation est organisée", "Expliquer la formation des prix sur un marché à faible volume", "Exposer le rôle des intermédiaires et du dépositaire central", "Comparer la BVMAC au marché des titres publics de la BEAC", "Évaluer la liquidité d'un instrument coté avant d'acheter"],
    },
  },
  {
    slug: "government-bonds-and-treasury-securities",
    category: "cemac",
    title: { en: "Government Bonds and Treasury Securities", fr: "Obligations d'État et titres du Trésor" },
    summary: { en: "BTAs and OTAs in depth: auctions, pricing, yields, and the risks of lending to a state.", fr: "BTA et OTA en profondeur : adjudications, prix, rendements, et les risques de prêter à un État." },
    description: {
      en: "Treasury securities are the backbone of most bond-oriented funds in CEMAC and the instrument most CEMAC savers end up exposed to, directly or through a fund. This course covers the auction calendar, how bids are expressed as yields, how a bill's discount and a bond's coupon translate into return, and how the secondary market works.\n\nUsing the Bond and Interest Rate Explorer, you will see how price, coupon, maturity and yield relate, why longer bonds swing more, and how to think about the credit standing of different sovereign issuers without pretending to forecast it.",
      fr: "Les titres du Trésor sont l'ossature de la plupart des fonds orientés obligations dans la CEMAC et l'instrument auquel la plupart des épargnants finissent par être exposés, directement ou via un fonds. Ce cours couvre le calendrier des adjudications, la façon dont les offres s'expriment en taux, comment l'escompte d'un bon et le coupon d'une obligation se traduisent en rendement, et le fonctionnement du marché secondaire.\n\nAvec le laboratoire Obligations et taux d'intérêt, vous verrez comment prix, coupon, maturité et rendement s'articulent, pourquoi les obligations longues oscillent davantage, et comment raisonner sur la qualité de crédit de différents émetteurs souverains sans prétendre la prévoir.",
    },
    level: "intermediate",
    durationMinutes: 60,
    instructor: "nadege-tchoumi",
    isFree: true,
    coverTheme: "slate",
    prerequisites: { en: "Introduction to the CEMAC Financial System.", fr: "Introduction au système financier de la CEMAC." },
    outcomes: {
      en: ["Explain how Treasury auctions work and who participates", "Compute the return on a discount bill and a coupon bond", "Relate price, yield and maturity", "Describe the secondary market and its liquidity", "Assess sovereign credit considerations in a fund's holdings"],
      fr: ["Expliquer le fonctionnement des adjudications du Trésor et qui y participe", "Calculer le rendement d'un bon à escompte et d'une obligation à coupon", "Relier prix, rendement et maturité", "Décrire le marché secondaire et sa liquidité", "Évaluer les considérations de crédit souverain dans les positions d'un fonds"],
    },
  },
  {
    slug: "how-regional-financial-markets-work",
    category: "cemac",
    title: { en: "How Regional Financial Markets Work", fr: "Comment fonctionnent les marchés financiers régionaux" },
    summary: { en: "Primary and secondary markets, intermediaries, settlement and the flow of money from saver to issuer and back.", fr: "Marchés primaire et secondaire, intermédiaires, règlement-livraison et circulation de l'argent de l'épargnant à l'émetteur et retour." },
    description: {
      en: "A market is a set of rules and institutions that lets a saver in Bertoua finance a port in Pointe-Noire without the two ever meeting. This course traces that chain: issuance on the primary market, trading on the secondary market, the brokers, dealers, custodians and depositaries in between, and the settlement systems that make sure securities and cash change hands safely.\n\nWe compare how this works for Treasury securities on the BEAC market and for listed instruments on the BVMAC, and explain what 'market depth' and 'liquidity' mean in practice for a small regional market.",
      fr: "Un marché est un ensemble de règles et d'institutions qui permet à un épargnant de Bertoua de financer un port à Pointe-Noire sans que les deux ne se rencontrent jamais. Ce cours retrace cette chaîne : l'émission sur le marché primaire, la négociation sur le marché secondaire, les intermédiaires, spécialistes, conservateurs et dépositaires entre les deux, et les systèmes de règlement-livraison qui garantissent que titres et espèces changent de mains en sécurité.\n\nNous comparons ce fonctionnement pour les titres du Trésor sur le marché de la BEAC et pour les instruments cotés à la BVMAC, et expliquons ce que « profondeur de marché » et « liquidité » signifient concrètement pour un petit marché régional.",
    },
    level: "intermediate",
    durationMinutes: 55,
    instructor: "nadege-tchoumi",
    isFree: true,
    coverTheme: "teal",
    outcomes: {
      en: ["Distinguish primary from secondary markets", "Name the intermediaries in a securities transaction and their roles", "Explain delivery-versus-payment settlement", "Compare the BEAC and BVMAC market structures", "Interpret depth and liquidity in a small market"],
      fr: ["Distinguer marché primaire et marché secondaire", "Nommer les intermédiaires d'une transaction sur titres et leurs rôles", "Expliquer le règlement-livraison", "Comparer les structures de marché de la BEAC et de la BVMAC", "Interpréter profondeur et liquidité sur un petit marché"],
    },
  },
  {
    slug: "the-role-of-asset-management-companies",
    category: "cemac",
    title: { en: "The Role of Asset Management Companies", fr: "Le rôle des sociétés de gestion d'actifs" },
    summary: { en: "What a licensed manager offers beyond funds: mandates, advisory, treasury solutions, and the duties that come with each.", fr: "Ce qu'un gérant agréé propose au-delà des fonds : mandats, conseil, solutions de trésorerie, et les obligations liées à chacun." },
    description: {
      en: "Asset management companies do more than run mutual funds. They manage portfolios under individual mandate, advise institutions on investment policy, and help companies place surplus cash. This course explains each service, who it is for, how it is regulated and how it is paid, using the service lines of a licensed CEMAC manager as the reference.\n\nWe close with the fiduciary duties that attach to managing other people's money, how conflicts of interest are handled, and what an investor or institution should expect in reporting and transparency.",
      fr: "Les sociétés de gestion d'actifs ne se limitent pas aux fonds communs de placement. Elles gèrent des portefeuilles sous mandat individuel, conseillent les institutions sur leur politique d'investissement et aident les entreprises à placer leurs excédents de trésorerie. Ce cours explique chaque service, à qui il s'adresse, comment il est réglementé et rémunéré, en prenant pour référence les lignes de services d'un gérant agréé de la CEMAC.\n\nNous terminons par les devoirs fiduciaires liés à la gestion de l'argent d'autrui, la gestion des conflits d'intérêts, et ce qu'un investisseur ou une institution doit attendre en matière de reporting et de transparence.",
    },
    level: "intermediate",
    durationMinutes: 50,
    instructor: "nadege-tchoumi",
    isFree: true,
    coverTheme: "blue",
    outcomes: {
      en: ["Describe the main services of an asset management company", "Distinguish collective management from discretionary mandates and advisory", "Explain fiduciary duty and conflict-of-interest controls", "Know what reporting an investor should expect", "Match a service to an investor or institution's needs"],
      fr: ["Décrire les principaux services d'une société de gestion d'actifs", "Distinguer gestion collective, mandat discrétionnaire et conseil", "Expliquer le devoir fiduciaire et le contrôle des conflits d'intérêts", "Savoir quel reporting un investisseur doit attendre", "Associer un service aux besoins d'un investisseur ou d'une institution"],
    },
  },

  // ---- Building Wealth Responsibly ----
  {
    slug: "long-term-investing",
    category: "wealth",
    title: { en: "Long-Term Investing", fr: "Investir à long terme" },
    summary: { en: "Why patience is a strategy, how to stay invested through fluctuations, and what to do when the market tests your resolve.", fr: "Pourquoi la patience est une stratégie, comment rester investi malgré les fluctuations, et quoi faire quand le marché met votre résolution à l'épreuve." },
    description: {
      en: "The investors who do best are rarely the cleverest; they are the ones who stayed. This course explains why time in the market has historically mattered more than timing it, using hypothetical scenarios rather than any promise about the future, and shows how regular contributions through good and bad periods smooth the price you pay.\n\nWe spend real time on the hard part: what a 10% fall feels like, why selling at that moment locks in the loss, and the simple rules that help people hold on. The course ends with a written investment policy for yourself, one page, that you can reread on the bad days.",
      fr: "Les investisseurs qui réussissent le mieux sont rarement les plus habiles ; ce sont ceux qui sont restés. Ce cours explique pourquoi le temps passé sur le marché a historiquement compté davantage que le choix du moment, à l'aide de scénarios hypothétiques et sans aucune promesse sur l'avenir, et montre comment des versements réguliers en périodes fastes et difficiles lissent le prix payé.\n\nNous consacrons du temps à la partie difficile : ce qu'une baisse de 10 % fait ressentir, pourquoi vendre à ce moment-là fige la perte, et les règles simples qui aident à tenir. Le cours se termine par une politique d'investissement personnelle écrite, une page, à relire les mauvais jours.",
    },
    level: "beginner",
    durationMinutes: 50,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "green",
    outcomes: {
      en: ["Explain why staying invested matters over long horizons", "Describe how regular contributions smooth purchase prices", "Anticipate how a fall will feel and plan a response in advance", "Avoid locking in temporary losses", "Write a one-page personal investment policy"],
      fr: ["Expliquer pourquoi rester investi compte sur les horizons longs", "Décrire comment des versements réguliers lissent les prix d'achat", "Anticiper ce qu'une baisse fera ressentir et préparer une réponse à l'avance", "Éviter de figer des pertes temporaires", "Rédiger une politique d'investissement personnelle en une page"],
    },
  },
  {
    slug: "understanding-financial-goals",
    category: "wealth",
    title: { en: "Understanding Financial Goals", fr: "Comprendre les objectifs financiers" },
    summary: { en: "Life goals translated into money: education, housing, a business, retirement, and the trade-offs between them.", fr: "Les objectifs de vie traduits en argent : éducation, logement, entreprise, retraite, et les arbitrages entre eux." },
    description: {
      en: "Money is a means; goals are the point. This course takes the big life goals most Central African households share, children's education, a home, a business, support for parents, retirement, and translates each into an amount, a date and a monthly contribution under stated hypothetical assumptions.\n\nThe heart of the course is trade-off: what happens to retirement if the business is funded first, how a tontine commitment competes with school fees, and how to sequence goals honestly so that the plan survives contact with real life.",
      fr: "L'argent est un moyen ; les objectifs sont le but. Ce cours prend les grands objectifs de vie que partagent la plupart des ménages d'Afrique centrale, éducation des enfants, logement, entreprise, soutien aux parents, retraite, et traduit chacun en un montant, une date et un versement mensuel sous des hypothèses explicites.\n\nLe cœur du cours est l'arbitrage : ce qu'il advient de la retraite si l'entreprise est financée en premier, comment une cotisation de tontine entre en concurrence avec les frais de scolarité, et comment ordonner honnêtement les objectifs pour que le plan résiste à la vie réelle.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "sky",
    outcomes: {
      en: ["Translate common life goals into dated amounts", "Estimate required contributions under stated assumptions", "Identify trade-offs between competing goals", "Sequence goals realistically", "Revisit goals as circumstances change"],
      fr: ["Traduire les objectifs de vie courants en montants datés", "Estimer les versements nécessaires sous des hypothèses explicites", "Identifier les arbitrages entre objectifs concurrents", "Ordonner les objectifs de façon réaliste", "Réexaminer les objectifs quand les circonstances changent"],
    },
  },
  {
    slug: "retirement-planning-fundamentals",
    category: "wealth",
    title: { en: "Retirement Planning Fundamentals", fr: "Fondamentaux de la préparation à la retraite" },
    summary: { en: "What the CNPS pension does and does not cover, and how to build the rest with time on your side.", fr: "Ce que la pension de la CNPS couvre ou non, et comment constituer le reste avec le temps pour allié." },
    description: {
      en: "For most salaried Cameroonians, retirement income starts with the CNPS. This course explains in general terms how a contributory pension works, why it typically replaces only part of a final salary, and why informal-sector workers often have no pension at all. It then shows how a long horizon makes modest, regular investment unusually powerful for this goal.\n\nWe cover the arithmetic of a retirement target, the shift from accumulation to drawing an income, the role of distribution funds and other income-producing assets in later life, and the family dimension that is specific to the region. No figures about future pension levels are forecast; the method is what you take away.",
      fr: "Pour la plupart des salariés camerounais, le revenu de retraite commence par la CNPS. Ce cours explique en termes généraux comment fonctionne une pension contributive, pourquoi elle ne remplace généralement qu'une partie du dernier salaire, et pourquoi les travailleurs du secteur informel n'ont souvent aucune pension. Il montre ensuite comment un horizon long rend un investissement modeste et régulier exceptionnellement puissant pour cet objectif.\n\nNous abordons l'arithmétique d'un objectif de retraite, le passage de l'accumulation au prélèvement d'un revenu, le rôle des fonds de distribution et autres actifs générateurs de revenus en fin de vie active, et la dimension familiale propre à la région. Aucun niveau futur de pension n'est prévu ; c'est la méthode que vous emportez.",
    },
    level: "intermediate",
    durationMinutes: 60,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "slate",
    outcomes: {
      en: ["Describe how a contributory pension works in general terms", "Estimate a personal retirement gap under stated assumptions", "Explain why starting early changes the required contribution dramatically", "Distinguish the accumulation and income phases", "Consider the role of income-producing assets in later life"],
      fr: ["Décrire en termes généraux le fonctionnement d'une pension contributive", "Estimer un écart de retraite personnel sous des hypothèses explicites", "Expliquer pourquoi commencer tôt change radicalement le versement nécessaire", "Distinguer la phase d'accumulation et la phase de revenu", "Considérer le rôle des actifs générateurs de revenus en fin de vie active"],
    },
  },
  {
    slug: "investment-psychology",
    category: "wealth",
    title: { en: "Investment Psychology", fr: "Psychologie de l'investisseur" },
    summary: { en: "The mental habits that cost investors money, loss aversion, herd behaviour, overconfidence, and the routines that counter them.", fr: "Les habitudes mentales qui coûtent de l'argent aux investisseurs, aversion aux pertes, comportement moutonnier, excès de confiance, et les routines qui les contrent." },
    description: {
      en: "Most investment mistakes are not errors of knowledge; they are errors of behaviour. This course walks through the best-documented ones: the pain of a loss outweighing the pleasure of an equal gain, the pull of what friends and WhatsApp groups are buying, the confidence that follows a lucky result, and the paralysis that follows a bad one.\n\nEach bias is paired with a practical counter: pre-written rules, automatic contributions, a cooling-off period before any decision, a written record of why each investment was made. The course uses everyday Cameroonian situations rather than textbook abstractions.",
      fr: "La plupart des erreurs d'investissement ne sont pas des erreurs de connaissance ; ce sont des erreurs de comportement. Ce cours parcourt les mieux documentées : la douleur d'une perte qui pèse plus que le plaisir d'un gain équivalent, l'attrait de ce que les amis et les groupes WhatsApp achètent, la confiance qui suit un résultat chanceux, et la paralysie qui suit un mauvais.\n\nChaque biais est associé à une parade pratique : règles écrites à l'avance, versements automatiques, délai de réflexion avant toute décision, trace écrite des raisons de chaque investissement. Le cours s'appuie sur des situations camerounaises du quotidien plutôt que sur des abstractions de manuel.",
    },
    level: "beginner",
    durationMinutes: 45,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "violet",
    outcomes: {
      en: ["Recognise loss aversion, herding and overconfidence in your own decisions", "Explain why recent results distort judgement", "Apply pre-commitment rules to reduce impulsive decisions", "Keep an investment journal", "Use a cooling-off period before buying or selling"],
      fr: ["Reconnaître l'aversion aux pertes, le mimétisme et l'excès de confiance dans vos propres décisions", "Expliquer pourquoi les résultats récents faussent le jugement", "Appliquer des règles d'engagement préalable pour réduire les décisions impulsives", "Tenir un journal d'investissement", "Respecter un délai de réflexion avant d'acheter ou de vendre"],
    },
  },
  {
    slug: "common-financial-mistakes",
    category: "wealth",
    title: { en: "Common Financial Mistakes", fr: "Les erreurs financières courantes" },
    summary: { en: "The errors that set households back years, and the simple checks that prevent each one.", fr: "Les erreurs qui font reculer les ménages de plusieurs années, et les vérifications simples qui préviennent chacune." },
    description: {
      en: "Some mistakes are expensive precisely because they feel sensible at the time: borrowing to invest, investing the emergency fund, concentrating everything in one business or one plot, confusing a target yield with a promise, or chasing last year's winner. This course catalogues the recurring ones with the honesty of someone who has watched them happen.\n\nFor each mistake you will get the warning sign, the underlying reason it is tempting, and the single check that would have caught it. The final lesson turns the list into a personal pre-decision checklist.",
      fr: "Certaines erreurs coûtent cher précisément parce qu'elles paraissent sensées sur le moment : emprunter pour investir, investir le fonds d'urgence, tout concentrer dans une seule entreprise ou un seul terrain, confondre un rendement cible avec une promesse, ou courir après le gagnant de l'an dernier. Ce cours recense les plus récurrentes avec la franchise de quelqu'un qui les a vues se produire.\n\nPour chaque erreur, vous obtiendrez le signe d'alerte, la raison sous-jacente qui la rend tentante, et l'unique vérification qui l'aurait évitée. La dernière leçon transforme la liste en une check-list personnelle à consulter avant toute décision.",
    },
    level: "beginner",
    durationMinutes: 40,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "amber",
    outcomes: {
      en: ["List the most common household financial mistakes", "Explain why each one is tempting", "Apply a single check to prevent each", "Distinguish a target from a promise", "Build a personal pre-decision checklist"],
      fr: ["Énumérer les erreurs financières les plus courantes des ménages", "Expliquer pourquoi chacune est tentante", "Appliquer une vérification unique pour prévenir chacune", "Distinguer une cible d'une promesse", "Construire une check-list personnelle avant décision"],
    },
  },
  {
    slug: "recognizing-investment-scams",
    category: "wealth",
    title: { en: "Recognizing Investment Scams", fr: "Reconnaître les arnaques à l'investissement" },
    summary: { en: "Ponzi schemes, fake forex platforms, 'guaranteed' returns: the patterns, the red flags, and how to verify before you pay.", fr: "Pyramides de Ponzi, fausses plateformes de forex, rendements « garantis » : les schémas, les signaux d'alerte, et comment vérifier avant de payer." },
    description: {
      en: "Fraud follows savings, and the CEMAC region has seen schemes promising monthly returns that no legitimate investment can deliver. This course teaches the anatomy of the common ones: the Ponzi structure that pays early members with later members' money, the fake trading platform with a polished app and no licence, the 'investment club' that cannot explain where returns come from.\n\nYou will learn a short verification routine built on the regulatory framework: is the firm licensed, is the product approved, is the depositary a real bank, can the returns be explained by the assets held? The course also covers what to do, and whom to contact, if you or someone you know has already paid.",
      fr: "La fraude suit l'épargne, et la région CEMAC a connu des montages promettant des rendements mensuels qu'aucun investissement légitime ne peut offrir. Ce cours enseigne l'anatomie des plus courants : la structure de Ponzi qui paie les premiers membres avec l'argent des suivants, la fausse plateforme de trading à l'application soignée et sans agrément, le « club d'investissement » incapable d'expliquer d'où viennent les rendements.\n\nVous apprendrez une routine de vérification courte fondée sur le cadre réglementaire : la société est-elle agréée, le produit est-il approuvé, le dépositaire est-il une vraie banque, les rendements s'expliquent-ils par les actifs détenus ? Le cours couvre aussi quoi faire, et qui contacter, si vous ou un proche avez déjà payé.",
    },
    level: "beginner",
    durationMinutes: 40,
    instructor: "aminata-ndong",
    isFree: true,
    coverTheme: "midnight",
    outcomes: {
      en: ["Describe how Ponzi and fake-platform schemes operate", "Spot the red flags in an offer, starting with 'guaranteed' returns", "Run a verification routine against the regulatory framework", "Explain why legitimate returns can always be traced to assets", "Know the steps to take after a suspected fraud"],
      fr: ["Décrire le fonctionnement des pyramides de Ponzi et des fausses plateformes", "Repérer les signaux d'alerte d'une offre, à commencer par les rendements « garantis »", "Appliquer une routine de vérification fondée sur le cadre réglementaire", "Expliquer pourquoi des rendements légitimes se rattachent toujours à des actifs", "Connaître les démarches après une fraude présumée"],
    },
  },

  // ---- Business and Institutional Finance ----
  {
    slug: "cash-flow-management-for-smes",
    category: "business",
    title: { en: "Cash Flow Management for SMEs", fr: "Gestion de trésorerie pour les PME" },
    summary: { en: "Profit is an opinion, cash is a fact: forecasting, collecting and placing cash in a small business.", fr: "Le bénéfice est une opinion, la trésorerie un fait : prévoir, encaisser et placer la trésorerie d'une petite entreprise." },
    description: {
      en: "Profitable businesses close every year because they ran out of cash. This course is for owners and finance staff of small and medium enterprises who need to see cash coming before it arrives and going before it leaves. We build a thirteen-week cash forecast, tighten the collection cycle, and separate the owner's money from the company's.\n\nThe final module addresses surplus: when a business has cash it will not need for a quarter or a year, what regulated, liquid options exist in CEMAC to place it, and how to document the decision so that the board, the bank and the auditor can follow it.",
      fr: "Des entreprises rentables ferment chaque année faute de trésorerie. Ce cours s'adresse aux dirigeants et aux équipes financières des petites et moyennes entreprises qui doivent voir l'argent arriver avant qu'il n'arrive et partir avant qu'il ne parte. Nous construisons une prévision de trésorerie à treize semaines, resserrons le cycle d'encaissement et séparons l'argent du dirigeant de celui de l'entreprise.\n\nLe dernier module traite de l'excédent : quand une entreprise dispose de liquidités dont elle n'aura pas besoin pendant un trimestre ou un an, quelles options réglementées et liquides existent dans la CEMAC pour les placer, et comment documenter la décision pour que le conseil, la banque et le commissaire aux comptes puissent la suivre.",
    },
    level: "intermediate",
    durationMinutes: 75,
    instructor: "paul-essomba",
    isFree: true,
    featured: true,
    coverTheme: "teal",
    outcomes: {
      en: ["Build and maintain a thirteen-week cash forecast", "Shorten the collection cycle and manage supplier terms", "Separate owner and company finances cleanly", "Identify regulated options for placing surplus cash", "Document treasury decisions for stakeholders"],
      fr: ["Construire et tenir une prévision de trésorerie à treize semaines", "Raccourcir le cycle d'encaissement et gérer les conditions fournisseurs", "Séparer proprement les finances du dirigeant et de l'entreprise", "Identifier les options réglementées pour placer l'excédent de trésorerie", "Documenter les décisions de trésorerie pour les parties prenantes"],
    },
  },
  {
    slug: "corporate-treasury-management",
    category: "business",
    title: { en: "Corporate Treasury Management", fr: "Gestion de trésorerie d'entreprise" },
    summary: { en: "Liquidity, placement, counterparty risk and policy: how a corporate treasury team manages cash at scale.", fr: "Liquidité, placement, risque de contrepartie et politique : comment une équipe de trésorerie d'entreprise gère les liquidités à grande échelle." },
    description: {
      en: "A corporate treasurer's job is to make sure the company can always pay, and that idle cash is not left idle. This course covers the treasury function in a mid-sized CEMAC company: cash pooling across accounts and subsidiaries, bank relationship management, placement of surpluses in deposits, Treasury securities and money-market instruments, and the counterparty limits that keep placements safe.\n\nWe write a treasury policy together, with authorised instruments, maturity ladders, approval thresholds and reporting lines, and discuss how a licensed asset manager can support a treasury team without taking over its responsibility.",
      fr: "Le travail d'un trésorier d'entreprise est de s'assurer que l'entreprise peut toujours payer, et que la trésorerie oisive ne le reste pas. Ce cours couvre la fonction trésorerie d'une entreprise de taille moyenne de la CEMAC : centralisation de trésorerie entre comptes et filiales, gestion des relations bancaires, placement des excédents en dépôts, titres du Trésor et instruments monétaires, et limites de contrepartie qui sécurisent les placements.\n\nNous rédigeons ensemble une politique de trésorerie, avec instruments autorisés, échelonnement des maturités, seuils d'approbation et lignes de reporting, et discutons de la façon dont un gérant d'actifs agréé peut appuyer une équipe de trésorerie sans se substituer à sa responsabilité.",
    },
    level: "advanced",
    durationMinutes: 90,
    instructor: "paul-essomba",
    isFree: true,
    coverTheme: "midnight",
    prerequisites: { en: "Cash Flow Management for SMEs, or equivalent professional experience.", fr: "Gestion de trésorerie pour les PME, ou une expérience professionnelle équivalente." },
    outcomes: {
      en: ["Organise cash visibility across accounts and entities", "Place surpluses within a maturity ladder", "Set counterparty and instrument limits", "Draft a corporate treasury policy", "Define the role of an external asset manager"],
      fr: ["Organiser la visibilité de la trésorerie entre comptes et entités", "Placer les excédents selon un échelonnement de maturités", "Fixer des limites de contrepartie et d'instrument", "Rédiger une politique de trésorerie d'entreprise", "Définir le rôle d'un gérant d'actifs externe"],
    },
  },
  {
    slug: "working-capital-fundamentals",
    category: "business",
    title: { en: "Working Capital Fundamentals", fr: "Fondamentaux du besoin en fonds de roulement" },
    summary: { en: "Receivables, inventory and payables: the cash tied up in running a business, and how to free it.", fr: "Créances, stocks et dettes fournisseurs : la trésorerie immobilisée par l'activité, et comment la libérer." },
    description: {
      en: "Between the moment a business pays its suppliers and the moment its customers pay it, cash is tied up. That gap is working capital, and in many CEMAC businesses it is the largest single use of money. This course measures it, through days of receivables, inventory and payables, and shows how modest changes to each release cash without any new borrowing.\n\nWorked cases include a Douala distributor extending credit to retailers, a Yaoundé manufacturer carrying three months of imported inputs, and a services firm whose invoices are paid at sixty days. The link to investment is direct: cash released from working capital is cash that can be placed.",
      fr: "Entre le moment où une entreprise paie ses fournisseurs et celui où ses clients la paient, la trésorerie est immobilisée. Cet écart est le besoin en fonds de roulement, et dans beaucoup d'entreprises de la CEMAC, c'est le premier emploi de l'argent. Ce cours le mesure, par les délais clients, stocks et fournisseurs, et montre comment de modestes changements sur chacun libèrent de la trésorerie sans nouvel emprunt.\n\nLes cas traités incluent un distributeur de Douala accordant du crédit aux détaillants, un industriel de Yaoundé portant trois mois d'intrants importés, et une société de services dont les factures sont réglées à soixante jours. Le lien avec l'investissement est direct : la trésorerie libérée du besoin en fonds de roulement est une trésorerie qui peut être placée.",
    },
    level: "intermediate",
    durationMinutes: 60,
    instructor: "paul-essomba",
    isFree: true,
    coverTheme: "sky",
    outcomes: {
      en: ["Compute days of receivables, inventory and payables", "Measure the cash conversion cycle", "Identify levers that release cash from operations", "Evaluate the cost of trade credit given and taken", "Connect working capital improvements to placement capacity"],
      fr: ["Calculer les délais clients, stocks et fournisseurs", "Mesurer le cycle de conversion de trésorerie", "Identifier les leviers qui libèrent de la trésorerie d'exploitation", "Évaluer le coût du crédit commercial accordé et obtenu", "Relier les gains de fonds de roulement à la capacité de placement"],
    },
  },
  {
    slug: "institutional-investment-policies",
    category: "business",
    title: { en: "Institutional Investment Policies", fr: "Politiques d'investissement institutionnelles" },
    summary: { en: "How pension funds, insurers, foundations and corporates write the rules that govern their investments.", fr: "Comment caisses de retraite, assureurs, fondations et entreprises rédigent les règles qui encadrent leurs investissements." },
    description: {
      en: "An investment policy statement is the document that turns an institution's objectives, constraints and risk appetite into rules a manager can follow and a board can audit. This advanced course walks through each section: purpose, governance and roles, return objectives, risk limits, eligible instruments, concentration and liquidity rules, benchmarking, reporting and review cycle.\n\nParticipants draft a policy for a fictional CEMAC institution, test it against stress scenarios, and learn how to select, mandate and monitor an external asset manager under it. The course is designed for board members, finance directors and treasury committees.",
      fr: "Une politique d'investissement est le document qui transforme les objectifs, contraintes et appétit pour le risque d'une institution en règles qu'un gérant peut suivre et qu'un conseil peut auditer. Ce cours avancé parcourt chaque section : finalité, gouvernance et rôles, objectifs de rendement, limites de risque, instruments éligibles, règles de concentration et de liquidité, indices de référence, reporting et cycle de révision.\n\nLes participants rédigent une politique pour une institution fictive de la CEMAC, la testent face à des scénarios de stress, et apprennent à sélectionner, mandater et surveiller un gérant d'actifs externe dans ce cadre. Le cours s'adresse aux administrateurs, directeurs financiers et comités de trésorerie.",
    },
    level: "advanced",
    durationMinutes: 120,
    instructor: "paul-essomba",
    isFree: false,
    coverTheme: "slate",
    prerequisites: { en: "Corporate Treasury Management or professional experience in institutional finance.", fr: "Gestion de trésorerie d'entreprise ou une expérience professionnelle en finance institutionnelle." },
    outcomes: {
      en: ["Structure an investment policy statement section by section", "Set return objectives and risk limits consistent with an institution's mission", "Define eligible instruments, concentration and liquidity rules", "Stress-test a policy against adverse scenarios", "Mandate and monitor an external manager under the policy"],
      fr: ["Structurer une politique d'investissement section par section", "Fixer des objectifs de rendement et des limites de risque cohérents avec la mission de l'institution", "Définir instruments éligibles, règles de concentration et de liquidité", "Tester une politique face à des scénarios adverses", "Mandater et surveiller un gérant externe dans ce cadre"],
    },
  },
  {
    slug: "fixed-income-portfolio-fundamentals",
    category: "business",
    title: { en: "Fixed-Income Portfolio Fundamentals", fr: "Fondamentaux du portefeuille obligataire" },
    summary: { en: "Duration, yield, credit and ladders: how a bond portfolio is built, measured and kept within limits.", fr: "Duration, rendement, crédit et échelonnement : comment un portefeuille obligataire est construit, mesuré et maintenu dans ses limites." },
    description: {
      en: "This course opens the toolbox of a fixed-income manager. You will learn to measure a portfolio's sensitivity to rates through duration, to read a yield curve, to build a maturity ladder that spreads reinvestment risk, and to size credit exposures across sovereign and corporate issuers in the CEMAC market.\n\nThe Bond and Interest Rate Explorer is used throughout. By the end you will be able to read a bond fund's holdings report and understand what the manager is positioned for, which is exactly what an informed investor or institutional client should be able to do.",
      fr: "Ce cours ouvre la boîte à outils d'un gérant obligataire. Vous apprendrez à mesurer la sensibilité d'un portefeuille aux taux par la duration, à lire une courbe des taux, à construire un échelonnement de maturités qui répartit le risque de réinvestissement, et à dimensionner les expositions de crédit entre émetteurs souverains et privés sur le marché de la CEMAC.\n\nLe laboratoire Obligations et taux d'intérêt est utilisé tout au long. À la fin, vous saurez lire le rapport de positions d'un fonds obligataire et comprendre à quoi le gérant est positionné, ce qu'un investisseur averti ou un client institutionnel devrait précisément savoir faire.",
    },
    level: "advanced",
    durationMinutes: 90,
    instructor: "thierry-mbarga",
    isFree: true,
    coverTheme: "blue",
    prerequisites: { en: "Government Bonds and Treasury Securities.", fr: "Obligations d'État et titres du Trésor." },
    outcomes: {
      en: ["Compute and interpret duration", "Read a yield curve and what it implies", "Build a maturity ladder", "Size sovereign and corporate credit exposures", "Interpret a bond fund's holdings report"],
      fr: ["Calculer et interpréter la duration", "Lire une courbe des taux et ce qu'elle implique", "Construire un échelonnement de maturités", "Dimensionner les expositions de crédit souverain et privé", "Interpréter le rapport de positions d'un fonds obligataire"],
    },
  },
  {
    slug: "financial-risk-management",
    category: "business",
    title: { en: "Financial Risk Management", fr: "Gestion des risques financiers" },
    summary: { en: "Identifying, measuring and controlling the financial risks a company or institution carries: rates, credit, liquidity, currency and counterparty.", fr: "Identifier, mesurer et maîtriser les risques financiers portés par une entreprise ou une institution : taux, crédit, liquidité, change et contrepartie." },
    description: {
      en: "Every organisation carries financial risk whether it manages it or not. This course gives finance teams a structured method: inventory the exposures, measure each with a simple, defensible metric, set limits, assign ownership and report. Rates, credit, liquidity, currency and counterparty risk are each treated with a CEMAC case.\n\nWe discuss what hedging instruments realistically exist in the regional market, where natural hedges can replace them, and how a risk register and a limits framework fit into governance. The course is practical and template-driven.",
      fr: "Toute organisation porte des risques financiers, qu'elle les gère ou non. Ce cours donne aux équipes financières une méthode structurée : inventorier les expositions, mesurer chacune par un indicateur simple et défendable, fixer des limites, attribuer des responsabilités et rendre compte. Les risques de taux, de crédit, de liquidité, de change et de contrepartie sont chacun traités avec un cas de la CEMAC.\n\nNous discutons des instruments de couverture qui existent réellement sur le marché régional, des cas où des couvertures naturelles peuvent les remplacer, et de la place d'un registre des risques et d'un cadre de limites dans la gouvernance. Le cours est pratique et s'appuie sur des modèles.",
    },
    level: "advanced",
    durationMinutes: 90,
    instructor: "paul-essomba",
    isFree: true,
    coverTheme: "violet",
    outcomes: {
      en: ["Inventory an organisation's financial exposures", "Choose a measurable metric for each risk type", "Set limits and assign ownership", "Assess hedging options available in CEMAC", "Maintain a risk register and reporting cycle"],
      fr: ["Inventorier les expositions financières d'une organisation", "Choisir un indicateur mesurable pour chaque type de risque", "Fixer des limites et attribuer des responsabilités", "Évaluer les options de couverture disponibles dans la CEMAC", "Tenir un registre des risques et un cycle de reporting"],
    },
  },

  // ---- Investment Research & Market Intelligence ----
  {
    slug: "reading-financial-statements",
    category: "research",
    title: { en: "Reading Financial Statements", fr: "Lire les états financiers" },
    summary: { en: "Balance sheet, income statement and cash-flow statement, read the way an analyst reads them, under the OHADA framework.", fr: "Bilan, compte de résultat et tableau des flux de trésorerie, lus comme un analyste les lit, dans le cadre OHADA." },
    description: {
      en: "Financial statements are the only part of a company's story that an outsider can verify. This course teaches you to read the three main statements prepared under the OHADA accounting system used across CEMAC: what each line means, how the statements connect, and which ratios tell you about profitability, solvency and liquidity.\n\nWe work on anonymised, simplified statements of a regional company, learn to spot the gap between accounting profit and cash, and finish with a one-page analyst summary you can produce for any issuer you are asked to assess.",
      fr: "Les états financiers sont la seule partie de l'histoire d'une entreprise qu'un observateur extérieur peut vérifier. Ce cours vous apprend à lire les trois états principaux établis selon le système comptable OHADA en vigueur dans la CEMAC : ce que signifie chaque ligne, comment les états se relient, et quels ratios renseignent sur la rentabilité, la solvabilité et la liquidité.\n\nNous travaillons sur les états anonymisés et simplifiés d'une entreprise régionale, apprenons à repérer l'écart entre bénéfice comptable et trésorerie, et terminons par une synthèse d'analyste en une page que vous pourrez produire pour tout émetteur à évaluer.",
    },
    level: "intermediate",
    durationMinutes: 80,
    instructor: "clarisse-fotso",
    isFree: true,
    coverTheme: "slate",
    outcomes: {
      en: ["Read a balance sheet, income statement and cash-flow statement", "Explain how the three statements connect", "Compute core profitability, solvency and liquidity ratios", "Distinguish accounting profit from cash generation", "Write a one-page analyst summary"],
      fr: ["Lire un bilan, un compte de résultat et un tableau des flux de trésorerie", "Expliquer comment les trois états se relient", "Calculer les ratios essentiels de rentabilité, de solvabilité et de liquidité", "Distinguer bénéfice comptable et génération de trésorerie", "Rédiger une synthèse d'analyste en une page"],
    },
  },
  {
    slug: "analyzing-investment-opportunities",
    category: "research",
    title: { en: "Analyzing Investment Opportunities", fr: "Analyser les opportunités d'investissement" },
    summary: { en: "A repeatable framework for evaluating a bond issue, a listed company or a private proposal before committing money.", fr: "Un cadre reproductible pour évaluer une émission obligataire, une société cotée ou une proposition privée avant d'engager de l'argent." },
    description: {
      en: "Opportunities arrive as a prospectus, a pitch deck or a conversation at a wedding. This course gives you one method for all of them: what is the asset, who is the counterparty, how is the return generated, what can go wrong, how liquid is it, what is it worth under conservative assumptions, and what would make you walk away.\n\nCases include a corporate bond listed on the BVMAC, a Treasury bond auction, a minority stake in a regional agribusiness and a 'guaranteed' real-estate scheme. The last one is included because the method should reject it, and you should see exactly why.",
      fr: "Les opportunités arrivent sous forme de prospectus, de présentation ou de conversation à un mariage. Ce cours vous donne une seule méthode pour toutes : quel est l'actif, qui est la contrepartie, comment le rendement est-il généré, que peut-il mal tourner, quelle est la liquidité, que vaut-il sous des hypothèses prudentes, et qu'est-ce qui vous ferait renoncer.\n\nLes cas incluent une obligation d'entreprise cotée à la BVMAC, une adjudication d'obligation du Trésor, une participation minoritaire dans une agro-industrie régionale et un montage immobilier « garanti ». Ce dernier est inclus parce que la méthode doit le rejeter, et vous devez voir exactement pourquoi.",
    },
    level: "advanced",
    durationMinutes: 100,
    instructor: "clarisse-fotso",
    isFree: false,
    coverTheme: "midnight",
    prerequisites: { en: "Reading Financial Statements and Understanding Risk and Return.", fr: "Lire les états financiers et Comprendre le risque et le rendement." },
    outcomes: {
      en: ["Apply a seven-question evaluation framework to any opportunity", "Trace how a proposed return is generated", "Value an instrument under conservative assumptions", "Assess liquidity and exit options", "Document a decision, including a decision to decline"],
      fr: ["Appliquer un cadre d'évaluation en sept questions à toute opportunité", "Retracer la façon dont un rendement proposé est généré", "Valoriser un instrument sous des hypothèses prudentes", "Évaluer la liquidité et les options de sortie", "Documenter une décision, y compris une décision de refus"],
    },
  },
  {
    slug: "understanding-interest-rates",
    category: "research",
    title: { en: "Understanding Interest Rates", fr: "Comprendre les taux d'intérêt" },
    summary: { en: "Where rates come from, how the BEAC's decisions ripple through deposits, loans and bonds, and what a yield curve tells you.", fr: "D'où viennent les taux, comment les décisions de la BEAC se propagent aux dépôts, crédits et obligations, et ce qu'une courbe des taux vous dit." },
    description: {
      en: "An interest rate is the price of time. This course explains how the BEAC sets its policy rates, how those rates pass through to bank deposit and lending rates, and how they shape the yields at which CEMAC states borrow. You will learn to read a yield curve, to separate real from nominal rates, and to understand why a rate rise lowers bond prices.\n\nThe second half is applied: what a rate change does to a bond fund's NAV, to a company's borrowing cost and to a household's loan repayments, using the Bond and Interest Rate Explorer throughout.",
      fr: "Un taux d'intérêt est le prix du temps. Ce cours explique comment la BEAC fixe ses taux directeurs, comment ceux-ci se transmettent aux taux de dépôt et de crédit des banques, et comment ils façonnent les taux auxquels les États de la CEMAC empruntent. Vous apprendrez à lire une courbe des taux, à distinguer taux réels et nominaux, et à comprendre pourquoi une hausse des taux fait baisser le prix des obligations.\n\nLa seconde moitié est appliquée : ce qu'une variation de taux fait à la valeur liquidative d'un fonds obligataire, au coût d'emprunt d'une entreprise et aux mensualités d'un ménage, avec le laboratoire Obligations et taux d'intérêt tout au long.",
    },
    level: "intermediate",
    durationMinutes: 60,
    instructor: "clarisse-fotso",
    isFree: true,
    coverTheme: "sky",
    outcomes: {
      en: ["Describe how the BEAC sets and transmits policy rates", "Read a yield curve", "Separate real and nominal rates", "Explain the inverse relationship between rates and bond prices", "Trace the effect of a rate change on funds, companies and households"],
      fr: ["Décrire comment la BEAC fixe et transmet ses taux directeurs", "Lire une courbe des taux", "Distinguer taux réels et nominaux", "Expliquer la relation inverse entre taux et prix des obligations", "Retracer l'effet d'une variation de taux sur les fonds, les entreprises et les ménages"],
    },
  },
  {
    slug: "fundamentals-of-investment-research",
    category: "research",
    title: { en: "Fundamentals of Investment Research", fr: "Fondamentaux de la recherche en investissement" },
    summary: { en: "How a research note is built: sources, hypotheses, evidence, valuation, risks and a clear conclusion.", fr: "Comment se construit une note de recherche : sources, hypothèses, preuves, valorisation, risques et conclusion claire." },
    description: {
      en: "Investment research is disciplined curiosity. This advanced course teaches the craft: framing a question, gathering primary sources, from regulatory filings to central bank bulletins, building and testing hypotheses, valuing an instrument with explicit assumptions, listing the risks honestly and writing a conclusion someone can act on.\n\nParticipants produce a full research note on a CEMAC sovereign issuer or listed company, peer-review each other's work, and learn the standards of independence and disclosure that separate research from marketing.",
      fr: "La recherche en investissement est une curiosité disciplinée. Ce cours avancé enseigne le métier : formuler une question, rassembler des sources primaires, des dépôts réglementaires aux bulletins de la banque centrale, construire et tester des hypothèses, valoriser un instrument avec des hypothèses explicites, lister honnêtement les risques et rédiger une conclusion exploitable.\n\nLes participants produisent une note de recherche complète sur un émetteur souverain ou une société cotée de la CEMAC, évaluent mutuellement leurs travaux, et apprennent les normes d'indépendance et de transparence qui distinguent la recherche du marketing.",
    },
    level: "advanced",
    durationMinutes: 120,
    instructor: "clarisse-fotso",
    isFree: false,
    coverTheme: "violet",
    prerequisites: { en: "Reading Financial Statements and Analyzing Investment Opportunities.", fr: "Lire les états financiers et Analyser les opportunités d'investissement." },
    outcomes: {
      en: ["Frame a research question and identify primary sources", "Build and test investment hypotheses", "Value an instrument with explicit, documented assumptions", "Write a research note with a clear conclusion and risk section", "Apply independence and disclosure standards"],
      fr: ["Formuler une question de recherche et identifier les sources primaires", "Construire et tester des hypothèses d'investissement", "Valoriser un instrument avec des hypothèses explicites et documentées", "Rédiger une note de recherche avec une conclusion claire et une section risques", "Appliquer les normes d'indépendance et de transparence"],
    },
  },
  {
    slug: "macroeconomic-indicators",
    category: "research",
    title: { en: "Macroeconomic Indicators", fr: "Indicateurs macroéconomiques" },
    summary: { en: "Growth, inflation, public finances, external balances and reserves: the numbers that move CEMAC markets and where to find them.", fr: "Croissance, inflation, finances publiques, balances extérieures et réserves : les chiffres qui font bouger les marchés de la CEMAC et où les trouver." },
    description: {
      en: "Markets react to data. This course teaches you which macroeconomic indicators matter for a CEMAC investor, how each is defined, where it is published, by the BEAC, national statistics institutes, the IMF and others, and how to read a release without over-interpreting a single number.\n\nWe cover output growth, inflation, fiscal balances and public debt, the current account, foreign reserves and oil revenues, and connect each to its effect on interest rates, sovereign credit and, ultimately, the value of a bond portfolio. The course does not forecast; it teaches you to read.",
      fr: "Les marchés réagissent aux données. Ce cours vous apprend quels indicateurs macroéconomiques comptent pour un investisseur de la CEMAC, comment chacun est défini, où il est publié, par la BEAC, les instituts nationaux de statistique, le FMI et d'autres, et comment lire une publication sans sur-interpréter un chiffre isolé.\n\nNous couvrons la croissance, l'inflation, les soldes budgétaires et la dette publique, le compte courant, les réserves de change et les recettes pétrolières, et relions chacun à son effet sur les taux d'intérêt, le crédit souverain et, en fin de compte, la valeur d'un portefeuille obligataire. Le cours ne prévoit pas ; il apprend à lire.",
    },
    level: "intermediate",
    durationMinutes: 70,
    instructor: "clarisse-fotso",
    isFree: true,
    coverTheme: "green",
    outcomes: {
      en: ["Define the key macroeconomic indicators for CEMAC", "Locate official sources for each indicator", "Interpret a data release in context", "Connect indicators to interest rates and sovereign credit", "Avoid common over-interpretation errors"],
      fr: ["Définir les indicateurs macroéconomiques clés de la CEMAC", "Localiser les sources officielles de chaque indicateur", "Interpréter une publication de données dans son contexte", "Relier les indicateurs aux taux d'intérêt et au crédit souverain", "Éviter les erreurs courantes de sur-interprétation"],
    },
  },
  {
    slug: "evaluating-investment-claims",
    category: "research",
    title: { en: "Evaluating Investment Claims", fr: "Évaluer les promesses d'investissement" },
    summary: { en: "Target yields, past performance, 'secured' and 'guaranteed': how to test every claim in a brochure or pitch.", fr: "Rendements cibles, performances passées, « sécurisé » et « garanti » : comment tester chaque affirmation d'une brochure ou d'un argumentaire." },
    description: {
      en: "Every investment document makes claims. Some are facts, some are targets, some are hopes and some are false. This course gives you a vocabulary and a method for telling them apart: what a target yield is and is not, what a past performance figure actually measured, what 'capital protection' legally means, and what questions turn a vague claim into a testable one.\n\nUsing real document structures, information documents, management regulations, brochures, you will learn where the legally binding statements sit, where the marketing sits, and how a regulator's visa relates to each. The course ends with a checklist you can run against any proposal in under ten minutes.",
      fr: "Tout document d'investissement avance des affirmations. Certaines sont des faits, d'autres des cibles, d'autres des espoirs, d'autres encore sont fausses. Ce cours vous donne un vocabulaire et une méthode pour les distinguer : ce qu'un rendement cible est et n'est pas, ce qu'un chiffre de performance passée a réellement mesuré, ce que « protection du capital » signifie juridiquement, et quelles questions transforment une affirmation vague en affirmation vérifiable.\n\nÀ partir de structures documentaires réelles, notices d'information, règlements de gestion, brochures, vous apprendrez où se trouvent les énoncés juridiquement contraignants, où se trouve le marketing, et comment le visa du régulateur se rapporte à chacun. Le cours se termine par une check-list applicable à toute proposition en moins de dix minutes.",
    },
    level: "intermediate",
    durationMinutes: 55,
    instructor: "clarisse-fotso",
    isFree: true,
    coverTheme: "amber",
    outcomes: {
      en: ["Classify claims as fact, target, hope or falsehood", "Explain what a target yield and a past performance figure each mean", "Locate binding statements in fund documentation", "Relate a regulator's visa to the claims in a brochure", "Run a ten-minute claim-testing checklist"],
      fr: ["Classer les affirmations en fait, cible, espoir ou contre-vérité", "Expliquer ce que signifient un rendement cible et un chiffre de performance passée", "Localiser les énoncés contraignants dans la documentation d'un fonds", "Relier le visa du régulateur aux affirmations d'une brochure", "Appliquer une check-list de vérification en dix minutes"],
    },
  },
];
