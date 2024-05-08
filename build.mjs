import {createCommand, createArgument, createOption} from "commander";
import {join} from "path";
import {rollup} from "rollup";
import {createTypeScriptPlugin} from "@vitrail/rollup-plugin-typescript";
import createGeneratePackageJsonPlugin from "rollup-plugin-generate-package-json";
import createCommonJsPlugin from "@rollup/plugin-commonjs";
import FsExtra from 'fs-extra';

const {emptyDirSync, outputFileSync} = FsExtra;

/**
 * @typedef Options
 * @property {boolean} sourceMap
 * @property {boolean} treeshake
 */

/**
 * @param {string} source
 * @param {string} destination
 * @param {Options} options
 */
const build = (
  source,
  destination,
  options
) => {
  return rollup({
    input: source,
    plugins: [
      createCommonJsPlugin(),
      createGeneratePackageJsonPlugin({
        outputFolder: destination
      }),
      createTypeScriptPlugin({})
    ],
    treeshake: options.treeshake
  }).then((build) => {
    return build.generate({
      entryFileNames: "[name].mjs",
      sourcemap: options.sourceMap,
      format: "module",
      dir: destination
    });
  }).then(
    /**
     * @param {{output: [import("rollup").OutputChunk, ...(import("rollup").OutputChunk | import("rollup").OutputAsset)[]]}} output
     */
    (output) => {
      for (const assetOrChunk of output.output) {
        if (assetOrChunk.type === "chunk") {
          outputFileSync(join(destination, assetOrChunk.fileName), assetOrChunk.code);
        } else {
          outputFileSync(join(destination, assetOrChunk.fileName), assetOrChunk.source);
        }
      }
    });
}

const program = createCommand('node build.mjs')
  .addArgument(createArgument('source'))
  .addArgument(createArgument('destination'))
  .addOption(createOption('--version <version>').default('0.0.0'))
  .addOption(createOption('--source-map').default(false))
  .addOption(createOption('--treeshake').default(false))
  .action((source, destination, options) => {
    emptyDirSync(destination);

    return build(source, destination, options);
  });

program.parse(process.argv);
