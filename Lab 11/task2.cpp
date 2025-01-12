#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <numeric>

std::mutex console_mutex;

// Method 1: Single thread calculating sum of entire array
void calculate_total_sum(const std::vector<int>& arr) {
    int sum = std::accumulate(arr.begin(), arr.end(), 0);
    
    std::lock_guard<std::mutex> guard(console_mutex);
    std::cout << "Total sum (single thread): " << sum << std::endl;
}

// Method 2: Multiple threads each calculating partial sums
void calculate_partial_sum(const std::vector<int>& arr, size_t start, size_t end, int& result) {
    result = std::accumulate(arr.begin() + start, arr.begin() + end, 0);
    
    std::lock_guard<std::mutex> guard(console_mutex);
    std::cout << "Partial sum from index " << start << " to " << (end-1) 
              << ": " << result << std::endl;
}

int main() {
    // Create a sample array (vector)
    std::vector<int> array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
                             11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
    
    std::cout << "Array elements: ";
    for (const auto& num : array) {
        std::cout << num << " ";
    }
    std::cout << "\n\n";

    // Method 1: Single thread approach
    std::thread t1(calculate_total_sum, std::ref(array));
    t1.join();

    std::cout << "\n";

    // Method 2: Multi-threaded approach
    const int NUM_THREADS = 4;  // Using 4 threads
    std::vector<std::thread> threads;
    std::vector<int> partial_sums(NUM_THREADS);
    
    // Calculate how many elements each thread should process
    size_t chunk_size = array.size() / NUM_THREADS;
    
    try {
        // Create threads and assign array chunks to each
        for (int i = 0; i < NUM_THREADS; i++) {
            size_t start = i * chunk_size;
            size_t end = (i == NUM_THREADS - 1) ? array.size() : (i + 1) * chunk_size;
            
            threads.push_back(std::thread(calculate_partial_sum, 
                                        std::ref(array), 
                                        start, 
                                        end, 
                                        std::ref(partial_sums[i])));
        }
        
        // Wait for all threads to complete
        for (auto& thread : threads) {
            if (thread.joinable()) {
                thread.join();
            }
        }
        
        // Calculate and display final sum
        int final_sum = std::accumulate(partial_sums.begin(), partial_sums.end(), 0);
        std::cout << "\nFinal sum (multi-threaded): " << final_sum << std::endl;
        
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}