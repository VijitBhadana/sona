export interface Story {
  id: number;
  src: string;
  title: string;
  line: string;
  /** object-position so the face stays in frame */
  focus?: string;
}

export const STORIES: Story[] = [
  { id: 1, src: "/photos/p2.jpg", title: "Woh hansi", line: "When you laugh, the whole room does Diwali.", focus: "50% 30%" },
  { id: 2, src: "/photos/p3.jpg", title: "Kitaab wali", line: "Books in hand, mischief in the eyes.", focus: "40% 40%" },
  { id: 3, src: "/photos/p1.jpg", title: "Nazrein", line: "Soft glances that say more than words.", focus: "60% 55%" },
  { id: 4, src: "/photos/p4.jpg", title: "Mehendi", line: "Mehendi on the hands, a little shy behind them.", focus: "50% 45%" },
  { id: 5, src: "/photos/p5.jpg", title: "Golden hour", line: "Golden light, and still you're the brightest thing in frame.", focus: "36% 50%" },
  { id: 6, src: "/photos/p8.jpg", title: "Khayalon mein", line: "Lost in thought… hopefully about me.", focus: "35% 45%" },
  { id: 7, src: "/photos/p7.jpg", title: "Woh look", line: "The 'don't mess with me' look. I'd still mess with you.", focus: "35% 45%" },
  { id: 8, src: "/photos/p6.jpg", title: "Sitaara", line: "One more star among the fairy lights.", focus: "40% 50%" },
];
