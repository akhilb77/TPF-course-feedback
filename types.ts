export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  instructor: string;
  credits: number;
  description: string;
  averageRating: number;
  difficulty: number;
}

export interface Review {
  id: string;
  courseId: string;
  reviewerName: string;
  rating: number; // Mapping from "How easy is the course?"
  teachingMethod: string;
  examStructure: string;
  leniency: string;
  gradingComments: string;
  extraClasses: string;
  comment: string; // Mapping from "Anything you wanna say..."
  timestamp: string;
  yearOfStudy: string;
  section: string;
  department: string;
}

export interface FilterState {
  search: string;
  department: string;
}

export enum Department {
  CS = "Computer Science",
  EE = "Electrical Engineering",
  ME = "Mechanical Engineering",
  MATH = "Mathematics",
  PHYS = "Physics",
  ECON = "Economics",
  PSY = "Psychology",
  LIT = "Literature",
  OTHER = "Other"
}
