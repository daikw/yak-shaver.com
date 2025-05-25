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
    let inDemo = true;
    const prompt = () => {
      term.write('\r\n> ');
    };

    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const typeText = async (text: string, delay = 50) => {
      for (const ch of text) {
        term.write(ch);
        await sleep(delay);
      }
    };

    const executeCommand = (cmd: string) => {
      switch (cmd) {
        case 'help':
          term.writeln('Available commands: ls, help, owner, version');
          break;
        case 'about':
          term.writeln('This is a demo terminal built with React and xterm.js.');
          break;
        case 'version':
          term.writeln('yak-shaver.com v1.0.0');
          break;
        case '':
          break;
        default:
          term.writeln(`Command not found: ${cmd}`);
      }
    };

    const runDemo = async () => {
      await typeText('Welcome to the Demo Terminal!\r\n');
      await sleep(500);
      term.write('> ');
      await typeText('help');
      await sleep(300);
      term.write('\r\n');
      executeCommand('help');
      prompt();
      inDemo = false;
    };

    void runDemo();

    term.onData((data) => {
      if (inDemo) return;
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
