# Exchange Control Center — GitHub Pages

This repository contains the ECC sample dashboard, theme controls, installation guide, and Windows Terminal theme downloads.

## Publish

1. Add this folder's contents to your GitHub repository. Keep the `docs` folder intact.
2. Open the repository on GitHub.
3. Select **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose **main** and **/docs**, then select **Save**. If your default branch has another name, select that branch instead.
6. Wait for the Pages deployment to finish. GitHub displays the published address on that page.

For a project repository, the site address is normally `https://wo4py8w4y.github.io/REPOSITORY-NAME/`. Use the address GitHub displays.

The dashboard is the home page. The **Installation guide** button opens the guide. **Download terminal themes** provides the installer and colour JSON together.

Official instructions: [Configure a GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## What is hosted

Only `docs` is published. It contains static pages and sample data. GitHub Pages does not execute the PowerShell installer; download and run it locally using PowerShell 7. This site does not connect to Microsoft 365.

Theme preferences save in each visitor's browser. Preferences from a local file or localhost do not transfer automatically to the hosted address. Other projects on the same GitHub Pages domain share browser storage, so this copy uses its own storage keys.

This is based on the recovered ECC HTML prototype, not the missing consolidated v0.3 sandbox.

## Updating

Replace the published files in `docs` and commit the changes. GitHub Pages redeploys from the configured branch.
