"""
Real-world examples of the workflow engine
"""

from workflow import Workflow
from trigger import TriggerType
from datetime import datetime, timedelta


# ============================================================================
# EXAMPLE 1: Work Reminder System
# ============================================================================

def example_work_reminders():
    print("\n" + "="*60)
    print("WORK REMINDER SYSTEM")
    print("="*60)
    
    wf = Workflow("Work Reminders")
    
    def send_reminder(msg):
        print(f"\n🔔 REMINDER: {msg} @ {datetime.now().strftime('%H:%M:%S')}")
    
    # Reminders at different intervals
    wf.add_trigger(
        trigger_name="morning_standup",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_reminder("Daily standup in 10 minutes"),
        delay_seconds=2,  # 2 seconds for demo (would be 9:50 AM normally)
    )
    
    wf.add_trigger(
        trigger_name="lunch_break",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_reminder("Lunch break time!"),
        delay_seconds=4,
    )
    
    wf.add_trigger(
        trigger_name="end_of_day",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_reminder("End of workday - wrap up!"),
        delay_seconds=6,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=10)


# ============================================================================
# EXAMPLE 2: Data Backup Schedule
# ============================================================================

def example_backup_scheduler():
    print("\n" + "="*60)
    print("AUTOMATED BACKUP SCHEDULER")
    print("="*60)
    
    wf = Workflow("Backup System")
    
    def backup_database(db_name):
        print(f"\n💾 Backing up database: {db_name}")
        print(f"   Status: In progress...")
        print(f"   Timestamp: {datetime.now().isoformat()}")
        return f"Backup of {db_name} completed"
    
    def backup_files(folder):
        print(f"\n📁 Backing up folder: {folder}")
        print(f"   Status: Copying files...")
        return f"Backup of {folder} completed"
    
    # Hourly database backup
    wf.add_trigger(
        trigger_name="db_backup_hourly",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: backup_database("production_db"),
        delay_seconds=2,
    )
    
    # 3-hour file backup
    wf.add_trigger(
        trigger_name="file_backup_3hr",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: backup_files("/important/documents"),
        delay_seconds=4,
    )
    
    # Daily archive
    wf.add_trigger(
        trigger_name="daily_archive",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: print("\n🗂️  Creating daily archive..."),
        delay_seconds=6,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=10)


# ============================================================================
# EXAMPLE 3: Customer Notification System
# ============================================================================

def example_customer_notifications():
    print("\n" + "="*60)
    print("CUSTOMER NOTIFICATION SYSTEM")
    print("="*60)
    
    wf = Workflow("Customer Notifications")
    
    def send_email(customer, subject, delay_type):
        print(f"\n📧 EMAIL SENT")
        print(f"   To: {customer}")
        print(f"   Subject: {subject}")
        print(f"   Type: {delay_type}")
    
    def send_sms(customer, message):
        print(f"\n📱 SMS SENT")
        print(f"   To: {customer}")
        print(f"   Message: {message}")
    
    # Welcome email (immediate)
    wf.add_trigger(
        trigger_name="welcome_email",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_email("john@example.com", "Welcome!", "Immediate"),
        delay_seconds=1,
    )
    
    # Reminder email (after 2 seconds)
    wf.add_trigger(
        trigger_name="reminder_email",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_email("john@example.com", "Don't forget!", "Reminder"),
        delay_seconds=3,
    )
    
    # SMS notification (after 4 seconds)
    wf.add_trigger(
        trigger_name="sms_notification",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_sms("john@example.com", "Your order is ready!"),
        delay_seconds=5,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=8)


# ============================================================================
# EXAMPLE 4: System Health Check
# ============================================================================

def example_health_check():
    print("\n" + "="*60)
    print("SYSTEM HEALTH CHECK MONITOR")
    print("="*60)
    
    wf = Workflow("Health Monitor")
    
    def check_cpu():
        print(f"\n📊 CPU Check: 45% usage - OK")
    
    def check_memory():
        print(f"\n📊 Memory Check: 62% usage - WARNING")
    
    def check_disk():
        print(f"\n📊 Disk Check: 78% usage - OK")
    
    def generate_report():
        print(f"\n📋 Health Report Generated - All systems nominal")
    
    # Quick health checks
    wf.add_trigger(
        trigger_name="check_cpu",
        trigger_type=TriggerType.TIME_BASED,
        action=check_cpu,
        delay_seconds=1,
    )
    
    wf.add_trigger(
        trigger_name="check_memory",
        trigger_type=TriggerType.TIME_BASED,
        action=check_memory,
        delay_seconds=2,
    )
    
    wf.add_trigger(
        trigger_name="check_disk",
        trigger_type=TriggerType.TIME_BASED,
        action=check_disk,
        delay_seconds=3,
    )
    
    # Generate summary report
    wf.add_trigger(
        trigger_name="generate_report",
        trigger_type=TriggerType.TIME_BASED,
        action=generate_report,
        delay_seconds=5,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=8)


# ============================================================================
# EXAMPLE 5: E-Commerce Order Processing
# ============================================================================

def example_order_processing():
    print("\n" + "="*60)
    print("E-COMMERCE ORDER PROCESSING")
    print("="*60)
    
    wf = Workflow("Order Processing")
    
    def process_payment(order_id, amount):
        print(f"\n💳 Processing Payment")
        print(f"   Order ID: {order_id}")
        print(f"   Amount: ${amount}")
        print(f"   Status: Payment Confirmed")
    
    def prepare_shipment(order_id):
        print(f"\n📦 Preparing Shipment")
        print(f"   Order ID: {order_id}")
        print(f"   Status: Items packed and labeled")
    
    def send_tracking(order_id, tracking_number):
        print(f"\n🚚 Shipment Sent")
        print(f"   Order ID: {order_id}")
        print(f"   Tracking: {tracking_number}")
    
    # Immediate payment processing
    wf.add_trigger(
        trigger_name="process_payment",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: process_payment("ORD-12345", 99.99),
        delay_seconds=1,
    )
    
    # Prepare shipment after payment
    wf.add_trigger(
        trigger_name="prepare_shipment",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: prepare_shipment("ORD-12345"),
        delay_seconds=3,
    )
    
    # Send tracking info
    wf.add_trigger(
        trigger_name="send_tracking",
        trigger_type=TriggerType.TIME_BASED,
        action=lambda: send_tracking("ORD-12345", "1Z999AA10123456784"),
        delay_seconds=5,
    )
    
    wf.start(check_interval=1)
    wf.wait_for_completion(timeout=8)


if __name__ == "__main__":
    print("\n🎯 REAL-WORLD WORKFLOW EXAMPLES\n")
    
    example_work_reminders()
    example_backup_scheduler()
    example_customer_notifications()
    example_health_check()
    example_order_processing()
    
    print("\n" + "="*60)
    print("✨ ALL REAL-WORLD EXAMPLES COMPLETED!")
    print("="*60 + "\n")
