import * as vscode from 'vscode';
import * as path from 'path';

const MENU_ITEMS = [
  { label: '● Magic time machine (reflog)', file: 'reflog.md' },
  { label: '● Amend last commit', file: 'amend.md' },
  { label: '● Change commit message', file: 'amend-msg.md' },
  { label: '● Commit should be on new branch', file: 'new-branch.md' },
  { label: '● Committed to wrong branch', file: 'wrong-branch.md' },
  { label: '● Diff shows nothing', file: 'diff-empty.md' },
  { label: '● Revert older commit', file: 'revert-old.md' },
  { label: '● Undo file changes', file: 'undo-file.md' },
  { label: '● Fuck this noise', file: 'fuck-this.md' }
];




const COMMANDS = [
  { command: 'ohShitGit.reflog',       title: 'Oh Shit Git: Magic time machine',          file: 'reflog.md' },
  { command: 'ohShitGit.amend',        title: 'Oh Shit Git: Amend last commit',            file: 'amend.md' },
  { command: 'ohShitGit.amendMsg',     title: 'Oh Shit Git: Change commit message',        file: 'amend-msg.md' },
  { command: 'ohShitGit.newBranch',    title: 'Oh Shit Git: Commit should be on new branch', file: 'new-branch.md' },
  { command: 'ohShitGit.wrongBranch',  title: 'Oh Shit Git: Committed to wrong branch',     file: 'wrong-branch.md' },
  { command: 'ohShitGit.diffEmpty',    title: 'Oh Shit Git: Diff shows nothing',           file: 'diff-empty.md' },
  { command: 'ohShitGit.revertOld',    title: 'Oh Shit Git: Revert older commit',          file: 'revert-old.md' },
  { command: 'ohShitGit.undoFile',     title: 'Oh Shit Git: Undo file changes',            file: 'undo-file.md' },
  { command: 'ohShitGit.fuckThis',     title: 'Oh Shit Git: Fuck this noise',              file: 'fuck-this.md' },
];



export function activate(context: vscode.ExtensionContext) {
  // 注册 TreeView 提供者
  const provider = new MarkdownTreeProvider(context);
  vscode.window.registerTreeDataProvider('ohShitGitView', provider);
  for (const { command, file } of COMMANDS) {
    context.subscriptions.push(
      vscode.commands.registerCommand(command, () => openMarkdown(context, file))
    );
  }
  // 注册命令面板用的下拉列表
  context.subscriptions.push(
    vscode.commands.registerCommand('ohShitGit.showQuickList', async () => {
      const picked = await vscode.window.showQuickPick(
        MENU_ITEMS.map(i => i.label),
        { placeHolder: 'Select a Git problem...' }
      );
      const target = MENU_ITEMS.find(i => i.label === picked);
      if (target) {
        openMarkdown(context, target.file);
      }
    }),
    
  );

  // 注册点击 tree item 后的处理
  context.subscriptions.push(
    vscode.commands.registerCommand('ohShitGit.openMarkdown', (file: string) => {
      openMarkdown(context, file);
    })
  );
}

function openMarkdown(context: vscode.ExtensionContext, filename: string) {
  const fullPath = vscode.Uri.joinPath(context.extensionUri, 'content', filename);
  vscode.workspace.openTextDocument(fullPath).then((doc: vscode.TextDocument) => {
    vscode.window.showTextDocument(doc, { preview: true });
    vscode.commands.executeCommand('markdown.showPreviewToSide', fullPath);
    vscode.commands.executeCommand('markdown.openPreviewToSide', fullPath);
  });
}


class MarkdownTreeProvider implements vscode.TreeDataProvider<MarkdownItem> {
  constructor(private context: vscode.ExtensionContext) {}

  getTreeItem(element: MarkdownItem): vscode.TreeItem {
    return element;
  }

  getChildren(): MarkdownItem[] {
    return MENU_ITEMS.map(i => {
      const item = new MarkdownItem(i.label, vscode.TreeItemCollapsibleState.None, {
        command: 'ohShitGit.openMarkdown',
        title: i.label,
        arguments: [i.file]
      });
      return item;
    });
  }
}

class MarkdownItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}

export function deactivate() {}
