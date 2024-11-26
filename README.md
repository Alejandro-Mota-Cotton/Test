# Cotton Cloud's Checkly Project

This project is for monitoring the Cotton Cloud application.

## Project Structure

Below is an overview of the directories within the project:

```
.
├── emerald-chichilla
│   ├── __checks__
│   │   ├── cotton_cloud_playground
│   │   │   ├── api.check.ts
│   │   │   └── homepage.spec.ts
│   │   └── cottonCloud.checks.ts
│   ├── Utilities
│   ├── checkly.config.ts
│   └── package.json
├── .gitignore
└── README.md
```

### Explanation of Directories

- **emerald-chichilla**: Default directory created by Checkly, containing all checks, spec files, and node dependencies. There will be one directory per Checkly project.
  - `__checks__`: Contains test files, such as `.check.ts` and `.spec.ts`.
  - `checkly.config.ts`: Configuration file for Checkly.
  - `package.json`: Project-specific Node dependencies.
- **Utilities**: Contains reusable code for tests.

**Important:** Node dependencies should be installed within the Checkly project directory (e.g., `emerald-chichilla`), not in the root directory.

### Installing Dependencies

Run the following command inside the Checkly project directory to install all required dependencies:

```bash
npm install
```

### Logging into Checkly

If an account is already logged in, first run:

```bash
npx checkly logout
```

Failing to log out before testing or deploying might result in a network error. Once logged out, log in again using the Checkly CLI:

```bash
npx checkly login
```

You will be prompted to choose between opening a browser window or using another method to authenticate.

### Using Checkly CLI

Once logged in, you can start using the Checkly CLI. Below are the most commonly used commands:

- **Test your checks locally**:

  ```bash
  npx checkly test
  ```

  This will execute `.check.ts` and `.spec.ts` files within the `__checks__` directory in a dry run.

- **Deploy your checks to Checkly**:

  ```bash
  npx checkly deploy
  ```

  This deploys your checks to the Checkly cloud, attaches alert channels, and schedules the checks to run every 10 minutes in the regions `us-east-1` and `eu-west-1`.

## CLI Commands

Run the core CLI commands with `npx checkly <command>`:

| Command              | Action                             |
| -------------------- | ---------------------------------- |
| `npx checkly test`   | Dry run all checks in your project |
| `npx checkly deploy` | Deploy checks to the Checkly cloud |
| `npx checkly login`  | Log in to your Checkly account     |
| `npx checkly logout` | Log out from your Checkly account  |
| `npx checkly --help` | Show help for each command         |

For more information, [check the official CLI reference](https://www.checklyhq.com/docs/cli/command-line-reference/).
