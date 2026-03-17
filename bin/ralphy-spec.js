#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const distEntrypoint = path.join(__dirname, "..", "dist", "index.js");

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function tryBuildIfPossible() {
  const packageJsonPath = path.join(__dirname, "..", "package.json");
  const nodeModulesPath = path.join(__dirname, "..", "node_modules");

  if (!fileExists(packageJsonPath)) {
    return;
  }

  if (!fileExists(nodeModulesPath)) {
    console.error(
      [
        "",
        "ralphy-spec: build output not found (dist/).",
        "You're running from a source checkout without dependencies installed.",
        "",
        "Fix:",
        "  npm install",
        "  npm run build",
        "  npx ralphy-spec init",
        "",
      ].join("\n"),
    );
    process.exitCode = 1;
    return;
  }

  try {
    execSync("npm run build", {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
    });
  } catch (err) {
    console.error(
      [
        "",
        "ralphy-spec: failed to build dist/ automatically.",
        "Try running:",
        "  npm run build",
        "",
      ].join("\n"),
    );
    throw err;
  }
}

if (!fileExists(distEntrypoint)) {
  tryBuildIfPossible();
}

if (!fileExists(distEntrypoint)) {
  console.error(
    [
      "",
      "ralphy-spec: cannot locate CLI entrypoint at:",
      `  ${distEntrypoint}`,
      "",
    ].join("\n"),
  );
  process.exitCode = 1;
} else {
  require(distEntrypoint);
}
