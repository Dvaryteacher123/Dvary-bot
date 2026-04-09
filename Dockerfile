# Use a very light web server
FROM halverneus/static-file-server:latest

# Set the port to 8080 (Required by Back4App)
ENV PORT=8080

# Copy your English files to the server folder
COPY . /web

# Start the server
EXPOSE 8080
