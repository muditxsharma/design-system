import { Component, Suspense, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { BookOpen, Check, Code, Copy, Layers, Moon, Search, Sun } from 'lucide-react';
import {
  applyReactTheme,
  designSystems,
  accentFamilies,
  type DesignSystem,
  type DesignMode,
} from '@inverse_ratio/design-system/theme';
import { Button } from '@inverse_ratio/design-system/ui/button';
import { Input } from '@inverse_ratio/design-system/ui/input';
import { Label } from '@inverse_ratio/design-system/ui/label';
import { Badge } from '@inverse_ratio/design-system/ui/badge';
import { Switch } from '@inverse_ratio/design-system/ui/switch';
import { TooltipProvider } from '@inverse_ratio/design-system/ui/tooltip';
import { Toaster } from '@inverse_ratio/design-system/ui/sonner';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@inverse_ratio/design-system/ui/code-block';
import { uiDemos } from './ui-demos';
import snippets from './demo-usage.json';
import { aiDemos } from './ai-demos';
import uiSource from './ui-demos.tsx?raw';
import aiSource from './ai-demos.tsx?raw';
class DemoBoundary extends Component<{ children: ReactNode }, { error: string }> {
  state = { error: '' };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  render() {
    return this.state.error ? (
      <div role="alert" className="rounded border border-destructive p-5 text-sm">
        Example failed to render: {this.state.error}
      </div>
    ) : (
      this.props.children
    );
  }
}
export function App() {
  const [system, setSystem] = useState<DesignSystem>('forma');
  const [mode, setMode] = useState<DesignMode>('light');
  const [accents, setAccents] = useState<Record<DesignSystem, number>>({
    forma: 0,
    minimal: 0,
    nocturne: 0,
    brutalism: 0,
  });
  const [kind, setKind] = useState<'ui' | 'ai'>('ui');
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('All');
  const [name, setName] = useState('Button');
  const [showCode, setShowCode] = useState(false);
  useLayoutEffect(() => {
    applyReactTheme({ system, mode, accent: accents[system] });
  }, [system, mode, accents]);
  const all = kind === 'ui' ? uiDemos : aiDemos;
  const groups = ['All', ...new Set(all.map((d) => d.group))];
  const filtered = useMemo(
    () =>
      all.filter(
        (d) =>
          (group === 'All' || d.group === group) &&
          (d.name + ' ' + d.group).toLowerCase().includes(query.toLowerCase()),
      ),
    [all, group, query],
  );
  const current = [...uiDemos, ...aiDemos].find((d) => d.name === name) || uiDemos[9];
  const currentUsage = (snippets as Record<string, string>)[current.name] || current.usage;
  const theme = designSystems[system];
  const families = system === 'forma' ? null : accentFamilies[system];
  function choose(nextName: string) {
    setName(nextName);
    setShowCode(false);
    history.replaceState(null, '', '#' + encodeURIComponent(nextName));
  }
  return (
    <TooltipProvider>
      <div className="react-library">
        <aside className="library-nav">
          <a className="library-brand" href="#Button" onClick={() => choose('Button')}>
            <Layers className="size-6" />
            <span>
              Design Library<small>SHADCN / IDENTITY LAB</small>
            </span>
          </a>
          <div className="library-kind" role="group" aria-label="Catalog type">
            <button
              aria-pressed={kind === 'ui'}
              onClick={() => {
                setKind('ui');
                setGroup('All');
                setQuery('');
                choose('Button');
              }}
            >
              Components <span>{uiDemos.length}</span>
            </button>
            <button
              aria-pressed={kind === 'ai'}
              onClick={() => {
                setKind('ai');
                setGroup('All');
                setQuery('');
                choose('Chat');
              }}
            >
              AI Elements <span>{aiDemos.length}</span>
            </button>
          </div>
          <div className="nav-search">
            <Search className="size-4" />
            <Input
              aria-label="Find a component"
              placeholder="Find a component…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <label className="nav-group">
            Category
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              {groups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <nav className="component-nav" aria-label="Components">
            {filtered.map((d) => (
              <button
                key={d.name}
                aria-label={d.name}
                aria-current={name === d.name ? 'page' : undefined}
                onClick={() => choose(d.name)}
              >
                {d.name}
                <span>{d.group}</span>
              </button>
            ))}
            {!filtered.length && <p role="status">No matching components.</p>}
          </nav>
          <p className="nav-foot">
            Official primitives.
            <br />
            Independent visual languages.
          </p>
        </aside>
        <main className="library-main">
          <header className="library-topbar">
            <span>
              Workspace / <strong>{kind === 'ui' ? 'Components' : 'AI Elements'}</strong>
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://ui.shadcn.com/docs" target="_blank" rel="noreferrer">
                  <BookOpen />
                  Reference
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                aria-label={mode === 'light' ? 'Switch to dark' : 'Switch to light'}
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              >
                {mode === 'light' ? <Moon /> : <Sun />}
                {mode === 'light' ? 'Dark' : 'Light'}
              </Button>
            </div>
          </header>
          <section className="library-intro">
            <p className="eyebrow">FOUR FOUNDATIONS / ONE ENGINEERING LANGUAGE</p>
            <h1>
              Built on shadcn.
              <br />
              <em>Expressed your way.</em>
            </h1>
            <p>Real components and agentic patterns, shaped by Forma and Structured Chaos.</p>
          </section>
          <section className="theme-workbench" aria-label="Design system selection">
            <div className="theme-buttons" role="group" aria-label="Design system">
              {(Object.keys(designSystems) as DesignSystem[]).map((key) => (
                <button
                  key={key}
                  aria-label={'Use ' + designSystems[key].name}
                  aria-pressed={system === key}
                  onClick={() => setSystem(key)}
                >
                  <span className={'theme-glyph glyph-' + key}>
                    <Layers className="size-5" />
                  </span>
                  <span>
                    {designSystems[key].name}
                    <small>{designSystems[key].expressions[mode === 'dark' ? 1 : 0]}</small>
                  </span>
                  {system === key && <Check className="size-4" />}
                </button>
              ))}
            </div>
            <label className="accent-choice">
              Accent family
              <select
                aria-label="Accent family"
                value={accents[system]}
                disabled={!families}
                onChange={(e) => setAccents({ ...accents, [system]: Number(e.target.value) })}
              >
                {(families || [['Forma Green']]).map((family, i) => (
                  <option value={i} key={family[0] as string}>
                    {family[0]}
                  </option>
                ))}
              </select>
            </label>
          </section>
          <section className="identity-brief">
            <span className="eyebrow">{theme.name.toUpperCase()} / COMPONENT ANATOMY</span>
            <p>{theme.principles}</p>
            <span>{theme.componentCharacter}</span>
          </section>
          <section className="specimen-section" aria-labelledby="specimen-name">
            <div className="specimen-heading-row">
              <div>
                <p className="eyebrow">
                  {current.group} / {kind === 'ai' ? 'AI PATTERN' : 'COMPONENT'}
                </p>
                <h2 id="specimen-name" className="specimen-heading">
                  {current.name}
                </h2>
                <p>{current.description}</p>
              </div>
              <Badge variant="outline">{theme.expressions[mode === 'dark' ? 1 : 0]}</Badge>
            </div>
            <div className="specimen-toolbar">
              <span>LIVE PREVIEW</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(!showCode)}
                aria-expanded={showCode}
              >
                <Code />
                {showCode ? 'Hide source' : 'View source'}
              </Button>
            </div>
            <div className="react-specimen" data-testid="component-preview">
              <DemoBoundary key={current.name}>
                <Suspense fallback={<p role="status">Loading component…</p>}>
                  <current.Component />
                </Suspense>
              </DemoBoundary>
            </div>
            {showCode && (
              <div className="source-panel">
                <CodeBlock>
                  <CodeBlockHeader>
                    <CodeBlockTitle>Working TSX composition</CodeBlockTitle>
                    <CodeBlockActions>
                      <CodeBlockCopyButton value={currentUsage} />
                    </CodeBlockActions>
                  </CodeBlockHeader>
                  <CodeBlockContent>{currentUsage}</CodeBlockContent>
                </CodeBlock>
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs text-muted-foreground">
                    Full working catalog source (includes dependencies and state)
                  </summary>
                  <div className="mt-3 max-h-96 overflow-auto">
                    <CodeBlock>
                      <CodeBlockHeader>
                        <CodeBlockTitle>
                          {kind === 'ai' ? 'ai-demos.tsx' : 'ui-demos.tsx'}
                        </CodeBlockTitle>
                        <CodeBlockActions>
                          <CodeBlockCopyButton value={kind === 'ai' ? aiSource : uiSource} />
                        </CodeBlockActions>
                      </CodeBlockHeader>
                      <CodeBlockContent>{kind === 'ai' ? aiSource : uiSource}</CodeBlockContent>
                    </CodeBlock>
                  </div>
                </details>
              </div>
            )}
            <div className="specimen-footer">
              <span>
                {kind === 'ai'
                  ? 'Fixture data · No model connected'
                  : 'Official shadcn primitives · Local interaction'}
              </span>
              <a href={current.source} target="_blank" rel="noreferrer">
                Reference ↗
              </a>
            </div>
          </section>
          <section className="continuity-study">
            <div>
              <p className="eyebrow">FOUNDATION CONTINUITY</p>
              <h3>
                One anatomy.
                <br />A distinct presence.
              </h3>
              <p>
                These are the same shadcn components used above, carrying your selected foundation
                into every interaction.
              </p>
            </div>
            <div className="continuity-controls">
              <Badge variant="outline">Workspace</Badge>
              <Label htmlFor="continuity-name">Project name</Label>
              <Input id="continuity-name" placeholder="Exploration 001" />
              <Label className="flex items-center justify-between">
                Notifications
                <Switch defaultChecked />
              </Label>
              <Button onClick={() => navigator.clipboard?.writeText(theme.name)}>
                <Copy />
                Copy identity name
              </Button>
            </div>
          </section>
          <footer className="library-footer">
            <span>Design Library / React + shadcn/ui</span>
            <span>Exploratory tokens · UI patterns are not live agent runs</span>
          </footer>
        </main>
      </div>
      <Toaster theme={mode} />
    </TooltipProvider>
  );
}
