 # Imperative-Apex-Using-LWC

**Call Apex Methods Imperatively**

1. To control when the method invocation occurs (for example, in response to clicking a button), call the method imperatively.
2. Call an Apex method imperatively as opposed to using @wire.
3. To call a method that isn't annotated with cacheable = true, which included any method that inserts, updates, or deletes data.
4. To control when the invocation occurs.
5. To work with objects that aren't supported by User Interface API, like Task and Event.

![image](https://github.com/user-attachments/assets/677a0fe2-e7fd-4b34-bfcb-85507717bec7)

**notifyRecordUpdateAvailable**
1. LDS doesn't manage data provisioned by Apex. Therefore, to refresh stale date, invoke the Apex method and then call notifyRecordUpdateAvailable(recordIds) to update the LDS cache.
2. This function supersedes getRecordNotifyChange(recordIds).
3. To ensure that notifyRecordUpdateAvailable() is called after the record update via Apex, use the async/await pattern or Promise chain.
