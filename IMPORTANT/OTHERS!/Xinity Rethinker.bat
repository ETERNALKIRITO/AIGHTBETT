@echo off
chcp 65001 >nul
color 0A

:menu
cls
echo ===================================================
echo                 System Utility Launcher
echo ===================================================
echo 1. Storage Settings
echo 2. Command Prompt
echo 3. Task Manager
echo 4. Registry Editor
echo 5. Control Panel
echo 6. Event Viewer
echo 7. Device Manager
echo 8. Services Manager
echo 9. PowerShell
echo 10. Computer Management
echo 11. Clear Screen
echo 12. Change Color Scheme
echo 13. Wi-Fi Password Revealer
echo 14. User Account Manager
echo 15. System Information Viewer
echo 16. Password Guesser
echo 17. Disk Management
echo 18. Remote Desktop Create/Add
echo 19. Others Menu
echo 20. Quick Folder Access
echo 21. Restart Script
echo 22. Exit
echo ===================================================
set /p "choice=Please enter your choice (1-22): "

if "%choice%"=="1" (
    start ms-settings:storagesense
    goto menu
)
if "%choice%"=="2" (
    start cmd
    goto menu
)
if "%choice%"=="3" (
    start taskmgr
    goto menu
)
if "%choice%"=="4" (
    start regedit
    goto menu
)
if "%choice%"=="5" (
    start control
    goto menu
)
if "%choice%"=="6" (
    start eventvwr
    goto menu
)
if "%choice%"=="7" (
    start devmgmt.msc
    goto menu
)
if "%choice%"=="8" (
    start services.msc
    goto menu
)
if "%choice%"=="9" (
    start powershell
    goto menu
)
if "%choice%"=="10" (
    start compmgmt.msc
    goto menu
)
if "%choice%"=="11" (
    cls
    echo Screen cleared! Press any key to return to the menu...
    pause >nul
    goto menu
)
if "%choice%"=="12" (
    goto color_change
)
if "%choice%"=="13" (
    goto wifi_revealer
)
if "%choice%"=="14" (
    goto user_management
)
if "%choice%"=="15" (
    goto system_info
)
if "%choice%"=="16" (
    goto password_guesser
)
if "%choice%"=="17" (
    start diskmgmt.msc
    goto menu
)
if "%choice%"=="18" (
    goto remote_desktop_utility
)
if "%choice%"=="19" (
    goto others_menu
)
if "%choice%"=="20" (
    goto folder_shortcuts_menu
)
if "%choice%"=="21" (
    goto restart_script
)
if "%choice%"=="22" (
    exit /b 0
)

echo Invalid choice, please try again.
pause
goto menu

:folder_shortcuts_menu
cls
echo ===================================================
echo                Quick Folder Access
echo ===================================================
echo 1. System32 (%WINDIR%\System32)
echo 2. Startup Folder (shell:startup)
echo 3. Temporary Files (%TEMP%)
echo 4. Applications Folder (shell:AppsFolder)
echo 5. VSCode Extensions (%USERPROFILE%\.vscode\extensions)
echo 6. AppData Local (%LOCALAPPDATA%)
echo 7. Chrome Extensions (%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions)
echo 8. Pico-8 AppData (%APPDATA%\pico-8)
echo 9. AppData LocalLow (%USERPROFILE%\AppData\LocalLow)
echo 10. AppData Roaming (%APPDATA%)
echo 11. AppData Main Folder (%USERPROFILE%\AppData)
echo 12. Back to Main Menu
echo ===================================================
set /p "folder_choice=Please enter your choice (1-12): "

