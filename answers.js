/* ============================================================
   ANSWER ENGINE
   Method: the story-bank approach used by Fortuna, Stacy Blackman,
   mbaMission and Menlo Coaching. ~14 stories answer ~90% of questions.
   Delivery: STAR, 60–90 seconds, ~20% situation+task, 60% action,
   20% result. "I", not "we", in the action.

   [SQUARE BRACKETS] are facts only she knows. They are deliberately
   left blank — a model answer with invented metrics is worse than no
   model answer, because it gets used.
   ============================================================ */

const STORY_BANK = [
  { id: "s1", name: "The signature project", proves: "Analytical judgement, client impact, ownership",
    answers: ["Biggest accomplishment", "Impact", "Day-to-day role", "Quantified results", "Why you're ready"],
    build: "One ZS engagement, end to end. Client scale, the decision that changed, and the number attached to it. This is the story you will tell more than any other — it must be airtight.",
    slots: ["Client type and size", "The commercial question", "What you specifically did", "The decision that changed", "₹ or % outcome"],
    strong: "A named commercial decision that moved because of analysis you owned, with a figure.",
    weak: "\"I built a model that helped the client understand their market.\" No decision, no number, no you." },

  { id: "s2", name: "Leadership without authority", proves: "Influence, initiative, the thing HBS and Stanford score hardest",
    answers: ["Leadership style", "Influencing others", "Unpopular idea", "Getting support", "Overstepping authority"],
    build: "A time you moved something without the title to do it. If nothing at ZS qualifies yet, this is the gap to close in the next ten weeks — it is the most-asked theme across every school on your list.",
    slots: ["What needed to change", "Why you had no authority", "How you built the coalition", "Resistance you met", "What actually changed"],
    strong: "You persuaded someone senior to reverse a position, and it stuck.",
    weak: "Anything where your job description already required you to do it." },

  { id: "s3", name: "The failure you own", proves: "Self-awareness, resilience, coachability",
    answers: ["Tell me about a failure", "Something that didn't go to plan", "A mistake", "Feedback that surprised you"],
    build: "A real professional failure with consequences, where the cause was you. Not 'I worked too hard'. Ross, MIT and Judge ask this almost every time.",
    slots: ["What you got wrong", "The consequence", "How you found out", "What you did in the next 48 hours", "What you do differently now"],
    strong: "You name the misjudgement plainly, then show the changed behaviour with evidence it stuck.",
    weak: "A disguised strength, or a failure caused by someone else." },

  { id: "s4", name: "Conflict and the difficult conversation", proves: "Emotional intelligence, maturity",
    answers: ["Disagreement with a colleague", "Disagreed with senior management", "Difficult conversation", "Dysfunctional team"],
    build: "A disagreement where you were partly wrong, or where you changed your position. Interviewers distrust conflict stories where the candidate is entirely right.",
    slots: ["The disagreement", "Their position and why it was reasonable", "How you raised it", "Where you moved", "The outcome and the relationship after"],
    strong: "You sought out their reasoning before defending yours, and the relationship survived.",
    weak: "\"They were wrong and eventually they saw it my way.\"" },

  { id: "s5", name: "The Abhyas climb", proves: "Sustained leadership, escalation, building something",
    answers: ["Leadership", "What you did outside work", "Undergraduate leadership", "Building a team", "Community"],
    build: "Sub-Coordinator to Vice President over 2y4m, in one organisation. Tell it as escalation, not as a list. Most applicants collected five clubs; you climbed one.",
    slots: ["What Abhyas did and its scale", "What you changed as VP that outlasted you", "A person you developed", "A number — students placed, companies onboarded, events run"],
    strong: "Something you built that still ran after you left.",
    weak: "Listing four titles without saying what changed under each." },

  { id: "s6", name: "Why an MBA, why now, why not here", proves: "Goal clarity — the single highest-weighted item",
    answers: ["Why an MBA", "Why can't you do this at ZS", "Why now", "Career goals", "Post-MBA plan"],
    build: "This decides your candidacy. It must be a change of SCOPE and DOMAIN, not of employer. Ninety seconds, no notes.",
    slots: ["What you own now vs what you want to own", "The specific capability you lack", "Why the timing is now and not in two years", "Plan A and a credible Plan B"],
    strong: "\"I produce the analytics that inform one function of one industry's commercial decisions. I want to own the whole decision, across industries — and I want the general-management toolkit to work on Indian healthcare access at a systems level, a problem I can already see in my data but cannot act on from where I sit.\"",
    weak: "\"Better brand, better placements, bigger network.\" This is a rejection." },

  { id: "s7", name: "The India thesis", proves: "Purpose, specificity, long-term vision",
    answers: ["Long-term goals", "Where do you see yourself in 10-15 years", "Impact", "Social change", "Why go home"],
    build: "Name a sector, a specific failure in it, and a mechanism. 'Structural change in India' is the most common sentence in the Indian applicant pool and is worth zero. You have three years of pharma commercial data — almost nobody else applying can write specifically about Indian healthcare access.",
    slots: ["The sector", "The specific failure you have seen in data", "Who it harms and how many", "The mechanism you would use", "What you have already done about it"],
    strong: "A failure you can describe from your own work, not from a news article.",
    weak: "\"I want to come back and create impact in India.\"" },

  { id: "s8", name: "Working across difference", proves: "Inclusion, global readiness — heavily weighted at INSEAD, LBS, HEC",
    answers: ["Diverse perspectives", "Making a team inclusive", "Global environment", "Changing cultures", "Different from yourself"],
    build: "Your weakest evidence area because you have never worked outside India. Use cross-functional, cross-geography client work, or the NSS media wing, and be honest that international work is what you are seeking rather than what you have.",
    slots: ["The difference — function, geography, seniority, background", "What you initially got wrong", "What you changed in how you worked", "The outcome"],
    strong: "Naming what you misjudged about the other party first.",
    weak: "Claiming international experience from a remote internship. Interviewers check." },

  { id: "s9", name: "The promotion", proves: "Trajectory, external validation",
    answers: ["Career progression", "Why you were promoted", "Recognition", "How others describe you"],
    build: "Associate → Associate Consultant in 2y10m, June 2026. Find out where that sat against your cohort. If it was early, say so — it is the strongest recent evidence you have.",
    slots: ["Cohort timing — early, on-track, or how many were promoted", "What changed in your scope", "The specific thing that earned it"],
    strong: "\"I was promoted [n] months ahead of the typical clock because [specific thing].\"",
    weak: "Stating the promotion without saying what it was for." },

  { id: "s10", name: "The initiative you started", proves: "Self-direction, the gap in your file",
    answers: ["Something not required of you", "Proactive project", "Creating something", "Entrepreneurial instinct"],
    build: "You currently have none post-2023. Start one now — a women-in-analytics circle, a campus hiring pipeline, a training asset, a knowledge repository. By October it becomes a story. By January it becomes a result.",
    slots: ["The gap you noticed", "Why nobody else fixed it", "What you built", "Who uses it now", "The number"],
    strong: "It exists, it has users, and it has a name.",
    weak: "An idea you proposed that never shipped." },

  { id: "s11", name: "Quantitative credibility", proves: "You can handle the coursework — asked of every non-engineer",
    answers: ["Quantitative rigour", "Why statistics", "Academic record", "The CGPA question"],
    build: "A statistics honours degree from a top-five Indian college plus three years of applied analytics is a stronger quant case than most engineers can make. Answer the 8.3 CGPA directly, without defensiveness, and move to evidence.",
    slots: ["Hardest quantitative work you have done", "A technique you taught yourself", "GRE quant score", "Any additional coursework"],
    strong: "\"Honours statistics at [YOUR UNIVERSITY] marks hard — my [CGPA] sits in the [x] percentile of my cohort. Since then I have [specific technical work]. My GRE quant is [x].\"",
    weak: "Apologising, or blaming the grading system without the percentile to back it." },

  { id: "s12", name: "The creative pivot evidence", proves: "That the switch is real, not aspirational",
    answers: ["Why marketing", "Why the switch", "Evidence of taste", "Creative initiative"],
    build: "If you target brand, luxury, media or product, every interviewer asks what you have actually done. A statistics consultant claiming she wants brand management with nothing on her record is a story, not a candidate. This must exist before you apply.",
    slots: ["The side project, pro-bono brand work, or written point of view", "What you learned that you couldn't from data", "Why your analytical background is an advantage here, not a handicap"],
    strong: "Something a stranger can look at.",
    weak: "\"I've always been interested in brands.\"" },

  { id: "s13", name: "Why this school, specifically", proves: "Research depth, genuine fit",
    answers: ["Why us", "What will you contribute", "Which clubs", "How will you use our resources", "Is anything here going to challenge you"],
    build: "Needs to be rebuilt per school and must reference things you could only know from a conversation or a visit — a professor, a specific elective, a club, a trek, a named alum you spoke to.",
    slots: ["Two named courses or professors", "One club and what you'd do in it", "Two people you spoke to and what they said", "One thing that will genuinely be hard for you there"],
    strong: "Naming a person you spoke to and what they told you that changed your mind.",
    weak: "Anything you could copy-paste to another school's essay." },

  { id: "s14", name: "Who you are off the record", proves: "Likeability, texture, memorability",
    answers: ["What do you do for fun", "Something not on your resume", "Tell me about yourself", "Fun fact", "What makes you feel alive"],
    build: "Adcoms read hundreds of high-achievers. The thing they remember is rarely professional. Pick something true and specific — Bengali literature, a place, a habit, a strange skill. Not 'travel and reading'.",
    slots: ["The genuine thing", "Why it matters to you", "A specific detail that makes it yours"],
    strong: "One concrete image a stranger would repeat to a colleague.",
    weak: "Hobbies chosen to look well-rounded." }
];

