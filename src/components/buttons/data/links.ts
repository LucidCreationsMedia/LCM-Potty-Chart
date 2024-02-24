export interface LinkObj {
  href?: string;
  name?: string;
  type: "primary" | "secondary" | "updates" | "ko-fi";
}

type Links = LinkObj[];

const links: Links = [
  {
    href: "https://docs.google.com/document/d/1hrerGKHTO3iach8A-CabtfIB4lyZWlgO8EGTyOCrI2Y",
    name: "Roadmap and Progress",
    type: "secondary"
  },
  {
    href: "https://lucidcreations.media/lcm-potty-chart/",
    name: "Official Announcement",
    type: "secondary"
  },
  // {
  //   type: "ko-fi"
  // },
  {
    href: "https://t.me/LucidCreationsMedia",
    name: "Dev Updates",
    type: "secondary"
  }
];

export default links;
