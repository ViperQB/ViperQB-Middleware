"""
YOUR SPECIFIC EXAMPLE: 
Set a trigger that will send a message after 1 min saying "it's been 5 mins"
"""

from workflow import Workflow
from trigger import TriggerType
from datetime import datetime


print("\n" + "="*70)
print("EXACT EXAMPLE FROM YOUR REQUEST")
print("="*70)
print("\nSetup: Create a trigger that fires after 1 minute")
print("Action: When it fires, send a message saying \"it's been 5 mins\"")
print("\n(Using 5 seconds for demo instead of 1 minute)\n")


# ============================================================================
# YOUR WORKFLOW
# ============================================================================

# Step 1: Create a workflow
wf = Workflow("Message Timer")

# Step 2: Define what message to send
def send_message():
    """This is the action that will be triggered"""
    print("\n" + "🔔 " * 20)
    print("MESSAGE: It's been 5 mins!")
    print("Sent at: " + datetime.now().strftime("%H:%M:%S"))
    print("🔔 " * 20 + "\n")

# Step 3: Add a trigger
wf.add_trigger(
    trigger_name="5_min_message",      # Name your trigger
    trigger_type=TriggerType.TIME_BASED,  # Type: time-based
    action=send_message,               # What to do when it fires
    delay_seconds=5                    # Wait 5 seconds (1 min = 60 seconds)
)

# Step 4: Start the workflow
print("⏱️  Workflow started! Waiting for trigger to fire...\n")
wf.start()

# Step 5: Wait for completion
wf.wait_for_completion()

print("\n✅ Workflow completed!\n")


# ============================================================================
# VARIATIONS - OTHER WAYS TO DO THE SAME THING
# ============================================================================

print("\n" + "="*70)
print("VARIATIONS - OTHER WAYS TO DO THIS")
print("="*70)


# VARIATION 1: Using lambda (shorter code)
print("\n--- VARIATION 1: Using lambda ---\n")

wf = Workflow("Message Timer v2")
wf.add_trigger(
    trigger_name="5_min_message",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("\n💬 It's been 5 mins!\n"),
    delay_seconds=3
)
wf.start()
wf.wait_for_completion()


# VARIATION 2: With custom parameters
print("\n--- VARIATION 2: With parameters ---\n")

def send_custom_message(message, sender):
    """Send a custom message from a sender"""
    print(f"\n📧 Message from {sender}: {message}\n")

wf = Workflow("Message Timer v3")
wf.add_trigger(
    trigger_name="5_min_message",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: send_custom_message("It's been 5 mins!", "Timer Bot"),
    delay_seconds=2
)
wf.start()
wf.wait_for_completion()


# VARIATION 3: Multiple messages at different times
print("\n--- VARIATION 3: Multiple messages ---\n")

wf = Workflow("Message Timer v4")

wf.add_trigger(
    trigger_name="1_min_reminder",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("\n⏱️  1 minute has passed!\n"),
    delay_seconds=1
)

wf.add_trigger(
    trigger_name="5_min_message",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("\n🔔 It's been 5 mins!\n"),
    delay_seconds=3
)

wf.add_trigger(
    trigger_name="10_min_alert",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("\n🚨 10 minutes have passed!\n"),
    delay_seconds=5
)

wf.start()
wf.wait_for_completion()


# VARIATION 4: Manual trigger (fire on demand)
print("\n--- VARIATION 4: Manual trigger (fire on demand) ---\n")

wf = Workflow("Message Timer v5")

wf.add_trigger(
    trigger_name="send_on_demand",
    trigger_type=TriggerType.MANUAL,
    action=lambda: print("\n✅ Manual trigger fired! It's been 5 mins!\n"),
    delay_seconds=999  # Won't auto-fire
)

print("Manually firing the trigger...")
wf.fire_trigger("send_on_demand")


# ============================================================================
# YOUR PRODUCTION CODE - COPY THIS TEMPLATE
# ============================================================================

print("\n" + "="*70)
print("PRODUCTION TEMPLATE - COPY AND USE THIS")
print("="*70 + "\n")

template_code = '''
# ============================================================================
# SIMPLE WORKFLOW: Message After Delay
# ============================================================================

from workflow import Workflow
from trigger import TriggerType

# Create a workflow
wf = Workflow("My Message Timer")

# Add a trigger: After 60 seconds (1 minute), send a message
wf.add_trigger(
    trigger_name="send_message",
    trigger_type=TriggerType.TIME_BASED,
    action=lambda: print("💬 It's been 5 mins!"),
    delay_seconds=60  # Change to 60 for 1 minute
)

# Start the workflow
wf.start()

# Wait for it to complete
wf.wait_for_completion()

print("✅ Done!")
'''

print(template_code)


print("="*70)
print("📝 SUMMARY")
print("="*70)
print("""
To set a trigger that sends a message after 1 minute:

1. Create a Workflow: wf = Workflow("Name")

2. Add a trigger:
   wf.add_trigger(
       trigger_name="my_trigger",
       trigger_type=TriggerType.TIME_BASED,
       action=lambda: print("Message"),
       delay_seconds=60  # 60 seconds = 1 minute
   )

3. Start it: wf.start()

4. Wait: wf.wait_for_completion()

That's it! When the delay passes, the message will print!

KEY PARAMETERS:
- trigger_name: What you call this trigger
- trigger_type: TIME_BASED, EVENT_BASED, or MANUAL
- action: What to do (any Python function)
- delay_seconds: How long to wait before firing

You can have as many triggers as you want!
They can run in parallel at different times!
""")

print("\n✨ You're ready to build your workflows!\n")
