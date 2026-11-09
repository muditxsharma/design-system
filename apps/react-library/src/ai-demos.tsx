import { useState } from 'react';
import * as AI from '@inverse_ratio/design-system/ai';
import { Button } from '@inverse_ratio/design-system/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@inverse_ratio/design-system/ui/card';
import { toast } from 'sonner';
import type { Demo } from './types';
const steps: AI.AgentStep[] = [
  {
    id: 'scope',
    title: 'Read the supplied design charter',
    status: 'complete',
    detail: 'Reviewed the identity and semantic requirements from the local fixture.',
  },
  {
    id: 'compose',
    title: 'Compare the component expressions',
    status: 'complete',
    detail: 'Minimal uses rules, Nocturne uses layers, and Brutalism uses hard graphic frames.',
  },
  {
    id: 'verify',
    title: 'Verify the visual study',
    status: 'pending',
    detail: 'Review the proposed composition before approving implementation values.',
  },
];
const sources = [
  { title: 'shadcn/ui component reference', url: 'https://ui.shadcn.com/docs/components' },
  { title: 'shadcn AI patterns', url: 'https://ui.shadcn.com/docs/ai-elements' },
];
async function* localTransport(prompt: AI.Prompt, signal: AbortSignal) {
  const text = `Local preview for “${prompt.text}”. The selected design foundation applies to messages, prompt controls, plans, tool output, and sources. No model or external service was called.`;
  for (const word of text.split(' ')) {
    if (signal.aborted) return;
    await new Promise<void>((resolve) => {
      const timer = setTimeout(done, 45);
      function done() {
        signal.removeEventListener('abort', cancel);
        resolve();
      }
      function cancel() {
        clearTimeout(timer);
        done();
      }
      signal.addEventListener('abort', cancel, { once: true });
    });
    if (signal.aborted) return;
    yield word + ' ';
  }
}
function ChatDemo() {
  return <AI.Chat transport={localTransport} />;
}
function ConfirmationDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="space-y-4">
      <AI.Confirmation
        key={key}
        title="Allow a workspace export?"
        description="This preview records a decision only. No export or tool runs."
        onDecision={(approved) =>
          toast(approved ? 'Demo approval recorded.' : 'Demo request denied.')
        }
      />
      <Button variant="outline" size="sm" onClick={() => setKey(key + 1)}>
        Reset decision
      </Button>
    </div>
  );
}
function PromptDemo() {
  return (
    <AI.PromptInput
      onSubmit={(prompt) =>
        toast(
          `Local prompt received: ${prompt.text}. ${prompt.files.length} attachment(s) stay local.`,
        )
      }
    />
  );
}
function ModelDemo() {
  const [value, setValue] = useState('balanced');
  return (
    <div className="space-y-4">
      <AI.ModelSelector
        value={value}
        onValueChange={setValue}
        models={[
          { id: 'fast', name: 'Fast · demo model' },
          { id: 'balanced', name: 'Balanced · demo model' },
          { id: 'deep', name: 'Deep · demo model' },
        ]}
      />
      <p role="status" className="text-xs text-muted-foreground">
        Selected: {value}. No model is connected.
      </p>
    </div>
  );
}
function SuggestionDemo() {
  const [selected, setSelected] = useState('');
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {['Compare the four foundations', 'Explore component anatomy', 'Review a motion study'].map(
          (text) => (
            <AI.Suggestion key={text} onSelect={setSelected}>
              {text}
            </AI.Suggestion>
          ),
        )}
      </div>
      <p role="status" className="text-sm text-muted-foreground">
        {selected ? `Selected: ${selected}` : 'Choose a sample prompt.'}
      </p>
    </div>
  );
}
const definitions: [string, React.ComponentType][] = [
  ['Chain of Thought', () => <AI.ChainOfThought steps={steps} />],
  ['Chat', ChatDemo],
  [
    'Checkpoint',
    () => (
      <AI.Checkpoint
        label="Before the component study"
        onRestore={() => toast('Checkpoint restoration previewed. No files changed.')}
      />
    ),
  ],
  ['Confirmation', ConfirmationDemo],
  ['Context', () => <AI.Context used={4800} total={32000} />],
  [
    'File Tree',
    () => (
      <AI.FileTree
        files={[
          {
            name: 'src',
            children: [
              { name: 'components', children: [{ name: 'button.tsx' }, { name: 'card.tsx' }] },
              { name: 'styles.css' },
            ],
          },
          { name: 'README.md' },
        ]}
      />
    ),
  ],
  [
    'Inline Citation',
    () => (
      <p className="text-sm leading-relaxed">
        These controls inherit their semantics from shadcn/ui{' '}
        <AI.InlineCitation title="shadcn/ui reference" url={sources[0].url}>
          [1]
        </AI.InlineCitation>
        .
      </p>
    ),
  ],
  [
    'AI Message',
    () => (
      <div className="space-y-5">
        <AI.Message from="user">How should these components feel?</AI.Message>
        <AI.Message from="assistant">
          Each foundation changes anatomy, grouping, and material, while interaction semantics stay
          consistent.
        </AI.Message>
      </div>
    ),
  ],
  ['Model Selector', ModelDemo],
  ['Plan', () => <AI.Plan title="Refine the shared library" steps={steps} />],
  ['Prompt Input', PromptDemo],
  ['Queue', () => <AI.Queue steps={steps} />],
  [
    'Reasoning',
    () => (
      <AI.Reasoning summary="Design process summary">
        A supplied, user-visible process summary: compare the visual foundations, preserve shared
        semantics, and review the resulting anatomy. This is fixture content, not hidden model
        reasoning.
      </AI.Reasoning>
    ),
  ],
  ['Sources', () => <AI.Sources sources={sources} />],
  [
    'Stack Trace',
    () => (
      <AI.StackTrace
        error="FixtureError: preview service unavailable"
        frames={[
          'at loadPreview (fixture.ts:12)',
          'at renderStudy (fixture.ts:28)',
          'Demo stack trace; no real service was called.',
        ]}
      />
    ),
  ],
  [
    'Subagent',
    () => (
      <AI.Subagent
        name="Visual review assistant · fixture"
        description="A supplied nested process specimen, not a running agent."
        steps={steps}
      />
    ),
  ],
  ['Suggestion', SuggestionDemo],
  ['Task', () => <AI.Task steps={steps} />],
  [
    'Terminal',
    () => (
      <AI.Terminal
        command="npm run build · sample output"
        output={
          'Example output only:\nTypeScript checked\nVite build complete\nNo command was run by this component.'
        }
      />
    ),
  ],
  [
    'Test Results',
    () => (
      <AI.TestResults
        tests={[
          {
            name: 'Keyboard flow fixture',
            passed: true,
            detail: 'Sample result only; not a test of this catalog.',
          },
          {
            name: 'Contrast review fixture',
            passed: false,
            detail: 'Sample failure: review a supplied foreground/background pair.',
          },
        ]}
      />
    ),
  ],
  [
    'Tool',
    () => (
      <AI.Tool
        name="read_design_spec · fixture"
        input={'{"path":"docs/design/STRUCTURED_CHAOS_DESIGN_SPEC.md"}'}
        output="Sample output: three identities, six expressions, shared semantics. No file was read by this component."
      />
    ),
  ],
  [
    'Artifact',
    () => (
      <Card>
        <CardHeader>
          <CardTitle>Component study</CardTitle>
          <CardDescription>A composition built from shadcn Card and Button.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm">Artifact preview using the active identity.</p>
          <Button
            variant="outline"
            onClick={() => toast('Artifact preview selected. No download created.')}
          >
            Preview artifact
          </Button>
        </CardContent>
      </Card>
    ),
  ],
];
export const aiDemos: Demo[] = definitions.map(([name, Component]) => ({
  name,
  Component,
  group: 'AI Elements',
  description:
    'A reusable shadcn composition. Fixture data and local interaction; no live model connection.',
  source: 'https://ui.shadcn.com/docs/ai-elements',
  usage: `import * as AI from "@inverse_ratio/design-system/ai"\n\n// See the typed props and composition in packages/react/src/ai/index.tsx.\n// Working example: apps/react-library/src/ai-demos.tsx (${name}).`,
}));
