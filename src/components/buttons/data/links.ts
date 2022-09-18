export interface LinkObj {
  href?: string;
  name?: string;
  type: "primary" | "secondary" | "twitter" | "ko-fi";
}

type Links = LinkObj[];

const links: Links = [
  {
    href: "https://docs.google.com/document/d/1hrerGKHTO3iach8A-CabtfIB4lyZWlgO8EGTyOCrI2Y",
    name: "Roadmap and Progress",
    type: "secondary"
  },
  {
    href: "https://lucidcreations.media/introducing-code-name-potty-chart/",
    name: "Original Announcement",
    type: "secondary"
  },
  {
    type: "ko-fi"
  },
  {
    type: "twitter"
  }
];

export default links;
