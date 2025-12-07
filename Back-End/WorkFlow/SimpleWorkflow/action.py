"""
Action system for workflows
"""
from typing import Any, Optional
from datetime import datetime
from enum import Enum


class ActionStatus(Enum):
    """Status of an action"""
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class Action:
    """
    Represents an action to be executed
    """
    
    def __init__(self, name: str, action_func, *args, **kwargs):
        """
        Initialize an action
        
        Args:
            name: Name of the action
            action_func: Function to execute
            *args: Positional arguments for the function
            **kwargs: Keyword arguments for the function
        """
        self.name = name
        self.action_func = action_func
        self.args = args
        self.kwargs = kwargs
        self.status = ActionStatus.PENDING
        self.result = None
        self.error = None
        self.created_at = datetime.now()
        self.started_at = None
        self.completed_at = None
    
    def execute(self) -> Any:
        """Execute the action"""
        try:
            self.status = ActionStatus.RUNNING
            self.started_at = datetime.now()
            
            self.result = self.action_func(*self.args, **self.kwargs)
            
            self.status = ActionStatus.COMPLETED
            self.completed_at = datetime.now()
            
            return self.result
        
        except Exception as e:
            self.status = ActionStatus.FAILED
            self.error = str(e)
            self.completed_at = datetime.now()
            print(f"❌ Action '{self.name}' failed: {e}")
            raise
    
    def get_info(self) -> dict:
        """Get information about this action"""
        duration = None
        if self.started_at and self.completed_at:
            duration = str(self.completed_at - self.started_at)
        
        return {
            "name": self.name,
            "status": self.status.value,
            "result": self.result,
            "error": self.error,
            "created_at": self.created_at.isoformat(),
            "started_at": self.started_at.isoformat() if self.started_at else None,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
            "duration": duration,
        }
