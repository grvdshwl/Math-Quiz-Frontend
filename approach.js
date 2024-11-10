// Problem: Solution to manage user attempts at answering questions,
// ensuring only one process handles attempts for a specific question at any time.

// Step 1: Enqueue the user's attempt (userId, questionId, and answer) in a Redis list.

// Step 2: Start processing the queue only if no other process is currently handling it.

// Step 3: Attempt to acquire a lock to ensure exclusive access to the queue for processing.

// Step 4: If unable to acquire the lock, exit the function so that another process can handle the queue.

// Step 5: Process each attempt in the queue until it is empty.

// Step 6: Dequeue the next user attempt from the Redis list for processing.

// Step 7: Fetch the question data from the database to verify if it has already been solved.

// Step 8: Check if the current user's attempt is correct.

// Step 9: If the question is correctly solved, generate a new question to keep the flow moving.

// Step 10: Release the lock after processing is complete to allow other attempts or processes to proceed.
