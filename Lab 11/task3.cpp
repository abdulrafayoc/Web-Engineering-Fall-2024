#include <iostream>
#include <pthread.h>
#include <vector>
#include <cstdint>  // For intptr_t

// Structure to pass data to thread
struct ThreadData {
    const std::vector<int>* array;
    size_t start;
    size_t end;
    
    ThreadData(const std::vector<int>* arr, size_t s, size_t e) 
        : array(arr), start(s), end(e) {}
};

// Thread function that calculates partial sum
void* calculate_partial_sum(void* arg) {
    ThreadData* data = static_cast<ThreadData*>(arg);
    intptr_t sum = 0;  // Using intptr_t instead of long
    
    // Calculate sum for assigned portion of array
    for (size_t i = data->start; i < data->end; i++) {
        sum += (*data->array)[i];
    }
    
    // Clean up the thread data
    delete data;
    
    // Return sum as void pointer
    return reinterpret_cast<void*>(sum);
}

int main() {
    // Create sample array
    std::vector<int> array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
                             11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    
    // Print input array
    std::cout << "Array elements: ";
    for (const auto& num : array) {
        std::cout << num << " ";
    }
    std::cout << "\n\n";

    const int NUM_THREADS = 4;
    pthread_t threads[NUM_THREADS];
    size_t chunk_size = array.size() / NUM_THREADS;
    
    // Create threads
    for (int i = 0; i < NUM_THREADS; i++) {
        size_t start = i * chunk_size;
        size_t end = (i == NUM_THREADS - 1) ? array.size() : (i + 1) * chunk_size;
        
        // Create thread data (will be deleted by thread)
        ThreadData* data = new ThreadData(&array, start, end);
        
        int rc = pthread_create(&threads[i], nullptr, calculate_partial_sum, data);
        if (rc) {
            std::cerr << "Error creating thread " << i << ". Return code: " << rc << std::endl;
            return 1;
        }
    }
    
    // Wait for threads and collect results
    intptr_t total_sum = 0;  // Using intptr_t instead of long
    for (int i = 0; i < NUM_THREADS; i++) {
        void* partial_sum;
        int rc = pthread_join(threads[i], &partial_sum);
        
        if (rc) {
            std::cerr << "Error joining thread " << i << ". Return code: " << rc << std::endl;
            return 1;
        }
        
        // Convert void pointer back to intptr_t and add to total
        intptr_t thread_sum = reinterpret_cast<intptr_t>(partial_sum);
        total_sum += thread_sum;
        
        std::cout << "Thread " << i << " partial sum: " << thread_sum << std::endl;
    }
    
    // Print final sum in main
    std::cout << "\nTotal sum calculated in main: " << total_sum << std::endl;
    
    return 0;
}