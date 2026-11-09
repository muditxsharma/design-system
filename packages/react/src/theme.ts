import source from '../../foundations/themes.json';

export type DesignSystem = 'forma' | 'minimal' | 'nocturne' | 'brutalism';
export type DesignMode = 'light' | 'dark';
export type ThemeSelection = {
  system: DesignSystem;
  mode: DesignMode;
  accent?: number;
};

/** Registry order: background, card, foreground, muted text, rule, signal, signal text, wash. */
export type ExpressionColors = [string, string, string, string, string, string, string, string];
export type AccentColors = [string, string, string, string];
export type AccentFamily = [string, string, AccentColors, AccentColors];
export type DesignDefinition = {
  name: string;
  description: string;
  font: string;
  display: string;
  mono: string;
  radius: string;
  light: ExpressionColors;
  dark: ExpressionColors;
  expressions: [string, string];
  source: string;
  principles: string;
  componentCharacter: string;
};
type ThemeRegistry = {
  themes: Record<DesignSystem, DesignDefinition>;
  accentFamilies: Record<Exclude<DesignSystem, 'forma'>, AccentFamily[]>;
};

// The distribution build embeds this JSON; consumers never need the sibling workspace.
const registry = source as unknown as ThemeRegistry;
export const designSystems = registry.themes;
export const accentFamilies = registry.accentFamilies;

/** Resolve semantic variables without accessing the DOM; safe in server-side code. */
export function getThemeVariables({
  system,
  mode,
  accent = 0,
}: ThemeSelection): Record<string, string> {
  if (!Object.hasOwn(designSystems, system)) {
    throw new RangeError(`Unknown design system: ${system}`);
  }
  if (mode !== 'light' && mode !== 'dark') {
    throw new RangeError(`Unknown expression mode: ${mode}`);
  }
  if (!Number.isInteger(accent) || accent < 0) {
    throw new RangeError('Accent must be a non-negative integer.');
  }

  const theme = designSystems[system];
  const colors: ExpressionColors = [...theme[mode]];
  const families = system === 'forma' ? null : accentFamilies[system];

  if (families) {
    const selected = families[accent];
    if (!selected) throw new RangeError(`Unknown accent ${accent} for ${system}.`);
    const [signal, signalForeground, border, wash] = selected[mode === 'dark' ? 3 : 2];
    colors[5] = signal;
    colors[6] = signalForeground;
    colors[4] = border;
    colors[7] = wash;
  } else if (accent !== 0) {
    throw new RangeError('Forma currently supports accent index 0 only.');
  }

  const [background, card, foreground, mutedForeground, border, signal, signalForeground, muted] =
    colors;
  const inkAction = system === 'forma' && mode === 'light';
  const primary = inkAction ? foreground : signal;
  const primaryForeground = inkAction ? card : signalForeground;

  return {
    '--background': background,
    '--foreground': foreground,
    '--card': card,
    '--card-foreground': foreground,
    '--popover': card,
    '--popover-foreground': foreground,
    '--primary': primary,
    '--primary-foreground': primaryForeground,
    '--secondary': muted,
    '--secondary-foreground': foreground,
    '--muted': muted,
    '--muted-foreground': mutedForeground,
    '--accent': muted,
    '--accent-foreground': foreground,
    '--signal': signal,
    '--signal-foreground': signalForeground,
    '--border': border,
    '--input': border,
    '--ring': signal,
    '--radius': theme.radius,
    '--font-sans': theme.font,
    '--font-display': theme.display,
    '--font-mono': theme.mono,
    '--destructive': mode === 'dark' ? '#f5939b' : '#b62e42',
    '--success': mode === 'dark' ? '#8fcbb7' : '#216f59',
    '--warning': mode === 'dark' ? '#e0c078' : '#865d13',
    '--info': mode === 'dark' ? '#a6c9fb' : '#3972c3',
    '--chart-1': signal,
    '--chart-2': mutedForeground,
    '--chart-3': foreground,
    '--chart-4': border,
    '--chart-5': muted,
    '--sidebar': card,
    '--sidebar-foreground': foreground,
    '--sidebar-primary': primary,
    '--sidebar-primary-foreground': primaryForeground,
    '--sidebar-accent': muted,
    '--sidebar-accent-foreground': foreground,
    '--sidebar-border': border,
    '--sidebar-ring': signal,
  };
}

/** Use the document root for a single application-wide theme, including portals. */
export function applyReactTheme(selection: ThemeSelection, root?: HTMLElement): void {
  const variables = getThemeVariables(selection);
  const target = root ?? (typeof document === 'undefined' ? undefined : document.documentElement);
  if (!target) {
    throw new Error(
      'applyReactTheme requires a browser root; use getThemeVariables on the server.',
    );
  }

  target.dataset.system = selection.system;
  target.dataset.mode = selection.mode;
  target.classList.add('design-theme');
  target.classList.toggle('dark', selection.mode === 'dark');
  for (const [property, value] of Object.entries(variables)) {
    target.style.setProperty(property, value);
  }
}
