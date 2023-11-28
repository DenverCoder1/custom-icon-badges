## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have a way to improve this project.

If you are making a significant change, please open an issue before creating a pull request. This will allow us to discuss the design and implementation.

Make sure your request is meaningful and you have tested the app locally before submitting a pull request.

### Installing Requirements

#### Requirements

- NodeJS
- Yarn
- TypeScript

### Clone the repository

```
git clone https://github.com/DenverCoder1/custom-icon-badges.git
cd custom-icon-badges
```

### Installing dependencies

```bash
yarn install-all
```

### Config vars

To work with a database, add a `.env` file in the root directory with the following:

```bash
DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority&tls=true
```

The URL should be the URL provided by MongoDB and the database should have a collection named `icons`.

More info on setting up a free Atlas database on [MongoDB's documentation](https://docs.atlas.mongodb.com/getting-started/).

Optionally, you can also set the `PORT` variable to change the port the server runs on (by default, it runs on port 5000):

```bash
PORT=5000
```

### Build and run the app locally

```bash
yarn dev
```

### Run the app locally (without building)

```bash
yarn start
```

Use <http://localhost:5000/> as the base URL to access the server-side routes

### Run the React front-end only

```bash
yarn start-client
```

<http://localhost:3000/> will be opened in your browser

### Show linting errors

```bash
yarn lint
```

### Fix linting errors

```bash
yarn lint:fix
```

### Commit style guide

We use [Conventional Commits](https://conventionalcommits.org/) for commit messages.

This allows for a more readable commit history and helps to automate the process of generating release notes.

Please prefix your commit messages with one of the following:

- `fix`: A bug fix.
- `feat`: A new feature.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- `refactor`: A code change that neither fixes a bug or adds a feature.
- `test`: Adding missing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation.

Please see [Conventional Commits](https://conventionalcommits.org/) for the full specifications.
