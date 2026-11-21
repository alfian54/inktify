const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");
const Story = require("../models/Story");
const Chapter = require("../models/Chapter");

const SEED_EMAIL = /@inktify\.test$/;

const users = [
  {
    username: "eleanor_vance",
    email: "eleanor@inktify.test",
    bio: "Writes slow-burn fantasy and too much worldbuilding.",
  },
  {
    username: "marcus_li",
    email: "marcus@inktify.test",
    bio: "Sci-fi and LitRPG. Coffee-powered.",
  },
  {
    username: "clara_thorne",
    email: "clara@inktify.test",
    bio: "Mystery, romance, and the occasional ghost.",
  },
];

// genre values are lowercase on purpose: the feed filter matches them exactly
const stories = [
  {
    author: 0,
    title: "Echoes of the Obsidian Throne",
    genre: "fantasy",
    status: "ongoing",
    total: 12,
    published: 9,
    description:
      "In an empire anchored to petrified colossi, sovereign power is mined from the marrow of sleeping gods. A low-caste seismologist discovers the tremors are a countdown.",
  },
  {
    author: 1,
    title: "Signals from the Silent Void",
    genre: "sci-fi",
    status: "completed",
    total: 8,
    published: 8,
    description:
      "A deep-space relay station picks up a message that should be impossible: its own distress call, sent from three years in the future.",
  },
  {
    author: 1,
    title: "Chronicles of the Iron Spire",
    genre: "litrpg",
    status: "ongoing",
    total: 10,
    published: 7,
    description:
      "Reborn into a tower where every floor rewrites the rules, a former accountant learns that the system rewards the patient.",
  },
  {
    author: 2,
    title: "The Clockmaker's Secret",
    genre: "mystery",
    status: "completed",
    total: 6,
    published: 6,
    description:
      "Every clock in the village stopped at 3:17. Only the clockmaker's apprentice noticed that one of them ticked backwards.",
  },
  {
    author: 2,
    title: "Letters Across the Estuary",
    genre: "romance",
    status: "ongoing",
    total: 5,
    published: 4,
    description:
      "Two strangers, one ferry strike, and a stack of letters left in the wrong mailbox.",
  },
  {
    author: 0,
    title: "Song of the Ashen Grove",
    genre: "fantasy",
    status: "ongoing",
    total: 7,
    published: 5,
    description:
      "The last grove burns every autumn and grows back by spring. This year it did not.",
  },
  {
    author: 1,
    title: "Terminal Protocol",
    genre: "sci-fi",
    status: "ongoing",
    total: 6,
    published: 3,
    description:
      "An AI auditor is sent to shut down a failing colony ship and finds the crew has voted to keep it alive.",
  },
  {
    author: 1,
    title: "The Dungeon's Architect",
    genre: "litrpg",
    status: "completed",
    total: 9,
    published: 9,
    description:
      "The dungeon boss is tired of adventurers. So he starts redesigning the dungeon.",
  },
  // a draft story: should NOT appear in the public feed
  {
    author: 2,
    title: "The Glass Cartographer",
    genre: "fantasy",
    status: "draft",
    total: 2,
    published: 0,
    description: "Work in progress.",
  },
];

const chapterTitles = [
  "The Beginning",
  "Whispers in the Vault",
  "A Debt Unpaid",
  "The Quiet Door",
  "Ash and Iron",
  "What the River Kept",
  "The Third Signal",
  "Cold Hands",
  "A Map With No Edges",
  "The Reckoning",
  "Embers",
  "After the Silence",
];

const paragraphs = [
  "The cold did not seep inward through the flesh; it struck directly at the marrow, resonant and harmonic like iron striking frosted slate.",
  "She paused on the landing and counted the stairs again. Forty-one. There had been forty yesterday.",
  '"It will take three men to raise the bar," he murmured, stepping beside her. "And if the ward still hums, none of us walk back through."',
  "Far below, an ancient valve groaned. It was not the sound of simple metal fatigue; it was something being asked to bear more than it was built for.",
  "By morning the village had decided to pretend nothing had happened, which is how villages survive most things.",
  "He reached out, palm hovering an inch above the panel. The air between his skin and the stone did not resist him. It pulled.",
];

const makeContent = (n) => {
  const p = (i) => `<p>${paragraphs[(n + i) % paragraphs.length]}</p>`;
  return `${p(0)}${p(1)}<hr>${p(2)}<blockquote>${p(3)}</blockquote>${p(4)}`;
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  // remove previous seed data only (real accounts are untouched)
  const old = await User.find({ email: SEED_EMAIL }).select("_id");
  const oldIds = old.map((u) => u._id);
  const oldStories = await Story.find({ authorId: { $in: oldIds } }).select(
    "_id",
  );
  await Chapter.deleteMany({ storyId: { $in: oldStories.map((s) => s._id) } });
  await Story.deleteMany({ authorId: { $in: oldIds } });
  await User.deleteMany({ _id: { $in: oldIds } });

  const createdUsers = [];
  for (const u of users) {
    // the pre-save hook hashes this; the plain value only lives here
    createdUsers.push(await User.create({ ...u, passwordHash: "password123" }));
  }

  let chapterCount = 0;
  for (const s of stories) {
    const story = await Story.create({
      authorId: createdUsers[s.author]._id,
      title: s.title,
      genre: s.genre,
      status: s.status,
      description: s.description,
    });

    for (let n = 1; n <= s.total; n++) {
      const isPublished = n <= s.published;
      await Chapter.create({
        storyId: story._id,
        title: `Chapter ${n}: ${chapterTitles[(n - 1) % chapterTitles.length]}`,
        content: makeContent(n),
        order: n,
        status: isPublished ? "published" : "draft",
        publishedAt: isPublished
          ? new Date(Date.now() - (s.total - n) * 86400000)
          : null,
      });
      chapterCount++;
    }
  }

  console.log(
    `Seeded ${createdUsers.length} users, ${stories.length} stories, ${chapterCount} chapters.`,
  );
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
