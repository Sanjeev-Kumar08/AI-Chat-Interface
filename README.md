#  AI Chat Interface

A modern plugin-powered AI chat interface built with **Vite**, **React**, and **Tailwind CSS**. This project features a natural language interface, command-based plugin parsing, and real-time feedback using visual components.

##  Features

- Plugin system with command parsing
- AI chat interface UI with dynamic messages
- Plugins for weather, calculator, and dictionary lookups
- Scrollable chat view with auto-scroll and user/bot message formatting
- Mobile responsive and minimal UI powered by Tailwind CSS

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sanjeev-Kumar08/AI-Chat-Interface.git
cd ai-chat-interface
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the app running.

### 4. Build for production

```bash
npm run build
# or
yarn build
```

---

##  Plugin Architecture & Parsing Logic

The app features a plugin-based architecture allowing easy integration of new commands and functionalities.

- **Plugin Manager:**  
  A central utility that registers plugins, parses user messages to detect commands, and executes the corresponding plugin logic.

- **Parsing Logic:**  
  When a user sends a message, the input is checked for command patterns like `/weather`, `/calc`, or `/define`.  
  - If a plugin command is detected, the Plugin Manager executes the plugin asynchronously.  
  - While processing, a "Processing..." message appears.  
  - Upon completion, the result is displayed or an error message if the plugin execution fails.  
  - Non-plugin messages receive a generic AI assistant reply.

- **Plugin Interface:**  
  Each plugin exposes:  
  - A `name` and `command` identifier (e.g., `/weather`)  
  - An `execute` function that accepts the input and returns a success status and data or error  
  - A `render` function to display plugin output inside the chat UI

---

##  Plugins Implemented & APIs Used

| Plugin       | Command        | Description                  | API/Library Used                |
|--------------|----------------|------------------------------|--------------------------------|
| Weather      | `/weather`     | Fetches current weather info | [OpenWeatherMap API](https://openweathermap.org/api) |
| Calculator   | `/calc`        | Evaluates mathematical expressions | JavaScript's `eval` (with safe parsing) |
| Dictionary   | `/define`      | Provides word definitions     | [Free Dictionary API](https://dictionaryapi.dev/) |

---

Feel free to contribute new plugins by extending the Plugin Manager!

---

##  License

MIT © Sanjeev Kumar