const MODEL_ANSWERS = [
  { q: "Why do you want an MBA? / Why can't you do this at ZS?", story: "s6", schools: "Every school. This is the highest-stakes question you will be asked.",
    scored: "Goal clarity, self-awareness, and whether the MBA is necessary rather than convenient. Adcoms are testing whether you have thought past the credential.",
    shape: "15s where you are now · 25s the specific limitation · 25s what the MBA gives you that nothing else does · 25s the concrete post-MBA plan",
    model: "At ZS I sit inside one function of one industry. I build the analytics that inform pharma commercial decisions — pricing, segmentation, launch planning — and I'm good at it. [SIGNATURE PROJECT, ONE LINE WITH THE NUMBER.]\n\nWhat I've learned is that I keep handing my analysis to someone else at the point where the interesting decision gets made. I can tell a client which segment to prioritise; I can't sit in the room where they decide whether to enter the market at all. That's not a title problem — it's a toolkit problem. I've never run a P&L, never built a brand, never made a capital-allocation call.\n\nI want the MBA for two things specifically. General management breadth I cannot get inside an analytics function, and a network outside Indian pharma — right now every person who could hire me works in one industry in one country.\n\nAfter the MBA I want [CONSULTING / BRAND / PRODUCT] at [TWO NAMED FIRMS], because it's the fastest route to owning decisions across industries. Longer term I want to work on Indian healthcare access, which is the one problem I can already see in my data and can't act on from where I sit.",
    kills: ["Saying 'better brand' or 'better placements' — it reads as status-seeking and it is an instant downgrade.", "Being vague about the post-MBA role. 'Strategy' is not a job.", "Criticising ZS. Never. It makes you look like you'd criticise them too."] },

  { q: "Tell me about yourself. / Walk me through your resume.", story: "s14", schools: "Almost always the opener. HEC's is blind — the interviewer has only your CV.",
    scored: "Whether you can structure a narrative, and whether your path has logic. They are also just deciding if they like you.",
    shape: "10s where you're from · 20s the choice that started this · 30s what you've done · 20s why you're sitting here",
    model: "I'm from [CITY] — [ONE SPECIFIC, TRUE DETAIL THAT ISN'T ABOUT WORK].\n\nI took statistics at [YOUR COLLEGE] rather than engineering, which was unusual in my school cohort, because I wanted to work on questions where the data was messy and the answer was arguable rather than computed. That's still what I like about my job.\n\nI joined ZS in 2023 in decision analytics, working on pharma commercial strategy. Over three years I've [SCOPE — CLIENTS, GEOGRAPHIES, TEAM], and I was promoted to Associate Consultant in June [ADD: EARLY, IF IT WAS].\n\nAlongside that, the thing I'm proudest of is actually from college — I ran the internship cell at Hindu, and [WHAT CHANGED UNDER YOU].\n\nI'm here because I've hit the edge of what an analytics role lets me decide, and I want to be on the other side of that handoff.",
    kills: ["Reciting your CV chronologically. They have it.", "Starting with school marks.", "More than 90 seconds. This is a warm-up, not the answer."] },

  { q: "Tell me about a time you failed.", story: "s3", schools: "Ross asks this almost every interview. MIT, Judge, IESE, Booth also.",
    scored: "Whether you can name a real fault without deflecting, and whether you actually changed. Coachability is being measured, not the failure.",
    shape: "15s the situation · 10s what you got wrong · 20s the consequence · 35s what you did about it · 10s what's different now",
    model: "[SITUATION: A PROJECT WHERE YOU MISJUDGED SOMETHING — SCOPE, A STAKEHOLDER, A DATA ASSUMPTION.]\n\nWhat I got wrong was [THE MISJUDGEMENT, STATED PLAINLY IN ONE SENTENCE, NO HEDGING]. The consequence was [CONCRETE — Rework, a missed date, a client meeting that went badly, a number].\n\nI found out when [HOW — ideally not from your manager; ideally you caught it].\n\nWhat I did was [THE 48 HOURS: told whom, fixed what, at what cost to yourself]. The part I'd defend is that I raised it before it compounded. The part I don't defend is that I should have [THE CHECK YOU SKIPPED].\n\nSince then I [THE CHANGED BEHAVIOUR — a habit, a checklist, a standing question you now ask at kickoff]. On [LATER PROJECT] that caught [SPECIFIC THING] before it became a problem.",
    kills: ["A failure that is secretly a strength. Interviewers have a name for it and they score it down.", "A failure caused by someone else.", "No evidence the change stuck. The last sentence is the whole answer."] },

  { q: "Tell me about a time you led without formal authority.", story: "s2", schools: "Wharton, Stanford, Booth, MIT, LBS. The most-repeated theme across your list.",
    scored: "Influence. Schools explicitly say they do not equate leadership with headcount or title.",
    shape: "15s what needed to change · 10s why you had no authority · 40s how you built support · 15s the resistance · 20s the outcome",
    model: "[WHAT NEEDED TO CHANGE — a process, an approach, a client recommendation nobody wanted to make.]\n\nI had no authority over any of it — [WHY: they were senior to you / another team / the client].\n\nSo I did three things. First I [GOT THE EVIDENCE — the analysis that made the case undeniable]. Second I [WENT TO THE ONE PERSON whose support unlocked the rest, and what you offered them]. Third I [MADE IT EASY TO SAY YES — a pilot, a small version, taking the work onto yourself].\n\nThe resistance came from [WHO AND WHY — and take their objection seriously in how you describe it].\n\nIn the end [WHAT CHANGED AND THE NUMBER]. What I took from it is that [THE ACTUAL LESSON — usually about sequencing who you talk to first].",
    kills: ["A story where your job description already required it.", "Saying 'we' during the action. Every 'we' is a point lost.", "No resistance in the story — then there was nothing to lead through."] },

  { q: "What are your short-term and long-term career goals?", story: "s6", schools: "Every school, in the essays and the interview.",
    scored: "Specificity and believability. Adcoms check whether your short-term goal is reachable from where you stand and whether the long-term goal explains the short-term one.",
    shape: "25s short-term, named · 20s why it's reachable from here · 30s long-term · 15s how the first serves the second",
    model: "Short term, I want to join [NAMED FIRM TYPE — e.g. MBB strategy / brand management at a global CPG / product at a health-tech firm] in [GEOGRAPHY], working on [SPECIFIC PROBLEM TYPE].\n\nThat's reachable because three years of pharma commercial analytics is the same muscle — pricing, segmentation, launch strategy — applied to one industry. The MBA broadens the industries and moves me from producing the analysis to owning the recommendation.\n\nLong term I want to work on healthcare access in India. [THE SPECIFIC FAILURE YOU HAVE SEEN IN YOUR DATA — e.g. a therapy area where the drug exists, the price is reachable, and it still doesn't reach tier-2 cities because of X.] I want to build or run the thing that fixes that.\n\nThe short-term role serves the long-term one because I can't fix a distribution problem in Indian healthcare without first having run something at scale, and because [FIRM TYPE] is where I learn to do that fastest.",
    kills: ["A long-term goal with no mechanism.", "A short-term goal that doesn't obviously lead to the long-term one.", "Naming an industry with no named firms."] },

  { q: "What will you contribute to the class / your study group?", story: "s13", schools: "INSEAD asks this directly. Kellogg, Fuqua, Columbia, Judge.",
    scored: "Whether you understand that an MBA class is a teaching resource, and whether you know what is scarce.",
    shape: "20s what you bring that's scarce · 30s a concrete example of you doing it · 20s what you'll take from others",
    model: "Two things that are scarce in an MBA classroom. First, healthcare and pharma — the commercial side, not the science. When a case is about drug pricing, market access or launch sequencing, I've done the actual work. Second, I'm a statistician rather than an engineer or a banker, which means I tend to argue about whether the data supports the claim rather than about the model.\n\nConcretely — [EXAMPLE OF YOU TEACHING SOMEONE SOMETHING AT ZS OR AT ABHYAS: what they didn't know, how you explained it, what they did with it].\n\nWhat I'll be leaning on the group for is honest: I've worked in one country, in one industry, at one firm. I want to be the person in the group who asks the naive question about a market I've never seen, and I'd rather do that in a study group than in front of a client.",
    kills: ["'Diverse perspective' with no content.", "Only saying what you'll give. INSEAD explicitly asks what you'd lean on the group for."] },

  { q: "How will you handle a class of 60+ nationalities / a global environment?", story: "s8", schools: "INSEAD, HEC, IESE, LBS, IMD. Weighted heavily.",
    scored: "Whether you have evidence, and whether you're self-aware about not having much.",
    shape: "20s honest framing · 40s the closest real evidence you have · 20s what you'll do about the gap",
    model: "I'll answer that honestly, because I think the honest version is stronger. I've never worked outside India. My international exposure is cross-border client work rather than living somewhere else — [SPECIFIC: which geographies your ZS clients or teams span, and what you had to adapt].\n\nThe closest real thing I have is [EXAMPLE — a global client team, a stakeholder in another timezone whose expectations differed, adapting a recommendation for a market you'd never visited]. What I got wrong initially was [SPECIFIC ASSUMPTION]. What I changed was [SPECIFIC].\n\nSo the honest position is that this is the thing I'm coming for, not the thing I already have. I speak Bengali, Hindi and English, and I have working French — [WHY YOU STARTED FRENCH]. At INSEAD I'd take the language requirement in French rather than the easiest option, because I'd rather come out of it able to actually work in a second language.",
    kills: ["Overclaiming the IBM internship. It says 'United Kingdom · Remote' and they will spot it.", "Pretending the gap isn't there. Naming it is the stronger move."] },

  { q: "Tell me about a time you had a disagreement with a colleague or with senior management.", story: "s4", schools: "Columbia, MIT, Tepper, Judge, and general.",
    scored: "Emotional intelligence and whether you can be wrong. They distrust stories where you're entirely right.",
    shape: "15s the disagreement · 20s their position, taken seriously · 30s how you raised it · 20s where you moved · 15s the outcome and the relationship",
    model: "[THE DISAGREEMENT — ideally about substance, e.g. a recommendation you thought was wrong, an approach, a scope call.]\n\nTheir position was [STATE IT FAIRLY, AND WHY IT WAS REASONABLE — this is the part being scored]. They had [CONTEXT/EXPERIENCE] that I didn't.\n\nI asked for [FIFTEEN MINUTES / A SPECIFIC SETTING] rather than raising it in the room, and I opened by asking [THE QUESTION YOU ASKED TO UNDERSTAND THEIR REASONING] before saying what I thought.\n\nWhere I moved was [SPECIFIC — you were partly wrong about something]. Where I held was [SPECIFIC], and I held it because [EVIDENCE].\n\nWe ended up [OUTCOME]. The relationship [WHAT HAPPENED AFTER — ideally they came to you again].",
    kills: ["Being entirely right.", "Escalating over someone's head as the resolution.", "A disagreement about something trivial."] },

  { q: "Why this school specifically?", story: "s13", schools: "Every school. Generic answers are the most common reason strong candidates get rejected.",
    scored: "Research depth and genuine fit. Adcoms recognise a template instantly.",
    shape: "20s the one structural reason · 30s two specifics only you'd know · 20s who you spoke to · 20s what will be hard for you there",
    model: "[STRUCTURAL REASON — the one thing about this school that maps to your plan. e.g. for Kellogg: 'ZS was founded by two Kellogg professors, Andris Zoltners and Prabhakant Sinha, and the methodology I've used every day for three years descends from their research. I want to learn it from the source and then go beyond it.']\n\nSpecifically I want [NAMED COURSE OR PROFESSOR AND WHY] and [NAMED CLUB, LAB, TREK OR CENTRE AND WHAT YOU'D DO IN IT].\n\nI spoke to [NAME], [CLASS YEAR], who told me [SOMETHING THAT CHANGED YOUR VIEW — including something that gave you pause]. I also spoke to [NAME] about [SPECIFIC].\n\nThe part I expect to find hard is [HONEST — the case method if you've never done it, the pace, being younger than the cohort, cold-calling]. I'd rather be uncomfortable there than comfortable somewhere with less range.",
    kills: ["Anything you could paste into another school's answer.", "Quoting the website back at them.", "Claiming everything will be easy."] },

  { q: "What is your greatest accomplishment?", story: "s1", schools: "Yale, Fuqua, HEC, and general.",
    scored: "Judgement about what counts as an accomplishment, and whether you can quantify.",
    shape: "15s context and scale · 15s what made it hard · 40s what you specifically did · 20s the result with the number",
    model: "[THE ENGAGEMENT: client type, scale, and the commercial question. e.g. 'A [SIZE] pharma client was deciding whether to [DECISION] in [MARKET].']\n\nIt was hard because [THE REAL CONSTRAINT — bad data, conflicting stakeholders, a short window, a counterintuitive answer].\n\nWhat I did was [THREE CONCRETE ACTIONS, EACH STARTING WITH 'I']. The judgement call I'm proudest of is [THE NON-OBVIOUS DECISION YOU MADE].\n\nThe outcome was [THE NUMBER — revenue influenced, cost avoided, % change, decision reversed]. [IF POSSIBLE: what happened afterwards that proved it right.]",
    kills: ["No number. This is the whole point of the question.", "An accomplishment where you were one of eight people.", "Choosing something from college when you have three years of work."] },

  { q: "What is your greatest weakness? / What would you improve?", story: "s3", schools: "INSEAD's motivation essay asks directly. Booth, Judge, and general.",
    scored: "Genuine self-awareness. Fake weaknesses are transparent and are scored as evasion.",
    shape: "15s the weakness, named plainly · 25s a concrete cost it has had · 40s what you're doing about it · 10s where you still are",
    model: "[A REAL ONE. Candidates for you, pick the true one: over-preparing before you'll commit to a view; going deep on analysis when the client needed a decision; reluctance to push back on senior stakeholders; struggling to delegate.]\n\nIt's cost me concretely — [SPECIFIC INCIDENT WHERE IT HURT THE WORK].\n\nWhat I've done is [SPECIFIC MECHANISM, NOT AN INTENTION — e.g. 'I now write my recommendation in one line before I build the model, and I make myself defend it at the halfway point rather than at the end']. [EVIDENCE IT'S WORKING.]\n\nI'm not fixed. [WHERE IT STILL SHOWS UP.] But the gap between noticing it and correcting it is now [DAYS, NOT WEEKS].",
    kills: ["'I'm a perfectionist' / 'I work too hard' / 'I care too much'. These are scored as dishonesty.", "A weakness with no cost attached.", "Claiming to have solved it."] },

  { q: "How are you prepared for the quantitative rigour of the programme?", story: "s11", schools: "Georgetown asks directly. Asked of every non-engineering applicant.",
    scored: "Whether you'll survive the core. For you it's an easy question — answer it with evidence and move on.",
    shape: "20s the degree · 30s applied evidence · 15s the test score · 15s anything additional",
    model: "I did Statistics Honours at [YOUR COLLEGE], Delhi University — three years of probability, inference, regression and stochastic processes, not a quantitative minor.\n\nSince then I've spent three years doing applied statistics commercially: [SPECIFIC METHODS YOU USE — e.g. segmentation, forecasting, response modelling, sales-force sizing] on [DATA SCALE]. [ONE TECHNICAL THING YOU TAUGHT YOURSELF.]\n\nMy GRE quant is [SCORE].\n\n[IF ASKED ABOUT THE 8.3:] Delhi University marks honours statistics hard — [YOUR PERCENTILE IN COHORT, IF YOU KNOW IT]. I'd point at the three years of applied work since as the better evidence.",
    kills: ["Defensiveness about the CGPA.", "Blaming the grading system without a percentile to back it.", "Underselling — a statistics honours degree is a stronger quant signal than most engineering degrees."] },

  { q: "You already work in consulting. Isn't this a lateral move?", story: "s6", schools: "Expect it at every school. It is the sharpest version of 'why MBA'.",
    scored: "Whether you've thought honestly about your own trajectory, or are chasing a brand.",
    shape: "10s concede the premise · 40s the real difference · 30s what changes concretely",
    model: "Partly, and I'd rather concede that than argue it.\n\nThe difference isn't the word 'consulting'. ZS is analytics consulting inside life sciences — I go deep on one industry and one function. What I'm describing is general strategy across industries, where the question is often 'should this business exist in this market' rather than 'how should this product be priced'. Those need different toolkits, and I have one of them.\n\nConcretely, three things change. The industries I can work in go from one to any. The point at which I enter a problem moves from 'here's the analysis' to 'here's what we should do'. And the people who can hire me stop all being in Indian pharma.\n\nIf the answer were just a better logo, I'd agree it wasn't worth two years and [₹ AMOUNT].",
    kills: ["Getting defensive.", "Pretending ZS isn't consulting. They know what ZS is.", "Not having a number for what the MBA costs you — it signals you haven't done the maths."] },

  { q: "What do you do for fun? / Tell me something not on your resume.", story: "s14", schools: "INSEAD, Tuck, Georgetown, Tepper, and general.",
    scored: "Likeability and memorability. Also whether you're a person or a CV.",
    shape: "60 seconds total. One thing, specific, true.",
    model: "[ONE GENUINE THING WITH A CONCRETE DETAIL. The test: could another applicant have written this sentence? If yes, pick something else.]\n\n[WHY IT MATTERS TO YOU — one line, not a justification.]\n\n[A SPECIFIC IMAGE OR STORY FROM IT — the thing they'd repeat to a colleague afterwards.]",
    kills: ["'Travel, reading and music.'", "Choosing something because it sounds impressive.", "Turning it into a professional skill. It doesn't need to be useful."] },

  { q: "Where does this school rank among your choices? / What would stop you joining?", story: "s13", schools: "Georgetown and Columbia ask directly. Increasingly common.",
    scored: "Honesty and yield probability. They can tell when you're lying and it costs you.",
    shape: "20s honest positioning · 25s the genuine reason it's high · 20s what would genuinely give you pause",
    model: "[IF IT'S GENUINELY TOP: say so and give the specific reason, not flattery.]\n\n[IF IT ISN'T: 'It's in a small group I'd be delighted with. What would decide it for me is [HONEST CRITERION — scholarship, the one-year format, the strength of the healthcare community], and I'm still gathering information on that.'] Don't claim a school is your first choice if it isn't — adcoms compare notes and yield-protect against people who oversell.\n\nWhat would give me pause is [GENUINELY HONEST — cost against the loan, being younger than the cohort, distance from family]. I'd rather say that than pretend there's no trade-off.",
    kills: ["Telling every school it's your first choice.", "Naming a competitor's weakness.", "Claiming money is no object. Nobody believes it."] },

  { q: "LBS: the five-minute impromptu presentation.", story: "s13", schools: "London Business School only. You get a business-news prompt, five minutes to prepare, five to present.",
    scored: "Structure under pressure — explicitly more than content. They want intro, argument, conclusion.",
    shape: "30s frame the question and state your answer · 3 min two or three arguments with evidence · 45s the strongest counterargument · 45s conclusion restating your position",
    model: "PREPARATION (5 min): Write the question at the top. Write your one-sentence answer immediately — do not gather points first. Then three supports, one counter, and a close. Number them.\n\nDELIVERY: \"I'm going to argue that [POSITION]. Three reasons, then the strongest case against, then where I land.\"\n\nThen: \"First… Second… Third…\" — each with a specific fact or example.\n\nThen: \"The strongest argument against my position is [X]. I take it seriously because [Y]. It doesn't change my view because [Z].\"\n\nClose: \"So — [RESTATE POSITION IN THE SAME WORDS YOU OPENED WITH].\"\n\nPractise on: an M&A deal in the news, an AI-and-jobs question, a company that made a strange decision recently.",
    kills: ["Gathering points before deciding your position. You'll run out of time.", "No counterargument — it reads as shallow.", "A different conclusion than your opening. Use the same words."] },

  { q: "HEC: the ten-minute presentation on a topic of your choice.", story: "s7", schools: "HEC Paris. Both interviews are blind — the interviewer has only your CV.",
    scored: "Judgement in what you choose, and whether you can hold a room for ten minutes. The topic choice is itself being assessed.",
    shape: "1 min why this topic and why you · 6 min the substance · 2 min your own view · 1 min close",
    model: "CHOOSING: Pick something you genuinely know and care about that is NOT your job. A topic you can be questioned on for ten minutes afterwards. The strongest option for you is likely Indian healthcare access — you have proprietary knowledge from three years of data, nobody else will present it, and it sets up your goals essay without you having to make the link yourself.\n\nSTRUCTURE:\n1. Why this matters and why I'm the one telling you — 1 min\n2. The problem, with three specific facts most people don't know — 3 min\n3. Why the obvious solutions haven't worked — 3 min\n4. What I think should happen and what I'd need to be wrong about — 2 min\n5. Close — 1 min\n\nBecause it's blind, your CV must be self-explanatory. Assume they know nothing beyond it.",
    kills: ["A generic topic — AI, sustainability, leadership. Everyone picks these.", "A topic you can't take hard questions on.", "Reading. Ten minutes of reading is fatal."] },

  { q: "Wharton: the Team-Based Discussion.", story: "s2", schools: "Wharton only. Five other candidates, a prompt given in advance, 35 minutes, admissions observing.",
    scored: "How you behave in a group, not whether your idea wins. They are watching whether people want to work with you.",
    shape: "1 min pitch prepared in advance · then behaviour over 35 minutes",
    model: "PITCH (1 min): one clear idea, stated plainly, with one reason. Do not use the full minute if you don't need it — finishing early reads as confident.\n\nDURING: The scoring is behavioural. Do these:\n· Name someone else's idea and build on it explicitly — \"Building on what [NAME] said about…\"\n· Bring in whoever hasn't spoken. This is the single highest-scoring behaviour.\n· Watch the clock and say so — \"We have ten minutes and three ideas; should we narrow?\"\n· Let go of your own idea visibly if a better one appears. Say why.\n· Do not summarise at the end unless nobody else is going to. Grabbing the summary reads as credit-taking.\n\nYour risk profile: you are more likely to under-contribute than to dominate. Set yourself a floor — speak in the first three minutes, no exceptions.",
    kills: ["Fighting for your own idea after the group has moved on.", "Dominating airtime.", "Silence. Six people, 35 minutes — if you speak twice you've failed."] },

  { q: "MIT: behavioural-only, with relentless follow-ups.", story: "s1", schools: "MIT Sloan. Famous for asking exclusively 'tell me about a time' and drilling three levels deep.",
    scored: "Whether your stories are real. The follow-ups exist to find out.",
    shape: "Standard STAR, then survive three rounds of 'and then what specifically did you say?'",
    model: "PREPARE DIFFERENTLY FOR MIT. For each of your 14 stories, know the third level of detail:\n· Names and roles of everyone involved\n· What you actually said, in words, at the key moment\n· The specific numbers, and where they came from\n· What the alternative was and why you rejected it\n· What happened in the following weeks\n\nMIT will ask 'how did you find out?', 'what was your response?', 'what was the outcome?' as separate questions on the same story. A story that holds at level one and collapses at level three is worse than not telling it.\n\nRule of thumb: if you can't talk about it for four minutes under questioning, don't use it.",
    kills: ["Rehearsed answers that can't go deeper.", "Vague on who said what.", "Inventing detail under pressure — it shows."] },

  { q: "Judge: the deliberately unconventional question.", story: "s14", schools: "Cambridge Judge. Interviewed by a faculty member who teaches on the MBA.",
    scored: "How you think when you haven't prepared. They are explicitly not looking for a rehearsed answer.",
    shape: "10s think out loud · 40s a position · 20s what would change your mind",
    model: "THE METHOD, not the answer — because you can't predict the question.\n\n1. Say the thinking out loud: \"I haven't thought about this before, so let me reason through it.\" This is rewarded, not penalised.\n2. Pick an angle and commit: \"I'd approach it from [X] rather than [Y], because…\"\n3. Take a position. Faculty interviewers dislike fence-sitting far more than they dislike a wrong answer.\n4. End with the falsifier: \"What would change my mind is…\"\n\nPrepare the raw material, not the answers: have a view on one book you've read recently, one technology changing your industry, one thing your industry believes that you think is wrong, and one ethical dilemma you've actually faced.\n\nFor you the best prepared-but-unrehearsed material is: what most people get wrong about Indian pharma.",
    kills: ["Trying to steer it back to your prepared story. They'll notice and press harder.", "No position.", "Pretending you've thought about something you haven't."] },

  { q: "IMD: the assessment day group case.", story: "s2", schools: "IMD. A full day — personal interview, group case, individual case presentation.",
    scored: "Behaviour in a group of experienced professionals, most of them older than you.",
    shape: "A full day. Pace yourself.",
    model: "Your specific risk at IMD: you'll be the youngest in a room averaging 31 with six years of experience. The failure mode is going quiet.\n\nWhat to do instead: contribute where you're strongest rather than competing everywhere. In the group case, own the quantitative structuring — that's genuinely your edge over most of the room. Say early: \"Can I take the numbers side and come back to the group in five minutes with a structure?\"\n\nIn the individual presentation, be ruthlessly structured. Answer first, then support.\n\nIn the personal interview, expect to be asked directly why you're ready at four years when the class average is six. Have that answer rehearsed — the honest version is about depth and readiness, not about being exceptional.",
    kills: ["Deferring to seniority all day.", "Overcompensating by dominating.", "No answer to the age question — it's certain to come."] },

  { q: "Kellogg: the three video essays.", story: "s14", schools: "Kellogg. Due 96 hours after the deadline. ~20s prep, ~60s per answer, no re-dos.",
    scored: "Warmth and authenticity on camera. Kellogg is screening for the collaborative culture it sells.",
    shape: "60 seconds each. Use 45–55.",
    model: "SETUP MATTERS MORE THAN YOU THINK. Light in front of you not behind, camera at eye level, plain background, look at the lens not the screen.\n\nSTRUCTURE FOR ANY OF THE THREE: one sentence answering directly → one specific example → one sentence on what it says about you. Don't try for three points in 60 seconds.\n\nDo the practice questions until the nerves are gone, not until the answers are memorised. Memorised reads badly on video.\n\nSmile at the start. It sounds trivial; Kellogg is the school where it matters most.\n\nIf you fumble mid-answer, keep going. Recovering visibly is scored better than a polished delivery, and there are no re-dos anyway.",
    kills: ["Reading from a screen. It's obvious and it's fatal.", "Running out of time mid-sentence — practise landing at 50 seconds.", "Being stiff. This is the one part of the application that tests likeability."] },

  { q: "Do you have any questions for me?", story: "s13", schools: "Every interview closes with this.",
    scored: "Research depth and genuine interest. A weak question here undoes a strong interview.",
    shape: "Two questions. Then stop.",
    model: "GOOD (specific, and only answerable by this person):\n· \"You interviewed for [SCHOOL] — what's the thing about the class that surprised you most compared to what you expected going in?\"\n· \"What's something people underestimate about the programme before they arrive?\"\n· \"You work in [THEIR INDUSTRY] — how much did the MBA actually change how you approach [SPECIFIC THING]?\"\n· \"If I'm admitted, what's the one thing you'd tell me to do in the six months before I arrive?\"\n\nBAD:\n· Anything on the website — rankings, class size, employment stats.\n· \"What are you looking for in a candidate?\" — asked at the end, it reads as fishing.\n· \"How did I do?\"\n· No questions at all. This is scored as disinterest.\n\nAsk two. Listen to the answer and respond to it rather than moving to your next one.",
    kills: ["A question answered on page one of the website.", "More than three — it stops being interest and becomes an interview of them.", "Not reacting to the answer."] }
];

