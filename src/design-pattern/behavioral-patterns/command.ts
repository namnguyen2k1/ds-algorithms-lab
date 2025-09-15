interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private content: string = '';

  insert(text: string) {
    this.content += text;
  }

  delete(count: number): string {
    const deleted = this.content.slice(-count);
    this.content = this.content.slice(0, -count);
    return deleted;
  }

  replace(newText: string): string {
    const oldContent = this.content;
    this.content = newText;
    return oldContent;
  }

  getContent(): string {
    return this.content;
  }
}

class InsertCommand implements Command {
  constructor(private editor: TextEditor, private text: string) {}

  execute(): void {
    this.editor.insert(this.text);
  }

  undo(): void {
    this.editor.delete(this.text.length);
  }
}

class DeleteCommand implements Command {
  private deletedText: string = '';

  constructor(private editor: TextEditor, private count: number) {}

  execute(): void {
    this.deletedText = this.editor.delete(this.count);
  }

  undo(): void {
    this.editor.insert(this.deletedText);
  }
}

class ReplaceCommand implements Command {
  private oldContent: string = '';

  constructor(private editor: TextEditor, private newText: string) {}

  execute(): void {
    this.oldContent = this.editor.replace(this.newText);
  }

  undo(): void {
    this.editor.replace(this.oldContent);
  }
}

class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(command: Command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  undo() {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}

export function commandPlayground() {
  const editor = new TextEditor();
  const manager = new CommandManager();

  manager.executeCommand(new InsertCommand(editor, 'Hello '));
  manager.executeCommand(new InsertCommand(editor, 'World'));
  console.log('1:', editor.getContent());

  manager.executeCommand(new DeleteCommand(editor, 5));
  console.log('2:', editor.getContent());

  manager.undo();
  console.log('3 (Undo Delete):', editor.getContent());

  manager.executeCommand(new ReplaceCommand(editor, 'Hi there!'));
  console.log('4:', editor.getContent());

  manager.undo();
  console.log('5 (Undo Replace):', editor.getContent());
}
