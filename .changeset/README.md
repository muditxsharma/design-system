# Release notes

Run `npm run changeset` for user-visible changes to `@inverse_ratio/design-system`.
Choose patch/minor/major and describe the final behavior. Commit the generated note
with the implementation. The version workflow opens a release PR; it never publishes.

The initial package version remains 0.1.0. There is no seed changeset that silently
bumps the first release. After configuration, the first candidate can be requested
with the Release workflow. Later notes drive version/changelog PRs automatically.
