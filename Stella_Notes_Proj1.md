# 📓 Stella's Lessons - Project 1: MERN Auth-Flow & Identity Provider

## Part 1: Architecture & Setup

**1. Why did Stella make me build this folder structure manually instead of using a generator (like create-react-app)?**
*Answer:* [Because this way manual i get to learn why and how the folders are actually getting set up and to make me learn the it as if i use generators it may generate but i will not learn  and apart from that the generator have so many discripancies outdated messy structure and in javascript not typescript.]

**2. What is the difference between a normal `dependency` and a `devDependency` in my package.json?**
*Answer:* [The dependency in package.json is nornally that is preinstalled with installing and normally running and then fundamental running for the app whereas the devDepency are typicaly not installed in production environment and then for testing, build and maintain Its basically used while codingnnot building.]

**3. Why did we separate `controllers` and `services` in the `src` folder?**
*Answer:* [controller actually should focus on about receiveing the HTTP request and sending the response and the services is where the actual logic lives(for example - checking the user exists in the database, comparing passwords). This makes our code testable and scalable. if we cahane from Express to Fastify only controller is changed not the service.]

**4. Why did I make you add process.exit(1) in the catch block of our database connection in db.ts? What happens to a backend server if it can't talk to its database?**
*Answer:* [The process.exit(1) in catch block because to exit the code where there is the error and also return the message of the error message with it and then stop. If our backent server cant talkj to our database then It can never fetch data or verify user or anything at all..
--> An authentication server that cannot talk to its database is essentially a zombie—it's running, taking up server memory, but completely brain-dead. If a user tries to log in and the DB is down, the server would just hang or throw weird errors.
In MAANG interviews, we call what you just described the "Fail-Fast Paradigm." Instead of letting the server limp along in a broken state, we forcefully kill it (process.exit(1)). In a real production environment (like Kubernetes or Railway), killing the server tells the cloud provider: "Hey, I crashed! Restart me or alert the DevOps team!" Put that exact phrase—Fail-Fast Paradigm—in your notes.]


**5. Stella, when we tested the API, the password was saved in the database but did NOT come back in the Thunder Client response. Why?**
*Answer:* [It is because of the select: false that hides the query and as we used in User.ts we told it not to show the password in the return object in auth.services.ts
--> By applying select: false to the Mongoose schema, we ensure the password hash is excluded from all database queries by default. Furthermore, in the service layer, we explicitly map the return object to only include safe fields (id, name, email) before sending it to the controller."]


**6. Why did we used `protectRoute` before `getProfile` in out routes file ?**
*Answe:* [We used the `protectRoute` before `getProfile` because the protectRoute act as a bounder and it only allows them with the jsonwebtokens as the JWT is like a wristband fro the VIP lounge and the protected Route aka Bouncer only allows them who has the JWT aka wristband and only then allow to enter getProfile.] 

**7. What is the advantage of using an HttpOnly cookie instead of just sending it in the Json body?**
*Answer:* [When a user logs in, we don't just say "Okay, you're logged in." We mathematically generate a cryptographic token (JWT) using a secret key only the server knows. Then, we place that token inside a special cookie (HttpOnly) that the browser automatically attaches to future requests, but that hackers cannot read with malicious JavaScript.

--> Protection against Cross-Site Scripting (XSS). If a hacker injects malicious JavaScript into your website, they can steal tokens from LocalStorage, but they cannot even see an HttpOnly cookie. It is completely invisible to JavaScript.]

