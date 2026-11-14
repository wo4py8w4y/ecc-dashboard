# ECC Terminal themes

1. Extract this ZIP into a new folder. Keep the installer and JSON together.
2. Open PowerShell 7 in that folder.
3. Preview: .\Install-ECCWindowsTerminalThemes.ps1 -WhatIf
4. Install: .\Install-ECCWindowsTerminalThemes.ps1
5. Press Enter for darkest backgrounds, or n for supplied backgrounds.
6. Windows Terminal: Settings > Profiles > your profile > Appearance > Color scheme. Choose an ECC | scheme, then Save.

Unattended darkest: add -NonInteractive. Supplied backgrounds: add -ForceDarkestBackground:$false.
The installer prints the backup path before modifying settings. Rerun with the opposite option to change backgrounds later.
