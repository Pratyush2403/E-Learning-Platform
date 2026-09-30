const courseContent = {
  // ---------- 1. HTML5 Essentials ----------
  1: {
    notes: [
      { id: "n1", title: "Semantic HTML", points: [
        "Semantic tags (<header>, <nav>, <main>, <article>, <footer>) describe the meaning of content, not just its look.",
        "They improve accessibility, SEO and readability compared with piles of <div>s.",
        "Use one <h1> per page and keep headings in order (h1, then h2, then h3).",
      ]},
      { id: "n2", title: "Forms and inputs", points: [
        "<form> groups inputs; the action and method attributes say where and how the data is sent.",
        "Every <input> should have a matching <label for=...> so it is accessible.",
        "Built-in validation: required, minlength, pattern and type=email.",
      ]},
      { id: "n3", title: "Links, images and lists", points: [
        "<a href> creates links; use target=_blank with rel=noopener for new tabs.",
        "Always give <img> an alt attribute describing the image.",
        "<ul> is an unordered list, <ol> an ordered list, and <li> is each item.",
      ]},
    ],
    videos: [
      { id: "v1", title: "HTML full course for beginners", query: "HTML full course for beginners" },
      { id: "v2", title: "HTML forms tutorial", query: "HTML forms tutorial" },
    ],
    questions: [
      { id: "q1", q: "What is the difference between <div> and <span>?", a: "<div> is block-level: it starts on a new line and takes the full width. <span> is inline and only takes the space its content needs." },
      { id: "q2", q: "Why is semantic HTML important?", a: "It gives meaning to the page structure, helping screen readers, search engines and other developers understand it." },
      { id: "q3", q: "What does the alt attribute do?", a: "It provides text describing an image. It shows if the image fails to load and is read aloud by screen readers." },
      { id: "q4", q: "What is the difference between id and class?", a: "An id must be unique on a page, while a class can be reused on many elements." },
    ],
    tests: [
      { id: "t1", title: "HTML Basics Test", minutes: 10, questions: [
        { q: "Which tag defines the main navigation links?", options: ["<nav>", "<menu>", "<links>", "<header>"], answer: 0 },
        { q: "Which attribute makes a form field mandatory?", options: ["mandatory", "required", "validate", "needed"], answer: 1 },
        { q: "Which heading tag is the largest by default?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2 },
        { q: "Which element is inline by default?", options: ["<div>", "<p>", "<section>", "<span>"], answer: 3 },
        { q: "Where should the <title> tag be placed?", options: ["Inside <body>", "Inside <head>", "Inside <footer>", "Anywhere"], answer: 1 },
      ]},
    ],
  },

  // ---------- 2. CSS3 & Responsive Design ----------
  2: {
    notes: [
      { id: "n1", title: "The box model", points: [
        "Every element is a box made of content, padding, border and margin (from inside to outside).",
        "box-sizing: border-box makes width include padding and border, which simplifies layouts.",
      ]},
      { id: "n2", title: "Flexbox", points: [
        "display: flex lays items out in one dimension, as a row or a column.",
        "justify-content aligns items along the main axis and align-items along the cross axis.",
        "gap adds spacing between items without margin hacks.",
      ]},
      { id: "n3", title: "Grid and responsive design", points: [
        "display: grid creates two-dimensional layouts with rows and columns.",
        "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) builds a responsive grid without media queries.",
        "Media queries apply styles at certain screen widths, for example @media (max-width: 768px).",
      ]},
    ],
    videos: [
      { id: "v1", title: "CSS full course for beginners", query: "CSS full course for beginners" },
      { id: "v2", title: "Flexbox and Grid tutorial", query: "CSS Flexbox and Grid tutorial" },
    ],
    questions: [
      { id: "q1", q: "What is specificity in CSS?", a: "A scoring system that decides which rule wins when several target the same element: inline styles beat IDs, IDs beat classes, and classes beat element selectors." },
      { id: "q2", q: "What is the difference between margin and padding?", a: "Padding is the space inside an element between the content and the border. Margin is the space outside the border that separates the element from others." },
      { id: "q3", q: "When should you use Grid instead of Flexbox?", a: "Use Grid for two-dimensional layouts (rows and columns together) and Flexbox for one-dimensional rows or columns." },
      { id: "q4", q: "What does position: absolute do?", a: "It removes the element from normal flow and positions it relative to the nearest positioned ancestor, or the page if there is none." },
    ],
    tests: [
      { id: "t1", title: "CSS Basics Test", minutes: 10, questions: [
        { q: "Which property adds space between an element's border and its content?", options: ["margin", "padding", "gap", "outline"], answer: 1 },
        { q: "Which value makes width include padding and border?", options: ["content-box", "border-box", "padding-box", "inherit"], answer: 1 },
        { q: "Which property aligns flex items along the main axis?", options: ["align-items", "justify-content", "align-content", "flex-align"], answer: 1 },
        { q: "Which selector has the highest specificity?", options: [".box", "#box", "div", "div p"], answer: 1 },
        { q: "Which unit is relative to the root font size?", options: ["em", "px", "rem", "%"], answer: 2 },
      ]},
    ],
  },

  // ---------- 3. JavaScript Fundamentals ----------
  3: {
    notes: [
      { id: "n1", title: "Variables and types", points: [
        "Use let and const instead of var, and prefer const unless the value changes.",
        "Primitive types: string, number, boolean, null, undefined, symbol and bigint. Everything else is an object.",
        "=== compares value and type, while == converts types first, so prefer ===.",
      ]},
      { id: "n2", title: "Functions and arrays", points: [
        "Arrow functions (x => x * 2) are a short syntax and do not have their own this.",
        "map transforms each item, filter keeps matching items, and reduce combines items into one value.",
      ]},
      { id: "n3", title: "DOM and events", points: [
        "document.querySelector selects elements and addEventListener attaches handlers.",
        "Event bubbling means an event travels up from the target to its ancestors, which makes event delegation possible.",
      ]},
    ],
    videos: [
      { id: "v1", title: "JavaScript full course for beginners", query: "JavaScript full course for beginners" },
      { id: "v2", title: "JavaScript DOM manipulation tutorial", query: "JavaScript DOM manipulation tutorial" },
    ],
    questions: [
      { id: "q1", q: "What is the difference between let, const and var?", a: "var is function-scoped and hoisted as undefined. let and const are block-scoped, and const cannot be reassigned." },
      { id: "q2", q: "What is a closure?", a: "A function that remembers the variables from the scope where it was created, even after that scope has finished executing." },
      { id: "q3", q: "What is the difference between == and ===?", a: "== compares after type coercion, while === compares both value and type without coercion." },
      { id: "q4", q: "What is event delegation?", a: "Attaching a single listener to a parent element to handle events from its children, using event bubbling." },
    ],
    tests: [
      { id: "t1", title: "JavaScript Basics Test", minutes: 10, questions: [
        { q: "What does typeof null return?", options: ["null", "undefined", "object", "number"], answer: 2 },
        { q: "Which array method creates a new array by transforming every element?", options: ["filter", "map", "forEach", "reduce"], answer: 1 },
        { q: "Which keyword declares a block-scoped variable that cannot be reassigned?", options: ["var", "let", "const", "static"], answer: 2 },
        { q: "What is the result of 2 + '2'?", options: ["4", "22", "NaN", "Error"], answer: 1 },
        { q: "Which method attaches an event handler to an element?", options: ["addEventListener", "addHandler", "onEvent", "listen"], answer: 0 },
      ]},
    ],
  },

  // ---------- 8. MERN Stack Project ----------
  8: {
    notes: [
      { id: "n1", title: "What is the MERN stack?", points: [
        "MongoDB (database), Express (server framework), React (frontend) and Node.js (runtime), all in JavaScript.",
        "Data flow: React UI, then an HTTP request, then an Express route, then MongoDB, then a JSON response, then React state.",
      ]},
      { id: "n2", title: "Backend with Express and Mongoose", points: [
        "Express routes handle requests (app.get, app.post) and middleware runs before them, for example express.json() to parse request bodies.",
        "Mongoose models define a schema and give you methods like find, create and findByIdAndUpdate.",
      ]},
      { id: "n3", title: "Connecting frontend and backend", points: [
        "React calls the API with fetch or axios. Enable CORS on the server or use a dev proxy.",
        "Keep secrets such as database URLs and JWT keys in environment variables (.env), never in code.",
        "Deploy the frontend and backend separately, then point the frontend to the live API URL.",
      ]},
    ],
    videos: [
      { id: "v1", title: "MERN stack full project tutorial", query: "MERN stack full project tutorial" },
      { id: "v2", title: "Express and MongoDB REST API tutorial", query: "Express MongoDB REST API tutorial" },
    ],
    questions: [
      { id: "q1", q: "Why is the MERN stack popular?", a: "One language (JavaScript) is used across the whole stack, JSON flows naturally between layers, and the ecosystem is huge." },
      { id: "q2", q: "What is middleware in Express?", a: "A function with access to req, res and next that runs between the request and the final handler. It is used for logging, parsing, authentication and more." },
      { id: "q3", q: "What is CORS and why is it needed?", a: "CORS is a browser rule that blocks requests to a different origin unless the server allows it. The backend must send the right headers when the React app runs on another origin." },
      { id: "q4", q: "How does JWT authentication work?", a: "The server signs a token after login. The client sends it with each request (usually in the Authorization header) and the server verifies the signature instead of storing a session." },
    ],
    tests: [
      { id: "t1", title: "MERN Stack Test", minutes: 10, questions: [
        { q: "Which part of MERN is the database?", options: ["Express", "MongoDB", "React", "Node.js"], answer: 1 },
        { q: "Which Express function parses JSON request bodies?", options: ["express.json()", "express.body()", "express.parse()", "app.json()"], answer: 0 },
        { q: "Which library models MongoDB data in Node.js?", options: ["Sequelize", "Mongoose", "Knex", "Passport"], answer: 1 },
        { q: "Where should secret keys be stored?", options: ["In React components", "In environment variables", "In the HTML file", "In localStorage"], answer: 1 },
        { q: "Which hook is commonly used to fetch data when a React component loads?", options: ["useMemo", "useRef", "useEffect", "useReducer"], answer: 2 },
      ]},
    ],
  },

  // ---------- 11. Object-Oriented Programming ----------
  11: {
    notes: [
      { id: "n1", title: "Classes and objects", points: [
        "A class is a blueprint and an object is an instance created from it.",
        "Constructors initialize an object's state when it is created.",
      ]},
      { id: "n2", title: "The four pillars", points: [
        "Encapsulation: bundle data with methods and hide internals using access modifiers.",
        "Abstraction: expose only what is needed and hide the complexity.",
        "Inheritance: a child class reuses and extends a parent class.",
        "Polymorphism: the same call behaves differently depending on the object (overloading at compile time, overriding at run time).",
      ]},
      { id: "n3", title: "Design basics", points: [
        "Prefer composition over inheritance when classes are not a true is-a relationship.",
        "SOLID principles guide maintainable design. Start with Single Responsibility: a class should have one reason to change.",
      ]},
    ],
    videos: [
      { id: "v1", title: "OOP concepts explained", query: "object oriented programming concepts explained" },
      { id: "v2", title: "SOLID principles explained", query: "SOLID principles explained simply" },
    ],
    questions: [
      { id: "q1", q: "What is the difference between abstraction and encapsulation?", a: "Abstraction hides complexity by showing only essential features. Encapsulation hides data by bundling it with methods and restricting access." },
      { id: "q2", q: "What is the difference between overloading and overriding?", a: "Overloading is the same method name with different parameters in one class (compile time). Overriding is a subclass providing its own version of a parent method (run time)." },
      { id: "q3", q: "What is a virtual function in C++?", a: "A member function declared with virtual, so the call is resolved at run time based on the actual object type. This enables runtime polymorphism." },
      { id: "q4", q: "What is the difference between an abstract class and an interface?", a: "An abstract class can hold state and partial implementation, while an interface defines a contract of methods. In Java a class can implement many interfaces but extend only one class." },
    ],
    tests: [
      { id: "t1", title: "OOP Concepts Test", minutes: 10, questions: [
        { q: "Which concept bundles data and methods and restricts access to them?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], answer: 1 },
        { q: "Method overriding is an example of which kind of polymorphism?", options: ["Compile-time", "Run-time", "Static", "Parametric"], answer: 1 },
        { q: "What is an object?", options: ["A blueprint", "An instance of a class", "A function", "A data type only"], answer: 1 },
        { q: "Which Java keyword is used to inherit from a class?", options: ["implements", "extends", "inherits", "super"], answer: 1 },
        { q: "Which principle says a class should have only one reason to change?", options: ["Open/Closed", "Liskov Substitution", "Single Responsibility", "Dependency Inversion"], answer: 2 },
      ]},
    ],
  },

  // ---------- 18. Computer Networks ----------
  18: {
    notes: [
      { id: "n1", title: "OSI and TCP/IP models", points: [
        "OSI has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation and Application.",
        "TCP/IP groups them into 4 layers: Link, Internet, Transport and Application.",
      ]},
      { id: "n2", title: "TCP vs UDP", points: [
        "TCP is connection-oriented and reliable (handshake, acknowledgements, retransmission, ordering).",
        "UDP is connectionless and faster with no delivery guarantee. It is used for streaming, gaming and DNS.",
        "TCP connection setup is the three-way handshake: SYN, SYN-ACK, ACK.",
      ]},
      { id: "n3", title: "IP, DNS and HTTP", points: [
        "IPv4 addresses are 32-bit and IPv6 addresses are 128-bit. Subnetting splits a network into smaller ones.",
        "DNS translates domain names into IP addresses.",
        "HTTP is the application-layer protocol of the web, and HTTPS adds TLS encryption.",
      ]},
    ],
    videos: [
      { id: "v1", title: "Computer networks full course", query: "computer networks full course" },
      { id: "v2", title: "OSI model explained", query: "OSI model explained" },
    ],
    questions: [
      { id: "q1", q: "What happens when you type a URL into the browser?", a: "The browser resolves the domain through DNS, opens a TCP connection (plus TLS for HTTPS), sends an HTTP request, the server responds, and the browser renders the page." },
      { id: "q2", q: "What is the difference between a hub, a switch and a router?", a: "A hub broadcasts to all ports (physical layer), a switch forwards frames by MAC address (data link layer), and a router forwards packets between networks by IP address (network layer)." },
      { id: "q3", q: "What is the purpose of ARP?", a: "ARP maps an IP address to a MAC address on a local network." },
      { id: "q4", q: "What is the difference between TCP and UDP?", a: "TCP is reliable, ordered and connection-oriented. UDP is lightweight, unordered and connectionless." },
    ],
    tests: [
      { id: "t1", title: "Computer Networks Test", minutes: 10, questions: [
        { q: "How many layers does the OSI model have?", options: ["4", "5", "7", "9"], answer: 2 },
        { q: "Which protocol resolves domain names to IP addresses?", options: ["DHCP", "DNS", "ARP", "FTP"], answer: 1 },
        { q: "Which protocol is connectionless?", options: ["TCP", "UDP", "HTTP", "SMTP"], answer: 1 },
        { q: "Which layer is responsible for routing packets between networks?", options: ["Data Link", "Transport", "Network", "Application"], answer: 2 },
        { q: "How many bits are in an IPv4 address?", options: ["16", "32", "64", "128"], answer: 1 },
      ]},
    ],
  },
};

// courses with no content yet return empty lists, so pages never crash
export function getContent(courseId) {
  return courseContent[courseId] || { notes: [], videos: [], questions: [], tests: [] };
}

export default courseContent;