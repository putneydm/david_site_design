const { src, dest, series } = require('gulp');
const del = require('del');
import { paths } from "../variables"

const {
    videos: {
        input: input,
        testing: testing,
        dist: dist
    }
} = paths;

const cleanVideos = () => del(testing, { force: true });

const videos = () => 
    src(input, { base: 'src/videos/' }) // Preserve directory structure
    .pipe(dest(testing))
    .pipe(dest(dist));

// Run cleanVideos first, then collections
exports.videos = series(cleanVideos, videos);