/* what each school's interview weights most, from published formats */
const SCHOOL_INTERVIEW_NOTES = {
  harvard: "30 minutes, non-blind, with an Admissions Board member who has read everything and prepared bespoke questions. Fast follow-ups. A written reflection is due within 24 hours — treat it as a real part of the application, not a formality.",
  stanford: "~60 minutes with an alumnus, blind. Almost entirely behavioural and past-focused. Stanford asks what you have done, not what you plan to do.",
  wharton: "Team-Based Discussion with five other candidates, prompt given in advance, 35 minutes observed, then a short one-on-one. Unique in the M7.",
  mit: "~45 minutes with admissions, behavioural only, relentless follow-ups. Prepare 12–15 stories to the third level of detail.",
  booth: "~45 minutes, blind, with an alumnus, student or admissions member. Heavily behavioural. Booth asks about asking for help and about unpopular ideas — unusually, about vulnerability.",
  kellogg: "Off-campus alumni interview, ~45 minutes, blind. Plus three video essays due 96 hours after the deadline.",
  columbia: "~45 minutes with an alumnus, blind. Skews toward teamwork, conflict and inclusion. They ask directly whether CBS is your first choice.",
  yale: "~30 minutes with admissions or a second-year, blind. Warm. Yale probes 'why this, why now' harder than most.",
  haas: "~45 minutes, blind. Haas asks which of its Four Defining Principles resonates most — prepare that specifically.",
  stern: "~30 minutes, non-blind. Direct about recruiting readiness — expect 'name the companies' and 'what's your plan B'. Plus the EQ Endorsement from someone who knows you.",
  ross: "~30–45 minutes, blind, with an alumnus or second-year. Failure and ambiguity questions come up almost every time.",
  fuqua: "Open interview available before invitation, ~30 minutes, blind. Culture questions are real screening — 'what does Team Fuqua mean to you' is asked directly.",
  insead: "Two separate interviews with alumni, 45–60 minutes each, plus an earlier pre-recorded video interview. Conversational. They probe international disposition and study-group fit hard.",
  lbs: "One-on-one plus a five-minute impromptu presentation on a business-news prompt, with five minutes to prepare. Structure is scored above content.",
  oxford: "30–60 minutes with an admissions committee member, non-blind. Closer to a professional job interview than a conversation.",
  judge: "30 minutes with a faculty member who teaches on the MBA. Deliberately unconventional — expect questions well outside your CV.",
  hec: "Two separate 45–60 minute interviews with individual alumni, equally weighted, both blind (CV only). Each opens with a ten-minute presentation on a topic you choose.",
  iese: "~45 minutes with admissions, case-method oriented, plus four video questions (1 min prep, 1.5 min response) within 48 hours of submitting.",
  imd: "A full assessment day: personal interview, group case with other candidates, and an individual case presentation. The most demanding process on this list.",
  bocconi: "~45 minutes with admissions or an alumnus, non-blind. Strong focus on why Italy and, if you name the luxury track, what you've actually done about it.",
  isb: "Panel of 2–3 including alumni and admissions, 20–30 minutes. Direct and fast. Heavy focus on why ISB over an international MBA.",
  nus: "~30 minutes with admissions, non-blind. Focused on why Asia and whether you intend to stay in the region."
};

