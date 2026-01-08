## Full Stack Blog

This project is a social media–style blog where users can create and share posts, edit and delete their content, and interact with other users' posts. The users can sign up and log in with multiple authentication methods, including email, Google, and GitHub.
The project is developed with Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Better Auth, and it has full CRUD functionality.

I created this project as a portfolio piece to practice full-stack development concepts and build a real-world social platform experience.

[View Live Demo](https://blogapp.hugo-miranda.dev)

## About The Project

![blog Screenshot](https://res.cloudinary.com/dck0d5qwp/image/upload/v1766248110/Novo_Projeto_4_zfuafk.png)

## Key Features & Functionality

- **Full CRUD (Create, Read, Update, Delete):** Users can create new blog posts, edit existing ones, view all posts, and delete content safely.
- **User Authentication:** Integration with **BetterAuth**, supporting login via email, Google, and GitHub.
- **Dynamic Routes & SEO Optimization**
- **Responsive Design**
- **Database Integration:** Uses **Prisma** to manage the PostgreSQL database efficiently, demonstrating knowledge of data modelling, migrations, and query handling.
- **TypeScript** for type safety
- **Modular and reusable React components**

### Built With

- [Next](https://nextjs.org)
- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Clone the repo

```sh
git clone https://github.com/hugolomba/blog-next.git
```

2. Install packages

```sh
npm install
# or
yarn install
# or
pnpm install
```

3. Set .env variables

```sh
PRISMA_DATABASE_URL=""
POSTGRES_URL=""
PRISMA_DATABASE_URL=""

DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
BETTER_AUTH_GITHUB_ID=
BETTER_AUTH_GITHUB_SECRET=

BETTER_AUTH_GOOGLE_ID=
BETTER_AUTH_GOOGLE_SECRET=

NEXT_PUBLIC_RICH_TEXT_EDITOR_API_KEY=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.
