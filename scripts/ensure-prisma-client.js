const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

function getPrismaGenerateCommand() {
  const binName = process.platform === "win32" ? "prisma.cmd" : "prisma";
  return path.join(__dirname, "..", "node_modules", ".bin", binName);
}

function hasGeneratedClient() {
  const clientEntry = require.resolve("@prisma/client");
  const clientDir = path.dirname(clientEntry);

  const generatedEntry = require.resolve(".prisma/client/default", {
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

  const prismaGenerate = getPrismaGenerateCommand();

  if (!fs.existsSync(prismaGenerate)) {
    throw new Error(
      `Prisma CLI not found at ${prismaGenerate}. Run your package manager install first.`
    );
  }

  console.log("Prisma Client not generated; running `prisma generate`...");
  execFileSync(prismaGenerate, ["generate"], { stdio: "inherit" });
}

main();

