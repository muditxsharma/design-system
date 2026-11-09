import { useEffect, useRef, useState, useId, type ReactNode, type FormEvent } from 'react';
import {
  Check,
  ChevronRight,
  Circle,
  File,
  Folder,
  Link,
  Paperclip,
  Send,
  Square,
  Terminal as TerminalIcon,
  Wrench,
  X,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Message as UIMessage, MessageContent, MessageHeader } from '../ui/message';
import { Bubble, BubbleContent } from '../ui/bubble';
import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from '../ui/message-scroller';
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '../ui/trace';
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from '../ui/code-block';
export type AgentStatus = 'pending' | 'running' | 'complete' | 'error';
export type AgentStep = { id: string; title: string; status: AgentStatus; detail?: ReactNode };
export function AgentTrace({
  title,
  status = 'complete',
  children,
}: {
  title: string;
  status?: AgentStatus;
  children?: ReactNode;
}) {
  const icon =
    status === 'complete' ? (
      <Check />
    ) : status === 'pending' ? (
      <Circle />
    ) : status === 'error' ? (
      <X />
    ) : (
      <Wrench />
    );
  return (
    <Trace>
      <TraceCollapsible>
        <TraceCollapsibleTrigger>
          <TraceLine status={status === 'complete' ? undefined : status}>
            <TraceIcon>{icon}</TraceIcon>
            <TraceTitle>{title}</TraceTitle>
            <Badge variant="outline">{status}</Badge>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>{children}</TraceCollapsibleContent>
      </TraceCollapsible>
    </Trace>
  );
}
export function Reasoning({
  summary,
  children,
  status = 'complete',
}: {
  summary: string;
  children: ReactNode;
  status?: AgentStatus;
}) {
  return (
    <AgentTrace title={summary} status={status}>
      <div data-slot="ai-reasoning" className="text-sm leading-relaxed">
        {children}
      </div>
    </AgentTrace>
  );
}
export function ChainOfThought({ steps }: { steps: AgentStep[] }) {
  return (
    <div className="space-y-3" data-slot="ai-chain-of-thought">
      {steps.map((step) => (
        <AgentTrace key={step.id} title={step.title} status={step.status}>
          {step.detail}
        </AgentTrace>
      ))}
    </div>
  );
}
export function Tool({
  name,
  input,
  output,
  status = 'complete',
}: {
  name: string;
  input: string;
  output?: string;
  status?: AgentStatus;
}) {
  return (
    <AgentTrace title={name} status={status}>
      <div className="space-y-3">
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>Input</CodeBlockTitle>
          </CodeBlockHeader>
          <CodeBlockContent>{input}</CodeBlockContent>
        </CodeBlock>
        {output !== undefined && (
          <CodeBlock variant={status === 'error' ? 'destructive' : 'default'}>
            <CodeBlockHeader>
              <CodeBlockTitle>Output</CodeBlockTitle>
            </CodeBlockHeader>
            <CodeBlockContent>{output}</CodeBlockContent>
          </CodeBlock>
        )}
      </div>
    </AgentTrace>
  );
}
export function Plan({ title, steps }: { title: string; steps: AgentStep[] }) {
  const done = steps.filter((s) => s.status === 'complete').length;
  return (
    <Card data-ai="plan">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {done} of {steps.length} supplied steps completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress
          value={steps.length ? (done / steps.length) * 100 : 0}
          aria-label="Plan completion"
        />
        <ChainOfThought steps={steps} />
      </CardContent>
    </Card>
  );
}
export function Queue({ steps }: { steps: AgentStep[] }) {
  return (
    <div className="space-y-4" data-slot="ai-queue">
      <h4 className="text-xs font-medium text-muted-foreground">UP NEXT</h4>
      <ChainOfThought steps={steps.filter((s) => s.status !== 'complete')} />
      <h4 className="text-xs font-medium text-muted-foreground">COMPLETED</h4>
      <ChainOfThought steps={steps.filter((s) => s.status === 'complete')} />
    </div>
  );
}
export function Task({ steps }: { steps: AgentStep[] }) {
  return <ChainOfThought steps={steps} />;
}
export function Subagent({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: AgentStep[];
}) {
  return (
    <AgentTrace title={name}>
      <p className="mb-3">{description}</p>
      <ChainOfThought steps={steps} />
    </AgentTrace>
  );
}
export function Confirmation({
  title,
  description,
  onDecision,
}: {
  title: string;
  description: string;
  onDecision: (approved: boolean) => void;
}) {
  const [decision, setDecision] = useState<boolean | null>(null);
  const decide = (approved: boolean) => {
    setDecision(approved);
    onDecision(approved);
  };
  return (
    <Card data-ai="confirmation">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {decision === null ? (
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => decide(false)}>
              Deny
            </Button>
            <Button onClick={() => decide(true)}>Approve</Button>
          </div>
        ) : (
          <p role="status">{decision ? 'Approved' : 'Denied'}. Decision recorded.</p>
        )}
      </CardContent>
    </Card>
  );
}
export function Checkpoint({ label, onRestore }: { label: string; onRestore: () => void }) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-y py-3"
      data-slot="ai-checkpoint"
    >
      <span className="text-sm">{label}</span>
      <Button variant="outline" size="sm" onClick={onRestore}>
        Return to checkpoint
      </Button>
    </div>
  );
}
export function Context({ used, total }: { used: number; total: number }) {
  const percentage = total > 0 ? Math.min(100, Math.max(0, (used / total) * 100)) : 0;
  return (
    <div data-slot="ai-context" className="space-y-3">
      <div className="flex justify-between gap-4 text-xs">
        <span>Context window</span>
        <span>
          {used.toLocaleString()} / {total.toLocaleString()} tokens
        </span>
      </div>
      <Progress
        value={percentage}
        aria-label={`${Math.round(percentage)}% of supplied context used`}
      />
    </div>
  );
}
export function Sources({ sources }: { sources: { title: string; url: string }[] }) {
  return (
    <AgentTrace title={`${sources.length} sources`}>
      <ul className="space-y-2">
        {sources.map((s, i) => (
          <li key={s.url}>
            <a
              className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
              href={s.url}
              target="_blank"
              rel="noreferrer"
            >
              <Link className="size-3" />
              {i + 1}. {s.title}
            </a>
          </li>
        ))}
      </ul>
    </AgentTrace>
  );
}
export function InlineCitation({
  title,
  url,
  children,
}: {
  title: string;
  url: string;
  children?: ReactNode;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          className="inline-flex rounded border px-1 text-xs underline"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {children || title}
        </a>
      </HoverCardTrigger>
      <HoverCardContent>
        <a href={url} className="text-sm underline" target="_blank" rel="noreferrer">
          {title}
        </a>
      </HoverCardContent>
    </HoverCard>
  );
}
export type FileNode = { name: string; children?: FileNode[] };
export function FileTree({ files }: { files: FileNode[] }) {
  return (
    <ul className="space-y-2 text-sm" data-slot="ai-file-tree">
      {files.map((file) => (
        <li key={file.name}>
          {file.children ? (
            <details className="group">
              <summary className="flex cursor-pointer items-center gap-2">
                <ChevronRight className="size-3" />
                <Folder className="size-4" />
                {file.name}
              </summary>
              <div className="ml-5 mt-2 border-l pl-3">
                <FileTree files={file.children} />
              </div>
            </details>
          ) : (
            <span className="flex items-center gap-2">
              <File className="size-4" />
              {file.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
export function ModelSelector({
  value,
  onValueChange,
  models,
}: {
  value: string;
  onValueChange: (value: string) => void;
  models: { id: string; name: string }[];
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label="Choose a model" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {models.map((m) => (
          <SelectItem value={m.id} key={m.id}>
            {m.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export function Suggestion({
  children,
  onSelect,
}: {
  children: string;
  onSelect: (value: string) => void;
}) {
  return (
    <Button variant="outline" size="sm" onClick={() => onSelect(children)}>
      {children}
    </Button>
  );
}
export function Terminal({ command, output }: { command: string; output: string }) {
  return (
    <CodeBlock>
      <CodeBlockHeader>
        <TerminalIcon className="size-4" />
        <CodeBlockTitle>{command}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={output} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{output}</CodeBlockContent>
    </CodeBlock>
  );
}
export function StackTrace({ error, frames }: { error: string; frames: string[] }) {
  return (
    <AgentTrace title={error} status="error">
      <CodeBlock variant="destructive">
        <CodeBlockContent>{frames.join('\n')}</CodeBlockContent>
      </CodeBlock>
    </AgentTrace>
  );
}
export function TestResults({
  tests,
}: {
  tests: { name: string; passed: boolean; detail?: string }[];
}) {
  return (
    <div className="space-y-3" data-slot="ai-test-results">
      <p className="text-xs text-muted-foreground">
        {tests.filter((t) => t.passed).length} of {tests.length} supplied results passed
      </p>
      {tests.map((t) => (
        <AgentTrace key={t.name} title={t.name} status={t.passed ? 'complete' : 'error'}>
          {t.detail || 'No further output.'}
        </AgentTrace>
      ))}
    </div>
  );
}
export function Message({ from, children }: { from: 'user' | 'assistant'; children: ReactNode }) {
  return (
    <UIMessage align={from === 'user' ? 'end' : 'start'}>
      <MessageContent>
        <MessageHeader>{from === 'user' ? 'You' : 'Assistant'}</MessageHeader>
        <Bubble
          variant={from === 'user' ? 'secondary' : 'outline'}
          align={from === 'user' ? 'end' : 'start'}
          className="max-w-full"
        >
          <BubbleContent>
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{children}</div>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </UIMessage>
  );
}
export function Conversation({ children }: { children: ReactNode }) {
  return (
    <div className="h-72 min-w-0" data-slot="ai-conversation">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport aria-label="Conversation">
            <MessageScrollerContent className="gap-5 p-2">{children}</MessageScrollerContent>
          </MessageScrollerViewport>
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  );
}
export type Prompt = { text: string; files: File[] };
export function PromptInput({
  onSubmit,
  busy = false,
  onStop,
}: {
  onSubmit: (prompt: Prompt) => void;
  busy?: boolean;
  onStop?: () => void;
}) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const id = useId();
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    onSubmit({ text: text.trim(), files });
    setText('');
    setFiles([]);
  }
  return (
    <form
      onSubmit={submit}
      className="space-y-3 rounded-lg border bg-card p-3"
      data-slot="ai-prompt-input"
    >
      <label htmlFor={id} className="sr-only">
        Message to assistant
      </label>
      <Textarea
        id={id}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about your design system…"
        disabled={busy}
        className="min-h-20 resize-y border-0 shadow-none"
      />
      <div className="flex flex-wrap gap-2">
        {files.map((file, i) => (
          <Badge key={`${file.name}-${i}`} variant="outline">
            {file.name}
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              onClick={() => setFiles(files.filter((_, n) => n !== i))}
            >
              <X className="ml-1 size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <Paperclip className="size-4" />
          <span>Attach</span>
          <input
            type="file"
            multiple
            className="sr-only"
            disabled={busy}
            onChange={(e) => {
              setFiles(Array.from(e.target.files || []));
              e.target.value = '';
            }}
          />
        </label>
        {busy ? (
          <Button type="button" onClick={onStop} aria-label="Stop response">
            <Square className="size-4" />
            Stop
          </Button>
        ) : (
          <Button type="submit" disabled={!text.trim()}>
            <Send className="size-4" />
            Send
          </Button>
        )}
      </div>
    </form>
  );
}
export type ChatTransport = (prompt: Prompt, signal: AbortSignal) => AsyncIterable<string>;
export function Chat({ transport }: { transport: ChatTransport }) {
  const [messages, setMessages] = useState<
    {
      id: string;
      from: 'user' | 'assistant';
      text: string;
    }[]
  >([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  async function submit(prompt: Prompt) {
    const abort = new AbortController();
    controller.current = abort;
    const id = crypto.randomUUID();
    setError('');
    setBusy(true);
    setMessages((old) => [
      ...old,
      {
        id: crypto.randomUUID(),
        from: 'user',
        text:
          prompt.text + (prompt.files.length ? `\n${prompt.files.length} local attachment(s)` : ''),
      },
      { id, from: 'assistant', text: '' },
    ]);
    try {
      for await (const chunk of transport(prompt, abort.signal)) {
        if (abort.signal.aborted) break;
        setMessages((old) =>
          old.map((message) =>
            message.id === id ? { ...message, text: message.text + chunk } : message,
          ),
        );
      }
    } catch (e) {
      if (!abort.signal.aborted)
        setError(e instanceof Error ? e.message : 'Response failed. Retry your request.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div data-slot="ai-chat" className="space-y-4">
      <Conversation>
        {messages.length ? (
          messages.map((m) => (
            <MessageScrollerItem key={m.id}>
              <Message from={m.from}>{m.text || 'Response pending…'}</Message>
            </MessageScrollerItem>
          ))
        ) : (
          <p className="p-3 text-sm text-muted-foreground">Start a local conversation preview.</p>
        )}
      </Conversation>
      {error && (
        <p role="alert" className="border-l-4 border-destructive pl-3 text-sm">
          {error}
        </p>
      )}
      <p role="status" className="text-xs text-muted-foreground">
        {busy ? 'Receiving a local demo response…' : 'Preview only. No model is connected.'}
      </p>
      <PromptInput
        onSubmit={(prompt) => void submit(prompt)}
        busy={busy}
        onStop={() => controller.current?.abort()}
      />
    </div>
  );
}
