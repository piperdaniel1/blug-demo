# blug-demo

Follow along with our demo by **_forking_** this repository and following the steps below! We have tested this demo on **Arch Linux**, **MacOS**, and **Windows 11**.

## Step One - Cloning

Clone your forked repository. You need to use your forked repository because you will have to commit to it as you are following along.

```bash
git clone git@github.com:<your github username>/blug-demo
```

If you get an error like `bash: git: command not found` that means you don't have Git installed and you need to follow the instructions below. If you get an error like `permission denied (public key)` when you try to clone the repo you need to set up an SSH key for your Github account. Follow the `After you install Git` instructions below.

### If you don't have Git installed:

#### Linux

You should install `git` using your distros package manager. Get specific instructions by searching `install git on <your distro>`.

#### MacOS

You should install `git` using [Homebrew](https://brew.sh/). Get specific instructions by searching `install git on MacOS using homebrew`. You may need to install [Homebrew](https://brew.sh/) if you have not already.

#### Windows

You should install `git` from [Git for Windows](https://gitforwindows.org/). Once you have completed the installation you will have a terminal program called `Git Bash` which will allow you to run `git` commands.

### After you install Git:

You'll need to set up an SSH key to authenticate your Github account from your terminal. Follow instructions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

## Step Two - Environment

Verify you have the correct node and npm versions installed and on your path. You should be using Node 20 (`npm 10.5.2` and `node 20.13.1`). The demo is also tested and working with Node 22 (`npm 10.8.2` and `node 22.8.0`). You can verify this using:

```bash
npm --version
node --version
```

### If you don't have Node installed:

#### Linux and MacOS

If you don't have npm or node installed and you are running **Arch Linux** or **MacOS** we recommend using the [Node Version Manager](https://github.com/nvm-sh/nvm). As detailed on their [Github](https://github.com/nvm-sh/nvm) you can install `nvm` using this curl script:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

After installing `nvm` using the script, restart your terminal. Then, you can run `nvm install 20` to install and use the correct `npm` and `node`. If you are getting an error that says `bash: nvm: command not found` or similar try running this command and then running the `nvm install 20` command again:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

#### Windows

Install [Node](https://nodejs.org) from their [website](https://nodejs.org) by clicking the **Download Node.js (LTS)**. Step through the installer and then try running the version commands again in a **_new_** terminal.

```bash
npm --version
node --version
```

### Once you have Node installed:

Make sure you change your current working directory in your terminal to the directory you just created when you cloned your forked Github repository before you run these next commands. You can likely do this by running the following command in your terminal:

```bash
cd blug-demo
```

Now, install the project dependencies using `npm`:

```bash
npm install
```

To verify that everything is working correctly run:

```bash
npm run dev
```

Click the http://localhost:5173/ link in the output. You should see the "Meet Tux" website homepage. Leave this site running for the remainder of the demo.

## Step Three - Writing your tests

Normally you would have to select your testing framework and install it here but we have already selected [`cypress`](https://www.cypress.io/) and written two tests.

Verify that these tests are included and working by running `npm run test` (with `npm run dev` still running) in your terminal. After the tests finish running you should see an `All specs passed!` message.

However, if you look at the tests in the `cypress/e2e` directory you can see that they only test if each page of the site loads! What good is a loaded page if it does not have the intended functionality? To help remedy this, let's open the `cypress/e2e/home.cy.ts` file.

You will see the following code:

```typescript
describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });
});
```

Let's add another test to make sure the page contains a button that navigates us to the `/hobbies` page after it is clicked. Add this block of code just above the final line of the file (it should be inside the describe() function).

```typescript
it("contains a button to /hobbies", () => {
  cy.visit("/");
  cy.get("button").should("exist");
  cy.get("button").click();
  cy.url().should("include", "/hobbies");
});
```

Your final code should look something like this:

```typescript
describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });
  it("contains a button to /hobbies", () => {
    cy.visit("/");
    cy.get("button").should("exist");
    cy.get("button").click();
    cy.url().should("include", "/hobbies");
  });
});
```

Great! Now we can rest easy knowing we are automatically testing the homepage functionality. You can verify that these new tests work by using the `npm run test` command. If all went well after the tests finish running you should see an extra test under `home.cy.ts` and an `All specs passed!` message.

### Verifying that our new test works

Open the `src/App.tsx` file. This is the file that corresponds to the homepage of Tux's site. Change line 24 from:

```tsx
<Link to={"/hobbies"}>
```

to

```tsx
<Link to={"/error"}>
```

If you save the file and navigate back to your browser and click the `Hobbies` button again you can see that we get a `404 page not found` error. Now run the following command to see if Cypress can detect this issue.

```bash
npm run test
```

You should see that the original two tests pass but the third button test that we just added fails.

Make sure you change the link on line 24 back to the original `/hobbies` link so that the test passes again.

```tsx
<Link to={"/hobbies"}>
```

Make sure you run the tests again to make sure they pass again before you move onto the next step.

```bash
npm run test
```

You should see the `All specs passed!` message again.

## Step Four - Write your integration workflow

At last! Let's write our first [Github Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) workflow. All workflows live in the `.github/workflows` directory in the project. You can see that this directory has been created for you, along with an empty `on-push.yml` file. Open this file. This is where we will be creating our action.

Github Actions workflows are written in YAML (Yet Another Markup Language) which you may be already familar with. Regardless, it is pretty easy to pick up as you go. One thing to be cautious of is YAML is _really_ sensitive to indenting so even if you mess up a single space somewhere it will cause your entire workflow file to be invalid.

We'll start by defining a name for our workflow at the top of our file:

```yaml
name: Integration Testing
```

Next, we have to tell Github Actions when our workflow is supposed to run. We will have this run every time new code is pushed to the `main` branch of the repository. Add this code below the name of the workflow:

```yaml
on:
  push:
    branches:
      - main
```

Now, let's define what the workflow should actually do. This is done by defining a `job` for Github Actions to run. Each `job` also has a name but it also has an environment and a list of steps. Our `job` will be called `cypress-test` and will run on `Ubuntu 22.04` and check out the code and run our `cypress` tests. Add this code to the bottom of the workflow file to define our `job`:

```yaml
jobs:
  cypress-test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
```

It's as simple as that! Following CI/CD principles, our entire workflow is defined in a code file in our repository.

To run our workflow, we need to first go to our Github repository and click the `Actions` tab and enable Github Actions.

Then, simply make a new commit and push the code. If you have `git` configured correctly, this can be easily done from the command line:

```bash
git commit -a -m "Added new cypress tests and github workflow"
git push origin main
```

If you get an error like `Author identity unknown` then you need to tell the Git CLI who you are by running these commands.

```bash
git config --global user.email "<your github email>"
git config --global user.name "<your first and last name>"
```

Then, run the git commit command again.

After committing your code, navigate to your forked Github repository and click `Actions` on the top bar. You should be able to see the `Integration Testing` workflow running the job `cypress-test`. You can click the `cypress-test` job and view the command line output to see the tests run on the Github runner in real time.

Once the workflow completes navigate back to the `Code` section in the top bar. You should see a green checkmark next to the latest commit indicating that all Github Actions workflows have passed.

## (optional) Step Five - Add automated deployment to your workflow

This step is a lot harder to follow along with because you need to have a valid [Digital Ocean](https://www.digitalocean.com/) api key in your project's Github secrets. You also need to have configured [Digital Ocean](https://www.digitalocean.com/) to be able to access your Github repository.

To prep for this step we have already created a [Digital Ocean](https://www.digitalocean.com/) api key and added it to our Github Actions secrets under `DO_APP_KEY`. This api key will allow us to provision resources using [Digital Ocean's](https://www.digitalocean.com/) infrastructure as code format.

First of all, let's define our [Digital Ocean](https://www.digitalocean.com/) infrastructure. This is defined in the `.do` directory in our project. There is already a `app.yaml` file precreated in the `.do` directory that we will fill in.

We will be using the `static_site` hosting feature to host our website. This requires us to define commands that [Digital Ocean](https://www.digitalocean.com/) should use to build and run our project. We also must define the git repo to access the source code from our website:

```yaml
features:
  - buildpack-stack=ubuntu-22

name: blug-demo
region: nyc
static_sites:
  - environment_slug: html
    github:
      branch: main
      deploy_on_push: false
      repo: piperdaniel1/blug-demo
    name: website
    build_command: npm run build
    run_command: npm run start
    catchall_document: index.html
    source_dir: /
```

Now, we need to write the Github Actions job to deploy our website to [Digital Ocean](https://www.digitalocean.com/). We will add this to the same `on-push.yml` workflow that we put the integration tests in before. First off, let's rename the workflow to Integration Testing and Deployment.

```yaml
name: Integration Testing and Deployment
```

Next we can add the deployment job below `cypress-test` job.

```yaml
deploy-app:
  needs: cypress-test
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Deploy the app
      uses: digitalocean/app_action/deploy@v2
      with:
        token: ${{ secrets.DO_APP_KEY }}
```

This ends up being very simple because [Digital Ocean](https://www.digitalocean.com/) already has provided a deployment app_action that we are able to run with our API key. Importantly, notice the `needs: cypress-test` at the top of the job. This ensures we only deploy code that has passed all of our integration tests.

Finally, let's commit and push our code again.

```bash
git commit -a -m "Added new deployment workflows and IaC"
git push origin main
```

After navigating back to the `Actions` tab in our repo we can watch our new code get tested and deployed to a public url.

[![Deployed Site](https://github.com/piperdaniel1/blug-demo/blob/main/src/assets/global-site.png?raw=true)](https://blug-demo-b3hld.ondigitalocean.app/)

Scan or click this QR code to navigate to the publicly hosted site.

## Step Six - The whole workflow

Now let's add a new hobby to the "Hobbies" section of the site and watch it get automatically tested and deployed to the production site on [Digital Ocean](https://www.digitalocean.com/).

This will show Tux's new hobby: Curling!

Open the `src/Hobbies.tsx` file. Add an additional import statement at the top of the file:

```typescript
import TuxCurling from "./assets/tux-curling.webp";
```

Then scroll down to the bottom of the file and add the actual hobby code block.

```tsx
<div className="mb-10 mt-10 flex w-full flex-col items-center justify-between md:flex-row-reverse">
  <img src={TuxCurling} className="w-3/4 rounded md:w-[450px]" />
  <div className="mt-3 w-11/12 md:mr-10 md:mt-0 md:w-full">
    <h2 className="text-2xl text-gold-500">Curling with Friends</h2>
    <p>
      Curling with friends has become one of my unexpected winter favorites.
      There's something special about the mix of strategy, skill, and fun that
      makes every game feel like a new adventure. Whether I'm carefully pushing
      the stone down the ice or cheering on my teammates, it's always a blast.
      Plus, the snowy hills and frosted trees in the background give the whole
      experience a magical touch. It's definitely a unique way to enjoy the
      winter!
    </p>
  </div>
</div>
```

Finally commit the changes to Github:

```bash
git commit -a -m "Added Tux's new curling hobby!"
git push origin main
```

Now navigate to the "Actions" tab in the repo and watch the changes deploy!
