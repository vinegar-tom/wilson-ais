# wilson-ais

These scripts were created to automate tasks for Wilson Library's "Access & Information Services" department. They are mostly used for stacks work.

## Installation

Installation depends on the type of script.

### Run on Google Form submission

Scripts that run upon the submission of a Google Form require an [Installable Trigger](https://developers.google.com/apps-script/guides/triggers/installable).

1. Edit Form
1. Enter associated "Script editor," from vertical ellipsis in top-right corner
1. Click "Triggers" (alarm clock icon on left side)
1. Add trigger with settings:
   * Choose which function to run = "onFormSubmit" (or name of function, if renamed)
   * Choose which deployment should run = "Head"
   * Select event source = "From form"
   * Select event type = "On form submit"
1. Edit failure notification settings as needed

The trigger serves to tell the function when to run. If it is not configured, the script is just some code attached to the Form that is never called.

### Run when called on Google Sheet (i.e., "macros")

There are a few ways to add a macro to a Sheet, but I typically write the script and [import the function](https://developers.google.com/apps-script/guides/sheets/macros#importing_functions_as_macros). After following those steps, the function is accessible from the "Tools > Macros" menu.

### AutoHotkey

[AutoHotkey (AHK)](https://www.autohotkey.com/) scripts only run on Windows. They can be [compiled as an executable](https://www.autohotkey.com/docs/Scripts.htm#ahk2exe), to be run without installing AHK on the machine.

## Archive

See `/archive` directory for obsolete scripts.

Microsoft VBA was formerly used to format pull requests, but was difficult to edit and to share between multiple machines.
