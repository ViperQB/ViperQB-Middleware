"""
Workflow engine that manages triggers and executes actions
"""
from datetime import datetime
from typing import Dict, List, Callable, Optional, Any
import threading
import time

from trigger import Trigger, TriggerType
from action import Action


class Workflow:
    """
    Main workflow engine that manages triggers and actions
    """
    
    def __init__(self, name: str):
        """
        Initialize a workflow
        
        Args:
            name: Name of the workflow
        """
        self.name = name
        self.triggers: Dict[str, Trigger] = {}
        self.actions: Dict[str, Action] = {}
        self.event_listeners: Dict[str, List[Callable]] = {}
        self.is_running = False
        self.created_at = datetime.now()
    
    def add_trigger(
        self,
        trigger_name: str,
        trigger_type: TriggerType,
        action: Callable,
        delay_seconds: Optional[int] = None,
        event_name: Optional[str] = None,
        trigger_at: Optional[datetime] = None,
    ) -> Trigger:
        """
        Add a trigger to the workflow
        
        Args:
            trigger_name: Unique name for the trigger
            trigger_type: Type of trigger
            action: Function to execute when trigger fires
            delay_seconds: Seconds to wait (for TIME_BASED)
            event_name: Event to listen for (for EVENT_BASED)
            trigger_at: Specific datetime (for TIME_BASED)
        
        Returns:
            The created Trigger object
        """
        trigger = Trigger(
            name=trigger_name,
            trigger_type=trigger_type,
            action=action,
            delay_seconds=delay_seconds,
            event_name=event_name,
            trigger_at=trigger_at,
        )
        
        self.triggers[trigger_name] = trigger
        print(f"➕ Added trigger: '{trigger_name}'")
        return trigger
    
    def remove_trigger(self, trigger_name: str) -> bool:
        """Remove a trigger from the workflow"""
        if trigger_name in self.triggers:
            del self.triggers[trigger_name]
            print(f"➖ Removed trigger: '{trigger_name}'")
            return True
        return False
    
    def get_trigger(self, trigger_name: str) -> Optional[Trigger]:
        """Get a trigger by name"""
        return self.triggers.get(trigger_name)
    
    def list_triggers(self) -> List[dict]:
        """List all triggers with their status"""
        return [trigger.get_info() for trigger in self.triggers.values()]
    
    def fire_trigger(self, trigger_name: str) -> Any:
        """Manually fire a trigger"""
        if trigger_name not in self.triggers:
            print(f"❌ Trigger '{trigger_name}' not found")
            return None
        
        trigger = self.triggers[trigger_name]
        return trigger.fire()
    
    def emit_event(self, event_name: str, data: Optional[dict] = None):
        """Emit an event that event-based triggers can listen to"""
        print(f"📢 Event emitted: '{event_name}'")
        
        # Call all listeners for this event
        if event_name in self.event_listeners:
            for listener in self.event_listeners[event_name]:
                try:
                    listener(data or {})
                except Exception as e:
                    print(f"❌ Event listener error: {e}")
    
    def on_event(self, event_name: str, callback: Callable):
        """Register a callback for an event"""
        if event_name not in self.event_listeners:
            self.event_listeners[event_name] = []
        
        self.event_listeners[event_name].append(callback)
        print(f"👂 Registered listener for event: '{event_name}'")
    
    def process_triggers(self):
        """Check all triggers and fire those that should fire"""
        fired_count = 0
        
        for trigger_name, trigger in self.triggers.items():
            if trigger.should_fire():
                trigger.fire()
                fired_count += 1
        
        if fired_count > 0:
            print(f"\n📊 Processed {fired_count} trigger(s)\n")
    
    def start(self, check_interval: int = 1):
        """
        Start the workflow engine in a background thread
        
        Args:
            check_interval: Seconds between trigger checks
        """
        if self.is_running:
            print("⚠️  Workflow is already running")
            return
        
        self.is_running = True
        print(f"🚀 Starting workflow '{self.name}'...")
        
        def run_loop():
            try:
                while self.is_running:
                    self.process_triggers()
                    time.sleep(check_interval)
            except KeyboardInterrupt:
                self.stop()
        
        # Run in background thread
        thread = threading.Thread(target=run_loop, daemon=True)
        thread.start()
    
    def stop(self):
        """Stop the workflow engine"""
        self.is_running = False
        print(f"🛑 Stopped workflow '{self.name}'")
    
    def get_status(self) -> dict:
        """Get status of the entire workflow"""
        return {
            "name": self.name,
            "is_running": self.is_running,
            "created_at": self.created_at.isoformat(),
            "total_triggers": len(self.triggers),
            "active_triggers": sum(1 for t in self.triggers.values() if t.is_active),
            "triggers": self.list_triggers(),
        }
    
    def wait_for_completion(self, timeout: Optional[int] = None):
        """
        Wait for all triggers to fire or timeout
        
        Args:
            timeout: Maximum seconds to wait (None = infinite)
        """
        start_time = datetime.now()
        
        while self.is_running:
            # Check if all triggers have fired
            all_fired = all(t.has_fired for t in self.triggers.values() if t.is_active)
            if all_fired:
                print("✨ All triggers have fired!")
                break
            
            # Check timeout
            if timeout:
                elapsed = (datetime.now() - start_time).total_seconds()
                if elapsed > timeout:
                    print(f"⏱️  Timeout after {timeout} seconds")
                    break
            
            time.sleep(0.1)