if "%folder_choice%"=="1" (
    start "" "%WINDIR%\System32"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="2" (
    start shell:startup
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="3" (
    start "" "%TEMP%"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="4" (
    start shell:AppsFolder
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="5" (
    start "" "%USERPROFILE%\.vscode\extensions"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="6" (
    start "" "%LOCALAPPDATA%"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="7" (
    start "" "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="8" (
    start "" "%APPDATA%\pico-8"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="9" (
    start "" "%USERPROFILE%\AppData\LocalLow"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="10" (
    start "" "%APPDATA%"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="11" (
    start "" "%USERPROFILE%\AppData"
    goto folder_shortcuts_menu
)
if "%folder_choice%"=="12" (
    goto menu
)
echo Invalid choice, please try again.
pause >nul
goto folder_shortcuts_menu

:others_menu
cls
echo ===================================================
echo                      Others Menu
echo ===================================================
echo 1. On-Screen Keyboard
echo 2. Simple Reminder Notification
echo 3. Shutdown Timer
echo 4. Private Character Editor
echo 5. Character Map
echo 6. Dialer
echo 7. Go Back To Main Menu (Typo, likely intended as Main Menu)
echo 8. Other Info
echo 9. Create A Shared Folder Wizard
echo 10. Windows Fax And Scan
echo 11. Remote Shutdown Dialog
echo 12. Calculator
echo 13. Direct Exit
echo 14. Return to Main Menu
echo ===================================================
set /p "others_choice=Please enter your choice (1-14): "

if "%others_choice%"=="1" (
    start osk
    goto others_menu
)
if "%others_choice%"=="2" (
    goto reminder_notification
)
if "%others_choice%"=="3" (
    goto shutdown_timer
)
if "%others_choice%"=="4" (
    start eudcedit
    goto others_menu
)
if "%others_choice%"=="5" (
    start charmap
    goto others_menu
)
if "%others_choice%"=="6" (
    start dialer
    goto others_menu
)
if "%others_choice%"=="7" (
    goto menu
)
if "%others_choice%"=="8" (
    cls
    echo Current IPv4 Address:
    ipconfig | findstr /R /C:"IPv4 Address"
    echo.
    echo Hostname: %COMPUTERNAME%
    echo Username: %USERNAME%
    echo.
    pause
    goto others_menu
)
if "%others_choice%"=="9" (
    start shrpubw
    goto others_menu
)
if "%others_choice%"=="10" (
    start WFS
    goto others_menu
)
if "%others_choice%"=="11" (
    shutdown -i
    goto others_menu
)
if "%others_choice%"=="12" (
    start calc
    goto others_menu
)
if "%others_choice%"=="13" (
    exit /b 0
)
if "%others_choice%"=="14" (
    goto menu
)

echo Invalid choice, please try again.
pause
goto others_menu

:restart_script
cls
echo Restarting the script...
timeout /t 1 /nobreak >nul
start "" "%~f0"
exit /b 0

REM --- Placeholders for Missing Functionality ---
:color_change
cls
echo ===================================================
echo                 Change Color Scheme
echo ===================================================
echo Example: 0A (Black Background, Light Green Text)
echo Example: 1E (Blue Background, Yellow Text)
echo See 'color /?' for more options.
echo.
set /p "new_color=Enter new color code (e.g., 0A): "
if not defined new_color (
    echo No color entered. Returning to menu.
    pause
    goto menu
)
color %new_color%
echo Color changed.
pause >nul
goto menu

:wifi_revealer
cls
echo ===================================================
echo              Wi-Fi Password Revealer
echo ===================================================
echo This feature will list known Wi-Fi networks and allow you to view their passwords.
echo.
echo Listing known Wi-Fi profiles...
netsh wlan show profiles
echo.
set /p "wifi_name=Enter the Wi-Fi Network Name (SSID) to see its password: "
if not defined wifi_name (
    echo No network name entered.
    pause
    goto wifi_revealer
)
echo.
echo Showing password for "%wifi_name%":
netsh wlan show profile name="%wifi_name%" key=clear | findstr /C:"Key Content"
echo.
echo Note: You may need to run this script as Administrator to see passwords.
pause
goto menu

:user_management
cls
echo ===================================================
echo                 User Account Manager
echo ===================================================
echo 1. Open User Accounts (Control Panel)
echo 2. Open Local Users and Groups (lusrmgr.msc - not on Home editions)
echo 3. Back to Main Menu
echo.
set /p "um_choice=Enter your choice: "
if "%um_choice%"=="1" (
    control nusrmgr.cpl
    goto user_management
)
if "%um_choice%"=="2" (
    start lusrmgr.msc
    goto user_management
)
if "%um_choice%"=="3" (
    goto menu
)
echo Invalid choice.
pause
goto user_management

:system_info
cls
echo ===================================================
echo              System Information Viewer
echo ===================================================
echo Opening System Information...
start msinfo32
pause
goto menu

:password_guesser
cls
echo ===================================================
echo                  Password Guesser
echo ===================================================
echo WARNING: Attempting to guess passwords for accounts
echo you do not own is unethical and potentially illegal.
echo This feature is a placeholder.
echo.
echo If you mean tools for password recovery or auditing,
echo specialized software should be used.
echo.
pause
goto menu

:remote_desktop_utility
cls
echo ===================================================
echo            Remote Desktop Create/Add
echo ===================================================
echo 1. Open Remote Desktop Connection (mstsc)
echo 2. Open System Properties (Remote Tab)
echo 3. Back to Main Menu
echo.
set /p "rd_choice=Enter your choice: "
if "%rd_choice%"=="1" (
    start mstsc
    goto remote_desktop_utility
)
if "%rd_choice%"=="2" (
    control /name Microsoft.System /page pageRemote
    REM Alternatively: SystemPropertiesRemote.exe
    goto remote_desktop_utility
)
if "%rd_choice%"=="3" (
    goto menu
)
echo Invalid choice.
pause
goto remote_desktop_utility

:reminder_notification
cls
echo ===================================================
echo             Simple Reminder Notification
echo ===================================================
set /p "rem_time=Enter reminder time in seconds: "
set /p "rem_msg=Enter reminder message: "
if not defined rem_time ( set "rem_time=60" )
if not defined rem_msg ( set "rem_msg=Reminder!" )
echo.
echo Reminder set for %rem_time% seconds.
echo Message: %rem_msg%
echo.
echo You can continue using other options. The reminder will pop up.
timeout /t %rem_time% /nobreak >nul
msg * %rem_msg%
goto others_menu

:shutdown_timer
cls
echo ===================================================
echo                    Shutdown Timer
echo ===================================================
echo 1. Set Shutdown Timer
echo 2. Abort Shutdown
echo 3. Back to Others Menu
echo.
set /p "sd_choice=Enter your choice: "

if "%sd_choice%"=="1" (
    set /p "sd_time=Enter shutdown time in seconds (e.g., 3600 for 1 hour): "
    if not defined sd_time (
        echo No time entered.
        pause
        goto shutdown_timer
    )
    shutdown /s /t %sd_time%
    echo Shutdown scheduled in %sd_time% seconds.
    pause
    goto others_menu
)
if "%sd_choice%"=="2" (
    shutdown /a
    echo Shutdown aborted.
    pause
    goto others_menu
)
if "%sd_choice%"=="3" (
    goto others_menu
)
echo Invalid choice.
pause
goto shutdown_timer

REM Make sure the script doesn't fall through if an invalid GOTO occurs somehow
goto menu