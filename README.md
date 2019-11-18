# ciklum

##JS Band Internship

### js-band-hw-task-2

During the implementation of our POC, we found the issue with the backend. On the backend side, we have haven't a method for retrieving all data for a list of trucks. We have had two methods:

Objectives
Create the method for retrieving data for the list of trucks from the backend.

Acceptance criteria:
- getTruckListCallback (use methods with callback) should be implemented
- getTruckListPromise (use methods with promise) should be implemented
- getTruckListAsyncAwait (use async, await) should be implemented
- Methods should try to get document again if received error, but no more than two times
if the error happens more than two times, the method should skip this truck
