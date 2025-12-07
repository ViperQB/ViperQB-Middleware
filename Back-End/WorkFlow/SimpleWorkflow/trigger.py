"""
Trigger system for workflows
"""
from datetime import datetime, timedelta
from typing import Callable, Any, Optional, List
from enum import Enum


class TriggerType(Enum):
    """Types of triggers available"""
    TIME_BASED = "time_based"
    EVENT_BASED = "event_based"
    MANUAL = "manual"
    CRON = "cron"  # For scheduled recurring tasks


class Trigger:
    """
    Represents a trigger that can execute an action
    """
    
    def __init__(
        self,
        name: str,
        trigger_type: TriggerType,
        action: Callable,
        delay_seconds: Optional[int] = None,
        event_name: Optional[str] = None,
        trigger_at: Optional[datetime] = None,
    ):
        """
        Initialize a trigger
        
        Args:
            name: Name of the trigger
            trigger_type: Type of trigger (TIME_BASED, EVENT_BASED, MANUAL)
            action: Callable function to execute when trigger fires
            delay_seconds: For TIME_BASED - seconds to wait before triggering
            event_name: For EVENT_BASED - name of event to listen for
            trigger_at: For TIME_BASED - specific datetime to trigger
        """
        self.name = name
        self.trigger_type = trigger_type
        self.action = action
        self.delay_seconds = delay_seconds
        self.event_name = event_name
        self.trigger_at = trigger_at
        self.is_active = True
        self.has_fired = False
        self.created_at = datetime.now()
        
        # Calculate when this should trigger (for time-based triggers)
        if trigger_type == TriggerType.TIME_BASED:
            if trigger_at:
                self.scheduled_time = trigger_at
            elif delay_seconds:
                self.scheduled_time = datetime.now() + timedelta(seconds=delay_seconds)
            else:
                raise ValueError("TIME_BASED trigger needs either delay_seconds or trigger_at")
    
    def should_fire(self) -> bool:
        """Check if this trigger should fire now"""
        if not self.is_active or self.has_fired:
            return False
        
        if self.trigger_type == TriggerType.TIME_BASED:
            return datetime.now() >= self.scheduled_time
        
        return False
    
    def fire(self) -> Any:
        """Execute the action and mark as fired"""
        if not self.is_active:
            return None
        
        print(f"🔥 Trigger '{self.name}' is firing!")
        self.has_fired = True
        result = self.action()
        print(f"✅ Trigger '{self.name}' completed")
        return result
    
    def deactivate(self):
        """Deactivate this trigger"""
        self.is_active = False
        print(f"⛔ Trigger '{self.name}' deactivated")
    
    def get_info(self) -> dict:
        """Get information about this trigger"""
        info = {
            "name": self.name,
            "type": self.trigger_type.value,
            "is_active": self.is_active,
            "has_fired": self.has_fired,
            "created_at": self.created_at.isoformat(),
        }
        
        if self.trigger_type == TriggerType.TIME_BASED:
            info["scheduled_time"] = self.scheduled_time.isoformat()
            info["time_until_fire"] = str(self.scheduled_time - datetime.now())
        elif self.trigger_type == TriggerType.EVENT_BASED:
            info["event_name"] = self.event_name
        
        return info