/* how the big firms actually run an engagement — for the method page */
const CONSULTING_METHOD = [
  { phase: "1 · Candidacy audit", weeks: "Weeks 1–2",
    what: "Before a word is written, the firm grades the profile against the target schools' published class data and against the applicant's own sub-pool. Fortuna and Stacy Blackman staff this with former admissions directors from Wharton, INSEAD, HBS and Stanford, because the judgement being made is 'how does this read to a reader who sees 1,300 of these'.",
    you: "That is what the Advisor scorecard and the odds table do. Your composite is 6.4 with a realistic ceiling of 8.0 — the gap is evidence, not ability." },
  { phase: "2 · School list construction", weeks: "Weeks 2–3",
    what: "A list of 6–10, built from the candidate's constraints rather than rankings, and stress-tested for whether the post-MBA goal is actually reachable from each school. Firms push back hard on lists that are all reaches.",
    you: "The Schools tab does this with your weights. Every school you named is scored on the same nine dimensions — nothing is privileged. Change the weights and the order changes." },
  { phase: "3 · Story mining", weeks: "Weeks 3–6",
    what: "The heart of the engagement and the part applicants underestimate. Long interviews to extract 12–15 stories, each stress-tested for specificity, ownership and a quantified result. The output is a story bank reused across every essay, every interview, and both recommender briefings.",
    you: "The Story Bank tab. Fourteen stories, with the slots you need to fill. Two of yours are currently empty — leadership without authority, and the initiative you started." },
  { phase: "4 · Narrative architecture", weeks: "Weeks 5–7",
    what: "Deciding what the application argues before deciding what it says. One through-line, three to four supporting pillars, and a why-now that survives the 'why can't you do this already' test.",
    you: "Yours: non-engineer woman with hard quantitative training and rare healthcare depth, who has hit the ceiling of an analytics function and wants to own decisions — with a named Indian healthcare problem as the destination." },
  { phase: "5 · Essays", weeks: "Weeks 6–12",
    what: "Three to six drafts per essay is normal. Firms cut ruthlessly for specificity, delete anything another applicant could have written, and check every claim has a number behind it.",
    you: "The Essays tab flags the seven patterns that get essays rejected. Use it as a first pass, not a substitute for reading it aloud." },
  { phase: "6 · Recommender management", weeks: "Weeks 8–10",
    what: "Recommenders are briefed in person with a one-page memo naming the stories to tell and the numbers to quote. Firms treat a generic recommendation from a senior person as worth less than a specific one from a direct manager.",
    you: "Your risk is two letters from the same delivery hierarchy about the same three projects. Line up a second recommender from outside it now — a pro-bono client, a sponsor, an initiative lead." },
  { phase: "7 · Interview preparation", weeks: "After invitation",
    what: "Mock interviews recorded and reviewed, school-specific formats drilled separately, and the story bank compressed to 60–90 second STAR answers with 60% of the time on action.",
    you: "The Practice tab times you and surfaces every answer you rated 1 or 2. The Answers tab gives you the structure and the failure modes for each." },
  { phase: "8 · Decision and negotiation", weeks: "On offer",
    what: "Comparing offers on total cost after scholarship, not headline rank, and going back to schools with competing offers. European scholarship money is frequently negotiable; US money less so.",
    you: "Run the Schools tab weighted for 'Lowest financial risk' when offers land, and ask. The worst answer is no." }
];
