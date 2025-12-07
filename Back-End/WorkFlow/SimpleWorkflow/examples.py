"""
Simple examples demonstrating the workflow engine
"""
from datetime import datetime, timedelta
from workflow import Workflow
from trigger import TriggerType
import time


def send_message(msg: str):
    """Action: Send a message"""
    print(f"\n💬 MESSAGE: {msg}")
    return f"Message sent: {msg}"


def send_notification(title: str, body: str):
    """Action: Send a notification"""
    print(f"\n🔔 NOTIFICATION")
    print(f"   Title: {title}")
    print(f"   Body: {body}")
    return f"Notification: {title}"


def log_event(event_type: str):
    """Action: Log an event"""
    print(f"\n📝 EVENT LOGGED: {event_type} at {datetime.now().strftime('%H:%M:%S')}")
    return f"Event logged: {event_type}"


def example_1_simple_delay():
    """Example 1: Simple trigger with delay"""
    print("\n" + "="*60)
    print("EXAMPLE 1: Simple Trigger with Delay")
    print("="*60)
    print("Setting up: In 5 seconds, send a message saying 'It\'s been 5 mins'")
    print()
    
    # Create workflow
    wf = Workflow("Simple Message Workflow")
    
    # Add a trigger that fires after 5 seconds
    wf.add_trigger(
        trigger_name="send_message_trigger",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_message("It's been 5 mins"),
        delay_seconds=5,
    )
    
    # Start the workflow
    wf.start(check_interval=1)
    
    # Wait for it to complete
    wf.wait_for_completion(timeout=10)
    
    print("\n✅ Example 1 completed\n")


def example_2_multiple_triggers():
    """Example 2: Multiple triggers at different times"""
    print("\n" + "="*60)
    print("EXAMPLE 2: Multiple Triggers")
    print("="*60)
    print("Setting up multiple triggers:")
    print("  - In 2 seconds: Send first message")
    print("  - In 4 seconds: Send second message")
    print("  - In 6 seconds: Log event")
    print()
    
    wf = Workflow("Multi-Trigger Workflow")
    
    # Add multiple triggers
    wf.add_trigger(
        trigger_name="trigger_1",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_message("First message - 2 seconds"),
        delay_seconds=2,
    )
    
    wf.add_trigger(
        trigger_name="trigger_2",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_message("Second message - 4 seconds"),
        delay_seconds=4,
    )
    
    wf.add_trigger(
        trigger_name="trigger_3",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: log_event("Multiple triggers completed"),
        delay_seconds=6,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=10)
    
    print("\n✅ Example 2 completed\n")


def example_3_manual_trigger():
    """Example 3: Manually fire triggers"""
    print("\n" + "="*60)
    print("EXAMPLE 3: Manual Trigger Control")
    print("="*60)
    print("Creating triggers and firing them manually")
    print()
    
    wf = Workflow("Manual Trigger Workflow")
    
    # Create some triggers
    wf.add_trigger(
        trigger_name="manual_1",
        trigger_type=TriggerType.MANUAL,
        action=lambda: send_notification("Alert", "Manual trigger fired!"),
        delay_seconds=100,  # Won't auto-fire
    )
    
    wf.add_trigger(
        trigger_name="manual_2",
        trigger_type=TriggerType.MANUAL,
        action=lambda: send_message("Manually triggered message"),
        delay_seconds=100,
    )
    
    print("\n📋 Triggers created:")
    for trigger_info in wf.list_triggers():
        print(f"  - {trigger_info['name']}: {trigger_info['type']}")
    
    print("\n🔥 Manually firing triggers...\n")
    wf.fire_trigger("manual_1")
    time.sleep(1)
    wf.fire_trigger("manual_2")
    
    print("\n✅ Example 3 completed\n")


def example_4_trigger_monitoring():
    """Example 4: Monitor workflow status"""
    print("\n" + "="*60)
    print("EXAMPLE 4: Monitor Workflow Status")
    print("="*60)
    
    wf = Workflow("Monitoring Workflow")
    
    wf.add_trigger(
        trigger_name="status_trigger",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_message("Status check!"),
        delay_seconds=3,
    )
    
    wf.start(check_interval=1)
    
    # Display status
    print("\n📊 Workflow Status:")
    status = wf.get_status()
    print(f"  Name: {status['name']}")
    print(f"  Running: {status['is_running']}")
    print(f"  Total Triggers: {status['total_triggers']}")
    print(f"  Active Triggers: {status['active_triggers']}")
    
    print("\n⏳ Waiting for triggers to fire...")
    wf.wait_for_completion(timeout=5)
    
    print("\n✅ Example 4 completed\n")


if __name__ == "__main__":
    print("\n🎯 Simple Workflow Engine - Examples\n")
    
    # Run examples
    example_1_simple_delay()
    example_2_multiple_triggers()
    example_3_manual_trigger()
    example_4_trigger_monitoring()
    
    print("\n" + "="*60)
    print("ALL EXAMPLES COMPLETED!")
    print("="*60 + "\n")
