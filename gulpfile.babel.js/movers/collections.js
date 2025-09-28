const { src, dest, series } = require('gulp');
const del = require('del');
import { paths } from "../variables"

const {
    collections: {
        input: input,
        output: output
    }
} = paths;

function cleanMarkdown() {
    // Delete only .markdown files in the output directory
    return del([`${output}/**/*.markdown`], { force: true });
}

function collections() {
    return src(input, { base: 'src/collections' }) // Preserve directory structure
        .pipe(dest(output));
}

// Run cleanMarkdown first, then collections
exports.collections = series(cleanMarkdown, collections);