### Setup

- create dev.js file inside your config folder and add following properties.

  `module.exports = {  `

  `googleClientID:
"your google client id", `

  `googleClientSecret: "your client secret",`

  `mongoURI:
"your Mongo_Url",`
  `cookieKey: "Your key",`

  `}; `

### Redis setup for Windows
 1. open windows powershell and write below command.
     ` wsl `
 2. Install followings
    `sudo apt-get update`
    `sudo apt-get install redis`
 3. Start the Redis Server
    `sudo service redis-server start`
 4. You can test that your Redis server is running by connecting with the Redis CLI:
    `redis-cli`
    `127.0.0.1:6379> ping`
    `PONG`
### High-Level Design 

-![alt text](https://github.com/Groot-2001/BlogEggs/blob/main/images/BloggEgg(High-level%20Design).png)

### Installation

- Run `npm install` in the root of the project to install server dependencies
- Change into the client directory and run `npm install --legacy-peer-deps`
- Change back into the root of the project and run `npm run dev` to start the server
- Access the application at `localhost:3000` in your browser

# ScreenShots

- ![alt text](images/pic1.png)
- ![alt text](images/Pic2.png)
- ![alt text](images/Pic3.png)
