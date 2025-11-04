import { useCallback, useState } from 'react';
import Hero3D from './components/Hero3D';
import DiagramPrompt from './components/DiagramPrompt';
import MermaidPreview from './components/MermaidPreview';
import ExamplesSidebar from './components/ExamplesSidebar';
import { Github } from 'lucide-react';

function App() {
  const [result, setResult] = useState({ mermaid: '', diagram_type: '', title: '' });
  const [error, setError] = useState(null);
  const [seedPrompt, setSeedPrompt] = useState('');

  const handleResult = useCallback((data) => {
    setResult({ mermaid: data.mermaid, diagram_type: data.diagram_type, title: data.title });
  }, []);

  const handleUseExample = useCallback((p) => {
    setSeedPrompt(p);
    setTimeout(() => {
      const el = document.querySelector('textarea');
      if (el) {
        el.focus();
        el.selectionStart = el.value.length;
        el.selectionEnd = el.value.length;
      }
    }, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0b0b14] text-white">
      <Hero3D />

      <main className="mx-auto -mt-14 grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <DiagramPrompt onResult={handleResult} onError={setError} initialPrompt={seedPrompt} />
            {error ? (
              <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>
            ) : null}
          </div>

          <MermaidPreview mermaidCode={result.mermaid} title={result.title} diagramType={result.diagram_type} />
        </div>

        <div className="space-y-4">
          <ExamplesSidebar onUse={handleUseExample} />
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 p-4">
            <div className="text-sm text-zinc-300">
              This AI uses smart templates to turn your natural language into Mermaid syntax.
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-zinc-400">
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <span className="text-xs">Built with FastAPI + React + Mermaid</span>
          <a className="inline-flex items-center gap-2 text-xs hover:text-white" href="#" aria-label="GitHub">
            <Github className="h-4 w-4" />
            Star the project
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
