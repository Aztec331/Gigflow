const gigs = [
  {
    id: 1,
    title: "React Dashboard Development",
    category: "Web Development"
  },
  {
    id: 2,
    title: "UI/UX Design for SaaS",
    category: "Design"
  },
  {
    id: 3,
    title: "Node.js REST API",
    category: "Web Development"
  }
];

const selectedCategory = "Web Development";

const filteredGigs = gigs.filter((gig) => {
  // For each gig, return true to keep it or false to remove it.
  return gig.category === selectedCategory;
});

console.log("Original gigs:", gigs);
console.log("Filtered gigs:", filteredGigs);
