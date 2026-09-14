import sys
import json
import smtplib
import os
from email.message import EmailMessage

def main():
    try:
        # Read JSON payload from stdin
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        
        # Read SMTP credentials
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', 587))
        smtp_username = os.environ.get('SMTP_USERNAME')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not smtp_username or not smtp_password:
            print(json.dumps({"success": False, "error": "SMTP_USERNAME or SMTP_PASSWORD not configured"}))
            sys.exit(1)
            
        owner_email = data.get('owner_email')
        visitor_email = data.get('visitor_email')
        sender_email = data.get('sender_email')
        sender_name = data.get('sender_name')
        
        # Email 1: To Owner
        msg_owner = EmailMessage()
        msg_owner['Subject'] = data.get('owner_subject')
        msg_owner['From'] = f"{sender_name} <{sender_email}>"
        msg_owner['To'] = owner_email
        msg_owner['Reply-To'] = visitor_email
        msg_owner.set_content("Please enable HTML to view this message.")
        msg_owner.add_alternative(data.get('owner_html'), subtype='html')
        
        # Email 2: To Visitor
        msg_visitor = EmailMessage()
        msg_visitor['Subject'] = data.get('visitor_subject')
        msg_visitor['From'] = f"{sender_name} <{sender_email}>"
        msg_visitor['To'] = visitor_email
        msg_visitor['Reply-To'] = owner_email
        msg_visitor.set_content("Please enable HTML to view this message.")
        msg_visitor.add_alternative(data.get('visitor_html'), subtype='html')
        
        # Connect to SMTP Server with 12s timeout
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=12)
        server.starttls()
        server.login(smtp_username, smtp_password)
        
        # Send email to Owner (critical)
        owner_sent = False
        try:
            server.send_message(msg_owner)
            owner_sent = True
        except Exception as err:
            print(f"Failed to send to owner: {err}", file=sys.stderr)
            
        # Send confirmation to Visitor (optional/best-effort)
        visitor_sent = False
        try:
            server.send_message(msg_visitor)
            visitor_sent = True
        except Exception as err:
            print(f"Failed to send auto-reply to visitor: {err}", file=sys.stderr)
            
        # Close connection
        try:
            server.quit()
        except Exception:
            pass
            
        if owner_sent or visitor_sent:
            print(json.dumps({"success": True, "owner_sent": owner_sent, "visitor_sent": visitor_sent}))
        else:
            print(json.dumps({"success": False, "error": "Failed to deliver message via SMTP"}))
            sys.exit(1)
    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
