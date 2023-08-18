# ASSISTATION WEB

## INTRODUCTION

"Assistation" is a web that is dedicated to connect users that want to offer their services related to house with other users that need somebody to help them with their home issues. The web has a modern design that combine the power of blue with the white color shine and cleaning. The navigation inside web is easy and intuitive so it can be used by everybody regardless of age.

## USED TECHNOLOGIES

The project has been separated in to big branches: 

 - ### Client

    It is the front-end part of the project. It is related to the user experience and the pages navigation. It has been written using React for the web interativity and CSS3 for the style. I decided to use React because it is the most extended technology and it allows you to configure and reuse the code, that has been written previusly, on different parts of the project.

 - ### Server 
 
    It is the back-end part of the project. It is related to DDBB and it's connection with the web. The API REST has been created using NodeJS and MongoDB has been used to create the DDBB. These technologies have been chosen because they allow more flexibility saving and getting data that is wanted to use.

## STRUCTURE

 - ### Front-end

    |                    URL                        |                 DESCRIPTION                           |
    |:-----------------------------------          |:---------------------------------------             | 
    |  127.0.0.1:3000                               |   Home page                                           |
    |  127.0.0.1:3000/login                         |   Login page                                          |
    |  127.0.0.1:3000/login/passwordForgotten       |   Page to get instructions to recover password        |
    |  127.0.0.1:3000/login/passwordForgotten/setpass/:userRole | Page to set the new password              |
    |  127.0.0.1:3000/servicesSearcher              |   Service searcher page                               |
    |  127.0.0.1:3000/contacto                      |   Contact page                                        |
    |  127.0.0.1:3000/registro/:typeUser            |   Sign up page                                        |
    |  127.0.0.1:3000/dashboard/:userID/:pageReq    |   User's menu page                                    |
    |  127.0.0.1:3000/userInfo/:userID              |   User's public info page                             |
    |  127.0.0.1:3000/chatManager                   |   Chat page                                           |
    
 - ### Back-end

    **1. Anonymous user**

    |                    URL          | TYPE    |                 DESCRIPTION             |
    |:--------------------------------|:--------|:---------------------------------------| 
    |  127.0.0.1:3002/contactAlone    |POST     | Sends a message to Assistation team     |
    
    **2. Customer user**

    |                    URL          | TYPE    |                 DESCRIPTION             |
    |:-------------------------------|:-------|:---------------------------------------| 
    |  127.0.0.1:3002/customers       |POST     | Saves a new user as a customer           |

    **3. Provider user**

    |                    URL                   | TYPE    |                 DESCRIPTION             |
    |:-------------------------------         |:-------|:---------------------------------------| 
    |  127.0.0.1:3002/providers                |POST     | Saves a new user as a provider          |
    |  127.0.0.1:3002/providers?filter=&order= |GET      | Gets all providers following conditions |

    **4. Login**

    |                    URL     | TYPE    |                 DESCRIPTION             |
    |:--------------------------|:-------|:---------------------------------------| 
    |  127.0.0.1:3002/login      |POST     | Allows user to login                    |

    **5. Password forgotten**

    |                    URL                 | TYPE    |                 DESCRIPTION             |
    |:-------------------------------      |:-------|:---------------------------------------| 
    |  127.0.0.1:3002/passForgotten          |POST     | Sends a message to recover the password |
    |  127.0.0.1:3002/passForgotten/setPass  |PUT      | Allows to chose a new password          |

    **6. Dashboard**

    |                    URL                        | TYPE  |                 DESCRIPTION             |
    |:-------------------------------             |:-----|:---------------------------------------| 
    |  127.0.0.1:3002/dashboard/:userID             |GET    | Gets the user's personal information    |
    |  127.0.0.1:3002/dashboard/:userID             |PUT    | Modifies the user's data                |
    |  127.0.0.1:3002/dashboard/:userID             |DELETE | Deactivates a user                      |
    |  127.0.0.1:3002/dashboard/uploadImage/:userID |POST   | Upload an avatar image                  |
    |  127.0.0.1:3002/dashboard/public/:userID      |GET    | Gets the user's public information      |

    **7. Remarks**

    |                    URL               | TYPE  |                 DESCRIPTION          |
    |:-------------------------------     |:-----|:------------------------------------| 
    |  127.0.0.1:3002/remarks/:userID      |GET    | Gets the user's remarks              |
    |  127.0.0.1:3002/remarks/:userID      |POST   | Adds a remark on user profile        |

    **8. Chats**

    |                    URL                   | TYPE  |                 DESCRIPTION            |
    |:---------------------------             |:-----|:------------------------------------  | 
    |  127.0.0.1:3002/chats                    |GET    | Gets the chatlist                      |
    |  127.0.0.1:3002/chats?sendTo=            |POST   | Sends new messages                     |
    |  127.0.0.1:3002/chats/chatroom?chatroom= |GET    | Gets the messages in a specific chat   |

## MISCELLANEOUS

### INSTALLATION AND USE STEPS

   1. Git pull
   2. Inside client folder --> npm install 
   3. Inside server folder --> npm install
   4. Inside client folder --> npm start
   5. Inside server folder --> npm start
   6. Mongo configuration --> mongorestore -h <host:port> <assistationDB directory route> -d assistationDB
   7. Mailer configuration --> 
      1. go to server/config/config.js 
      2. set MAIL=<your gmail> MAILPASS=<your aplication password>  

### VERSION AND AUTHOR
   - Version: 1.0
   - License: Apache License, Version 2.0
   - Author: https://github.com/avicodelo