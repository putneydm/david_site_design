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


console.log('Input:', input);
console.log('Testing:', testing);
console.log('Dist:', dist);

const cleanVideos = () => del([`${testing}/*.{mov,mp4}`, `${dist}/*.{mov,mp4}`], { force: true });

const videos = (done) => {
    return src(input, { base: 'src/videos/' }) // Preserve directory structure
    .pipe(dest(testing))
    .pipe(dest(dist))
} 

// Run cleanVideos first, then collections
exports.videos = series(cleanVideos, videos);