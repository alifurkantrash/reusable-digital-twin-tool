https://github.com/dhbaird/easywsclient

run command
g++ -c easywsclient.cpp -o easywsclient.o && g++ -c example-client.cpp -o example-client.o && g++ example-client.o easywsclient.o -o example-client && ./example-client
