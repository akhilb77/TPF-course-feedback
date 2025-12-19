import { Course, Review, Department } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    code: "CS101",
    name: "Introduction to Computer Science",
    department: Department.CS,
    instructor: "Dr. Alan Turing",
    credits: 4,
    description: "Foundational concepts of computing, programming, and algorithm design.",
    averageRating: 4.5,
    difficulty: 2.5
  },
  {
    id: "2",
    code: "CS302",
    name: "Machine Learning Foundations",
    department: Department.CS,
    instructor: "Dr. Fei-Fei Li",
    credits: 4,
    description: "Deep dive into statistical learning, neural networks, and pattern recognition.",
    averageRating: 4.8,
    difficulty: 4.2
  },
  {
    id: "3",
    code: "EE201",
    name: "Digital Circuits",
    department: Department.EE,
    instructor: "Dr. Nikola Tesla",
    credits: 3,
    description: "Design and analysis of digital logic gates, flip-flops, and memory systems.",
    averageRating: 3.9,
    difficulty: 3.8
  },
  {
    id: "4",
    code: "MATH205",
    name: "Linear Algebra",
    department: Department.MATH,
    instructor: "Dr. Gilbert Strang",
    credits: 3,
    description: "Vector spaces, matrices, and their applications in modern data science.",
    averageRating: 4.7,
    difficulty: 3.5
  },
  {
    id: "5",
    code: "ECON101",
    name: "Principles of Microeconomics",
    department: Department.ECON,
    instructor: "Dr. Adam Smith",
    credits: 3,
    description: "Study of individual agents and markets, supply and demand, and market failure.",
    averageRating: 4.1,
    difficulty: 2.2
  },
  {
    id: "6",
    code: "CS405",
    name: "Advanced Robotics",
    department: Department.CS,
    instructor: "Dr. Rodney Brooks",
    credits: 4,
    description: "Kinematics, dynamics, and control of robotic systems.",
    averageRating: 4.3,
    difficulty: 4.5
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    courseId: "2",
    reviewerName: "John Doe",
    rating: 5,
    teachingMethod: "Project-based learning with heavy coding.",
    examStructure: "One mid-term and a final group project.",
    leniency: "Strict but fair.",
    gradingComments: "Grading is based on code quality and documentation.",
    extraClasses: "None",
    comment: "This course is amazing! The coding assignments are tough but you learn so much.",
    timestamp: "2023-11-15",
    yearOfStudy: "3rd Year",
    section: "A",
    department: Department.CS
  },
  {
    id: "r2",
    courseId: "2",
    reviewerName: "Jane Smith",
    rating: 4,
    teachingMethod: "Theoretical lectures and weekly labs.",
    examStructure: "Open-book mid-term and closed-book final.",
    leniency: "Very lenient.",
    gradingComments: "Focuses on effort and understanding rather than just correct answers.",
    extraClasses: "Optional weekend review sessions.",
    comment: "Very math-heavy. Ensure you review your linear algebra before starting. Dr. Li is brilliant.",
    timestamp: "2023-12-01",
    yearOfStudy: "4th Year",
    section: "B",
    department: Department.CS
  },
  {
    id: "r3",
    courseId: "1",
    reviewerName: "Sam Wilson",
    rating: 5,
    teachingMethod: "Interactive slides and live coding demos.",
    examStructure: "Bi-weekly quizzes and a final exam.",
    leniency: "Fair.",
    gradingComments: "Points deducted for poor code formatting.",
    extraClasses: "None",
    comment: "Great intro course. Python is fun and the projects are manageable.",
    timestamp: "2023-10-20",
    yearOfStudy: "1st Year",
    section: "C",
    department: Department.CS
  },
  {
    id: "r4",
    courseId: "4",
    reviewerName: "Alice Wonderland",
    rating: 5,
    teachingMethod: "Traditional whiteboard lectures.",
    examStructure: "Two mid-terms and a final.",
    leniency: "Moderate.",
    gradingComments: "Partial credit given for showing the right logic.",
    extraClasses: "Rarely",
    comment: "Essential for any tech major. Dr. Strang makes complex topics so simple with his analogies.",
    timestamp: "2023-09-12",
    yearOfStudy: "2nd Year",
    section: "A",
    department: Department.MATH
  }
];
