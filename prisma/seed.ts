import { prisma } from "@/lib/prisma";

const usersData = [
  {
    id: "000000000001",
    name: "Hugo",
    email: "hmlomba@gmail.com",
    image:
      "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/hugo_xicqar.png",
    bio: "Passionate about technology and blogging.",
  },
  {
    id: "000000000002",
    name: "Andrea",
    email: "andrea@example.com",
    image:
      "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/andrea_m4z2tx.png",
    bio: "Loves cats, coffee, and sharing moments.",
  },
  {
    id: "000000000003",
    name: "Medusa",
    email: "medusa@example.com",
    image:
      "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/medusa_oziz8c.png",
    bio: "Curious cat who loves naps and treats.",
  },
  {
    id: "000000000004",
    name: "Patricia",
    email: "patricia@example.com",
    image:
      "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/patricia_jcwij6.png",
    bio: "Nature lover and coffee enthusiast.",
  },
  {
    id: "000000000005",
    name: "Rafaela",
    email: "rafaela@example.com",
    image:
      "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/rafaela_tqf6y5.png",
    bio: "Bookworm and aspiring writer.",
  },
];

const postContents: { [key: string]: string } = {
  "Remote Work Productivity": `
    <p>Remote work has become the new normal for many professionals around the world. While it offers flexibility, it also brings unique challenges.</p>
    <p><strong>Time management</strong> is crucial. Without a structured routine, it's easy to lose focus and procrastinate.</p>
    <p>Creating a dedicated workspace can drastically improve your efficiency. This helps your brain distinguish between work and leisure.</p>
    <p>Regular breaks are essential to prevent burnout. Techniques like the Pomodoro method can help maintain productivity throughout the day.</p>
    <p><strong>Communication</strong> is another important factor. Stay connected with your team using video calls, chat tools, and collaborative documents.</p>
    <p>Finally, prioritize mental health. Remote work can be isolating, so maintain social interactions and exercise regularly.</p>
  `,
  "Urban Gardening Tips": `
    <p>Urban gardening is a rewarding hobby that brings greenery to city living spaces. Even small balconies can host thriving plants.</p>
    <p>Start with easy-to-grow herbs like basil, mint, or rosemary. They not only provide fresh ingredients but also add fragrance.</p>
    <p>Vertical gardening is a fantastic solution for limited space. You can use wall-mounted planters or stacked pots.</p>
    <p>Remember to water consistently and provide adequate sunlight. A daily check on soil moisture prevents over or under-watering.</p>
    <p><strong>Community involvement</strong> enhances the experience. Join local gardening groups or exchange tips with neighbors.</p>
    <p>Over time, urban gardening can transform concrete spaces into lush green sanctuaries, improving air quality and mental well-being.</p>
  `,
  "Cryptocurrency Basics": `
    <p>Cryptocurrency has revolutionized digital finance, offering decentralized alternatives to traditional banking.</p>
    <p>Bitcoin is the pioneer, followed by other coins like Ethereum, Cardano, and Solana. Each has its ecosystem and use cases.</p>
    <p>Understanding wallets and exchanges is key. Secure storage of private keys ensures the safety of your assets.</p>
    <p>Investing responsibly is crucial due to high volatility. Diversification and research minimize risks.</p>
    <p><strong>Smart contracts</strong> on platforms like Ethereum allow for decentralized applications, creating a new frontier in technology.</p>
    <p>Staying informed about market trends and regulatory updates helps investors navigate the crypto landscape confidently.</p>
  `,
  "Mindful Meditation Techniques": `
    <p>Mindfulness meditation cultivates awareness and presence, reducing stress and enhancing mental clarity.</p>
    <p>Start with short sessions of 5–10 minutes. Focus on your breath and gently observe passing thoughts.</p>
    <p>Body scanning is an effective technique to connect with physical sensations and release tension.</p>
    <p>Visualization exercises, like imagining a peaceful place, help relax the mind and enhance focus.</p>
    <p><strong>Consistency</strong> is key. Daily practice strengthens attention and emotional resilience over time.</p>
    <p>Combine meditation with journaling or mindful walking for a holistic approach to mindfulness.</p>
  `,
  "Book Recommendations for Writers": `
    <p>Every writer benefits from reading both for inspiration and skill development. Here’s a selection of books to consider:</p>
    <ul>
      <li><strong>On Writing</strong> by Stephen King – insights into the craft and mindset of a successful writer.</li>
      <li><strong>Bird by Bird</strong> by Anne Lamott – practical advice and encouragement for every stage of writing.</li>
      <li><strong>The Elements of Style</strong> by Strunk and White – essential grammar and style guide.</li>
      <li><strong>Writing Down the Bones</strong> by Natalie Goldberg – creative prompts and techniques.</li>
      <li><strong>Big Magic</strong> by Elizabeth Gilbert – inspiration to pursue creative endeavors fearlessly.</li>
    </ul>
    <p>Reading widely enhances vocabulary, exposes you to diverse styles, and fuels creativity for your own writing projects.</p>
  `,
  "Healthy Eating on a Budget": `
    <p>Eating healthy doesn’t have to be expensive. Smart planning and simple habits make a big difference.</p>
    <p>Buy seasonal fruits and vegetables – they are cheaper and more nutritious.</p>
    <p>Cooking at home saves money compared to eating out. Batch cooking and meal prep ensure balanced meals throughout the week.</p>
    <p>Incorporate legumes, whole grains, and frozen vegetables. They are cost-effective and nutrient-rich.</p>
    <p><strong>Reduce processed foods</strong> and sugary drinks; they often cost more and offer little nutritional value.</p>
    <p>Plan grocery lists carefully and avoid impulse buys to stay within budget while eating well.</p>
  `,
  "Traveling on a Shoestring": `
    <p>Traveling doesn’t have to break the bank. Budget travel is about smart choices and creativity.</p>
    <p>Use local transport instead of taxis, and stay in hostels or affordable guesthouses.</p>
    <p>Cook some meals if possible; it’s cheaper and allows experiencing local ingredients.</p>
    <p><strong>Plan ahead</strong> for attractions and free events to enjoy destinations without overspending.</p>
    <p>Travel insurance is important; it prevents unexpected costs from medical emergencies or lost luggage.</p>
    <p>Engage with local communities, exchange tips, and immerse in authentic experiences while keeping expenses low.</p>
  `,
  "Improving Sleep Quality": `
    <p>Quality sleep is fundamental for physical and mental health. Establishing routines enhances restfulness.</p>
    <p>Keep a consistent sleep schedule. Go to bed and wake up at the same times every day.</p>
    <p>Limit screen time before sleep. Blue light from devices can disrupt melatonin production.</p>
    <p><strong>Relaxation techniques</strong> like reading, meditation, or gentle stretching prepare the body for rest.</p>
    <p>Ensure the bedroom is dark, quiet, and cool. A comfortable mattress and pillow improve sleep quality.</p>
    <p>Avoid caffeine and heavy meals close to bedtime to prevent disturbances during the night.</p>
  `,
  "Home Workout Routines": `
    <p>Exercising at home is convenient and effective. Minimal equipment is needed to stay fit.</p>
    <p>Bodyweight exercises like push-ups, squats, and planks build strength and endurance.</p>
    <p>Incorporate cardio with jumping jacks, running in place, or skipping rope.</p>
    <p><strong>Consistency</strong> is key. Establish a schedule and gradually increase intensity to see results.</p>
    <p>Stretching and warm-ups prevent injuries and improve flexibility.</p>
    <p>Track progress and celebrate milestones to stay motivated and committed to home fitness.</p>
  `,
  "Personal Finance 101": `
    <p>Managing personal finances is a life skill that impacts long-term stability and growth.</p>
    <p>Start by budgeting income and expenses. Track where your money goes to identify areas for improvement.</p>
    <p>Build an emergency fund to cover unexpected costs. Aim for 3–6 months of living expenses.</p>
    <p><strong>Debt management</strong> is crucial. Prioritize paying off high-interest debts first.</p>
    <p>Invest wisely to grow wealth. Diversify assets and understand risk tolerance.</p>
    <p>Regularly review financial goals and adjust strategies to maintain control over finances.</p>
  `,
  // Adicione mais posts únicos aqui para completar os 20
  "Time Management Strategies": `<p>Time management is essential to maximize productivity and reduce stress. Effective planning, prioritization, and delegation are key strategies...</p>`,
  "Learning a New Language": `<p>Learning a new language opens doors to new cultures and opportunities. Consistent practice, immersion, and engaging with native speakers accelerate progress...</p>`,
  "Sustainable Living Practices": `<p>Sustainable living involves reducing waste, conserving energy, and making eco-friendly choices. Small daily changes can have a significant impact over time...</p>`,
  "Mental Health Awareness": `<p>Mental health is as important as physical health. Recognizing symptoms, seeking support, and practicing self-care contribute to overall well-being...</p>`,
  "Photography Tips for Beginners": `<p>Photography is both art and skill. Understanding lighting, composition, and camera settings is essential. Experimentation and practice improve your results...</p>`,
  "Cooking Quick Meals": `<p>Quick meals are ideal for busy schedules. Using fresh ingredients, simple recipes, and batch cooking saves time while maintaining nutrition...</p>`,
  "Effective Study Techniques": `<p>Effective studying involves active engagement, spaced repetition, and focused sessions. Planning study times and minimizing distractions enhance learning...</p>`,
  "Building a Personal Brand": `<p>Personal branding showcases your skills, values, and personality. Consistency, authenticity, and visibility online help create a strong personal brand...</p>`,
  "Stress Management Tips": `<p>Managing stress involves mindfulness, exercise, and time management. Identifying stressors and implementing coping strategies improves mental health...</p>`,
  "Digital Nomad Lifestyle": `<p>Living as a digital nomad combines work and travel. Planning finances, reliable internet, and time management are key for a sustainable nomadic lifestyle...</p>`,
};

