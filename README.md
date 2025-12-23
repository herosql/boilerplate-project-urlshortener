# URL Shortener Microservice

### 🎯 Objective
A high-performance microservice designed to transform long URLs into persistent, shortened redirect links. This project focuses on URL validation through networking protocols and efficient data mapping in MongoDB.

### 🛠 Tech Stack
- **Backend:** Node.js & Express
- **Database:** MongoDB & Mongoose
- **Networking:** Node.js DNS Module

### 🚀 Key Features
- **Strict Protocol Validation:** Implements a multi-layered validation check using Regular Expressions and the **Node.js `dns.lookup()` API** to ensure submitted URLs have a valid, reachable domain.
- **Persistent ID Mapping:** Assigns a unique, incremental short-code to each long URL, ensuring that the same destination can be retrieved multiple times.
- **Fast 301 Redirection:** Features a high-speed lookup endpoint that seamlessly redirects users from the short-code to the original destination.
- **Error Handling:** Gracefully handles invalid URL formats or non-existent domains by returning standardized JSON error responses.
- **Database Scalability:** Uses Mongoose schemas to store and index URL pairs, allowing for sub-millisecond retrieval during redirection requests.

### 🧪 Technical Highlight
The primary technical challenge addressed here is the distinction between a **syntactically valid URL** and a **functionally valid domain**. By integrating the `dns` module, the service goes beyond simple string matching to verify the actual existence of the host before committing it to the database.
