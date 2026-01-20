const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function getPrismaCliEntryPath() {
  try {
    return require.resolve("prisma/build/index.js");
  } catch {
    throw new Error("Prisma CLI not found. Run your package manager install first.");
  }
}

function hasGeneratedClient() {
  const clientEntry = require.resolve("@prisma/client");
  const clientDir = path.dirname(clientEntry);

  const generatedEntry = require.resolve(".prisma/client/index", {
    paths: [clientDir],
  });

  return fs.existsSync(generatedEntry);
}

function main() {
  try {
    if (hasGeneratedClient()) return;
  } catch {
    // ignore and fall through to generating
  }

  const prismaCliEntry = getPrismaCliEntryPath();

  console.log("Prisma Client not generated; running `prisma generate`...");
  execFileSync(process.execPath, [prismaCliEntry, "generate"], { stdio: "inherit" });
}

main();
