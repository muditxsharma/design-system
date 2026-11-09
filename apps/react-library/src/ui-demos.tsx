import { lazy, useId, useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Folder,
  Heart,
  Layers,
  LayoutGrid,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import * as A from '@inverse_ratio/design-system/ui/accordion';
import * as Alert from '@inverse_ratio/design-system/ui/alert';
import * as AD from '@inverse_ratio/design-system/ui/alert-dialog';
import { AspectRatio } from '@inverse_ratio/design-system/ui/aspect-ratio';
import * as Attachment from '@inverse_ratio/design-system/ui/attachment';
import * as Avatar from '@inverse_ratio/design-system/ui/avatar';
import { Badge } from '@inverse_ratio/design-system/ui/badge';
import * as Breadcrumb from '@inverse_ratio/design-system/ui/breadcrumb';
import * as Bubble from '@inverse_ratio/design-system/ui/bubble';
import { Button } from '@inverse_ratio/design-system/ui/button';
import { ButtonGroup } from '@inverse_ratio/design-system/ui/button-group';
import { Calendar } from '@inverse_ratio/design-system/ui/calendar';
import * as Card from '@inverse_ratio/design-system/ui/card';
import * as Carousel from '@inverse_ratio/design-system/ui/carousel';
import { Checkbox } from '@inverse_ratio/design-system/ui/checkbox';
import * as Code from '@inverse_ratio/design-system/ui/code-block';
import * as Collapsible from '@inverse_ratio/design-system/ui/collapsible';
import * as Combo from '@inverse_ratio/design-system/ui/combobox';
import * as Command from '@inverse_ratio/design-system/ui/command';
import * as Context from '@inverse_ratio/design-system/ui/context-menu';
import * as Dialog from '@inverse_ratio/design-system/ui/dialog';
import { DirectionProvider } from '@inverse_ratio/design-system/ui/direction';
import * as Drawer from '@inverse_ratio/design-system/ui/drawer';
import * as Dropdown from '@inverse_ratio/design-system/ui/dropdown-menu';
import * as Empty from '@inverse_ratio/design-system/ui/empty';
import * as Field from '@inverse_ratio/design-system/ui/field';
import * as Hover from '@inverse_ratio/design-system/ui/hover-card';
import { Input } from '@inverse_ratio/design-system/ui/input';
import * as InputGroup from '@inverse_ratio/design-system/ui/input-group';
import * as OTP from '@inverse_ratio/design-system/ui/input-otp';
import * as Item from '@inverse_ratio/design-system/ui/item';
import { Kbd } from '@inverse_ratio/design-system/ui/kbd';
import { Label } from '@inverse_ratio/design-system/ui/label';
import * as Marker from '@inverse_ratio/design-system/ui/marker';
import * as Menubar from '@inverse_ratio/design-system/ui/menubar';
import * as Message from '@inverse_ratio/design-system/ui/message';
import * as Scroller from '@inverse_ratio/design-system/ui/message-scroller';
import * as Native from '@inverse_ratio/design-system/ui/native-select';
import * as Nav from '@inverse_ratio/design-system/ui/navigation-menu';
import * as Pagination from '@inverse_ratio/design-system/ui/pagination';
import * as Popover from '@inverse_ratio/design-system/ui/popover';
import { Progress } from '@inverse_ratio/design-system/ui/progress';
import * as Q from '@inverse_ratio/design-system/ui/questionnaire';
import * as Radio from '@inverse_ratio/design-system/ui/radio-group';
import * as Resize from '@inverse_ratio/design-system/ui/resizable';
import { ScrollArea } from '@inverse_ratio/design-system/ui/scroll-area';
import * as Select from '@inverse_ratio/design-system/ui/select';
import { Separator } from '@inverse_ratio/design-system/ui/separator';
import * as Sheet from '@inverse_ratio/design-system/ui/sheet';
import * as Sidebar from '@inverse_ratio/design-system/ui/sidebar';
import { Skeleton } from '@inverse_ratio/design-system/ui/skeleton';
import { Slider } from '@inverse_ratio/design-system/ui/slider';
import { Spinner } from '@inverse_ratio/design-system/ui/spinner';
import { Switch } from '@inverse_ratio/design-system/ui/switch';
import * as Table from '@inverse_ratio/design-system/ui/table';
import * as Tabs from '@inverse_ratio/design-system/ui/tabs';
import { Textarea } from '@inverse_ratio/design-system/ui/textarea';
import { Toggle } from '@inverse_ratio/design-system/ui/toggle';
import * as ToggleGroup from '@inverse_ratio/design-system/ui/toggle-group';
import * as Tooltip from '@inverse_ratio/design-system/ui/tooltip';
import * as Trace from '@inverse_ratio/design-system/ui/trace';
import type { Demo } from './types';

const notify = (message: string) => () => toast(message + ' — local demo only.');
function FormStudy() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [invalid, setInvalid] = useState(false);
  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const valid = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).validity
          .valid;
        setInvalid(!valid);
        setFeedback(
          valid
            ? 'Email accepted. Nothing was sent.'
            : 'Enter a valid email such as name@studio.com.',
        );
        if (!valid) (e.currentTarget.elements.namedItem('email') as HTMLInputElement).focus();
      }}
    >
      <Field.Field data-invalid={invalid}>
        <Field.FieldLabel htmlFor={id}>Work email</Field.FieldLabel>
        <Input
          id={id}
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@studio.com"
          aria-invalid={invalid}
          aria-describedby={`${id}-help`}
        />
        <Field.FieldDescription id={`${id}-help`}>
          This value stays in your browser.
        </Field.FieldDescription>
      </Field.Field>
      <Button type="submit">Validate email</Button>
      <p
        role="status"
        className={invalid ? 'text-sm text-destructive' : 'text-sm text-muted-foreground'}
      >
        {feedback}
      </p>
    </form>
  );
}
function DateStudy({ inline = false }: { inline?: boolean }) {
  const [date, setDate] = useState<Date>();
  const calendar = <Calendar mode="single" selected={date} onSelect={setDate} />;
  return (
    <div className="space-y-3">
      {inline ? (
        calendar
      ) : (
        <Popover.Popover>
          <Popover.PopoverTrigger asChild>
            <Button variant="outline">
              {date ? date.toLocaleDateString() : 'Choose a review date'}
              <ChevronDown />
            </Button>
          </Popover.PopoverTrigger>
          <Popover.PopoverContent className="w-auto p-0">{calendar}</Popover.PopoverContent>
        </Popover.Popover>
      )}
      <p role="status" className="text-xs text-muted-foreground">
        {date ? `Selected ${date.toLocaleDateString()}` : 'No date selected.'}
      </p>
    </div>
  );
}
function TableStudy({ interactive = false }: { interactive?: boolean }) {
  const [query, setQuery] = useState('');
  const [ascending, setAscending] = useState(true);
  const rows = ['Art direction', 'Interface studies', 'Motion tests']
    .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (ascending ? 1 : -1) * a.localeCompare(b));
  return (
    <div className="space-y-4">
      {interactive && (
        <Input
          aria-label="Filter projects"
          placeholder="Filter projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <Table.Table>
        <Table.TableCaption>
          {rows.length} project{rows.length === 1 ? '' : 's'} · local data
        </Table.TableCaption>
        <Table.TableHeader>
          <Table.TableRow>
            <Table.TableHead aria-sort={ascending ? 'ascending' : 'descending'}>
              {interactive ? (
                <Button variant="ghost" onClick={() => setAscending(!ascending)}>
                  Project ↕
                </Button>
              ) : (
                'Project'
              )}
            </Table.TableHead>
            <Table.TableHead>Status</Table.TableHead>
            <Table.TableHead>Members</Table.TableHead>
          </Table.TableRow>
        </Table.TableHeader>
        <Table.TableBody>
          {rows.map((name, i) => (
            <Table.TableRow key={name}>
              <Table.TableCell className="font-medium">{name}</Table.TableCell>
              <Table.TableCell>{i === 0 ? 'Active' : 'Draft'}</Table.TableCell>
              <Table.TableCell>{8 - i * 2}</Table.TableCell>
            </Table.TableRow>
          ))}
        </Table.TableBody>
      </Table.Table>
      {rows.length === 0 && <p role="status">No matching projects.</p>}
    </div>
  );
}
function SelectStudy() {
  return (
    <Select.Select defaultValue="private">
      <Select.SelectTrigger aria-label="Project visibility" className="w-56">
        <Select.SelectValue />
      </Select.SelectTrigger>
      <Select.SelectContent>
        <Select.SelectItem value="private">Private workspace</Select.SelectItem>
        <Select.SelectItem value="team">Team workspace</Select.SelectItem>
        <Select.SelectItem value="public">Public workspace</Select.SelectItem>
      </Select.SelectContent>
    </Select.Select>
  );
}
const ChartStudy = lazy(() => import('./ChartDemo'));
function MessageStudy() {
  return (
    <Message.Message>
      <Message.MessageAvatar>
        <Avatar.Avatar>
          <Avatar.AvatarFallback>AM</Avatar.AvatarFallback>
        </Avatar.Avatar>
      </Message.MessageAvatar>
      <Message.MessageContent>
        <Message.MessageHeader>Alex · Design team</Message.MessageHeader>
        <Bubble.Bubble variant="outline">
          <Bubble.BubbleContent>
            Let’s make the next iteration feel more intentional.
          </Bubble.BubbleContent>
        </Bubble.Bubble>
        <Message.MessageFooter>Local message specimen</Message.MessageFooter>
      </Message.MessageContent>
    </Message.Message>
  );
}
function DemoDialog() {
  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger asChild>
        <Button>Open project settings</Button>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Project settings</Dialog.DialogTitle>
          <Dialog.DialogDescription>
            A focused local preview. Escape or Cancel closes it.
          </Dialog.DialogDescription>
        </Dialog.DialogHeader>
        <Label htmlFor="dialog-name">Project name</Label>
        <Input id="dialog-name" defaultValue="Exploration 001" />
        <Dialog.DialogFooter>
          <Dialog.DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.DialogClose>
          <Dialog.DialogClose asChild>
            <Button onClick={notify('Settings reviewed')}>Save demo</Button>
          </Dialog.DialogClose>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
}
function PaginationStudy() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-4">
      <Pagination.Pagination>
        <Pagination.PaginationContent>
          <Pagination.PaginationItem>
            <Pagination.PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(1, page - 1));
              }}
            />
          </Pagination.PaginationItem>
          {[1, 2, 3].map((n) => (
            <Pagination.PaginationItem key={n}>
              <Pagination.PaginationLink
                href="#"
                isActive={n === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(n);
                }}
              >
                {n}
              </Pagination.PaginationLink>
            </Pagination.PaginationItem>
          ))}
          <Pagination.PaginationItem>
            <Pagination.PaginationNext
              href="#"
              aria-disabled={page === 3}
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(3, page + 1));
              }}
            />
          </Pagination.PaginationItem>
        </Pagination.PaginationContent>
      </Pagination.Pagination>
      <p role="status" className="text-center text-sm text-muted-foreground">
        Items {(page - 1) * 10 + 1}–{page * 10} of 30
      </p>
    </div>
  );
}
function QuestionnaireStudy() {
  const [result, setResult] = useState('');
  return (
    <Q.Questionnaire
      onSubmit={(e) => {
        e.preventDefault();
        setResult('Preference recorded locally.');
      }}
    >
      <Q.QuestionnaireItem name="focus" required>
        <Q.QuestionnaireTitle>What should we explore next?</Q.QuestionnaireTitle>
        <Q.QuestionnaireChoices>
          <Q.QuestionnaireChoice value="type">Typography</Q.QuestionnaireChoice>
          <Q.QuestionnaireChoice value="motion">Motion</Q.QuestionnaireChoice>
          <Q.QuestionnaireChoice value="layout">Layout</Q.QuestionnaireChoice>
        </Q.QuestionnaireChoices>
      </Q.QuestionnaireItem>
      <Q.QuestionnaireSubmit>Record preference</Q.QuestionnaireSubmit>
      <p role="status" className="text-sm">
        {result}
      </p>
    </Q.Questionnaire>
  );
}
function ProgressStudy() {
  const [value, setValue] = useState(35);
  return (
    <div className="space-y-4">
      <Progress value={value} aria-label="User controlled progress" />
      <Button
        variant="outline"
        onClick={() => setValue(Math.min(100, value + 15))}
        disabled={value === 100}
      >
        Advance 15%
      </Button>
      <p role="status" className="text-sm">
        {value}% · interaction study, not a background task
      </p>
    </div>
  );
}
function SliderStudy() {
  const [value, setValue] = useState([65]);
  return (
    <div className="space-y-5">
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        aria-label="Preview intensity"
      />
      <p className="text-xs text-muted-foreground">Preview intensity: {value[0]}%</p>
    </div>
  );
}
function DirectionStudy() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}>
        Switch to {dir === 'ltr' ? 'RTL' : 'LTR'}
      </Button>
      <DirectionProvider dir={dir}>
        <div dir={dir} className="rounded border p-5 text-start">
          <Label>Design workspace</Label>
          <div className="mt-3">
            <SelectStudy />
          </div>
        </div>
      </DirectionProvider>
    </div>
  );
}
function OTPStudy() {
  const [value, setValue] = useState('');
  return (
    <div className="space-y-3">
      <Label htmlFor="otp-preview">Six-digit verification code</Label>
      <OTP.InputOTP
        id="otp-preview"
        maxLength={6}
        value={value}
        onChange={setValue}
        pattern="^[0-9]+$"
      >
        <OTP.InputOTPGroup>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <OTP.InputOTPSlot key={index} index={index} />
          ))}
        </OTP.InputOTPGroup>
      </OTP.InputOTP>
      <p role="status" className="text-xs text-muted-foreground">
        {value.length} of 6 digits. Nothing is verified remotely.
      </p>
    </div>
  );
}
function TextareaStudy() {
  const [text, setText] = useState('');
  return (
    <div className="space-y-3">
      <Label htmlFor="notes-preview">Design notes</Label>
      <Textarea
        id="notes-preview"
        value={text}
        maxLength={240}
        onChange={(e) => setText(e.target.value)}
        placeholder="What should this experience feel like?"
      />
      <p className="text-xs text-muted-foreground">{text.length} / 240 characters</p>
    </div>
  );
}
function ComboboxStudy() {
  const items = ['Forma', 'Minimal', 'Nocturne', 'Brutalism'];
  return (
    <Combo.Combobox items={items}>
      <Combo.ComboboxInput placeholder="Find an identity…" aria-label="Choose a design identity" />
      <Combo.ComboboxContent>
        <Combo.ComboboxEmpty>No matching identity.</Combo.ComboboxEmpty>
        <Combo.ComboboxList>
          {(item: string) => (
            <Combo.ComboboxItem key={item} value={item}>
              {item}
            </Combo.ComboboxItem>
          )}
        </Combo.ComboboxList>
      </Combo.ComboboxContent>
    </Combo.Combobox>
  );
}
function SidebarStudy() {
  return (
    <Sidebar.SidebarProvider
      className="relative min-h-56 rounded border"
      style={{ '--sidebar-width': '12rem' } as React.CSSProperties}
    >
      <Sidebar.Sidebar collapsible="none" className="relative">
        <Sidebar.SidebarContent>
          <Sidebar.SidebarGroup>
            <Sidebar.SidebarGroupLabel>Workspace</Sidebar.SidebarGroupLabel>
            <Sidebar.SidebarMenu>
              {['Foundations', 'Components', 'AI Elements'].map((name, i) => (
                <Sidebar.SidebarMenuItem key={name}>
                  <Sidebar.SidebarMenuButton
                    isActive={i === 0}
                    onClick={notify(name + ' navigation')}
                  >
                    <Layers />
                    <span>{name}</span>
                  </Sidebar.SidebarMenuButton>
                </Sidebar.SidebarMenuItem>
              ))}
            </Sidebar.SidebarMenu>
          </Sidebar.SidebarGroup>
        </Sidebar.SidebarContent>
      </Sidebar.Sidebar>
      <div className="p-5 text-sm text-muted-foreground">Working canvas</div>
    </Sidebar.SidebarProvider>
  );
}
function DemoCard() {
  return (
    <Card.Card className="w-full max-w-md">
      <Card.CardHeader>
        <Badge variant="outline" className="w-fit">
          Workspace
        </Badge>
        <Card.CardTitle>A space for your next idea.</Card.CardTitle>
        <Card.CardDescription>Independent expression. A shared foundation.</Card.CardDescription>
      </Card.CardHeader>
      <Card.CardContent>
        <Label htmlFor="card-project">Project name</Label>
        <Input id="card-project" className="mt-2" placeholder="Exploration 001" />
      </Card.CardContent>
      <Card.CardFooter>
        <Button onClick={notify('Create project')}>
          <Plus />
          Create project
        </Button>
      </Card.CardFooter>
    </Card.Card>
  );
}
function TraceStudy() {
  return (
    <Trace.Trace>
      <Trace.TraceCollapsible>
        <Trace.TraceCollapsibleTrigger>
          <Trace.TraceLine>
            <Trace.TraceIcon>
              <Check />
            </Trace.TraceIcon>
            <Trace.TraceTitle>Checked the design foundations</Trace.TraceTitle>
          </Trace.TraceLine>
        </Trace.TraceCollapsibleTrigger>
        <Trace.TraceCollapsibleContent>
          All four identities share semantics while retaining independent visual anatomy.
        </Trace.TraceCollapsibleContent>
      </Trace.TraceCollapsible>
    </Trace.Trace>
  );
}
function CodeStudy() {
  const code = 'applyReactTheme({ system: "minimal", mode: "dark", accent: 1 })';
  return (
    <Code.CodeBlock>
      <Code.CodeBlockHeader>
        <Code.CodeBlockTitle>theme.ts</Code.CodeBlockTitle>
        <Code.CodeBlockActions>
          <Code.CodeBlockCopyButton value={code} />
        </Code.CodeBlockActions>
      </Code.CodeBlockHeader>
      <Code.CodeBlockContent>{code}</Code.CodeBlockContent>
    </Code.CodeBlock>
  );
}
const definitions: [string, string, string, React.ComponentType][] = [
  [
    'Accordion',
    'Layout',
    'accordion',
    () => (
      <A.Accordion type="single" collapsible>
        <A.AccordionItem value="one">
          <A.AccordionTrigger>What connects these systems?</A.AccordionTrigger>
          <A.AccordionContent>
            Shared interaction semantics and independent visual identities.
          </A.AccordionContent>
        </A.AccordionItem>
        <A.AccordionItem value="two">
          <A.AccordionTrigger>Are the tokens finalized?</A.AccordionTrigger>
          <A.AccordionContent>No. Values remain exploratory.</A.AccordionContent>
        </A.AccordionItem>
      </A.Accordion>
    ),
  ],
  [
    'Alert',
    'Feedback',
    'alert',
    () => (
      <div className="space-y-3">
        <Alert.Alert data-severity="success">
          <Check />
          <Alert.AlertTitle>Changes saved</Alert.AlertTitle>
          <Alert.AlertDescription>This is a local feedback specimen.</Alert.AlertDescription>
        </Alert.Alert>
        <Alert.Alert data-severity="error">
          <Alert.AlertTitle>Unable to save</Alert.AlertTitle>
          <Alert.AlertDescription>
            Check your connection and retry. This error stays visible.
          </Alert.AlertDescription>
        </Alert.Alert>
      </div>
    ),
  ],
  [
    'Alert Dialog',
    'Overlay',
    'alert-dialog',
    () => (
      <AD.AlertDialog>
        <AD.AlertDialogTrigger asChild>
          <Button>Archive project</Button>
        </AD.AlertDialogTrigger>
        <AD.AlertDialogContent>
          <AD.AlertDialogHeader>
            <AD.AlertDialogTitle>Archive this project?</AD.AlertDialogTitle>
            <AD.AlertDialogDescription>
              This demonstration changes no data.
            </AD.AlertDialogDescription>
          </AD.AlertDialogHeader>
          <AD.AlertDialogFooter>
            <AD.AlertDialogCancel>Cancel</AD.AlertDialogCancel>
            <AD.AlertDialogAction onClick={notify('Archive approved')}>
              Archive demo
            </AD.AlertDialogAction>
          </AD.AlertDialogFooter>
        </AD.AlertDialogContent>
      </AD.AlertDialog>
    ),
  ],
  [
    'Aspect Ratio',
    'Layout',
    'aspect-ratio',
    () => (
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center rounded-lg border bg-muted"
      >
        <Layers className="size-16 text-primary" />
      </AspectRatio>
    ),
  ],
  [
    'Attachment',
    'Forms',
    'attachment',
    () => (
      <div className="space-y-4">
        <Attachment.Attachment>
          <Attachment.AttachmentMedia>
            <FileText />
          </Attachment.AttachmentMedia>
          <Attachment.AttachmentContent>
            <Attachment.AttachmentTitle>Design charter.pdf</Attachment.AttachmentTitle>
            <Attachment.AttachmentDescription>Reference specimen</Attachment.AttachmentDescription>
          </Attachment.AttachmentContent>
        </Attachment.Attachment>
        <Label>
          Choose a local file
          <Input
            type="file"
            className="mt-2"
            onChange={(e) => toast(e.target.files?.[0]?.name + ' stays local.')}
          />
        </Label>
      </div>
    ),
  ],
  [
    'Avatar',
    'Data',
    'avatar',
    () => (
      <div className="flex items-center gap-3">
        <Avatar.Avatar>
          <Avatar.AvatarFallback>AM</Avatar.AvatarFallback>
        </Avatar.Avatar>
        <Avatar.Avatar>
          <Avatar.AvatarFallback>SR</Avatar.AvatarFallback>
        </Avatar.Avatar>
        <p className="text-sm">The design team</p>
      </div>
    ),
  ],
  [
    'Badge',
    'Feedback',
    'badge',
    () => (
      <div className="flex flex-wrap gap-3">
        <Badge>
          <Check />
          Active
        </Badge>
        <Badge variant="secondary">In progress</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
    ),
  ],
  [
    'Breadcrumb',
    'Navigation',
    'breadcrumb',
    () => (
      <Breadcrumb.Breadcrumb>
        <Breadcrumb.BreadcrumbList>
          <Breadcrumb.BreadcrumbItem>
            <Breadcrumb.BreadcrumbLink href="#Button">Library</Breadcrumb.BreadcrumbLink>
          </Breadcrumb.BreadcrumbItem>
          <Breadcrumb.BreadcrumbSeparator />
          <Breadcrumb.BreadcrumbItem>
            <Breadcrumb.BreadcrumbPage>Components</Breadcrumb.BreadcrumbPage>
          </Breadcrumb.BreadcrumbItem>
        </Breadcrumb.BreadcrumbList>
      </Breadcrumb.Breadcrumb>
    ),
  ],
  [
    'Bubble',
    'Communication',
    'bubble',
    () => (
      <Bubble.Bubble variant="outline">
        <Bubble.BubbleContent>
          A shared language, with room for individual expression.
        </Bubble.BubbleContent>
      </Bubble.Bubble>
    ),
  ],
  [
    'Button',
    'Actions',
    'button',
    () => (
      <div className="flex flex-wrap gap-3">
        <Button onClick={notify('Create project')}>
          <Plus />
          Create project
        </Button>
        <Button variant="outline" onClick={notify('Export')}>
          <Download />
          Export
        </Button>
        <Button disabled>Unavailable</Button>
      </div>
    ),
  ],
  [
    'Button Group',
    'Actions',
    'button-group',
    () => (
      <ButtonGroup>
        <Button variant="outline" onClick={notify('Copy')}>
          <Copy />
          Copy
        </Button>
        <Button variant="outline" onClick={notify('Export')}>
          <Download />
          Export
        </Button>
      </ButtonGroup>
    ),
  ],
  ['Calendar', 'Forms', 'calendar', () => <DateStudy inline />],
  ['Card', 'Layout', 'card', DemoCard],
  [
    'Carousel',
    'Data',
    'carousel',
    () => (
      <Carousel.Carousel className="mx-auto w-[75%]">
        <Carousel.CarouselContent>
          {['Define', 'Explore', 'Refine'].map((name, i) => (
            <Carousel.CarouselItem key={name}>
              <div className="flex aspect-video flex-col items-center justify-center rounded-lg border bg-muted p-5">
                <span className="text-xs text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-2 text-2xl">{name}</h3>
              </div>
            </Carousel.CarouselItem>
          ))}
        </Carousel.CarouselContent>
        <Carousel.CarouselPrevious />
        <Carousel.CarouselNext />
      </Carousel.Carousel>
    ),
  ],
  ['Chart', 'Data', 'chart', ChartStudy],
  [
    'Checkbox',
    'Forms',
    'checkbox',
    () => (
      <div className="space-y-4">
        <Label className="flex gap-3">
          <Checkbox defaultChecked />
          Include design notes
        </Label>
        <Label className="flex gap-3">
          <Checkbox />
          Keep references attached
        </Label>
        <Label className="flex gap-3 text-muted-foreground">
          <Checkbox disabled />
          Unavailable option
        </Label>
      </div>
    ),
  ],
  ['Code Block', 'Data', 'code-block', CodeStudy],
  [
    'Collapsible',
    'Layout',
    'collapsible',
    () => (
      <Collapsible.Collapsible>
        <Collapsible.CollapsibleTrigger asChild>
          <Button variant="outline">
            Project references
            <ChevronDown />
          </Button>
        </Collapsible.CollapsibleTrigger>
        <Collapsible.CollapsibleContent className="mt-4 border p-4 text-sm">
          Art direction · Interface studies · Motion tests
        </Collapsible.CollapsibleContent>
      </Collapsible.Collapsible>
    ),
  ],
  ['Combobox', 'Forms', 'combobox', ComboboxStudy],
  [
    'Command',
    'Overlay',
    'command',
    () => (
      <Command.Command className="rounded-lg border">
        <Command.CommandInput placeholder="Search actions…" />
        <Command.CommandList>
          <Command.CommandEmpty>No matching actions.</Command.CommandEmpty>
          <Command.CommandGroup heading="Workspace">
            <Command.CommandItem onSelect={notify('New project')}>
              <Plus />
              Create project
            </Command.CommandItem>
            <Command.CommandItem onSelect={notify('Settings')}>
              <Settings />
              Open settings
            </Command.CommandItem>
          </Command.CommandGroup>
        </Command.CommandList>
      </Command.Command>
    ),
  ],
  [
    'Context Menu',
    'Overlay',
    'context-menu',
    () => (
      <Context.ContextMenu>
        <Context.ContextMenuTrigger className="flex h-32 items-center justify-center rounded border border-dashed text-sm">
          Right click for project actions
        </Context.ContextMenuTrigger>
        <Context.ContextMenuContent>
          <Context.ContextMenuItem onSelect={notify('Duplicate')}>
            Duplicate
          </Context.ContextMenuItem>
          <Context.ContextMenuItem onSelect={notify('Rename')}>Rename</Context.ContextMenuItem>
        </Context.ContextMenuContent>
      </Context.ContextMenu>
    ),
  ],
  ['Data Table', 'Data', 'table', () => <TableStudy interactive />],
  ['Date Picker', 'Forms', 'calendar', DateStudy],
  ['Dialog', 'Overlay', 'dialog', DemoDialog],
  ['Direction', 'Layout', 'direction', DirectionStudy],
  [
    'Drawer',
    'Overlay',
    'drawer',
    () => (
      <Drawer.Drawer>
        <Drawer.DrawerTrigger asChild>
          <Button>Open review queue</Button>
        </Drawer.DrawerTrigger>
        <Drawer.DrawerContent>
          <div className="mx-auto w-full max-w-md p-6">
            <Drawer.DrawerHeader>
              <Drawer.DrawerTitle>Review queue</Drawer.DrawerTitle>
              <Drawer.DrawerDescription>Bottom-anchored secondary work.</Drawer.DrawerDescription>
            </Drawer.DrawerHeader>
            <Drawer.DrawerFooter>
              <Drawer.DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </Drawer.DrawerClose>
            </Drawer.DrawerFooter>
          </div>
        </Drawer.DrawerContent>
      </Drawer.Drawer>
    ),
  ],
  [
    'Dropdown Menu',
    'Navigation',
    'dropdown-menu',
    () => (
      <Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger asChild>
          <Button variant="outline">
            Project actions
            <ChevronDown />
          </Button>
        </Dropdown.DropdownMenuTrigger>
        <Dropdown.DropdownMenuContent>
          <Dropdown.DropdownMenuLabel>Workspace</Dropdown.DropdownMenuLabel>
          <Dropdown.DropdownMenuItem onSelect={notify('Duplicate')}>
            Duplicate
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem onSelect={notify('Export')}>Export</Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuSeparator />
          <Dropdown.DropdownMenuCheckboxItem>Show archived</Dropdown.DropdownMenuCheckboxItem>
        </Dropdown.DropdownMenuContent>
      </Dropdown.DropdownMenu>
    ),
  ],
  [
    'Empty',
    'Feedback',
    'empty',
    () => (
      <Empty.Empty>
        <Empty.EmptyHeader>
          <Empty.EmptyMedia variant="icon">
            <Folder />
          </Empty.EmptyMedia>
          <Empty.EmptyTitle>No projects yet</Empty.EmptyTitle>
          <Empty.EmptyDescription>
            Create a project to start collecting ideas.
          </Empty.EmptyDescription>
        </Empty.EmptyHeader>
        <Empty.EmptyContent>
          <Button onClick={notify('Create project')}>
            <Plus />
            New project
          </Button>
        </Empty.EmptyContent>
      </Empty.Empty>
    ),
  ],
  ['Field', 'Forms', 'field', FormStudy],
  [
    'Hover Card',
    'Overlay',
    'hover-card',
    () => (
      <Hover.HoverCard>
        <Hover.HoverCardTrigger asChild>
          <Button variant="outline">Alex Morgan</Button>
        </Hover.HoverCardTrigger>
        <Hover.HoverCardContent>
          <strong>Alex Morgan</strong>
          <p className="mt-2 text-sm text-muted-foreground">Design lead · Visual systems</p>
        </Hover.HoverCardContent>
      </Hover.HoverCard>
    ),
  ],
  [
    'Input',
    'Forms',
    'input',
    () => (
      <div className="space-y-3">
        <Label htmlFor="input-name">Project name</Label>
        <Input id="input-name" placeholder="Exploration 001" />
        <Input aria-label="Read-only identifier" value="SC-001" readOnly />
      </div>
    ),
  ],
  [
    'Input Group',
    'Forms',
    'input-group',
    () => (
      <InputGroup.InputGroup>
        <InputGroup.InputGroupAddon>
          <Search />
        </InputGroup.InputGroupAddon>
        <InputGroup.InputGroupInput
          aria-label="Search references"
          placeholder="Search references…"
        />
        <InputGroup.InputGroupAddon align="inline-end">
          <Kbd>/</Kbd>
        </InputGroup.InputGroupAddon>
      </InputGroup.InputGroup>
    ),
  ],
  ['Input OTP', 'Forms', 'input-otp', OTPStudy],
  [
    'Item',
    'Layout',
    'item',
    () => (
      <Item.Item variant="outline">
        <Item.ItemMedia>
          <FileText />
        </Item.ItemMedia>
        <Item.ItemContent>
          <Item.ItemTitle>Design charter</Item.ItemTitle>
          <Item.ItemDescription>Reference document · exploratory</Item.ItemDescription>
        </Item.ItemContent>
        <Item.ItemActions>
          <Button variant="ghost" size="sm" onClick={notify('Preview charter')}>
            Preview
          </Button>
        </Item.ItemActions>
      </Item.Item>
    ),
  ],
  [
    'Kbd',
    'Data',
    'kbd',
    () => (
      <div className="flex items-center gap-3 text-sm">
        <span>Keyboard shortcut specimen</span>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    ),
  ],
  [
    'Label',
    'Forms',
    'label',
    () => (
      <div className="space-y-3">
        <Label htmlFor="label-name">Workspace label</Label>
        <Input id="label-name" placeholder="Click the label to focus" />
      </div>
    ),
  ],
  [
    'Marker',
    'Data',
    'marker',
    () => (
      <Marker.Marker variant="separator">
        <Marker.MarkerIcon>
          <Check />
        </Marker.MarkerIcon>
        <Marker.MarkerContent>Design review checkpoint</Marker.MarkerContent>
      </Marker.Marker>
    ),
  ],
  [
    'Menubar',
    'Navigation',
    'menubar',
    () => (
      <Menubar.Menubar>
        <Menubar.MenubarMenu>
          <Menubar.MenubarTrigger>File</Menubar.MenubarTrigger>
          <Menubar.MenubarContent>
            <Menubar.MenubarItem onSelect={notify('New document')}>
              New document
            </Menubar.MenubarItem>
            <Menubar.MenubarItem onSelect={notify('Export')}>Export</Menubar.MenubarItem>
          </Menubar.MenubarContent>
        </Menubar.MenubarMenu>
        <Menubar.MenubarMenu>
          <Menubar.MenubarTrigger>Edit</Menubar.MenubarTrigger>
          <Menubar.MenubarContent>
            <Menubar.MenubarItem onSelect={notify('Undo')}>Undo</Menubar.MenubarItem>
          </Menubar.MenubarContent>
        </Menubar.MenubarMenu>
      </Menubar.Menubar>
    ),
  ],
  ['Message', 'Communication', 'message', MessageStudy],
  [
    'Message Scroller',
    'Communication',
    'message-scroller',
    () => (
      <div className="h-64">
        <Scroller.MessageScrollerProvider>
          <Scroller.MessageScroller>
            <Scroller.MessageScrollerViewport aria-label="Message history">
              <Scroller.MessageScrollerContent>
                {Array.from({ length: 8 }, (_, i) => (
                  <Scroller.MessageScrollerItem key={i}>
                    <MessageStudy />
                  </Scroller.MessageScrollerItem>
                ))}
              </Scroller.MessageScrollerContent>
            </Scroller.MessageScrollerViewport>
            <Scroller.MessageScrollerButton />
          </Scroller.MessageScroller>
        </Scroller.MessageScrollerProvider>
      </div>
    ),
  ],
  [
    'Native Select',
    'Forms',
    'native-select',
    () => (
      <Native.NativeSelect aria-label="Workspace visibility">
        <Native.NativeSelectOption>Private</Native.NativeSelectOption>
        <Native.NativeSelectOption>Team</Native.NativeSelectOption>
        <Native.NativeSelectOption>Public</Native.NativeSelectOption>
      </Native.NativeSelect>
    ),
  ],
  [
    'Navigation Menu',
    'Navigation',
    'navigation-menu',
    () => (
      <Nav.NavigationMenu>
        <Nav.NavigationMenuList>
          <Nav.NavigationMenuItem>
            <Nav.NavigationMenuTrigger>Resources</Nav.NavigationMenuTrigger>
            <Nav.NavigationMenuContent className="p-5">
              <Nav.NavigationMenuLink href="https://ui.shadcn.com/docs" target="_blank">
                Official shadcn documentation
              </Nav.NavigationMenuLink>
            </Nav.NavigationMenuContent>
          </Nav.NavigationMenuItem>
          <Nav.NavigationMenuItem>
            <Nav.NavigationMenuLink href="#Button">Components</Nav.NavigationMenuLink>
          </Nav.NavigationMenuItem>
        </Nav.NavigationMenuList>
      </Nav.NavigationMenu>
    ),
  ],
  ['Pagination', 'Navigation', 'pagination', PaginationStudy],
  [
    'Popover',
    'Overlay',
    'popover',
    () => (
      <Popover.Popover>
        <Popover.PopoverTrigger asChild>
          <Button variant="outline">Display preferences</Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent>
          <div className="space-y-4">
            <Label className="flex items-center justify-between gap-4">
              Show descriptions
              <Switch defaultChecked />
            </Label>
            <Label className="flex items-center justify-between gap-4">
              Compact rows
              <Switch />
            </Label>
          </div>
        </Popover.PopoverContent>
      </Popover.Popover>
    ),
  ],
  ['Progress', 'Feedback', 'progress', ProgressStudy],
  ['Questionnaire', 'Forms', 'questionnaire', QuestionnaireStudy],
  [
    'Radio Group',
    'Forms',
    'radio-group',
    () => (
      <Radio.RadioGroup defaultValue="balanced" aria-label="Layout density">
        {['Comfortable', 'Balanced', 'Compact'].map((name) => (
          <Label key={name} className="flex gap-3">
            <Radio.RadioGroupItem value={name.toLowerCase()} />
            {name}
          </Label>
        ))}
      </Radio.RadioGroup>
    ),
  ],
  [
    'Resizable',
    'Layout',
    'resizable',
    () => (
      <Resize.ResizablePanelGroup orientation="horizontal" className="min-h-40 rounded border">
        <Resize.ResizablePanel defaultSize="35%">
          <div className="p-5 text-sm">Outline</div>
        </Resize.ResizablePanel>
        <Resize.ResizableHandle withHandle />
        <Resize.ResizablePanel>
          <div className="p-5 text-sm">Working canvas</div>
        </Resize.ResizablePanel>
      </Resize.ResizablePanelGroup>
    ),
  ],
  [
    'Scroll Area',
    'Layout',
    'scroll-area',
    () => (
      <ScrollArea
        className="h-52 rounded border p-5"
        aria-label="Reference collection"
        tabIndex={0}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <div className="border-b py-3 text-sm" key={i}>
            {String(i + 1).padStart(2, '0')} / Reference study
          </div>
        ))}
      </ScrollArea>
    ),
  ],
  ['Select', 'Forms', 'select', SelectStudy],
  [
    'Separator',
    'Layout',
    'separator',
    () => (
      <div className="space-y-4">
        <p className="text-sm">Structural divisions</p>
        <Separator />
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
        </div>
      </div>
    ),
  ],
  [
    'Sheet',
    'Overlay',
    'sheet',
    () => (
      <Sheet.Sheet>
        <Sheet.SheetTrigger asChild>
          <Button>Open project details</Button>
        </Sheet.SheetTrigger>
        <Sheet.SheetContent>
          <Sheet.SheetHeader>
            <Sheet.SheetTitle>Project details</Sheet.SheetTitle>
            <Sheet.SheetDescription>
              Contextual settings without losing your place.
            </Sheet.SheetDescription>
          </Sheet.SheetHeader>
          <div className="space-y-3 p-4">
            <Label htmlFor="sheet-name">Project name</Label>
            <Input id="sheet-name" defaultValue="Exploration 001" />
          </div>
        </Sheet.SheetContent>
      </Sheet.Sheet>
    ),
  ],
  ['Sidebar', 'Navigation', 'sidebar', SidebarStudy],
  [
    'Skeleton',
    'Feedback',
    'skeleton',
    () => (
      <div className="space-y-4" role="status" aria-label="Loading preview">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <span className="text-xs text-muted-foreground">Loading-state specimen</span>
      </div>
    ),
  ],
  ['Slider', 'Forms', 'slider', SliderStudy],
  [
    'Spinner',
    'Feedback',
    'spinner',
    () => (
      <div className="flex items-center gap-3">
        <Spinner />
        <span className="text-sm">Loading-state specimen</span>
      </div>
    ),
  ],
  [
    'Switch',
    'Forms',
    'switch',
    () => (
      <Label className="flex items-center gap-4">
        <Switch defaultChecked />
        Enable notifications
      </Label>
    ),
  ],
  ['Table', 'Data', 'table', TableStudy],
  [
    'Tabs',
    'Navigation',
    'tabs',
    () => (
      <Tabs.Tabs defaultValue="overview">
        <Tabs.TabsList>
          <Tabs.TabsTrigger value="overview">Overview</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="activity">Activity</Tabs.TabsTrigger>
        </Tabs.TabsList>
        <Tabs.TabsContent value="overview" className="p-4 text-sm">
          Your workspace overview.
        </Tabs.TabsContent>
        <Tabs.TabsContent value="activity" className="p-4 text-sm">
          No activity yet. Create a project to begin.
        </Tabs.TabsContent>
      </Tabs.Tabs>
    ),
  ],
  ['Textarea', 'Forms', 'textarea', TextareaStudy],
  [
    'Toast',
    'Feedback',
    'sonner',
    () => (
      <Button onClick={() => toast.success('Exploration saved. Local notification preview.')}>
        Preview notification
      </Button>
    ),
  ],
  [
    'Toggle',
    'Actions',
    'toggle',
    () => (
      <Toggle aria-label="Save to favorites">
        <Heart />
        Favorite
      </Toggle>
    ),
  ],
  [
    'Toggle Group',
    'Actions',
    'toggle-group',
    () => (
      <ToggleGroup.ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
        {['Left', 'Center', 'Right'].map((name) => (
          <ToggleGroup.ToggleGroupItem
            key={name}
            value={name.toLowerCase()}
            aria-label={name + ' alignment'}
          >
            <Menu />
            {name}
          </ToggleGroup.ToggleGroupItem>
        ))}
      </ToggleGroup.ToggleGroup>
    ),
  ],
  [
    'Tooltip',
    'Overlay',
    'tooltip',
    () => (
      <Tooltip.Tooltip>
        <Tooltip.TooltipTrigger asChild>
          <Button variant="outline" aria-label="Export exploration">
            <Download />
          </Button>
        </Tooltip.TooltipTrigger>
        <Tooltip.TooltipContent>Export exploration</Tooltip.TooltipContent>
      </Tooltip.Tooltip>
    ),
  ],
  ['Trace', 'Data', 'trace', TraceStudy],
  [
    'Typography',
    'Foundations',
    'typography',
    () => (
      <div className="space-y-4">
        <p className="font-mono text-xs text-muted-foreground">DISPLAY / INTERFACE / DATA</p>
        <h2 className="text-4xl leading-none">Make room for ideas.</h2>
        <p className="text-sm text-muted-foreground">
          Clarity starts with the words and grows through hierarchy.
        </p>
        <code className="text-xs">SC-001 · 0123456789</code>
      </div>
    ),
  ],
  [
    'Iconography',
    'Foundations',
    'icons',
    () => (
      <div className="grid grid-cols-4 gap-4">
        {[
          Plus,
          Layers,
          LayoutGrid,
          FileText,
          Folder,
          Search,
          Check,
          Settings,
          Heart,
          Download,
          Copy,
          Sparkles,
        ].map((Icon, i) => (
          <div key={i} className="flex items-center justify-center rounded-lg border bg-muted p-4">
            <Icon className="size-6" aria-hidden="true" />
          </div>
        ))}
      </div>
    ),
  ],
  ['Form', 'Forms', 'field', FormStudy],
];
export const uiDemos: Demo[] = definitions.map(([name, group, module, Component]) => ({
  name,
  group,
  Component,
  description: `${name} built from shadcn/ui, adapted through the active design foundation.`,
  source:
    module === 'icons'
      ? 'https://lucide.dev'
      : module === 'typography'
        ? 'https://ui.shadcn.com/docs/components/typography'
        : `https://ui.shadcn.com/docs/components/${module}`,
  usage:
    module === 'typography'
      ? '<h2 className="text-4xl">Make room for ideas.</h2>'
      : module === 'icons'
        ? 'import { Layers } from "lucide-react"\n\n<Layers aria-hidden="true" />'
        : `// Component exports and typed props are in packages/react/src/ui/${module}.tsx\nimport * as UI from "@inverse_ratio/design-system/ui/${module}"\n\n// Compose UI primitives as shown in this example.\n// Copy the full working composition from apps/react-library/src/ui-demos.tsx.`,
}));
