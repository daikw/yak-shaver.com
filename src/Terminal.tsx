import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './terminal.css';

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = new XTerm({
      cursorBlink: true,
      theme: { background: '#000000', foreground: '#0f0' },
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    if (containerRef.current) {
      term.open(containerRef.current);
      fitAddon.fit();
    }

    let command = '';
    const prompt = () => {
      term.write('\r\n$ ');
    };

    const executeCommand = (cmd: string) => {
      switch (cmd) {
        case 'help':
          term.writeln('Available commands: ls, help, owner, version');
          break;
        case 'ls':
          term.writeln('index.html  about.html');
          break;
        case 'owner':
          term.writeln('This site is owned by Yak Shaver.');
          break;
        case 'version':
          term.writeln('yak-shaver.com v1.0.0');
          break;
        case '':
          break;
        default:
          term.writeln(`Unknown command: ${cmd}`);
      }
    };

    prompt();

    term.onData((data) => {
      const code = data.charCodeAt(0);
      if (code === 13) {
        executeCommand(command.trim());
        command = '';
        prompt();
      } else if (code === 127) {
        if (command.length > 0) {
          command = command.slice(0, -1);
          term.write('\b \b');
        }
      } else {
        command += data;
        term.write(data);
      }
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  return <div className="terminal-container" ref={containerRef}></div>;
}
