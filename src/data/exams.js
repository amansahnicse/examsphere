import {
  Landmark,
  Scale,
  BriefcaseBusiness,
  IndianRupee,
  TrainFront,
  Shield,
  GraduationCap,
} from "lucide-react";

export const examData = [
  {
    id: "upsc-cse",
    slug: "upsc-civil-services",
    name: "UPSC Civil Services",
    short: "UPSC CSE",
    category: "Civil Services",
    organisation: "Union Public Service Commission",
    level: "National",

    icon: Landmark,
    color: "blue",

    description:
      "Prepare for India's prestigious civil services examination.",

    qualification: "Graduation",
    age: "21–32 Years",
    salary: "₹56,100+",
    region: "All India",

    tags: ["IAS", "IPS", "IFS"],
    popular: true,

    eligibilityRules: {
      status: "unverified",
      message:
        "Final eligibility must be checked against the official UPSC notification.",
    },
  },

  {
    id: "bpsc-cce",
    slug: "bpsc-combined-competitive-exam",
    name: "BPSC Combined Competitive Exam",
    short: "BPSC CCE",
    category: "State PSC",
    organisation: "Bihar Public Service Commission",
    level: "State",

    icon: Scale,
    color: "violet",

    description:
      "Explore Bihar state civil services and administrative roles.",

    qualification: "Graduation",
    age: "As per notification",
    salary: "As per post",
    region: "Bihar",

    tags: ["Bihar", "State Services"],
    popular: true,

    eligibilityRules: {
      status: "unverified",
      message:
        "Age limits and other conditions must be checked against the official BPSC notification.",
    },
  },

  {
    id: "ssc-cgl",
    slug: "ssc-combined-graduate-level",
    name: "SSC Combined Graduate Level",
    short: "SSC CGL",
    category: "Staff Selection",
    organisation: "Staff Selection Commission",
    level: "National",

    icon: BriefcaseBusiness,
    color: "orange",

    description:
      "Explore graduate-level central government opportunities.",

    qualification: "Graduation",
    age: "As per post",
    salary: "As per post",
    region: "All India",

    tags: ["Graduate", "Central Govt."],
    popular: true,

    eligibilityRules: {
      status: "unverified",
      message:
        "Post-wise age limits and qualifications must be checked in the official SSC notification.",
    },
  },

  {
    id: "ibps-po",
    slug: "ibps-probationary-officer",
    name: "IBPS Probationary Officer",
    short: "IBPS PO",
    category: "Banking",
    organisation:
      "Institute of Banking Personnel Selection",
    level: "National",

    icon: IndianRupee,
    color: "green",

    description:
      "Start your journey towards a banking officer career.",

    qualification: "Graduation",
    age: "20–30 Years",
    salary: "As per bank",
    region: "All India",

    tags: ["Banking", "Officer"],
    popular: false,

    eligibilityRules: {
      status: "unverified",
      message:
        "Age, nationality and qualification conditions must be checked against the official IBPS notification.",
    },
  },

  {
    id: "rrb-ntpc",
    slug: "rrb-non-technical-popular-categories",
    name: "RRB Non-Technical Popular Categories",
    short: "RRB NTPC",
    category: "Railway",
    organisation: "Railway Recruitment Boards",
    level: "National",

    icon: TrainFront,
    color: "red",

    description:
      "Explore non-technical railway recruitment opportunities.",

    qualification: "12th / Graduation",
    age: "As per notification",
    salary: "As per post",
    region: "All India",

    tags: ["Railway", "Recruitment"],
    popular: true,

    eligibilityRules: {
      status: "unverified",
      message:
        "Eligibility differs between undergraduate and graduate posts. Check the official RRB notification.",
    },
  },

  {
    id: "nda",
    slug: "national-defence-academy",
    name: "National Defence Academy",
    short: "NDA",
    category: "Defence",
    organisation: "Union Public Service Commission",
    level: "National",

    icon: Shield,
    color: "navy",

    description:
      "Discover the pathway to a career in the armed forces.",

    qualification: "12th",
    age: "As per notification",
    salary: "Training-based",
    region: "All India",

    tags: ["Defence", "Officer"],
    popular: false,

    eligibilityRules: {
      status: "unverified",
      message:
        "Age, educational stream and physical standards must be checked against the official NDA notification.",
    },
  },

  {
    id: "ctet",
    slug: "central-teacher-eligibility-test",
    name: "Central Teacher Eligibility Test",
    short: "CTET",
    category: "Teaching",
    organisation: "Central Board of Secondary Education",
    level: "National",

    icon: GraduationCap,
    color: "purple",

    description:
      "Explore the eligibility test for aspiring teachers.",

    qualification: "As per paper",
    age: "No upper age limit specified",
    salary: "Not applicable",
    region: "All India",

    tags: ["Teaching", "Education"],
    popular: false,

    eligibilityRules: {
      status: "unverified",
      message:
        "Paper-wise educational qualifications must be checked against the official CTET information bulletin.",
    },
  },

  {
    id: "upsc-capf",
    slug: "upsc-capf-assistant-commandant",
    name: "UPSC CAPF Assistant Commandant",
    short: "UPSC CAPF",
    category: "Defence",
    organisation: "Union Public Service Commission",
    level: "National",

    icon: Shield,
    color: "green",

    description:
      "Explore the Assistant Commandant recruitment in Central Armed Police Forces.",

    qualification: "Graduation",
    age: "20–25 Years",
    salary: "As per rules",
    region: "All India",

    tags: ["CAPF", "Assistant Commandant"],
    popular: false,

    eligibilityRules: {
      status: "unverified",
      message:
        "Age relaxation, physical standards and other conditions must be checked against the official UPSC notification.",
    },
  },
];

export const examCategories = [
  "All Exams",
  "Civil Services",
  "State PSC",
  "Staff Selection",
  "Banking",
  "Railway",
  "Defence",
  "Teaching",
];

export function getExamBySlug(slug) {
  return examData.find((exam) => exam.slug === slug);
}

export function getExamByName(name) {
  return examData.find(
    (exam) =>
      exam.name.toLowerCase() === name?.toLowerCase() ||
      exam.short.toLowerCase() === name?.toLowerCase()
  );
}