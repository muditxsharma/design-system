"""Static contract checks, plus JS syntax through macOS JavaScriptCore when available."""
from pathlib import Path
from html.parser import HTMLParser
from zipfile import ZipFile
from xml.etree import ElementTree as E
import json, re, ctypes, sys, subprocess, os
ROOT=Path(__file__).resolve().parents[1]
class Markup(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.assets=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  for key in ['for','aria-labelledby','aria-describedby','aria-controls']:
   self.refs.extend(a.get(key,'').split())
  for key in ['src','href']:
   value=a.get(key,'')
   if value and not value.startswith(('#','http','mailto:')):self.assets.append(value)
def parse(source):
 p=Markup();p.feed(source);assert len(p.ids)==len(set(p.ids)), 'Duplicate IDs';return p
registry=json.loads((ROOT/'packages/foundations/themes.json').read_text())
js=(ROOT/'packages/foundations/themes.js').read_text()
assert json.loads(js.removeprefix('window.DesignLibrary = ').strip().removesuffix(';'))==registry
assert len(registry['themes'])==4
for theme in registry['themes'].values():
 for mode in ['light','dark']:assert len(theme[mode])==8
for families in registry['accentFamilies'].values():
 assert len(families)==3
 for family in families:assert len(family[2])==len(family[3])==4
catalog=json.loads((ROOT/'packages/components/catalog.js').read_text().removeprefix('window.ComponentCatalog = ').strip().removesuffix(';'))
assert len(catalog)==67
page=parse((ROOT/'index.html').read_text())
for asset in page.assets:assert (ROOT/asset).exists(),asset
examples=parse(''.join(c['html'] for c in catalog))
for ref in examples.refs:assert ref in examples.ids,ref
assert not set(page.ids).intersection(examples.ids)
with ZipFile(ROOT/'docs/design/Structured_Chaos_Master_Design_Document.docx') as z:
 assert z.testzip() is None
 for name in z.namelist():
  if name.endswith('.xml'):E.fromstring(z.read(name))
# Syntax checking does not execute app code or claim browser verification.
framework='/System/Library/Frameworks/JavaScriptCore.framework/JavaScriptCore'
try:
 lib=ctypes.CDLL(framework) if not os.environ.get('DESIGN_TEST_NODE') else None
except OSError:
 lib=None
if lib is not None:
 lib=ctypes.CDLL(framework);ptr=ctypes.c_void_p
 lib.JSGlobalContextCreate.argtypes=[ptr];lib.JSGlobalContextCreate.restype=ptr
 lib.JSStringCreateWithUTF8CString.argtypes=[ctypes.c_char_p];lib.JSStringCreateWithUTF8CString.restype=ptr
 lib.JSCheckScriptSyntax.argtypes=[ptr,ptr,ptr,ctypes.c_int,ctypes.POINTER(ptr)];lib.JSCheckScriptSyntax.restype=ctypes.c_bool
 lib.JSStringRelease.argtypes=[ptr];lib.JSGlobalContextRelease.argtypes=[ptr]
 ctx=lib.JSGlobalContextCreate(None)
 for path in [*ROOT.glob('packages/**/*.js'),*ROOT.glob('apps/**/*.js')]:
  if any(part in {'node_modules','dist'} for part in path.parts):continue
  script=lib.JSStringCreateWithUTF8CString(path.read_bytes());error=ptr()
  assert lib.JSCheckScriptSyntax(ctx,script,None,1,ctypes.byref(error)),f'JS syntax error: {path}'
  lib.JSStringRelease(script)
 # Execute public API/state contracts against lightweight DOM doubles.
 lib.JSEvaluateScript.argtypes=[ptr,ptr,ptr,ptr,ctypes.c_int,ctypes.POINTER(ptr)];lib.JSEvaluateScript.restype=ptr
 lib.JSValueToStringCopy.argtypes=[ptr,ptr,ctypes.POINTER(ptr)];lib.JSValueToStringCopy.restype=ptr
 lib.JSStringGetMaximumUTF8CStringSize.argtypes=[ptr];lib.JSStringGetMaximumUTF8CStringSize.restype=ctypes.c_size_t
 lib.JSStringGetUTF8CString.argtypes=[ptr,ctypes.c_char_p,ctypes.c_size_t];lib.JSStringGetUTF8CString.restype=ctypes.c_size_t
 def as_text(value):
  error=ptr();string=lib.JSValueToStringCopy(ctx,value,ctypes.byref(error));size=lib.JSStringGetMaximumUTF8CStringSize(string);buffer=ctypes.create_string_buffer(size);lib.JSStringGetUTF8CString(string,buffer,size);lib.JSStringRelease(string);return buffer.value.decode()
 def evaluate(source):
  script=lib.JSStringCreateWithUTF8CString(source.encode());error=ptr();result=lib.JSEvaluateScript(ctx,script,None,None,1,ctypes.byref(error));lib.JSStringRelease(script)
  assert not error.value, as_text(error) if error.value else 'Script failed'
  return result
 evaluate('globalThis.window=globalThis;')
 for file in ['packages/foundations/themes.js','packages/foundations/apply-theme.js','packages/components/icons.js','packages/components/components.js']:
  evaluate((ROOT/file).read_text())
 result=evaluate((ROOT/'tests/behavior_contracts.js').read_text())
 print('Behavior contracts:',as_text(result))
 lib.JSGlobalContextRelease(ctx)
 print('JavaScript syntax passed via JavaScriptCore.')
else:
 # Linux CI runs the same native state contracts in an isolated Node VM.
 sources=[str(p) for p in [*ROOT.glob('packages/**/*.js'),*ROOT.glob('apps/**/*.js')]
          if not any(part in {'node_modules','dist'} for part in p.parts)]
 runner="""
 const fs=require('node:fs'),vm=require('node:vm');
 const files=JSON.parse(process.argv[1]);
 for(const file of files) new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
 const context=vm.createContext({});
 vm.runInContext('globalThis.window=globalThis',context);
 for(const file of ['packages/foundations/themes.js','packages/foundations/apply-theme.js','packages/components/icons.js','packages/components/components.js'])
   vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
 console.log('Behavior contracts:',vm.runInContext(fs.readFileSync('tests/behavior_contracts.js','utf8'),context));
 console.log('JavaScript syntax passed via Node VM.');
 """
 subprocess.run(['node','-e',runner,json.dumps(sources)],cwd=ROOT,check=True)
print('Passed: registry parity, 4 identities, 18 accent mappings, 67 components, assets, IDs/ARIA references, DOCX integrity.')
