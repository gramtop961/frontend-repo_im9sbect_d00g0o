import { useEffect, useMemo, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Copy, Check, AlertTriangle } from 'lucide-react';

mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });

export default function MermaidPreview({ mermaidCode = '', title, diagramType }) {
  const containerRef = useRef(null);
  const [copyOk, setCopyOk] = useState(false);
  const [renderError, setRenderError] = useState(null);

  const code = useMemo(() => mermaidCode?.trim() || '', [mermaidCode]);

  useEffect(() => {
    let canceled = false;
    async function render() {
      if (!containerRef.current) return;
      containerRef.current.innerHTML = '';
      setRenderError(null);
      if (!code) return;
      try {
        const id = 'mmd-' + Math.random().toString(36).slice(2);
        const { svg } = await mermaid.render(id, code);
        if (!canceled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error', err);
        setRenderError(err?.message || 'Render error');
      }
    }
    render();
    return () => {
      canceled = true;
    };
  }, [code]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyOk(true);
      setTimeout(() => setCopyOk(false), 1200);
    } catch {}
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-violet-300">{diagramType || 'Diagram'}</div>
          {title ? (
            <div className="text-sm font-medium text-zinc-200">{title}</div>
          ) : null}
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-100 hover:bg-white/10"
        >
          {copyOk ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          {copyOk ? 'Copied' : 'Copy code'}
        </button>
      </div>

      {renderError ? (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-red-200">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">{renderError}</span>
        </div>
      ) : null}

      <div className="relative overflow-auto rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-4">
        {!code ? (
          <div className="text-sm text-zinc-400">Generated diagram will appear here.</div>
        ) : (
          <div ref={containerRef} className="mermaid" />
        )}
      </div>

      {code ? (
        <pre className="mt-4 max-h-64 overflow-auto rounded-xl border border-white/10 bg-black/60 p-3 text-xs text-violet-200">
          {code}
        </pre>
      ) : null}
    </div>
  );
}
