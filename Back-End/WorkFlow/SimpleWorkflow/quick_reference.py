"""
QUICK REFERENCE - SimpleWorkflow Engine
========================================

This is your one-page cheat sheet for the SimpleWorkflow engine.
"""

# ==============================================================================
# 1. THE BASICS
# ==============================================================================

# Create a workflow
from workflow import Workflow
from trigger import TriggerType

wf = Workflow("My Workflow")

# Add a trigger
wf.add_trigger(
    trigger_name="my_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Action executed!"),
    delay_seconds=5
)

# Start it
wf.start()

# Wait for completion
wf.wait_for_completion()


# ==============================================================================
# 2. TRIGGER TYPES
# ==============================================================================

# TIME_BASED: Execute after a delay
wf.add_trigger(
    trigger_name="timer",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("5 seconds passed"),
    delay_seconds=5
)

# TIME_BASED: Execute at specific time
from datetime import datetime, timedelta
wf.add_trigger(
    trigger_name="scheduled",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Scheduled time!"),
    trigger_at=datetime.now() + timedelta(minutes=5)
)

# MANUAL: Execute on demand
wf.add_trigger(
    trigger_name="manual",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("Triggered manually"),
    delay_seconds=999  # Won't auto-fire
)

# Fire manual trigger
wf.fire_trigger("manual")


# ==============================================================================
# 3. ACTIONS
# ==============================================================================

# Simple lambda action
wf.add_trigger(
    trigger_name="t1",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Hello!"),
    delay_seconds=1
)

# Function action
def my_action():
    print("Action!")

wf.add_trigger(
    trigger_name="t2",
    trigger_type=TriggerType.TIME_BASED,
    action=my_action,
    delay_seconds=2
)

# Action with parameters
def send_msg(msg, level):
    print(f"[{level}] {msg}")

wf.add_trigger(
    trigger_name="t3",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: send_msg("Alert!", "HIGH"),
    delay_seconds=3
)

# Action that returns a value
def calculate():
    return 2 + 2

wf.add_trigger(
    trigger_name="t4",
    trigger_type=TriggerType.TIME_BASED,
    action=calculate,
    delay_seconds=4
)


# ==============================================================================
# 4. WORKFLOW MANAGEMENT
# ==============================================================================

# Get workflow status
status = wf.get_status()
print(status['name'])           # Workflow name
print(status['is_running'])     # True/False
print(status['total_triggers']) # Number of triggers

# List all triggers
triggers = wf.list_triggers()
for t in triggers:
    print(f"{t['name']}: {t['type']}")

# Get specific trigger
trigger = wf.get_trigger("my_trigger")
print(trigger.is_active)
print(trigger.has_fired)

# Remove a trigger
wf.remove_trigger("my_trigger")

# Deactivate a trigger
trigger.deactivate()


# ==============================================================================
# 5. WORKFLOW CONTROL
# ==============================================================================

# Start the workflow
wf.start()

# Start with custom check interval (seconds)
wf.start(check_interval=0.5)

# Stop the workflow
wf.stop()

# Wait for completion
wf.wait_for_completion()           # Wait infinitely
wf.wait_for_completion(timeout=10) # Wait 10 seconds


# ==============================================================================
# 6. COMMON PATTERNS
# ==============================================================================

# Pattern 1: Multi-step workflow
wf = Workflow("Pipeline")
wf.add_trigger("step_1", TriggerType.TIME_BASED, lambda: print("Step 1"), 1)
wf.add_trigger("step_2", TriggerType.TIME_BASED, lambda: print("Step 2"), 2)
wf.add_trigger("step_3", TriggerType.TIME_BASED, lambda: print("Step 3"), 3)
wf.start()
wf.wait_for_completion()

# Pattern 2: Scheduled tasks
wf = Workflow("Scheduler")
wf.add_trigger("backup", TriggerType.TIME_BASED, lambda: print("Backup!"), 3600)  # 1 hour
wf.add_trigger("cleanup", TriggerType.TIME_BASED, lambda: print("Clean!"), 86400) # 1 day
wf.start()

# Pattern 3: Event handling
def handle_event(data):
    print(f"Event: {data}")

wf = Workflow("Events")
wf.on_event("user_login", handle_event)
wf.emit_event("user_login", {"user": "john"})

# Pattern 4: Manual control
wf = Workflow("Manual")
wf.add_trigger("action_1", TriggerType.MANUAL, lambda: print("A1"), 999)
wf.add_trigger("action_2", TriggerType.MANUAL, lambda: print("A2"), 999)
wf.fire_trigger("action_1")
wf.fire_trigger("action_2")

