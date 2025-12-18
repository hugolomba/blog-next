// import { prisma } from "../lib/prisma";
// // import { Prisma } from "./generated/client";
// // import bcrypt from "bcrypt";
// import crypto from "crypto";

// async function seed() {
//   try {
//     console.log("🌱 Seeding database...");

//     // =========================
//     // LIMPAR DADOS
//     // =========================
//     await prisma.comment.deleteMany();
//     await prisma.post.deleteMany();
//     await prisma.session.deleteMany();
//     await prisma.account.deleteMany();
//     await prisma.user.deleteMany();

//     // =========================
//     // PASSWORD PADRÃO
//     // =========================
//     const passwordHash = await bcrypt.hash("123456789", 10);

//     // =========================
//     // USERS
//     // =========================
//     const usersData = [
//       {
//         name: "Hugo",
//         email: "hugo@example.com",
//         image:
//           "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/hugo_xicqar.png",
//         bio: "Passionate about technology and blogging.",
//       },
//       {
//         name: "Andrea",
//         email: "andrea@example.com",
//         image:
//           "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/andrea_m4z2tx.png",
//         bio: "Loves cats, coffee, and sharing moments.",
//       },
//       {
//         name: "Medusa",
//         email: "medusa@example.com",
//         image:
//           "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/medusa_oziz8c.png",
//         bio: "Curious cat who loves naps and treats.",
//       },
//       {
//         name: "Patricia",
//         email: "patricia@example.com",
//         image:
//           "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/patricia_jcwij6.png",
//         bio: "Nature lover and coffee enthusiast.",
//       },
//       {
//         name: "Rafaela",
//         email: "rafaela@example.com",
//         image:
//           "https://res.cloudinary.com/dck0d5qwp/image/upload/v1756982340/rafaela_tqf6y5.png",
//         bio: "Bookworm and aspiring writer.",
//       },
//     ];

//     const createdUsers = [];

//     for (const userData of usersData) {
//       const userId = crypto.randomUUID();

//       const user = await prisma.user.create({
//         data: {
//           id: userId,
//           name: userData.name,
//           email: userData.email,
//           emailVerified: true,
//           image: userData.image,
//           bio: userData.bio,
//         },
//       });

//       await prisma.account.create({
//         data: {
//           id: crypto.randomUUID(),
//           userId: user.id,
//           providerId: "credentials",
//           accountId: user.email,
//           password: passwordHash,
//         },
//       });

//       createdUsers.push(user);
//     }

//     // =========================
//     // POSTS CONTENT
//     // =========================
//     const postsContent = {
//       Hugo: [
//         {
//           title: "Dinner delight",
//           content: `<p>Today Andrea cooked dinner and it was <strong>absolutely amazing</strong>.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
//         },
//         {
//           title: "Lazy Medusa",
//           content: `<p>Medusa has claimed the sofa once again.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
//         },
//       ],
//       Andrea: [
//         {
//           title: "Special breakfast",
//           content: `<p>A breakfast full of love and care.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1551218808-94e220e084d2",
//         },
//       ],
//       Medusa: [
//         {
//           title: "Sun nap",
//           content: `<p>Basking in the afternoon sun.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1549317909-68b039b635e7",
//         },
//       ],
//       Patricia: [
//         {
//           title: "Morning yoga by the lake",
//           content: `<p>Yoga, nature and mindfulness.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//         },
//       ],
//       Rafaela: [
//         {
//           title: "Painting with colors of the soul",
//           content: `<p>Expressing emotions through art.</p>`,
//           coverImage:
//             "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
//         },
//       ],
//     };

//     // =========================
//     // CREATE POSTS + COMMENTS
//     // =========================
//     for (const user of createdUsers) {
//       const userPosts = postsContent[user.name] || [];

//       for (const postData of userPosts) {
//         const post = await prisma.post.create({
//           data: {
//             title: postData.title,
//             content: postData.content,
//             coverImage: postData.coverImage,
//             authorId: user.id,
//           },
//         });

//         for (const commenter of createdUsers) {
//           if (commenter.id === user.id) continue;

//           await prisma.comment.create({
//             data: {
//               content: `Great post, ${user.name}! 👏`,
//               authorId: commenter.id,
//               postId: post.id,
//             },
//           });
//         }
//       }
//     }

//     console.log("✅ Database seeded successfully!");
//   } catch (error) {
//     console.error("❌ Seed error:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seed();