async function main() {
  console.log("Start seeding...");

  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const users = [];
  for (const u of usersData) {
    const user = await prisma.user.create({ data: u });
    users.push(user);
  }
  console.log(`Created ${users.length} users.`);

  const posts = [];
  for (const topic of Object.keys(postContents)) {
    const post = await prisma.post.create({
      data: {
        title: topic,
        content: postContents[topic],
        coverImage: `https://picsum.photos/seed/${topic.replace(
          /\s+/g,
          "-"
        )}/800/400`,
        authorId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
    posts.push(post);
  }
  console.log(`Created ${posts.length} posts.`);

  const sampleComments = [
    "Great insights! Thanks for sharing.",
    "I totally agree with your points.",
    "This was really helpful, I learned a lot.",
    "Interesting perspective, I hadn't thought about it that way.",
    "Thanks for the tips, I will try them!",
    "Amazing post! Really enjoyed reading.",
    "I have a question about one of the steps you mentioned.",
    "This is so informative, keep it up!",
    "I appreciate you breaking this down so clearly.",
    "Looking forward to more posts like this.",
  ];

  for (let i = 0; i < 100; i++) {
    await prisma.comment.create({
      data: {
        content:
          sampleComments[Math.floor(Math.random() * sampleComments.length)],
        authorId: users[Math.floor(Math.random() * users.length)].id,
        postId: posts[Math.floor(Math.random() * posts.length)].id,
      },
    });
  }
  console.log("Created 100 comments.");

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
