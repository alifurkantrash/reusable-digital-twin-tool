#include "easywsclient.hpp"
//#include "easywsclient.cpp" // <-- include only if you don't want compile separately
#ifdef _WIN32
#pragma comment( lib, "ws2_32" )
#include <WinSock2.h>
#endif
#include <assert.h>
#include <stdio.h>
#include <string>
#include <iostream>
#include <thread>

using easywsclient::WebSocket;
static WebSocket::pointer ws = NULL;

void handle_message(const std::string & message)
{
    // printf(">>> %s\n", message.c_str());
    // if (message == "world") { ws->close(); }
}

void WSLoop() {
    ws = WebSocket::from_url("ws://localhost:3000");
    assert(ws);

    while (ws->getReadyState() != WebSocket::CLOSED) {
      ws->poll();
      ws->dispatch(handle_message);
    }

    delete ws;
}

void MainLoop() {
    while (true) {
        // Sleep for 3 mins
        std::this_thread::sleep_for(std::chrono::seconds(3));

        // Set device id
        std::string deviceId;
        std::cout << "Type your device id: ";
        std::cin >> deviceId;
        std::cout << "Your device id is: " << deviceId << std::endl;
        std::string deviceName;
        std::cout << "Type your device name: ";
        std::cin >> deviceName;
        std::cout << "Your device name is: " << deviceName << std::endl;
        ws->send("{\"deviceId\": \"" + deviceId 
                    + "\", \"name\": \"" + deviceName
                    + "\", \"connectionStatus\": \"" + "connected" 
                    + "\", \"location\": \"" + "USA" 
                    + "\", \"state\": \"" + "active" 
                    + "\", \"powerConsumption\": \"" + "300" 
                    + "\", \"healthStatus\": \"" + "good" 
                    + "\", \"operationalMode\": \"" + "normal" 
                    + "\", \"firmwareVersion\": \"" + "1.0.1" 
                    + "\", \"lifecycle\": \"" + "operation" 
                    + "\", \"lastMaintenanceDate\": \"" + "2025" + "\"}");
        ///////////////////////////
        std::string commandId;
        std::cout << "------------------------------" << std::endl;
        std::cout << "SUPPORTED COMMANDS" << std::endl;
        std::cout << "Type 1 to change connection status" << std::endl;
        std::cout << "Type 2 to change location" << std::endl;
        std::cout << "Type 3 to change state" << std::endl;
        std::cout << "Type 4 to change power consumption" << std::endl;
        std::cout << "Type 5 to change health status" << std::endl;
        std::cout << "Type 6 to change operational mode" << std::endl;
        std::cout << "Type 7 to change firmware version" << std::endl;
        std::cout << "Type 8 to change lifecycle" << std::endl;
        std::cout << "Type 9 to change last maintenance date" << std::endl;

        std::cin >> commandId;
        int selection = std::stoi(commandId);
        std::string subInput;

        std::cout << "-----------------" << std::endl;
        switch(selection) {
        case 1:
            std::cout << "Type 1 to change status CONNECTED" << std::endl;
            std::cout << "Type 2 to change status DISCONNECTED" << std::endl;
            std::cout << "Type 3 to change status UNKNOWN" << std::endl;
            std::cin >> subInput;
            if (std::strcmp(subInput.c_str(), "1") == 0) {
                subInput = "connected";
            } else if (std::strcmp(subInput.c_str(), "2") == 0) {
                subInput = "disconnected";
            } else if (std::strcmp(subInput.c_str(), "3") == 0) {
                subInput = "unknown";
            }
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"connectionStatus\": \"" + subInput + "\"}");
            break;
        case 2:
            std::cout << "Type location" << std::endl;
            std::cin >> subInput;
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"location\": \"" + subInput + "\"}");
            break;
        case 3:
            std::cout << "Type 1 to change state ACTIVE" << std::endl;
            std::cout << "Type 2 to change state INACTIVE" << std::endl;
            std::cout << "Type 3 to change state STANDBY" << std::endl;
            std::cout << "Type 4 to change state ERROR" << std::endl;
            std::cin >> subInput;
            if(std::strcmp(subInput.c_str(), "1") == 0) {
                subInput = "active";
            } else if (std::strcmp(subInput.c_str(), "2") == 0) {
                subInput = "inactive";
            } else if (std::strcmp(subInput.c_str(), "3") == 0) {
                subInput = "standby";
            } else if (std::strcmp(subInput.c_str(), "4") == 0) {
                subInput = "error";
            }
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"state\": \"" + subInput + "\"}");
            break;
        case 4:
            std::cout << "Type power consumption" << std::endl;
            std::cin >> subInput;
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"powerConsumption\": \"" + subInput + "\"}");
            break;
        case 5:
            std::cout << "Type 1 to health status GOOD" << std::endl;
            std::cout << "Type 2 to health status FAIR" << std::endl;
            std::cout << "Type 3 to health status POOR" << std::endl;
            std::cin >> subInput;
            if (std::strcmp(subInput.c_str(), "1") == 0) {
                subInput = "good";
            } else if (std::strcmp(subInput.c_str(), "2") == 0) {
                subInput = "fair";
            } else if (std::strcmp(subInput.c_str(), "3") == 0) {
                subInput = "poor";
            }
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"healthStatus\": \"" + subInput + "\"}");
            break;
        case 6:
            std::cout << "Type 1 to operational mode NORMAL" << std::endl;
            std::cout << "Type 2 to operational mode TEST" << std::endl;
            std::cout << "Type 3 to operational mode EMERGENCY" << std::endl;
            std::cin >> subInput;
            if (std::strcmp(subInput.c_str(), "1") == 0) {
                subInput = "normal";
            } else if (std::strcmp(subInput.c_str(), "2") == 0) {
                subInput = "test";
            } else if (std::strcmp(subInput.c_str(), "3") == 0) {
                subInput = "emergency";
            }
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"operationalMode\": \"" + subInput + "\"}");
            break;
        case 7:
            std::cout << "Type firmware version" << std::endl;
            std::cin >> subInput;
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"firmwareVersion\": \"" + subInput + "\"}");
            break;
        case 8:
            std::cout << "Type 1 to lifecycle DESIGN" << std::endl;
            std::cout << "Type 2 to lifecycle MANUFACTURING" << std::endl;
            std::cout << "Type 3 to lifecycle DEPLOYMENT" << std::endl;
            std::cout << "Type 4 to lifecycle OPERATION" << std::endl;
            std::cout << "Type 5 to lifecycle END-OF-LIFE" << std::endl;
            std::cin >> subInput;
            if (std::strcmp(subInput.c_str(), "1") == 0) {
                subInput = "design";
            } else if (std::strcmp(subInput.c_str(), "2") == 0) {
                subInput = "manufacturing";
            } else if (std::strcmp(subInput.c_str(), "3") == 0) {
                subInput = "deployment";
            } else if (std::strcmp(subInput.c_str(), "4") == 0) {
                subInput = "operation";
            } else if (std::strcmp(subInput.c_str(), "5") == 0) {
                subInput = "end-of-life";
            }
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"lifecycle\": \"" + subInput + "\"}");
            break;
        case 9:
            std::cout << "Type last maintenance date" << std::endl;
            std::cin >> subInput;
            ws->send("{\"deviceId\": \"" + deviceId + "\", \"lastMaintenanceDate\": \"" + subInput + "\"}");
            break;
        default:
            std::cout << "Unknown command" << std::endl;
        }
    }
}

int main()
{
#ifdef _WIN32
    INT rc;
    WSADATA wsaData;

    rc = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (rc) {
        printf("WSAStartup Failed.\n");
        return 1;
    }
#endif
    // std::string deviceId;
    // std::cout << "Type your device id: ";
    // std::cin >> deviceId;
    // std::cout << "Your device id is: " << deviceId << std::endl;

    std::thread t1(WSLoop);
    std::thread t2(MainLoop);
    t1.join();
    t2.join();
        
    // ws->send("goodbye");
    // ws->send("hello");
    // ws->send("goodbye");
    // ws->send("hello");

    // while (true) {
    //     std::string commandId;
    //     std::cout << "Type command id: ";
    //     std::cin >> commandId;
    //     std::cout << "Command id " << commandId << std::endl;

    //     // std::thread t1(WSLoop);
    //     // std::thread t2(WSLoop);
    //     // t1.join();
    //     // t2.join();
    // }
    
    // std::cout << "Your device id is: " << deviceId << std::endl;
    
#ifdef _WIN32
    WSACleanup();
#endif
    return 0;
}
