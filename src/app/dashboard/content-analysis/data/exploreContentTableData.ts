export type ExploreContentTableItemType = {
  info: string;
  dr: number;
  ur: number;
  bss: number;
  page_type: string;
  rating: number;
  cqs: number;
  content_type: string;
  sentiment: string[];
};

export const exploreContentTableData: ExploreContentTableItemType[] = [
  {
    info: "Best Travel Destinations",
    dr: 150,
    ur: 22,
    bss: 15,
    page_type: "Travel Guide",
    rating: 9,
    cqs: 25,
    content_type: "Guide",
    sentiment: ["50%", "40%", "90%"],
  },
  {
    info: "Healthy Living Tips",
    dr: 175,
    ur: 37,
    bss: 20,
    page_type: "Blog",
    rating: 8,
    cqs: 18,
    content_type: "Article",
    sentiment: ["40%", "55%", "80%"],
  },
  {
    info: "Financial Market Updates",
    dr: 210,
    ur: 58,
    bss: 22,
    page_type: "Finance",
    rating: 7,
    cqs: 30,
    content_type: "Report",
    sentiment: ["25%", "65%", "85%"],
  },
  {
    info: "Latest Gadget Reviews",
    dr: 195,
    ur: 48,
    bss: 19,
    page_type: "Blog",
    rating: 6,
    cqs: 22,
    content_type: "Review",
    sentiment: ["35%", "70%", "75%"],
  },
];
