# VS Code Debug & Run Configuration Guide

This directory contains VS Code configuration files for running and debugging the ICFC application.

## Quick Start

### One-Click Run (API + Frontend)
1. Open the Run and Debug panel (`Cmd/Ctrl + Shift + D`)
2. Select **"Debug Full Stack (API + Frontend)"** from the dropdown
3. Click the green play button (or press `F5`)

This will:
- Start the Rails API with debugger attached on port 3000
- Start the Frontend dev server on port 5173
- Open Chrome for frontend debugging
- Allow you to set breakpoints in both Ruby and JavaScript/TypeScript code

## Available Tasks

Access tasks via `Cmd/Ctrl + Shift + P` → "Tasks: Run Task"

### Server Tasks
- **Run Rails API (Debug Mode)**: Starts Rails with rdbg debugger attached
- **Run Rails API (Normal Mode)**: Starts Rails without debugger
- **Run Frontend Dev Server**: Starts Vite dev server
- **Run All Services (API + Frontend)**: Starts both API and Frontend together

### Test Tasks
- **Run RSpec Tests**: Run all RSpec tests
- **Run RSpec Tests (Debug Mode)**: Run tests with debugger (prompts for file path)
- **Run Minitest Tests**: Run all Minitest tests

## Available Launch Configurations

### Rails API Debugging
- **Attach to Rails API**: Attach debugger to running Rails server (use after starting "Run Rails API (Debug Mode)" task)
- **Debug Rails API (Launch & Attach)**: Launch Rails server with debugger in one step

### Testing
- **Attach to RSpec Tests**: Attach to running RSpec tests
- **Debug Current RSpec File**: Debug the currently open spec file
- **Debug All RSpec Tests**: Debug entire test suite

### Frontend
- **Debug Frontend in Chrome**: Launch Chrome with debugger attached to frontend

### Full Stack
- **Debug Full Stack (API + Frontend)**: Run and debug both API and frontend simultaneously

## Using Breakpoints

### In Rails Code
1. Open any Ruby file in `api/`
2. Click in the gutter (left of line numbers) to set a breakpoint
3. Start debugging using one of the Rails configurations above
4. When code hits the breakpoint, you can:
   - Inspect variables
   - Step through code
   - Use the Debug Console to evaluate expressions

### In Frontend Code
1. Open any JavaScript/TypeScript/Svelte file in `frontend/`
2. Set breakpoints as above
3. Use the "Debug Frontend in Chrome" or "Debug Full Stack" configuration
4. Breakpoints will be hit in the browser

## Manual Commands

If you prefer running commands manually:

```bash
# Rails API with debugger
cd api
bundle exec rdbg -n --open --port 38698 -c -- bin/rails server -b 0.0.0.0 -p 3000

# Frontend
cd frontend
npm run dev

# Tests with debugger
cd api
bundle exec rdbg -n --open --port 38699 -c -- bundle exec rspec
```

## Debugger Ports

- Rails API: 38698
- RSpec Tests: 38699

## Tips

1. The "Debug Full Stack" compound configuration is the easiest way to get started
2. You can set breakpoints before or after starting the debugger
3. Use `binding.break` in Ruby code to programmatically trigger breakpoints
4. The debugger will pause on uncaught exceptions in debug mode
5. Check the Debug Console for REPL access to your running application
