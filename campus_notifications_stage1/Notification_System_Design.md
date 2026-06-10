# Notification System Design

## Approach

1. Fetch notifications from the Notification API.
2. Assign priorities:

   * Placement = 3
   * Result = 2
   * Event = 1
3. Sort notifications by:

   * Higher priority first
   * Latest timestamp first
4. Select top 10 notifications.
5. Display final prioritized notifications.

## Complexity

* Sorting: O(n log n)
* Top 10 Selection: O(10)

## Data Structure

Array of Notification Objects

## Notification Object

* ID
* Type
* Message
* Timestamp

## Priority Mapping

Placement > Result > Event
