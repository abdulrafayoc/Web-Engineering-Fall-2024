#include <iostream>
#include <thread>
#include <vector>
#include <mutex>

// Mutex to prevent console output from getting mixed up
std::mutex console_mutex;

// Function that will be executed by each thread
void print_hello(int thread_num) {
    // Lock the mutex before printing to ensure clean console output
    std::lock_guard<std::mutex> guard(console_mutex);
    std::cout << "Hello from thread " << thread_num << std::endl;
}

int main() {
    const int NUM_THREADS = 5;
    std::vector<std::thread> threads;
    
    try {
        // Create threads
        for (int i = 0; i < NUM_THREADS; i++) {
            threads.push_back(std::thread(print_hello, i));
        }
        
        // Wait for all threads to complete
        for (auto& thread : threads) {
            if (thread.joinable()) {
                thread.join();
            }
        }
    }
    catch (const std::system_error& e) {
        std::cerr << "Thread error: " << e.what() << std::endl;
        return 1;
    }
    catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }
    
    return 0;
}