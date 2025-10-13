const { src, dest, parallel, series } = require('gulp');
const del = require('del');
import { paths } from "../variables"

//images
const gm = require('gulp-gm');

const {
    images: {
        src: source,
        testing: testing,
        dist: dist,
    }
} = paths;

const cleanImages = () => del([`${testing}/{*.jpg,*.tiff,*.png}`, `${dist}/{*.jpg,*.tiff,*.png}`], { force: true });

function syncImages(done) {
    return src(`${source}/{*.jpg,*.tiff,*.png}`)
    .pipe(dest(testing))
    .pipe(dest(dist));
}

exports.syncImages = series(cleanImages, syncImages);