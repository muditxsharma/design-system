import { useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Input, Label, Switch } from '@inverse_ratio/design-system';
import { applyReactTheme, type DesignSystem, type DesignMode } from '@inverse_ratio/design-system/theme';
import { Chat, Confirmation, Plan, Tool, type ChatTransport } from '@inverse_ratio/design-system/ai';
import * as Dialog from '@inverse_ratio/design-system/ui/dialog';
import * as Tabs from '@inverse_ratio/design-system/ui/tabs';
import { TooltipProvider } from '@inverse_ratio/design-system/ui/tooltip';
import '@inverse_ratio/design-system/styles.css';
import './host.css';

const transport: ChatTransport = async function* ({ text }, signal) {
  for (const word of `Packed component reply to ${text}. Local response only.`.split(' ')) {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(finish, 80);
      function finish() {
        signal.removeEventListener('abort', cancel);
        resolve();
      }
      function cancel() {
        clearTimeout(timer);
        finish();
      }
      signal.addEventListener('abort', cancel, { once: true });
    });
    if (signal.aborted) return;
    yield word + ' ';
  }
};

function Consumer() {
  const [system, setSystem] = useState<DesignSystem>('minimal');
  const [mode, setMode] = useState<DesignMode>('light');
  const [accent, setAccent] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [decision, setDecision] = useState('');
  useLayoutEffect(
    () => applyReactTheme({ system, mode, accent: system === 'forma' ? 0 : accent }),
    [system, mode, accent],
  );

  return (
    <TooltipProvider>
      <main className="host-layout">
        <h1>Packed library consumer</h1>
        <p id="host-sentinel">Host paragraph margins and button styles stay application-owned.</p>
        <div className="host-row">
          <label>
            System
            <select
              aria-label="System"
              value={system}
              onChange={(event) => setSystem(event.target.value as DesignSystem)}
            >
              {['forma', 'minimal', 'nocturne', 'brutalism'].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label>
            Mode
            <select
              aria-label="Mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as DesignMode)}
            >
              <option>light</option>
              <option>dark</option>
            </select>
          </label>
          <label>
            Accent
            <select
              aria-label="Accent"
              value={accent}
              onChange={(event) => setAccent(Number(event.target.value))}
            >
              {[0, 1, 2].map((index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
          </label>
        </div>
        <section>
          <h2>Actions and form</h2>
          <Button id="styled-action" onClick={() => setFeedback('Action completed')}>
            Create project
          </Button>
          <Label className="host-row">
            Notifications
            <Switch defaultChecked />
          </Label>
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const input = event.currentTarget.elements.namedItem('email') as HTMLInputElement;
              input.setAttribute('aria-invalid', String(!input.validity.valid));
              setFeedback(input.validity.valid ? 'Email accepted' : 'Enter a valid email');
              if (!input.validity.valid) input.focus();
            }}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              required
              aria-describedby="feedback"
              placeholder="name@studio.com"
            />
            <Button type="submit">Validate</Button>
          </form>
          <p id="feedback" role="status">
            {feedback}
          </p>
        </section>
        <section>
          <h2>Portaled overlay</h2>
          <Dialog.Dialog>
            <Dialog.DialogTrigger asChild>
              <Button>Open dialog</Button>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent>
              <Dialog.DialogHeader>
                <Dialog.DialogTitle>Package dialog</Dialog.DialogTitle>
                <Dialog.DialogDescription>
                  Installed from the tarball, not workspace source.
                </Dialog.DialogDescription>
              </Dialog.DialogHeader>
              <Dialog.DialogClose asChild>
                <Button variant="outline">Close dialog</Button>
              </Dialog.DialogClose>
            </Dialog.DialogContent>
          </Dialog.Dialog>
        </section>
        <section>
          <h2>Keyboard tabs</h2>
          <Tabs.Tabs defaultValue="overview">
            <Tabs.TabsList>
              <Tabs.TabsTrigger value="overview">Overview</Tabs.TabsTrigger>
              <Tabs.TabsTrigger value="activity">Activity</Tabs.TabsTrigger>
            </Tabs.TabsList>
            <Tabs.TabsContent value="overview">Workspace overview</Tabs.TabsContent>
            <Tabs.TabsContent value="activity">Workspace activity</Tabs.TabsContent>
          </Tabs.Tabs>
        </section>
        <section>
          <h2>Agentic patterns</h2>
          <Plan
            title="Packed plan"
            steps={[
              {
                id: 'review',
                title: 'Review source',
                status: 'complete',
                detail: 'Supplied fixture.',
              },
            ]}
          />
          <Tool name="Fixture tool" input="Local input" output="Local output" />
          <Confirmation
            title="Approve fixture?"
            description="No actual tool runs."
            onDecision={(approved) => setDecision(approved ? 'Approved locally' : 'Denied locally')}
          />
          <p role="status">{decision}</p>
        </section>
        <section>
          <h2>Local streaming chat</h2>
          <Chat transport={transport} />
        </section>
      </main>
    </TooltipProvider>
  );
}

createRoot(document.getElementById('root')!).render(<Consumer />);
