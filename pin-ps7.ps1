# Create PowerShell 7 desktop shortcut and pin to taskbar
$shortcutPath = [Environment]::GetFolderPath("Desktop") + "\PowerShell 7.lnk"
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = "C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.1.0_x64__8wekyb3d8bbwe\pwsh.exe"
$Shortcut.Description = "PowerShell 7.6.1"
$Shortcut.WorkingDirectory = [Environment]::GetFolderPath("UserProfile")
$Shortcut.Save()
Write-Host "Desktop shortcut created: $shortcutPath"

# Pin to taskbar
$shell = New-Object -ComObject Shell.Application
$folder = $shell.Namespace([Environment]::GetFolderPath("Desktop"))
$item = $folder.ParseName("PowerShell 7.lnk")
if ($item) {
    $item.InvokeVerb("taskbarpin")
    Write-Host "Successfully pinned PowerShell 7 to taskbar"
} else {
    Write-Host "Error: Could not find shortcut file"
}
