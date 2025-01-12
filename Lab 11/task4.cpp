#include <iostream>
#include <pthread.h>
#include <vector>
#include <climits>
#include <cstdint>

// Structure to pass data to thread
struct ThreadData {
    const std::vector<int>* array;
    
    explicit ThreadData(const std::vector<int>* arr) 
        : array(arr) {}
};

// Thread function to find maximum value
void* find_maximum(void* arg) {
    ThreadData* data = static_cast<ThreadData*>(arg);
    
    // Initialize max to smallest possible integer
    int max_value = INT_MIN;
    
    // Find maximum value in array
    for (size_t i = 0; i < data->array->size(); i++) {
        if ((*data->array)[i] > max_value) {
            max_value = (*data->array)[i];
        }
    }
    
    // Clean up thread data
    delete data;
    
    // Return max value as void pointer
    return reinterpret_cast<void*>(static_cast<intptr_t>(max_value));
}

int main() {
    // Create and initialize array with some values
    std::vector<int> array = {42, 15, 67, 89, 23, 12, 90, 54, 76, 88, 
                             99, 45, 32, 18, 95, 70, 84, 63, 51, 29};
    
    // Print input array
    std::cout << "Array elements: ";
    for (const auto& num : array) {
        std::cout << num << " ";
    }
    std::cout << "\n\n";
    
    // Create thread data
    ThreadData* data = new ThreadData(&array);
    
    // Create thread
    pthread_t thread;
    int rc = pthread_create(&thread, nullptr, find_maximum, data);
    
    if (rc) {
        std::cerr << "Error creating thread. Return code: " << rc << std::endl;
        delete data;  // Clean up if thread creation fails
        return 1;
    }
    
    // Wait for thread to complete and get result
    void* result;
    rc = pthread_join(thread, &result);
    
    if (rc) {
        std::cerr << "Error joining thread. Return code: " << rc << std::endl;
        return 1;
    }
    
    // Convert result back to integer
    int max_value = static_cast<int>(reinterpret_cast<intptr_t>(result));
    
    // Print result
    std::cout << "Maximum value found: " << max_value << std::endl;
    
    return 0;
}