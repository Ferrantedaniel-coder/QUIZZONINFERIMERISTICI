# StudyHub development and publication

Read STUDYHUB_STATE.md and current main before changing the site.
These workflow rules supersede older references to working directly on main.

- Create a separate feature/<description> branch from current main for every feature or fix.
- Commit changes on that branch and open a pull request targeting main.
- Never commit directly to main. Deploy only after a pull request is merged into main.
- Preserve quiz content, lessons, materials and browser progress unless explicitly requested.
- Use the single github-pages environment. Do not create branch or pull-request previews.
- Keep the latest successful Pages deployment. After a successful deployment, the Pages workflow removes older deployment records and older github-pages artifacts; the new artifact expires after one day.
- Do not delete site HTML pages or learning materials as part of deployment cleanup.

## Required one-time activation

Before merging the Pages migration pull request:
1. In Settings > Pages > Build and deployment, change Source from Deploy from a branch to GitHub Actions. This disables the old automatic branch publisher.
2. Protect main with a ruleset requiring pull requests, including administrators where available.
3. Restrict the github-pages environment deployment branches to main.
4. Merge the pull request. The push to protected main produced by the merge deploys current main, then prunes the previous github-pages deployment history and old Pages artifacts.
5. Verify the published site and the cleanup job summary. Until that job succeeds, the historic deployments have NOT been purged.

No custom access token is required by the workflow. Administrative settings must be changed using an authorized admin session.
The cleanup does not delete Actions run logs or deployments in unrelated environments.
