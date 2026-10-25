from winotify import Notification, audio

def show_silent_notification(title, message):
    try:
        toast = Notification(
            app_id="GitHub Pages Notifier",
            title=title,
            msg=message,
            duration="short"
        )
        toast.show()
    except Exception as e:
        print(f"[Notification Error] {e}")

show_silent_notification('Blagh', 'BlahBlah')