# Pattern 5: Class-based workflow
class MyWorkflow:
    def __init__(self):
        self.wf = Workflow("My App")
    
    def add_step(self, name, func, delay):
        self.wf.add_trigger(name, TriggerType.TIME_BASED, func, delay)
    
    def run(self):
        self.wf.start()
        self.wf.wait_for_completion()

workflow = MyWorkflow()
workflow.add_step("step1", lambda: print("S1"), 1)
workflow.add_step("step2", lambda: print("S2"), 2)
workflow.run()


# ==============================================================================
# 7. REAL-WORLD EXAMPLES
# ==============================================================================

# Reminder system
wf = Workflow("Reminders")
wf.add_trigger(
    "morning",
    TriggerType.TIME_BASED,
    lambda: print("🔔 Good morning!"),
    delay_seconds=30 * 60  # 30 minutes
)
wf.start()

# Backup system
def backup_database():
    print("💾 Backing up...")
    # Your backup code

wf = Workflow("Backup")
wf.add_trigger("daily_backup", TriggerType.TIME_BASED, backup_database, 86400)
wf.start()

# Health checks
def check_health():
    print("📊 Checking health...")
    # Your health check code

wf = Workflow("Monitor")
wf.add_trigger("health_check", TriggerType.TIME_BASED, check_health, 60)
wf.start()

# Notifications
def notify(title, msg):
    print(f"📧 {title}: {msg}")

wf = Workflow("Notifications")
wf.add_trigger(
    "welcome_email",
    TriggerType.TIME_BASED,
    lambda: notify("Welcome", "Thanks for signing up!"),
    delay_seconds=5
)
wf.start()


# ==============================================================================
# 8. DEBUGGING
# ==============================================================================

# Get trigger info
trigger = wf.get_trigger("my_trigger")
print(trigger.get_info())
# Output:
# {
#     'name': 'my_trigger',
#     'type': 'time_based',
#     'is_active': True,
#     'has_fired': False,
#     'scheduled_time': '2025-12-07T13:20:00...',
#     'time_until_fire': '0:00:05.123...'
# }

# Get workflow status
print(wf.get_status())
# Output:
# {
#     'name': 'My Workflow',
#     'is_running': True,
#     'created_at': '2025-12-07T13:15:00...',
#     'total_triggers': 3,
#     'active_triggers': 2,
#     'triggers': [...]
# }

# List all triggers
for trigger in wf.list_triggers():
    print(f"{trigger['name']}: {trigger['status']}")


# ==============================================================================
# 9. PROJECT STRUCTURE
# ==============================================================================

"""
SimpleWorkflow/
├── trigger.py           # Trigger class
├── action.py            # Action class  
├── workflow.py          # Main workflow engine
├── examples.py          # Example workflows
├── real_world_examples.py  # Real-world use cases
├── tutorial.py          # Step-by-step tutorial
├── quickstart.py        # Quick start examples
├── README.md            # Full documentation
├── requirements.txt     # Dependencies (none!)
└── quick_reference.py   # This file
"""


# ==============================================================================
# 10. TIPS & TRICKS
# ==============================================================================

# Tip 1: Use meaningful trigger names
wf.add_trigger("send_morning_email", TriggerType.TIME_BASED, lambda: ..., 60)  # Good
wf.add_trigger("t1", TriggerType.TIME_BASED, lambda: ..., 60)                  # Bad

# Tip 2: Reuse functions with parameters
def log_event(event_type):
    print(f"Event: {event_type}")

wf.add_trigger("login", TriggerType.TIME_BASED, lambda: log_event("login"), 1)
wf.add_trigger("logout", TriggerType.TIME_BASED, lambda: log_event("logout"), 2)

# Tip 3: Check status before starting
if not wf.is_running:
    wf.start()

# Tip 4: Deactivate unused triggers
wf.remove_trigger("old_trigger")
wf.get_trigger("unused").deactivate()

# Tip 5: Use wait_for_completion with timeout to prevent hanging
wf.wait_for_completion(timeout=30)  # Max 30 seconds

# Tip 6: Chain workflows together
wf1 = Workflow("Step 1")
wf1.add_trigger("complete_step1", TriggerType.TIME_BASED, lambda: print("Step 1 done"), 1)
wf1.start()
wf1.wait_for_completion()

wf2 = Workflow("Step 2")
wf2.add_trigger("complete_step2", TriggerType.TIME_BASED, lambda: print("Step 2 done"), 1)
wf2.start()
wf2.wait_for_completion()


# ==============================================================================
# READY TO BUILD YOUR WORKFLOW?
# ==============================================================================

# 1. Open workflow.py to understand the code
# 2. Run examples.py to see it in action
# 3. Run tutorial.py for step-by-step learning
# 4. Create your own my_workflow.py file
# 5. Start building!

# Happy workflow building! 🚀
