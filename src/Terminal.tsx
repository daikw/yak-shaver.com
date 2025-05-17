import ReactConsole from 'react-console-emulator';
import './terminal.css';

const commands = {
  help: {
    description: 'List available commands',
    usage: 'help',
    fn: () => 'Available commands: ls, help, owner',
  },
  ls: {
    description: 'List site files',
    usage: 'ls',
    fn: () => 'index.html  about.html',
  },
  owner: {
    description: 'Show site owner',
    usage: 'owner',
    fn: () => 'This site is owned by Yak Shaver.',
  },
};

export default function Terminal() {
  return (
    <div className="terminal-container">
      <ReactConsole
        commands={commands}
        promptLabel="$"
        autoFocus
      />
    </div>
  );
}
