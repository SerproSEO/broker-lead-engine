&nbsp; # Hook Configuration



&nbsp; ## Task Completion Sound Hook

&nbsp; ```yaml

&nbsp; hooks:

&nbsp;   task\_completion:

&nbsp;     trigger: "todo\_completed"

&nbsp;     command: "powershell -c (New-Object Media.SoundPlayer 'C:\\\\Windows\\\\Media\\\\chimes.wav').PlaySync()"

&nbsp;     description: "Play sound when Claude completes a task"

- memory
- memory