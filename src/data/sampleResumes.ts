import { SampleResumeItem } from '../types';

export const SAMPLE_RESUMES: SampleResumeItem[] = [
  {
    id: 'software-engineer',
    title: 'Senior Frontend Engineer',
    subtitle: 'Moderate score (~72/100) • Lacks TS/GraphQL keywords & metrics',
    role: 'Senior Frontend Engineer (React/TypeScript)',
    resumeText: `Alex Mercer
San Francisco, CA | alex.mercer@email.com | (555) 234-5678 | linkedin.com/in/alexmercer | github.com/alexmercer

SUMMARY
Senior Software Engineer with over 6 years of experience developing web applications. Skilled in modern JavaScript frameworks, responsive web design, and agile methodologies. Passionate about user interface performance and team mentorship.

EXPERIENCE
Frontend Tech Lead | CloudScale Solutions | Jan 2022 - Present
- Led frontend development for enterprise SaaS web applications using React, Redux, and Tailwind CSS.
- Worked on improving web application performance and loading times for client dashboards.
- Refactored legacy JavaScript codebase to modern React functional components with state hooks.
- Managed a team of 4 junior developers, conducting weekly code reviews and sprint planning.
- Integrated third-party REST APIs and payment gateways like Stripe for checkout flows.

Software Engineer | Apex Digital | Jun 2018 - Dec 2021
- Created web components and pages using HTML, CSS, JavaScript, and React.
- Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect components.
- Wrote unit tests using Jest and React Testing Library to increase test coverage.
- Participated in daily standups, sprint retrospectives, and cross-functional feature planning.

EDUCATION
B.S. in Computer Science | University of California, Berkeley | 2014 - 2018

SKILLS
Programming: JavaScript (ES6+), React, HTML5, CSS3, Redux, Node.js, Jest, Git, REST APIs
Tools: Figma, Jira, Webpack, npm`,
    jobDescription: `Job Title: Senior Frontend Engineer (TypeScript & Next.js)

Company Overview: NextGen AI Platform

Role Description:
We are seeking a Senior Frontend Engineer to build high-performance web applications using React, Next.js, and TypeScript. You will work closely with backend AI teams, design system leads, and GraphQL APIs.

Key Requirements:
- 5+ years of software engineering experience focusing on React and TypeScript.
- Strong proficiency in TypeScript, Next.js (App Router), State Management (Zustand/Redux), and GraphQL / REST APIs.
- Proven track record of performance optimization (Web Vitals, Bundle size reduction, SSR / ISR).
- Experience with WebSockets or real-time data streaming.
- CI/CD automation, Docker, and Automated E2E testing (Playwright or Cypress).
- Experience measuring and quantifying impact with metrics (e.g., improved load time by X%, increased retention by Y%).`
  },
  {
    id: 'product-manager',
    title: 'AI Product Manager',
    subtitle: 'High score (~88/100) • Strong metrics, high keyword match',
    role: 'Lead AI Product Manager',
    resumeText: `Jordan Taylor
New York, NY | jordan.taylor@email.com | (555) 987-6543 | linkedin.com/in/jordantaylor

EXECUTIVE SUMMARY
Results-driven Product Leader with 7+ years of experience scaling AI-powered SaaS products from 0-1 and 1-10. Track record of growing ARR by 140% and leading cross-functional teams of engineers, data scientists, and UX designers.

PROFESSIONAL EXPERIENCE
Senior Product Manager | Veloce AI | 2021 - Present
- Spearheaded the launch of generative AI assistant, increasing monthly active users (MAU) from 50k to 350k in 12 months.
- Managed end-to-end product roadmap, prioritizing features based on user feedback, NPS surveys, and SQL analytics.
- Reduced churn rate by 18% by redesigning onboarding workflows and implementing automated contextual nudges.
- Partnered with Machine Learning engineering team to reduce LLM latency by 42% through prompt caching and speculative decoding.

Product Manager | DataStream Systems | 2018 - 2021
- Owned analytics product module, driving $3.2M in net new ARR within the first year of release.
- Defined product requirements (PRDs), user stories, and acceptance criteria for 3 engineering pods.
- Conducted 80+ customer interviews to validate core value propositions and usability bottlenecks.

EDUCATION
M.B.A. | Columbia Business School | 2016 - 2018
B.A. in Economics | New York University | 2012 - 2016

SKILLS & INTERESTS
Product Strategy, Roadmap Planning, Generative AI / LLMs, SQL, A/B Testing, Amplitude, Mixpanel, Jira, Agile/Scrum`,
    jobDescription: `Role: Principal AI Product Manager
Location: Remote

Key Requirements:
- 6+ years in Product Management with direct exposure to LLMs, Machine Learning, and Enterprise AI products.
- Deep expertise in Product Analytics (Amplitude, Mixpanel), SQL, Python, and User Testing.
- Experience with AI Evaluation frameworks, RAG (Retrieval-Augmented Generation), and Fine-tuning pipelines.
- Demonstrated success in monetization, pricing strategy, and GTM (Go-To-Market) execution.
- Outstanding communication skills and experience presenting to C-level executives.`
  },
  {
    id: 'data-scientist',
    title: 'Senior Data Scientist & AI Engineer',
    subtitle: 'High score (~86/100) • Strong LLM & Python quantification',
    role: 'Staff AI Engineer / Data Scientist',
    resumeText: `Elena Rostova
Seattle, WA | elena.rostova@email.com | (555) 432-1098 | linkedin.com/in/elenarostova | github.com/erostova

SUMMARY
Senior Data Scientist & AI Engineer with 6+ years specializing in Deep Learning, Natural Language Processing (NLP), and production Large Language Model (LLM) architectures. Experienced in building RAG pipelines, fine-tuning PyTorch models, and deploying low-latency microservices.

EXPERIENCE
Lead AI Research Engineer | Cognitive Systems | 2022 - Present
- Architected enterprise Retrieval-Augmented Generation (RAG) pipeline over 10M+ documents using Pinecone and LangChain, improving answer accuracy from 71% to 94%.
- Fine-tuned open-source Llama 3 70B models using QLoRA, cutting API inference costs by $180,000 annually while maintaining benchmark quality.
- Deployed real-time inference endpoints on Kubernetes with Triton Inference Server, handling 1,200 RPS with sub-120ms latency.
- Mentored a pod of 5 machine learning engineers and led bi-weekly AI paper reading groups.

Machine Learning Engineer | Apex Analytics | 2019 - 2022
- Developed customer churn predictive model in PyTorch and XGBoost, increasing churn detection accuracy by 34% and saving $1.4M in retained revenue.
- Built automated data processing pipelines with Apache Spark and Snowflake, reducing ETL pipeline runtime by 65%.

EDUCATION
M.S. in Computer Science (AI Track) | University of Washington | 2017 - 2019
B.S. in Applied Mathematics | UT Austin | 2013 - 2017

SKILLS
AI/ML: PyTorch, TensorFlow, Hugging Face, RAG, Vector DBs (Pinecone, Qdrant), LangChain, Fine-Tuning
Data & Cloud: Python, SQL, Spark, Snowflake, Docker, Kubernetes, AWS (SageMaker), CI/CD`,
    jobDescription: `Role: Senior AI / ML Staff Engineer

Requirements:
- 5+ years of industry experience deploying ML and NLP models to production.
- Deep mastery of PyTorch, Transformer architectures, RAG, and Vector databases.
- Experience with model quantization, vLLM / Triton inference acceleration, and CUDA optimization.
- Strong software engineering foundation in Python, SQL, Docker, and cloud infrastructure (AWS/GCP).`
  },
  {
    id: 'devops-engineer',
    title: 'Senior DevOps & Cloud Engineer',
    subtitle: 'Solid technical score (~82/100) • Terraform, Kubernetes, AWS',
    role: 'Senior DevOps / Site Reliability Engineer',
    resumeText: `Marcus Vance
Chicago, IL | marcus.vance@email.com | (555) 876-5432 | linkedin.com/in/marcusvance

SUMMARY
DevOps & Cloud Infrastructure Engineer with 7+ years of experience automating CI/CD pipelines, managing multi-region Kubernetes clusters, and maintaining 99.99% system availability across AWS and GCP environments.

EXPERIENCE
Senior DevOps Engineer | CloudScale Tech | 2021 - Present
- Engineered Infrastructure as Code (IaC) using Terraform for 40+ AWS microservices, reducing environment provisioning time from 3 days to 15 minutes.
- Managed enterprise Kubernetes (EKS) clusters supporting 20M daily HTTP requests, reducing cloud infrastructure spend by 28% through Karpenter autoscaling.
- Built automated GitOps CI/CD pipelines with GitHub Actions and ArgoCD, accelerating deployment frequency from weekly to 15+ times per day.
- Implemented zero-trust security policies and Prometheus/Grafana monitoring, reducing Mean Time to Resolution (MTTR) by 45%.

Systems Administrator | Nexus Cloud | 2017 - 2021
- Configured Ansible playbooks for automated server patching across 200+ Linux instances.
- Migrated legacy monolithic applications to Docker containers, reducing server footprint by 35%.

EDUCATION
B.S. in Information Technology | Purdue University | 2013 - 2017

SKILLS
Cloud & IaC: AWS, GCP, Terraform, CloudFormation, Ansible
Containers & CI/CD: Kubernetes (EKS/GKE), Docker, Helm, ArgoCD, GitHub Actions, Jenkins
Monitoring & Scripting: Prometheus, Grafana, Datadog, Python, Bash, Linux Administration`,
    jobDescription: `Role: Lead Site Reliability / DevOps Engineer

Qualifications:
- 6+ years in DevOps/SRE role operating high-scale cloud platforms.
- Deep expertise in Kubernetes, Terraform, AWS, and GitOps workflows.
- Proven track record of cloud cost optimization and high-availability architecture.
- Strong scripting skills in Python, Go, or Bash.`
  },
  {
    id: 'growth-marketing',
    title: 'Growth Marketing Manager',
    subtitle: 'Moderate score (~75/100) • Needs SQL & B2B CAC/LTV keywords',
    role: 'Senior Growth Marketing Manager',
    resumeText: `Maya Lin
Austin, TX | maya.lin@email.com | (555) 345-6789 | linkedin.com/in/mayalin

SUMMARY
Data-driven Growth Marketer with 5+ years driving acquisition, conversion rate optimization (CRO), and user retention for B2B SaaS startups. Managed $2M+ annual performance marketing budgets with a focus on sustainable CAC payback.

EXPERIENCE
Growth Marketing Manager | SaaSify Inc | 2022 - Present
- Led multi-channel paid acquisition campaigns across Google Ads, LinkedIn, and Meta, scaling monthly qualified leads by 85%.
- Optimized signup landing pages through A/B testing, increasing visitor-to-trial conversion rate from 2.4% to 4.8%.
- Collaborated with product marketing to launch automated lifecycle email sequences, boosting 30-day user activation by 22%.
- Managed $150k monthly paid marketing spend while keeping CAC under $180 per qualified account.

Digital Marketing Specialist | GrowthWave | 2019 - 2022
- Managed SEO strategy and blog content production, driving 120,000 monthly organic website visits.
- Created monthly marketing performance dashboards in Google Analytics and Excel for executive teams.

EDUCATION
B.A. in Marketing & Communications | UT Austin | 2015 - 2019

SKILLS
Marketing Channels: Paid Search (Google Ads), Paid Social (LinkedIn, Meta), SEO, Email Lifecycle Marketing
Analytics & Tools: Google Analytics 4, Hubspot, Webflow, A/B Testing, Excel, Figma`,
    jobDescription: `Role: Head of Growth Marketing (B2B SaaS)

Requirements:
- 5+ years of growth marketing experience in B2B SaaS environment.
- Strong quantitative background in SQL, CAC/LTV modeling, and product analytics (Amplitude/Mixpanel).
- Proven track record of scaling pipeline and revenue through multi-channel demand generation.
- Experience managing 7-figure ad budgets and lead scoring models.`
  },
  {
    id: 'entry-graduate',
    title: 'Junior Data Analyst',
    subtitle: 'Low score (~58/100) • Weak verbs, missing metrics & SQL depth',
    role: 'Junior Data Analyst',
    resumeText: `SAMANTHA REED
Contact: sam.reed99@email.com, Phone: 555-111-2222 | Location: Austin, TX

Objective:
Hardworking fresh graduate looking for an entry level Data Analyst position where I can utilize my skills in Excel and Python to help a company grow.

Work Experience:
Data Intern at Small Tech Co (June 2023 - Aug 2023)
- Helped with data entry tasks and cleaned CSV files.
- Used Excel formulas like VLOOKUP and Pivot Tables to make charts.
- Helped the team make weekly reports for management.
- Responsible for checking database accuracy.

Student Assistant at Campus Library (2021 - 2023)
- Answered student questions and organized books on shelves.
- Managed inventory in the library system.

Education:
B.S. Mathematics - University of Texas (Graduated 2023)

Skills:
Excel, Word, Python (basic), SQL (took 1 class), Communication, Team Player, Fast Learner, Organization`,
    jobDescription: `Position: Data Analyst
Company: FinTech Growth Corp

Qualifications:
- Bachelor's degree in Math, Statistics, Computer Science or quantitative field.
- Proficient in SQL (complex joins, CTEs, window functions) and Python or R for statistical analysis.
- Experience building interactive dashboards in Tableau, PowerBI, or Looker.
- Strong ability to analyze business metrics (CAC, LTV, Retention) and present insights to stakeholders.
- Experience with ETL pipelines and Snowflake or BigQuery dataset handling.`
  }
];
