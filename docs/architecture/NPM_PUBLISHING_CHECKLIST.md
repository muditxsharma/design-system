# npm publishing readiness checklist

Audit date: 2026-11-09. Target: the proposed single public React library described
in [the release architecture](NPM_RELEASE_ARCHITECTURE.md).

**14 of 20 items are ready. 6 require external configuration, verification or
first-release approval. The package is not yet ready for an unattended release.**

This is an item count, not a percentage estimate of engineering effort. A ready
item means its stated criterion is met; the packed artifact is now tested as described in item 12. Account settings are unverified, not assumed absent.
Workflows and public package metadata are now implemented locally. No external
settings have been changed and no package has been published.

## Ready — 14

- [x] **01. Reusable React component source exists.** `packages/react/src/ui/`
  contains 64 upstream shadcn modules; local AI compositions are in `src/ai/`.
- [x] **02. Shared design foundations and theme adapters exist.** Four identities,
  light/dark expressions and accent mappings are recorded in
  `packages/foundations/themes.json`; React integration is in `src/theme.ts`
  and `src/identity.css`.
- [x] **03. Developer and usage documentation exists.** The package README, design
  specifications, coverage notes and project-structure guide explain current APIs
  and boundaries. Usage examples use the approved package name.
- [x] **04. Upstream provenance and its license notice are recorded.**
  `packages/react/UPSTREAM.md`, `upstream-manifest.json` and `LICENSE.shadcn` exist.
  The final tarball retains upstream notices alongside the approved MIT license.
- [x] **05. Workspace dependency versions are locked.** Root `package-lock.json`
  records the React package and consuming catalog. Consumer compatibility is a
  separate unchecked item below.
- [x] **06. Validation tooling is available and passes.** Library/catalog builds,
  source checks, 326 static/state contracts, four catalog Playwright tests (all
  90 examples), and five isolated-consumer Playwright tests pass.
- [x] **07. Reusable-library distribution build exists.** `npm run build:lib`
  produces 71 ESM entry points and `.d.ts` declarations through
  `packages/react/scripts/build.mjs` and `tsconfig.build.json`.
- [x] **08. Exports are self-contained and distribution-based.** Public entries
  resolve to `dist`; theme JSON is embedded/copied. A normal tarball install
  outside the workspace imports all UI, AI, hooks and helpers without source aliases.
  The approved namespace is verified in the clean consumer; npm scope permissions remain open.
- [x] **09. CSS distribution contract is implemented.** The tarball contains
  compiled/scoped CSS without Tailwind build directives, a minimal package-anatomy
  baseline, and an optional separate reset. Consumer tests use no Tailwind plugin
  and verify host margins plus theme/portal coherence.
- [x] **10. React peers and consumer expectations are defined.** React/React DOM
  use `^19.0.0` peer ranges, are external to the build, and resolve to the same
  physical instances as the host. The clean React 19/Vite consumer typechecks with
  `skipLibCheck: false` and builds. ESM/modern CSS are the current target; no older
  React, CommonJS or Next.js/RSC compatibility is claimed.
- [x] **12. Exact tarball is verified in a clean consumer.** The runner installs
  the packed file in a unique operating-system temp directory; checks 64 UI
  exports, AI/helpers/hooks, theme data, declarations, no duplicate React, and
  pure-theme/SSR imports; then builds and runs five functional Playwright tests.
  The artifact digest and test outcome are in `artifacts/package/last-run.json`.

- [x] **11. Publishable metadata and contents are configured.** Approved public
  `@inverse_ratio/design-system`, MIT, repository metadata, compiled exports,
  explicit file allowlist, local license and upstream notices. Root/apps stay private.
- [x] **13. Release intent and candidate automation are implemented.** Changesets
  version PRs, CI and tested candidate workflows exist. Local tests exercise actual
  versioning, workflow permissions and artifact contracts. Remote execution is pending.
- [x] **16. Visibility and local license are selected.** Owner confirmed public npm
  access and MIT; upstream notices are retained.

## External configuration and release verification — 6

- [ ] **14. Verify gated publication and recovery remotely.** Guarded publishing,
  integrity verification and retry/finalization code exist and pass local tests.
  An actual GitHub approval/OIDC run and recovery path remain unverified.
- [ ] **15. Verify npm scope and package permissions.** Owner reports organization
  `inverse_ratio` exists and approved the name; publish rights/name availability
  have not been independently checked.
- [ ] **17. Configure GitHub administrative and Actions settings.** Verify main
  protection, required CI, review and workflow PR creation permissions.
- [ ] **18. Configure human approval.** Set npm-production reviewers, prevent
  self-review, disallow admin bypass and permit protected branches only.
- [ ] **19. Configure npm trust and first-package bootstrap.** Bind the exact
  repository/workflow/environment, allow publishing, and resolve initial package
  creation before relying on tokenless OIDC.
- [ ] **20. Approve first release policy/candidate.** Proposed initial version is
  0.1.0, stable/latest, with Changesets version notes. Assign approvers and approve
  the exact first tested candidate before public release.

## Evidence and count

| Status | Items | Count |
| --- | --- | ---: |
| Ready | 01–13, 16 | 14 |
| External configuration/release verification | 14, 15, 17–20 | 6 |
| **Total** | **01–20** | **20** |

Nine local release tests pass, including actual Changesets versioning and private
consumer dependency updates. Account settings and remote publication remain
unverified. See [release setup](RELEASE_SETUP.md) for the exact next steps and
[package verification](PACKAGE_BUILD_AND_TESTING.md) for artifact evidence.
All checks must pass again for the actual release commit before publication.
