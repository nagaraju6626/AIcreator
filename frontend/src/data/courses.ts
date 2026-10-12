import { PlayCircle, FileText, Layout, TrendingUp, MonitorPlay, Users, Search, Target } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', title: 'All', icon: Search },
  { id: 'video_creation', title: 'Video Creation', icon: MonitorPlay },
  { id: 'script_writing', title: 'Script Writing', icon: FileText },
  { id: 'thumbnail_design', title: 'Thumbnail Design', icon: Layout },
  { id: 'audience_growth', title: 'Audience Growth', icon: Users },
  { id: 'content_strategy', title: 'Content Strategy', icon: Target },
  { id: 'analytics', title: 'Analytics', icon: TrendingUp },
];

export const COURSES = [
  {
    id: 'c8_travel_vlogging',
    title: 'Travel Vlogging Essentials',
    category: 'video_creation',
    categoryName: 'Video Creation',
    description: 'Master the art of storytelling on the go. B-roll, pacing, and engaging voiceovers.',
    level: 'Intermediate',
    duration: '18 min',
    icon: MonitorPlay,
    niches: ["Travel", "Lifestyle"],
    skills: ["Video Editing", "Photography", "Storytelling"],
    audiences: ["General Audience"],
    platforms: ["YouTube", "Instagram"],
    content_types: ["Long Videos", "Short Videos", "Stories"],
    goals: ["Build a Personal Brand", "Grow Followers", "Have Fun"],
    lessons: [
      {
        id: 'l1',
        title: 'Shooting B-Roll',
        explanation: 'B-roll is what makes a travel vlog cinematic. You need establishing shots, detail shots, and action shots.',
        exampleHook: 'A cinematic drone shot fading into a close-up of a coffee cup.',
        exampleWhy: ['Establishes location and mood'],
        exercisePrompt: 'List 3 B-roll shots you would need for a vlog about a trip to Paris.'
      }
    ]
  },
  {
    id: 'c1_viral_scripts',
    title: 'How to Write Viral Short-Form Scripts',
    category: 'script_writing',
    categoryName: 'Script Writing',
    description: 'Learn the anatomy of a viral short-form script, from the hook to the CTA.',
    level: 'Beginner',
    duration: '12 min',
    icon: FileText,
    niches: ["Tech & Coding", "Fitness", "Fashion", "Travel", "Gaming", "Finance", "Education", "Lifestyle", "Artificial Intelligence", "Programming"],
    skills: ["Writing", "Teaching", "Marketing", "Communication"],
    audiences: ["Students", "Beginners", "General Audience", "Gamers", "Fitness Enthusiasts"],
    platforms: ["TikTok", "Instagram", "YouTube", "Multiple Platforms"],
    content_types: ["Short Videos", "Reels / Shorts", "Educational Content"],
    goals: ["Grow Followers", "Build a Personal Brand", "Teach Others"],
    lessons: [
      {
        id: 'l1',
        title: 'The 3-Second Rule',
        explanation: "The first 3 seconds of your video determine whether viewers stay or swipe.",
        exampleHook: "\"Stop wasting hours debugging. These 3 VS Code extensions will code for you.\"",
        exampleWhy: ["Creates immediate curiosity", "Identifies a painful problem"],
        exercisePrompt: "Write a 3-second hook for a video."
      }
    ]
  },
  {
    id: 'c2_3_second_hook',
    title: 'Mastering the 3-Second Hook',
    category: 'content_strategy',
    categoryName: 'Content Strategy',
    description: 'Deep dive into creating irresistible hooks for any niche.',
    level: 'Intermediate',
    duration: '8 min',
    icon: PlayCircle,
    niches: ["Artificial Intelligence", "Programming", "Technology", "Education", "Gaming"],
    skills: ["Video Editing", "Writing", "Marketing"],
    audiences: ["General Audience", "Beginners", "Students"],
    platforms: ["YouTube", "Instagram", "TikTok"],
    content_types: ["Short Videos", "Reels / Shorts"],
    goals: ["Grow Followers", "Build a Personal Brand"],
    lessons: [
      {
        id: 'l1',
        title: 'Visual vs Audio Hooks',
        explanation: "A hook isn't just what you say. It's what the viewer sees.",
        exampleHook: "Audio: \"You've been using ChatGPT wrong this whole time.\"",
        exampleWhy: ["Aggressive visual movement stops scroll"],
        exercisePrompt: "Describe the visual and audio hook."
      }
    ]
  },
  {
    id: 'c3_thumbnails',
    title: 'Design Thumbnails That Convert',
    category: 'thumbnail_design',
    categoryName: 'Thumbnail Design',
    description: 'Learn the psychology of colors, contrast, and faces in thumbnails.',
    level: 'Beginner',
    duration: '15 min',
    icon: Layout,
    niches: ["Gaming", "Lifestyle", "Fitness", "Fashion", "Beauty", "Design", "Finance", "Tech & Coding Tutorials"],
    skills: ["Designing", "Photography", "Marketing"],
    audiences: ["General Audience", "Gamers", "Fitness Enthusiasts"],
    platforms: ["YouTube"],
    content_types: ["Long Videos", "Tutorials"],
    goals: ["Grow Followers", "Make Money", "Build a Career"],
    lessons: [
      {
        id: 'l1',
        title: 'The 3-Element Rule',
        explanation: "A thumbnail should never have more than 3 distinct visual elements.",
        exampleHook: "Element 1: Expressive Face. Element 2: Bold Text.",
        exampleWhy: ["High contrast draws the eye"],
        exercisePrompt: "Describe the 3 elements."
      }
    ]
  },
  {
    id: 'c4_analytics',
    title: 'Algorithm & Analytics Basics',
    category: 'analytics',
    categoryName: 'Analytics',
    description: 'Understand retention graphs, click-through rates, and algorithmic reach.',
    level: 'Intermediate',
    duration: '22 min',
    icon: TrendingUp,
    niches: ["Finance", "Programming", "Technology", "Education", "Gaming", "Lifestyle", "Fitness", "Fashion"],
    skills: ["Marketing", "Other"],
    audiences: ["General Audience", "Professionals"],
    platforms: ["YouTube", "Instagram", "TikTok"],
    content_types: ["Short Videos", "Long Videos"],
    goals: ["Make Money", "Build a Career", "Grow Followers"],
    lessons: [
      {
        id: 'l1',
        title: 'Understanding Retention',
        explanation: "Retention is king.",
        exampleHook: "Checking the \"Relative Audience Retention\" graph.",
        exampleWhy: ["Identifies exact moments viewers leave"],
        exercisePrompt: "If your video has a huge drop-off what is wrong?"
      }
    ]
  },
  {
    id: 'c5_fitness_creation',
    title: 'Fitness Content Creation',
    category: 'video_creation',
    categoryName: 'Video Creation',
    description: 'How to shoot and edit high-quality fitness tutorials and workout reels.',
    level: 'Intermediate',
    duration: '20 min',
    icon: MonitorPlay,
    niches: ["Fitness", "Lifestyle", "Health"],
    skills: ["Video Editing", "Photography", "Teaching"],
    audiences: ["Fitness Enthusiasts", "Beginners", "General Audience"],
    platforms: ["Instagram", "TikTok", "YouTube"],
    content_types: ["Reels / Shorts", "Short Videos", "Tutorials"],
    goals: ["Build a Personal Brand", "Teach Others", "Grow Followers"],
    lessons: [
      {
        id: 'l1',
        title: 'Lighting and Angles',
        explanation: "Proper form visibility requires clear lighting and specific camera placement.",
        exampleHook: "Shooting from a low angle to make the movement look powerful.",
        exampleWhy: ["Clear form demonstration"],
        exercisePrompt: "What is the best angle for a squat tutorial?"
      }
    ]
  },
  {
    id: 'c6_tech_coding_tutorials',
    title: 'Coding Tutorial Content Creation',
    category: 'video_creation',
    categoryName: 'Video Creation',
    description: 'Learn to screen-record, zoom, and explain complex code clearly.',
    level: 'Advanced',
    duration: '25 min',
    icon: MonitorPlay,
    niches: ["Tech & Coding Tutorials", "Programming", "Technology", "Artificial Intelligence", "Education"],
    skills: ["Python", "Java", "Web Development", "Teaching", "AI / Machine Learning"],
    audiences: ["Developers", "Students", "Beginners", "Professionals"],
    platforms: ["YouTube", "LinkedIn", "Multiple Platforms"],
    content_types: ["Tutorials", "Educational Content", "Long Videos"],
    goals: ["Teach Others", "Build a Career", "Share Knowledge"],
    lessons: [
      {
        id: 'l1',
        title: 'Screen Recording Best Practices',
        explanation: "Use screen zoom and highlights so viewers can actually read the code on mobile.",
        exampleHook: "Zooming in on the terminal output during a critical error.",
        exampleWhy: ["Improves mobile readability"],
        exercisePrompt: "How would you explain a complex for-loop visually?"
      }
    ]
  },
  {
    id: 'c7_fashion_styling',
    title: 'Fashion & Styling Videos',
    category: 'video_creation',
    categoryName: 'Video Creation',
    description: 'Create aesthetic OOTD videos and transition reels.',
    level: 'Beginner',
    duration: '14 min',
    icon: MonitorPlay,
    niches: ["Fashion", "Beauty", "Lifestyle"],
    skills: ["Video Editing", "Designing", "Photography"],
    audiences: ["General Audience", "Beginners"],
    platforms: ["Instagram", "TikTok"],
    content_types: ["Reels / Shorts", "Stories", "Short Videos"],
    goals: ["Build a Personal Brand", "Have Fun"],
    lessons: [
      {
        id: 'l1',
        title: 'The Jump Cut Transition',
        explanation: "Seamlessly switch outfits by maintaining identical framing.",
        exampleHook: "Jumping and landing in a completely new outfit.",
        exampleWhy: ["Visually satisfying"],
        exercisePrompt: "Plan a 3-outfit transition sequence."
      }
    ]
  },
];
