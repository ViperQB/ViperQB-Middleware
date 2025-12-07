"""
How to create your own workflow - Step by step guide
"""

from workflow import Workflow
from trigger import TriggerType
from datetime import datetime


# ============================================================================
# STEP 1: BASIC WORKFLOW - Message after delay
# ============================================================================

print("\n" + "="*60)
print("STEP 1: Basic Workflow - Message After Delay")
print("="*60)

# Create a workflow
wf = Workflow("My First Workflow")

# Define what you want to happen (the action)
def my_action():
    return "Hello! This is my first trigger!"

# Add a trigger that will execute the action
wf.add_trigger(
    trigger_name="my_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=my_action,
    delay_seconds=2  # Wait 2 seconds then execute
)

# Start the workflow
wf.start()

# Wait for it to complete
wf.wait_for_completion()

print("✅ Step 1 complete!\n")


# ============================================================================
# STEP 2: LAMBDA FUNCTIONS - Quick inline actions
# ============================================================================

print("\n" + "="*60)
print("STEP 2: Using Lambda Functions")
print("="*60)

wf = Workflow("Lambda Workflow")

# Use lambda for quick inline actions
wf.add_trigger(
    trigger_name="quick_action",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("⚡ Quick action triggered!"),
    delay_seconds=1
)

wf.start()
wf.wait_for_completion()

print("✅ Step 2 complete!\n")


# ============================================================================
# STEP 3: ACTIONS WITH PARAMETERS
# ============================================================================

print("\n" + "="*60)
print("STEP 3: Actions With Parameters")
print("="*60)

def send_notification(title, message, priority):
    """Function that takes parameters"""
    print(f"\n🔔 NOTIFICATION")
    print(f"   Title: {title}")
    print(f"   Message: {message}")
    print(f"   Priority: {priority}")

wf = Workflow("Parametrized Workflow")

# Use lambda to pass parameters to your function
wf.add_trigger(
    trigger_name="notify_user",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: send_notification(
        title="Important Update",
        message="Your task is ready",
        priority="HIGH"
    ),
    delay_seconds=1
)

wf.start()
wf.wait_for_completion()

print("✅ Step 3 complete!\n")


# ============================================================================
# STEP 4: MULTIPLE SEQUENTIAL TRIGGERS
# ============================================================================

print("\n" + "="*60)
print("STEP 4: Multiple Triggers Running in Sequence")
print("="*60)

wf = Workflow("Multi-Step Workflow")

# Step 1 - After 1 second
wf.add_trigger(
    trigger_name="step_1",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("✓ Step 1: Data loaded"),
    delay_seconds=1
)

# Step 2 - After 2 seconds
wf.add_trigger(
    trigger_name="step_2",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("✓ Step 2: Processing data"),
    delay_seconds=2
)

# Step 3 - After 3 seconds
wf.add_trigger(
    trigger_name="step_3",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("✓ Step 3: Saving results"),
    delay_seconds=3
)

# Step 4 - After 4 seconds
wf.add_trigger(
    trigger_name="step_4",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("✓ Step 4: Workflow complete!"),
    delay_seconds=4
)

wf.start()
wf.wait_for_completion()

print("✅ Step 4 complete!\n")


# ============================================================================
# STEP 5: MANUAL TRIGGERS
# ============================================================================

print("\n" + "="*60)
print("STEP 5: Manual Triggers - Fire On Demand")
print("="*60)

wf = Workflow("Manual Workflow")

# Create triggers that won't auto-fire
wf.add_trigger(
    trigger_name="manual_1",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("Manual trigger 1 fired!"),
    delay_seconds=999  # Won't auto-fire
)

wf.add_trigger(
    trigger_name="manual_2",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("Manual trigger 2 fired!"),
    delay_seconds=999
)

# View triggers
print("\nAvailable triggers:")
for trigger in wf.list_triggers():
    print(f"  - {trigger['name']}: {trigger['type']}")

# Fire them manually when you want
print("\nFiring triggers manually...\n")
wf.fire_trigger("manual_1")
wf.fire_trigger("manual_2")

print("\n✅ Step 5 complete!\n")


# ============================================================================
# STEP 6: MONITORING WORKFLOW STATUS
# ============================================================================

print("\n" + "="*60)
print("STEP 6: Monitor Workflow Status")
print("="*60)

wf = Workflow("Monitoring Workflow")

wf.add_trigger(
    trigger_name="demo_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("Trigger fired!"),
    delay_seconds=1
)

# Get and display status
print("\nBefore starting:")
status = wf.get_status()
print(f"  Workflow: {status['name']}")
print(f"  Running: {status['is_running']}")
print(f"  Triggers: {status['total_triggers']}")

wf.start()

print("\nAfter starting:")
status = wf.get_status()
print(f"  Running: {status['is_running']}")
print(f"  Active triggers: {status['active_triggers']}")

# Show detailed info
print("\nDetailed trigger info:")
for trigger in wf.list_triggers():
    print(f"  - Name: {trigger['name']}")
    print(f"    Type: {trigger['type']}")
    print(f"    Active: {trigger['is_active']}")
    print(f"    Has fired: {trigger['has_fired']}")

wf.wait_for_completion()

print("\nAfter completion:")
print(f"  All triggers fired: {all(t['has_fired'] for t in wf.list_triggers())}")

print("\n✅ Step 6 complete!\n")


# ============================================================================
# STEP 7: REAL WORLD - Background Task Runner
# ============================================================================

print("\n" + "="*60)
print("STEP 7: Real World Example - Background Task Runner")
print("="*60)

class TaskRunner:
    """Example class that uses the workflow engine"""
    
    def __init__(self):
        self.wf = Workflow("Task Runner")
        self.tasks_completed = []
    
    def add_task(self, task_name, task_func, delay_seconds):
        """Add a task to run after delay"""
        def wrapped_task():
            result = task_func()
            self.tasks_completed.append(task_name)
            return result
        
        self.wf.add_trigger(
            trigger_name=task_name,
            trigger_type=TriggerType.TIME_BASED,
            action=wrapped_task,
            delay_seconds=delay_seconds
        )
    
    def run(self):
        """Run all tasks"""
        self.wf.start()
        self.wf.wait_for_completion()
        return self.tasks_completed

# Create a task runner
runner = TaskRunner()

# Add some tasks
runner.add_task("download_data", lambda: print("📥 Downloaded data"), delay_seconds=1)
runner.add_task("process_data", lambda: print("⚙️  Processing data"), delay_seconds=2)
runner.add_task("upload_results", lambda: print("📤 Uploaded results"), delay_seconds=3)

# Run the tasks
completed = runner.run()
print(f"\nCompleted tasks: {completed}")

print("\n✅ Step 7 complete!\n")


print("\n" + "="*60)
print("🎉 ALL STEPS COMPLETE!")
print("="*60)
print("\nYou now know how to:")
print("  ✓ Create basic workflows")
print("  ✓ Use lambda functions for quick actions")
print("  ✓ Pass parameters to actions")
print("  ✓ Create sequential triggers")
print("  ✓ Use manual triggers")
print("  ✓ Monitor workflow status")
print("  ✓ Build real-world task runners")
print("\nReady to build your own workflows! 🚀\n")
