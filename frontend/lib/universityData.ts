// Curated university details for display on the universities page
// This provides rich information without requiring backend changes

export interface UniversityDetail {
    description: string;
    location: string;
    ranking: string;
    acceptanceRate: string;
    students: string;
    tuition: string;
    courses: string[];
}

export const universityDetails: Record<string, UniversityDetail> = {
    // ─── AUSTRALIA ───────────────────────────────────────────────
    "university of melbourne": {
        description: "One of Australia's oldest and most prestigious universities, known for its excellence in research, teaching, and innovation across a vast range of disciplines.",
        location: "Melbourne, Victoria",
        ranking: "#14 World (QS 2025)",
        acceptanceRate: "~70%",
        students: "50,000+",
        tuition: "AUD 30,000–50,000/yr",
        courses: ["Business & Commerce", "Medicine", "Law", "Engineering", "Arts & Humanities", "Science"]
    },
    "university of sydney": {
        description: "Australia's first university and one of its finest, offering over 400 courses across a wide range of disciplines in a stunning sandstone campus.",
        location: "Sydney, New South Wales",
        ranking: "#18 World (QS 2025)",
        acceptanceRate: "~72%",
        students: "60,000+",
        tuition: "AUD 35,000–55,000/yr",
        courses: ["Architecture", "Medicine & Health", "Law", "Business", "Engineering", "Education"]
    },
    "australian national university": {
        description: "Australia's national university and a world leader in research, consistently ranked as Australia's top university for research impact.",
        location: "Canberra, ACT",
        ranking: "#30 World (QS 2025)",
        acceptanceRate: "~35%",
        students: "25,000+",
        tuition: "AUD 28,000–45,000/yr",
        courses: ["Politics & International Relations", "Science", "Law", "Arts", "Computing", "Environment"]
    },
    "university of queensland": {
        description: "A leading research-intensive university committed to excellence in teaching and research, based in vibrant Brisbane.",
        location: "Brisbane, Queensland",
        ranking: "#40 World (QS 2025)",
        acceptanceRate: "~70%",
        students: "55,000+",
        tuition: "AUD 30,000–48,000/yr",
        courses: ["Pharmacy", "Veterinary Science", "Business", "Engineering", "Health Sciences", "Law"]
    },
    "monash university": {
        description: "A research-intensive university known for its global impact, Monash is one of Australia's largest universities with campuses in 5 countries.",
        location: "Melbourne, Victoria",
        ranking: "#42 World (QS 2025)",
        acceptanceRate: "~73%",
        students: "80,000+",
        tuition: "AUD 28,000–50,000/yr",
        courses: ["Pharmacy", "Engineering", "Business", "Education", "Law", "Medicine"]
    },
    "university of new south wales": {
        description: "UNSW Sydney is a world-class research university known for its excellence in engineering, business, and medicine.",
        location: "Sydney, New South Wales",
        ranking: "#19 World (QS 2025)",
        acceptanceRate: "~67%",
        students: "60,000+",
        tuition: "AUD 35,000–52,000/yr",
        courses: ["Engineering", "Business", "Law", "Medicine", "Arts & Social Sciences", "Architecture"]
    },
    "university of western australia": {
        description: "A member of Australia's prestigious Group of Eight research universities, UWA offers world-class degrees in a beautiful riverside campus.",
        location: "Perth, Western Australia",
        ranking: "#72 World (QS 2025)",
        acceptanceRate: "~75%",
        students: "25,000+",
        tuition: "AUD 28,000–45,000/yr",
        courses: ["Mining Engineering", "Marine Biology", "Business", "Law", "Agriculture", "Psychology"]
    },
    "university of adelaide": {
        description: "One of Australia's oldest and most respected universities, with a strong focus on research and a rich history spanning over 140 years.",
        location: "Adelaide, South Australia",
        ranking: "#89 World (QS 2025)",
        acceptanceRate: "~80%",
        students: "28,000+",
        tuition: "AUD 28,000–44,000/yr",
        courses: ["Dentistry", "Engineering", "Agriculture", "Wine & Viticulture", "Business", "Arts"]
    },
    "uts - university of technology sydney": {
        description: "UTS is a leading tech-focused university known for its strong industry connections, innovation, and career outcomes for graduates.",
        location: "Sydney, New South Wales",
        ranking: "#137 World (QS 2025)",
        acceptanceRate: "~82%",
        students: "47,000+",
        tuition: "AUD 30,000–48,000/yr",
        courses: ["Information Technology", "Engineering", "Business", "Design", "Communication", "Architecture"]
    },

    // ─── UNITED KINGDOM ──────────────────────────────────────────
    "university of oxford": {
        description: "The University of Oxford is one of the oldest and most prestigious universities in the world, with a history spanning over 900 years.",
        location: "Oxford, England",
        ranking: "#3 World (QS 2025)",
        acceptanceRate: "~17%",
        students: "26,000+",
        tuition: "£28,000–£45,000/yr",
        courses: ["Philosophy, Politics & Economics", "Medicine", "Law", "Computer Science", "Engineering", "Literature"]
    },
    "university of cambridge": {
        description: "A collegiate research university with a reputation for academic excellence, and home to many of the world's most influential thinkers.",
        location: "Cambridge, England",
        ranking: "#2 World (QS 2025)",
        acceptanceRate: "~21%",
        students: "24,000+",
        tuition: "£28,000–£58,000/yr",
        courses: ["Natural Sciences", "Engineering", "Mathematics", "Law", "Economics", "Medicine"]
    },
    "imperial college london": {
        description: "A science-focused university dedicated to world-class research and innovation, consistently ranked among the top 10 universities globally.",
        location: "London, England",
        ranking: "#8 World (QS 2025)",
        acceptanceRate: "~14%",
        students: "20,000+",
        tuition: "£30,000–£47,000/yr",
        courses: ["Aeronautical Engineering", "Medicine", "Computing", "Business", "Physics", "Chemical Engineering"]
    },
    "university college london (ucl)": {
        description: "UCL is a globally top-ranked university in the heart of London, known for its multidisciplinary research and diverse student community.",
        location: "London, England",
        ranking: "#9 World (QS 2025)",
        acceptanceRate: "~63%",
        students: "42,000+",
        tuition: "£25,000–£40,000/yr",
        courses: ["Architecture", "Neuroscience", "Law", "Engineering", "Arts & Humanities", "Social Sciences"]
    },
    "university of edinburgh": {
        description: "One of the world's top universities, Edinburgh is a pioneer in research and home to inspiring thinkers in a stunning historic city.",
        location: "Edinburgh, Scotland",
        ranking: "#27 World (QS 2025)",
        acceptanceRate: "~53%",
        students: "42,000+",
        tuition: "£20,000–£35,000/yr",
        courses: ["Medicine", "Law", "Informatics", "Business", "Arts", "Veterinary Medicine"]
    },
    "king's college london": {
        description: "One of England's oldest universities, King's is a world-leading research university in the heart of central London.",
        location: "London, England",
        ranking: "#40 World (QS 2025)",
        acceptanceRate: "~60%",
        students: "33,000+",
        tuition: "£20,000–£38,000/yr",
        courses: ["Law", "Medicine", "Biomedical Sciences", "War Studies", "Business", "Psychology"]
    },
    "university of manchester": {
        description: "A global leader for research and a vibrant student community. Manchester is consistently ranked among the most employable universities in the UK.",
        location: "Manchester, England",
        ranking: "#32 World (QS 2025)",
        acceptanceRate: "~58%",
        students: "44,000+",
        tuition: "£22,000–£36,000/yr",
        courses: ["Computer Science", "Economics", "Engineering", "Medicine", "Social Sciences", "Business"]
    },
    "london school of economics (lse)": {
        description: "The world's leading dedicated social science institution, with unrivaled expertise in economics, politics, law, and business.",
        location: "London, England",
        ranking: "#45 World (QS 2025)",
        acceptanceRate: "~16%",
        students: "12,000+",
        tuition: "£20,000–£34,000/yr",
        courses: ["Economics", "Law", "Political Science", "Sociology", "Statistics", "Management"]
    },
    "university of warwick": {
        description: "A top UK university with a strong focus on research and student employability, particularly renowned in business and computer science.",
        location: "Coventry, England",
        ranking: "#67 World (QS 2025)",
        acceptanceRate: "~72%",
        students: "28,000+",
        tuition: "£20,000–£35,000/yr",
        courses: ["Business & Management", "Computer Science", "Mathematics", "Engineering", "Law", "Film Studies"]
    },

    // ─── CANADA ──────────────────────────────────────────────────
    "university of toronto": {
        description: "Canada's leading research university and one of the world's foremost centers of higher learning. Home to groundbreaking discoveries in medicine, AI, and more.",
        location: "Toronto, Ontario",
        ranking: "#25 World (QS 2025)",
        acceptanceRate: "~43%",
        students: "97,000+",
        tuition: "CAD 40,000–70,000/yr",
        courses: ["Computer Science", "Business", "Medicine", "Engineering", "Law", "Social Sciences"]
    },
    "mcgill university": {
        description: "Known as the 'Harvard of Canada,' McGill is a top research university with a vibrant multicultural campus in the heart of Montreal.",
        location: "Montreal, Quebec",
        ranking: "#29 World (QS 2025)",
        acceptanceRate: "~46%",
        students: "40,000+",
        tuition: "CAD 28,000–58,000/yr",
        courses: ["Medicine", "Law", "Music", "Engineering", "Agriculture", "Architecture"]
    },
    "university of british columbia": {
        description: "A globally recognized university consistently ranked among the world's top 50, with campuses in Vancouver and Kelowna.",
        location: "Vancouver, British Columbia",
        ranking: "#34 World (QS 2025)",
        acceptanceRate: "~52%",
        students: "68,000+",
        tuition: "CAD 35,000–55,000/yr",
        courses: ["Forestry", "Computer Science", "Business", "Medicine", "Engineering", "Arts"]
    },
    "university of alberta": {
        description: "One of Canada's leading research universities, with strengths in energy research, engineering, and medicine.",
        location: "Edmonton, Alberta",
        ranking: "#111 World (QS 2025)",
        acceptanceRate: "~61%",
        students: "40,000+",
        tuition: "CAD 30,000–50,000/yr",
        courses: ["Petroleum Engineering", "Medicine", "Law", "Business", "Education", "Science"]
    },
    "university of waterloo": {
        description: "The world's top destination for co-operative education, Waterloo produces some of the most employable graduates in Canada, especially in tech.",
        location: "Waterloo, Ontario",
        ranking: "#154 World (QS 2025)",
        acceptanceRate: "~53%",
        students: "42,000+",
        tuition: "CAD 38,000–58,000/yr",
        courses: ["Software Engineering", "Computer Science", "Mathematics", "Environmental Studies", "Architecture", "Business"]
    },
    "western university": {
        description: "A research-intensive university known for its health sciences, business, and social science programs and strong student experience.",
        location: "London, Ontario",
        ranking: "#114 World (QS 2025)",
        acceptanceRate: "~58%",
        students: "38,000+",
        tuition: "CAD 30,000–50,000/yr",
        courses: ["Business Administration", "Medical Science", "Law", "Kinesiology", "Engineering", "Arts & Humanities"]
    },
    "queen's university": {
        description: "A prestigious Canadian university with a beautiful campus in Kingston, renowned for its business and law programs.",
        location: "Kingston, Ontario",
        ranking: "#235 World (QS 2025)",
        acceptanceRate: "~42%",
        students: "25,000+",
        tuition: "CAD 35,000–55,000/yr",
        courses: ["Commerce", "Engineering", "Arts & Science", "Law", "Medicine", "Education"]
    },

    // ─── GERMANY ─────────────────────────────────────────────────
    "technical university of munich": {
        description: "Germany's most prestigious technical university, consistently ranked as one of Europe's top universities for engineering and technology.",
        location: "Munich, Bavaria",
        ranking: "#37 World (QS 2025)",
        acceptanceRate: "~8%",
        students: "50,000+",
        tuition: "~€0 (semester fee ~€150)",
        courses: ["Mechanical Engineering", "Computer Science", "Aerospace", "Business", "Physics", "Architecture"]
    },
    "ludwig maximilian university": {
        description: "One of Germany's oldest and most prestigious universities with a rich tradition of excellence in research and a broad range of disciplines.",
        location: "Munich, Bavaria",
        ranking: "#59 World (QS 2025)",
        acceptanceRate: "~15%",
        students: "52,000+",
        tuition: "~€0 (semester fee ~€150)",
        courses: ["Medicine", "Law", "Economics", "Philosophy", "Natural Sciences", "Humanities"]
    },
    "heidelberg university": {
        description: "Germany's oldest university, Heidelberg is a hub for groundbreaking research with outstanding programs in medicine and natural sciences.",
        location: "Heidelberg, Baden-Württemberg",
        ranking: "#87 World (QS 2025)",
        acceptanceRate: "~20%",
        students: "30,000+",
        tuition: "~€0 (semester fee ~€180)",
        courses: ["Medicine", "Law", "Natural Sciences", "Social Sciences", "Economics", "Philosophy"]
    },
    "berlin institute of technology": {
        description: "TU Berlin is one of Germany's leading technical universities, known for strong industry links, particularly in engineering and natural sciences.",
        location: "Berlin",
        ranking: "#154 World (QS 2025)",
        acceptanceRate: "~18%",
        students: "35,000+",
        tuition: "~€0 (semester fee ~€300)",
        courses: ["Electrical Engineering", "Computer Science", "Architecture", "Economics", "Natural Sciences", "Mechanical Engineering"]
    },
    "rwth aachen university": {
        description: "One of Germany's best engineering universities and a powerhouse for automotive, mechanical, and electrical engineering research.",
        location: "Aachen, North Rhine-Westphalia",
        ranking: "#106 World (QS 2025)",
        acceptanceRate: "~20%",
        students: "45,000+",
        tuition: "~€0 (semester fee ~€300)",
        courses: ["Mechanical Engineering", "Electrical Engineering", "Computer Science", "Business Engineering", "Architecture", "Medicine"]
    },
    "university of hamburg": {
        description: "A comprehensive university and the largest in Northern Germany, with strong programs in law, economics, and natural sciences.",
        location: "Hamburg",
        ranking: "#298 World (QS 2025)",
        acceptanceRate: "~40%",
        students: "42,000+",
        tuition: "~€0 (semester fee ~€350)",
        courses: ["Law", "Business Administration", "Biology", "Physics", "Computer Science", "Cultural Studies"]
    },
    "dalhousie university": {
        description: "A leading Canadian research university in the heart of Halifax, Nova Scotia, known for its ocean and health sciences programs.",
        location: "Halifax, Nova Scotia",
        ranking: "#298 World (QS 2025)",
        acceptanceRate: "~62%",
        students: "19,000+",
        tuition: "CAD 28,000–45,000/yr",
        courses: ["Engineering", "Law", "Medicine", "Agriculture", "Management", "Computer Science"]
    },
    "university of calgary": {
        description: "A dynamic university in Alberta's 'energy capital,' known for innovation and enterprise, particularly in business, engineering, and health.",
        location: "Calgary, Alberta",
        ranking: "#182 World (QS 2025)",
        acceptanceRate: "~68%",
        students: "33,000+",
        tuition: "CAD 28,000–48,000/yr",
        courses: ["Engineering", "Business", "Medicine", "Veterinary Medicine", "Law", "Kinesiology"]
    },
    "university of freiburg": {
        description: "One of Germany's oldest and most renowned universities, famous for its environmental sciences and liberal arts programs.",
        location: "Freiburg, Baden-Württemberg",
        ranking: "#235 World (QS 2025)",
        acceptanceRate: "~30%",
        students: "25,000+",
        tuition: "~€0 (semester fee ~€160)",
        courses: ["Environmental Sciences", "Medicine", "Law", "Biology", "History", "Computer Science"]
    },
    "humboldt university of berlin": {
        description: "One of the world's most historic universities, Humboldt invented the modern research university model and continues to excel in humanities and sciences.",
        location: "Berlin",
        ranking: "#120 World (QS 2025)",
        acceptanceRate: "~30%",
        students: "33,000+",
        tuition: "~€0 (semester fee ~€310)",
        courses: ["Philosophy", "Law", "Medicine", "Natural Sciences", "Economics", "Cultural Studies"]
    },
    "university of bonn": {
        description: "A world-class German university with a particularly strong reputation in mathematics, natural sciences, and social sciences.",
        location: "Bonn, North Rhine-Westphalia",
        ranking: "#201 World (QS 2025)",
        acceptanceRate: "~35%",
        students: "36,000+",
        tuition: "~€0 (semester fee ~€300)",
        courses: ["Mathematics", "Natural Sciences", "Agriculture", "Catholic Theology", "Law", "Medicine"]
    },

    // ─── UNITED STATES ──────────────────────────────────────────
    "harvard university": {
        description: "Consistently ranked as one of the world's most prestigious universities, Harvard is renowned for its academic excellence across all disciplines.",
        location: "Cambridge, Massachusetts",
        ranking: "#4 World (QS 2025)",
        acceptanceRate: "~3%",
        students: "23,000+",
        tuition: "USD 55,000–65,000/yr",
        courses: ["Law", "Medicine", "Business Administration", "Engineering", "Arts & Sciences", "Computer Science"]
    },
    "stanford university": {
        description: "A global leader for research and innovation, Stanford is located in the heart of Silicon Valley and is known for its entrepreneurial spirit.",
        location: "Stanford, California",
        ranking: "#5 World (QS 2025)",
        acceptanceRate: "~4%",
        students: "17,000+",
        tuition: "USD 60,000–70,000/yr",
        courses: ["Computer Science", "Engineering", "Business", "Medicine", "Law", "Sustainability"]
    },
    "mit - massachusetts institute of technology": {
        description: "World-renowned for its science, engineering, and technology programs, producing many of the most influential innovators of our time.",
        location: "Cambridge, Massachusetts",
        ranking: "#1 World (QS 2025)",
        acceptanceRate: "~4%",
        students: "12,000+",
        tuition: "USD 58,000–68,000/yr",
        courses: ["Aerospace Engineering", "Artificial Intelligence", "Physics", "Architecture", "Management", "Biological Engineering"]
    },

    // ─── NEW ZEALAND ─────────────────────────────────────────────
    "university of auckland": {
        description: "New Zealand's largest and top-ranked university, offering a wide range of state-of-the-art facilities and a strong research focus.",
        location: "Auckland",
        ranking: "#65 World (QS 2025)",
        acceptanceRate: "~45%",
        students: "44,000+",
        tuition: "NZD 32,000–50,000/yr",
        courses: ["Marine Science", "Engineering", "Law", "Education", "Pharmacy", "Arts"]
    },
    "university of otago": {
        description: "New Zealand's oldest university, famous for its outstanding health science programs and a highly vibrant student life.",
        location: "Dunedin",
        ranking: "#214 World (QS 2025)",
        acceptanceRate: "~50%",
        students: "21,000+",
        tuition: "NZD 30,000–48,000/yr",
        courses: ["Medicine", "Dentistry", "Physiotherapy", "Science", "Business", "Humanities"]
    },
};

// Helper function to get university details with a fallback
export function getUniversityDetails(name: string): UniversityDetail {
    const key = name.toLowerCase().trim();
    if (universityDetails[key]) {
        return universityDetails[key];
    }

    // Smart fallback for any university in the database but not hardcoded here
    return {
        description: `A highly respected institution known for its commitment to academic excellence, innovative research, and student support. ${name} offers a wide range of state-of-the-art programs and facilities to prepare students for successful global careers.`,
        location: "International Campus",
        ranking: "Top World Ranked",
        acceptanceRate: "Competitive",
        students: "20,000+",
        tuition: "Contact us for precise fee details",
        courses: [
            "Business & Management",
            "Computer Science & IT",
            "Engineering & Technology",
            "Arts & Humanities",
            "Health Sciences & Medicine",
            "Law & Public Policy"
        ]
    };
}
