"""
Quick start guide - Copy and paste these examples to get started
"""

# ============================================================================
# EXAMPLE 1: Send a message after 5 seconds
# ============================================================================

print("EXAMPLE 1: Send message after 5 seconds\n")

from workflow import Workflow
from trigger import TriggerType

wf = Workflow("Message Workflow")

wf.add_trigger(
    trigger_name="send_message",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("💬 It's been 5 mins!"),
    delay_seconds=5
)

wf.start()
wf.wait_for_completion()

print("\n" + "="*60 + "\n")


# ============================================================================
# EXAMPLE 2: Multiple triggers at different times
# ============================================================================

print("EXAMPLE 2: Multiple triggers\n")

wf2 = Workflow("Multi Workflow")

wf2.add_trigger(
    trigger_name="trigger_1min",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("⏲️  1 minute timer!"),
    delay_seconds=3  # 3 seconds for demo
)

wf2.add_trigger(
    trigger_name="trigger_5mins",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("⏲️  5 minutes timer!"),
    delay_seconds=6  # 6 seconds for demo
)

wf2.start()
wf2.wait_for_completion(timeout=10)

print("\n" + "="*60 + "\n")


# ============================================================================
# EXAMPLE 3: Custom actions with parameters
# ============================================================================

print("EXAMPLE 3: Custom actions\n")

def send_notification(title, message):
    print(f"\n🔔 NOTIFICATION")
    print(f"   Title: {title}")
    print(f"   Message: {message}")

wf3 = Workflow("Notification Workflow")

# Use lambda to pass parameters
wf3.add_trigger(
    trigger_name="alert_trigger",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: send_notification("Alert!", "Time's up!"),
    delay_seconds=2
)

wf3.start()
wf3.wait_for_completion()

print("\n" + "="*60 + "\n")


# ============================================================================
# EXAMPLE 4: Manually fire triggers
# ============================================================================

print("EXAMPLE 4: Manual triggers\n")

wf4 = Workflow("Manual Workflow")

wf4.add_trigger(
    trigger_name="manual_action",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("✅ Manual trigger fired!"),
    delay_seconds=999  # Won't auto-fire
)

print("Firing trigger manually...")
wf4.fire_trigger("manual_action")

print("\n" + "="*60 + "\n")

print("✨ All quick start examples completed!")
