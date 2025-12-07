"""
README - Simple Workflow Engine
"""

# Simple Workflow Engine

A lightweight, easy-to-use Python workflow engine for creating triggers and executing actions.

## 📋 Features

- **Time-Based Triggers**: Schedule actions to run after a delay or at a specific time
- **Event-Based Triggers**: Execute actions when events occur
- **Manual Triggers**: Fire actions on demand
- **Background Processing**: Workflow runs in a separate thread
- **Status Monitoring**: Check workflow and trigger status
- **Simple API**: Easy to understand and use

## 🚀 Quick Start

### Installation

No external dependencies required! Just Python 3.7+

```bash
# Clone or download the project
cd SimpleWorkflow
```

### Basic Usage

```python
from workflow import Workflow
from trigger import TriggerType

# Create a workflow
wf = Workflow("My Workflow")

# Define an action (any callable)
def send_message():
    print("It's been 5 mins!")

# Add a time-based trigger
wf.add_trigger(
    trigger_name="my_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=send_message,
    delay_seconds=5  # Fire after 5 seconds
)

# Start the workflow
wf.start()

# Wait for completion
wf.wait_for_completion()
```

## 📚 Core Concepts

### Triggers

A **Trigger** is what causes an action to execute. Three types available:

1. **TIME_BASED**: Execute after a delay or at a specific time
2. **EVENT_BASED**: Execute when an event occurs
3. **MANUAL**: Execute on demand

### Actions

An **Action** is any Python function you want to execute. When a trigger fires, its action runs.

### Workflow

The **Workflow** is the engine that manages triggers and orchestrates execution.

## 💡 Examples

### Example 1: Simple Delay

```python
from workflow import Workflow
from trigger import TriggerType

wf = Workflow("Simple Workflow")

wf.add_trigger(
    trigger_name="send_alert",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Alert: 5 minutes have passed!"),
    delay_seconds=5
)

wf.start()
wf.wait_for_completion()
```

### Example 2: Multiple Triggers

```python
wf = Workflow("Multi-Trigger Workflow")

# Trigger 1: After 2 seconds
wf.add_trigger(
    trigger_name="trigger_1",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("First action"),
    delay_seconds=2
)

# Trigger 2: After 5 seconds
wf.add_trigger(
    trigger_name="trigger_2",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Second action"),
    delay_seconds=5
)

wf.start()
wf.wait_for_completion(timeout=10)
```

### Example 3: Manual Triggers

```python
wf = Workflow("Manual Workflow")

wf.add_trigger(
    trigger_name="manual_action",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("This fires on demand"),
    delay_seconds=100  # Won't auto-fire
)

# Manually fire the trigger
wf.fire_trigger("manual_action")
```

### Example 4: Complex Actions

```python
def send_email(recipient, subject):
    print(f"Sending email to {recipient}: {subject}")
    # Your email logic here

def check_status():
    print("Checking system status...")
    # Your status check logic

wf = Workflow("Complex Workflow")

wf.add_trigger(
    trigger_name="email_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: send_email("user@example.com", "Status Report"),
    delay_seconds=10
)

wf.add_trigger(
    trigger_name="status_check",
    trigger_type=TriggerType.TIME_BASED,
    action=check_status,
    delay_seconds=5
)

wf.start()
wf.wait_for_completion(timeout=20)
```

## 🔧 API Reference

### Workflow Class

#### Methods

- `add_trigger(trigger_name, trigger_type, action, ...)` - Add a new trigger
- `remove_trigger(trigger_name)` - Remove a trigger
- `get_trigger(trigger_name)` - Get a trigger by name
- `list_triggers()` - List all triggers
- `fire_trigger(trigger_name)` - Manually fire a trigger
- `start(check_interval=1)` - Start the workflow engine
- `stop()` - Stop the workflow engine
- `wait_for_completion(timeout=None)` - Wait for all triggers to fire
- `get_status()` - Get workflow status
- `emit_event(event_name, data)` - Emit an event
- `on_event(event_name, callback)` - Register event listener

### Trigger Class

#### Properties

- `name` - Trigger name
- `trigger_type` - Type of trigger
- `is_active` - Whether trigger is active
- `has_fired` - Whether trigger has fired
- `scheduled_time` - When the trigger will fire (TIME_BASED only)

#### Methods

- `fire()` - Execute the action
- `deactivate()` - Deactivate the trigger
- `should_fire()` - Check if trigger should fire
- `get_info()` - Get trigger information

## 🏃 Running Examples

```bash
# Run all examples
python examples.py

# Or create your own script
python your_script.py
```

## 📝 Project Structure

```
SimpleWorkflow/
├── trigger.py       # Trigger implementation
├── action.py        # Action implementation
├── workflow.py      # Workflow engine
├── examples.py      # Example usage
└── README.md        # This file
```

## 🎯 Use Cases

- **Scheduled Tasks**: Run tasks at specific intervals
- **Automation**: Trigger workflows based on events
- **Monitoring**: Execute checks on a schedule
- **Alerts**: Send notifications after delays
- **Data Processing**: Run jobs at specific times
- **Job Queuing**: Simple task scheduling

## 🔒 Thread Safety

The workflow engine runs triggers in a background thread. All operations are thread-safe for basic usage. For complex multi-threaded scenarios, add synchronization as needed.

## 📄 License

Free to use and modify for your projects.

## 💬 Questions?

The code is simple and well-commented. Feel free to customize it for your needs!

## 📝 WorkFlow Explanation 

📌 Main Files (Simplified)
1. workflow.py

What it is:
The boss of the system. Controls everything.

What it does:

Starts the workflow

Runs actions at the right time

Listens for events

Handles time-based triggers in the background

When you touch this file:
If you want to change how the engine works internally (like threading, scheduling, saving state).

2. trigger.py

What it is:
A trigger = the condition that decides when an action should run.

Types of triggers:

TIME_BASED: run after X seconds or every X seconds

EVENT_BASED: run when something happens (an event)

MANUAL: run only when you manually call it

Engine uses it automatically — you rarely modify it.

3. action.py

What it is:
An action = the function/code that runs when a trigger fires.

What it does:

Runs your function

Stores basic info like start time, status, errors

Helps the engine track actions better

4. examples.py

What it is:
Small scripts that show how to use the system.

Use it to learn:
Run python examples.py and watch how everything works.

5. tutorial.py

What it is:
A step-by-step guide with explanations.

Good for beginners.

6. real_world_examples.py

What it is:
More realistic automation examples: reminders, backups, notifications, etc.

7. quickstart.py

What it is:
Basic “copy this and run” examples.

Use: Perfect if you want the fastest way to get started.

8. quick_reference.py

What it is:
A one-page cheat sheet of all commands.

9. YOUR_EXAMPLE.py

What it is:
The example made specifically for you.

10. README + START_HERE.txt

What they are:
Documentation for onboarding.

11. requirements.txt

What it is:
A small file that normally lists external libraries.
Here it’s basically empty → no extra installs needed.

🚦 How Triggers, Actions and Events Work (Very Simple)
1️⃣ You add a trigger

A trigger decides when something should run.

Examples:

✔ Time-based

run after 60 seconds


✔ Event-based

run when “user_registered” event happens


✔ Manual

only run when I call it myself

2️⃣ When the trigger fires

The system calls the linked action (your function).

Example action:

def say_hello():
    print("Hello!")

3️⃣ Actions can send events

Actions can say:

workflow.emit_event("done", data)


And any event-based trigger waiting for "done" will fire.

🎯 Very Simple Summary

Trigger = when to do something

Action = what to do

Event = a message that can activate other triggers

The engine (workflow.py) keeps everything running in the background.